'use strict';

const AWS = require('aws-sdk'); 

const https = require('https');

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const MOVIESHOP = require('movieshop-libutils')

const exclusions = []

const required_fields = ["id","name","photo","apiId","source","products"]


async function validateMerchantVisualProduct(data,path){
  console.log("z")
  var missing_types = []
  var obligatory_fields = []
  console.log("zz")
  
  var forbidden_fields = [];
  Object.keys(data).forEach(async key => {
    console.log("88888888")
    if (!required_fields.includes(key)){
      console.log("7777777")
      forbidden_fields.push(key);
    }
  });

  if (forbidden_fields.length > 0){
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'forbidden_field_for_object', 400,path,required_fields,[]);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context)
    let result = {
      valid:false,
      errors: error_lam
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  }

  ////////
  var empty_fields = [];
  Object.entries(data).forEach(async ([key, val]) => {

    if (val === ""){
      empty_fields.push(key);
    }
  });

  if (empty_fields.length > 0){
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'empty_field', 400,path,empty_fields,[]);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context)
    let result = {
      valid:false,
      errors: error_lam
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  }
  
  console.log("zzz")
  console.log(obligatory_fields)
  console.log(missing_types)
  if (obligatory_fields.length > 0 || missing_types.length > 0){
    console.log("zzzz42")
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'address_obligatory_fields', 400,path,obligatory_fields,[]);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context)
    console.log("zzzzz5")
    let result = {
      valid:false,
      errors: error_lam
  
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  } else {
    let result = {
      valid:true,
      errors: []
    }
    console.log("zzzzzzzz7")
    console.log(result)
    return result
  }
}

async function updateMerchantVisualProduction(theMerchantVisualProduction,data,path){

  const validation = await validateMerchantVisualProduct(data,path)
  if (!validation.valid){
    let result2 = {
      visualProduction:null,
      errors: validation.errors
  
    }
    return result2
  }
  console.log("us1")
  console.log(theMerchantVisualProduction)
  console.log(data)
  console.log(path)
  console.log("us2")
  var addressLabel = "";
  var invalidFields = [];
  console.log("us3")
  Object.entries(data).forEach(async ([key, val]) => {
      console.log("us4")
      if (!exclusions.includes(key)){
        console.log("us5")
        console.log(typeof(data[key]))
        console.log(data[key])
        theMerchantVisualProduction[key] = val
      }
  });
  console.log("us7")
  if (invalidFields.length > 0 && invalidFields.length != exclusions.length){
      console.log("us8")
      const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'address_obligatory_fields', 404,path,invalidFields,[]);
      console.log(probs_context)
      const error_lam = await MOVIESHOP.create_error_message(probs_context)
      console.log("us9")
      let result3 = {
        visualProduction:null,
        errors: error_lam

      }
      console.log("us1000kj")
      return result3;
  }

  let result2 = {
    visualProduction:theMerchantVisualProduction,
    errors: []

  }
  console.log("us22")
  return result2;
}

async function getItem(params){
  try {
    const data = await dynamoDb.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.update = async (event, context, callback) => {

  const params = {
    TableName: process.env.CB_DYNAMO_DB_MERCHANTVISUALPRODUCTION,
    Key: {
      id: event.pathParameters.id,
    },
  };
  
  try{
    console.log("x222")
    const result = await getItem(params)
    console.log("x111")
    console.log(result)
    if (JSON.stringify(result) === '{}') {
        console.log("4444")
        const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'address_obligatory_fields', 404,path);
        console.log(probs_context)
        const error_lam = await MOVIESHOP.create_error_message(probs_context)
        console.log("5555");
        callback(null, error_lam);
        console.log("6666");
        return;
    } else {
        console.log("a111")
        const data = JSON.parse(event.body);
        console.log("a112")
        console.log(data)
        console.log("a113")
        console.log(result)

        console.log("99999999")

        console.log('qwe4')
        var theMerchantVisualProduction = result.Item.visualproductions.filter(s => s.id === event.pathParameters.idMerchantVisualProduction);
        console.log('qwe5')
        if (theMerchantVisualProduction.length == 0){
          console.log('qwe6')
          const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'resource_not_found', 404,path);
          console.log(probs_context)
          const error_lam = await MOVIESHOP.create_error_message(probs_context)
          callback(null, error_lam);
          return;
        }
        console.log('qwe7')
        console.log(theMerchantVisualProduction)
        console.log("a114")
        var otherMerchantVisualProduction = result.Item.visualproductions.filter(s => s.id != event.pathParameters.idMerchantVisualProduction);        
        console.log("a1")
        const resultMerchantVisualProduction = await updateMerchantVisualProduction(theMerchantVisualProduction[0],data,event.path,[],[]);
        console.log("marcel")
        console.log("a3")
        if (resultMerchantVisualProduction.errors.length == 0){
          console.log("a4")
          otherMerchantVisualProduction.push(resultMerchantVisualProduction.visualProduction);
        } else {
          console.log("a5")
          console.log(resultOrder.errors)
          const response = {
            statusCode: 404,
            body: JSON.stringify(resultOrder.errors),
        };
        callback(null, resultOrder.errors);
        return;
      }  
      console.log("a6")
      result.Item.visualproductions = otherMerchantVisualProduction;
      const params = {
        TableName: process.env.CB_DYNAMO_DB_MERCHANTVISUALPRODUCTION,
        Item: result.Item,
      };
      try{
        console.log("a7")
        const data1 = await dynamoDb.put(params).promise();
        console.log("a8")
      } catch (err) {
        console.log("a9")
          const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_merchantvisualproduction_error', 404,path);
          console.log(probs_context)
          const error_lam = await MOVIESHOP.create_error_message(probs_context)
          console.log("a10")
          callback(null, error_lam);
      }
      const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(result.Item.visualproductions),
      };
      callback(null, response);
      return;
    }
    

  } catch (err) {
    console.log("a12")
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_merchantvisualproduction_error', 400,path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context)
    console.log("a13")
    console.log(error_lam)
    callback(null, error_lam);
    console.log("a14")
    return;
  }
};

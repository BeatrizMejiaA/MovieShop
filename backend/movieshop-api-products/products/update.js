'use strict';

const AWS = require('aws-sdk'); 

const https = require('https');

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const MOVIESHOP = require('movieshop-libutils'); 

const exclusions = []

const required_fields = ["name","photos","price","shippingPrice"]

const empty_fields = []

async function validateProductItem(data,path){
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
      console.log(key)
    }
  });

  if (forbidden_fields.length > 0){
    console.log("7777777aaaaa")

    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'forbidden_field_for_object', 400,path,forbidden_fields,[]);
    console.log(probs_context)
    const response = await MOVIESHOP.create_error_message(probs_context);
    console.log(response)  

    let result = {
      valid:false,
      errors: response
    }
    console.log("zzzzzzz6")
    console.log(result)
    console.log("zzzzzzz777777")
    return result
  }

  ////////
  Object.entries(data).forEach(async ([key, val]) => {

    console.log("ggggggggggddddddddn1123123")
    console.log(key)
    console.log(val)
    if (val === ""){
      onsole.log("ggggggggggddddddddn1123123898989")
      console.log(key)
      if (!required_fields.includes(key)){
        empty_fields.push(key);
      }
    }
  });

  if (empty_fields.length > 0){
    console.log("llllllllLLLLLLLLOOOOOOO")
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'empty_field', 400,path,empty_fields,[]);
    console.log(probs_context)
    const response = await MOVIESHOP.create_error_message(probs_context);
    console.log("JOJOJO")
    let result = {
      valid:false,
      errors: response
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
    const response = await MOVIESHOP.create_error_message(probs_context);
    console.log(response)  
    console.log("zzzzz5")
    let result = {
      valid:false,
      errors: response
  
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

async function updateProductItem(theProductItem,data,path){

  const validation = await validateProductItem(data,path)
  console.log("gggggporta")
  if (!validation.valid){
    let result2 = {
      productItem:null,
      errors: validation.errors
  
    }
    return result2
  }
  console.log("us1")
  console.log(theProductItem)
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
        theProductItem[key] = val
      } else if (typeof(data[key]) != "undefined") {
        console.log("us6")
        addressLabel = addressLabel + ' ' + data[key];
        console.log(addressLabel)
        invalidFields.push(key);
      }
  });
  console.log("us7")
  if (invalidFields.length > 0 && invalidFields.length != exclusions.length){
    console.log("us8")
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'address_obligatory_fields', 400,path,exclusions,[]);
    console.log(probs_context)
    const response = await MOVIESHOP.create_error_message(probs_context);
    console.log("us9")
    let result3 = {
      wishlistItem:null,
      errors: response

    }
    console.log("us1000kj")
    return result3;
  }

  if (addressLabel != ""){
    console.log("us11")
    let searchAddress = encodeURIComponent(`${addressLabel}`)
    console.log("us12")
    console.log(searchAddress)
    console.log("us17")
    console.log("us20")
    console.log(theProductItem);
    console.log("us21")
  }
  let result2 = {
    productItem:theProductItem,
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
    TableName: process.env.CB_DYNAMO_DB_PRODUCTS,
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
        console.log("4444");
        const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'resource_not_found', 400,path);
        console.log(probs_context)
        const error_lam = await MOVIESHOP.create_error_message(probs_context);
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
        var theProductItem = result.Item.products.filter(s => s.id === event.pathParameters.idProduct);
        console.log('qwe5')
        if (theProductItem.length == 0){
          console.log('qwe6')
          const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'resource_not_found', 400,path);
          console.log(probs_context)
          const error_lam = await MOVIESHOP.create_error_message(probs_context);
          callback(null, error_lam);
          return;
        }
        console.log('qwe7')
        console.log(theProductItem)
        console.log("a114")
        const otherProductsListItems = result.Item.products.filter(s => s.id != event.pathParameters.idProduct);
        console.log("a1")
        const resultProductslist = await updateProductItem(theProductItem[0],data,event.path,[],[]);
        console.log("marcel")
        console.log("a3")
        if (resultProductslist.errors.length === 0){
          console.log("a4")
          theProductItem = resultProductslist.productItem;
          otherProductsListItems.push(theProductItem)
        } else {


          console.log("a5")
          console.log(resultProductslist.errors)
          const response = {
              statusCode: 404,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(resultProductslist.errors),
            };
          callback(null, resultProductslist.errors);
          return;          
      }  
      console.log("a6")

      result.Item.products = otherProductsListItems;
      
      const params3 = {
        TableName: process.env.CB_DYNAMO_DB_PRODUCTS,
        Item: result.Item,
      };

      try{
        console.log("a7")
        const data1 = await dynamoDb.put(params3).promise();
        console.log("a8")
      } catch (err) {
        console.log("a9")
        const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_product_error', 400,path);
        console.log(probs_context)
        const error_lam = await MOVIESHOP.create_error_message(probs_context);
        console.log("a10")
        callback(null, error_lam);
      }
      const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(result.Item.products),
      };
      callback(null, response);
      return;
    }
    

  } catch (err) {
    console.log("a12")
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_product_error', 400,path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    console.log("a13")
    console.log(error_lam)
    callback(null, error_lam);
    console.log("a14")
    return;
  }
};

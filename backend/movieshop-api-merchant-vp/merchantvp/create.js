'use strict';

const AWS = require('aws-sdk'); 

const https = require('https');

const MOVIESHOP = require('movieshop-libutils')

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const MERCHANT_VISUAL_PRODUCTION_PREFIX = 'MVP-';

const required_fields = ["name","photo","apiId","source","products"]

async function validateVisualProductionItem(data,path){
  console.log("z")
  var missing_types = []
  var obligatory_fields = []
  console.log("zz")
  var size = Object.keys(data).length;
  if (size != required_fields.length){
    console.log("zzzz4")
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'generic_obligatory_fields', 400,path,required_fields,[]);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    console.log("zzzzz5")
    let result = {
      valid:false,
      errors: error_lam
  
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  }

  var forbidden_fields = [];
  Object.keys(data).forEach(async key => {
    console.log("88888888")
    if (!required_fields.includes(key)){
      console.log("7777777")
      forbidden_fields.push(key);
    }
  });

  if (forbidden_fields.length > 0){
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'forbidden_field_for_object', 400,path,forbidden_fields,[]);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
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
    console.log("zzzz4")
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'address_obligatory_fields', 400,path,obligatory_fields,[]);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
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

function createUniqueCode(name, id) {
  // Remove all whitespace from the name
  let cleanedName = name.replace(/\s+/g, '');

  // Concatenate the cleaned name with the ID
  let combined = cleanedName + id;

  // Convert the combined string to uppercase
  return combined.toUpperCase();
}


async function createVisualProductionItem(data,path){

  try{
    const validation = await validateVisualProductionItem(data,path)
    if (!validation.valid){
      let result2 = {
        productItem:null,
        errors: validation.errors
    
      }
      return result2
    }

    const visualProductionId = createUniqueCode(data.name, data.apiId)

    const timestamp = new Date().getTime();
    console.log("Ola10");
    let visualProductionItem = {
      id: MERCHANT_VISUAL_PRODUCTION_PREFIX + visualProductionId,
      name: data.name,
      photo: data.photo,
      apiId: data.apiId,
      source: data.source,
      products: data.products,
      createdAt: timestamp,
    }
    console.log("Ola11");
    console.log(visualProductionItem);
    let result2 = {
      visualProductionItem: visualProductionItem,
      errors: []
  
    }
    return result2;
  } catch (err) {
    console.log("ola10002341213123")
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 500,path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    let resulterr = {
      productItem:null,
      errors: error_lam
  
    }
    return resulterr;
  }
}

async function getItem(params){
  try {
    const data = await dynamoDb.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.create = async (event, context, callback) => {

  console.log(event);

  const params = {
    TableName: process.env.CB_DYNAMO_DB_MERCHANTVISUALPRODUCTION,
    Key: {
      id: event.pathParameters.id,
    },
  };


  try{
    const result = await getItem(params)

    console.log("ifif")
    console.log(JSON.stringify(result))

    if (JSON.stringify(result) === '{}') {
      console.log("Ola2");
        console.log(context);
        const data = JSON.parse(event.body);
        console.log(event);
        const cont = event.requestContext.stage;
        console.log(cont);

      
        let resultVisualProductionItem = await createVisualProductionItem(data,event.path);
        var visualProductionItem;
        if (resultVisualProductionItem.errors.length == 0){
          console.log("a4")
          visualProductionItem = resultVisualProductionItem.visualProductionItem;
          console.log(visualProductionItem)
        } else {
          console.log("a5")
          console.log(resultVisualProductionItem.errors)
          const response = {
              statusCode: 400,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(resultVisualProductionItem.errors),
            };
          callback(null, response);
          return;
        }

        const params2 = {
          TableName: process.env.CB_DYNAMO_DB_MERCHANTVISUALPRODUCTION,
          Item: {
            id: event.pathParameters.id,
            visualproductions: [
              resultVisualProductionItem.visualProductionItem
            ],
          },
        };
        console.log("params2");
        console.log(params2);

        
        try{
          const data1 = await dynamoDb.put(params2).promise();
          console.log(data1);
        } catch (err) {
          const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 500,path);
          console.log(probs_context)
          const error_lam = await MOVIESHOP.create_error_message(probs_context);
          callback(null, error_lam);
        }
        const response = {
            statusCode: 201,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(visualProductionItem),
        };
        callback(null, response);
        return;
    } else {
        console.log("bbbbb");
        console.log("Ola3");
        console.log(context);
        console.log(result);
        const data = JSON.parse(event.body);
        console.log(data);
        console.log(event);
        const cont = event.requestContext.stage;
        console.log(cont);
        let resultVisuakProductionItem = await createVisualProductionItem(data,event.path);
        var visualProductionItem;
        if (resultVisuakProductionItem.errors.length == 0){
            console.log("a4")
            visualProductionItem = resultVisuakProductionItem.visualProductionItem;
        } else {
            console.log("a5")
            console.log(resultVisuakProductionItem.errors)
            const response = {
                statusCode: 404,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(resultVisuakProductionItem.errors),
              };
            callback(null, resultVisuakProductionItem.errors);
            return;
        }

          result.Item.visualproductions.push(visualProductionItem);
          const params3 = {
            TableName: process.env.CB_DYNAMO_DB_MERCHANTVISUALPRODUCTION,
            Item: {
              id: event.pathParameters.id,
              visualproductions: result.Item.visualproductions,
            },
          };

          console.log(params3);
          
          try{
            const data1 = await dynamoDb.put(params3).promise();
            console.log(data1);
          } catch (err) {
              const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 500,path);
              console.log(probs_context)
              const error_lam = await MOVIESHOP.create_error_message(probs_context);
              callback(null, error_lam);
              return;
          }
          const response = {
              statusCode: 201,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(visualProductionItem),
          };
          callback(null, response);
          return;
    }

  } catch (err) {
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 500,path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    callback(null, error_lam);
  }
  
};
'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const MOVIESHOP = require('movieshop-libutils'); 

async function getError (language,id,status,instance) {

  return await new Promise((success,error) => {

    var lparams = {
      FunctionName: 'movieshop-lambda-probs-'+ process.env.CB_STAGE + '-getprob',
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: JSON.stringify('{"id" : "' + id + '","language" : "' + language + '"}')
    
    }; 
    
    console.log(lparams);
    //"invalid_params":"[{}]"
    lambda.invoke(lparams,function(err, lambdadata){
      if (err){
          error(err);
      } else {
        var payloadBody = JSON.parse(lambdadata.Payload);
        var extension = { status: status , instance: instance};
        const newBody = Object.assign({}, JSON.parse(payloadBody.body),extension);
        console.log(newBody)
        var errors = {errors:[]}
        errors.errors.push(newBody)
        const response = {
          statusCode: status,
          headers: { 
            'Content-Type': 'application/problem+json',
          },
          body: JSON.stringify(errors),
        };
          success(response);
      }
      
    });
  });
}

async function getItem(params){
  try {
    const data = await dynamoDb.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.delete = async (event, context, callback) => {

  const params = {
    TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
    Key: {
      id: event.pathParameters.idVisualProduction,
    },
  };

  try {
    console.log("11111");
    const result = await getItem(params);
    console.log("22222");
    const instance = `/merchants/${event.pathParameters.id}/visualproductions/${event.pathParameters.idVisualProduction}`;
    console.log("3333");
    if (JSON.stringify(result) === '{}') {
      console.log("4444");
      const error_lam = await getError("en", "resource_not_found",404,instance);
      console.log("5555");
      callback(null, error_lam);
      console.log("6666");
      return;
    } else {
      
      console.log("aaaa");
      var filteredMerchants = result.Item.merchants.filter(s => s.id != event.pathParameters.id);
      console.log("bbbb");
      console.log(theMerchant)
      console.log("ffff");

      if (result.Item.merchants.length === 1){
        const paramDeleteVisualProduction = {
          TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
          Key: {
            id: result.Item.idVisualProduction,
          },
        };

        // delete the todo from the database
        const data = await dynamoDb.delete(paramDeleteVisualProduction, async (error) => {
          // handle potential errors
          if (error) {
            const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'generic_error', 400,event.path);
            console.log(probs_context)
            const error_lam = await MOVIESHOP.create_error_message(probs_context);
            callback(null, error_lam);
            return;
          }

          // create a response
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({}),
          };
          callback(null, response);
        }).promise();
      } else {

        const filteredMerchants = result.Item.merchants.filter(s => s.id != event.pathParameters.id);
        console.log("ffff11");
        if (filteredMerchants.length == result.Item.merchants.length){
          console.log("ffff222");
          const error_lam = await getError("en", "resource_not_found",404,instance);
          console.log("ffff3333");
          callback(null, error_lam);
          console.log("ffff444");
          return;
        }
        console.log("ffff5555");
        result.Item.merchants = filteredMerchants;
        console.log("ffff66666");
        console.log(JSON.stringify(result));
        console.log("ffff7777");
        const params1 = {
          TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
          Item: result.Item,
        };
        console.log("ffff88888");
        try{
          console.log("ffff9999");
          const data1 = await dynamoDb.put(params1).promise();
          console.log("ffff101010");
          const response = {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(result.Item),
            };
            console.log("ffff1111");
          callback(null, response);
          return;
        } catch (err) {
            const error_lam = await getError("pt", "insert_generic_visualproduction_error",400,instance);
            callback(null, error_lam);
        }
      }
    }
  } catch (error) {
    console.log("7777");
    console.error(error);
    const error_lam = await getError("pt", "insert_generic_visualproduction_error",400,instance);
    callback(null, error_lam);
    return;
  }
};

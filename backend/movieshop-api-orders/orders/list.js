'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependenciess

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

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

module.exports.list = async (event, context, callback) => {

  const params = {
    TableName: process.env.CB_DYNAMO_DB_ORDERS,
    Key: {
      id: event.pathParameters.id,
    },
  };

  console.log(context);
  console.log(event);
  try {
    const result = await getItem(params);
    if (JSON.stringify(result) === '{}') {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: "[]",
      };
      callback(null, response);
      return;
    } else {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(result.Item.orders),
      };
      callback(null, response);
    }
  } catch (error) {
    console.error(error);
    const error_lam = await getError("en", "generic_error",500,event.path);
    callback(null, error_lam);
    return;
  }

};

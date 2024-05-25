'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const MOVIESHOP = require('movieshop-libutils')


async function getItem(params){
  try {
    const data = await dynamoDb.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.get = async (event, context, callback) => {

  const params = {
    TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
    Key: {
      id: event.pathParameters.id,
    },
  };

  console.log(context);
  console.log(event);
  try {
    const result = await getItem(params);

    if (JSON.stringify(result) === '{}') {

      const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'resource_not_found', 404,event.path);
      console.log(probs_context)
      const error_lam = await MOVIESHOP.create_error_message(probs_context)
      callback(null, error_lam);
      return;
    } else {

      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(result),
      };
      callback(null, response);
    }
  } catch (error) {
    console.error(error);
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'generic_error', 500,event.path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context)
    callback(null, error_lam);
    return;
  }

};


    

    

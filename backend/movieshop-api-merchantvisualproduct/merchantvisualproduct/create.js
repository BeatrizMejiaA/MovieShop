'use strict';

const crypto = require("crypto")
const MOVIESHOP = require('movieshop-libutils'); 
const AWS = require('aws-sdk'); 
const MERCHANT_VP_PREFIX = 'MVP-';
const GENERIC_USER = 'GENERIC_USER';

const DADOS_CRIPTOGRAFAR = {
  algoritmo : "sha256",
  tipo : "hex"
};
const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  region: process.env.CB_REGION
});

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.create = async (event, context, callback) => {

  const timestamp = new Date().getTime();
  console.log(context);
  const data = JSON.parse(event.body);
  console.log(event);
  const cont = event.requestContext.stage;
  console.log(cont);
  const startIndex = cont.indexOf('-')+1;
  const endIndex = cont.indexOf('-',5)+1;

  const stage_country = cont.substring(startIndex,endIndex);

  // visualproductions: 
  // [
  //   { 
  //     id: data.id,
  //     name: data.name,
  //     products: [
  //       { 
  //         id: data.id,
  //         name: data.name,
  //         products: []
    
  //       }
  //     ]

  //   }
  // ],

  
  const params = {
    TableName: process.env.CB_DYNAMO_DB_MERCHANTVISUALPRODUCTION,
    Item: {
      id: event.pathParameters.id,
      visualproductions: data.visualproductions,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  console.log(params);

  try{
    const data1 = await dynamoDb.put(params).promise();
  } catch (err) {
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_merchantvisualproduction_error', 400,event.path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    callback(null, error_lam);
  }
  const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
  };
  callback(null, response);
};

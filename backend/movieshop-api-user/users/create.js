'use strict';

const crypto = require("crypto")
const MOVIESHOP = require('movieshop-libutils'); 
const AWS = require('aws-sdk'); 

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

function generateEmailParams (name,email,password) {

  if (!(email)) {
    throw new Error('Missing parameters! Make sure to add parameters \'email\'.')
  }

  const params = {
    "Source": process.env.EMAIL,
    "Template": process.env.CB_TEMPLATE_EMAIL_NS,
    "Destination": {
      "ToAddresses": [ email]
    },
    "TemplateData": JSON.stringify({
      "nome" : name,
      "email" : password,
    })
  }
  return params
}

module.exports.create = async (event, context, callback) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
  const timestamp = new Date().getTime();
  console.log(context);
  const data = JSON.parse(event.body);
  console.log(event);
  const cont = event.requestContext.stage;
  console.log(cont);
  const startIndex = cont.indexOf('-')+1;
  const endIndex = cont.indexOf('-',5)+1;
  console.log("BBBBBBBBBBBBBBBBBBB")
  const stage_country = cont.substring(startIndex,endIndex);
  
  var senha = data.password;
  var novaSenha = crypto.createHash(DADOS_CRIPTOGRAFAR.algoritmo).update(JSON.stringify(senha)).digest(DADOS_CRIPTOGRAFAR.tipo)
  console.log(novaSenha);
  if (senha !== data.repeatpass){
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'passwords_not_equal', 401,event.path);
    console.log(probs_context)
    const response = await MOVIESHOP.create_error_message(probs_context);
    console.log(response)
    callback(null, response);
    return;
  }

  console.log("CCCCCCCCCCCCCCCCCCCCCCCCC")
  const params = {
    TableName: process.env.CB_DYNAMO_DB_USERS,
    Item: {
      id: data.id,
      name: data.name,
      middleName: data.middleName,
      lastName: data.lastName,

      mobile: data.mobile,
      city: data.city,
      state: data.state,
      address1: data.address1,
      address2: data.address2,
      zipCode: data.zipCode,
      birthDate: data.birthDate,
      photo: data.photo,
      password: novaSenha,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  console.log(params);

  console.log("DDDDDDDDDDDDDDDDDDDDDDDd")
  try{
    const data1 = await dynamoDb.put(params).promise();
    const emailParams = generateEmailParams(data.name, data.id.toLowerCase(), JSON.stringify(novaSenha));
    ses.sendTemplatedEmail(emailParams, async (err, data2) => {
      if (err) {
        console.log("1111111111111111")
        const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'send_new_user_email_error', 401,event.path);
        console.log(probs_context)
        const error_lam = await MOVIESHOP.create_error_message(probs_context);
        console.log(error_lam);
      } else {
        console.log("2222222")
        const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'send_new_user_email_success', 201,event.path);
        console.log("2222222aaaabbbbbbbb")
        console.log(probs_context)
        const error_lam = await MOVIESHOP.create_error_message(probs_context);
        console.log(error_lam);
      }
    });


  } catch (err) {
    console.log("DDDDDEEEEEEE")
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_user_error', 400,event.path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    callback(null, error_lam);
  }
  console.log("EEEEEEEEEEEEEEEEEEEEEEEE")
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

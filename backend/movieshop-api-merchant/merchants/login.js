'use strict';

const crypto = require("crypto");
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')

AWS.config.update({
  region: process.env.CB_REGION
})

const DADOS_CRIPTOGRAFAR = {
  algoritmo : "sha256",
  tipo : "hex"
};

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.login = (event, context, callback) => {

  console.log(event);

  const data = JSON.parse(event.body);

  console.log(data);

  const params = {
    TableName: process.env.CB_DYNAMO_DB_MERCHANTS,
    Key: {
      id: data.id,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false,
        },
        body: 'Impossible retrieve user data.',
      });
      return;
    } else {
      if (JSON.stringify(result) === '{}') {
        const userNotFound = {
          login: false,
          message: 'User not found',
          user: data.id,
        };
  
        const responseNotFound = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(userNotFound),
        };
  
        callback(null, responseNotFound);
        return;
      } else {
        
        const verify = crypto.createHash(DADOS_CRIPTOGRAFAR.algoritmo).update(JSON.stringify(data.password)).digest(DADOS_CRIPTOGRAFAR.tipo);
  
        console.log(result);
        console.log(verify);

        if (result.Item.password !== verify){

          const loginError = {
            login: false,
            message: 'Password does not match',
            user: data.id,
          };
    
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': false,
            },
            body: JSON.stringify(loginError),
          };
    
          callback(null, response);
          return;
        }
  
      }
  
      const signature = {
        name: result.Item.name,
        id: data.id,
      };
  
      console.log('Issuing token for:');
      console.log(signature);
      console.log(process.env.CB_JWT_SECRET);
      const token = jwt.sign(signature, process.env.CB_JWT_SECRET, { expiresIn: '60s' });
      // create a response
      const bodySuccess = {
        id: result.Item.id,
        name: result.Item.name,
        lastName: result.Item.lastName,
        email: result.Item.email,
        mobile: result.Item.mobile,
        city: result.Item.city,
        state: result.Item.state,
        birthDate: result.Item.birthDate,
        token: token,
        login: true,
      };
      console.log(bodySuccess);
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false,
        },
        body: JSON.stringify(bodySuccess),
      };
      callback(null, response);
    }
  });
};

'use strict';

const crypto = require("crypto");
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const DADOS_CRIPTOGRAFAR = {
  algoritmo : "sha256",
  tipo : "hex"
};

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({apiVersion: '2010-12-01'});

function generateEmailParams (email,password) {

  if (!(email)) {
    throw new Error('Missing parameters! Make sure to add parameters \'email\'.')
  }

  const params = {
    "Source": process.env.EMAIL,
    "Template": process.env.CB_TEMPLATE_EMAIL_AS,
    "Destination": {
      "ToAddresses": [ email]
    },
    "TemplateData": JSON.stringify({
      "senha" : password,
    })
  }
  return params
}

function generate(n) {
  var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

  if ( n > max ) {
          return generate(max) + generate(n - max);
  }

  max        = Math.pow(10, n+add);
  var min    = max/10; // Math.pow(10, n) basically
  var number = Math.floor( Math.random() * (max - min + 1) ) + min;

  return ("" + number).substring(add); 
}

module.exports.send = (event, context, callback) => {

  const timestamp = Math.floor(Math.random() * 899999 + 100000);

  const data = JSON.parse(event.body);

   const params = {
     TableName: process.env.CB_DYNAMO_DB_USERS,
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
          'Access-Control-Allow-Credentials': true,
        },
        body: 'Impossible to retrieve user data.',
      });
      return;
    } else {
      if (JSON.stringify(result) === '{}') {
        const userNotFound = {
          code: "user_not_found",
          message: 'User not found',
          user: data.email,
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

        const novaSenha = crypto.createHash(DADOS_CRIPTOGRAFAR.algoritmo).update(JSON.stringify(timestamp)).digest(DADOS_CRIPTOGRAFAR.tipo);

        const emailParams = generateEmailParams(data.email,JSON.stringify(timestamp));
      
        ses.sendTemplatedEmail(emailParams, (err, data) => {
            if (err) {
              const response = {
                statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
                body: JSON.stringify(err),
              };
              callback(null, response);
            } else {
              const response = {
                statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
                body: JSON.stringify(data),
              };
              callback(null, response);
              }
        })

        const params = {
          TableName: process.env.CB_DYNAMO_DB_USERS,
          Key: {
            id: data.id,
          },
          ExpressionAttributeNames: {
            '#password': 'password',
          },
          ExpressionAttributeValues: {
            ':password': novaSenha,
            ':updatedAt': timestamp,
          },
          UpdateExpression: 'SET #password = :password, updatedAt = :updatedAt',
          ReturnValues: 'ALL_NEW',
        };
      
        // update the todo in the database
        dynamoDb.update(params, (error, result) => {
          // handle potential errors
          if (error) {
            console.error(error);
            callback(null, {
              statusCode: error.statusCode || 501,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              headers: { 'Content-Type': 'text/plain' },
              body: 'Couldn\'t update password the user item.' + error,
            });
            return;
          }
          // create a response
          const response = {
            statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify(result.Attributes),
          };
          callback(null, response);
        });

      }
    }
  });
};

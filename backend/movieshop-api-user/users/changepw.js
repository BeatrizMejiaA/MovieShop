'use strict';

const crypto = require("crypto");
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const DADOS_CRIPTOGRAFAR = {
  algoritmo : "sha256",
  tipo : "hex"
};
AWS.config.update({region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.changepw = (event, context, callback) => {

  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  //First verify if retype match
  if (data.password !== data.repeatpass){

    const loginError = {
      message: 'Password not match',
      status: 'invalid',
    };

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(loginError),
    };

    callback(null, response);
    return;
  }

  const params = {
    TableName: process.env.CB_DYNAMO_DB_USERS,
    Key: {
      id: data.id,
    },
  };

    // fetch oldpassword from the database
  dynamoDb.get(params, (error, result) => {
      // handle potential errors
      console.log("5");
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: 501,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': false,
          },
          body: 'User not found.',
        });
        return;
      } else {

        if (JSON.stringify(result) === '{}') {
          console.error(error);
          callback(null, {
            statusCode: 501,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': false,
            },
            body: 'User not found.',
          });
          return;
        }
        else 
        {
          const oldpw = crypto.createHash(DADOS_CRIPTOGRAFAR.algoritmo).update(JSON.stringify(data.oldPassword)).digest(DADOS_CRIPTOGRAFAR.tipo);

          if (oldpw !== result.Item.password){
            return callback(null, {
              statusCode: 401,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': false,
              },
              body: 'Invalid seurity code',
            });
            return;
          } else {

            const newpw = crypto.createHash(DADOS_CRIPTOGRAFAR.algoritmo).update(JSON.stringify(data.password)).digest(DADOS_CRIPTOGRAFAR.tipo);
            const updateparams = {
              TableName: process.env.CB_DYNAMO_DB_USERS,
              Key: {
                id: data.id,
              },
              ExpressionAttributeNames: {
                '#password': 'password',
              },
              ExpressionAttributeValues: {
                ':password': newpw,
                ':updatedAt': timestamp,
              },
              UpdateExpression: 'SET #password = :password, updatedAt = :updatedAt',
              ReturnValues: 'ALL_NEW',
            };
          
            // update the user in the database
            dynamoDb.update(updateparams, (error, result) => {
              // handle potential errors
              if (error) {
                console.error(error);
                callback(null, {
                  statusCode: 501,
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': false,
                  },
                  body: 'Impossible change password.' + error,
                });
                return;
              }
          
              // create a response
              const response = {
                statusCode: 200,
                    headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Credentials': false,
                    },
                body: JSON.stringify(result.Attributes),
              };
              callback(null, response);
            });
          }
        }  
      }
  }); 
};
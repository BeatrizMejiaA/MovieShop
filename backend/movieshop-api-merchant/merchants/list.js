'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.list = (event, context, callback) => {

  const names  = event.multiValueQueryStringParameters.name[0];
  const lastName  = event.multiValueQueryStringParameters.lastName[0];
  //const city  = event.multiValueQueryStringParameters.city[0];
  const birthDate  = event.multiValueQueryStringParameters.birthDate[0];
  //const email  = event.multiValueQueryStringParameters.email[0];

  var params = {
    TableName: process.env.CB_DYNAMO_DB_MERCHANTS,
    FilterExpression: "#name = :name AND lastName = :lastName AND birthDate = :birthDate",
    ExpressionAttributeValues: {
      ":name": name,
      ":lastName": lastName,
      ":birthDate": birthDate,
    },
    ExpressionAttributeNames: {
      "#name": "name"
    }
  };

  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Impossible to retrieve user data.',
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
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.name !== 'string' || typeof data.password !== 'string') {
    console.error('Not possible to validate entry point data');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Impossible to change user.',
    });
    return;
  }

  const params = {
    TableName: process.env.CB_DYNAMO_DB_MERCHANTS,
    Key: {
      id: data.id,
    },
    ExpressionAttributeNames: {
      '#name': 'name',
      '#middleName': 'middleName',
      '#lastName': 'lastName',
      '#email': 'email',
      '#address1': 'address1',
      '#address2': 'address2',
      '#zipCode': 'zipCode',
      '#city': 'city',
      '#state': 'state',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':middleName': data.middleName,
      ':lastName': data.lastName,
      ':email': data.email,
      ':address1': data.address1,
      ':address2': data.address2,
      ':zipCode': data.zipCode,
      ':city': data.city,
      ':state': data.state,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #name = :name, #middleName = :middleName, #lastName = :lastName, ' + 
                      '#email = :email, #address1 = :address1, address2 = :address2, zipCode = :zipCode'+
                      '#city = :city, #state = :state, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
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
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};

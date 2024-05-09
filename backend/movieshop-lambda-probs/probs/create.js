'use strict';

const AWS = require('aws-sdk'); 

//const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();



module.exports.create = (event, context, callback) => {

  const timestamp = new Date().getTime();
  console.log(event);
  const data = JSON.parse(JSON.stringify(event));
    const params = {
        TableName: process.env.UGO_DYNAMO_DB_PROBS,
        Item: {
            id: data.language + '_' + data.id,
            type: data.type,
            title: data.title,
            detail: data.detail,
            instance: data.instance,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };
    console.log(params);
    // write the todo to the database
    
    dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
        console.error(error);
        callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Not possible to create json problem solving table.',
        });
        return;
    }
    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };
    callback(null, response);
    });
};

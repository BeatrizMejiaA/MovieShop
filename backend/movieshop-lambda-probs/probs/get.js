'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
    console.log(event);
    console.log("1");
    var ids = "";
    //const ev = JSON.parse(event);
    //console.log(ev);
    if (event.hasOwnProperty('pathParameters'))
    {
        //const pp = JSON.parse(event.pathParameters);
        ids = event.pathParameters.id;
    } else {
        const ev = JSON.parse(event);
        ids = ev.language + '_' + ev.id;    
    }
    console.log("2");
    console.log(ids);
    console.log("3");
  const params = {
    TableName: process.env.MOVIESHOP_DYNAMO_DB_PROBS,
    Key: {
      id: ids
    },
  };
  console.log(params);
  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false,
        },
        body: 'Impossible to read error messages.',
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
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};

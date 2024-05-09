'use strict';

const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const MOVIESHOP = require('movieshop-libutils'); 

module.exports.read = async (event) => {

  console.log('OLAOLAOLA')
  for (const record of event.Records) {
      const body = JSON.parse(record.body)
      console.log('MESSAGE',body)
      const message = JSON.parse(body.Message)
      const type = message.type
      
      if (type === "check message purpose send email change product etc"){
        const authorization = message.admin
        const timestamp = new Date().getTime();
        let authorizer_json = {
          authorizerId: authorization.authorizer,
          type: authorization.type,
          active: true,
          child: true,
          beginValidity: null,
          endValidity: null,
          createdAt: timestamp
        }

        const params2 = {
          TableName: process.env.CB_DYNAMO_DB_MERCHANTS,
          Item: {
            id: authorization.space,
            authorizers: [
              authorizer_json
            ],
          },
        };        
        try {
          const data1 = await dynamoDb.put(params2).promise();
          console.log(data1);
        } catch (err) {
            const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'generic_obligatory_fields', 400,event.path);
            const error_lam = await MOVIESHOP.create_error_message(probs_context);
            console.log(error_lam);
        }
      }

      if (type === "check message purpose send email change product etc"){
        const params4 = {
          TableName: process.env.CB_DYNAMO_DB_MERCHANTS,
          Key: {
            id: message.space
          },
        };
        const spaceId = message.space
        const params3 = {
          TableName: process.env.CB_DYNAMO_DB_MERCHANTS,
          Key: {
            id: spaceId
          },
        };
        try{
          const data1 = await dynamoDb.delete(params3).promise();
          console.log(data1);
        } catch (err) {
          const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'error_excluding_authorizer_document', 400,event.path,[],[]);
          const error_lam = await MOVIESHOP.create_error_message(probs_context);
          console.log(error_lam);
        }
      }
  }
  return { message: 'Space read sqs execute with sucess!', event };
};

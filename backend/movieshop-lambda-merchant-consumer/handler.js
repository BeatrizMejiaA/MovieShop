'use strict';
const AWS = require('aws-sdk');
const { promises } = require('fs');
const converter = AWS.DynamoDB.Converter
AWS.config.update({
  region: process.env.AWS_REGION
})
const SNS = new AWS.SNS()
module.exports.listen = async event => {
  const snsPromisses = []
  for (const record of event.Records) {
    if (record.eventName === 'MODIFY' || record.eventName === 'INSERT'){
      const newImage = converter.unmarshall(record.dynamodb.NewImage)
      console.log('New',newImage)
      const dinamo = converter.unmarshall(record.dynamodb)
      console.log('dinamo',dinamo)
      var consumerJson = {
        type: 'check types of messages needed',
        newUser: newImage
      };
      snsPromisses.push(SNS.publish({
        TopicArn: process.env.SNS_MERCHANT_NOTIFICATIONS_TOPIC,
        Message: JSON.stringify(consumerJson)
      }).promise())
    }
  }
  await Promise.all(snsPromisses)
  console.log('Mensagens enviadas com sucesso')
  console.log(event);
  return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

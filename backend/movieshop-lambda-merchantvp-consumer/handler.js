'use strict';
const AWS = require('aws-sdk');
const { promises } = require('fs');
const converter = AWS.DynamoDB.Converter
AWS.config.update({
  region: process.env.AWS_REGION
})
const SNS = new AWS.SNS()
module.exports.listen = async event => {
  console.log(event)
  const snsPromisses = []
  const type = 'new_mvp_message';

  for (const record of event.Records) {

    const type = 'new_mvp_message'

    const dinamo = converter.unmarshall(record.dynamodb)
    console.log('dinamo',dinamo)

    if (record.eventName === 'MODIFY' || record.eventName === 'INSERT'){

      const newImage = converter.unmarshall(record.dynamodb.NewImage)
      const oldImage = converter.unmarshall(record.dynamodb.OldImage)
      console.log('New',newImage)
      console.log('Old',oldImage)
      const dinamo = converter.unmarshall(record.dynamodb)
      console.log('dinamo',dinamo)
      if (oldImage != "undefined"){
        console.log(oldImage)
      }
      console.log('Old',oldImage)
      console.log("a")

      if (oldImage != "undefined" && oldImage.visualproductions != "undefined" && newImage != "undefined" && newImage.visualproductions != "undefined"){
        console.log("b")
        if (JSON.stringify(oldImage) === '{}') {
          console.log("JSON.stringify(oldImage.visualproductions) === '{}'")    
          console.log("f")
          var consumerJson = {
            type: type,
            newMvp: newImage
          };
          snsPromisses.push(SNS.publish({
            TopicArn: process.env.SNS_MERCHANTVISUALPRODUCTION_NOTIFICATIONS_TOPIC,
            Message: JSON.stringify(consumerJson)
          }).promise())
        } else {
          console.log("xiiiiii1")
          if (oldImage.visualproductions.length > newImage.visualproductions.length){
            console.log("c") 
            const idsInList2 = new Set(newImage.visualproductions.map(obj => obj.id));
            console.log("kkkkkkkkk")
            const uniqueInList1 = oldImage.visualproductions.filter(obj => !idsInList2.has(obj.id));
            console.log("e")
            console.log("uniqueInList1")
            console.log(uniqueInList1)
            
            console.log("f")
            var consumerJson = {
              type: 'delete_mvp_message',
              idMerchant: newImage.id,
              newMvp: uniqueInList1[0]
            };
            snsPromisses.push(SNS.publish({
              TopicArn: process.env.SNS_MERCHANTVISUALPRODUCTION_NOTIFICATIONS_TOPIC,
              Message: JSON.stringify(consumerJson)
            }).promise())
  
          } else {
            console.log('New',newImage)
            console.log('Old',oldImage)
      
            var consumerJson = {
              type: type,
              newMvp: newImage
            };
            snsPromisses.push(SNS.publish({
              TopicArn: process.env.SNS_MERCHANTVISUALPRODUCTION_NOTIFICATIONS_TOPIC,
              Message: JSON.stringify(consumerJson)
            }).promise())
          }
        }
      }
      
    } else if (record.eventName === 'DELETE'){
      const dinamo = converter.unmarshall(record.dynamodb)
      console.log('dinamo',dinamo)
    }
  }
  await Promise.all(snsPromisses)
  console.log('Message sucessfully sent')
  console.log(event);
  return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

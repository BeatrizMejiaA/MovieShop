'use strict';

const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const MOVIESHOP = require('movieshop-libutils'); 

async function getItem(params){
  try {
    const data = await dynamoDb.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.read = async (event) => {

  console.log('OLAOLAOLA')
  for (const record of event.Records) {
    const body = JSON.parse(record.body)
    console.log('MESSAGE',body)
    const message = JSON.parse(body.Message)
    const type = message.type
    
    if (type === "Lets add the merchant visual production to visual production for cqrc"){

      //Lets add the merchant visual production to visual production for cqrc
    
      const visualproduction_merchant = message.admin

      const params = {
        TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
        Key: {
          id: visualproduction_merchant.id,
        },
      };

      try {
        console.log("x222")
        const result = await getItem(params) 

        if (JSON.stringify(result) === '{}') {
          console.log("4444");
            const error_lam = await getError("en", "resource_not_found",404,event.path,[],[]);
            console.log("5555");
            console.log(error_lam);
            console.log("6666");
        } else {

          console.log("yyyy111")
          const data = JSON.parse(event.body);
          console.log("yyyyy112")
          console.log(data)
          console.log("yyyyy113")
          console.log(result)
          console.log("99999999")
  
          console.log('qwe4')

          var theFilteredMerchant = result.Item.merchants.filter(s => s.id === visualproduction_merchant.merchant.id);

          if (theFilteredMerchant.length == 0){
            console.log('yyyyyyqwe6')
            result.Item.merchants.push(visualproduction_merchant.merchant)
          } else {
            theFilteredMerchant = visualproduction_merchant.merchant;
            var theOthers = result.Item.merchants.filter(s => s.id != visualproduction_merchant.merchant.id);            
            theOthers.push(visualproduction_merchant.merchant)
            result.Item.merchants = theOthers;
          }

          const params = {
            TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
            Item: result.Item,
          };

          try{
            console.log("yyyya7")
            const data1 = await dynamoDb.put(params).promise();
            console.log("yyyya8")
          } catch (err) {
            console.log("yyyya9")
              const error_lam = await getError("en", "insert_generic_visualproduction_error",400,event.path,[]);
              console.log("a10")
              callback(null, error_lam);
          }
        }
      } catch (err) {
        console.log("a12")
        const error_lam = await getError("en", "insert_generic_visualproduction_error",400,event.path,[]);
        console.log("a13")
        console.log(error_lam)
        callback(null, error_lam);
        console.log("a14")
        return;
      }
    }
  }
  return { message: 'Space read sqs execute with sucess!', event };
};

/* const timestamp = new Date().getTime();
let visualproduction_json = {
  id: visualproduction_merchant.id,
  name: visualproduction_merchant.name,
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
 */
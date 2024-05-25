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
      const order = message.order
      
      for (const record of order.orders) {

        if (type === "order_change"){

              console.log("record")
              console.log(record)

              const params = {
                TableName: process.env.CB_DYNAMO_DB_PENDENT_ORDERS,
                Key: {
                  id: record.merchant.id,
                },
              };

              console.log("params")
              console.log(params)

              try {
                    console.log("x222")
                    console.log(params)
                    const result = await getItem(params) 
            
                    if (JSON.stringify(result) === '{}') {

                      const params2 = {
                        TableName: process.env.CB_DYNAMO_DB_PENDENT_ORDERS,
                        Item: {
                          id: record.merchant.id,
                          users: {
                            id: record.user.id,
                            orders: [
                              record
                            ],
                          },
                        },
                      };
            
                      console.log("params2")
                      console.log(params2)

                      try{
                        console.log("yyyya7")
                        const data1 = await dynamoDb.put(params2).promise();
                        console.log("yyyya8")
                      } catch (err) {
                        console.log("yyyya9a")
                        const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 400,'path');
                        console.log(probs_context)
                        const error_lam = await MOVIESHOP.create_error_message(probs_context);
                        console.log(error_lam)
                        console.log("a10")
                        return { message: 'MerchantVisualProduction read sqs queue for exclude executed with sucess!', event };
                      }
                    } else {

                      console.log("yyyyy113")
                      console.log(result)
                      console.log("99999999")
              
                      console.log('qwe4')
                      console.log(record)
                      var theUser = result.Item.users.filter(s => s.id === record.user.id);
                      var theOtherOrders = result.Item.users.orders.filter(s => s.id != record.id);
                      theOtherOrders.push(record)
                      theUser.orders = theOtherOrders

                      var theOthersUsers = result.Item.users.filter(s => s.id != record.user.id);

                      console.log("theOthersMerchant")
                      console.log(theOthersUsers)
                      theOthersUsers.push(theUser)

                      const params2 = {
                        TableName: process.env.CB_DYNAMO_DB_PENDENT_ORDERS,
                        Item: {
                          id: record.merchant.id,
                          users: theOthersUsers
                        },
                      };
            
                      try{
                        console.log("yyyya7")
                        const data1 = await dynamoDb.put(params2).promise();
                        console.log("yyyya8")
                      } catch (err) {
                        console.log("yyyya9")
                        const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 400,'path');
                        console.log(probs_context)
                        const error_lam = await MOVIESHOP.create_error_message(probs_context);
                        console.log(error_lam)
                        console.log("a10")
                        return { message: 'MerchantVisualProduction read sqs queue for exclude executed with sucess!', event };
                      }
                  }
              } catch (err) {
                console.log("a12")
                const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 500,path);
                console.log(probs_context)
                const error_lam = await MOVIESHOP.create_error_message(probs_context);
                console.log(error_lam)
                return { message: 'MerchantVisualProduction read sqs queue not executed with sucess!', event };
              }
          //const authorization = message.admin


          //CB_DYNAMO_DB_PENDENT_ORDERS
        

        }

        if (type === "what to do with status b this one is deleting"){


        }
      }
  }
  return { message: 'Order read sqs execute with sucess!', event };
};

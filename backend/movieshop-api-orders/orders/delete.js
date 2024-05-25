'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const MOVIESHOP = require('movieshop-libutils'); 


async function getItem(params){
  try {
    const data = await dynamoDb.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.delete = async (event, context, callback) => {

  const params = {
    TableName: process.env.CB_DYNAMO_DB_ORDERS,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    console.log("11111");
    const result = await getItem(params);
    console.log("22222");
    const instance = `/users/${event.pathParameters.id}/orders/${event.pathParameters.idOrder}`;
    console.log("3333");
    if (JSON.stringify(result) === '{}') {
      console.log("4444");
      const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'resource_not_found"', 500,event.path,required_fields,missing_types);
      console.log(probs_context)
      const error_lam = await MOVIESHOP.create_error_message(probs_context);
      callback(null, error_lam);
      console.log("5555");
      callback(null, error_lam);
      console.log("6666");
      return;
    } else {
      
      console.log("aaaa");
      var theOrder = result.Item.orders.filter(s => s.id === event.pathParameters.idOrder);
      console.log("bbbb");
      console.log(theOrder)
      console.log("ffff");

      if (result.Item.orders.length === 1){
        const paramDeleteOrder = {
          TableName: process.env.CB_DYNAMO_DB_ORDERS,
          Key: {
            id: result.Item.id,
          },
        };

        // delete the todo from the database
        const data = await dynamoDb.delete(paramDeleteOrder, async (error) => {
          // handle potential errors
          if (error) {
            const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'generic_error', 400,event.path);
            console.log(probs_context)
            const error_lam = await MOVIESHOP.create_error_message(probs_context);
            callback(null, error_lam);
            return;
          }

          // create a response
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({}),
          };
          callback(null, response);
        }).promise();
      } else {

        const filteredOrders = result.Item.orders.filter(s => s.id != event.pathParameters.idOrder);
        console.log("ffff11");
        if (filteredOrders.length == result.Item.orders.length){
          const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'generic_error', 404,event.path);
          console.log(probs_context)
          const error_lam = await MOVIESHOP.create_error_message(probs_context);
          console.log("ffff3333");
          callback(null, error_lam);
          console.log("ffff444");
          return;
        }
        console.log("ffff5555");
        result.Item.orders = filteredOrders;
        console.log("ffff66666");
        console.log(JSON.stringify(result));
        console.log("ffff7777");
        const params1 = {
          TableName: process.env.CB_DYNAMO_DB_ORDERS,
          Item: result.Item,
        };
        console.log("ffff88888");
        try{
          console.log("ffff9999");
          const data1 = await dynamoDb.put(params1).promise();
          console.log("ffff101010");
          const response = {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(result.Item.orders),
            };
            console.log("ffff1111");
          callback(null, response);
          return;
        } catch (err) {
          const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_order_error', 500,event.path);
          console.log(probs_context)
          const error_lam = await MOVIESHOP.create_error_message(probs_context);
          callback(null, error_lam);
        }
      }
    }
  } catch (error) {
    console.log("7777");
    console.error(error);
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_order_error', 500,event.path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    callback(null, error_lam);
    return;
  }
};

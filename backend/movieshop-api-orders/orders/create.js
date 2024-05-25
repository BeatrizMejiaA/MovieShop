'use strict';

const AWS = require('aws-sdk'); 

const https = require('https');

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const MOVIESHOP = require('movieshop-libutils')

const ORDER_PREFIX = 'ORD-';

const required_fields = ["status","merchant","user","product","total"]

const required_types = ["ORDERED","PAYED","PRODUCT_SENT","PRODUCT_RECEIVED","PENDENT_USER_AVALIATION","PENDENT_MERCHANT_AVALIATION","PENDENT_PRODUCT_AVALIATION"]



async function validateOrder(data,path){
  console.log("z")
  var missing_types = []
  var obligatory_fields = []
  console.log("zz")
  var size = Object.keys(data).length;
  if (size != required_fields.length){
    console.log("zzzz4")

    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'generic_obligatory_fields', 400,path,required_fields,missing_types);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);

    console.log("zzzzz5")
    let result = {
      valid:false,
      errors: error_lam
  
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  }

  var forbidden_fields = [];
  Object.keys(data).forEach(async key => {
    console.log("88888888")
    if (!required_fields.includes(key)){
      console.log("f7777777")
      console.log("key")
      console.log(key)
      forbidden_fields.push(key);
    }
  });

  if (forbidden_fields.length > 0){
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'forbidden_field_for_object', 400,path,required_fields,[]);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    
    let result = {
      valid:false,
      errors: error_lam
    }
    console.log("zzzzzzz6aaaaaaa")
    console.log(result)
    return result
  }
  
  if (!required_types.includes(data.status)){
    missing_types = required_types
    console.log("zzzz4")
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'order_obligatory_type', 400,path,[],missing_types);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    console.log("zzzzz5")
    let result = {
      valid:false,
      errors: error_lam
  
    }
    console.log("zzzzzzz6bbbbbbbb")
    console.log(result)
    return result
  }
  console.log("zzz")
  console.log(obligatory_fields)
  console.log(missing_types)
  if (obligatory_fields.length > 0 || missing_types.length > 0){
    console.log("zzzz4")
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'address_obligatory_fields', 400,path,required_fields,missing_types);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    console.log("zzzzz5")
    let result = {
      valid:false,
      errors: error_lam
  
    }
    console.log("zzzzzzz6cccccc")
    console.log(result)
    return result
  } else {
    let result = {
      valid:true,
      errors: []
    }
    console.log("zzzzzzzz7")
    console.log(result)
    return result
  }
}

async function createOrder(data,path){

  try{
    const validation = await validateOrder(data,path)
    if (!validation.valid){
      let result2 = {
        order:null,
        errors: validation.errors
    
      }
      return result2
    }
    
    const timestamp = new Date().getTime();
    console.log("Ola10");
    let order = {
      id: ORDER_PREFIX + AWS.util.uuid.v4().toUpperCase(),
      user: data.user,
      status: data.status,
      merchant: data.merchant,
      product: data.product,
      createdAt: timestamp,
      total: data.product.price,
    }
    console.log("Ola11");
    console.log(order);
    let result2 = {
      order:order,
      errors: []
  
    }
    return result2;
  } catch (err) {
    console.log("ola10002341213123")
    const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_order_error', 500,path,required_fields,missing_types);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    let resulterr = {
      order:null,
      errors: error_lam
  
    }
    return resulterr;
  }
}

async function getItem(params){
  try {
    const data = await dynamoDb.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.create = async (event, context, callback) => {

  console.log(event);

  const params = {
    TableName: process.env.CB_DYNAMO_DB_ORDERS,
    Key: {
      id: event.pathParameters.id,
    },
  };



  try{
    const result = await getItem(params)

    console.log("ifif")
    console.log(JSON.stringify(result))

    if (JSON.stringify(result) === '{}') {
        console.log("Ola2");
        console.log(context);
        const data = JSON.parse(event.body);
        console.log(event);
        const cont = event.requestContext.stage;
        console.log(cont);

        

        let resultOrder = await createOrder(data,event.path);
        var order;
        if (resultOrder.errors.length == 0){
          console.log("a4")
          order = resultOrder.order;
        } else {
          console.log("a5")
          console.log(resultOrder.errors)
          const response = {
              statusCode: 400,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(resultOrder.errors),
            };
          callback(null, response);
          return;
        }

        const params2 = {
          TableName: process.env.CB_DYNAMO_DB_ORDERS,
          Item: {
            id: event.pathParameters.id,
            orders: [
              order
            ],
          },
        };
        console.log(params2);

        
        try{
          const data1 = await dynamoDb.put(params2).promise();
          console.log(data1);
        } catch (err) {
          const probs_context = MOVIESHOP.create_context_with_extension(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_order_error', 500,event.path,required_fields,missing_types);
          console.log(probs_context)
          const error_lam = await MOVIESHOP.create_error_message(probs_context);
  
            callback(null, error_lam);
        }
        const response = {
            statusCode: 201,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(order),
        };
        callback(null, response);
        return;
    } else {
        console.log("bbbbb");
        console.log("Ola3");
        console.log(context);
        console.log(result);
        const data = JSON.parse(event.body);
        console.log(data);
        console.log(event);
        const cont = event.requestContext.stage;
        console.log(cont);
        let resultOrder = await createOrder(data,event.path);
        var order;
        if (resultOrder.errors.length == 0){
          console.log("a4")
          order = resultOrder.order;
        } else {
          console.log("a5")
          console.log(resultOrder.errors)
          const response = {
              statusCode: 404,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(resultOrder.errors),
            };
          callback(null, resultOrder.errors);
          return;
        }

        result.Item.orders.push(order);
        const params3 = {
          TableName: process.env.CB_DYNAMO_DB_ORDERS,
          Item: {
            id: event.pathParameters.id,
            orders: result.Item.orders,
          },
        };

        console.log(params3);
        
        try{
          const data1 = await dynamoDb.put(params3).promise();
          console.log(data1);
        } catch (err) {
          const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_order_error', 500,event.path,required_fields,missing_types);
          console.log(probs_context)
          const error_lam = await MOVIESHOP.create_error_message(probs_context);
            callback(null, error_lam);
            return;
        }
        const response = {
            statusCode: 201,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(order),
        };
        callback(null, response);
        return;
    }

  } catch (err) {
    
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_order_error', 500,event.path,required_fields,missing_types);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context);
    callback(null, error_lam);
    callback(null, error_lam);
  }
  
};

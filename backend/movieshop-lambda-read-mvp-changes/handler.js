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
    
    if (type === "new_mvp_message"){

      //Lets add the merchant visual production to visual production for cqrc
    
      const visualproduction_merchant = message.newMvp
      console.log("visualproduction_merchant")
      console.log(visualproduction_merchant)
      for (const vp of visualproduction_merchant.visualproductions) {

        console.log("vipid")
        console.log(vp.id)

        const params = {
          TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
          Key: {
            id: vp.id,
          },
        };

        console.log("params")
        console.log(params)
        try {
          console.log("x222")
          console.log(params)
          const result = await getItem(params) 

          if (JSON.stringify(result) === '{}') {
            console.log("a")
            console.log(vp.id)
            console.log("b")
            console.log(visualproduction_merchant.id)
            console.log("c")
            console.log(vp.products)
            const params2 = {
              TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
              Item: {
                id: vp.id,
                merchants: [
                            {
                             id:  visualproduction_merchant.id,
                             products: vp.products
                            }
                          ],
              },
            };
            console.log("params2");
            console.log(params2);
    
            
            try{
              const data1 = await dynamoDb.put(params2).promise();
              console.log(data1);
            } catch (err) {
              const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 500,path);
              console.log(probs_context)
              const error_lam = await MOVIESHOP.create_error_message(probs_context);
              callback(null, error_lam);
            }
          } else {

            console.log("yyyyy113")
            console.log(result)
            console.log("99999999")
    
            console.log('qwe4')
            console.log(visualproduction_merchant.id)
            var theFilteredMerchant = result.Item.merchants.filter(s => s.id === visualproduction_merchant.id);

            if (theFilteredMerchant.length == 0){
              console.log('yyyyyyqwe6')
              const merchant = {
                id: visualproduction_merchant.id,
                products: vp.products
              };
              result.Item.merchants.push(merchant)
            } else {
              theFilteredMerchant[0].products = vp.products
              var theOthers = result.Item.merchants.filter(s => s.id != visualproduction_merchant.id);            
              theOthers.push(theFilteredMerchant[0])
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
              const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'insert_generic_visualproduction_error', 400,path);
              console.log(probs_context)
              const error_lam = await MOVIESHOP.create_error_message(probs_context);
              console.log(error_lam)
              console.log("a10")
              return { message: 'MerchantVisualProduction read sqs queue not executed with sucess!', event };
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
      }
    }
  }
  return { message: 'MerchantVisualProduction read sqs execute with sucess!', event };
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
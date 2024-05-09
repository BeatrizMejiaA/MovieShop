'use strict';

const AWS = require('aws-sdk'); 

const https = require('https');

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const VISUALPRODUCTION_PREFIX = 'VPR-';

const required_fields = ["id","name","merchant"]

const required_types = []


async function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url,(res) => {
      let body = "";
      console.log("Ola1");
      res.on("data", (chunk) => {
          body += chunk;
      });

      res.on("end", () => {
          try {
              let json = JSON.parse(body);
              console.log("Ola2");
              console.log(JSON.stringify(json));
              resolve(json);
          } catch (error) {
            console.log("Ola3");
              console.error(error.message);
              reject(error.message)
          };
      });

  }).on("error", (error) => {
    console.log("Ola4");
      console.error(error.message);
  });
  });
}

async function getError (language,id,status,instance,obligatoryFields,requiredTypes) {

  return await new Promise((success,error) => {

    var lparams = {
      FunctionName: 'movieshop-lambda-probs-'+ process.env.CB_STAGE + '-getprob',
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: JSON.stringify('{"id" : "' + id + '","language" : "' + language + '"}')
    
    }; 
    
    console.log(lparams);
    //"invalid_params":"[{}]"
    lambda.invoke(lparams,function(err, lambdadata){
      if (err){
          error(err);
      } else {
        var payloadBody = JSON.parse(lambdadata.Payload);
        console.log(payloadBody)
        var extension;
        if (obligatoryFields.length == 0 && requiredTypes.length == 0) {
          console.log("aaaaaa1111")
          extension = { status: status , instance: instance};
        } else if (obligatoryFields.length > 0 && requiredTypes.length == 0){
          console.log("bbbbbbb222222")
          extension = { status: status , instance: instance,obligatory_fields:obligatoryFields};
        } else if (obligatoryFields.length == 0 && requiredTypes.length >= 0){
          console.log("ccccccccc3333333")
          extension = { status: status , instance: instance,obligatory_types:requiredTypes};
        } else if (obligatoryFields.length >= 0 && requiredTypes.length >= 0){
          console.log("ccccccccc44444444")
          extension = { status: status , instance: instance,obligatory_types:requiredTypes,obligatory_fields:obligatoryFields};
        }
        console.log("ccccccc")
        console.log(extension)
        console.log("ccccccc")
        console.log(payloadBody.body)
        console.log("ddddddd")
        const newBody = Object.assign({}, JSON.parse(payloadBody.body),extension);
        console.log("eeeeeeeee")
        console.log(newBody)
        console.log("ffffffffff")
        var errors = {errors:[]}
        console.log("ggggggggg")
        errors.errors.push(newBody)
        console.log("hhhhhhh")
        console.log(JSON.stringify(errors))
        const response = {
          statusCode: status,
          headers: { 
            'Content-Type': 'application/problem+json',
          },
          body: JSON.stringify(errors),
        };
        console.log("ggggggggg")
        success(response);
      }
      
    });
  });
}
async function validateVisualProduction(data,path){
  console.log("z")
  var missing_types = []
  var obligatory_fields = []
  console.log("zz")
  var size = Object.keys(data).length;
  if (size != required_fields.length){
    console.log("zzzz4")
    const error_lam = await getError("en", "generic_obligatory_fields",400,path,required_fields,missing_types);
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
      console.log("7777777")
      forbidden_fields.push(key);
    }
  });

  if (forbidden_fields.length > 0){
    const error_lam = await getError("en", "forbidden_field_for_object",400,path,required_fields,[]);
    let result = {
      valid:false,
      errors: error_lam
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  }
  
  if (!required_types.includes(data.type)){
    missing_types = required_types
    console.log("zzzz4")
    const error_lam = await getError("en", "visualproduction_obligatory_type",400,path,[],missing_types);
    console.log("zzzzz5")
    let result = {
      valid:false,
      errors: error_lam
  
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  }
  console.log("zzz")
  console.log(obligatory_fields)
  console.log(missing_types)
  if (obligatory_fields.length > 0 || missing_types.length > 0){
    console.log("zzzz4")
    const error_lam = await getError("en", "address_obligatory_fields",400,path,required_fields,missing_types);
    console.log("zzzzz5")
    let result = {
      valid:false,
      errors: error_lam
  
    }
    console.log("zzzzzzz6")
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

async function createVisualProduction(data,path){

  try{
    const validation = await validateVisualProduction(data,path)
    if (!validation.valid){
      let result2 = {
        visualproduction:null,
        errors: validation.errors
    
      }
      return result2
    }
    
    const timestamp = new Date().getTime();
    const vProdId = data.name.trim();
    console.log("Ola10");
    let visualproduction = {
      id: vProdId,
      name: data.name,
      merchant: data.merchant,
      createdAt: timestamp
    }
    console.log("Ola11");
    console.log(visualproduction);
    let result2 = {
      visualproduction:visualproduction,
      errors: []
  
    }
    return result2;
  } catch (err) {
    console.log("ola10002341213123")
    const error_lam = await getError("en", "insert_generic_visualproduction_error",500,event.path,[],[]);
    let resulterr = {
      visualproduction:null,
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
    TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
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
        let resultVisualProduction = await createVisualProduction(data,event.path);
        var visualProduction;
        if (resultVisualProduction.errors.length == 0){
          console.log("a4")
          visualProduction = resultVisualProduction.visualProduction;
        } else {
          console.log("a5")
          console.log(visualProduction.errors)
          const response = {
              statusCode: 400,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(visualProduction.errors),
            };
          callback(null, response);
          return;
        }

        const params2 = {
          TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
          Item: {
            id: visualProduction.id,
            name: visualProduction.name,            
            merchants: [
              visualProduction.merchant
            ],
          },
        };
        console.log(params2);

        
        try{
          const data1 = await dynamoDb.put(params2).promise();
          console.log(data1);
        } catch (err) {
            const error_lam = await getError("en", "insert_generic_visualproduction_error",500,event.path,[],[]);
            callback(null, error_lam);
        }
        const response = {
            statusCode: 201,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(visualProduction),
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
          let resultVisualProduction = await createVisualProduction(data,event.path);
          var visualProduction;
          if (resultVisualProduction.errors.length == 0){
            console.log("a4")
            visualProduction = resultVisualProduction.visualproduction;
          } else {
            console.log("a5")
            console.log(resultVisualProduction.errors)
            const response = {
                statusCode: 404,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(resultVisualProduction.errors),
              };
            callback(null, resultVisualProduction.errors);
            return;
          }

          result.Item.merchants.push(resultVisualProduction.merchant);
          const params3 = {
            TableName: process.env.CB_DYNAMO_DB_VISUALPRODUCTIONS,
            Item: {
              id: event.pathParameters.idVisualProduction,
              name : result.Item.name,
              merchants: result.Item.merchants,
            },
          };

          console.log(params3);
          
          try{
            const data1 = await dynamoDb.put(params3).promise();
            console.log(data1);
          } catch (err) {
              const error_lam = await getError("en", "insert_generic_visualproduction_error",500);
              callback(null, error_lam);
              return;
          }
          const response = {
              statusCode: 201,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(visualProduction),
          };
          callback(null, response);
          return;
    }

  } catch (err) {
    const error_lam = await getError("en", "insert_generic_visualproduction_error",500,event.path,[],[]);
    callback(null, error_lam);
  }
  
};

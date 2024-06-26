'use strict';

const AWS = require('aws-sdk'); 

const https = require('https');

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const WISHLIST_PREFIX = 'WSL-';

const exclusions = []

const required_fields = ["id","products"]


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

async function validateWishlistItem(data,path){
  console.log("z")
  var missing_types = []
  var obligatory_fields = []
  console.log("zz")
  
  var forbidden_fields = [];
  Object.keys(data).forEach(async key => {
    console.log("88888888")
    if (!required_fields.includes(key)){
      console.log("7777777")
      forbidden_fields.push(key);
    }
  });

  if (forbidden_fields.length > 0){
    const error_lam = await getError("en", "forbidden_field_for_object",400,path,exclusions,required_types);
    let result = {
      valid:false,
      errors: error_lam
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  }

  ////////
  var empty_fields = [];
  Object.entries(data).forEach(async ([key, val]) => {

    if (val === ""){
      empty_fields.push(key);
    }
  });

  if (empty_fields.length > 0){
    const error_lam = await getError("en", "empty_field",400,path,exclusions,empty_fields);
    let result = {
      valid:false,
      errors: error_lam
    }
    console.log("zzzzzzz6")
    console.log(result)
    return result
  }
  //////

  if (typeof(data['type']) != "undefined" && !required_types.includes(data.type)){
    missing_types = required_types
    console.log("zzzz44")
    const error_lam = await getError("en", "order_obligatory_type",400,path,[],missing_types);
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
    console.log("zzzz42")
    const error_lam = await getError("pt", "address_obligatory_fields",400,path,obligatory_fields,[]);
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

async function updateWishlistItem(theWishlistItem,data,path){

  const validation = await validateWishlistItem(data,path)
  if (!validation.valid){
    let result2 = {
      theWishlistItem:null,
      errors: validation.errors
  
    }
    return result2
  }
  console.log("us1")
  console.log(theWishlistItem)
  console.log(data)
  console.log(path)
  console.log("us2")
  var addressLabel = "";
  var invalidFields = [];
  console.log("us3")
  Object.entries(data).forEach(async ([key, val]) => {

      console.log("us4")
      if (!exclusions.includes(key)){
        console.log("us5")
        console.log(typeof(data[key]))
        console.log(data[key])
        theWishlistItem[key] = val
      } else if (typeof(data[key]) != "undefined") {
        console.log("us6")
        addressLabel = addressLabel + ' ' + data[key];
        console.log(addressLabel)
        invalidFields.push(key);
      }
  });
  console.log("us7")
  if (invalidFields.length > 0 && invalidFields.length != exclusions.length){
    console.log("us8")
      const error_lam = await getError("en", "address_obligatory_fields",404,path,exclusions,[]);
      console.log("us9")
      let result3 = {
        wishlistItem:null,
        errors: error_lam

      }
      console.log("us1000kj")
      return result3;
  }

  if (addressLabel != ""){
    console.log("us11")
    let searchAddress = encodeURIComponent(`${addressLabel}`)
    console.log("us12")
    console.log(searchAddress)
    console.log("us17")
    console.log("us20")
    console.log(theWishlistItem);
    console.log("us21")
  }
  let result2 = {
    wishlistItem:theWishlistItem,
    errors: []

  }
  console.log("us22")
  return result2;
}

async function getItem(params){
  try {
    const data = await dynamoDb.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.update = async (event, context, callback) => {

  const params = {
    TableName: process.env.CB_DYNAMO_DB_WISHLIST,
    Key: {
      id: event.pathParameters.id,
    },
  };
  
  try{
    console.log("x222")
    const result = await getItem(params)
    console.log("x111")
    console.log(result)
    if (JSON.stringify(result) === '{}') {
      console.log("4444");
        const error_lam = await getError("en", "resource_not_found",404,event.path,[],[]);
        console.log("5555");
        callback(null, error_lam);
        console.log("6666");
        return;
    } else {
        console.log("a111")
        const data = JSON.parse(event.body);
        console.log("a112")
        console.log(data)
        console.log("a113")
        console.log(result)

        console.log("99999999")

        console.log('qwe4')
        var theWishlistItem = result.Item.wishlist.filter(s => s.id === event.pathParameters.idWishlist);
        console.log('qwe5')
        if (theWishlistItem.length == 0){
          console.log('qwe6')
          const error_lam = await getError("en", "resource_not_found",404,event.path,[],[]);
          callback(null, error_lam);
          return;
        }
        console.log('qwe7')
        console.log(theWishlistItem)
        console.log("a114")
        const otherWishListItems = result.Item.wishlist;
        console.log("a1")
        const resultWishlist = await updateWishlistItem(theWishlistItem[0],data,event.path,[],[]);
        console.log("marcel")
        console.log("a3")
        if (resultWishlist.errors.length == 0){
          console.log("a4")
          theWishlistItem = resultWishlist.wishlistItem;
        } else {


          console.log("a5")
          console.log(resultWishlist.errors)
          const response = {
              statusCode: 404,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(resultWishlist.errors),
            };
          callback(null, resultWishlist.errors);
          return;          
      }  
      console.log("a6")

      result.Item.wishList.push(resultWishlist.wishlistItem);
      const params3 = {
        TableName: process.env.CB_DYNAMO_DB_WISHLIST,
        Item: result.Item,
      };

      try{
        console.log("a7")
        const data1 = await dynamoDb.put(params3).promise();
        console.log("a8")
      } catch (err) {
        console.log("a9")
          const error_lam = await getError("en", "insert_generic_wishlist_error",400,event.path,[]);
          console.log("a10")
          callback(null, error_lam);
      }
      const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(result.Item.wishList),
      };
      callback(null, response);
      return;
    }
    

  } catch (err) {
    console.log("a12")
    const error_lam = await getError("pt", "insert_generic_wishlist_error",400,event.path,[]);
    console.log("a13")
    console.log(error_lam)
    callback(null, error_lam);
    console.log("a14")
    return;
  }
};

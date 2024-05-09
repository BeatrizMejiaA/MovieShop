const jwt = require('jsonwebtoken')

exports.authorizer =  function(event, context, callback) {

    var token = event.authorizationToken;
    token = token.split(' ')[1];
    console.log(token)
    try{
        console.log(token,process.env.CB_JWT_SECRET);
        const product = jwt.verify(token,process.env.CB_JWT_SECRET);
        console.log(product)
        callback(null, generatePolicy('product', 'Allow', '*',product));
    } catch (e){
        console.log(e)
        callback(null, generatePolicy('product', 'Deny', '*'));
    }



};

// Help function to generate an IAM policy
const generatePolicy = function(principalId, effect, resource,product) {
    
    const authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    if(product){
        authResponse.context = product;
    }
    return authResponse;
}
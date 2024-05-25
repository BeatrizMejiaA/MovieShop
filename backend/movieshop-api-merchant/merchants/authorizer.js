const jwt = require('jsonwebtoken')

exports.authorizer =  function(event, context, callback) {

    var token = event.authorizationToken;
    token = token.split(' ')[1];
    console.log(token)
    try{
        console.log(token,process.env.CB_JWT_SECRET);
        const merchant = jwt.verify(token,process.env.CB_JWT_SECRET);
        console.log(merchant)
        callback(null, generatePolicy('merchant', 'Allow', '*',merchant));
    } catch (e){
        console.log(e)
        callback(null, generatePolicy('merchant', 'Deny', '*'));
    }



};

// Help function to generate an IAM policy
const generatePolicy = function(principalId, effect, resource,merchant) {
    
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
    
    if(merchant){
        authResponse.context = merchant;
    }
    return authResponse;
}
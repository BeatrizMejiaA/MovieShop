'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

var loginMessages = [];

module.exports.create = (event, context, callback) => {

    var pwNotEqual = {id: "pt_passwords_not_equal", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_passwords_not_equal", title: "Senhas digitadas não conferem",detail: "Por segurança foi solicitado a repetição da digitação da senha e identificamos que as duas não são iguais",language: "pt"};
    loginMessages.push(pwNotEqual);

    var pwErroBaseDeDados = {id: "pt_insert_generic_user_error", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_insert_generic_user_error", title: "Erro ao inserir usuário no banco de dados",detail: "Não foi possível inserir este usuário na base de dados, por favor tente mais tarde ou contate o administrador",language: "pt"};
    loginMessages.push(pwErroBaseDeDados);

    var pwErroEquipmentBaseDeDados = {id: "pt_insert_generic_equipment_error", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_insert_generic_equipment_error", title: "Erro ao inserir equipamento no banco de dados",detail: "Não foi possível inserir este equipamento na base de dados, por favor tente mais tarde ou contate o administrador",language: "pt"};
    loginMessages.push(pwErroEquipmentBaseDeDados);   

    var pwErroSpaceBaseDeDados = {id: "pt_insert_generic_space_error", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_insert_generic_space_error", title: "Erro ao inserir espaco no banco de dados",detail: "Não foi possível inserir este espaco na base de dados, por favor tente mais tarde ou contate o administrador",language: "pt"};
    loginMessages.push(pwErroSpaceBaseDeDados);    

    var genericErrorBaseDeDados = {id: "pt_generic_error", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_generic_error", title: "Ocorreu um erro generico",detail: "Ocorreu um erro generico, por favor tente mais tarde ou contate o administrador",language: "pt"};
    loginMessages.push(genericErrorBaseDeDados); 

    var genericInvalidFildsBaseDeDados = {id: "pt_generic_invalid_fields", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_generic_invalid_fields", title: "Campos invalidos",detail: "Necessario informar todos os campos",language: "pt"};
    loginMessages.push(genericInvalidFildsBaseDeDados);

    var addressOligatoryFildsBaseDeDados = {id: "pt_address_obligatory_fields", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_address_obligatory_fields", title: "Campos obrigatorios",detail: "Para alteracao de endereco todos os campos listados sao obrigatorios",language: "pt"};
    loginMessages.push(addressOligatoryFildsBaseDeDados);

    var genericObligatoryFildsBaseDeDados = {id: "pt_generic_obligatory_fields", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_generic_obligatory_fields", title: "Campos obrigatorios",detail: "Para alteracao/criacao deste registro todos os campos listados sao obrigatorios",language: "pt"};
    loginMessages.push(genericObligatoryFildsBaseDeDados);

    var genericObligatoryTypeBaseDeDados = {id: "pt_order_obligatory_type", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_space_obligatory_type", title: "Tipo obrigatorios",detail: "Escolha um dos tipos listados para o tipo do seu espaco",language: "pt"};
    loginMessages.push(genericObligatoryTypeBaseDeDados);

    var genericMainSpaceTypeBaseDeDados = {id: "pt_main_residence_type_unique", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_main_residence_type_unique", title: "Main residence should be unique",detail: "Apenas um espaco pode ser residencia principal",language: "pt"};
    loginMessages.push(genericMainSpaceTypeBaseDeDados);

    var forbidenChangeType = {id: "pt_forbidden_change_type", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_forbidden_change_type", title: "Nao e permitido mudar o tipo",detail: "Este tipo de dados nao e permitido. Escolha um tipo listado",language: "pt"};
    loginMessages.push(forbidenChangeType);

    var forbidenExcludeType = {id: "pt_forbidden_exclude_type", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_forbidden_change_type", title: "Nao e permitido excluir o tipo",detail: "Este usuario nao tem permissao para escluir este tipo",language: "pt"};
    loginMessages.push(forbidenExcludeType);

    var forbidenField = {id: "pt_forbidden_field_for_object", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_forbidden_field_for_object", title: "Campo nao permitido para este objeto",detail: "Este campo nao pertence a estrutura deste objeto ou e um campo gerado pelo sistema",language: "pt"};
    loginMessages.push(forbidenField);

    var emptyField = {id: "pt_empty_field", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_empty_field", title: "Campo nao pode estar vazio",detail: "Campos de preenchimento obrigatorio encontrado",language: "pt"};
    loginMessages.push(emptyField);

    var erroSendingEmail = {id: "pt_send_new_user_email_error", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_send_new_user_email_error", title: "Erro ao enviar email confirmando cadastro",detail: "Ocorreu um erro ao tentar enviar o email de aviso de conta criada.",language: "pt"};
    loginMessages.push(erroSendingEmail);

    var successSendingEmail = {id: "pt_send_new_user_email_success", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_send_new_user_email_success", title: "E-mail enviado com sucesso",detail: "Email enviado com sucesso.",language: "pt"};
    loginMessages.push(successSendingEmail);

    var resourceNotFound = {id: "pt_resource_not_found", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_resource_not_found", title: "Recurso nao encontrado",detail: "Nao existe nenhum recurso no servidor que represente a url",language: "pt"};
    loginMessages.push(resourceNotFound);

    var pwErroAuthorizeBaseDeDados = {id: "pt_insert_generic_authorizer_error", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_insert_generic_authorizer_error", title: "Erro ao inserir authorizer no banco de dados",detail: "Não foi possível inserir este authorizer na base de dados, por favor tente mais tarde ou contate o administrador",language: "pt"};
    loginMessages.push(pwErroAuthorizeBaseDeDados);

    var authorizerExists = {id: "pt_authorizer_unique", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_authorizer_unique", title: "Autorizador já adicionado",detail: "Autorizador já existe para este id",language: "pt"};
    loginMessages.push(authorizerExists);

    var adminExists = {id: "pt_authorizer_is_not_admin", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_authorizer_is_not_admin", title: "Necessário ser administrador",detail: "Necessário permissão de administrador para criar permissão de autorizaçōes",language: "pt"};
    loginMessages.push(adminExists);

    var dateFormatNotAcceptable = {id: "pt_data_format_not_acceptable", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_data_format_not_acceptable", title: "Formato de data incorreto",detail: "A data deve seguir o formato exemplificado a seguir 20-02-2023",language: "pt"};
    loginMessages.push(dateFormatNotAcceptable);

    var finalDateGreaterThen = {id: "pt_begin_date_greater_tehn_end_date", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_begin_date_greater_tehn_end_date", title: "Data final menor que data inicial",detail: "A data final não pode ser menor que a data inicial",language: "pt"};
    loginMessages.push(finalDateGreaterThen);

    var notAlowedRemoveAdmin = {id: "pt_not_alowed_remove_admin", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_not_alowed_remove_admin", title: "Permissão negada",detail: "Usuário não pode excluir sua própria permissão administrativa",language: "pt"};
    loginMessages.push(notAlowedRemoveAdmin);
    
    var errorExcludingAuthorizerDocument = {id: "pt_error_excluding_authorizer_document", type: "https://5g45tb0auf.execute-api.sa-east-1.amazonaws.com/ugo-br-dev/probs/pt_error_excluding_authorizer_document", title: "Error excluding authorizer",detail: "Erro ao excluir authorizador",language: "pt"};
    loginMessages.push(errorExcludingAuthorizerDocument);


    loginMessages.forEach(function(message) { 
        console.log(message);
          const params = {
              TableName: process.env.MOVIESHOP_DYNAMO_DB_PROBS,
              Item: {
                  id: message.id,
                  title: message.title,
                  type: message.type,
                  status: message.status,
                  detail: message.detail,
                  instance: message.instance
              },
          };
          console.log(params);
          // write the todo to the database
          dynamoDb.put(params, (error) => {
          // handle potential errors
          if (error) {
              console.error(error);
              callback(null, {
              statusCode: error.statusCode || 501,
              headers: { 'Content-Type': 'text/plain' },
              body: 'Not possible to create json problem solving table.',
              });
              return;
          }

          }); 
    });

    // create a response
    const response = {
        statusCode: 200,
        body: "Created",
    };
    callback(null, response);

};

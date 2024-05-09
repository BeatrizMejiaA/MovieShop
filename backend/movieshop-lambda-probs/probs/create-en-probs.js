'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

var loginMessages = [];

module.exports.create = (event, context, callback) => {

    var pwNotEqual = {id: "en_passwords_not_equal", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_passwords_not_equal", title: "Senhas digitadas não conferem",detail: "Por segurança foi solicitado a repetição da digitação da senha e identificamos que as duas não são iguais",language: "en"};
    loginMessages.push(pwNotEqual);

    var pwErroBaseDeDados = {id: "en_insert_generic_user_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_insert_generic_user_error", title: "Erro ao inserir usuário no banco de dados",detail: "Não foi possível inserir este usuário na base de dados, por favor tente mais tarde ou contate o administrador",language: "en"};
    loginMessages.push(pwErroBaseDeDados);

    var pwErroInsertVisualProdBaseDeDados = {id: "en_insert_generic_merchantvisualproduction_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_insert_generic_merchantvisualproduction_error", title: "Error trying insert visual production",detail: "Impossible to insert visual production to merchant try again la",language: "en"};
    loginMessages.push(pwErroInsertVisualProdBaseDeDados);


    var pwErroEquipmentBaseDeDados = {id: "en_insert_generic_equipment_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_insert_generic_equipment_error", title: "Erro ao inserir equipamento no banco de dados",detail: "Não foi possível inserir este equipamento na base de dados, por favor tente mais tarde ou contate o administrador",language: "en"};
    loginMessages.push(pwErroEquipmentBaseDeDados);   

    var pwErroVPBaseDeDados = {id: "en_insert_generic_visualproduction_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_insert_generic_space_error", title: "Error trying to insert visual production to database",detail: "Impossible to insert visual production to database, please try later or contact administrator",language: "en"};
    loginMessages.push(pwErroVPBaseDeDados);    

    var pwErroWishBaseDeDados = {id: "en_insert_generic_wishlist_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_insert_generic_wishlist_error", title: "Error trying to insert wishlist to database",detail: "Impossible to insert wishlist to database, please try later or contact administrator",language: "en"};
    loginMessages.push(pwErroWishBaseDeDados);    

    var pwErroProductBaseDeDados = {id: "en_insert_generic_product_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_insert_generic_wishlist_error", title: "Error trying to insert product to database",detail: "Impossible to insert product to database, please try later or contact administrator",language: "en"};
    loginMessages.push(pwErroProductBaseDeDados);    

    var genericErrorBaseDeDados = {id: "en_generic_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_generic_error", title: "Ocorreu um erro generico",detail: "Ocorreu um erro generico, por favor tente mais tarde ou contate o administrador",language: "en"};
    loginMessages.push(genericErrorBaseDeDados); 

    var genericInvalidFildsBaseDeDados = {id: "en_generic_invalid_fields", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_generic_invalid_fields", title: "Campos invalidos",detail: "Necessario informar todos os campos",language: "en"};
    loginMessages.push(genericInvalidFildsBaseDeDados);

    var addressOligatoryFildsBaseDeDados = {id: "en_address_obligatory_fields", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_address_obligatory_fields", title: "Campos obrigatorios",detail: "Para alteracao de endereco todos os campos listados sao obrigatorios",language: "en"};
    loginMessages.push(addressOligatoryFildsBaseDeDados);

    var genericObligatoryFildsBaseDeDados = {id: "en_generic_obligatory_fields", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_generic_obligatory_fields", title: "Obligatorie fields found",detail: "Obligatorie fields found to create this register",language: "en"};
    loginMessages.push(genericObligatoryFildsBaseDeDados);

    var genericObligatoryTypeBaseDeDados = {id: "en_order_obligatory_type", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_order_obligatory_type", title: "Obligatorie types",detail: "Choose a listed status below",language: "en"};
    loginMessages.push(genericObligatoryTypeBaseDeDados);

    var genericObligatoryTypeBaseDeDados = {id: "en_visualproduction_obligatory_type", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_visualproduction_obligatory_type", title: "Obligatorie types",detail: "Choose a listed status below",language: "en"};
    loginMessages.push(genericObligatoryTypeBaseDeDados);


    var genericMainSpaceTypeBaseDeDados = {id: "en_main_residence_type_unique", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_main_residence_type_unique", title: "Main residence should be unique",detail: "Apenas um espaco pode ser residencia principal",language: "en"};
    loginMessages.push(genericMainSpaceTypeBaseDeDados);

    var forbidenChangeType = {id: "en_forbidden_change_type", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_forbidden_change_type", title: "Nao e permitido mudar o tipo",detail: "Este tipo de dados nao e permitido. Escolha um tipo listado",language: "en"};
    loginMessages.push(forbidenChangeType);

    var forbidenExcludeType = {id: "en_forbidden_exclude_type", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_forbidden_change_type", title: "Nao e permitido excluir o tipo",detail: "Este usuario nao tem permissao para escluir este tipo",language: "en"};
    loginMessages.push(forbidenExcludeType);

    var forbidenField = {id: "en_forbidden_field_for_object", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_forbidden_field_for_object", title: "Campo nao permitido para este objeto",detail: "Este campo nao pertence a estrutura deste objeto ou e um campo gerado pelo sistema",language: "en"};
    loginMessages.push(forbidenField);

    var emptyField = {id: "en_empty_field", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_empty_field", title: "Campo nao pode estar vazio",detail: "Campos de preenchimento obrigatorio encontrado",language: "en"};
    loginMessages.push(emptyField);

    var erroSendingEmail = {id: "en_send_new_user_email_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_send_new_user_email_error", title: "Erro ao enviar email confirmando cadastro",detail: "Ocorreu um erro ao tentar enviar o email de aviso de conta criada.",language: "en"};
    loginMessages.push(erroSendingEmail);

    var successSendingEmail = {id: "en_send_new_user_email_success", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_send_new_user_email_success", title: "E-mail enviado com sucesso",detail: "Email enviado com sucesso.",language: "en"};
    loginMessages.push(successSendingEmail);

    var resourceNotFound = {id: "en_resource_not_found", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_resource_not_found", title: "Recurso nao encontrado",detail: "Nao existe nenhum recurso no servidor que represente a url",language: "en"};
    loginMessages.push(resourceNotFound);

    var pwErroAuthorizeBaseDeDados = {id: "en_insert_generic_authorizer_error", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_insert_generic_authorizer_error", title: "Erro ao inserir authorizer no banco de dados",detail: "Não foi possível inserir este authorizer na base de dados, por favor tente mais tarde ou contate o administrador",language: "en"};
    loginMessages.push(pwErroAuthorizeBaseDeDados);

    var authorizerExists = {id: "en_authorizer_unique", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_authorizer_unique", title: "Autorizador já adicionado",detail: "Autorizador já existe para este id",language: "en"};
    loginMessages.push(authorizerExists);

    var adminExists = {id: "en_authorizer_is_not_admin", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_authorizer_is_not_admin", title: "Necessário ser administrador",detail: "Necessário permissão de administrador para criar permissão de autorizaçōes",language: "en"};
    loginMessages.push(adminExists);

    var dateFormatNotAcceptable = {id: "en_data_format_not_acceptable", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_data_format_not_acceptable", title: "Formato de data incorreto",detail: "A data deve seguir o formato exemplificado a seguir 20-02-2023",language: "en"};
    loginMessages.push(dateFormatNotAcceptable);

    var finalDateGreaterThen = {id: "en_begin_date_greater_tehn_end_date", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_begin_date_greater_tehn_end_date", title: "Data final menor que data inicial",detail: "A data final não pode ser menor que a data inicial",language: "en"};
    loginMessages.push(finalDateGreaterThen);

    var notAlowedRemoveAdmin = {id: "en_not_alowed_remove_admin", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_not_alowed_remove_admin", title: "Permissão negada",detail: "Usuário não pode excluir sua própria permissão administrativa",language: "en"};
    loginMessages.push(notAlowedRemoveAdmin);
    
    var errorExcludingAuthorizerDocument = {id: "en_error_excluding_authorizer_document", type: "https://ot5a2rcbb3.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/probs/en_error_excluding_authorizer_document", title: "Error excluding authorizer",detail: "Erro ao excluir authorizador",language: "en"};
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

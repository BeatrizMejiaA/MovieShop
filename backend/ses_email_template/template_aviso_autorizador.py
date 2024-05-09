import boto3

# Create SES client
ses = boto3.client('ses',region_name='sa-east-1')
s3_client = boto3.client('s3',region_name='sa-east-1')

s3_response_object = s3_client.get_object(Bucket='www.ugoidtech.com', Key='email_new_authorizer.html')
object_content = s3_response_object['Body'].read()
BODY_HTML = str(object_content)

response = ses.create_template(
  Template = {
    'TemplateName' : 'ugo_br_template_new_autorizador',
    'SubjectPart'  : '[UGO] - Autorizacao para gerenciar espaco',
    'TextPart'     : '',
    'HtmlPart'     : BODY_HTML
  }
)


print(response)
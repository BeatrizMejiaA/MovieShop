import boto3

ses = boto3.client('ses',region_name='sa-east-1')
s3_client = boto3.client('s3',region_name='sa-east-1')

s3_response_object = s3_client.get_object(Bucket='www.movieshop.com', Key='email_new_en.html')
object_content = s3_response_object['Body'].read()
BODY_HTML = object_content

response = ses.update_template(
  Template = {
    'TemplateName' : 'ugo_template_change_password',
    'SubjectPart'  : '[NOVA SENHA] - Sua nova senha',
    'TextPart'     : '',
    'HtmlPart'     : BODY_HTML
  }
)


print(response)
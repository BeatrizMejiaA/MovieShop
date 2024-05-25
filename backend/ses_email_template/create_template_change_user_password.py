import boto3

# Create SES client
ses = boto3.client('ses',region_name='eu-central-1')
s3_client = boto3.client('s3',region_name='eu-central-1')

s3_response_object = s3_client.get_object(Bucket='www.movieshop.com', Key='email_renew_user_password_en.html')
object_content = s3_response_object['Body'].read()
BODY_HTML = str(object_content)

response = ses.create_template(
  Template = {
    'TemplateName' : 'movieshop_template_change_user_password_en',
    'SubjectPart'  : '[MovieShop] - Your new password',
    'TextPart'     : '',
    'HtmlPart'     : BODY_HTML
  }
)


print(response)
import boto3

# Create SES client
ses = boto3.client('ses',region_name='eu-central-1')
s3_client = boto3.client('s3',region_name='eu-central-1')

s3_response_object = s3_client.get_object(Bucket='www.movieshop.com', Key='email_new_order_status_en.html')
object_content = s3_response_object['Body'].read()
BODY_HTML = str(object_content)

response = ses.create_template(
  Template = {
    'TemplateName' : 'movieshop_template_new_order_status',
    'SubjectPart'  : '[MOVIESHOP] - Order status changed',
    'TextPart'     : '',
    'HtmlPart'     : BODY_HTML
  }
)


print(response)
import boto3

# Create SES client
ses = boto3.client('ses',region_name='sa-east-1')

response = ses.list_templates(
  MaxItems=10
)

print(response)
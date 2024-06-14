import boto3

# Initialize SES client
ses = boto3.client('ses', region_name='eu-central-1')

# HTML email template
BODY_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Congratulations on Your Registration!</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="background-color: #ffffff; margin: 20px auto; padding: 20px; max-width: 600px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; background-color: #4CAF50; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0;">Congratulations!</h1>
        </div>
        <div style="padding: 20px;">
            <p>Dear {{nome}},</p>
            <p>We are thrilled to welcome you to MovieShop. Thank you for registering!</p>
            <p>We're excited to have you on board and look forward to providing you with the best movie-shopping experience possible. If you have any questions or need assistance, feel free to contact our support team.</p>
            <p>Best regards,<br>The MovieShop Team</p>
        </div>
        <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-radius: 0 0 10px 10px;">
            <p style="font-size: 14px; color: #777777;">&copy; [2024] MovieShop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
"""

# Update the SES email template
response = ses.update_template(
    Template={
        'TemplateName': 'movieshop_template_new_user',
        'SubjectPart': '[MOVIESHOP] - Welcome',
        'TextPart': '',  # Leave TextPart empty if not used
        'HtmlPart': BODY_HTML
    }
)

print(response)

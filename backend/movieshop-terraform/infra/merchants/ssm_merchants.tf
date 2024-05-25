resource "aws_ssm_parameter" "dynamo_movieshop-merchants_table" {
  name = "${var.environment}-movieshop-merchants"
  type = "String"
  value = aws_dynamodb_table.movieshop-merchants.name
}

resource "aws_ssm_parameter" "template_email_merchant_new_password" {
  name = "${var.environment}-template-email-merchant-new-password"
  type = "String"
  value = var.template_email_merchant_new_password
}

resource "aws_ssm_parameter" "template_email_merchant_change_password" {
  name = "${var.environment}-template-email-merchant-change-password"
  type = "String"
  value = var.template_email_merchant_change_password
}
resource "aws_ssm_parameter" "dynamo_movieshop-users_table" {
  name = "${var.environment}-movieshop-users"
  type = "String"
  value = aws_dynamodb_table.movieshop-users.name
}

resource "aws_ssm_parameter" "template_email_new_password" {
  name = "${var.environment}-template-email-new-password"
  type = "String"
  value = var.template_email_new_password
}

resource "aws_ssm_parameter" "template_email_change_password" {
  name = "${var.environment}-template-email-change-password"
  type = "String"
  value = var.template_email_change_password
}
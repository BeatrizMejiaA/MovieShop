resource "aws_ssm_parameter" "email_sender" {
    name = "${var.environment}-email-sender"
    type = "String"
    value = var.email_sender
    overwrite = true
}
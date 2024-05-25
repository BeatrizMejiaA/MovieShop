resource "aws_ssm_parameter" "dynamo_movieshop-orders_table" {
  name = "${var.environment}-movieshop-orders"
  type = "String"
  value = aws_dynamodb_table.movieshop-orders.name
}

resource "aws_ssm_parameter" "template_email_order_status_changed" {
  name = "${var.environment}-template-email-order-status-changed"
  type = "String"
  value = var.template_email_order_status_changed
}
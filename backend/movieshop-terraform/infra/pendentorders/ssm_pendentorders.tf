resource "aws_ssm_parameter" "dynamo_movieshop-pendentorders_table" {
  name = "${var.environment}-movieshop-pendentorders"
  type = "String"
  value = aws_dynamodb_table.movieshop-pendentorders.name
}
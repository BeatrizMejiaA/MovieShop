resource "aws_ssm_parameter" "dynamo_movieshop-merchantavaliation_table" {
  name = "${var.environment}-movieshop-merchantavaliation"
  type = "String"
  value = aws_dynamodb_table.movieshop-merchantavaliation.name
}
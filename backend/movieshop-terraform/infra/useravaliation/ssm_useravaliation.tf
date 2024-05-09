resource "aws_ssm_parameter" "dynamo_movieshop-useravaliation_table" {
  name = "${var.environment}-movieshop-useravaliation"
  type = "String"
  value = aws_dynamodb_table.movieshop-useravaliation.name
}
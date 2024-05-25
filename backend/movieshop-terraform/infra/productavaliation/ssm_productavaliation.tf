resource "aws_ssm_parameter" "dynamo_movieshop-productavaliation_table" {
  name = "${var.environment}-movieshop-productavaliation"
  type = "String"
  value = aws_dynamodb_table.movieshop-productavaliation.name
}
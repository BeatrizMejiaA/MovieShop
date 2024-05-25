resource "aws_ssm_parameter" "dynamo_movieshop-visualproductions_table" {
  name = "${var.environment}-movieshop-visualproductions"
  type = "String"
  value = aws_dynamodb_table.movieshop-visualproductions.name
}
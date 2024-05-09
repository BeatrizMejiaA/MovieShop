resource "aws_ssm_parameter" "dynamo_movieshop-movieshopfees_table" {
  name = "${var.environment}-movieshop-movieshopfees"
  type = "String"
  value = aws_dynamodb_table.movieshop-movieshopfees.name
}
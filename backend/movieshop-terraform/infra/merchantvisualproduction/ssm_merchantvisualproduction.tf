resource "aws_ssm_parameter" "dynamo_movieshop-merchantvisualproduction_table" {
  name = "${var.environment}-movieshop-merchantvisualproduction"
  type = "String"
  value = aws_dynamodb_table.movieshop-merchantvisualproduction.name
}
resource "aws_ssm_parameter" "dynamo_movieshop-probs_table" {
  name = "${var.environment}-movieshop-probs"
  type = "String"
  value = aws_dynamodb_table.movieshop-probs.name
}
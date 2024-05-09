resource "aws_ssm_parameter" "dynamo_movieshop-movieshop_table" {
  name = "${var.environment}-movieshop-wishlist"
  type = "String"
  value = aws_dynamodb_table.movieshop-wishlist.name
}
resource "aws_ssm_parameter" "dynamo_movieshop-products_table" {
  name = "${var.environment}-movieshop-products"
  type = "String"
  value = aws_dynamodb_table.movieshop-products.name
}
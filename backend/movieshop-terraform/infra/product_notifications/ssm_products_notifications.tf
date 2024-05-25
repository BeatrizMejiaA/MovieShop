resource "aws_ssm_parameter" "sqs_movieshop-products_table" {
  name = "${var.environment}-movieshop-products-queue"
  type = "String"
  value = aws_sqs_queue.movieshop_products_queue.arn
}
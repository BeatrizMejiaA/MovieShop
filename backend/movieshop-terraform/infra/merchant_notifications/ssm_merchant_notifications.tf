resource "aws_ssm_parameter" "sqs_movieshop-merchants_table" {
  name = "${var.environment}-movieshop-merchant-queue"
  type = "String"
  value = aws_sqs_queue.movieshop_merchant_queue.arn
}
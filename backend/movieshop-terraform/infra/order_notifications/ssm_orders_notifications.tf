resource "aws_ssm_parameter" "sqs_movieshop-orders_table" {
  name = "${var.environment}-movieshop-orders-queue"
  type = "String"
  value = aws_sqs_queue.movieshop_orders_queue.arn
}
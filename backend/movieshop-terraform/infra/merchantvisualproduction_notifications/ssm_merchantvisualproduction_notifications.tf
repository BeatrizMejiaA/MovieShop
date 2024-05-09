resource "aws_ssm_parameter" "sqs_movieshop-merchantvisualproduction_table" {
  name = "${var.environment}-movieshop-merchantvisualproduction-queue"
  type = "String"
  value = aws_sqs_queue.movieshop_merchantvisualproduction_queue.arn
}
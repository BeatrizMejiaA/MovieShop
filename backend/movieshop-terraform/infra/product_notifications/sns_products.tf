resource "aws_sns_topic" "movieshop_product_notifications" {
    name = "${var.environment}-product-notifications"
}

resource "aws_ssm_parameter" "movieshop_product_notifications_topic" {
  name = "${var.environment}-product-notifications-topic"
  type = "String"
  value = aws_sns_topic.movieshop_product_notifications.arn  
}

output "movieshop_product_notifications_topic_arn" {
  value = aws_sns_topic.movieshop_product_notifications.arn
}
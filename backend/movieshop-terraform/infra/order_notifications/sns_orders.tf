resource "aws_sns_topic" "movieshop_order_notifications" {
    name = "${var.environment}-order-notifications"
}

resource "aws_ssm_parameter" "movieshop_order_notifications_topic" {
  name = "${var.environment}-order-notifications-topic"
  type = "String"
  value = aws_sns_topic.movieshop_order_notifications.arn  
}

output "movieshop_order_notifications_topic_arn" {
  value = aws_sns_topic.movieshop_order_notifications.arn
}
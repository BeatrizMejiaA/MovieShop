resource "aws_sns_topic" "movieshop_merchant_notifications" {
    name = "${var.environment}-merchant-notifications"
}

resource "aws_ssm_parameter" "movieshop_merchant_notifications_topic" {
  name = "${var.environment}-merchant-notifications-topic"
  type = "String"
  value = aws_sns_topic.movieshop_merchant_notifications.arn  
}

output "movieshop_merchant_notifications_topic_arn" {
  value = aws_sns_topic.movieshop_merchant_notifications.arn
}
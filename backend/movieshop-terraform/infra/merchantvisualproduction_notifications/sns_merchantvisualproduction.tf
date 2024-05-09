resource "aws_sns_topic" "movieshop_merchantvisualproduction_notifications" {
    name = "${var.environment}-merchantvisualproduction-notifications"
}

resource "aws_ssm_parameter" "movieshop_merchantvisualproduction_notifications_topic" {
  name = "${var.environment}-merchantvisualproduction-notifications-topic"
  type = "String"
  value = aws_sns_topic.movieshop_merchantvisualproduction_notifications.arn  
}

output "movieshop_merchantvisualproduction_notifications_topic_arn" {
  value = aws_sns_topic.movieshop_merchantvisualproduction_notifications.arn
}
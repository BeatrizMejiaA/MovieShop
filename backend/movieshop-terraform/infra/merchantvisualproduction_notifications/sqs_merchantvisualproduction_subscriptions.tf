resource "aws_sns_topic_subscription" "movieshop_merchantvisualproduction_subscription_topic" {
    topic_arn = aws_sns_topic.movieshop_merchantvisualproduction_notifications.arn
    protocol = "sqs"
    endpoint = aws_sqs_queue.movieshop_merchantvisualproduction_queue.arn
}
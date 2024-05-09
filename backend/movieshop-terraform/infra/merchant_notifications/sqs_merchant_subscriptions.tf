resource "aws_sns_topic_subscription" "movieshop_merchant_subscription_topic" {
    topic_arn = aws_sns_topic.movieshop_merchant_notifications.arn
    protocol = "sqs"
    endpoint = aws_sqs_queue.movieshop_merchant_queue.arn
}
resource "aws_sns_topic_subscription" "movieshop_order_subscription_topic" {
    topic_arn = aws_sns_topic.movieshop_order_notifications.arn
    protocol = "sqs"
    endpoint = aws_sqs_queue.movieshop_orders_queue.arn
}
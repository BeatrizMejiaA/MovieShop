resource "aws_sns_topic_subscription" "movieshop_products_subscription_topic" {
    topic_arn = aws_sns_topic.movieshop_product_notifications.arn
    protocol = "sqs"
    endpoint = aws_sqs_queue.movieshop_products_queue.arn
}
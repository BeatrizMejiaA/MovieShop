resource "aws_iam_policy_attachment" "movieshop_merchants_stream_consumer_policy_attachment" {
    name = "${var.environment}-merchants-stream-consumer-policy-attachment"
    roles = [aws_iam_role.movieshop_merchants_stream_consumer_role.name]
    policy_arn = aws_iam_policy.movieshop_merchants_policy_stream.arn
}
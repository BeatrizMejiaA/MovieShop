resource "aws_iam_policy_attachment" "movieshop_merchantvisualproduction_stream_consumer_policy_attachment" {
    name = "${var.environment}-merchantvisualproduction-stream-consumer-policy-attachment"
    roles = [aws_iam_role.movieshop_merchantvisualproduction_stream_consumer_role.name]
    policy_arn = aws_iam_policy.movieshop_merchantvisualproduction_policy_stream.arn
}
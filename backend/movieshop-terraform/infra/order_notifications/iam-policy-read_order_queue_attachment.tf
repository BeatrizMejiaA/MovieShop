resource "aws_iam_policy_attachment" "movieshop_lambda_read_order_policy_attachment" {
    name = "${var.environment}-movieshop-lambda-read-order-policy-attachment"
    roles = [aws_iam_role.movieshop_read_order_role.name]
    policy_arn = aws_iam_policy.movieshop_iam_policy_read_order_queue.arn
}
resource "aws_iam_policy_attachment" "movieshop_lambda_read_merchant_policy_attachment" {
    name = "${var.environment}-movieshop-lambda-read-merchant-policy-attachment"
    roles = [aws_iam_role.movieshop_read_merchants_role.name]
    policy_arn = aws_iam_policy.movieshop_iam_policy_read_merchant_queue.arn
}
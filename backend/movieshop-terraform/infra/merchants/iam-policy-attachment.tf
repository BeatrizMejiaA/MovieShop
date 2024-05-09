resource "aws_iam_policy_attachment" "movieshop_merchants_policy_attachment" {
    name = "${var.environment}-merchants-policy-attachment"
    roles = [aws_iam_role.movieshop_merchants_role.name]
    policy_arn = aws_iam_policy.movieshop_merchants_policy.arn
}
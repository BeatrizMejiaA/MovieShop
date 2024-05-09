resource "aws_iam_policy_attachment" "movieshop_products_policy_attachment" {
    name = "${var.environment}-products-policy-attachment"
    roles = [aws_iam_role.movieshop_products_role.name]
    policy_arn = aws_iam_policy.movieshop_products_policy.arn
}
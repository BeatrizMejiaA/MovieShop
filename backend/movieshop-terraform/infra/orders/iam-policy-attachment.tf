resource "aws_iam_policy_attachment" "movieshop_orders_policy_attachment" {
    name = "${var.environment}-orders-policy-attachment"
    roles = [aws_iam_role.movieshop_orders_role.name]
    policy_arn = aws_iam_policy.movieshop_orders_policy.arn
  
}
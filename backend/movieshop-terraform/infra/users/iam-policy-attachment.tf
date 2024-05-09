resource "aws_iam_policy_attachment" "movieshop_users_policy_attachment" {
    name = "${var.environment}-users-policy-attachment"
    roles = [aws_iam_role.movieshop_users_role.name]
    policy_arn = aws_iam_policy.movieshop_users_policy.arn
  
}
resource "aws_iam_policy_attachment" "movieshop_visualproductions_policy_attachment" {
    name = "${var.environment}-visualproductions-policy-attachment"
    roles = [aws_iam_role.movieshop_visualproductions_role.name]
    policy_arn = aws_iam_policy.movieshop_visualproductions_policy.arn
  
}
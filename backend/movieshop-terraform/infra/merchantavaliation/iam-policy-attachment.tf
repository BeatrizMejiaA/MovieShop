resource "aws_iam_policy_attachment" "movieshop_merchantavaliation_policy_attachment" {
    name = "${var.environment}-merchantavaliation-policy-attachment"
    roles = [aws_iam_role.movieshop_merchantavaliation_role.name]
    policy_arn = aws_iam_policy.movieshop_merchantavaliation_policy.arn
  
}
resource "aws_iam_policy_attachment" "movieshop_useravaliation_policy_attachment" {
    name = "${var.environment}-useravaliation-policy-attachment"
    roles = [aws_iam_role.movieshop_useravaliation_role.name]
    policy_arn = aws_iam_policy.movieshop_useravaliation_policy.arn
  
}
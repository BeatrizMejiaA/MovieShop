resource "aws_iam_policy_attachment" "movieshop_productavaliation_policy_attachment" {
    name = "${var.environment}-productavaliation-policy-attachment"
    roles = [aws_iam_role.movieshop_productavaliation_role.name]
    policy_arn = aws_iam_policy.movieshop_productavaliation_policy.arn
  
}
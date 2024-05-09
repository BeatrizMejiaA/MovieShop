resource "aws_iam_policy_attachment" "movieshop_probs_policy_attachment" {
    name = "${var.environment}-probs-policy-attachment"
    roles = [aws_iam_role.movieshop_probs_role.name]
    policy_arn = aws_iam_policy.movieshop_probs_policy.arn
  
}
resource "aws_iam_policy_attachment" "movieshop_pendentorders_policy_attachment" {
    name = "${var.environment}-pendentorders-policy-attachment"
    roles = [aws_iam_role.movieshop_pendentorders_role.name]
    policy_arn = aws_iam_policy.movieshop_pendentorders_policy.arn
  
}
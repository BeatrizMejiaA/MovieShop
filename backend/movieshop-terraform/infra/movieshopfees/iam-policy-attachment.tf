resource "aws_iam_policy_attachment" "movieshop_movieshopfees_policy_attachment" {
    name = "${var.environment}-movieshopfees-policy-attachment"
    roles = [aws_iam_role.movieshop_movieshopfees_role.name]
    policy_arn = aws_iam_policy.movieshop_movieshopfees_policy.arn
  
}
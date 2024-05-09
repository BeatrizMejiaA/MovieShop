resource "aws_iam_policy_attachment" "movieshop_merchantvisualproduction_policy_attachment" {
    name = "${var.environment}-merchantvisualproduction-policy-attachment"
    roles = [aws_iam_role.movieshop_merchantvisualproduction_role.name]
    policy_arn = aws_iam_policy.movieshop_merchantvisualproduction_policy.arn
}
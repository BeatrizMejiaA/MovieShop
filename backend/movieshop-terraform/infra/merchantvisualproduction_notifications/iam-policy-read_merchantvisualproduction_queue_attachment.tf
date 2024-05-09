resource "aws_iam_policy_attachment" "movieshop_lambda_read_merchantvisualproduction_policy_attachment" {
    name = "${var.environment}-movieshop-lambda-read-merchantvisualproduction-policy-attachment"
    roles = [aws_iam_role.movieshop_read_merchantvisualproduction_role.name]
    policy_arn = aws_iam_policy.movieshop_iam_policy_read_merchantvisualproduction_queue.arn
}
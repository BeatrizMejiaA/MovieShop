resource "aws_iam_role" "movieshop_read_merchants_role" {
    name = "${var.environment}-movieshop-read-merchants-role"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

resource "aws_ssm_parameter" "movieshop_read_merchants_role" {
    name = "${var.environment}-movieshop-read-merchants-role"
    type = "String"
    value = aws_iam_role.movieshop_read_merchants_role.arn
}
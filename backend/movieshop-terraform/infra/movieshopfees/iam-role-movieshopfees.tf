resource "aws_iam_role" "movieshop_movieshopfees_role" {
    name = "${var.environment}-movieshopfees-role"
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

resource "aws_ssm_parameter" "movieshop_movieshopfees_role" {
    name = "${var.environment}-movieshopfees-role"
    type = "String"
    value = aws_iam_role.movieshop_movieshopfees_role.arn
}
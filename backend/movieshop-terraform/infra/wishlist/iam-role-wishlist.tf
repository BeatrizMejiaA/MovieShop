resource "aws_iam_role" "movieshop_wishlist_role" {
    name = "${var.environment}-wishlist-role"
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

resource "aws_ssm_parameter" "movieshop_wishlist_role" {
    name = "${var.environment}-wishlist-role"
    type = "String"
    value = aws_iam_role.movieshop_wishlist_role.arn
}
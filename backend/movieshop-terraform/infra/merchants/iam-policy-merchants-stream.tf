resource "aws_iam_policy" "movieshop_merchants_policy_stream" {
  name        = "${var.environment}-merchants-policy-stream"
  description = "Policies para streams from movieshop merchants table"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:DescribeStream",
        "dynamodb:GetRecords",
        "dynamodb:GetShardIterator",
        "dynamodb:ListStreams"
      ],
      "Effect": "Allow",
      "Resource": "${aws_dynamodb_table.movieshop-merchants.stream_arn}"
    },
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Action": [
        "sns:Publish"
      ],
      "Effect": "Allow",
      "Resource": "${var.sns_merchant_notifications_arn}"
    }

  ]
}
EOF
}
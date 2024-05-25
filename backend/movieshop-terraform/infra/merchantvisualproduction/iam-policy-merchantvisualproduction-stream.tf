resource "aws_iam_policy" "movieshop_merchantvisualproduction_policy_stream" {
  name        = "${var.environment}-merchantvisualproduction-policy-stream"
  description = "Policies to streams from movieshop merchantvisualproduction table"
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
      "Resource": "${aws_dynamodb_table.movieshop-merchantvisualproduction.stream_arn}"
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
      "Resource": "${var.sns_merchantvisualproduction_notifications_arn}"
    }

  ]
}
EOF
}
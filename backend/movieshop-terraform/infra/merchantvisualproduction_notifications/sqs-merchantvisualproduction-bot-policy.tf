resource "aws_sqs_queue" "movieshop_merchantvisualproduction_queue" {
  name = "${var.environment}-merchantvisualproduction-queue"
  redrive_policy = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.movieshop_merchantvisualproduction_queue_dlq.arn}\",\"maxReceiveCount\":3}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "sqs:ChangeMessageVisibility",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
        "sqs:GetQueueUrl",
        "sqs:ReceiveMessage",
        "sqs:SendMessage"
      ],
      "Resource": "arn:aws:sqs:${var.movieshop_region}:${var.account_id}:${var.environment}-merchantvisualproduction-queue",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_sns_topic.movieshop_merchantvisualproduction_notifications.arn}"
        }
      }
    }
  ]
}
EOF
}

resource "aws_sqs_queue" "movieshop_merchantvisualproduction_queue_dlq" {
  name = "${var.environment}-merchantvisualproduction-queue-dlq"
}
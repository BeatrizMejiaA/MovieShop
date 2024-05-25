resource "aws_sqs_queue" "movieshop_orders_queue" {
  name = "${var.environment}-orders-queue"
  redrive_policy = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.movieshop_orders_queue_dlq.arn}\",\"maxReceiveCount\":3}"
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
      "Resource": "arn:aws:sqs:${var.movieshop_region}:${var.account_id}:${var.environment}-orders-queue",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_sns_topic.movieshop_order_notifications.arn}"
        }
      }
    }
  ]
}
EOF
}

resource "aws_sqs_queue" "movieshop_orders_queue_dlq" {
  name = "${var.environment}-orders-queue-dlq"
}
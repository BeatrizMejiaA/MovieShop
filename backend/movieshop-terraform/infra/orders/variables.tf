variable "environment" {
  
}

variable "movieshop_region" {
  
}

variable "write_capacity" {
  
}

variable "read_capacity" {
  
}

variable "sns_order_notifications_arn" {
  
}

variable "template_email_order_status_changed" {
  
}


output "aws_dynamodb_table_movieshop_orders_arn" {
  value = aws_dynamodb_table.movieshop-orders.arn
}
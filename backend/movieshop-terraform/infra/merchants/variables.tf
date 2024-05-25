variable "environment" {
  
}

variable "movieshop_region" {
  
}

variable "write_capacity" {
  
}

variable "read_capacity" {
  
}

variable "sns_merchant_notifications_arn" {
  
}

output "aws_dynamodb_table_movieshop_merchants_arn" {
  value = aws_dynamodb_table.movieshop-merchants.arn
}

variable "template_email_merchant_change_password" {
  
}

variable "template_email_merchant_new_password" {
  
}
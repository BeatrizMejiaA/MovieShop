variable "environment" {
  
}

variable "movieshop_region" {
  
}

variable "write_capacity" {
  
}

variable "read_capacity" {
  
}

variable "template_email_change_password" {
  
}

variable "template_email_new_user" {
  
}

output "aws_dynamodb_table_movieshop_users_arn" {
  value = aws_dynamodb_table.movieshop-users.arn
}
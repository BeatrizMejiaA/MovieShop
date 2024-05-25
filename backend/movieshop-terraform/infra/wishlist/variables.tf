variable "environment" {
  
}

variable "movieshop_region" {
  
}

variable "write_capacity" {
  
}

variable "read_capacity" {
  
}

variable "sns_wishlist_notifications_arn" {
  
}

output "aws_dynamodb_table_movieshop_wishlist_arn" {
  value = aws_dynamodb_table.movieshop-wishlist.arn
}
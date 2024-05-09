variable "environment" {
  
}

variable "movieshop_region" {
  
}

variable "write_capacity" {
  
}

variable "read_capacity" {
  
}

output "aws_dynamodb_table_movieshop_useravaliation_arn" {
  value = aws_dynamodb_table.movieshop-useravaliation.arn
}
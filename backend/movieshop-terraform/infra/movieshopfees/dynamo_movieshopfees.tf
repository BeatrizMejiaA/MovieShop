resource "aws_dynamodb_table" "movieshop-movieshopfees" {
    name = "${var.environment}-dynamo-movieshopfees-table"
    hash_key = "id"
    attribute {
      name = "id"
      type = "S"
    }
    write_capacity = var.write_capacity
    read_capacity  = var.read_capacity
}
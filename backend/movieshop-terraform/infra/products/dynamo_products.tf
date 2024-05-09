resource "aws_dynamodb_table" "movieshop-products" {
    name = "${var.environment}-dynamo-products-table"
    hash_key = "id"
    attribute {
      name = "id"
      type = "S"
    }
    write_capacity = var.write_capacity
    read_capacity  = var.read_capacity
}
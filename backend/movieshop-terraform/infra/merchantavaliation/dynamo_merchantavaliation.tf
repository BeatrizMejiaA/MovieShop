resource "aws_dynamodb_table" "movieshop-merchantavaliation" {
    name = "${var.environment}-dynamo-merchantavaliation-table"
    hash_key = "id"
    attribute {
      name = "id"
      type = "S"
    }
    write_capacity = var.write_capacity
    read_capacity  = var.read_capacity
}
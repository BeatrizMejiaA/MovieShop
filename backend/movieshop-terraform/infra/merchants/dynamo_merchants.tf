resource "aws_dynamodb_table" "movieshop-merchants" {
    name = "${var.environment}-dynamo-merchants-table"
    hash_key = "id"
    attribute {
      name = "id"
      type = "S"
    }
    write_capacity = var.write_capacity
    read_capacity  = var.read_capacity
    stream_enabled = true
    stream_view_type = "NEW_AND_OLD_IMAGES"
}

resource "aws_ssm_parameter" "dynamodb_movieshop-merchants_stream" {
    name = "${var.environment}-merchants-stream"
    type = "String"
    value = aws_dynamodb_table.movieshop-merchants.stream_arn
}
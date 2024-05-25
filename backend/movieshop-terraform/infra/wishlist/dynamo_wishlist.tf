resource "aws_dynamodb_table" "movieshop-wishlist" {
    name = "${var.environment}-dynamo-wishlist-table"
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

resource "aws_ssm_parameter" "dynamodb_movieshop-wishlist_stream" {
    name = "${var.environment}-wishlist-stream"
    type = "String"
    value = aws_dynamodb_table.movieshop-wishlist.stream_arn
}
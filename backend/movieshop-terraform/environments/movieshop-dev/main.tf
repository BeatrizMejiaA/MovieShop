data "aws_caller_identity" "current" {}

module "users" {
    source = "../../infra/users"
    environment = var.environment
    movieshop_region = var.movieshop_region
    template_email_new_user = var.template_email_new_user
    template_email_change_password = var.template_email_change_password
    write_capacity = 1
    read_capacity = 1
}

module "merchants" {
    source = "../../infra/merchants"
    environment = var.environment
    movieshop_region = var.movieshop_region
    template_email_merchant_new_password = var.template_email_merchant_new_password
    template_email_merchant_change_password = var.template_email_merchant_change_password
    write_capacity = 1
    read_capacity = 1
    sns_merchant_notifications_arn = "${module.merchant_notifications.movieshop_merchant_notifications_topic_arn}"
}

module "products" {
    source = "../../infra/products"
    environment = var.environment
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
}


module "orders" {
    source = "../../infra/orders"
    environment = var.environment
    movieshop_region = var.movieshop_region
    template_email_order_status_changed = var.template_email_order_status_changed
    write_capacity = 1
    read_capacity = 1
    sns_order_notifications_arn = "${module.order_notifications.movieshop_order_notifications_topic_arn}"
}

module "visualproductions" {
    source = "../../infra/visualproductions"
    environment = var.environment
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
}


module "pendentorders" {
    source = "../../infra/pendentorders"
    environment = var.environment
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
}

module "merchantvisualproduction" {
    source = "../../infra/merchantvisualproduction"
    environment = var.environment
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
    sns_merchantvisualproduction_notifications_arn = "${module.merchantvisualproduction_notifications.movieshop_merchantvisualproduction_notifications_topic_arn}"    
}

module "movieshopfees" {
    source = "../../infra/movieshopfees"
    environment = var.environment
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
}

module "productavaliation" {
    source = "../../infra/productavaliation"
    environment = var.environment
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
}

module "merchantavaliation" {
    source = "../../infra/merchantavaliation"
    environment = var.environment
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
}

module "useravaliation" {
    source = "../../infra/useravaliation"
    environment = var.environment
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
}


module "admin" {
    source = "../../infra/admin"
    email_sender = var.email_sender
    environment = var.environment
    jwt_secret = var.jwt_secret
}

module "probs" {
    source = "../../infra/probs"
    movieshop_region = var.movieshop_region
    write_capacity = 1
    read_capacity = 1
    environment = var.environment
}

module "merchant_notifications" {
    source = "../../infra/merchant_notifications"
    environment = var.environment
    account_id = data.aws_caller_identity.current.account_id
    movieshop_region = var.movieshop_region
    aws_dynamo_db_table_merchants = "${module.merchants.aws_dynamodb_table_movieshop_merchants_arn}"
}

module "merchantvisualproduction_notifications" {
    source = "../../infra/merchantvisualproduction_notifications"
    environment = var.environment
    account_id = data.aws_caller_identity.current.account_id
    movieshop_region = var.movieshop_region
    aws_dynamo_db_table_merchantvisualproduction = "${module.merchantvisualproduction.aws_dynamodb_table_movieshop_merchantvisualproduction_arn}"
}


module "order_notifications" {
    source = "../../infra/order_notifications"
    environment = var.environment
    account_id = data.aws_caller_identity.current.account_id
    movieshop_region = var.movieshop_region
    aws_dynamo_db_table_orders = "${module.orders.aws_dynamodb_table_movieshop_orders_arn}"
    aws_dynamo_db_table_pendentorders = "${module.pendentorders.aws_dynamodb_table_movieshop_pendentorders_arn}"
    aws_dynamo_db_table_movieshopfees = "${module.movieshopfees.aws_dynamodb_table_movieshop_movieshopfees_arn}"
    aws_dynamo_db_table_productavaliation = "${module.productavaliation.aws_dynamodb_table_movieshop_productavaliation_arn}"
    aws_dynamo_db_table_merchantavaliation = "${module.merchantavaliation.aws_dynamodb_table_movieshop_merchantavaliation_arn}"    
    aws_dynamo_db_table_useravaliation = "${module.useravaliation.aws_dynamodb_table_movieshop_useravaliation_arn}"        
}
data "aws_caller_identity" "current" {}

module "users" {
    source = "../../infra/users"
    environment = var.environment
    ugo_region = var.ugo_region
    template_email_nova_senha = var.template_email_nova_senha
    template_email_altera_senha = var.template_email_altera_senha
    write_capacity = 10
    read_capacity = 10
    sns_users_notifications_arn = "${module.notifications.ugo_users_notifications_topic_arn}"
}

module "spaces" {
    source = "../../infra/spaces"
    environment = var.environment
    ugo_region = var.ugo_region
    template_email_new_space = var.template_email_new_space
    template_email_shared_spaces = var.template_email_shared_spaces
    write_capacity = 10
    read_capacity = 10
    sns_spaces_notifications_arn = "${module.space_notifications.ugo_spaces_notifications_topic_arn}"
}

module "authorizers" {
    source = "../../infra/authorizers"
    environment = var.environment
    ugo_region = var.ugo_region
    template_email_added_as_althorizer = var.template_email_added_as_althorizer
    template_email_shared_space_success = var.template_email_shared_space_success
    write_capacity = 1
    read_capacity = 1
    sns_authorizers_notifications_arn = "${module.authorizers_notifications.ugo_authorizers_notifications_topic_arn}"
    authorizers_table_arn  = "${module.authorizers.ugo-authorizers.arn}"
}

module "equipments" {
    source = "../../infra/equipments"
    environment = var.environment
    ugo_region = var.ugo_region
    template_email_added_equipment = var.template_email_added_equipment
    write_capacity = 1
    read_capacity = 1
    sns_equipments_notifications_arn = "${module.equipments_notifications.ugo_equipments_notifications_topic_arn}"
}

module "admin" {
    source = "../../infra/admin"
    email_sender = var.email_sender
    environment = var.environment
    jwt_secret = var.jwt_secret
}

module "probs" {
    source = "../../infra/probs"
    ugo_region = var.ugo_region
    write_capacity = 1
    read_capacity = 1
    environment = var.environment
}

module "notifications" {
    source = "../../infra/notifications"
    environment = var.environment
    account_id = data.aws_caller_identity.current.account_id
    ugo_region = var.ugo_region
}

module "space_notifications" {
    source = "../../infra/space_notifications"
    environment = var.environment
    account_id = data.aws_caller_identity.current.account_id
    ugo_region = var.ugo_region
}

module "authorizers_notifications" {
    source = "../../infra/authorizers_notifications"
    environment = var.environment
    account_id = data.aws_caller_identity.current.account_id
    ugo_region = var.ugo_region
}

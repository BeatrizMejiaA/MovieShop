locals{
    layers_path = "${path.module}/ugo-layers-modules"
    lambdas_path = "${path.module}"

    common_tags = {
        Project = "Lambda layers movieshop in terraform"
        CreatedAt = formatdate("YYYY-MM-DD", timestamp())
        ManagedBy = "Terraform"
        Owner = "MovieShop"
    }
}
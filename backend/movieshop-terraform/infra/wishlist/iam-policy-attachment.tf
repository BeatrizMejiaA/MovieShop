resource "aws_iam_policy_attachment" "movieshop_wishlist_policy_attachment" {
    name = "${var.environment}-wishlist-policy-attachment"
    roles = [aws_iam_role.movieshop_wishlist_role.name]
    policy_arn = aws_iam_policy.movieshop_wishlist_policy.arn
  
}
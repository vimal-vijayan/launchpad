output "resource_group_name" {
  value = azurerm_resource_group.this.name
}

output "backstage_aad_app" {
  value = azuread_application.app.display_name
}
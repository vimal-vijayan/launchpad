resource "azuread_application" "ado_app" {
  display_name    = "spa-backstage-ado-${local.workspace.env}-integration"
  logo_image      = filebase64("./backstage-logo.png")
  owners          = [data.azuread_client_config.current.object_id]
  tags = [
    "EssityDescription:Used for backstage integration with azure devops",
    "EssityOwner:vimal.vijayan@essity.com",
    "keyvault:${azurerm_key_vault.kv.name}",
    "ClientId:spa-azdo-client-id",
    "Secret:spa-azdo-client-secret"
  ]
}

resource "azuread_service_principal" "ado_spa" {
  client_id                    = azuread_application.ado_app.client_id
  app_role_assignment_required = false
  owners                       = [data.azuread_client_config.current.object_id]
}

resource "time_rotating" "ado_spa_rotate365" {
  rotation_days = 365
}

resource "azuread_service_principal_password" "ado_secret" {
  service_principal_id = azuread_service_principal.ado_spa.object_id
  rotate_when_changed = {
    rotation = time_rotating.ado_spa_rotate365.id
  }
}

resource "azurerm_key_vault_secret" "ado_client_id" {
  depends_on   = [azurerm_key_vault_access_policy.kv_policy]
  name         = "spa-azdo-client-id"
  value        = azuread_application.ado_app.client_id
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "ado_client_secret" {
  depends_on   = [azurerm_key_vault_access_policy.kv_policy]
  name         = "spa-azdo-client-secret"
  value        = azuread_service_principal_password.ado_secret.value
  key_vault_id = azurerm_key_vault.kv.id
}

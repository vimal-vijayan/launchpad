data "azurerm_client_config" "current" {}


resource "azurerm_resource_group" "this" {
  location = local.location
  name     = "rg-backstage-${local.workspace.env}"

  tags = local.tags

  lifecycle {
    ignore_changes = [tags]
  }
}


resource "azurerm_key_vault" "kv" {
  name                        = "kv-${local.app_name}-${local.workspace.env}"
  location                    = azurerm_resource_group.this.location
  resource_group_name         = azurerm_resource_group.this.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  sku_name                    = "premium"

  tags = local.tags
}


resource "azurerm_key_vault_access_policy" "kv_policy" {
  key_vault_id = azurerm_key_vault.kv.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  secret_permissions = [
    "Get", "List", "Set", "Delete", "Purge", "Recover"
  ]
}

# postgres database user
# resource "random_string" "postgres_user" {
#   length           = 8
#   upper            = false
#   special          = false
#   override_special = "/@£$"
# }

# postgres database password
# resource "random_password" "postgres_password" {
#   length           = 12
#   special          = true
#   override_special = "_%@"
# }

# keep in keyvault and later use MI to get kv secrets in aks cluster
# resource "azurerm_key_vault_secret" "postgres_user" {
#   depends_on   = [azurerm_key_vault_access_policy.kv_policy]
#   name         = "POSTGRES-USER"
#   value        = random_string.postgres_user.result
#   key_vault_id = azurerm_key_vault.kv.id
# }

# keep in keyvault and later use MI to get kv secrets in aks cluster
# resource "azurerm_key_vault_secret" "postgres_password" {
#   depends_on   = [azurerm_key_vault_access_policy.kv_policy]
#   name         = "POSTGRES-PASSWORD"
#   value        = random_password.postgres_password.result
#   key_vault_id = azurerm_key_vault.kv.id
# }


# resource "azurerm_postgresql_flexible_server" "postgres_server" {
#   name                   = "psql-backstage-${local.workspace.env}"
#   resource_group_name    = azurerm_resource_group.this.name
#   location               = azurerm_resource_group.this.location
#   version                = "12"
#   administrator_login    = random_string.postgres_user.result
#   administrator_password = random_password.postgres_password.result
#   storage_mb             = 32768
#   sku_name               = "GP_Standard_D4s_v3"

#   tags = local.tags
# }

# resource "azurerm_postgresql_flexible_server_database" "backstage_db" {
#   name      = "backstage-${local.workspace.env}"
#   server_id = azurerm_postgresql_flexible_server.postgres_server.id
#   collation = "en_US.utf8"
#   charset   = "utf8"

#   # prevent the possibility of accidental data loss
#   # lifecycle {
#   #   prevent_destroy = true
#   # }
# }

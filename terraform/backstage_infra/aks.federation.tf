# resource "azurerm_user_assigned_identity" "umi_kv_backstage" {
#   name                = "umi-backstage-wi"
#   location            = azurerm_resource_group.this.location
#   resource_group_name = azurerm_resource_group.this.name

#   tags = local.tags
# }

# resource "azurerm_federated_identity_credential" "kv-wi" {
#   name                = "kv-workload-identity"
#   resource_group_name = azurerm_resource_group.this.name
#   audience            = ["api://AzureADTokenExchange"]
#   issuer              = data.tfe_outputs.aks_cluster.nonsensitive_values.oidc_issuer_url
#   parent_id           = azurerm_user_assigned_identity.umi_kv_backstage.id
#   subject             = "system:serviceaccount:backstage:backstage-wi-sa"
#   # subject             = "system:serviceaccount:${SERVICE_ACCOUNT_NAMESPACE}:${SERVICE_ACCOUNT_NAME}"
# }

# resource "azurerm_key_vault_access_policy" "umi_kv_policy" {
#   key_vault_id = azurerm_key_vault.kv.id
#   tenant_id    = data.azurerm_client_config.current.tenant_id
#   object_id    = azurerm_user_assigned_identity.umi_kv_backstage.principal_id

#   secret_permissions = [
#     "Get", "List"
#   ]
# }

data "azuread_client_config" "current" {}

resource "azuread_application" "app" {
  display_name    = "spa-backstage-${local.workspace.env}-auth"
  identifier_uris = ["api://backstage-${local.workspace.env}"]
  logo_image      = filebase64("./backstage-logo.png")
  owners          = [data.azuread_client_config.current.object_id, "d465b749-c2c2-47cb-bfbd-af14496761d5"]
  tags = [
		"EssityDescription:Used for backstage app authentication",
		"EssityOwner:vimal.vijayan@essity.com",
    "keyvault:${azurerm_key_vault.kv.name}",
    "ClientId:auth-client-id",
    "Secret:auth-client-secret"
	]

  required_resource_access {
    resource_app_id = "00000003-0000-0000-c000-000000000000"

    resource_access {
      id   = "64a6cdd6-aab1-4aaf-94b8-3cc8405e90d0"
      type = "Scope"
    }
    resource_access {
      id   = "7427e0e9-2fba-42fe-b0c0-848c9e6a8182"
      type = "Scope"
    }
    resource_access {
      id   = "37f7f235-527c-4136-accd-4a02d197296e"
      type = "Scope"
    }
    resource_access {
      id   = "14dad69e-099b-42c9-810b-d002981feec1"
      type = "Scope"
    }
    resource_access {
      id   = "df021288-bdef-4463-88db-98f22de89214"
      type = "Role"
    }
  }

  web {
    redirect_uris = ["http://localhost:7007/api/auth/microsoft/handler/frame"]
    implicit_grant {
      access_token_issuance_enabled = true
      id_token_issuance_enabled     = true
    }
  }
}

resource "azuread_service_principal" "spa" {
  client_id                    = azuread_application.app.client_id
  app_role_assignment_required = false
  owners                       = [data.azuread_client_config.current.object_id]
}

resource "time_rotating" "rotate365" {
  rotation_days = 365
}

resource "azuread_service_principal_password" "secret" {
  service_principal_id = azuread_service_principal.spa.object_id
  rotate_when_changed = {
    rotation = time_rotating.rotate365.id
  }
}

resource "azurerm_key_vault_secret" "client_id" {
  depends_on   = [azurerm_key_vault_access_policy.kv_policy]
  name         = "auth-client-id"
  value        = azuread_application.app.client_id
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_key_vault_secret" "client_secret" {
  depends_on   = [azurerm_key_vault_access_policy.kv_policy]
  name         = "auth-client-secret"
  value        = azuread_service_principal_password.secret.value
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_resource_group" "this" {
  location = local.location
  name     = "rg-backstage-${local.workspace.env}"

  tags = local.tags

  lifecycle {
    ignore_changes = [tags]
  }
}


resource "azurerm_postgresql_flexible_server" "postgres" {
  name                   = "psql-flexible-backstage-${local.workspace.env}"
  resource_group_name    = azurerm_resource_group.this.name
  location               = azurerm_resource_group.this.location
  version                = "12"
  administrator_login    = "psqladmin"
  administrator_password = "H@Sh1CoR3!"
  zone                   = "1"

  #   delegated_subnet_id    = azurerm_subnet.example.id
  #   private_dns_zone_id    = azurerm_private_dns_zone.example.id


  storage_mb   = 32768
  storage_tier = "P30"

  sku_name = "GP_Standard_D2s_v3"
}

resource "azurerm_postgresql_flexible_server_database" "backstage_plugin_db" {
  name      = "backstage_plugin_catalog"
  server_id = azurerm_postgresql_flexible_server.postgres.id
  collation = "en_US.utf8"
  charset   = "utf8"

  # prevent the possibility of accidental data loss
  lifecycle {
    prevent_destroy = true
  }
}

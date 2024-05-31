locals {

  app_name   = "backstage"
  app_owners = ["vimal.vijayan@essity.com"]
  location   = "westeurope"

  tags = {
    solution-id = "sbx"
    owner       = "vimal.vijayan@essity.com"
    created-by  = "vimal.vijayan@essity.com"
    cost-center = "Hosting"
    environment = "sandbox"
  }


  env = {
    dev = {
      location             = "westeurope"
      location_abbrevation = "euwe"
      env                  = "dev"
    }
  }
  environmentvars      = contains(keys(local.env), terraform.workspace) ? terraform.workspace : "dev"
  workspace            = merge(local.env["dev"], local.env[local.environmentvars])
  workspace_attributes = lookup(local.env, terraform.workspace, "False")

}

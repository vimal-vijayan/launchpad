locals {

  app_name   = "sbx"
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
    sbx = {
      location             = "westeurope"
      location_abbrevation = "euwe"
      env                  = "sbx"
    }
  }
  environmentvars      = contains(keys(local.env), terraform.workspace) ? terraform.workspace : "sbx"
  workspace            = merge(local.env["sbx"], local.env[local.environmentvars])
  workspace_attributes = lookup(local.env, terraform.workspace, "False")

}

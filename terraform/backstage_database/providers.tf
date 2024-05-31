terraform {
  cloud {
    organization = "optimus"
    hostname     = "app.terraform.io"
    workspaces {
      project = "kubernetes clusters"
      name    = "backstage"
    }
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.95.0"
    }
  }

}

provider "azurerm" {
  features {}
}

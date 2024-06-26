terraform {
  cloud {
    organization = "Essity"
    workspaces {
      project = "backstage"
      name    = "backstage-dev"
    }
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.95.0"
    }
    
    azuread = {
      source = "hashicorp/azuread"
      version = "2.51.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.6.0"
    }

    time = {
      source = "hashicorp/time"
      version = "0.11.1"
    }
  }



}

provider "azurerm" {
  features {}
}

provider "azuread" {
  # Configuration options
}

provider "random" {
  # Configuration options
}

provider "time" {
  # Configuration options
}
/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';
import { RootHealthService, coreServices, createServiceFactory } from '@backstage/backend-plugin-api'; 
// Import createServiceFactory


// Initialize the backend
const backend = createBackend();

// health check
class MyRootHealthService implements RootHealthService {
  async getLiveness() {
    // provide your own implementation
    return { status: 200, payload: { status: 'ok' } };
  }

  async getReadiness() {
    // provide your own implementation
    return { status: 200, payload: { status: 'ok' } };
  }
}

backend.add(
  createServiceFactory({
    service: coreServices.rootHealth,
    deps: {},
    async factory({}) {
      return new MyRootHealthService();
    },
  }),
);


// Add core plugins
backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));


// Add authentication plugins
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-okta-provider'));

// Add custom Microsoft Auth Provider
import { customMicrosoftAuth } from './plugins/microsoftAuth';
backend.add(customMicrosoftAuth);

// Catalog plugins
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-github/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-msgraph/alpha'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// Permission plugins
// backend.add(import('@backstage/plugin-permission-backend/alpha'));
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);

// Search plugins
backend.add(import('@backstage/plugin-search-backend/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));

//event plugins
backend.add(import('@backstage/plugin-events-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// Add scaffolder backend module for GitHub
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));

// add scaffolder backend module for azure devops
backend.add(import('@backstage/plugin-scaffolder-backend-module-azure'));

// azure repo plugin
backend.add(import('@parfuemerie-douglas/scaffolder-backend-module-azure-repositories'))

//custom azure pipeline action
import { scaffolderModuleCustomActions } from '../../../plugins/scaffolder-backend-module-azure-devops-pipeline-action/src/actions/azure-devops-pipeline/module';
backend.add(scaffolderModuleCustomActions);

// Start the backend
backend.start();

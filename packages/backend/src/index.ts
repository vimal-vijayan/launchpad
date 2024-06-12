/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';

// Initialize the backend
const backend = createBackend();

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

// Add scaffolder backend module for GitHub
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));

// add scaffolder backend module for azure devops
backend.add(import('@backstage/plugin-scaffolder-backend-module-azure'));


//custom azure pipeline action
import { runAzurePipelineAction } from './plugins/scaffolder/actions/runAzurePipeline';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';

// Custom Scaffolder Module with Custom Actions

const scaffolderModuleCustomExtensions = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'custom-extensions',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
      },
      async init({ scaffolder }) {
        // Add the custom Azure Pipeline Action
        scaffolder.addActions(runAzurePipelineAction({} as any))
        // scaffolder.addActions(runAzurePipelineAction({
        //   integrations: env.scmIntegrationsRegistry,
        // }));
      },  
    });
  },
});

// Add the custom scaffolder module
backend.add(scaffolderModuleCustomExtensions);

// Start the backend
backend.start();

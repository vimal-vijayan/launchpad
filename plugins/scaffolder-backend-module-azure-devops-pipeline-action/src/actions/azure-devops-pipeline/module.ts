import { createBackendModule, coreServices } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { createAzureDevOpsPipelineTriggerAction } from './pipeline-action';
import type { Logger } from 'winston';

export const scaffolderModuleCustomActions = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'custom-actions',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
        config: coreServices.rootConfig,
        logger: coreServices.logger,
      },
      async init({ scaffolder, config, logger }) {
        const actualConfig = await config.getConfig('scaffolder');
        const actualLogger = logger as unknown as Logger; // Cast LoggerService to Winston Logger

        try {
          scaffolder.addActions(
            createAzureDevOpsPipelineTriggerAction({ config: actualConfig, logger: actualLogger }),
          );
          actualLogger.info('Custom Azure DevOps pipeline trigger action registered successfully.');
        } catch (error) {
          actualLogger.error(`Error registering custom action: ${error}`);
          throw error;
        }
      },
    });
  },
});

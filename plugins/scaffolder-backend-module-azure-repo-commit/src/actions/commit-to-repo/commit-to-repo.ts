import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import {  DefaultAzureDevOpsCredentialsProvider, ScmIntegrationRegistry } from "@backstage/integration";
import { Config } from '@backstage/config';


const id = 'azure:repo:commit';

/**
 *
 * @remarks
 *
 * See {@link https://example.com} for more information.
 *
 * @public
 */

export const commitAzureRepoAction = (options: { 
  integrations: ScmIntegrationRegistry;
  config: Config;
  credentialsProvider: DefaultAzureDevOpsCredentialsProvider;
} ) => {

  const { integrations, config } = options;
  // Use the destructured elements
  //FIXME: remove the console.log
  console.log(integrations);
  console.log(config);

  return createTemplateAction<{
    path: string;
    azureRepoUrl: string;
    commitMessage: string;
    sourcePath: string;
    azurePat: string;
  }>({
    id,
    description: 'Commit to the target Azure repo',
    schema: {
      input: {
        type: 'object',
        required: ['path', 'azureRepoUrl'],
        properties: {
          path: {
            title: 'Target Path in the Repo',
            description: 'The path in the repo to commit the files to',
            type: 'string',
          },
          azureRepoUrl: {
            title: 'Azure Repo URL',
            description: 'The URL of the Azure Repo to commit to',
            type: 'string',
            format: 'uri',
          },
          commitMessage: {
            title: 'Commit Message',
            description: 'The message to use for the commit',
            type: 'string',
            default: 'Backstage scaffolder commit',
          },
          sourcePath: {
            title: 'Source Path',
            description: 'The path to the files to commit',
            type: 'string',
            default: 'template',
          },
          azurePat: {
            title: 'Azure PAT',
            description: 'Azure Personal Access Token with permissions to commit to the repo',
            type: 'string',
            format: 'password',
          },
        },
      },
    },
    
    async handler(ctx) {
      ctx.logger.info(
        `Running example template with parameters: Path - ${ctx.input.path}, Repo URL - ${ctx.input.azureRepoUrl}, Commit Message - ${ctx.input.commitMessage}, Source Path - ${ctx.input.sourcePath}`,
      );

      // Simulating an action with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Logic to commit to the Azure Repo would go here

      ctx.logger.info('Action completed successfully');
    },
  });
}


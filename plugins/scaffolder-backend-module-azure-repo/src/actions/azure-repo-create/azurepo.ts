import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import {
  WebApi,
  getPersonalAccessTokenHandler,
} from 'azure-devops-node-api';
import { GitRepositoryCreateOptions, GitRepository } from 'azure-devops-node-api/interfaces/GitInterfaces';
import { TeamProjectReference } from 'azure-devops-node-api/interfaces/CoreInterfaces';

export const createAzureRepoAction = () => {
  return createTemplateAction<{
    organizationUrl: string;
    project: string;
    repoName: string;
    description?: string;
  }>({
    id: 'azure:create-repo',
    description: 'Creates a new repository in Azure DevOps',
    schema: {
      input: {
        required: ['organizationUrl', 'project', 'repoName'],
        type: 'object',
        properties: {
          organizationUrl: {
            type: 'string',
            title: 'Azure DevOps Organization URL',
            description: 'The URL of your Azure DevOps organization',
          },
          project: {
            type: 'string',
            title: 'Project Name',
            description: 'The name of the Azure DevOps project',
          },
          repoName: {
            type: 'string',
            title: 'Repository Name',
            description: 'The name of the repository to create',
          },
          description: {
            type: 'string',
            title: 'Repository Description',
            description: 'An optional description for the repository',
          },
        },
      },
    },
    async handler(ctx) {
      // const { organizationUrl, project, repoName, description } = ctx.input;
      const { organizationUrl, project, repoName } = ctx.input;
      const personalAccessToken = ctx.secrets?.azureToken as string;

      if (!personalAccessToken) {
        throw new Error('Azure personal access token is required');
      }

      try {
        const authHandler = getPersonalAccessTokenHandler(personalAccessToken);
        const connection = new WebApi(organizationUrl, authHandler);

        const coreApi = await connection.getCoreApi();
        const teamProject: TeamProjectReference | undefined = await coreApi.getProject(project);
        
        if (!teamProject) {
          throw new Error(`Project '${project}' not found`);
        }

        const gitApi = await connection.getGitApi();

        const repoOptions: GitRepositoryCreateOptions = {
          name: repoName,
          project: teamProject,
        };

        const newRepo: GitRepository = await gitApi.createRepository(repoOptions, teamProject.id!);

        if (!newRepo || !newRepo.remoteUrl) {
          throw new Error('Failed to create repository: No remote URL returned');
        }

        // if (description) {
        //   newRepo.description = description;
        //   await gitApi.updateRepository(newRepo, teamProject.id!, newRepo.id!);
        // }

        ctx.output('repoUrl', newRepo.remoteUrl);
        ctx.output('repoId', newRepo.id);

        ctx.logger.info(`Created Azure Repo: ${newRepo.name} (${newRepo.id})`);
      } catch (error) {
        ctx.logger.error(`Failed to create Azure Repo: ${error}`);
        throw error;
      }
    },
  });
};

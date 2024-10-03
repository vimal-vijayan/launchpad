import { createBackendModule } from '@backstage/backend-plugin-api';
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { ScmIntegrations } from '@backstage/integration';
import { CatalogClient } from '@backstage/catalog-client';
import { ConfigApi } from '@backstage/core-plugin-api';
import { InputError } from '@backstage/errors';
import * as azdev from 'azure-devops-node-api';
import { IGitApi } from 'azure-devops-node-api/GitApi';
import { GitRefUpdate, GitCommitRef, GitPullRequestCreateParameters } from 'azure-devops-node-api/interfaces/GitInterfaces';
import * as fs from 'fs';
import * as path from 'path';

export const azureReposActionPlugin = createBackendModule({
  pluginId: 'azure-repos-action',
  moduleId: 'azureReposAction',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderExtensionPoint,
        catalog: catalogServiceRef,
        config: configServiceRef,
        reader: urlReaderServiceRef,
        logger: loggerServiceRef,
      },
      async init({ scaffolder, catalog, config, reader, logger }) {
        const integrations = ScmIntegrations.fromConfig(config);
        const catalogClient = new CatalogClient({ discoveryApi: env.discovery });

        const actions = [
          createAzureReposAction({
            integrations,
            reader,
            config,
            catalogClient,
          }),
        ];

        await scaffolder.addActions(actions);
      },
    });
  },
});

function createAzureReposAction(options: {
  integrations: ScmIntegrations;
  reader: UrlReader;
  config: ConfigApi;
  catalogClient: CatalogClient;
}) {
  return createTemplateAction<{
    repoUrl: string;
    branchName: string;
    folderPath: string;
    commitMessage: string;
    sourcePath: string;
  }>({
    id: 'azure:create-repo-and-push',
    schema: {
      input: {
        required: ['repoUrl', 'branchName', 'folderPath', 'commitMessage', 'sourcePath'],
        type: 'object',
        properties: {
          repoUrl: {
            type: 'string',
            title: 'Repository URL',
            description: 'Azure Repos URL (e.g., https://dev.azure.com/organization/project/_git/repo)',
          },
          branchName: {
            type: 'string',
            title: 'Branch Name',
            description: 'The branch to push to',
          },
          folderPath: {
            type: 'string',
            title: 'Folder Path',
            description: 'The folder path in the repository to push the content to',
          },
          commitMessage: {
            type: 'string',
            title: 'Commit Message',
            description: 'The commit message for the push',
          },
          sourcePath: {
            type: 'string',
            title: 'Source Path',
            description: 'The path to the source template in the workspace',
          },
        },
      },
    },
    async handler(ctx) {
      const { repoUrl, branchName, folderPath, commitMessage, sourcePath } = ctx.input;

      if (!repoUrl.includes('dev.azure.com')) {
        throw new InputError('Invalid Azure Repos URL');
      }

      const azureClient = new AzureRepoClient(options.config);

      ctx.logger.info(`Pushing template to Azure Repos: ${repoUrl}`);

      try {
        const result = await azureClient.pushTemplate({
          repoUrl,
          branchName,
          folderPath,
          commitMessage,
          sourcePath: ctx.workspacePath(sourcePath),
        });

        ctx.output('repoUrl', result.repoUrl);
        ctx.output('commitUrl', result.commitUrl);
        ctx.output('pullRequestUrl', result.pullRequestUrl);

        ctx.logger.info('Successfully pushed template to Azure Repos');
        ctx.logger.info(`Repo URL: ${result.repoUrl}`);
        ctx.logger.info(`Commit URL: ${result.commitUrl}`);
        if (result.pullRequestUrl) {
          ctx.logger.info(`Pull Request URL: ${result.pullRequestUrl}`);
        }
      } catch (error) {
        ctx.logger.error(`Error pushing template to Azure Repos: ${error.message}`);
        throw error;
      }
    },
  });
}

class AzureRepoClient {
  private azureDevOpsApi: azdev.WebApi;
  private gitApi: IGitApi | undefined;

  constructor(config: ConfigApi) {
    const token = config.getString('integrations.azure[0].token');
    const organizationUrl = config.getString('integrations.azure[0].host');

    const authHandler = azdev.getPersonalAccessTokenHandler(token);
    this.azureDevOpsApi = new azdev.WebApi(organizationUrl, authHandler);
  }

  private async getGitApi(): Promise<IGitApi> {
    if (!this.gitApi) {
      this.gitApi = await this.azureDevOpsApi.getGitApi();
    }
    return this.gitApi;
  }

  private parseRepoUrl(repoUrl: string): { organization: string; project: string; repoName: string } {
    const urlParts = repoUrl.split('/');
    return {
      organization: urlParts[3],
      project: urlParts[4],
      repoName: urlParts[6],
    };
  }

  async pushTemplate({
    repoUrl,
    branchName,
    folderPath,
    commitMessage,
    sourcePath,
  }: {
    repoUrl: string;
    branchName: string;
    folderPath: string;
    commitMessage: string;
    sourcePath: string;
  }) {
    const { organization, project, repoName } = this.parseRepoUrl(repoUrl);
    const gitApi = await this.getGitApi();

    // Get the repository ID
    const repo = await gitApi.getRepository(repoName, project);
    if (!repo) throw new Error(`Repository not found: ${repoName}`);

    // Get the default branch as the base
    const defaultBranch = repo.defaultBranch;
    const baseBranchName = defaultBranch?.replace('refs/heads/', '') || 'main';

    // Create a new branch
    const ref: GitRefUpdate = {
      name: `refs/heads/${branchName}`,
      oldObjectId: '0000000000000000000000000000000000000000',
    };
    await gitApi.updateRefs([ref], repo.id!, project);

    // Read files from sourcePath
    const files = this.readFilesRecursively(sourcePath);

    // Create a commit with the new files
    const changes = files.map(file => ({
      changeType: 1, // Add
      item: {
        path: path.join(folderPath, file.relativePath).replace(/\\/g, '/'),
      },
      newContent: {
        content: file.content,
        contentType: 0, // RawText
      },
    }));

    const commit: GitCommitRef = {
      comment: commitMessage,
      changes: changes,
    };

    const push = await gitApi.createPush(
      {
        refUpdates: [
          {
            name: `refs/heads/${branchName}`,
            oldObjectId: ref.oldObjectId,
          },
        ],
        commits: [commit],
      },
      repo.id!,
      project
    );

    // Create a pull request
    const pullRequestParams: GitPullRequestCreateParameters = {
      sourceRefName: `refs/heads/${branchName}`,
      targetRefName: `refs/heads/${baseBranchName}`,
      title: `Merge ${branchName} into ${baseBranchName}`,
      description: 'Created by Backstage custom action',
    };

    const pullRequest = await gitApi.createPullRequest(pullRequestParams, repo.id!, project);

    return {
      repoUrl: repoUrl,
      commitUrl: `${repoUrl}/commit/${push.commits![0].commitId}`,
      pullRequestUrl: pullRequest.url,
    };
  }

  private readFilesRecursively(dir: string, baseDir: string = dir): { relativePath: string; content: string }[] {
    let results: { relativePath: string; content: string }[] = [];
    const list = fs.readdirSync(dir);

    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        results = results.concat(this.readFilesRecursively(filePath, baseDir));
      } else {
        results.push({
          relativePath: path.relative(baseDir, filePath),
          content: fs.readFileSync(filePath, 'utf8'),
        });
      }
    }

    return results;
  }
}
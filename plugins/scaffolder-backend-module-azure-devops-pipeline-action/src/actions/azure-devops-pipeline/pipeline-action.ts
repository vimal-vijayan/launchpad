import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { Config } from '@backstage/config';
import { z } from 'zod';
import { Logger } from 'winston';
import fetch from 'node-fetch';
import { ScmIntegrations } from '@backstage/integration';

export function createAzureDevOpsPipelineTriggerAction(options: { config: Config; logger: Logger }) {
    const { config, logger } = options;

    return createTemplateAction({
        id: 'azure:devops:pipeline:dispatch',
        description: 'Triggers an Azure DevOps pipeline',
        schema: {
            input: z.object({
                organization: z.string().describe('The Azure DevOps organization name'),
                project: z.string().describe('The Azure DevOps project name'),
                pipelineId: z.string().describe('The ID of the pipeline to trigger'),
                branch: z.string().default('main').describe('The branch to run the pipeline on'),
                parameters: z.record(z.unknown()).optional().describe('Parameters to pass to the pipeline'),
            }),
            output: z.object({
                buildId: z.number().describe('The ID of the triggered build'),
                buildUrl: z.string().describe('The URL of the triggered build'),
            }),
        },
        async handler(ctx) {
            const { input } = ctx;
            const { organization, project, pipelineId, branch, parameters } = input;

            // Fetch Azure integration config
            const integrations = ScmIntegrations.fromConfig(config);
            const azureIntegration = integrations.azure.byHost('dev.azure.com');

            if (!azureIntegration) {
                throw new Error('No Azure DevOps integration found for host dev.azure.com');
            }

            console.log('azureIntegration : ', azureIntegration);

            // Get Personal Access Token
            const credential = azureIntegration.config.credentials?.[0];
            console.log('credential : ', credential);

            // if (!credential || credential.kind !== 'PersonalAccessToken') {
            //     throw new Error('Azure DevOps Personal Access Token is not configured in app-config.yaml');
            // }
            
            const personalAccessToken = credential.personalAccessToken;

            const apiVersion = '7.0';
            const apiUrl = `https://dev.azure.com/${organization}/${project}/_apis/pipelines/${pipelineId}/runs?api-version=${apiVersion}`;

            const requestPayload = {
                resources: {
                    repositories: {
                        self: {
                            refName: `refs/heads/${branch}`,
                        },
                    },
                },
                templateParameters: parameters ? parameters : {},
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${Buffer.from(`:${personalAccessToken}`).toString('base64')}`,
                    },
                    body: JSON.stringify(requestPayload),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const build = await response.json();

                if (!build || !build.id) {
                    throw new Error(`Failed to trigger pipeline with ID ${pipelineId} in project ${project}.`);
                }

                logger.info(`Successfully triggered Azure DevOps pipeline. Build ID: ${build.id}, Branch: ${branch}`);

                // Set the output
                ctx.output('buildId', build.id);
                ctx.output('buildUrl', build._links?.web?.href || '');

            } catch (error) {
                logger.error(`Error triggering Azure DevOps pipeline for pipeline ID ${pipelineId} in project ${project} on branch ${branch}: ${error}`);
                throw error;
            }
        },
    });
}

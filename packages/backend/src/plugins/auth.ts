import {
    createRouter,
    providers,
    defaultAuthProviderFactories,
  } from '@backstage/plugin-auth-backend';
  import { Router } from 'express';
  import { PluginEnvironment } from '../types';
  // import { stringifyEntityRef } from '@backstage/catalog-model'
  // import { DEFAULT_NAMESPACE  } from '@backstage/catalog-model'
  
  export default async function createPlugin(
    env: PluginEnvironment,
  ): Promise<Router> {
    return await createRouter({
      logger: env.logger,
      config: env.config,
      database: env.database,
      discovery: env.discovery,
      tokenManager: env.tokenManager,
      providerFactories: {
        ...defaultAuthProviderFactories,
  
        microsoft: providers.microsoft.create({ 
          signIn: { 
            resolver: 
              providers.microsoft.resolvers.emailMatchingUserEntityAnnotation(), 
          }, 
        }), 
      },
    });
  }
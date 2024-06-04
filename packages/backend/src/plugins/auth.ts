// import {
//     createRouter,
//     providers,
//     defaultAuthProviderFactories,
//   } from '@backstage/plugin-auth-backend';
//   import { Router } from 'express';
//   import { PluginEnvironment } from '../types';
//   // import { stringifyEntityRef } from '@backstage/catalog-model'
//   // import { DEFAULT_NAMESPACE  } from '@backstage/catalog-model'
  
//   export default async function createPlugin(
//     env: PluginEnvironment,
//   ): Promise<Router> {
//     return await createRouter({
//       logger: env.logger,
//       config: env.config,
//       database: env.database,
//       discovery: env.discovery,
//       tokenManager: env.tokenManager,
//       providerFactories: {
//         ...defaultAuthProviderFactories,
  
//         microsoft: providers.microsoft.create({ 
//           signIn: { 
//             resolver: 
//               providers.microsoft.resolvers.emailMatchingUserEntityAnnotation(), 
//           }, 
//         }), 
//       },
//     });
//   }

  /*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
  
// import { createBackendModule } from '@backstage/backend-plugin-api';
// import {
//   DEFAULT_NAMESPACE,
//   stringifyEntityRef,
// } from '@backstage/catalog-model';
// import { microsoftAuthenticator } from '@backstage/plugin-auth-backend-module-microsoft-provider';
// import {
//   authProvidersExtensionPoint,
//   createOAuthProviderFactory,
// } from '@backstage/plugin-auth-node';

// export default createBackendModule({
//   pluginId: 'auth',
//   moduleId: 'microsoftProvider',
//   register(reg) {
//     reg.registerInit({
//       deps: { providers: authProvidersExtensionPoint },
//       async init({ providers }) {
//         providers.registerProvider({
//           providerId: 'microsoft',
//           factory: createOAuthProviderFactory({
//             authenticator: microsoftAuthenticator,
//             async signInResolver({ result: { fullProfile } }, ctx) {
//               const userId = fullProfile.oid;
//               if (!userId) {
//                 throw new Error(
//                   `Azure user profile does not contain an object id`,
//                 );
//               }

//               const userEntityRef = stringifyEntityRef({
//                 kind: 'User',
//                 name: userId,
//                 namespace: DEFAULT_NAMESPACE,
//               });

//               return ctx.issueToken({
//                 claims: {
//                   sub: userEntityRef,
//                   ent: [userEntityRef],
//                 },
//               });
//             },
//           }),
//         });
//       },
//     });
//   },
// });

import { createBackendModule } from '@backstage/backend-plugin-api';
import { microsoftAuthenticator } from '@backstage/plugin-auth-backend-module-microsoft-provider';
import {
  authProvidersExtensionPoint,
  createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';
import { stringifyEntityRef, DEFAULT_NAMESPACE } from '@backstage/catalog-model';

const customMicrosoftAuth = createBackendModule({
  pluginId: 'auth',
  moduleId: 'custom-microsoft-auth-provider',
  register(reg) {
    reg.registerInit({
      deps: { providers: authProvidersExtensionPoint },
      async init({ providers }) {
        providers.registerProvider({
          providerId: 'microsoft',
          factory: createOAuthProviderFactory({
            authenticator: microsoftAuthenticator,
            async signInResolver({ profile }, ctx) {
              if (!profile.email) {
                throw new Error('Login failed, user profile does not contain an email');
              }
              const [localPart, domain] = profile.email.split('@');
              if (domain !== 'essity.com') {
                throw new Error(`Login failed, '${profile.email}' does not belong to the expected domain`);
              }
              const userEntity = stringifyEntityRef({
                kind: 'User',
                name: localPart,
                namespace: DEFAULT_NAMESPACE,
              });
              return ctx.issueToken({
                claims: {
                  sub: userEntity,
                  ent: [userEntity],
                },
              });
            },
          }),
        });
      },
    });
  },
});

export { customMicrosoftAuth };

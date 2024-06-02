import { microsoftAuthApiRef } from "@backstage/core-plugin-api";

export const providers = [
    {
        id: 'microsoft-auth-provider',
        title: 'Microsoft Entra',
        message: 'Sign in using Microsoft Entra ID',
        apiRef: microsoftAuthApiRef,
    },
]
// packages/app/src/api.ts
import { createApiFactory } from '@backstage/core-plugin-api';
import { costInsightsApiRef } from '@backstage-community/plugin-cost-insights';
import { CostInsightsClient } from '../../../plugins/costInsights/costInsightsClient';

export const apis = [
  createApiFactory({
    api: costInsightsApiRef,
    deps: {},
    factory: () => new CostInsightsClient(),
  }),
];
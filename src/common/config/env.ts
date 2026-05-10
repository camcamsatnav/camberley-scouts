import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const clientEnv = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_BASE_URL: z.string().min(1).default('/api/v1'),
  },
  runtimeEnvStrict: {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  },
  emptyStringAsUndefined: true,
});

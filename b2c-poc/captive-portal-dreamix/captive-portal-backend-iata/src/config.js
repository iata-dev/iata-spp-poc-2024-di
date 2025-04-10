import 'dotenv/config';

const env = { ...process.env };

const splitVariable = (variable) => {
  if (!variable) {
    return [];
  }

  return variable.split(',');
};

export const config = {
  env: env.NODE_ENV,
  web: {
    httpPort: env.WEB_PORT ?? 3000,
    allowedOrigins: env.WEB_ALLOWED_ORIGINS ?? '',
    hostUrl: env.WEB_HOST_URL,
  },
  clients: splitVariable(env.WEB_ALLOWED_CLIENT_IDS),
  sicpa: {
    apiUrl: env.SICPA_API_URL,
    authUrl: env.SICPA_AUTH_URL,
    clientId: env.SICPA_CLIENT_ID,
    clientSecret: env.SICPA_CLIENT_SECRET,
    agentId: env.SICPA_AGENT_ID,
    agentDidId: env.SICPA_AGENT_DID_ID,
    agentWebhookSecret: env.SICPA_AGENT_HOOK_SECRET,
    rapidApiKey: env.RAPID_API_KEY,
    rapidApiHost: env.RAPID_API_HOST,
  },
  neoke: {
    apiUrl: env.NEOKE_API_URL,
    apiKey: env.NEOKE_API_KEY,
    agentName: env.NEOKE_AGENT_NAME,
  },
  northernBlock: {
    apiUrl: env.NB_API_URL,
    apiKey: env.NORTHERN_BLOCK_API_KEY,
    enabled: env.NORTHERN_BLOCK_ENABLED,
  },
};

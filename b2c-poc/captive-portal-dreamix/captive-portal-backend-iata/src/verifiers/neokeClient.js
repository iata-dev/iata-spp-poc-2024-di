import axios from 'axios';

import { config } from '../config.js';

const client = axios.create({
  baseURL: config.neoke.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'wps-api-key': config.neoke.apiKey,
  },
});

const templates = {
  AGENCY: 'agency-key',
  GROUND_WIFI: 'ground-key',
  BOARD_WIFI: 'board-key',
  LOUNGE: 'lounge-key',
};

const createVerificationRequest = async (verificationId, flow, template) => {
  return client.post(
    `/wallet/generate-presentation-request/${config.neoke.agentName}`,
    {
      template: template,
      callback: `${config.web.hostUrl}/api/private/sessions?verificationId=${verificationId}`,
      redirect_uri: `${config.web.hostUrl}/${flow.type}?verificationId=${verificationId}`,
    }
  );
};

export const api = { createVerificationRequest, templates };

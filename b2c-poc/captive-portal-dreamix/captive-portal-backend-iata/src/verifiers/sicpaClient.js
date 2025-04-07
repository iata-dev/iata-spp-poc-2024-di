import axios from 'axios';

import { config } from '../config.js';

const authenticationStore = { accessToken: undefined };

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      config.sicpa.authUrl,
      {
        grant_type: 'client_credentials',
        client_id: config.sicpa.clientId,
        client_secret: config.sicpa.clientSecret,
      },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return response.data.access_token;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

const client = axios.create({
  baseURL: config.sicpa.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-AGENT-ID': config.sicpa.agentId,
    'X-RapidAPI-Key': config.sicpa.rapidApiKey,
    'X-RapidAPI-Host': config.sicpa.rapidApiHost,
  },
});

client.interceptors.request.use(
  async (request) => {
    if (!authenticationStore.accessToken) {
      try {
        const accessToken = await getAccessToken();
        authenticationStore.accessToken = accessToken;
      } catch (error) {
        console.log('Error:', error);
        throw error;
      }
    }
    request.headers[
      'Authorization'
    ] = `Bearer ${authenticationStore.accessToken}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retried) {
      originalRequest._retried = true;
      try {
        const accessToken = await getAccessToken();
        authenticationStore.accessToken = accessToken;
        client.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${authenticationStore.accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const vcDescriptors = {
  FF: {
    id: 'ff_vc_input',
    constraints: {
      fields: [
        {
          path: ['$.vct'],
          filter: {
            const: 'https://iata.trustregistry.nborbit.ca/loyalty',
          },
        },
        {
          path: ['$.loyaltyProgramAccount.loyaltyProgramAccountTierLevelCode'],
        },
        {
          path: ['$.loyaltyProgramAccount.surname'],
        },
        {
          path: ['$.loyaltyProgramAccount.givenName'],
        },
      ],
    },
  },
  EPASS: {
    id: 'epass_vc_input',
    constraints: {
      fields: [
        {
          path: ['$.vct'],
          filter: {
            const: 'https://iata.trustregistry.nborbit.ca/epassport',
          },
        },
        {
          path: ['$.electronicPassport.dataGroup1.expiryDate'],
        },
        {
          path: ['$.electronicPassport.dataGroup1.holdersName'],
        },
      ],
    },
  },
  BOARDING: {
    id: 'boarding_vc_input',
    constraints: {
      fields: [
        {
          path: ['$.vct'],
          filter: {
            const: 'https://iata.trustregistry.nborbit.ca/boardingpass',
          },
        },
        {
          path: ['$.boardingPass.paxName'],
        },
      ],
    },
  },
};

const createVerificationRequest = async (
  verificationId,
  flow,
  title,
  reason,
  ...vc_descriptors
) => {
  return client.post('/openid4vc/verification', {
    presentationDefinition: {
      id: 'presentation-def',
      name: title,
      purpose: reason,
      format: {
        jwt_vc_json: {
          alg: ['EdDSA'],
        },
        jwt_vp_json: {
          alg: ['EdDSA'],
        },
      },
      input_descriptors: vc_descriptors,
    },
    verifierDidId: config.sicpa.agentDidId,
    redirectUri: `${config.web.hostUrl}/${flow.type}?verificationId=${verificationId}`,
  });
};

export const api = { createVerificationRequest, vcDescriptors };

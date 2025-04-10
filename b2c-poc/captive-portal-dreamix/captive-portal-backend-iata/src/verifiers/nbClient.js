import axios from 'axios';

import { config } from '../config.js';

const client = axios.create({
  baseURL: config.northernBlock.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'api-key': config.northernBlock.apiKey,
  },
});

const vcTypes = {
  FF: { credDefId: 'https://iata.trustregistry.nborbit.ca/.well-known/vct/loyalty.json', credName: '', credType: 'vc+sd-jwt' },
  EPASS: { credDefId: 'https://iata.trustregistry.nborbit.ca/.well-known/vct/epassport.json', credName: '', credType: 'vc+sd-jwt' },
  BOARDING: { credDefId: 'https://iata.trustregistry.nborbit.ca/.well-known/vct/boardingpass.json', credName: '', credType: 'vc+sd-jwt' },
  TESTING: { credDefId: 'https://iata.trustregistry.nborbit.ca/.well-known/vct/employee.json', credName: 'Travel Agency Employee', credType: 'vc+sd-jwt' },
};

const verifyIssuer = async (issuerDid, vcType) => {
  console.log('[nbClient] Validate issuer DID -> ', issuerDid);
  return client.post('/check-issuance-auth', {
    issuerDID: issuerDid,
    ...vcTypes[vcType],
  });
};

export const api = { verifyIssuer, vcTypes };

import {flows, verifiers} from './constants.js';
import {jwtExtractIssuerDid} from "./jwtUtil.js";

export const normalizeVerifierResponse = (flow, response) => {
  if (flow.verifier === verifiers.NEOKE) {
    return {
      referenceId: response.data.id,
      deepLink: response.data.deeplink,
    };
  } else if (flow.verifier === verifiers.SICPA) {
    return {
      referenceId: response.data.referenceId,
      deepLink: `openid4vp://?client_id=${response.data.clientId}&request_uri=${response.data.authorizationRequestUri}`,
    };
  } else {
    throw new Error(`Unsupported verifier: ${flow.verifier}`);
  }
};

export const exportVPToken = (session, request) => {
  if (session.verifier === verifiers.NEOKE) {
    const token = request.body.vp.vp_token[0];
    console.log('token => ', token);
    return jwtExtractIssuerDid(token);
  } else if (session.verifier === verifiers.SICPA) {
    if (session.flowType === flows.BOARD_WIFI.type) {
      const rawVpToken = request.body.event.presentation.raw.vpToken;
      const parsedVpToken = JSON.parse(rawVpToken);
      return jwtExtractIssuerDid(parsedVpToken[0]);
    } else {
      const vpToken = request.body.event.presentation.raw.vpToken;
      return jwtExtractIssuerDid(vpToken);
    }
  } else {
    throw new Error(`Unsupported verifier: ${flow.verifier}`);
  }
}

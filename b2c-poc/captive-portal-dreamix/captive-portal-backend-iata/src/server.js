import express from 'express';
import cors from 'cors';
import path from 'path';
import { randomUUID as uuidv4 } from 'crypto';

import { config } from './config.js';
import { AppError } from './appError.js';
import { sessionStore } from './sessionStore.js';
import { api as sicpaApi } from './verifiers/sicpaClient.js';
import { api as neokeApi } from './verifiers/neokeClient.js';
import { api as northernBlockApi } from './verifiers/nbClient.js';
import { constants } from './constants.js';
import {exportVPToken, normalizeVerifierResponse} from './verifierUtils.js';
import { jwtExtractIssuerDid } from './jwtUtil.js';

// Session timeout in milliseconds
const SESSION_TIMEOUT_IN_MILLIS = 30 * 60 * 1000; // 30 minutes

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

const errorhandler = (error, req, res, _next) => {
  console.error(`Error during the rest route(${req.url}): ${error.message}`, {
    stackTrace: error.stack,
    error,
  });

  let errorObject = error;
  if (!(error instanceof AppError)) {
    errorObject = new AppError({ msg: error.message });
  }
  res.status(errorObject.getStatusCode()).json(errorObject);
};

const clientIdAuthenticator = (req, _res, next) => {
  const clientId = req.headers['x-client-id'];

  if (!config.clients.find((c) => c === clientId)) {
    throw new AppError({
      statusCode: 400,
      msg: 'Invalid request',
    });
  }

  next();
};

const callbackAuthenticator = (_req, _res, next) => {
  next();
};

const apiPublicRouter = express.Router();

apiPublicRouter.get('/ping', (_req, res) => {
  res.status(200).json({ msg: 'pong' });
});

//Creates a verification request for a givem flow: wifi or lounge
apiPublicRouter.post(
  '/verifications',
  asyncHandler(async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipv4 = ip.includes(':') ? ip.split(':').pop() : ip;

    const { flow: flowType } = req.body;
    if (
      !Object.values(constants.flows)
        .map((f) => f.type)
        .includes(flowType)
    ) {
      throw new AppError({
        statusCode: 400,
        msg: `You must specify a valid flow: ${Object.values(constants.flows)
          .map((f) => f.type)
          .join(', ')}`,
      });
    }

    const verificationId = uuidv4();
    const flow = Object.values(constants.flows).find(
      (flow) => flow.type === flowType
    );

    let response;
    console.log('Flow type -> ', flow.type);
    if (flow.type == constants.flows.WIFI.type) {
      response = await sicpaApi.createVerificationRequest(
        verificationId,
        flow,
        'Wi-Fi portal is asking you to share the following information',
        'We are requesting the following information in order to provide access to ground internet service',
        sicpaApi.vcDescriptors.EPASS
      );
    } else if (flow.type == constants.flows.BOARD_WIFI.type) {
      response = await sicpaApi.createVerificationRequest(
        verificationId,
        flow,
        'On-board portal is asking you to share the following information',
        'We are requesting the following information in order to provide access to on-board internet service',
        sicpaApi.vcDescriptors.FF,
        sicpaApi.vcDescriptors.BOARDING,
        sicpaApi.vcDescriptors.EPASS
      );
    } else {
      response = await neokeApi.createVerificationRequest(
        verificationId,
        flow,
        neokeApi.templates.LOUNGE
      );
    }

    if (response.status < 200 || response.status > 299) {
      console.log(
        `Creating verification request failed. Response: ${response}`
      );
      throw new AppError();
    }

    const resPayload = normalizeVerifierResponse(flow, response);

    const session = {
      id: verificationId,
      ip: ipv4,
      referenceId: resPayload.referenceId,
      verifier: flow.verifier,
      state: constants.sessionStates.REQUESTED,
      flowType: flow.type,
    };
    sessionStore.addSession(session);

    console.log(
      `Verification state[${session.state}] for verificationId[${session.id}] with referenceId[${session.referenceId}]`
    );

    res.status(201).json({
      id: verificationId,
      url: resPayload.deepLink,
      state: session.state,
    });
  })
);

//Checks verification request state. It is polled from frontend app
apiPublicRouter.get('/verifications/:id', (req, res) => {
  const { id } = req.params;
  const session = sessionStore.getSessionById(id);
  if (!session) {
    throw new AppError({
      statusCode: 404,
      msg: 'Verification not found!',
    });
  }

  res.status(200).json({ id: session.id, state: session.state });
});

apiPublicRouter.get('/configuration', (req, res) => {
  res.status(200).json(constants.flows);
})

const apiPrivateRouter = express.Router();

//Retrieves session status
apiPrivateRouter.get('/sessions', clientIdAuthenticator, (req, res) => {
  const { ip } = req.query;
  if (!ip) {
    throw new AppError({
      statusCode: 400,
      msg: 'IP param cannot be null or empty',
    });
  }

  const session = sessionStore.getSessionByIp(ip);
  if (!session) {
    throw new AppError({
      statusCode: 404,
      msg: 'Session not found',
    });
  }

  res
    .status(200)
    .json({ ip, status: isSessionValid(session) ? 'OK' : 'INVALID' });
});

const isSessionValid = (session) => {
  return (
    session &&
    session.status === constants.sessionStates.VERIFIED &&
    session.expiresAt > new Date()
  );
};

//Updates session status based on the verification result
//this is called as webhook or callback depending on the verifier
apiPrivateRouter.post(
  '/sessions',
  callbackAuthenticator,
  asyncHandler(async (req, res) => {
    const { verificationId } = req.query;
    let session;

    if (verificationId) {
      //Neoke flow
      console.log('[POST /sessions] Neoke redirect flow triggered with verificationId = ', verificationId);
      session = sessionStore.getSessionById(verificationId);
    } else {
      // SICPA flow
      const { verificationId } = req.body.event;
      console.log('[POST /sessions] Sicpa callback flow triggered with referenceId(verificationId) = ', verificationId);
      if (req.body.event.state != 'VERIFICATION_DONE') {
        console.log('Verification is not complete yet. Do nothing');
        res.sendStatus(200);
        return;
      }
      session = sessionStore.getSessionByReference(verificationId);
    }

    console.log('[POST /sessions] Session returned = ', JSON.stringify(session));
    if (!session) {
      throw new AppError({
        statusCode: 400,
        msg: 'Invalid reference',
      });
    }

    if (config.northernBlock.enabled === true) {
      const issuerVerification = await northernBlockApi.verifyIssuer(
        exportVPToken(session, req),
        northernBlockApi.vcTypes.TESTING
      );
      if (!issuerVerification.data.isIssuerValid) {
        throw new AppError({
          statusCode: 400,
          msg: 'Trust Store verification failed -> Invalid Issuer reference',
        });
      }
    }


    const currentTime = new Date();
    const expiresAt = new Date();
    expiresAt.setMilliseconds(
      expiresAt.getMilliseconds() + SESSION_TIMEOUT_IN_MILLIS
    );
    const updatedSession = {
      ...session,
      state: constants.sessionStates.VERIFIED,
      createdAt: currentTime,
      expiresAt: expiresAt,
    };

    sessionStore.updateSession(updatedSession);
    console.log(
      '[POST /sessions] Session updated = ', JSON.stringify(updatedSession)
    )
    res.sendStatus(200);
  })
);

export const startServer = (globalDir) => {
  const app = express();
  app.use(
    cors({
      origin: config.web.allowedOrigins,
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.static(path.join(globalDir, 'public')));
  app.use('/api/public', apiPublicRouter);
  app.use('/api/private', apiPrivateRouter);
  // Fallback route for single-page applications (optional)
  // Redirects all other routes to index.html
  app.get('*', (_req, res) => {
    res.sendFile(path.join(globalDir, 'public', 'index.html'));
  });
  app.use(errorhandler);

  app.listen({ port: config.web.httpPort }, () => {
    console.log(`🚀 Server ready to serve at port:${config.web.httpPort}`);
  });
};

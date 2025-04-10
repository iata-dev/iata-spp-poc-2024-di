import { http, HttpResponse } from 'msw';

const counters = { checkVerification: 0 };

export const handlers = [
  http.post('/api/public/verifications', async () => {
    return HttpResponse.json(
      {
        id: 'VERIFICATION_ID',
        url: 'openid4vp://?request_uri=https://host/jwts/key',
        state: 'REQUESTED',
      },
      { status: 201 }
    );
  }),

  http.get('/api/public/verifications/:id', async ({ params }) => {
    counters.checkVerification += 1;

    const { id } = params;

    if (id === 'throw-error') {
      return HttpResponse.json(null, { status: 500 });
    }

    return HttpResponse.json(
      {
        id: id,
        state: counters.checkVerification % 2 === 0 ? 'VERIFIED' : 'REQUESTED',
      },
      { status: 200 }
    );
  }),

  http.get('/api/public/configuration', async () => {
    return HttpResponse.json(
      {
        BOARD_WIFI: {
          type: 'board/wifi',
          issuer: 'Facephi',
          verifier: 'SICPA',
          wallet: 'Neoke',
        },
        WIFI: {
          type: 'wifi',
          issuer: 'Facephi',
          verifier: 'SICPA',
          wallet: 'Neoke',
        },
        LOUNGE: {
          type: 'lounge',
          issuer: 'Facephi',
          verifier: 'NEOKE',
          wallet: 'Neoke',
        },
      },
      { status: 200 }
    );
  }),
];

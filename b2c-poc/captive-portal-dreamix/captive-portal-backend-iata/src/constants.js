export const sessionStates = { REQUESTED: 'REQUESTED', VERIFIED: 'VERIFIED' };
export const verifiers = { SICPA: 'SICPA', NEOKE: 'NEOKE' };
export const wallets = { SICPA: 'Talao', NEOKE: 'NEOKE', FACEPHI: 'FACEPHI' };
export const issuers = { NEOKE: 'NEOKE', FACEPHI: 'FACEPHI' };
export const flows = {
  BOARD_WIFI: { type: 'board/wifi', issuer: issuers.FACEPHI, verifier: verifiers.SICPA, wallet: wallets.NEOKE },
  WIFI: { type: 'wifi', issuer: issuers.FACEPHI, verifier: verifiers.SICPA, wallet: wallets.NEOKE },
  LOUNGE: { type: 'lounge', issuer: issuers.FACEPHI, verifier: verifiers.NEOKE, wallet: wallets.NEOKE },
};

export const constants = { flows, verifiers, sessionStates };


// Example: [{id: uuid, ip: "192.168.1.2", referenceId:123, state: REQUESTED, createdAt: 1231237137123, expiresAt: 0123132123 }]
const sessions = [];

const getSessionById = (id) => {
  const session = sessions.find((s) => s.id === id);
  return session ? { ...session } : undefined;
};

const getSessionByIp = (ip) => {
  const session = sessions.find((s) => s.ip === ip);
  return session ? { ...session } : undefined;
};

const getSessionByReference = (referenceId) => {
  const session = sessions.find((s) => s.referenceId === referenceId);
  return session ? { ...session } : undefined;
};

const updateSession = (updatedSession) => {
  const index = sessions.findIndex((s) => s.id === updatedSession.id);
  if (index === -1) {
    return false;
  }
  sessions.splice(index, 1, updatedSession);
  return true;
};

const addSession = (session) => {
  sessions.push(session);
};
const getAllSessions = () => {
  return sessions;
};

export const sessionStore = {
  getSessionById,
  getSessionByIp,
  getSessionByReference,
  updateSession,
  addSession,
  getAllSessions,
};

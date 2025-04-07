const isWindow = () => typeof window !== 'undefined';

const isLocalStorageEnabled = () => isWindow() && window.localStorage;

const isSessionStorageEnabled = () => isWindow() && window.sessionStorage;

const getLocalStorageObject = (key) => {
  if (!isLocalStorageEnabled()) {
    return;
  }
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setLocalStorageObject = (key, value) => {
  if (!isLocalStorageEnabled()) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorageObject = (key) => {
  if (!isLocalStorageEnabled()) {
    return;
  }
  localStorage.removeItem(key);
};

const getSessionObject = (key) => {
  if (!isSessionStorageEnabled()) {
    return;
  }
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setSessionObject = (key, value) => {
  if (!isSessionStorageEnabled()) {
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(value));
};

const removeSessionObject = (key) => {
  if (!isSessionStorageEnabled()) {
    return;
  }
  sessionStorage.removeItem(key);
};

export const sessionStore = {
  getLocalStorageObject,
  setLocalStorageObject,
  removeLocalStorageObject,
};

export const localStore = {
  getSessionObject,
  setSessionObject,
  removeSessionObject,
};

export const store = { ...sessionStore, ...localStore };

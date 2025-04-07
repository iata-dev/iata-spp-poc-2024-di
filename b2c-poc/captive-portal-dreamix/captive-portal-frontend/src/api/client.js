export const createVerification = (flowType) => {
  return fetchWithError({
    endpoint: `/api/public/verifications`,
    method: 'POST',
    body: JSON.stringify({ flow: flowType }),
  });
};

export const getVerification = (id) => {
  return fetchWithError({
    endpoint: `/api/public/verifications/${id}`,
    method: 'GET',
  });
};

export const getConfiguration = () => {
  return fetchWithError({
    endpoint: `/api/public/configuration`,
    method: 'GET',
  })
}

const fetchWithError = async ({
  endpoint,
  credentials,
  method,
  body,
  headers = {},
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = BASE_URL ? `${BASE_URL}${endpoint}` : endpoint;
  const combinedHeaders = { 'Content-Type': 'application/json', ...headers };
  const res = await fetch(url, {
    method,
    credentials,
    headers: combinedHeaders,
    body,
  });
  if (!res.ok) {
    const errorDto = await res.json();
    const error = new Error(errorDto.message || 'Unknown error');
    console.error(
      `[${new Date().toISOString()}] Error while calling ${url}`,
      error
    );
    throw error;
  }
  const responseHeaders = {};
  res.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    headers: responseHeaders,
    body: await res.json(),
  };
};

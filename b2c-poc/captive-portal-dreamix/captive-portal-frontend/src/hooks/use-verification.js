import { useEffect, useRef, useState } from 'react';

import { getVerification } from '@/api/client.js';

export const useUserVerification = (verificationId, pollingInterval = 3000) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const intervalRef = useRef(null);

  const stopPolling = () => {
    setIsLoading(false);
    clearInterval(intervalRef.current);
  };

  const checkAccess = async () => {
    getVerification(verificationId)
      .then((response) => {
        if (response.body.state === 'VERIFIED') {
          setHasAccess(true);
          stopPolling();
        }
      })
      .catch((error) => {
        console.error('>>>>>>> error', error);
        setIsError(true);
        setErrorMessage('No access to wifi');
        stopPolling();
      });
  };

  useEffect(() => {
    intervalRef.current = setInterval(checkAccess, pollingInterval);
    return () => stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { hasAccess, isLoading, isError, errorMessage };
};

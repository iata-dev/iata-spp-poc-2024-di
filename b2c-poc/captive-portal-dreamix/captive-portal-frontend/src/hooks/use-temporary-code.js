import { useEffect, useState } from 'react';

export const useTemporaryCode = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generateTempCode = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCode('DUB-WDS');
    setErrorMessage('');
    setIsLoading(false);
    setIsError(false);
  };

  useEffect(() => {
    generateTempCode();
  }, []);

  return { code, isLoading, isError, errorMessage };
};

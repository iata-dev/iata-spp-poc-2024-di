import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const Timer = ({ duration, unit = 'm' }) => {
  const [remainingDuration, setRemainingDuration] = useState(duration);

  const tick = unit === 's' ? 1000 : 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingDuration <= 1) {
        clearInterval(interval);
      }
      setRemainingDuration((prev) => prev - 1);
    }, tick);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="text-primary font-semibold text-xl">
      {remainingDuration}
    </span>
  );
};

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  unit: PropTypes.string,
};
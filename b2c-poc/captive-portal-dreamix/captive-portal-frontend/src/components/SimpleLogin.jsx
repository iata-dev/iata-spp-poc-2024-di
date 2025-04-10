import PropTypes from 'prop-types';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const SimpleLogin = ({ className }) => {
  const [error, setError] = useState(false);

  const handleLogin = () => {
    setError('Invalid email');
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Input type="text" placeholder="First name" />
      <Input type="text" placeholder="Last name" />
      <Input type="text" placeholder="Passport number" />
      <Input type="text" placeholder="Nationality" />
      <Input type="email" placeholder="Email address" />

      {error && <div className="text-red-500">{error}</div>}
      <Button className="mt-2" onClick={handleLogin}>Log in</Button>
    </div>
  );
};
SimpleLogin.propTypes = {
  className: PropTypes.string,
};

export default SimpleLogin;

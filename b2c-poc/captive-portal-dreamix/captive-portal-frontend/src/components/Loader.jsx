import PropTypes from 'prop-types';

import { cn } from '@/lib/utils';

const Spinner = ({ className }) => {
  return (
    <div className={cn('mx-auto my-24', className)}>
      <div className="size-10 animate-spin rounded-full border-4 border-primary/10 border-t-primary" />
    </div>
  );
};
Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;

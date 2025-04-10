import PropTypes from 'prop-types';

import { cn } from '@/lib/utils';

export function Page({ className, children }) {
  return (
    <div
      className={cn(
        'grid min-h-[100svh] grid-rows-[auto_1fr_auto] bg-background pb-10',
        className
      )}
    >
      {children}
    </div>
  );
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

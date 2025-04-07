import { WalletIcon } from 'lucide-react';
import PropTypes from 'prop-types';

import { Button } from '@/components/ui/button';

const ConnectToWallet = ({ onClick, isLoading, title, disabled }) => {
  return (
    <Button
      className="w-full"
      variant="secondary"
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <div className="size-4 mr-1 animate-spin rounded-full border-2 border-white/10 border-t-white" />
      ) : (
        <WalletIcon />
      )}

      <div className="font-normal text-base leading-[1.25rem]">{title}</div>
    </Button>
  );
};

ConnectToWallet.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default ConnectToWallet;

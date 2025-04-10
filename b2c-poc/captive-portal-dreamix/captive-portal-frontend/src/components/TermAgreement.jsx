import PropTypes from 'prop-types';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const TermAgreement = ({ id, children, className, onChange }) => {
  const handleChange = (checked) => {
    onChange(checked);
  };

  return (
    <div className={cn('flex space-x-2', className)}>
      <Checkbox id={id} onCheckedChange={handleChange} />
      <label
        htmlFor={id}
        className="text-xs font-normal leading-[1rem] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
  );
};

TermAgreement.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TermAgreement;

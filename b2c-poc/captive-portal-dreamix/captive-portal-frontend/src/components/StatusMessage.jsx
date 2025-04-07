import PropTypes from 'prop-types';
import { createElement } from 'react';

import { CloudAirplane } from '@/assets/icons/CloudAirplane';
import { ICONS } from '@/assets/icons/Icons';
import { Lounge } from '@/assets/icons/Lounge';
import { NoLounge } from '@/assets/icons/NoLounge';
import { NoWifi } from '@/assets/icons/NoWifi';
import { Wifi } from '@/assets/icons/Wifi';
import { cn } from '@/lib/utils';

const iconMap = {
  [ICONS.WIFI]: Wifi,
  [ICONS.LOUNGE]: Lounge,
  [ICONS.NO_WIFI]: NoWifi,
  [ICONS.NO_LOUNGE]: NoLounge,
  [ICONS.CLOUD_AIRPLANE]: CloudAirplane,
};

const StatusMessage = ({ icon, title, description, className }) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col text-center justify-center items-center gap-2',
        className
      )}
    >
      <div className="p-4">{createElement(iconMap[icon])}</div>
      <h1 className="text-lg font-semibold leading-[1.25rem]">{title}</h1>
      <p className="text-sm font-light leading-[1.25rem] text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

StatusMessage.propTypes = {
  icon: PropTypes.oneOf(Object.keys(iconMap)).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};

export default StatusMessage;

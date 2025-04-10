import PropTypes from 'prop-types';
import { createElement } from 'react';

import Dish from '@/assets/icons/Dish';
import { FlyTicket } from '@/assets/icons/FlyTicket';
import { ICONS } from '@/assets/icons/Icons';
import { Sofa } from '@/assets/icons/Sofa';
import Timer from '@/assets/icons/Timer';
import WatchCharge from '@/assets/icons/WatchCharge';
import WifiSpeed from '@/assets/icons/WifiSpeed';
import { WifiUnlimited } from '@/assets/icons/WifiUnlimited';

const iconMap = {
  [ICONS.SOFA]: Sofa,
  [ICONS.WIFI_UNLIMITED]: WifiUnlimited,
  [ICONS.FLY_TICKET]: FlyTicket,
  [ICONS.TIMER]: Timer,
  [ICONS.DISH]: Dish,
  [ICONS.WIFI_SPEED]: WifiSpeed,
  [ICONS.WATCH_CHARGE]: WatchCharge,
};
const Services = ({ services }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-primary text-sm font-medium ">Available services</h3>
      <ul className="w-full flex flex-col items-start gap-2">
        {services.map((service, index) => (
          <li key={index} className="flex items-center gap-2">
            {createElement(iconMap[service.icon])}
            <p className="text-xs">{service.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
Services.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Services;

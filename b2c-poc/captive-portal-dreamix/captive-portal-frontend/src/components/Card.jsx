import PropTypes from 'prop-types';
import { createElement } from 'react';

import Dish from '@/assets/icons/Dish';
import Timer from '@/assets/icons/Timer';
import WatchCharge from '@/assets/icons/WatchCharge';
import WifiSpeed from '@/assets/icons/WifiSpeed';

export const ICONS = Object.freeze({
  timer: 'Timer',
  dish: 'Dish',
  wifiSpeed: 'WifiSpeed',
  watchCharge: 'WatchCharge',
});

const iconMap = {
  [ICONS.timer]: Timer,
  [ICONS.dish]: Dish,
  [ICONS.wifiSpeed]: WifiSpeed,
  [ICONS.watchCharge]: WatchCharge,
};

const Card = ({ title, description, icon }) => {
  return (
    <div className="flex gap-3 items-start bg-card p-3 rounded-[0.5rem]">
      {createElement(iconMap[icon])}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-md font-semibold leading-[1.25rem]">{title}</h3>
        <p className="text-sm font-normal leading-[1.25rem] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Card;

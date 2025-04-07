import PropTypes from 'prop-types';

import { Container } from '@/layout/Container';

const Banner = ({ title, description }) => {
  return (
    <Container className="sticky top-0 flex flex-col gap-2 bg-primary text-primary-foreground py-5 rounded-b-lg">
      <div className="flex justify-between items-center mb-3">
        <img
          src="/KronosAirlinesLogo.svg"
          alt="Kronos Airlines Logo"
          className="h-6"
        />
      </div>
      <h2 className="font-semibold text-[1.5rem] leading-[2rem]">{title}</h2>
      <p className="font-extralight text-xs leading-[1.25rem]">
        {description}
      </p>
    </Container>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Banner;

import PropTypes from 'prop-types';

const Separator = ({ text }) => {
  return text ? (
    <div className="my-2 flex items-center justify-center gap-3">
      <span className="border-t border-gray-300 flex-grow"></span>
      <span className="text-gray-400">{text}</span>
      <span className="border-t border-gray-300 flex-grow"></span>
    </div>
  ) : (
    <span className="border-t border-gray-300 flex-grow"></span>
  );
};

Separator.propTypes = {
  text: PropTypes.string,
};

export default Separator;

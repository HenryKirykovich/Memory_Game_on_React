import PropTypes from 'prop-types';

const InfoContainer = ({ moves, timer }) => {
  return (
    <div className="info-container">
      <p>Moves: {moves}</p>
      <p>Time: {timer}</p>
    </div>
  );
};

InfoContainer.propTypes = {
  moves: PropTypes.number.isRequired,
  timer: PropTypes.string.isRequired,
};

export default InfoContainer;

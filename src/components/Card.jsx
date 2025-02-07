import PropTypes from "prop-types";

const Card = ({ value, isFlipped, isMatched, onClick }) => {
  return (
    <div className={`item card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`} onClick={onClick}>
      {isFlipped || isMatched ? value : ""}
    </div>
  );
};

Card.propTypes = {
  value: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;

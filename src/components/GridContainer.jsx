import Card from "./Card";
import PropTypes from 'prop-types';

const GridContainer = ({ gridSize, cards, onCardClick }) => {
  return (
    <div className="grid-container" style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {cards.map((card, index) => (
        <Card key={index} value={card.value} isFlipped={card.isFlipped} isMatched={card.isMatched} onClick={() => onCardClick(index)} />
      ))}
    </div>
  );
};

GridContainer.propTypes = {
  gridSize: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    isMatched: PropTypes.bool.isRequired
  })).isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default GridContainer;




































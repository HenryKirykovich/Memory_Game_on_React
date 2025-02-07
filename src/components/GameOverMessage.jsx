import PropTypes from 'prop-types';

const GameOverMessage = ({ moves, timeElapsed, isGameOver }) => {
  if (!isGameOver) return null; // ✅ Prevents rendering before game is won

  return (
    <p className="game-over">
      Game Over! You won in {moves} moves and {timeElapsed} seconds!
    </p>
  );
};

GameOverMessage.propTypes = {
  moves: PropTypes.number.isRequired,
  timeElapsed: PropTypes.number.isRequired,
  isGameOver: PropTypes.bool.isRequired,
};

export default GameOverMessage;

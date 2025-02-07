import PropTypes from 'prop-types';

const ButtonContainer = ({ onStartGame, difficulty, setDifficulty }) => {
  return (
    <div className="button-container">
      <select value={difficulty} onChange={(e) => setDifficulty(parseInt(e.target.value))}>
        <option value={4}>Easy (4x4)</option>
        <option value={6}>Hard (6x6)</option>
      </select>
      <button onClick={onStartGame}>New Game</button>
    </div>
  );
};

ButtonContainer.propTypes = {
  onStartGame: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  setDifficulty: PropTypes.func.isRequired,
};

export default ButtonContainer;

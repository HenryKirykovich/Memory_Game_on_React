import PropTypes from 'prop-types';

const Instructions = () => {
  return (
    <>
      <div className="instructions-container">
        <h2>How to Play</h2>
        
        <ul>
            <li>Select a difficulty level: Easy (4x4) or Hard (6x6).</li>
            <li>Click &quot;New Game&quot; to start.</li>
            <li>Click on cards to flip them and reveal the symbol.</li>
            <li>Match two cards with the same symbol to keep them face-up.</li>
            <li>If the cards don’t match, they’ll flip back after a short delay.</li>
            <li>Try to match all the pairs in the fewest moves and fastest time!</li>
            <li>Enjoy sound effects as you play!</li>
        </ul>
      </div>
    </>
  );
};

Instructions.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Instructions;
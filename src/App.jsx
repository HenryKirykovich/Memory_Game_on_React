import { useState, useEffect } from "react";
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import ButtonContainer from "./components/ButtonContainer";
import InfoContainer from "./components/InfoContainer";
import GameOverMessage from "./components/GameOverMessage";
import GridContainer from "./components/GridContainer";

import flipSoundFile from "./sound/flip.mp3";
import mismatchSoundFile from "./sound/mismatch.mp3";
import winnerSoundFile from "./sound/winner.mp3";

const flipSound = new Audio(flipSoundFile);
const mismatchSound = new Audio(mismatchSoundFile);
const winnerSound = new Audio(winnerSoundFile);



const generateCardValues = (size) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // use string instead array more efficiency . using like array  "ABD[2]"
  const numPairs = (size * size) / 2;
  let values = Array.from({ length: numPairs }, (_, i) => alphabet[i]);   // Creates an array of numPairs length using Array.from(). The second parameter is a mapping function that assigns each index i a letter from alphabet.
  values = [...values, ...values].sort(() => Math.random() - 0.5);
  return values.map((value) => ({ value, isFlipped: false, isMatched: false })); // Each card has { value, isFlipped, isMatched }.
};

const App = () => {
  const [gridSize, setGridSize] = useState(4);  // Stores the grid size (default 4 means a 4x4 game).
  const [cards, setCards] = useState(generateCardValues(4));
  const [flippedCards, setFlippedCards] = useState([]); //Tracks which two cards are flipped.
  const [moves, setMoves] = useState(0); // counter
  const [timeElapsed, setTimeElapsed] = useState(0); // timer
  const [timer, setTimer] = useState(null);  // Tracks how many seconds the game has been running.
  const [isGameOver, setIsGameOver] = useState(false);  // true when all pairs are matched.Used to stop the game and show the final score.

  useEffect(() => {
    if (flippedCards.length === 2) {    // If two cards are flipped, waits 1 second (1000ms) and calls checkMatch().
      setTimeout(checkMatch, 1000); // 1 second
    }
  }, [flippedCards]); 

// starting game and restarting old adjustments
  const startNewGame = () => {
    setCards(generateCardValues(gridSize));
    setMoves(0);
    setFlippedCards([]);
    setIsGameOver(false);
    clearInterval(timer);
    setTimeElapsed(0);
    setTimer(setInterval(() => setTimeElapsed((prev) => prev + 1), 1000));
  };


  // checks if the two flipped cards match  
  const checkMatch = () => {
    const [first, second] = flippedCards;   // flippedCards stores the indexes of the two flipped cards.
   //  array destructuring, a JavaScript feature that allows extracting values from an array into separate variables
    if (cards[first].value === cards[second].value) {
      setCards((prevCards) =>
        prevCards.map((card, index) =>
          index === first || index === second ? { ...card, isMatched: true } : card
        )
      );
      winnerSound.play();
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === first || index === second ? { ...card, isFlipped: false } : card
          )
        );
        mismatchSound.play();
      }, 1000);
    }

    setFlippedCards([]);

    setTimeout(() => {
      if (cards.every((card) => card.isMatched)) {
        clearInterval(timer);
        setIsGameOver(true);
      }
    }, 500);
  };

  const flipCard = (index) => {
    if (flippedCards.length < 2 && !cards[index].isFlipped) {
      setCards((prevCards) =>
        prevCards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card))
      );
      setFlippedCards((prev) => [...prev, index]);
      setMoves((prev) => prev + 1);
      flipSound.play();
    }
  };

  return (
    <div className="flex-container">
      <Header />
      <Instructions />
      <ButtonContainer onStartGame={startNewGame} difficulty={gridSize} setDifficulty={setGridSize} />
      <InfoContainer moves={moves} timer={timeElapsed} />
      <GameOverMessage moves={moves} timeElapsed={timeElapsed} isGameOver={isGameOver} />
      <GridContainer gridSize={gridSize} cards={cards} onCardClick={flipCard} />
    </div>
  );
};

export default App;












































































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
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numPairs = (size * size) / 2;
  let values = Array.from({ length: numPairs }, (_, i) => alphabet[i]);
  values = [...values, ...values].sort(() => Math.random() - 0.5);
  return values.map((value) => ({ value, isFlipped: false, isMatched: false }));
};

const App = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState(generateCardValues(4));
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }, [flippedCards]);

  const startNewGame = () => {
    setCards(generateCardValues(gridSize));
    setMoves(0);
    setFlippedCards([]);
    setIsGameOver(false);
    clearInterval(timer);
    setTimeElapsed(0);
    setTimer(setInterval(() => setTimeElapsed((prev) => prev + 1), 1000));
  };

  const checkMatch = () => {
    const [first, second] = flippedCards;

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












































































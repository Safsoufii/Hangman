import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Alert,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import "./App.css";
import HangmanComponent from "./hanged";
import HintButton from "./HintButton";
import Scoreboard from "./Scoreboard";
import SoundButton from "./SoundButton";
import IncorrectGuesses from "./IncorrectGuesses";
import ParentComponent from "./ParentComponent";

const words = ["apple", "banana", "cherry", "durian", "elderberry", "fig"];

const Hangman = () => {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [hint, setHint] = useState(null);
  const [showHangman, setShowHangman] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleGuess = (letter) => {
    if (!gameOver) {
      if (word.includes(letter)) {
        setGuesses([...guesses, letter]);
      } else {
        setRemainingGuesses(remainingGuesses - 1);
      }
    }
  };

  const handleReset = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses([]);
    setRemainingGuesses(6);
    setGameOver(false);
    setHint(null);
    setShowHangman(false);
  };

  const displayWord = () => {
    return word
      .split("")
      .map((letter, index) => (
        <span key={index}>
          {guesses.includes(letter) ? letter : "_"}
        </span>
      ));
  };

  const displayHangman = () => {
    const numWrongGuesses = 6 - remainingGuesses;
    if (numWrongGuesses === 0) {
      return <HangmanComponent parts={0} />;
    } else if (numWrongGuesses === 1) {
      return <HangmanComponent parts={1} />;
    } else if (numWrongGuesses === 2) {
      return <HangmanComponent parts={2} />;
    } else if (numWrongGuesses === 3) {
      return <HangmanComponent parts={3} />;
    } else if (numWrongGuesses === 4) {
      return <HangmanComponent parts={4} />;
    } else if (numWrongGuesses === 5) {
      return <HangmanComponent parts={5} />;
    } else {
      return <HangmanComponent parts={6} />;
    }
  };

  const handleHelp = () => {
    alert(
      "The goal of the game is to guess a hidden word one letter at a time. If you guess a correct letter, it will be revealed in the word. If you guess an incorrect letter, you will lose one of your remaining guesses. If you run out of guesses, the game is over and you lose. Good luck!"
    );
  };

  const handleGameOver = () => {
    setShowHangman(true);
    setGameOver(true);
  };

  const handleSoundToggle = () => {
    setIsSoundOn(!isSoundOn);
  };

  const handleHint = () => {
    if (!gameOver) {
      const notGuessed = word.toLowerCase().split("").filter((letter) => !guesses.includes(letter));
      if (notGuessed.length > 0) {
        const randomIndex = Math.floor(Math.random() * notGuessed.length);
        setHint(notGuessed[randomIndex]);
      }
    }
  };
  
      
      const handleKeyPress = (event) => {
      if (!gameOver && event.keyCode >= 65 && event.keyCode <= 90) {
      const letter = event.key.toLowerCase();
      if (guesses.includes(letter) || !word.includes(letter)) {
      setRemainingGuesses(remainingGuesses - 1);
      } else {
      setGuesses([...guesses, letter]);
      }
      }
      };
      
      useEffect(() => {
      document.addEventListener("keydown", handleKeyPress);
      return () => {
      document.removeEventListener("keydown", handleKeyPress);
      };
      }, [word]);
      
      useEffect(() => {
      if (remainingGuesses === 0) {
      setGameOver(true);
      setShowHangman(true);
      }
      }, [remainingGuesses]);
      
      useEffect(() => {
      if (guesses.length === new Set(word).size) {
      setGameOver(true);
      setShowHangman(true);
      }
      }, [guesses]);
      
      return (
      <Container className="mt-5">
      <Row className="justify-content-md-center">
      <Col md={6}>
      <h1 className="text-center">Hangman</h1>
      <div className="d-flex justify-content-center align-items-center">
      {showHangman && displayHangman()}
      </div>
      <p className="text-center mb-0">{displayWord()}</p>
      <p className="text-center mb-3">
      Remaining guesses: {remainingGuesses}
      </p>
      <div className="d-flex justify-content-center align-items-center flex-column">
      {gameOver ? (
      <Alert variant="danger" className="text-center">
      <Scoreboard word={word} guesses={guesses} />
      <p className="mb-0">You lose! The word was "{word}".</p>
      <Button
                     variant="primary"
                     onClick={handleReset}
                     className="mt-3"
                   >
      Play again
      </Button>
      </Alert>
      ) : (
      <div>
      <Form>
      <Form.Group>
      <Form.Label>Guess a letter:</Form.Label>
      <Form.Control
      type="text"
      maxLength="1"
      onChange={(e) => handleGuess(e.target.value)}
      value=""
      />
      </Form.Group>
      <div className="d-flex justify-content-between align-items-center">
      <HintButton
                         handleHint={handleHint}
                         hint={hint}
                         remainingGuesses={remainingGuesses}
                       />
      <SoundButton
                         handleSoundToggle={handleSoundToggle}
                         isSoundOn={isSoundOn}
                       />
      <Button
                         variant="danger"
                         onClick={handleGameOver}
                         className="btn-danger"
                       >
      Give up
      </Button>
      <Button
                         variant="info"
                         onClick={handleHelp}
                         className="ml-3"
                       >
      How to play
      </Button>
      </div>
      </Form>
      <IncorrectGuesses guesses={guesses} word={word} />
      </div>
      )}
      <ParentComponent />
      </div>
      </Col>
      </Row>
      <Row className="justify-content-md-center">
      <Col md={6}>
      <ProgressBar
      now={remainingGuesses * 16.6667}
      label={`${remainingGuesses}/6 guesses`}
      />
      </Col>
      </Row>
      </Container>
      );
      };
      
      export default Hangman;

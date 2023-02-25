import React from "react";

const IncorrectGuesses = ({ guesses, word }) => {
  const incorrectGuesses = guesses.filter((letter) => !word.includes(letter));
  return (
    <div className="text-center mt-3">
      <p>Incorrect guesses: {incorrectGuesses.join(", ")}</p>
    </div>
  );
};

export default IncorrectGuesses;

import React from "react";

const HintButton = ({ hint, handleHint }) => {
  const handleClick = () => {
    handleHint();
  };

  return (
    <div>
      <button onClick={handleClick}>Need a hint?</button>
      {hint && <p>{hint}</p>}
    </div>
  );
};

export default HintButton;



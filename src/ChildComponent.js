import React from "react";

const ChildComponent = ({ player, state, updateState }) => {
  const handleButtonClick = () => {
    const newState = prompt(`Enter a new value for ${player}:`);
    if (newState) {
      updateState(newState);
    }
  };

  return (
    <div>
      <p>{player}: {state}</p>
      {player === "Player 1" && <button onClick={handleButtonClick}>Update State</button>}
    </div>
  );
};

export default ChildComponent;




  

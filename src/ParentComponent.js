import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const [player, setPlayer] = useState("Player 1");
  const [state1, setState1] = useState("initial state 1");
  const [state2, setState2] = useState("initial state 2");

  const updateState1 = (newState) => {
    setState1(newState);
  };

  const updateState2 = (newState) => {
    setState2(newState);
  };

  const handlePlayerChange = () => {
    setPlayer(player === "Player 1" ? "Player 2" : "Player 1");
  };

  return (
    <div>
      <h2>{player} - State {player === "Player 1" ? "1" : "2"}: {player === "Player 1" ? state1 : state2}</h2>
      <ChildComponent
        player={player}
        state={player === "Player 1" ? state1 : state2}
        updateState={player === "Player 1" ? updateState1 : updateState2}
      />
      <button onClick={handlePlayerChange}>Switch to {player === "Player 1" ? "Player 2" : "Player 1"}</button>
    </div>
  );
};

export default ParentComponent;


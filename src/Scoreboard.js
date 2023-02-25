import React from "react";

const Scoreboard = ({ wins, losses }) => {
  return (
    <div>
      <h2>Scoreboard</h2>
      <p>Wins: {wins}</p>
      <p>Losses: {losses}</p>
    </div>
  );
};

export default Scoreboard;

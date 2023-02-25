import React from "react";
import cheerSound from "./cheer.mp3";

const SoundButton = ({ onClick }) => {
  const handleButtonClick = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Play Sound</button>
      {cheerSound && <audio src={cheerSound} autoPlay />}
    </div>
  );
};

export default SoundButton;




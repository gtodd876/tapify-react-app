import React from 'react';
import './TapButton.css';

const TapButton = props => (
  <div className="click-me">
    <button
      className="tap-btn"
      onClick={() => props.tempoTouch()}
      onTouchStart={() => props.tempoTouch()}
    >
      Tap
    </button>
  </div>
);

export default TapButton;

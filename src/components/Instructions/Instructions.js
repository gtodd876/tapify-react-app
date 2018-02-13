import React from 'react';
import './Instructions.css';

const Instructions = () => (
  <div className="instruction-container">
    <div className="instructions">
      <h3 style={{ color: '#ffd1f5' }}>MOBILE</h3>
      <p align="left">Tap desired beat on the screen</p>
      <h3 style={{ color: '#ffd1f5' }}>DESKTOP</h3>
      <p>
        Tap out beat with the<span>spacebar</span>
      </p>
      <h3 style={{ color: '#ffd1f5' }}>RESET</h3>
      <p>
        <span>R</span> key to reset tempo & start over
      </p>
    </div>
  </div>
);
export default Instructions;

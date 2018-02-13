import React from 'react';
import './Instructions.css';

const Instructions = () => (
  <div className="instruction-container">
    <div className="instructions">
      <h3 style={{ color: '#ffd1f5' }}>MOBILE</h3>
      <p align="left">Tap out desired beat on the screen</p>
      <h3 style={{ color: '#ffd1f5' }}>DESKTOP</h3>
      <p style={{ margin: '0 0 0.3rem 0' }}>
        Tap out beat with the<span style={{ margin: '0 0 0 0.8rem' }}>spacebar</span>
      </p>
      <p>
        <span>R</span> key resets tempo to start over
      </p>
    </div>
  </div>
);
export default Instructions;

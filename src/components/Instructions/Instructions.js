import React, { Fragment } from 'react';
import './Instructions.css';

const Instructions = () => (
  <Fragment>
    <p className="instructions">
      Tap your desired beat on the screen, click with a mouse or with the<span>
        spacebar
      </span>
      to become a human metronome.
    </p>
    <p className="instructions">
      Press <span>r</span> key to reset tempo and start over
    </p>
  </Fragment>
);
export default Instructions;

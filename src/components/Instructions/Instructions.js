import React, { Fragment } from 'react';
import './Instructions.css';

const Instructions = () => (
  <Fragment>
    <p className="instructions">
      Tap your desired beat on the screen or with the<span>spacebar</span> to become a human metronome. Tapify will
      calculate the tempo of your taps in BPM. (Beats Per Minute)
    </p>
    <p className="instructions">
      Press <span>r</span> key to reset tempo and start over
    </p>

    <p className="instructions">
      After tempo is displayed, tap the submit button to fetch a playlist of songs at your tempo!
    </p>
  </Fragment>
);
export default Instructions;

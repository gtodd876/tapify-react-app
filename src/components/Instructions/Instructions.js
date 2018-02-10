import React, { Fragment } from 'react';
import './Instructions.css';

const Instructions = () => (
  <Fragment>
    <p className="instructions">
      Tap <span>spacebar</span> to calculate tempo and the <span>r</span> key to reset
    </p>;
    <p className="instructions">
      Press <span>enter</span> to lock in the tempo and a playlist will be created
    </p>;
  </Fragment>
);
export default Instructions;

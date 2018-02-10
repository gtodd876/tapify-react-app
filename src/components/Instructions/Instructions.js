import React, { Fragment } from 'react';
import './Instructions.css';

const Instructions = () => (
  <Fragment>
    <p className="instructions">Tap 'spacebar' to calculate tempo and the 'r' key to reset</p>;
    <p className="instructions">Press 'Enter' to lock in the tempo and a playlist will be created</p>;
  </Fragment>
);
export default Instructions;

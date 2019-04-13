import React from 'react';
import './TapButton.css';
import PropTypes from 'prop-types';

const TapButton = ({ tempoTouch }) => (
  <div className="click-me">
    <button className="tap-btn" onClick={() => tempoTouch()}>
      Tap
    </button>
  </div>
);

TapButton.propTypes = {
  tempoTouch: PropTypes.func
};

export default TapButton;

import React from 'react';
import './TapButton.css';
import PropTypes from 'prop-types';

const TapButton = ({ tempoTouch, tapButtonDown, tapButtonUp }) => (
  <div className="click-me">
    <button
      className="tap-btn"
      onClick={() => tempoTouch()}
      onMouseDown={e => tapButtonDown(e)}
      onMouseUp={e => tapButtonUp(e)}
    >
      Tap
    </button>
  </div>
);

TapButton.propTypes = {
  tempoTouch: PropTypes.func
};

export default TapButton;

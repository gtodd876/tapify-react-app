import React from 'react';
import './TryAgainButton.css';
import PropTypes from 'prop-types';

const TryAgainButton = ({ resetState }) => (
  <button
    onClick={() => {
      resetState();
    }}
    className="try-again"
    id="try-again-button"
  >
    Try It Out Again
  </button>
);

TryAgainButton.propTypes = {
  resetState: PropTypes.func
};

export default TryAgainButton;

import React from 'react';
import './TryAgainButton.css';

const TryAgainButton = props => (
  <button
    onClick={() => {
      props.resetState();
    }}
    className="try-again"
    id="try-again-button"
  >
    Try It Out Again
  </button>
);

export default TryAgainButton;

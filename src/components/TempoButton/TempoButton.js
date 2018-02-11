import React from 'react';
import './TempoButton.css';

const TempoButton = props => (
  <button onClick={() => props.submitTempo(props.tempo, props.token)} className="submit-tempo">
    Submit Tempo
  </button>
);

export default TempoButton;

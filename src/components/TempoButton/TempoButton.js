import React from 'react';
import './TempoButton.css';
import PropTypes from 'prop-types';

const TempoButton = ({ tempo, token, submitTempo }) => (
  <button onClick={() => submitTempo(tempo, token)} className="submit-tempo">
    Submit Tempo
  </button>
);

TempoButton.propTypes = {
  tempo: PropTypes.number,
  token: PropTypes.string,
  submitTempo: PropTypes.func
};

export default TempoButton;

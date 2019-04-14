import React from 'react';
import './BpmDisplay.css';
import PropTypes from 'prop-types';

const BpmDisplay = ({ tempo }) => <p className="bpm">{Math.floor(parseInt(tempo))} BPM</p>;

BpmDisplay.propTypes = {
  tempo: PropTypes.string
};

export default BpmDisplay;

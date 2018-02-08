import React from 'react';
import './BpmDisplay.css';

const BpmDisplay = props => <p className="bpm">{Math.floor(props.tempo)} BPM</p>;

export default BpmDisplay;

import React from 'react';
import './SpotifyButton.css';

const SpotifyButton = () => (
  <button
    onClick={() => (window.location = 'https://limitless-woodland-67549.herokuapp.com/login')}
    className="login"
    id="login-button"
  >
    Login to Spotify
  </button>
);

export default SpotifyButton;

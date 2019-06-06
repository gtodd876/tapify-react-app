import React from 'react';
import './SpotifyButton.css';

const SpotifyButton = () => (
  <button
    onClick={() => {
      window.location = window.location.href.includes('localhost')
        ? 'http://localhost:8888/login'
        : 'https://tapify.azurewebsites.net/login';
    }}
    className="login"
    id="login-button"
  >
    Login to Spotify
  </button>
);

export default SpotifyButton;

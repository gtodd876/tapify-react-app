import React from 'react';
import './SpotifyButton.css';

const SpotifyButton = () => (
  <button
    onClick={() => (window.location = process.env.BACKEND_URI || 'http://localhost:8888/login')}
    className="login"
    id="login-button"
  >
    Login to Spotify
  </button>
);

export default SpotifyButton;

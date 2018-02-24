import React from 'react';
import './SpotifyButton.css';

const SpotifyButton = () => (
  <button
    onClick={() => {
      window.location = window.location.href.includes('localhost')
        ? 'http://localhost:8888/login'
        : 'https://festive-yonath-bd0637.netlify.com';
    }}
    className="login"
    id="login-button"
  >
    Login to Spotify
  </button>
);

export default SpotifyButton;

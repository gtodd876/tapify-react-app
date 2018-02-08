import React from 'react';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import MdPlayCircleOutline from 'react-icons/lib/md/play-circle-outline';
import './Playlist.css';

const Playlist = () => (
  <div className="song-card">
    <FaAngleLeft className="arrow arrow-left" />
    <img className="album-cover" src={require('../../images/ln.jpg')} alt="local natives album cover" />
    <FaAngleRight className="arrow arrow-right" />
    <div className="description">
      <p>Local Natives - Hummingbird</p>
      <p>Bowery</p>
      <MdPlayCircleOutline className="play-btn" />
    </div>
  </div>
);

export default Playlist;

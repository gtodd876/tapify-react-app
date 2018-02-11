import React from 'react';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import MdPlayCircleOutline from 'react-icons/lib/md/play-circle-outline';
import './Playlist.css';

const Playlist = props => {
  return (
    <div className="song-card">
      <FaAngleLeft className="arrow arrow-left" onClick={() => props.decrementSong()} />
      <img className="album-cover" src={props.image} alt="local natives album cover" />
      <FaAngleRight className="arrow arrow-right" onClick={() => props.incrementSong()} />
      <div className="description">
        <p>
          {props.artist} - {props.album}
        </p>
        <p>{props.songTitle}</p>
        <MdPlayCircleOutline className="play-btn" />
      </div>
    </div>
  );
};

export default Playlist;

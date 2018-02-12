import React from 'react';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import MdPlayCircleOutline from 'react-icons/lib/md/play-circle-outline';
import MdPauseCircleOutline from 'react-icons/lib/md/pause-circle-outline';
import './Playlist.css';

const Playlist = props => {
  return (
    <div className="song-card">
      <img className="album-cover" src={props.image} alt="album cover" />
      <div className="description">
        <p>
          {props.artist} - {props.album}
        </p>
        <p>{props.songTitle}</p>
      </div>
      <FaAngleLeft className="arrow arrow-left" onClick={() => props.decrementSong()} />
      {!props.isPlaying ? (
        <MdPlayCircleOutline className="play-btn" onClick={() => props.playPreview()} />
      ) : (
        <MdPauseCircleOutline className="play-btn" onClick={() => props.playPreview()} />
      )}
      <FaAngleRight className="arrow arrow-right" onClick={() => props.incrementSong()} />
    </div>
  );
};

export default Playlist;

import React from 'react';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import MdPlayCircleOutline from 'react-icons/lib/md/play-circle-outline';
import MdPauseCircleOutline from 'react-icons/lib/md/pause-circle-outline';
import Pagination from '../Pagination/Pagination';
import './Playlist.css';
import PropTypes from 'prop-types';

const Playlist = props => {
  return (
    <div className="song-card">
      <img className="album-cover" src={props.image} alt="album cover" />
      <div className="description">
        <p>
          {props.artist} - {props.album.length <= 19 ? props.album : props.album.slice(0, 17) + '...'}
        </p>
        <p>{props.songTitle}</p>
      </div>
      <FaAngleLeft
        className={'arrow arrow-left' + (props.currentSongIndex === 0 ? ' disabled' : '')}
        onClick={() => props.decrementSong()}
      />
      {!props.isPlaying ? (
        <MdPlayCircleOutline
          className={'play-btn' + (props.songUrl === null ? ' disabled' : '')}
          onClick={() => props.playPreview()}
        />
      ) : (
        <MdPauseCircleOutline
          className={'play-btn' + (props.songUrl === null ? ' disabled' : '')}
          onClick={() => props.playPreview()}
        />
      )}
      <FaAngleRight
        className={'arrow arrow-right' + (props.currentSongIndex === props.playlist.length - 1 ? ' disabled' : '')}
        onClick={() => props.incrementSong()}
      />
      <br />
      {props.playlist.map((el, index) => {
        return <Pagination key={el.id} className={props.currentSongIndex === index ? ' active' : ''} />;
      })}
    </div>
  );
};

Playlist.propTypes = {
  album: PropTypes.string,
  artist: PropTypes.string,
  currentSongIndex: PropTypes.number,
  decrementSong: PropTypes.func,
  image: PropTypes.string,
  incrementSong: PropTypes.func,
  playlist: PropTypes.array,
  playPreview: PropTypes.func,
  songTitle: PropTypes.string,
  songUrl: PropTypes.string
};

export default Playlist;

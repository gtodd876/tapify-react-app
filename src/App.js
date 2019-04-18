import React, { useState, useEffect, useRef } from 'react';
import Title from './components/Title/Title';
import Instructions from './components/Instructions/Instructions';
import TapButton from './components/TapButton/TapButton';
import SpotifyButton from './components/SpotifyButton/SpotifyButton';
import TempoButton from './components/TempoButton/TempoButton';
import BpmDisplay from './components/BpmDisplay/BpmDisplay';
import Playlist from './components/Playlist/Playlist';
import NoSongPreview from './components/NoSongPreview/NoSongPreview';
import TryAgainButton from './components/TryAgainButton/TryAgainButton';
import queryString from 'query-string';
import './App.css';

function App() {
  const audioRef = useRef();

  const [accessToken, setAccessToken] = useState('');
  const [averageTempo, setAverageTempo] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [taps, setTaps] = useState([]);
  const [tempos, setTempos] = useState([]);
  const [tempoSubmitted, setTempoSubmitted] = useState(false);

  //ComponentDidMount
  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    setAccessToken(accessToken);
    if (accessToken) setLoggedIn(true);
    if (!tempoSubmitted) {
      document.body.addEventListener('keyup', tempoKeyup);
    }
  }, []);

  //playlist updated
  useEffect(() => {
    if (playlist.length > 0) {
      setCurrentSongUrl(playlist[currentSongIndex].preview_url);
    }
  }, [playlist, currentSongIndex]);

  const resetState = () => {
    setAverageTempo(0);
    setPlaylist([]);
    setCurrentSongIndex(0);
    setTempoSubmitted(false);
    setTempos([]);
    setTaps([]);
    setCurrentSongUrl(null);
    setIsPlaying(false);
  };

  const incrementSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const decrementSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const submitTempo = () => {
    fetch(
      `https://api.spotify.com/v1/recommendations?limit=7&market=US&seed_genres=electronic&target_tempo=${averageTempo}`,
      {
        headers: { Authorization: 'Bearer ' + accessToken }
      }
    )
      .then(res => res.json())
      .then(data => {
        setPlaylist(data.tracks);
        setTempoSubmitted(true);
      })
      .catch(e => {
        console.log(e);
        window.location = window.location.href.includes('localhost')
          ? 'http://localhost:3000'
          : 'https://wizardly-villani-b65c20.netlify.com';
      });
  };

  const tapButtonDown = e => {
    e.target.classList.add('tapped');
  };

  const tapButtonUp = e => {
    e.target.classList.remove('tapped');
  };

  const resetTempo = () => {
    setTempos([]);
    setTaps([]);
    setAverageTempo(0);
  };

  const calculateDelayTime = () => {
    if (tempos.length >= 2 && !tempoSubmitted) {
      setTaps([...taps, tempos[tempos.length - 1] - tempos[tempos.length - 2]]);
    }
  };

  const calculateAvgTempo = (keyCode = 32) => {
    if (taps.length >= 2 && keyCode !== 82 && !tempoSubmitted) {
      let average = taps.reduce((a, b) => a + b, 0) / taps.length;
      let bpm = (60000 / average).toFixed(2);
      setAverageTempo(bpm);
    }
  };

  const tempoKeyup = ({ keyCode }) => {
    if (keyCode === 82) {
      resetTempo();
    }
    if (keyCode === 32 && keyCode !== 82 && !tempoSubmitted) {
      setTempos([...tempos, new Date().getTime()]);
    }
    calculateDelayTime();
    calculateAvgTempo(keyCode);
  };

  const tempoTouch = () => {
    setTempos([...tempos, new Date().getTime()]);
    calculateDelayTime();
    calculateAvgTempo();
  };

  const playPreview = () => {
    if (!isPlaying && currentSongUrl !== null) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  return (
    <div className="App">
      {!loggedIn && <Title />}
      {!loggedIn && <SpotifyButton />}
      {loggedIn && !tempoSubmitted && <Instructions />}
      {loggedIn && !tempoSubmitted && (
        <TapButton tapButtonDown={tapButtonDown} tapButtonUp={tapButtonUp} tempoTouch={tempoTouch} />
      )}
      {averageTempo > 0 && averageTempo < 190 && <BpmDisplay tempo={averageTempo} />}
      {averageTempo > 0 && !tempoSubmitted && <TempoButton submitTempo={submitTempo} />}
      {playlist.length > 0 && (
        <Playlist
          image={playlist[currentSongIndex].album.images[1].url}
          artist={playlist[currentSongIndex].artists[0].name}
          album={playlist[currentSongIndex].album.name}
          songTitle={playlist[currentSongIndex].name}
          songUrl={currentSongUrl}
          playPreview={playPreview}
          incrementSong={incrementSong}
          decrementSong={decrementSong}
          isPlaying={isPlaying}
          currentSongIndex={currentSongIndex}
          playlist={playlist}
        />
      )}
      {currentSongUrl === null && tempoSubmitted && <NoSongPreview />}
      <br />
      {playlist.length > 0 && <TryAgainButton resetState={resetState} />}
      <audio
        ref={audioRef}
        src={currentSongUrl}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default App;

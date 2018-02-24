import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementSong = this.incrementSong.bind(this);
    this.decrementSong = this.decrementSong.bind(this);
    this.submitTempo = this.submitTempo.bind(this);
    this.tapTempo = this.tapTempo.bind(this);
    this.tempoKeyup = this.tempoKeyup.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.resetState = this.resetState.bind(this);
    this.resetTempo = this.resetState.bind(this);
    this.calculateDelayTime = this.calculateDelayTime.bind(this);
    this.calculateAvgTempo = this.calculateAvgTempo.bind(this);
    this.tempoTouch = this.tempoTouch.bind(this);
  }
  state = {
    accessToken: '',
    loggedIn: false,
    averageTempo: 0,
    playlist: [],
    currentSongIndex: 0,
    tempoSubmitted: false,
    tempos: [],
    taps: [],
    currentSongUrl: null,
    isPlaying: false,
  };

  resetState() {
    this.setState({
      averageTempo: 0,
      playlist: [],
      currentSongIndex: 0,
      tempoSubmitted: false,
      tempos: [],
      taps: [],
      currentSongUrl: null,
      isPlaying: false,
    });
  }

  componentDidMount() {
    this.tapTempo();
  }

  incrementSong() {
    this.audioRef.pause();
    this.setState({ isPlaying: false });
    if (this.state.currentSongIndex < this.state.playlist.length - 1) {
      this.setState(
        {
          currentSongIndex: this.state.currentSongIndex + 1,
        },
        () => {
          this.setState({
            currentSongUrl: this.state.playlist[this.state.currentSongIndex].preview_url,
          });
        }
      );
    }
  }

  decrementSong() {
    this.audioRef.pause();
    this.setState({ isPlaying: false });
    if (this.state.currentSongIndex > 0) {
      this.setState({ currentSongIndex: this.state.currentSongIndex - 1 }, () => {
        this.setState({
          currentSongUrl: this.state.playlist[this.state.currentSongIndex].preview_url,
        });
      });
    }
  }

  submitTempo() {
    fetch(
      `https://api.spotify.com/v1/recommendations?limit=7&market=US&seed_genres=electronic&target_tempo=${
        this.state.averageTempo
      }`,
      {
        headers: { Authorization: 'Bearer ' + this.state.accessToken },
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ playlist: data.tracks }, () => {
          this.setState({
            currentSongUrl: this.state.playlist[this.state.currentSongIndex].preview_url,
          });
        });
        this.setState({ tempoSubmitted: true });
      })
      .catch(e => {
        window.location = window.location.href.includes('localhost')
          ? 'http://localhost:3000'
          : 'https://wizardly-villani-b65c20.netlify.com';
      });
  }

  tapButtonBlink() {
    if (document.querySelector('.tap-btn')) {
      document.querySelector('.tap-btn').classList.toggle('tapped');
    }
    setTimeout(() => {
      if (document.querySelector('.tap-btn')) {
        document.querySelector('.tap-btn').classList.toggle('tapped');
      }
    }, 125);
  }

  resetTempo() {
    this.setState({ tempos: [] });
    this.setState({ taps: [] });
    this.setState({ averageTempo: 0 });
  }

  calculateDelayTime() {
    if (this.state.tempos.length >= 2 && !this.state.tempoSubmitted) {
      this.setState({
        taps: [
          ...this.state.taps,
          this.state.tempos[this.state.tempos.length - 1] - this.state.tempos[this.state.tempos.length - 2],
        ],
      });
    }
  }

  calculateAvgTempo(keyCode = 32) {
    if (this.state.taps.length >= 2 && keyCode !== 82 && !this.state.tempoSubmitted) {
      let average = this.state.taps.reduce((a, b) => a + b, 0) / this.state.taps.length;
      let bpm = (60000 / average).toFixed(2);
      this.setState({ averageTempo: bpm });
    }
  }

  tempoKeyup({ keyCode }) {
    if (keyCode === 82) {
      this.resetTempo();
    }
    if (keyCode === 32 && keyCode !== 82 && !this.state.tempoSubmitted) {
      this.setState({ tempos: [...this.state.tempos, new Date().getTime()] });
      this.tapButtonBlink();
    }
    this.calculateDelayTime();
    this.calculateAvgTempo(keyCode);
  }

  tempoTouch() {
    this.setState({ tempos: [...this.state.tempos, new Date().getTime()] });
    this.tapButtonBlink();
    this.calculateDelayTime();
    this.calculateAvgTempo();
  }

  tapTempo() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    this.setState({ accessToken });
    if (accessToken) this.setState({ loggedIn: true });
    if (!this.state.tempoSubmitted) {
      document.body.addEventListener('keyup', this.tempoKeyup);
    }
  }

  playPreview() {
    if (!this.state.isPlaying && this.state.currentSongUrl !== null) {
      this.setState({ isPlaying: true });
      this.audioRef.play();
    } else {
      this.setState({ isPlaying: false });
      this.audioRef.pause();
    }
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && <Title />}
        {!this.state.loggedIn && <SpotifyButton />}
        {this.state.loggedIn && !this.state.tempoSubmitted && <Instructions />}
        {this.state.loggedIn && !this.state.tempoSubmitted && <TapButton tempoTouch={this.tempoTouch} />}
        {this.state.averageTempo > 0 && this.state.averageTempo < 190 && <BpmDisplay tempo={this.state.averageTempo} />}
        {this.state.averageTempo > 0 && !this.state.tempoSubmitted && <TempoButton submitTempo={this.submitTempo} />}
        {this.state.playlist.length > 0 && (
          <Playlist
            image={this.state.playlist[this.state.currentSongIndex].album.images[1].url}
            artist={this.state.playlist[this.state.currentSongIndex].artists[0].name}
            album={this.state.playlist[this.state.currentSongIndex].album.name}
            songTitle={this.state.playlist[this.state.currentSongIndex].name}
            songUrl={this.state.currentSongUrl}
            playPreview={this.playPreview}
            incrementSong={this.incrementSong}
            decrementSong={this.decrementSong}
            isPlaying={this.state.isPlaying}
            currentSongIndex={this.state.currentSongIndex}
            playlist={this.state.playlist}
          />
        )}
        {this.state.currentSongUrl === null && this.state.tempoSubmitted && <NoSongPreview />}
        <br />
        {this.state.playlist.length > 0 && <TryAgainButton resetState={this.resetState} />}
        <audio
          ref={input => {
            this.audioRef = input;
          }}
          src={this.state.currentSongUrl}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}

export default App;

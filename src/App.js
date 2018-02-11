import React, { Component } from 'react';
import Title from './components/Title/Title';
import Instructions from './components/Instructions/Instructions';
import SpotifyButton from './components/SpotifyButton/SpotifyButton';
import TempoButton from './components/TempoButton/TempoButton';
import BpmDisplay from './components/BpmDisplay/BpmDisplay';
import Playlist from './components/Playlist/Playlist';
import queryString from 'query-string';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementSong = this.incrementSong.bind(this);
    this.decrementSong = this.decrementSong.bind(this);
    this.submitTempo = this.submitTempo.bind(this);
    this.tapTempo = this.tapTempo.bind(this);
    this.tempoLogic = this.tempoLogic.bind(this);
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
  };

  incrementSong() {
    if (this.state.currentSongIndex < this.state.playlist.length - 1) {
      this.setState({ currentSongIndex: this.state.currentSongIndex + 1 });
    }
  }

  decrementSong() {
    if (this.state.currentSongIndex > 0) {
      this.setState({ currentSongIndex: this.state.currentSongIndex - 1 });
    }
  }

  submitTempo() {
    console.log('submitted');
    fetch(
      `https://api.spotify.com/v1/recommendations?limit=4&market=US&seed_genres=electronic&target_tempo=${
        this.state.averageTempo
      }`,
      {
        headers: { Authorization: 'Bearer ' + this.state.accessToken },
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ playlist: data.tracks });
        this.setState({ tempoSubmitted: true });
      });
  }

  tempoLogic(e) {
    console.log(e.type);
    //reset tempo
    if (e.keyCode === 82) {
      this.setState({ tempos: [] });
      this.setState({ taps: [] });
      this.setState({ averageTempo: 0 });
    }
    //calculate tempo
    if ((e.keyCode === 32 && e.keyCode !== 82) || e.type === 'touchstart') {
      this.setState({ tempos: [...this.state.tempos, new Date().getTime()] });
    }
    if (this.state.tempos.length >= 2) {
      this.setState({
        taps: [
          ...this.state.taps,
          this.state.tempos[this.state.tempos.length - 1] - this.state.tempos[this.state.tempos.length - 2],
        ],
      });
    }
    if (this.state.taps.length >= 2 && e.keyCode !== 82) {
      let average = this.state.taps.reduce((a, b) => a + b, 0) / this.state.taps.length;
      let bpm = (60000 / average).toFixed(2);
      this.setState({ averageTempo: bpm });
    }
  }

  tapTempo() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    this.setState({ accessToken });
    if (accessToken) this.setState({ loggedIn: true });
    document.body.addEventListener('keyup', this.tempoLogic, false);
    window.addEventListener('touchstart', this.tempoLogic, false);
  }

  componentDidMount() {
    this.tapTempo();
  }

  render() {
    return (
      <div className="App">
        <Title />
        {!this.state.loggedIn && <SpotifyButton />}
        {this.state.loggedIn && !this.state.tempoSubmitted && <Instructions />}
        {this.state.averageTempo > 0 && !this.state.tempoSubmitted && <BpmDisplay tempo={this.state.averageTempo} />}
        {this.state.averageTempo > 0 && !this.state.tempoSubmitted && <TempoButton submitTempo={this.submitTempo} />}
        {this.state.playlist.length > 0 && (
          <Playlist
            image={this.state.playlist[this.state.currentSongIndex].album.images[1].url}
            artist={this.state.playlist[this.state.currentSongIndex].artists[0].name}
            album={this.state.playlist[this.state.currentSongIndex].album.name}
            songTitle={this.state.playlist[this.state.currentSongIndex].name}
            incrementSong={this.incrementSong}
            decrementSong={this.decrementSong}
          />
        )}
      </div>
    );
  }
}

export default App;

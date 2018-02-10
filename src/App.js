import React, { Component } from 'react';
import Title from './components/Title/Title';
import Instructions from './components/Instructions/Instructions';
import SpotifyButton from './components/SpotifyButton/SpotifyButton';
import BpmDisplay from './components/BpmDisplay/BpmDisplay';
import Playlist from './components/Playlist/Playlist';
import queryString from 'query-string';
// import Script from 'react-load-script';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementSong = this.incrementSong.bind(this);
    this.decrementSong = this.decrementSong.bind(this);
  }
  state = {
    accessToken: '',
    loggedIn: false,
    averageTempo: 0,
    playlist: [],
    currentSongIndex: 0,
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
  // initializePlayer() {
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     // You can now initialize Spotify.Player and use the SDK
  //     const token = this.state.accessToken;
  //     const player = new Spotify.Player({
  //       name: 'Web Playback SDK Quick Start Player',
  //       getOAuthToken: cb => {
  //         cb(token);
  //       },
  //     });

  //     // Error handling
  //     player.on('initialization_error', e => {
  //       console.error(e);
  //     });
  //     player.on('authentication_error', e => {
  //       console.error(e);
  //     });
  //     player.on('account_error', e => {
  //       console.error(e);
  //     });
  //     player.on('playback_error', e => {
  //       console.error(e);
  //     });

  //     // Playback status updates
  //     player.on('player_state_changed', state => {
  //       console.log(state);
  //     });

  //     // Ready
  //     player.on('ready', data => {
  //       let { device_id } = data;
  //       console.log('Ready with Device ID', device_id);
  //     });

  //     // Connect to the player!
  //     player.connect();

  //     player.getCurrentState().then(state => {
  //       if (state) {
  //         let { current_track, next_tracks } = state.track_window;

  //         console.log('Currently Playing', current_track);
  //         console.log('Playing Next', next_tracks[0]);
  //       } else {
  //         console.error('The user is not playing music through the Web Playback SDK');
  //       }
  //     });

  //     document.querySelector('play-btn').addEventListener('click', () => {
  //       player.togglePlay().then(() => {
  //         console.log('Toggled playback!');
  //       });
  //     });
  //   };
  // }

  tapTempo() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    this.setState({ accessToken });
    if (accessToken) this.setState({ loggedIn: true });
    let tempo = [];
    let taps = [];
    document.body.addEventListener('keydown', e => {
      //reset tempo
      if (e.keyCode === 82) {
        tempo = [];
        taps = [];
        this.setState({ averageTempo: 0 });
      }
      //calculate tempo
      if (e.keyCode === 32 && e.keyCode !== 82) {
        tempo.push(new Date().getTime());
      }
      if (tempo.length >= 2) {
        taps.push(tempo[tempo.length - 1] - tempo[tempo.length - 2]);
      }
      if (taps.length >= 2 && e.keyCode !== 82) {
        let average = taps.reduce((a, b) => a + b, 0) / taps.length;
        let bpm = (60000 / average).toFixed(2);
        this.setState({ averageTempo: bpm });
      }
      if (this.state.averageTempo > 0 && e.keyCode === 13) {
        fetch(
          `https://api.spotify.com/v1/recommendations?limit=4&market=US&seed_genres=electronic&target_tempo=${
            this.state.averageTempo
          }`,
          {
            headers: { Authorization: 'Bearer ' + accessToken },
          }
        )
          .then(res => res.json())
          .then(data => {
            this.setState({ playlist: data.tracks });
            // this.initializePlayer();
          });
      }
    });
  }

  componentDidMount() {
    this.tapTempo();
  }

  render() {
    return (
      <div className="App">
        <Title />
        <Instructions />
        {!this.state.loggedIn && <SpotifyButton />}
        {this.state.averageTempo > 0 && <BpmDisplay tempo={this.state.averageTempo} />}
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

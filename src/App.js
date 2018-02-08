import React, { Component, Fragment } from 'react';
import './App.css';

const Title = () => {
  const style = {
    fontSize: '3.5rem',
    color: 'white',
    letterSpacing: '0.2rem',
  };
  return (
    <Fragment>
      <h1 style={style}>Tapify</h1>
    </Fragment>
  );
};

const Instructions = () => (
  <Fragment>
    <p style={{ color: 'white' }}>Tap the 'spacebar' to calculate tempo and 'r' to reset</p>
  </Fragment>
);

const BpmDisplay = props => {
  const style = {
    fontSize: '3rem',
    color: 'white',
  };
  return (
    <Fragment>
      <p style={style}>{Math.floor(props.tempo)} BPM</p>
    </Fragment>
  );
};

const SpotifyLogin = () => {
  const style = {
    color: '#fff',
    backgroundColor: '#1db954',
    border: '1px solid transparent',
    borderRadius: '500px',
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '2px',
    margin: '30px 0',
    padding: '20px 56px',
    textDecoration: 'none',
    transitionDuration: '0.3s',
    transitionProperty: 'background-color',
    textTransform: 'uppercase',
  };

  // const btnHover = {
  //   backgroundColor: '#1ed760',
  //   cursor: 'pointer'
  // }

  return (
    <Fragment>
      <button id="login-button" style={style} href="#">
        Login to Spotify
      </button>
    </Fragment>
  );
};

class App extends Component {
  state = {
    averageTempo: 0,
  };
  componentDidMount() {
    let tempo = [];
    let taps = [];
    document.body.addEventListener('keydown', e => {
      //reset tempo
      if (e.keyCode === 82) {
        console.log('r');
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
    });
  }
  render() {
    return (
      <div className="App">
        <Title />
        <Instructions />
        <SpotifyLogin />
        {this.state.averageTempo > 0 && <BpmDisplay tempo={this.state.averageTempo} />}
      </div>
    );
  }
}

export default App;

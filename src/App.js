import React, { Component } from 'react';
import Title from './components/Title/Title';
import Instructions from './components/Instructions/Instructions';
import SpotifyButton from './components/SpotifyButton/SpotifyButton';
import BpmDisplay from './components/BpmDisplay/BpmDisplay';
import './App.css';

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
        <SpotifyButton />
        {this.state.averageTempo > 0 && <BpmDisplay tempo={this.state.averageTempo} />}
      </div>
    );
  }
}

export default App;

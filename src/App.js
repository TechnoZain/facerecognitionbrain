import { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" type="cobweb" bg={true} num={150} className="particles" />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;

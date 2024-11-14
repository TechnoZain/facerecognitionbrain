import { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = '8ac2dae10d45414e8e63cfbb77331f3f';

  const USER_ID = 'clarifai';       
  const APP_ID = 'main';
  
     
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                    // "base64": IMAGE_BYTES_STRING
                }
            }
        }
    ]
});

  const requestOptions = {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;

  }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105'; 
    
    this.setState({imageUrl: this.state.input});

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response =>  response.json())
    .then(result => {
      this.displayFaceBox(this.calculateFaceLocation(result));
    })
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </>
          : (
            route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )   
        }
        <ParticlesBg color="#ffffff" type="cobweb" bg={true} num={180} className="particles" />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const API_URL = "https://powerful-forest-42308.herokuapp.com";
//const API_URL = "http://localhost:3000";

const particlesOptions =  
{
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
    
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  signedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  
  constructor() {
    super();
    this.state = initialState;
  }
  
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }
  
  calculateFacesLocation = (data) => {
    //const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    const regions = data.outputs[0].data.regions;
    return regions.map(region => {
      const boundingBox = region.region_info.bounding_box;
      return {
        left: boundingBox.left_col * width,
        top: boundingBox.top_row * height,
        right: width - (boundingBox.right_col * width),
        bottom: height - (boundingBox.bottom_row * height)
      }
    });
  }
  
  displayBoundingBox = (boxes) => {
    this.setState({ boxes });    
  }
  
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  
  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(`${API_URL}/imageurl`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch(`${API_URL}/image`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState(
            Object.assign(this.state.user, {
              entries: count
            }));
          })
          .catch(console.log)
        }
        return this.displayBoundingBox(this.calculateFacesLocation(response));
      })
      .catch(console.log);
    }
    
  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({signedIn: true});
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  }
    
  render() {
    const { signedIn, imageUrl, boxes, route } = this.state;

    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation signedIn={signedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
        ? 
        <div>
          <Logo />
          <Rank 
            name={this.state.user.name} 
            entries={this.state.user.entries} />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onPictureSubmit={this.onPictureSubmit} />
          <FaceRecognition 
            boxes={boxes}
            imageUrl={imageUrl}/>
        </div>
        : (
          route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
  }

}
  
export default App;
    
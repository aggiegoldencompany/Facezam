import React, { Component } from 'react';
import Webcam from "react-webcam";
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.css';

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

class App extends Component {

  state = {
    data: null,
    refresh: false,
    answerReady: false,
    loading: false,
    buttonText: "Start Recording"
  };
  setRef = webcam => {
    this.webcam = webcam;
  };

  componentDidMount() {
    if(this.state.loading === true) {
      this.capture();
    }
  }

  callBackendAPI(imageSrc) {
    return new Promise((resolve, reject) => {
      let blob = dataURItoBlob(imageSrc);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `https://facezam.onrender.com/analyze`, true);
      xhr.onerror = function() {reject(xhr.responseText);};
      xhr.onload = function(e) {
        if (this.readyState === 4) {
          let response = JSON.parse(e.target.responseText);
          resolve(`${response['result']}`);
        }
      };

      let fileData = new FormData();
      fileData.append('file', blob);
      xhr.send(fileData);
    })
  }

  capture = () => {

    const imageSrc = this.webcam.getScreenshot();
    this.callBackendAPI(imageSrc)
        .then(res => {
          this.setState({
            emotion: res
          });
          console.log(res);
          this.state.loading && this.capture();
        })
        .catch((err) => {
          console.log(err);
          this.state.loading && this.capture();
        });
  };

  buttonPress = () => {
    if(this.state.loading === false) {
      this.setState({
        loading: true,
        buttonText: "Stop Recording"
      });
      this.capture();
    }
    else this.setState({
      loading: false,
      buttonText: "Start Recording"
    });
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (
      <div className="App">
        <AppAppBar emotion = {this.state.emotion}/>
        <Webcam
            audio={false}
            height={window.innerHeight-70}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={window.innerWidth}
            videoConstraints={videoConstraints} />
        {this.state.loading? <LinearProgress/>: ''}
        <AppFooter predict={this.buttonPress.bind(this)} text = {this.state.buttonText}/>
      </div>
    );
  }
}

export default App;

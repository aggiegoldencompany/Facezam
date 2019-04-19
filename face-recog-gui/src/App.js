import React, { Component } from 'react';
import Webcam from "react-webcam";
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
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
  console.log(ia);

  return new Blob([ia], {type:mimeString});
}

class App extends Component {
  state = {
    data: null,
    refresh: false,
    answerReady: false
  };
  setRef = webcam => {
    this.webcam = webcam;
  };

  callBackendAPI(imageSrc) {
    return new Promise((resolve, reject) => {
      let blob = dataURItoBlob(imageSrc);
      let xhr = new XMLHttpRequest();
      let loc = window.location;
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'download.jpeg';
      a.click();
      window.URL.revokeObjectURL(url);
      xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
      xhr.onerror = function() {reject(xhr.responseText);}
      xhr.onload = function(e) {
        if (this.readyState === 4) {
          let response = JSON.parse(e.target.responseText);
          resolve(`Result = ${response['result']}`);
        }
      };

      let fileData = new FormData();
      fileData.append('file', blob);
      xhr.send(fileData);
    })
  }

  capture = () => {
    this.setState({loading: true});
    const imageSrc = this.webcam.getScreenshot();
    this.callBackendAPI(imageSrc)
        .then(res => {
          this.setState({ data: res, answerReady: true, loading: false })
        })
        .catch(err => console.log(err));
  };
  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (
      <div className="App">
        <AppAppBar/>
        <Webcam
            audio={false}
            height={window.innerHeight-70}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={window.innerWidth}
            videoConstraints={videoConstraints} />
        {this.state.loading? <LinearProgress/>: ''}
        <AppFooter predict={this.capture.bind(this)}/>
      </div>
    );
  }
}

export default App;

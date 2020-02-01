import React, { Component } from 'react';
import FormDialog from './Forms/InputForm'
import './App.css';
import UploadButtons from './Buttons/UploadButton';



class App extends Component {
  constructor(){
    super();
    this.state = {
      input:''
    }
  }
  render(){
  return (
    <div className="App">
    <br/>
      <UploadButtons
        onInputChange={this.onInputChange}
      />
    </div>
  );
  }
   onInputChange = event => {
    this.setState({ input: event.target.value });
    fetch("http://localhost:5000/topsongs", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 123,
        path:"../jenna.json",
        year:2020
      })
    })
    .then(response => response.json())
    .then(data=>{console.log(data)})
  };
}



export default App;

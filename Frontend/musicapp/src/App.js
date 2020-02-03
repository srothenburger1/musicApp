import React, { Component } from 'react';
import './App.css';
import { SwipeableTemporaryDrawer } from "./Drawers/SwipeableDrawer";
import axios from 'axios';


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: null,
      file: null
    }
  }
  render(){
  return (
    <div className="App">
    <br/>
    <SwipeableTemporaryDrawer
      onInputChange = {this.onInputChange}
    />
    <br/>
      {this.state.input != null?this.state.input.map((item,index)=>{
        return(<div><p>{item[0]}</p><p>{item[1]}</p><p>{item[2]}</p></div>)
        }
        ):<div>No Data Uploaded</div>
        }
    </div>
  );
  }

  readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    })
  }
  onInputChange = event => {
    let data = event.target.files[0];
    var formData = new FormData();
    formData.append("id", "123");
    formData.append("year", "2020");
    formData.append("path", data);    
    
    // fetch("http://localhost:5000/upload", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(
    //     {
    //       id:"123",
    //       path:json,
    //       year:"2020"

    console.log(...formData)
     axios.post("http://localhost:5000/upload", formData, { // receive two parameter endpoint url ,form data 
    })
    .then(res => { // then print response status
      console.log("response",res)
    })
    
    // .then(response => response.json())
    // .then(data=>{this.setState({ input: data }); })
    
  };

}



export default App;

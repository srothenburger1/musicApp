import React, { Component } from 'react';
import './App.css';
import UploadButtons from './Buttons/UploadButton';
import { SwipeableTemporaryDrawer } from "./Drawers/SwipeableDrawer";


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: null
    }
  }
  render(){
  return (
    <div className="App">
    <br/>
    <SwipeableTemporaryDrawer/>
    <br/>
      <UploadButtons
        onInputChange={this.onInputChange}
      />
      {this.state.input != null?this.state.input.map((item,index)=>{
        return(<div><p>{item[0]}</p><p>{item[1]}</p><p>{item[2]}</p></div>)
        }
        ):<div>No</div>
        }
    </div>
  );
  }
   onInputChange = event => {
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
    .then(data=>{this.setState({ input: data }); })
    
  };

}



export default App;

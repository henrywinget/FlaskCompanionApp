import React, { Component } from 'react';

import NavBar from "./components/NavBar";
import Party from "./components/Party";

import API from "./utils/API";

import './App.css';

class App extends Component {
  state = {
    characters: []
  };
  
  componentDidMount() {
    this.getAllCharacters();
  }
  
  // gets all of our DnD characters (nice)
  getAllCharacters = () => {
    API.doGet("/all_characters", data => {
      this.setState({ characters: data })
    })
  };
  
  postNewCharacter = (character, cb) => {
    API.doPost("/create_character", character, data => {
      if(data) {
        cb();
        this.getAllCharacters();
      }
    })
  };
  
  deleteCharacter = id => {
    if(window.confirm('Are you sure you want to delete this character? This is a permanent action!')) {
      API.doDelete("/delete_character/" + id, null, () => {
        this.getAllCharacters();
      })
    }
  };
  
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Party postNewCharacter={this.postNewCharacter}
               deleteCharacter={this.deleteCharacter}
               characters={this.state.characters}/>
      </div>
    );
  }
}

export default App;

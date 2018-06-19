import React, { Component } from 'react';
import './App.css';

import Map from './Components/Map';
import ClassesContext from './ClassesContext';

import classes from './classes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes
    }

    document.title = "Editor - SvgVisualizer";
  }

  render() {
    const { classes } = this.state;

    return (
      <div className="App">
        <ClassesContext.Provider value={classes}>
          <Map />
        </ClassesContext.Provider>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import ClassesContext from '../../ClassesContext';

import ObjectMap from './ObjectMap';
import './ObjectMap.css';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="container">
        <ClassesContext.Consumer>
          {( classes ) => (
            <ObjectMap classes={classes}/>
          )}
        </ClassesContext.Consumer>
      </div>
    );
  }
}

export default Map;

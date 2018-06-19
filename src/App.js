import React, { Component } from 'react';
import './App.css';

import Svg from './Components/Svg';

import classes from './classes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes
    }
  }

  render() {
    const { classes } = this.state;

    let i = 0;
    return (
      <div className="App">
        <Svg>
          { !!classes && classes.map(classObject => {
            const props = {cx: i * 200 + 100, cy: 100, rx: 20, ry: 20, stroke: "#66d9ef", strokeWidth: 0, fill: "#66d9ef"}

            let j = 0;
            let classCircle = <ellipse 
              className="interactive" 
              key={i} {...props} 
              onClick={() => console.log('click')} />;

            let methodCircles = classObject.methods.map( methodObject => {
              const props = {cx: i * 200 + 150, cy: j * 50 + 150, rx: 15, ry: 15, stroke: "cyan", strokeWidth: 0, fill: "#a6e22e"}
              let methodCircle = <ellipse 
                className="interactive"
                key={i + '-' + j} 
                onClick={() => console.log('click')}
                {...props} />
              j ++;
              return methodCircle;
            });

            i ++; 
            return [classCircle, ...methodCircles];
          })}
        </Svg>
      </div>
    );
  }
}

export default App;

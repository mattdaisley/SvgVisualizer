import React, { Component } from 'react';

import withTheme from '../../Theme/withTheme';
import Svg from '../Svg';

class ObjectMap extends Component {
  constructor(props) {
    super(props);

    this.state = { }
  }

  render() {
    const { classes, theme } = this.props;

    let i = 0;
    return (
      <Svg>
        { !!classes && classes.map(classObject => {
          const props = {cx: i * 200 + 100, cy: 100, rx: 20, ry: 20, strokeWidth: 0, fill: theme.classIdentifier}

          let j = 0;
          let classCircle = <ellipse 
            className="interactive" 
            key={i} {...props} 
            onClick={() => console.log('click')} />;

          let methodCircles = classObject.methods.map( methodObject => {
            const props = {cx: i * 200 + 150, cy: j * 50 + 150, rx: 15, ry: 15, strokeWidth: 0, fill: theme.methodIdentifier}
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
    );
  }
}

export default withTheme(ObjectMap);
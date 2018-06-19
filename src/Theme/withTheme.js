import React from 'react';

import ThemeContext from './ThemeContext';

export default function withTheme(Component) {
  return function ThemedComponent(props) {
    return (
      <ThemeContext.Consumer>
        {theme => {
          console.log(theme);
          return <Component {...props} theme={theme} />
        }}
      </ThemeContext.Consumer>
    );
  };
}
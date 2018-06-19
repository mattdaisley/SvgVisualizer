import React, { Component } from 'react';
import { createStore } from 'redux';

import AppConnected from './SvgConnected';
import reducer from './reducers';

let middlewares = window.devToolsExtension ? window.devToolsExtension() : f => f;
let store = createStore(reducer, null, middlewares);

export default class Svg extends Component {
  render() {
    return <AppConnected store={store}/>;
  }
}
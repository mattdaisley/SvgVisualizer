import React, { Component } from 'react';
import { TOOL_AUTO } from 'react-svg-pan-zoom';

import ViewerContext from './viewerContext';
import SvgViewer from './SvgViewer';

class Svg extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewer: {
        width: 500,
        height: 500,

        background: '#272822',
        detectAutoPan: false,
        detectPinchGesture: true,
        miniaturePosition: 'none',
        SVGBackground: '#272822',
        tool: TOOL_AUTO,
        toolbarPosition: 'none',
        value: null,

        onChangeValue: this.onChangeValue.bind(this)
      }
    }
  }

  viewerContainer = (ref) => this.containerNode = ref;

  componentDidMount() {
    this.onResize();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.viewer.width !== nextState.viewer.width ||
      this.state.viewer.height !== nextState.viewer.height
    )
  }

  componentDidUpdate() {
    console.log('updated');
    this.onResize();
  }

  onResize() {
    const {clientWidth, clientHeight} = this.containerNode;
    this.setState({viewer: {...this.state.viewer, width: clientWidth, height: clientHeight} });
  }

  onChangeValue = (value) => {
    this.setState({viewer: {...this.state.viewer, value} });
  }

  render() {
    const { viewer } = this.state;
    const { children } = this.props;

    return (
      <div ref={this.viewerContainer} style={{flex: 1}}>
        <ViewerContext.Provider value={viewer}>
          <SvgViewer>
            { children }
          </SvgViewer>
        </ViewerContext.Provider>
      </div>
    );
  }
}

export default Svg;
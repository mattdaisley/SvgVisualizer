import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

export function SvgRoot({state, actions}) {
  let viewerWidth = state.get('viewerWidth');
  let viewerHeight = state.get('viewerHeight');
  console.log(viewerWidth, viewerHeight);
  let viewerDetectAutoPan = state.get('viewerDetectAutoPan');
  let viewerMiniaturePosition = state.get('viewerMiniaturePosition');
  let viewerValue = state.get('viewerValue') ? state.get('viewerValue').toJS() : null;
  let viewerTool = state.get('viewerTool');
  let viewerToolbarPosition = state.get('viewerToolbarPosition');
  let viewerDetectPinchGesture = state.get('viewerDetectPinchGesture');

  window.addEventListener('resize', () => actions.onResize(window), false);

  return (
    <div>
    
      <ReactSVGPanZoom
        width={viewerWidth} 
        height={viewerHeight}
        detectAutoPan={viewerDetectAutoPan}
        miniaturePosition={viewerMiniaturePosition}
        value={viewerValue} 
        detectPinchGesture={viewerDetectPinchGesture}
        tool={viewerTool} 
        toolbarPosition={viewerToolbarPosition}

        onChangeValue={value => actions.setValue(value)}
        onChangeTool={tool => actions.selectTool(tool)}

        style={{outline: "1px solid black"}}>

        <svg width={viewerWidth} height={viewerHeight}>
          <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
          <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
          <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
          <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
        </svg>

      </ReactSVGPanZoom>
    </div>
  )
}

SvgRoot.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default SvgRoot;
import React from 'react';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

import ViewerContext from './viewerContext';

const SvgViewer = (props) => {
  const { children } = props;

  return (
    <ViewerContext.Consumer>
      {( viewer ) => (
        <div>
          <ReactSVGPanZoom
            width={viewer.width} 
            height={viewer.height}

            background={viewer.background}
            detectAutoPan={viewer.detectAutoPan}
            detectPinchGesture={viewer.detectPinchGesture}
            miniaturePosition={viewer.miniaturePosition}
            SVGBackground={viewer.SVGBackground}
            tool={viewer.tool} 
            toolbarPosition={viewer.toolbarPosition}
            value={viewer.value} 

            onChangeValue={value => viewer.onChangeValue(value)}

            style={{outline: "1px solid black"}}>

            <svg width={viewer.width} height={viewer.height} stroke="none">
              {/* <rect width="100%" height="100%" fill={viewer.background} /> */}
              { children }
            </svg>

          </ReactSVGPanZoom>
        </div>
      )}
    </ViewerContext.Consumer>
  )
}

export default SvgViewer;

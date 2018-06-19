import React, { Component } from 'react';
// import ReactSVG from 'react-svg'
import './Svg.css';

export default class Svg extends Component {

  constructor(props) {
    super(props);

    const classes = [
      { 
        name: 'Board', 
        methods: [ 
          { name: 'draw', calls: [ 
            { class: 'CanvasStore', method: 'getCanvas' },
            { class: 'CanvasStore', method: 'getCtx' },
            { class: 'CanvasStore', method: 'getHitCtx' },
            { class: 'CanvasStore', method: 'getView' },
            { class: 'Square', method: 'render' },
            { class: 'CanvasStore', method: 'getConnections' },
            { class: 'Connection', method: 'render' },
            { class: 'CanvasStore', method: 'getObjects' },
            { class: 'MethodObject', method: 'render' },
            { class: 'CanvasStore', method: 'getDraggingObjects' },
            { class: 'MethodObject', method: 'renderHit' },
          ] },
          { name: 'setClasses' },
          { name: 'addClassObject' },
          { name: 'addMethodObject' },
        ]
      },
      { 
        name: 'CanvasStore', 
        methods: [ 
          { name: 'getCanvas', calls: [
            
          ]},
          { name: 'setObjectHitColor', calls: [
            
          ]},
          { name: 'getNewObjectGUID', calls: [
            
          ]},
          { name: 'registerObject', calls: [
            { class: 'CanvasStore', method: 'setObjectHitColor' },
            { class: 'CanvasStore', method: 'getNewObjectGUID' },
            { class: 'CanvasObject', method: 'setStoreGUID' },
          ]},
          { name: 'registerRelationship', calls: [
            { class: 'CanvasStore', method: 'registerObject' }
          ]},
          { name: 'getCanvas' },
          { name: 'getCtx' },
          { name: 'getHitCanvas' },
          { name: 'getHitCtx' },
          { name: 'getView' },
          { name: 'getObjects' },
          { name: 'getConncections' },
          { name: 'getDraggingObjects' },
          { name: 'registerRelationship' },
        ]
      },
      { 
        name: 'MethodObject', 
        methods: [ 
          { name: 'render', calls: []}, 
        ]
      },
      { 
        name: 'Connection', 
        methods: [ 
          { name: 'render', calls: []}, 
        ]
      },
      { 
        name: 'CanvasObject',
        methods: [ 
          { name: 'setStoreGUID', calls: [ 

          ]}, 
        ]
      }
    ];
    
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      classes,

      scrollCount: 0,

      mouseX: 0,
      mouseY: 0,

      view: {
        scale: 1,
        x: 0,
        y: 0,

        matrix: [ 1, 0, 0, 1, 0, 0 ],

        contextX: 0,
        contextY: 0,

        lastX: 0,
        lastY: 0,
  
        isMouseDown: false,
  
        width: window.innerWidth,
        height: window.innerHeight,
        
        zoomIntensity: 0.5,
      },
    };

    this.onResize     = this.onResize.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onKeyUp      = this.onKeyUp.bind(this);
    this.onKeyDown    = this.onKeyDown.bind(this);

    this.onMouseMove  = this.onMouseMove.bind(this);
    this.onMouseDown  = this.onMouseDown.bind(this);
    this.onMouseUp    = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    this.svg = this.refs.svg;
    
    this.onResize();

    window.addEventListener('resize', this.onResize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);  // dblclick to zoom in at point, shift dblclick to zoom out.
    window.addEventListener('keyup', this.onKeyUp, false);
    window.addEventListener('keydown', this.onKeyDown, false);
    this.refs.svg.addEventListener('mousewheel', this.onMouseWheel, false);
    this.refs.svg.addEventListener("mousedown", this.onMouseDown, false); // click and hold to pan
    this.refs.svg.addEventListener("mouseup", this.onMouseUp, false);

  }

  componentWillUnmount() {
    window.removeEventListener('resize');
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('keyup', this.onKeyUp, false);
    window.removeEventListener('keydown', this.onkeyDown, false);
    
    this.refs.svg.removeEventListener('mousewheel', this.onMouseWheel, false);
    this.refs.svg.removeEventListener("mousedown", this.onMouseDown, false);
    this.refs.svg.removeEventListener("mouseup", this.onMouseUp, false);
  }

  onResize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onMouseWheel(wheelEvent) {
    wheelEvent.preventDefault();

    let { view } = this.state;

    var delta = wheelEvent.wheelDeltaY;
    var zoom = Math.pow(1.1, delta/120);

    if ( view.scale <= .1 && zoom <= 1 ) return; // Force min zoom distance
    if ( view.scale >= 10 && zoom >= 1 ) return; // Force max zoom distance
    
    this.setMatrix(wheelEvent.clientX, wheelEvent.clientY, zoom);
  }

  setMatrix(x1, y1, zoom, x2, y2) {
    if ( x2 === undefined ) x2 = x1;
    if ( y2 === undefined ) y2 = y1;

    const { view } = this.state;

    var p = this.refs.svg.createSVGPoint();
    p.x = x1 - view.x / view.scale;
    p.y = y1 - view.y / view.scale;

    var p2 = this.refs.svg.createSVGPoint();
    console.log(p, zoom * view.scale);
    
    p = p.matrixTransform( this.refs.svg.getCTM().inverse() );
    console.log(p);

    var zoomMat = this.refs.svg.createSVGMatrix()
            .translate(p.x, p.y)
            .scale(zoom)
            .translate(-p.x, -p.y);
    
    var m = this.refs.zoom.getCTM().multiply(zoomMat);


    this.setState({ view: { ...view, scale: view.scale * zoom, matrix: [m.a, m.b, m.c, m.d, m.e, m.f]} });
  }

  pan(dx, dy) {
    let { x, y } = this.state.view;
    // console.log(x, y, dx, dy);
    this.setMatrix(x, y, 1, x + dx, x + dy)
  }

  onKeyDown( keyEvent ) {
    if (this.Board) this.Board.handleKeyDown(keyEvent);
  }

  onKeyUp( keyEvent ) {
    if (this.Board) this.Board.handleKeyUp(keyEvent);
  }

  onMouseDown( mouseEvent ) {
    const { view } = this.state; 

    this.setState({ view : { ...view, isMouseDown: true } });
  }

  onMouseMove( mouseEvent ) {
    const { view } = this.state; 
    const { matrix, x, y, lastX, lastY } = view; 

    const mouseX = mouseEvent.clientX;
    const mouseY = mouseEvent.clientY;

    const dx = lastX - mouseX;
    const dy = lastY - mouseY;

    if (view.isMouseDown) {
      matrix[4] -= dx;
      matrix[5] -= dy;

      this.setState({ view: { ...view, x: x - dx, y: y - dy, matrix, lastX: mouseX, lastY: mouseY } });
      console.log(x - dx, y - dy);
    } else {
      this.setState({ mouseX, mouseY, view: { ...view, lastX: mouseX, lastY: mouseY } });
    }

  }

  onMouseUp( mouseEvent ) {
    this.setState({ view : { ...this.state.view, isMouseDown: false } });
  }

  render() {
    const { width, height, classes, view } = this.state;

    let i = 0; 
    return (
      <div className="container">
        <svg ref="svg" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
          <g ref="zoom" transform={`matrix(${view.matrix.join(', ')})`}> 
          
            <rect x={50} y={50} width={view.width - 100} height={view.height - 100} fill="#444" />

            { !!classes && classes.map(classObject => {
              const props = {cx: i * 200 + 100, cy: 100, rx: 25, ry: 25, stroke: "cyan", strokeWidth: 2, fill: "#f3f3f3"}

              let j = 0;
              let classCircle = <ellipse key={i} {...props} onClick={() => console.log('click')}/>;
              let methodCircles = classObject.methods.map( methodObject => {
                const props = {cx: i * 200 + 150, cy: j * 50 + 150, rx: 15, ry: 15, stroke: "cyan", strokeWidth: 2, fill: "#f3f3f3"}
                let methodCircle = <ellipse key={i + '-' + j} {...props} />
                j ++;
                return methodCircle;
              });

              i ++; 
              return [classCircle, ...methodCircles];
            })}

          </g>

          {/* <ellipse key="mouse" cx={mouseX} cy={mouseY} rx={5} ry={5} fill="red" /> */}
        </svg>

      </div>
    );
  }
}
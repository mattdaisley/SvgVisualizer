import React, { Component } from 'react';
import './Canvas.css';

import Board from '../../Board/Board2';

let requestAnimationFrame =
  global.requestAnimationFrame ||
  global.webkitRequestAnimationFrame ||
  global.mozRequestAnimationFrame ||
  function(callback) {
    global.setTimeout(callback, 1000 / 60);
  };

let animate = function(handle) {
  handle();
  requestAnimationFrame(() => {
    animate(handle);
  });
};


export default class Canvas extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
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
    this.canvas = this.refs.canvas;
    this.hitCanvas = this.refs.hitCanvas;

    this.onResize();
    window.addEventListener('resize', this.onResize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);  // dblclick to zoom in at point, shift dblclick to zoom out.
    window.addEventListener('keyup', this.onKeyUp, false);
    window.addEventListener('keydown', this.onKeyDown, false);
    this.refs.canvas.addEventListener('mousewheel', this.onMouseWheel, false);
    this.refs.canvas.addEventListener("mousedown", this.onMouseDown, false); // click and hold to pan
    this.refs.canvas.addEventListener("mouseup", this.onMouseUp, false);

    // this.refs.hitCanvas.addEventListener('mousemove', this.onMouseMove, false);
    
    animate(() => {
      this.drawFrame();
    });

    const classes = [
      { name: 'Board', methods: [ 
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
      ]},
      { name: 'CanvasStore', methods: [ 
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
      ]},
      { name: 'MethodObject', methods: [ 
        { name: 'render', calls: []}, 
      ]},
      { name: 'Connection', methods: [ 
        { name: 'render', calls: []}, 
      ]},
      { name: 'CanvasObject', methods: [ 
        { name: 'setStoreGUID', calls: [ 

        ]}, 
      ]}
    ];
    this.Board = new Board(window, this.canvas, this.hitCanvas, this.state.scale);
    this.Board.setClasses(classes);
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('keyup', this.onKeyUp, false);
    window.removeEventListener('keydown', this.onkeyDown, false);

    this.refs.canvas.removeEventListener('mousewheel', this.onMouseWheel, false);
    this.refs.canvas.removeEventListener("mousedown", this.onMouseDown, false);
    this.refs.canvas.removeEventListener("mouseup", this.onMouseUp, false);

    // this.refs.hitCanvas.removeEventListener('mousemove', this.onMouseMove, false);
  }

  onResize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight }, () => {
      this.canvas.width = this.state.width;
      this.canvas.height = this.state.height;
  
      this.hitCanvas.width = this.state.width;
      this.hitCanvas.height = this.state.height;
    });
  }

  onMouseWheel(wheelEvent) {
    wheelEvent.preventDefault();
    
    if (this.Board) this.Board.handleMouseWheel(wheelEvent);
  }

  onKeyDown( keyEvent ) {
    if (this.Board) this.Board.handleKeyDown(keyEvent);
  }

  onKeyUp( keyEvent ) {
    if (this.Board) this.Board.handleKeyUp(keyEvent);
  }


  onMouseDown( mouseEvent ) {
    if (this.Board) this.Board.handleMouseDown(mouseEvent);
  }

  onMouseMove( mouseEvent ) {
    if (this.Board) this.Board.handleMouseMove(mouseEvent);
  }

  onMouseUp( mouseEvent ) {
    if (this.Board) this.Board.handleMouseUp(mouseEvent);
  }

  drawFrame() {
    if (this.Board) this.Board.draw();
  }

  render() {
    return (
      <div className="container">
        <canvas ref="hitCanvas" width="100%" height="100%" />
        <canvas ref="canvas" width="100%" height="100%" />
      </div>
    );
  }
}
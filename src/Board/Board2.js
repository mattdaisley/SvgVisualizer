import CanvasStore from './CanvasStore/CanvasStore';

import Square from './Square/Square';
import MethodObject from './MethodObject/MethodObject';

export default class Board {

  constructor(window, canvas, hitCanvas, scale) {
    this.window = window;

    CanvasStore.setCanvas(canvas);
    CanvasStore.setHitCanvas(hitCanvas);
  }

  setClasses(classes) {
    for( let i = 0; i < classes.length; i++ ) {
      this.addClassObject({classObject: classes[i], x: i * 300 + 150, y: 100});
    }
  }

  addClassObject({classObject, x, y}) {
    console.log(classObject.name);
    for ( let j = 0; j < classObject.methods.length; j++ ) {
      this.addMethodObject({classObject, methodObject: classObject.methods[j], x, y: y + j * 70 });
    }
  }

  addMethodObject({ classObject, methodObject, x, y }) {
    const canvas = CanvasStore.getCanvas()
    const ctx = CanvasStore.getCtx();

    CanvasStore.registerObject(new MethodObject({classObject, methodObject, x, y}));
    // console.log(methodObject.name);
    // const rels = methodObject.calls.map( call => ({ id: `${call.class}-${call.method}` }) )
    // console.log(rels)
    // var grd = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    // grd.addColorStop(0,"#000d33");
    // grd.addColorStop(1,"#001a66");
    // CanvasStore.registerObject(new Circle({id: `${classObject.name}-${methodObject.name}`, x, y, relationships: rels}));
  }

  draw () {
    const canvas = CanvasStore.getCanvas()
    const ctx = CanvasStore.getCtx();
    const hitCtx = CanvasStore.getHitCtx();
    const view = CanvasStore.getView();

    // Draw background
    var grd = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    grd.addColorStop(0,"#000d33");
    grd.addColorStop(1,"#001a66");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.clearRect(view.x, view.y, canvas.width/view.scale, canvas.height/view.scale);
    new Square({x: view.x, y: view.y, width: canvas.width/view.scale, height: canvas.height/view.scale, color: grd}).render(this.ctx);

    hitCtx.clearRect(view.x, view.y, canvas.width/view.scale, canvas.height/view.scale);
    
    const connObjects = CanvasStore.getConnections();
    for( let key in connObjects ) {
      if ( !connObjects.hasOwnProperty(key) ) continue;
      connObjects[key].render();
    }

    const objects = CanvasStore.getObjects();
    for( let key in objects ) {
      if ( !objects.hasOwnProperty(key) ) continue;
      objects[key].render();
    }

    // non drag objects first, then drag objects. This keeps the dragged objects hit boxes on top
    const dragObjects = CanvasStore.getDraggingObjects();
    const hitObjectKeys = [ ...Object.keys(objects).filter( key => !dragObjects.hasOwnProperty(key) ), ...Object.keys(dragObjects) ]
    hitObjectKeys.forEach( key => {
      if ( !objects.hasOwnProperty(key) ) return;
      objects[key].renderHit();
    })

  }

  handleMouseWheel(event) {
    CanvasStore.handleMouseWheel(event);
  }

  handleKeyUp(event) {
    CanvasStore.handleKeyUp(event);
  }

  handleKeyDown(event) {
    CanvasStore.handleKeyDown();
  }

  handleMouseUp(event) {
    CanvasStore.handleMouseUp(event);
  }

  handleMouseDown(event) {
    CanvasStore.handleMouseDown(event);
  }

  handleMouseMove(event) {
    CanvasStore.handleMouseMove(event);
  }

}
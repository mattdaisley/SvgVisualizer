import Connection from '../Connection/Connection';

class CanvasStore {
  constructor(){
    if(!CanvasStore.instance){
      this.store = {
        canvas: undefined,
        ctx: undefined,
        hitCanvas: undefined,
        hitCtx: undefined,

        hitColors: {},

        view: {
          scale: 1,
          x: 0,
          y: 0,
    
          lastX: 0,
          lastY: 0,
          isMouseDown: false,
    
          width: undefined,
          height: undefined,
          
          zoomIntensity: 0.5
        },

        objects: {},
        connections: {},

        missingRelatedObjects: {},

        draggingObjects: {}
      };

      CanvasStore.instance = this;
    }

    return CanvasStore.instance;
  }

  setCanvas(canvas){
    this.store.canvas = canvas;
    this.store.ctx = canvas.getContext("2d");
    this.store.view.width = canvas.width;
    this.store.view.height = canvas.height;
  }

  setHitCanvas(hitCanvas){
    this.store.hitCanvas = hitCanvas;
    this.store.hitCtx = hitCanvas.getContext("2d");
  }

  getCanvas() { return this.store.canvas }
  getCtx() { return this.store.ctx }

  getHitCanvas() { return this.store.hitCanvas }
  getHitCtx() { return this.store.hitCtx }

  registerObject(object) {
    this.setObjectHitColor(object);

    const guid = this.getNewObjectGUID();
    object.setStoreGUID(guid);

    if ( object.type === 'connection' ) {
      this.store.connections[guid] = object;
    } else {
      this.store.objects[guid] = object;
    }

    if ( object.connections.length > 0 ) object.connections.forEach( (connection, index) => {
      object.connections[index] = this.registerRelationship(object, connection);
    })

    let connection = this.store.missingRelatedObjects[object.id];
    if (!!connection) {
      connection.setObject2(object);
      object.connections.push(connection);
      delete this.store.missingRelatedObjects[object.id];
    }
    // console.log(object, this.store.objects)
  }

  deRegisterObject(object) {
    // console.log(this.store)
    if ( object.type === 'connection' ) {
      delete this.store.connections[object.store.guid];
    } else {
      delete this.store.objects[object.store.guid];
    }
  }

  registerRelationship(object1, relationship) {
    const object2Guid = Object.keys(this.store.objects).filter( key => this.store.objects[key].id === relationship.id )[0];
    let object2 = !!object2Guid ? this.store.objects[object2Guid] : undefined;

    let connection = new Connection({id: `${object1.id}-${relationship.id}`, type: relationship.type, object1, object2 });
    this.registerObject(connection);

    if (object2) {
      object2.connections.push(connection);
    }
    else {
      this.store.missingRelatedObjects[relationship.id] = connection;
    }

    return connection;
  }

  updateRelationshipPosition(object, connection) {
    // console.log(object.id, object.connections, connection.object1, object.connections.filter( objConnection => objConnection.object1.id === object.id));
    if ( !!connection ) {
      if ( connection.object1.id === object.id ) {
        connection.x = object.x;
        connection.y = object.y;
      }
      else if ( connection.object2.id === object.id ) {
        connection.x2 = object.x;
        connection.y2 = object.y;
      }
    }
  }


  getObjects() {
    return this.store.objects;
  }

  getConnections() {
    return this.store.connections;
  }

  addDraggingObject( object ) {
    this.store.draggingObjects[object.store.guid] = object;
  }

  removeDraggingObject(object) {
    delete this.store.draggingObjects[object.store.guid];
  }

  getDraggingObjects() {
    return this.store.draggingObjects;
  }

  isDragging() {
    return Object.keys(this.store.draggingObjects).length;
  }

  getView() {
    return this.store.view;
  }

  setViewWidth(width) {
    this.store.view.width = width;
  }
  setViewHeight(height) {
    this.store.view.height = height;
  }
  setViewScale(scale) {
    this.store.view.scale = scale;
  }
  setViewX(x) {
    this.store.view.x = x;
  }
  setViewY(y) {
    this.store.view.y = y;
  }
  setLastX(x) {
    this.store.view.lastX = x;
  }
  setLastY(y) {
    this.store.view.lastY = y;
  }



  handleMouseWheel(event) {
    // Get mouse offset.
    var mousex = event.clientX - this.store.canvas.offsetLeft;
    var mousey = event.clientY - this.store.canvas.offsetTop;
    console.log(mousex);
    // Normalize wheel to +1 or -1.
    var wheel = event.wheelDelta/120;

    // Compute zoom factor.
    var zoom = Math.exp(wheel * this.store.view.zoomIntensity);

    if ( this.store.view.scale <= .1 && zoom <= 1 ) return; // Force min zoom distance
    if ( this.store.view.scale >= 10 && zoom >= 1 ) return; // Force max zoom distance
    
    // Translate so the visible origin is at the context's origin.
    this.store.ctx.translate(this.store.view.x, this.store.view.y);
    this.store.hitCtx.translate(this.store.view.x, this.store.view.y);
    
    // Scale it (centered around the origin due to the trasnslate above).
    this.store.ctx.scale(zoom, zoom);
    this.store.hitCtx.scale(zoom, zoom);
  
    // Compute the new visible origin. Originally the mouse is at a
    // distance mouse/scale from the corner, we want the point under
    // the mouse to remain in the same place after the zoom, but this
    // is at mouse/new_scale away from the corner. Therefore we need to
    // shift the origin (coordinates of the corner) to account for this.
    this.store.view.x -= mousex/(this.store.view.scale*zoom) - mousex/this.store.view.scale;
    this.store.view.y -= mousey/(this.store.view.scale*zoom) - mousey/this.store.view.scale;

    // Offset the visible origin to it's proper position.
    this.store.ctx.translate(-this.store.view.x, -this.store.view.y);
    this.store.hitCtx.translate(-this.store.view.x, -this.store.view.y);


    this.store.view.lastX = mousex;
    this.store.view.lastY = mousey;

    // Update scale and others.
    this.store.view.scale *= zoom;
    this.store.view.width = this.store.canvas.width / this.store.view.scale;
    this.store.view.height = this.store.canvas.height / this.store.view.scale;
  }

  handleKeyDown(event) {

  }

  handleKeyUp(event) {
    
  }

  handleMouseDown(event) {
    var mouseX = event.clientX - this.store.canvas.offsetLeft;
    var mouseY = event.clientY - this.store.canvas.offsetTop;

    const object = this.hitCheck({mouseX, mouseY});
    if (!!object) object.onHit({mouseX, mouseY});

    this.store.view.isMouseDown = true;
  }

  handleMouseUp(event) {
    this.store.view.isMouseDown = false;

    if ( !event.shiftKey ) {
      [...Object.keys(this.store.draggingObjects)].forEach( key => {
        this.store.draggingObjects[key].offHit({ isMouseDown: false })
      });
    }
  }

  handleMouseMove(event) {
    const mouseX = event.clientX - this.store.canvas.offsetLeft;
    const mouseY = event.clientY - this.store.canvas.offsetTop;
    const dx = (mouseX - this.store.view.lastX) / this.store.view.scale;
    const dy = (mouseY - this.store.view.lastY) / this.store.view.scale;

    if (this.store.view.isMouseDown) {
      
      if (this.isDragging()) {
        const objects = this.getDraggingObjects();
        // console.log(Object.keys(objects).length)
        for( let key in objects ) {
          if ( !objects.hasOwnProperty(key) ) continue;
          objects[key].drag({dx, dy});
        }
      } 
      else {
        this.store.ctx.translate(this.store.view.x, this.store.view.y);
        this.store.hitCtx.translate(this.store.view.x, this.store.view.y);
  
        this.store.view.x -= (mouseX - this.store.view.lastX) / this.store.view.scale;
        this.store.view.y -= (mouseY - this.store.view.lastY) / this.store.view.scale;
  
        this.store.ctx.translate(-this.store.view.x, -this.store.view.y);
        this.store.hitCtx.translate(-this.store.view.x, -this.store.view.y);
      }
    }

    this.store.view.lastX = mouseX;
    this.store.view.lastY = mouseY;
  }

  hitCheck({mouseX, mouseY}) {
    const pixel = this.store.hitCtx.getImageData(mouseX, mouseY, 1, 1).data;

    // create rgb color for that pixel
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    for( let key in this.store.objects ) {
      if ( !this.store.objects.hasOwnProperty(key) ) continue;
      if (color === this.store.objects[key].hitColor) {
        return this.store.objects[key];
        //object.onHit({mouseX, mouseY});
      } else {
        //object.offHit({isMouseDown: this.store.view.isMouseDown});
      }
    }

  }


  getNewObjectGUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        // eslint-disable-next-line
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  setObjectHitColor(object) {
    while(true) {
      const colorKey = this.getRandomColor();
      // if colours is unique
      if (!this.store.hitColors[colorKey]) {
        // save reference 
        this.store.hitColors[colorKey] = object;
        // set color for hit canvas
        object.setHitColor(colorKey);
        return;
      }
    }
  }

  getRandomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  }

}

const instance = new CanvasStore();
Object.freeze(instance);

export default instance;
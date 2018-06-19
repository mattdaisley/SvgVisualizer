import CanvasStore from '../CanvasStore/CanvasStore';

export default class CanvasObject {
  constructor(props) {
    const { type, id, x, y, deg, color, lineWidth, strokeStyle, relationships, draggable } = props
    this.type = !!type ? type : 'object';

    this.id = id;
    this.store = {
      guid: undefined
    }

    this.ctx = CanvasStore.getCtx();
    this.hitCtx = CanvasStore.getHitCtx();

    this.x = x;
    this.y = y;

    this.deg = deg;

    this.color = color;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;

    this.hitColor = undefined;
    this.hit = false;

    this.draggable = draggable !== undefined ? draggable : true;
    this.dragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.dragStopTimeoutHandle = undefined;

    this.tooltip = undefined;

    this.connections = (!!relationships && relationships.length > 0 ? relationships : []);
  }

  validatePosition() {
    if (this.x === undefined) {
      console.log(`${this.type}.x not provided`);
      return false;
    }
    if (this.y === undefined) {
      console.log(`${this.type}.y not provided`);
      return false;
    }

    return true;
  }

  setHitColor( color ) {
    this.hitColor = color;
  }

  setStoreGUID( guid ) {
    this.store.guid = guid;
  }

  render( ctx ) {
    this.childRender(ctx);
  }

  renderHit( ctx ) {
    this.childRenderHit(ctx);
  }

  onHit(props) {
    // console.log(`${this.type} hit!`);
    if ( this.hit ) return; 

    this.childOnHit(props);
    this.dragStart(props);
    this.hit = true;
    this.selected = true;
    this.connections.forEach( connection => {
      if (connection.object1.id === this.id) connection.selected = true
      if (!!connection.object2 && connection.object2.id === this.id) connection.lineWidth = 3;
    });
  }
  childOnHit() { }

  offHit(props) {
    if ( !this.hit ) return;

    if ( !props.isMouseDown ) {
      this.dragStop(props);
      if (!!this.childOffHit) this.childOffHit(props);
      this.hit = false;
      this.selected = false;
      this.connections.forEach( connection => {
        if (connection.object1.id === this.id) connection.selected = false
        if (!!connection.object2 && connection.object2.id === this.id) connection.lineWidth = 2;
      });
    } 
  }
  childOffHit() {}
  
  dragStart(props) {
    if ( !this.draggable ) return; 
    if ( this.dragStopTimeoutHandle ) clearTimeout(this.dragStopTimeoutHandle);

    if ( !this.dragging ) {
      if (!!this.childDragStart) this.childDragStart(props);
      this.dragging = true;
      this.dragOffsetX = (props.mouseX - this.x) * CanvasStore.getView().scale;
      this.dragOffsetY = (props.mouseY - this.y) * CanvasStore.getView().scale;
      if ( this.tooltip ) this.tooltip.dragStart(props)
      CanvasStore.addDraggingObject(this);
    }

  }

  dragStop(props) {
    if ( !this.draggable || !this.dragging || props.isMouseDown ) return;

    this.dragStopTimeoutHandle = setTimeout(() => {
      if (!!this.childDragStop) this.childDragStop();
      this.dragging = false;
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
      if ( this.tooltip ) this.tooltip.dragStop(props)
      CanvasStore.removeDraggingObject(this);
    }, 100)
  }

  drag(props) {
    if ( this.connections.length > 0 ) {
      this.connections.forEach( connection => {
        CanvasStore.updateRelationshipPosition(this, connection);
      })
    }

    // if ( this.tooltip ) this.tooltip.drag(props);
    if ( !this.dragging ) return
    this.x += props.dx;
    this.y += props.dy;
    this.childDrag(props);
  }

}
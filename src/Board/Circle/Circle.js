import CanvasObject from '../CanvasObject/CanvasObject';
import CanvasStore from '../CanvasStore/CanvasStore';

//import Square from '../Square/Square';

export default class Circle extends CanvasObject {
 
  constructor (props) {
    // console.log(props);
    const { radius } = props

    super({...props, type: 'circle'});

    this.radius = radius;
  }

  validateDimensions() {
    if (this.radius === undefined) {
      console.log('Circle.radius not provided');
      return false;
    }

    return super.validatePosition();
  }
 
  childRender() {
    if (!this.validateDimensions()) {
      console.log(`validate failed ${this.type}`);
      return;
    }
    
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    if ( this.selected ) {
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 5;
      this.ctx.stroke();
    }
    else if (this.lineWidth > 0) {
      this.ctx.stroke();
    }
  }

  childRenderHit() {
    if (!this.validateDimensions()) {
      return;
    }

    // console.log(`rendering hit ${this.type}`);
    this.hitCtx.fillStyle = this.hitColor;
    this.hitCtx.beginPath();
    this.hitCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    if ( this.lineWidth > 0 ) this.hitCtx.stroke();
    this.hitCtx.fill();
  }

  childOnHit() {
    //this.tooltip = new Square({x: this.x, y: this.y + this.radius, width: 100, height: 50, color: 'rgb(66, 134, 244)'});
    //CanvasStore.registerObject(this.tooltip);
  }

  childOffHit() {
    if (!!this.tooltip) CanvasStore.deRegisterObject(this.tooltip);
    // this.tooltip = undefined;
  }
 
}
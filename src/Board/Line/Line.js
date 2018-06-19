import CanvasObject from '../CanvasObject/CanvasObject';

export default class Line extends CanvasObject {
 
  constructor (props) {
    // console.log(props);
    const { type, x1, y1, x2, y2, width } = props

    super({...props, type: (!!type ? type : 'line') });

    this.x = x1;
    this.y = y1;

    this.x2 = x2;
    this.y2 = y2;
    this.lineWidth = width
  }

  validateDimensions() {
    if (this.x2 === undefined) {
      // console.log('Line.x2 not provided');
      return false;
    }
    if (this.y2 === undefined) {
      // console.log('Line.y2 not provided');
      return false;
    }

    return super.validatePosition();
  }
 
  childRender( ctx ) {
    if (!this.validateDimensions()) {
      // console.log(`validate failed ${this.type}`);
      return;
    }
    
    // console.log(`rendering ${this.type}`, this.x, this.y, this.width, this.height, this.color);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.stroke();
  }

  childRenderHit( ctx ) {
    if (!this.validateDimensions()) {
      return;
    }

    // console.log(`rendering hit ${this.type}`);
    this.hitCtx.strokeStyle = this.hitColor;
    this.hitCtx.lineWidth = this.lineWidth;
    this.hitCtx.beginPath();
    this.hitCtx.moveTo(this.x, this.y);
    this.hitCtx.lineTo(this.x2, this.y2);
    this.hitCtx.stroke();
  }

  onHit() {
    // console.log(`${this.type} hit!`);
  }
 
}
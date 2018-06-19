import CanvasObject from '../CanvasObject/CanvasObject';

export default class Square extends CanvasObject {
 
  constructor (props) {
    // console.log(props);
    const { type, width, height } = props

    super({...props, type: !!type ? type : 'square'});

    this.width = width;
    this.height = height;
  }

  validateDimensions() {
    if (this.width === undefined) {
      console.log('Square.width not provided');
      return false;
    }
    if (this.height === undefined) {
      console.log('Square.height not provided');
      return false;
    }

    return super.validatePosition();
  }
 
  childRender() {
    if (!this.validateDimensions()) {
      console.log(`validate failed ${this.type}`);
      return;
    }
    
    // console.log(`rendering ${this.type}`, this.x, this.y, this.width, this.height, this.color);
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
    if (this.lineWidth > 0) {
      this.ctx.stroke();
    }
  }

  childRenderHit() {
    if (!this.validateDimensions()) {
      return;
    }

    // console.log(`rendering hit ${this.type}`);
    this.hitCtx.fillStyle = this.hitColor;
    this.ctx.strokeStyle = this.hitColor;
    this.ctx.lineWidth = this.lineWidth;
    this.hitCtx.beginPath();
    this.hitCtx.fillRect(this.x, this.y, this.width, this.height);
    if (this.lineWidth > 0) {
      this.hitCtx.stroke();
    }
  }

  onHit() {
    console.log(`${this.type} hit!`);
  }
 
}
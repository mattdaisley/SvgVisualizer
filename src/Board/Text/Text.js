import CanvasObject from '../CanvasObject/CanvasObject';

export default class Text extends CanvasObject {
 
  constructor (props) {
    // console.log(props);
    const { type, text, font, textAlign } = props;

    super({ ...props, type: (!!type ? type : 'text') });

    this.font = font;
    this.text = text;
    this.textAlign = textAlign;
  }

  validateDimensions() {
    return super.validatePosition();
  }

  childRender() {
    if (!this.validateDimensions()) {
      return;
    }

    this.ctx.font = this.font;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = this.textAlign;
    this.ctx.beginPath();
    this.ctx.fillText(this.text, this.x, this.y);
  }

  childRenderHit() {
    if (!this.validateDimensions()) {
      return;
    }

    // console.log(`rendering hit ${this.type}`);
    this.hitCtx.fillStyle = this.hitColor;
    this.hitCtx.beginPath();
    this.hitCtx.fillRect(this.x, this.y, this.width, this.height);
  }

  childDrag(props) {
    this.label.x += props.dx;
    this.label.y += props.dy;
  }
 
}
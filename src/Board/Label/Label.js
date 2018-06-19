import CanvasStore from '../CanvasStore/CanvasStore';

import CanvasObject from '../CanvasObject/CanvasObject';
import Text from '../Text/Text';
import Square from '../Square/Square';

export default class Label extends CanvasObject {
 
  constructor (props) {
    // console.log(props);
    const { type, height, text, color, textAlign } = props;

    super({ ...props, color: '#081255', lineWidth: 2, strokeStyle: '#00b8e6', type: (!!type ? type : 'label') });

    this.text = text.length > 25 ? text.split('', 25).join('') + '...' : text;
    
    this.padding = 4;
    this.width = this.ctx.measureText(this.text).width + this.padding * 2 + this.lineWidth;
    this.height = height;

    this.textColor = !!color ? color : 'white';
    this.textAlign = !!textAlign ? textAlign : 'left';
    this.fontSize = height - (this.padding * 2) - this.lineWidth;
    this.font = `${this.fontSize}px helvetica`;
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
    
    this.ctx.font = this.font;
    this.width = this.ctx.measureText(this.text).width + this.padding * 2 + this.lineWidth;
    if ( this.textAlign === 'right' ) this.width *= -1
    if ( this.textAlign === 'center' ) this.width -= this.width/2 

    new Square({x: this.x, y: this.y, width: this.width, height: this.height, color: this.color, strokeStyle: this.strokeStyle, lineWidth: this.lineWidth, draggable: false }).render();
    new Text({x: this.x - this.padding, y: this.y + this.height - this.padding - this.lineWidth, text: this.text, font: this.font, color: this.textColor, textAlign: this.textAlign, draggable: false }).render();
    
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
    // this.label.x += props.dx;
    // this.label.y += props.dy;
  }
 
}
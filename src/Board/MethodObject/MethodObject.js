import CanvasStore from '../CanvasStore/CanvasStore';

import Circle from '../Circle/Circle';
import Label from '../Label/Label';

export default class MethodObject extends Circle {
 
  constructor (props) {
    // console.log(props);
    const { type, classObject, methodObject } = props

    const rels = !!methodObject.calls ? methodObject.calls.map( call => ({ id: `${call.class}-${call.method}` }) ) : [];

    const radius = 15;

    var grd = CanvasStore.getCtx().createLinearGradient(0,0,radius*2,radius*2);
    grd.addColorStop(0,"#000d33");
    grd.addColorStop(1,"#001a66");
    super({ ...props, id: `${classObject.name}-${methodObject.name}`, relationships: rels, radius, color: grd, lineWidth: 2, strokeStyle: '#00b8e6', type: (!!type ? type : 'method') });

    this.label = new Label({text: `${methodObject.name}` ,x: this.x + radius, y: this.y - radius - 25, height: 25, textAlign: 'right'});
    CanvasStore.registerObject(this.label);
  }

  validateDimensions() {
    return super.validatePosition();
  }

  childDrag(props) {
    this.label.x += props.dx;
    this.label.y += props.dy;
  }
 
}
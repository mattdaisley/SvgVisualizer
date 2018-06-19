import Line from '../Line/Line';

export default class Connection extends Line {
 
  constructor (props) {
    // console.log(props);
    const { type, object1, object2 } = props

    const x1 = !!object1 ? object1.x : undefined;
    const y1 = !!object1 ? object1.y : undefined;
    const x2 = !!object2 ? object2.x : undefined;
    const y2 = !!object2 ? object2.y : undefined;

    delete props.relationships;
    super({ ...props, x1, y1, x2, y2, width: 2, color: 'grey', type: (!!type ? type : 'connection') });

    this.relType = type;
    this.object1 = object1;
    this.object2 = object2;

    if ( !!object2 && !!object2.relationships ) {
      object2.connections.push( this );
    }

    // rel.object = connectionObject;

    // if ( rel.type === 'usage' && !!relatedObject.relationships ) {
    //   if ( relatedObject.relationships.filter( rel => rel.type === 'reference' && rel.id === object.id).length === 0 ) {
    //     const referenceRel = {type: 'reference', id: object.id, object: connectionObject};
    //     relatedObject.relationships.push( referenceRel )
    //   }
    // }
    // else if ( rel.type === 'reference' && !!relatedObject.relationships ) {
    //   if ( relatedObject.relationships.filter( rel => rel.type === 'usage' && rel.id === object.id).length === 0 ) {
    //     const usageRel = {type: 'usage', id: object.id, object: connectionObject};
    //     relatedObject.relationships.push( usageRel )
    //   }
    // }
  }

  setObject1( object ) {
    if (!object) return; 
    this.object1 = object;
    this.x = object.x
    this.y = object.y;
  }
  setObject2( object ) {
    if (!object) return; 
    this.object2 = object;
    this.x2 = object.x;
    this.y2 = object.y;
  }

  validateDimensions() {
    if (this.object1 === undefined) {
      // console.log('Line.x2 not provided');
      return false;
    }
    if (this.object2 === undefined) {
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
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    // this.ctx.lineTo(this.x2, this.y2);
    // console.log(this.y2, this.y, this.y2 - this.y)
    // let dx = this.x2 - this.x;
    // let dy = this.y2 - this.y;
    
    // let atan = Math.atan2(dy, dx);

    // let x = this.x + dx + Math.sin(atan + Math.PI / 2) * 120;
    // let y = this.y + dy + Math.cos(atan + Math.PI / 2) * 120;

    // if ( this.x <= this.x2 && this.y <= this.y2 ) {    
      this.ctx.quadraticCurveTo(this.x + 125, this.y2 + (this.y - this.y2) / 2, this.x2, this.y2);
      // this.ctx.quadraticCurveTo(this.y, this.x, this.x2, this.y2);
    // } else {
      // this.ctx.quadraticCurveTo(this.x - 75, this.y2 - (this.y2 - this.y) / 2, this.x2, this.y2);
    // }


    if ( this.selected ) {
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 3;
    } else {
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
    }
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
export default class Board {

  constructor(canvas, scale) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.screenX =  - this.canvas.width/2;
    this.screenY =  - this.canvas.height/2;
    this.screenX = 0;
    this.screenY = 0;

    this.clientX = 0;
    this.clientY = 0;

    this.scale = scale;
    this.setScale(scale);
  }

  setScale(scale) {
    const oldScreenX = this.screenX;
    const oldScale = this.scale;
    this.scale =  scale / 10;

    // this.screenX = this.clientX - this.canvas.width/2;
    // this.screenY = this.clientY - this.canvas.height/2;

    // left side
    if ( this.clientX < this.canvas.width/3 ) {
      this.screenX = -this.canvas.width/2
    } 
    // right side
    else if ( this.clientX > this.canvas.width * 2/3 ) {
      this.screenX = -this.canvas.width * this.scale + this.canvas.width/2
    } 
    // center
    else {
      this.screenX = -this.canvas.width/2 * this.scale
    }

    // this.screenX = -this.canvas.width/2 + ((scale * this.canvas.width) - this.canvas.width) / 2;

    // this.screenX = -this.canvas.width + (this.scale) * this.canvas.width/2;

    // this.screenX = this.scale < 3 ? -this.canvas.width/2 : 

    // this.scale =  2;

    // this.screenX = -this.canvas.width/4;
    // this.screenY = - this.canvas.height/4;
  }

  setMouse({clientX, clientY}) {
    this.clientX = clientX;
    this.clientY = clientY;
  }

  drawFrame() {
    const { screenX, screenY, scale } = this;
    const { width, height } = this.canvas;

    this.drawBackground({width, height});

    // this.ctx.translate(width/2, height/2)
    this.ctx.translate(screenX, screenY)
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(-width/2, -height/2, width, height);
    this.ctx.stroke();
    this.ctx.lineWidth = 2;


    this.drawObject({ x: 0, y: 200, width: 200, height: 80 });

    this.drawObject({ x: width-200, y: 200, width: 200, height: 80 });

    // this.drawObject({ x: 600, y: 200, width: 200, height: 80, deg: 90 });

    // this.drawObject({ x: 800, y: 200, width: 200, height: 80, deg: 90 });

    // this.ctx.translate(-width/2, -height/2);
    this.ctx.translate(-screenX, -screenY);
  }

  drawBackground({width = 500, height = 500, padding = 0}) {
    var grd = this.ctx.createLinearGradient(0,0,width,height);
    grd.addColorStop(0,"#000d33");
    grd.addColorStop(1,"#001a66");

    // Fill with gradient
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(padding/2, padding/2, width-padding, height-padding);
  }

  drawArrows(props) {
    for (let i = 0; i < 100; i++) {
      let object = { 
        ...props,
        x: props.x + i * 10,
        width: 300,
        height: 80
      };
      this.drawObject(object);
    }
  }

  drawObject(props) {
    const { deg } = props;
    console.log(props.x, this.screenX, this.scale);
    // props.x = props.x + this.screenX;
    // props.y = props.y + this.screenY;

    const { showEdges, color } = props;
    const scaleThese = { x: props.x, y: props.y, width: props.width, height: props.height };
    const { x, y, width, height } = Object.assign(...Object.entries(scaleThese).map(([k, v]) => ({[k]: v * this.scale})));

    let rad = deg * Math.PI/180;

    // this.ctx.translate(x+this.screenX, y+this.screenY);
    this.ctx.translate(x, y);
    this.ctx.rotate(rad);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, width, height);
    // this.drawCurve({ x1: 0, y1: height/2, x2: width/6, y2:   height/6, x3: width, y3: 0,      deg: 0, showEdges, color })
    // this.drawCurve({ x1: 0, y1: height/2, x2: width/6, y2: 5*height/6, x3: width, y3: height, deg: 0, showEdges, color })

    this.ctx.rotate(-rad);
    // this.ctx.translate(-x-this.screenX, -y-this.screenY);
    this.ctx.translate(-x, -y);
    // this.drawCurve({ x1: 200, y1: 300, x2: 200, y2: 150, x3: 400, y3: 150 })
  }

  drawCurve({ x1, y1, x2, y2, x3, y3, deg = 0, showEdges = false, color = "white" }) {

    let rad = deg * Math.PI/180;
    this.ctx.rotate(rad);

    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.quadraticCurveTo(x2,y2, x3, y3);
    this.ctx.stroke();

    if ( showEdges ) {
      this.ctx.strokeStyle = "grey";
      this.ctx.beginPath();
      this.ctx.moveTo(x1,y1);
      this.ctx.lineTo(x2,y2);
      this.ctx.stroke();
      this.ctx.lineTo(x3,y3);
      this.ctx.stroke();
    }

    this.ctx.rotate(-rad);
  }

}
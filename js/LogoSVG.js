('use strict');

class LogoSVG{
  constructor(id){
    this.logoContainer=new SVG(id);
    this.ctx=this.logoContainer.getContext();
    
    var size,halfSize;
    size=Enums.size;
    halfSize=Enums.halfSize;
    this.logoContainer.setSize(size,size);
    this.setLogo(halfSize,halfSize+3);
  }
  setLogo(x,y){
    this.ctx.fillStyle='#c3c3c3';
    this.ctx.text('</>',x,y);
    this.ctx.fill();
  }
}
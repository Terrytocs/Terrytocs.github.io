('use strict');

class HamBarSVG{
  constructor(id,linksID){
    this.svg=new SVG(id);
    this.ctx=this.svg.getContext();
    this.links=document.getElementById(linksID);
    this.active=false;
    this.rects=[];
    
    this.size=Enums.size;
    this.halfSize=Enums.halfSize;
    this.svg.setSize(this.size,this.size);
    this.setHamBar();
  }
  setHamBar(){
    this.ctx.fillStyle='#3c3c3c';
    for(var i=0;i<3;++i){
      var rect=this.ctx.rect(0,this.size*i/3+i,this.size,this.size/4);
      rect.style.transition='500ms';
      rect.style.transformOrigin= 'center center';
      this.rects.push(rect);
    }
    document.addEventListener('click',this.closeHam.bind(this));
    this.svg.baseElement.addEventListener('click',this.handleClick.bind(this));
  }
  handleClick(e){
    this.active=!this.active;
    this.rects[0].classList.toggle('top-ham-active');
    this.rects[1].classList.toggle('middle-ham-active');
    this.rects[2].classList.toggle('bottom-ham-active');
    this.links.classList.toggle('ham-active');
  }
  closeHam(e){
    var links=[];
    for(var i=0;i<this.links.children.length;++i){
      links.push(this.links.children[i]);
    }
    if (this.active &&!links.includes(e.target)&&!this.rects.includes(e.target)) {
      this.active = false;
      this.rects[0].classList.toggle('top-ham-active');
      this.rects[1].classList.toggle('middle-ham-active');
      this.rects[2].classList.toggle('bottom-ham-active');
      this.links.classList.toggle('ham-active');
    }
  }
}
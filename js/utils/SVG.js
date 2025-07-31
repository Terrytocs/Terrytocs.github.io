('use strict');

class CTX{
  constructor(svg){
    this.svg=svg;
    this.entries=[];
    
    this.fillStyle='transparent';
    this.strokeStyle='transparent';
  }
  text(text,x,y,size=12){
    this.t=document.createElementNS(this.svg.namespaceURI,'text');
    var textNode=document.createTextNode(text);
    this.t.append(textNode);
    this.t.setAttribute('x',`${x}`);
    this.t.setAttribute('y',`${y}`);
    this.t.style.fill=this.fillStyle;
    this.t.style.fontSize=size;
    this.t.style.stroke=this.strokeStyle;
    this.t.style.textAnchor='middle';
    this.t.style.textAlign='center';
    this.svg.append(this.t);
    this.entries.push(this.t);
    return this.t;
  }
  circle(x,y, rad){
    this.c = document.createElementNS(this.svg.namespaceURI, 'circle');
    this.c.setAttribute('cx', x);
    this.c.setAttribute('cy', y);
    this.c.setAttribute('r', rad);
    this.c.style.fill=this.fillStyle;
    this.c.style.stroke=this.strokeStyle;
    this.entries.push(this.c);
    this.svg.append(this.c);
    return this.c;
  }
  rect(x,y,w,h) {
    this.r = document.createElementNS(this.svg.namespaceURI, 'rect');
    this.r.setAttribute('x', x);
    this.r.setAttribute('y', y);
    this.r.setAttribute('width', w);
    this.r.setAttribute('height', h);
    this.r.style.fill = this.fillStyle;
    this.r.style.stroke = this.strokeStyle;
    this.entries.push(this.r);
    this.svg.append(this.r);
    return this.r;
  }
  fill(){
    this.entries.forEach((entry)=>{
      entry.style.fill=this.fillStyle;
    });
  }
  stroke(){
    this.entries.forEach((entry)=>{
      entry.style.stroke=this.strokeStyle;
    });
  }
}

class SVG{
  constructor(id){
    this.baseElement=document.getElementById(id);
  }
  getContext(){
    return new CTX(this.baseElement);
  }
  setSize(w,h){
    this.baseElement.style.height=`${h}px`;
    this.baseElement.style.width=`${w}px`;
    this.baseElement.setAttribute('viewBox',`0 0 ${w} ${h}`);
  }
}
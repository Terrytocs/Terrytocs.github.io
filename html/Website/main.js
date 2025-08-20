'use strict';

window.addEventListener('load',mainFn);

function mainFn(){
  toggleHamFn();
  bgVidFn();
}

function toggleHamFn(){
  const hamBar=document.getElementById('_ham_svg');
  
  hamBar.addEventListener('click',()=>{
    hamBar.toggleAttribute('active');
  })
}

class Arc{
  constructor(x,y,rad,col){
    this.x=x;
    this.y=y;
    this.rad=rad;
    this.col=col;
    this.dir=Math.PI*2*Math.random();
    this.dx=Math.cos(this.dir)*0.01,
    this.dy=Math.sin(this.dir)*0.01;
  }
  distanceTo(arc){
    let x=arc.x-this.x,
    y=arc.y-this.y;
    return Math.floor(Math.sqrt(x*x+y*y));
  }
  update(w,h,t){
    this.x+=this.dx*t;
    this.y+=this.dy*t;

    if(this.x<=0||this.x>=w){
      if(this.x<0){
        this.x=0;
      }else if(this.x>w){
        this.x=w;
      }
      this.dx*=-1;
    }
    if(this.y<=0||this.y>=h){
      if(this.y<0){
        this.y=0;
      }else if(this.y>h){
        this.y=h;
      }
      this.dy*=-1;
    }
  }
  draw(ctx){
    ctx.beginPath();
    ctx.fillStyle=this.col;
    ctx.arc(this.x,this.y,this.rad,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }
}

class Engine{
  constructor(){
    this.prevTime=Date.now();
    this.lagTime=0;

    this.FPS=60;
    this.frameTime=(1/this.FPS);
    this.MPF=(this.frameTime*1000);
  }
  update(f=(t)=>{}){
    this.update=f;
  }
  draw(f=()=>{}){
    this.draw=f;
  }
  start(){
    window.requestAnimationFrame(()=>{
      this.start();
    });

    this.currTime=Date.now();
    this.elapsedTime=(this.currTime-this.prevTime);
    this.prevTime=this.currTime;
    this.lagTime+=this.elapsedTime;

    while(this.lagTime>=this.MPF){
      this.lagTime-=this.MPF;
      this.update(this.elapsedTime);
    }

    this.draw();
  }
}

function bgVidFn(){
  const hero=document.getElementById("_hero"),
  canvas=document.getElementById("_vid"),
  ctx=canvas.getContext("2d");

  let width=window.getComputedStyle(hero).getPropertyValue("width"),
  height=window.getComputedStyle(hero).getPropertyValue("height"),
  w=Number(width.slice(0,width.indexOf("p"))),h=Number(height.slice(0,height.indexOf("p")));
  canvas.width=w;
  canvas.height=h;

  const arcs=[];
  for(let i=0;i<100;++i){
    arcs.push(new Arc(w*Math.random(),h*Math.random(),2,"rgb(20,28,30"));
  }

  window.addEventListener("resize",()=>{
    width=window.getComputedStyle(hero).getPropertyValue("width"),
    height=window.getComputedStyle(hero).getPropertyValue("height"),
    w=Number(width.slice(0,width.indexOf("p"))),h=Number(height.slice(0,height.indexOf("p")));
    canvas.width=w;
    canvas.height=h;

    arcs.forEach(arc=>{
      arc.x=w*Math.random();
      arc.y=h*Math.random();
    });
  });

  const engine=new Engine();
  engine.update((t)=>{
    arcs.forEach((arc)=>{
      arc.update(w,h,t);
    })
  });
  engine.draw(()=>{
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<arcs.length;++i){
      for(let j=i+1;j<arcs.length;++j){
        if(arcs[i].distanceTo(arcs[j])<=100){
          ctx.beginPath();
          ctx.strokeStyle=`rgba(20,28,30, 1)`;
          ctx.moveTo(arcs[i].x,arcs[i].y);
          ctx.lineTo(arcs[j].x,arcs[j].y);
          ctx.stroke();
        }
      }
    }
    arcs.forEach((arc)=>{
      arc.draw(ctx);
    });
  });
  engine.start();
}
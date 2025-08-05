("use strict");

export default class Engine{
  constructor(fps=60){
    this.paused=false;
  
    this.prevTime=Date.now();
    this.lagTime=0;
    
    this.FPS=fps;
    this.frameTime=(1/this.FPS);
    this.MPF=(this.frameTime*1000);
  }
  start(){
    this.animationFrame=window.requestAnimationFrame(()=>{
      this.start.call(this);
    });
    
    this.currTime=Date.now();
    this.elapsedTime=(this.currTime-this.prevTime);
    this.prevTime=this.currTime;
    this.lagTime+=this.elapsedTime;
    
    while (this.lagTime>this.MPF) {
      this.lagTime-=this.MPF;
      this.update(this.elapsedTime/100);
    }
    this.draw()
  }
  draw(f=(ctx)=>{}){
    this.draw=f;
  }
  update(f=(time)=>{}){
    this.update=f;
  }
  pause(){
    this.paused=!this.paused;
  }
  stop(){
    window.cancelAnimationFrame(this.animationFrame);
    this.prevTime=Date.now();
    this.lagTime=0;
  }
}
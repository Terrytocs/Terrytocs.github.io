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
            this.start();
        });

        this.currTime=Date.now();
        this.elapsedTime=(this.currTime-this.prevTime);
        this.prevTime=this.currTime;
        this.lagTime+=this.elapsedTime;

        while(this.lagTime>=this.MPF){
            this.lagTime-=this.MPF;
            !this.paused&&this.update(this.elapsedTime);
        }

        !this.paused&&this.draw();
    }
    update(f=(t)=>{}){
        this.update=f;
    }
    draw(f=()=>{}){
        this.draw=f;
    }
    pause(){
        this.paused=!this.paused;
    }
    stop(){
        window.removeEventListener(this.animationFrame);
        this.paused=false;
        this.prevTime=Date.now();
        this.lagTime=0;
    }
}
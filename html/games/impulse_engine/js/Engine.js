("use strict");

export default class Engine{
    constructor(fps=60){
        this.prevTime=Date.now();
        this.lagTime=0;

        this.FPS=fps;
        this.frameTime=(1/this.FPS);
        this.updateInterval=this.frameTime;
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

        if(this.elapsedTime>1000)this.elapsedTime=this.frameTime;

        while(this.lagTime>=this.MPF){
            (this.lagTime-=this.MPF);
            this.update(this.updateInterval);
        }
        this.draw();
    }
}
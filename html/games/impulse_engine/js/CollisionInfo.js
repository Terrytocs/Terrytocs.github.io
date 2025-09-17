("use strict");

import Vec2 from "./Vec2.js";

export default class CollisionInfo{
    constructor(){
        this.depth=0;
        this.normal=new Vec2(0,0);
        this.start=new Vec2(0,0);
        this.end=new Vec2(0,0);
    }
    getDepth(){
        return this.depth;
    }
    getNormal(){
        return this.normal;
    }
    setNormal(v){
        this.normal=v;
    }
    setInfo(d,n,s){
        this.depth=d;
        this.normal=n;
        this.start=s;
        this.end=s.add(n.scale(d));
    }
    changeDir(){
        this.normal=this.normal.scale(-1);
        const start=this.start;
        this.start=this.end;
        this.end=start;
    }
}
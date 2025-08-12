("use strict");

export default class Vec2{
    static toPolar=(a,m)=>{
        return new Vec2(
            Math.cos(a)*m,
            Math.sin(a)*m
        );
    }
    constructor(x,y){
        this.set(x,y);
    }
    set(x,y){
        this.x=x;
        this.y=y;
    }
    get mag(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }
    get dir(){
        return Math.atan2(this.y,this.x);
    }
    dot(v){
        return (this.x*v.x+this.y*v.y);
    }
    add(v){
        return new Vec2(this.x+v.x,this.y+v.y);
    }
    add2(x,y){
        return new Vec2(this.x+x,this.y+y);
    }
    sub(v){
        return new Vec2(this.x-v.x,this.y-v.y);
    }
    sub2(x,y){
        return new Vec2(this.x-x,this.y-y);
    }
    scale(s){
        return new Vec2(this.x*s,this.y*s);
    }
    scale2(x,y){
        return new Vec2(this.x*x,this.y*y);
    }
    lerp(e,t){
        return this.add(e.sub(this).scale(t))
    }
    translate(a,m){
        return this.add(Vec2.toPolar(a,m));
    }
    distanceTo(v){
        return this.sub(v).mag;
    }
    rotate(c,a){
        var x,y,r;
        x=this.x-c.x;
        y=this.y-c.y;
        r=new Vec2(
            x*Math.cos(a)-y*Math.sin(a),
            x*Math.sin(a)+y*Math.cos(a)
        );
        return c.add(r);
    }
    intersectionTime(b,c,d){
        let ab,dc,ac,det,con,s,t;
        ab=b.sub(this);
        dc=c.sub(d);
        ac=c.sub(this);
        det=(ab.y*dc.x-ab.x*dc.y);
        if(det===0){
            return;
        }
        con=(ab.y*ac.x-abx*ac.y);
        s=(con/det);
        if(s<0||s>1){
            return;
        }
        if(ab.x!==0){
            t=(ac.x-(s*dc.x));
            t=(t/ab.x);
        }else{
            t=(ac.y-(s*dc.y));
            t=(t/ab.y);
        }
        if(t>=0&&t<=1){
            return t;
        }
        return;
    }
}
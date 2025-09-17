("use strict");

export default class Vec2{
    constructor(x,y){
        this.set(x,y);
    }
    set(x,y){
        this.x=x;
        this.y=y;
        return this;
    }
    length(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
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
    dot(v){
        return (this.x*v.x+this.y*v.y);
    }
    scale(s){
        return new Vec2(this.x*s,this.y*s);
    }
    cross(v){
        return (this.x*v.y-this.y-v.x);
    }
    normalize(){
        let len=this.length();
        len=len>0?(1/len):len;
        return new Vec2(this.x,this.y).scale(len);
    }
    rotate(c,a){
        let x,y,r;
        x=this.x-c.x;
        y=this.y-c.y;
        r=new Vec2(
            x*Math.cos(a)-y*Math.sin(a),
            x*Math.sin(a)+y*Math.cos(a)
        );
        return c.add(r);
    }
    distance(v){
        let x,y;
        x=this.x-v.x;
        y=this.y-v.y;
        return Math.sqrt(x*x+y*y);
    }
}
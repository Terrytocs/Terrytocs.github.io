('use strict');

export default class Vec3{
  static polar2D=(a,m)=>{
    return new Vec3(
      Math.cos(a)*m,
      Math.sin(a)*m
    );
  }
  constructor(x,y,z=0){
    this.set(x,y,z);
  }
  set(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
  get mag(){
    return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
  }
  get dir(){
    return Math.atan2(this.y,this.x);
  }
  get norm() {
    var len = this.mag;
    len = (len > 0) && (1 / len);
    return this.scale(len);
  }
  add(v){
    return new Vec3(this.x+v.x,this.y+v.y,this.z+v.z);
  }
  sub(v){
    return new Vec3(this.x-v.x,this.y-v.y,this.z-v.z);
  }
  scale(s){
    return new Vec3(this.x*s,this.y*s,this.z*s);
  }
  scale3(s1,s2,s3=0){
    return new Vec2(this.x*s1,this.y*s2,this.z*s3);
  }
  dot(v){
    return (this.x*v.x+this.y*v.y+this.z*this.z);
  }
  cross(v){
    return (this.x*v.y-this.y*v.x);
  }
  rotateX(c,a){
    var y, z, r;
    y = this.y - c.y;
    z = this.z - c.z;
    r = new Vec3(
      this.x,
      y * Math.cos(a) - z * Math.sin(a),
      y * Math.sin(a) + z * Math.cos(a)
    );
    return c.add(r);
  }
  rotateY(c,a){
    var x, z, r;
    x = this.x - c.x;
    z = this.z - c.z;
    r = new Vec3(
      z * Math.sin(a) + x * Math.cos(a),
      this.y,
      z * Math.cos(a) - x * Math.sin(a)
    );
    return c.add(r);
  }
  rotateZ(c,a){
    var x,y,r;
    x=this.x-c.x;
    y=this.y-c.y;
    r=new Vec3(
      x*Math.cos(a)-y*Math.sin(a),
      x*Math.sin(a)+y*Math.cos(a)
    );
    return c.add(r);
  }
  intersection(b,c,d){
    var aToB,dToC,aToC,det,con,s,t;
    
    aToB=b.sub(this);
    dToC=c.sub(d);
    aToC=c.sub(this);
    
    det=(aToB.y*dToC.x-aToB.x*dToC.y);
    
    if (det===0) {
      return null;
    }
    
    con=(aToB.y*aToC.x-aToB.x*aToC.y);
    s=(con/det);
    
    if (s<0||s>1) {
      return null;
    }
    
    if (aToB.x!==0) {
      t=((aToC.x-s*dToC.x)/aToB.x);
    }else{
      t=((aToC.y-s*dToC.y)/aToB.y);
    }
    if(t>=0&&t<=1){
      return {
        point:this.lerp(b,t),
        time:t,
      };
    }
    return null;
  }
  lerp(b,t){
    return new Vec2(lerp(this.x,b.x,t),lerp(this.y,b.y,t));
  }
  floor(){
    return new Vec3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
  }
  distanceTo(v) {
    const x= this.x - v.x;
    const y= this.y - v.y;
    const z= this.z - v.z;
    return Math.sqrt(x * x + y * y + z * z);
  }
}
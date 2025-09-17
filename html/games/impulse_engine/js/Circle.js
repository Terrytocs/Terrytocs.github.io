("use strict");

import RigidShape from "./RigidShape.js";

export default class Circle extends RigidShape{
    constructor(screen,center,radius){
        super(screen,center);
        this.type="Circle";
        this.radius=radius;
        this.boundRadius=radius;
        this.startPoint=center.sub2(0,radius);
    }
    move(v){
        this.startPoint=this.startPoint.add(v);
        this.center=this.center.add(v);
        return this;
    }
    rotate(a){
        this.angle+=a;
        this.startPoint=this.startPoint.rotate(this.center,a);
        return this;
    }
    collisionTest(otherShape,collisionInfo){
        let status=false;
        if(otherShape.type==="Circle")status=this.collidedCircCirc(this,otherShape,collisionInfo)
        else status=false;
        return status;
    }
    collidedCircCirc(c1,c2,collisionInfo){
        const   rSum=c1.radius+c2.radius,
                dist=vFrom1to2.length();
        let     vFrom1to2=c2.center.sub(c1.center);
        if(dist>rSum)return false;
        if(dist!==0){
            const   normalFrom2to1=vFrom1to2.scale(-1).normalize(),
                    radiusC2=normalFrom2to1.scale(c2.radius);
                    collisionInfo.setInfo(rSum-dist,vFrom1to2.normalize(),c2.center.add(radiusC2));
        }else{
            if(c1.radius>c2.radius)collisionInfo.setInfo(rSum,new Vec2(0,-1),c1.center.add(new Vec2(0,c1.radius)));
            else collisionInfo.setInfo(rSum,new Vec2(0,-1),c1.center.add(new Vec2(0,c1.radius)));
        }
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.center.x,this.center.y,this.radius,0,Math.PI*2,true);
        ctx.moveTo(this.startPoint.x,this.startPoint.y);
        ctx.lineTo(this.center.x,this.center.y);
        ctx.closePath();
        ctx.stroke();
    }
}
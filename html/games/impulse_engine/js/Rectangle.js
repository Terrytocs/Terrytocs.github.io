("use strict");

import CollisionInfo    from "./CollisionInfo.js";
import RigidShape       from "./RigidShape.js";

export default class Rectangle extends RigidShape{
    static setVertices(vertices,center,width,height){
        const [halfWidth,halfheight]=[Math.floor(width/2),Math.floor(height/2)];
        vertices[0]=center.add2(-halfWidth,-halfheight);
        vertices[1]=center.add2( halfWidth,-halfheight);
        vertices[2]=center.add2( halfWidth, halfheight);
        vertices[3]=center.add2(-halfWidth, halfheight);
    }
    static setFaceNormals(faceNormals,vertices){
        faceNormals[0]=vertices[1].sub(vertices[2]).normalize();
        faceNormals[1]=vertices[2].sub(vertices[3]).normalize();
        faceNormals[2]=vertices[3].sub(vertices[0]).normalize();
        faceNormals[3]=vertices[0].sub(vertices[1]).normalize();
    }

    constructor(screen,center,width,height,config={}){
        super(screen,center,config);
        this.type="Rectangle";
        this.width=width;
        this.height=height;
        this.vertices=[];
        this.faceNormals=[];
        this.boundRadius=Math.floor(Math.sqrt(width*width+height*height)/2);
        Rectangle.setVertices(this.vertices,center,width,height);
        Rectangle.setFaceNormals(this.faceNormals,this.vertices);
        this.updateInertia();
    }

    move(v){
        let i;
        for(i=0;i<this.vertices.length;++i){
            this.vertices[i]=this.vertices[i].add(v);
        }
        this.center=this.center.add(v);
        return this;
    }
    rotate(a){
        this.angle+=a;
        let i;
        for(i=0;i<this.vertices.length;++i){
            this.vertices[i]=this.vertices[i].rotate(this.center,a);
        }
        Rectangle.setFaceNormals(this.faceNormals,this.vertices);
        return this;
    }
    updateInertia(){
        if(this.invMass===0){
            this.inertia=0;
        }else{
            this.inertia=this.mass*(this.width*this.width+this.height*this.height)/12;
            this.inertia=1/this.inertia;
        }
    }
    collisionTest(otherShape,collisionInfo){
        let status=false;
        if(otherShape.type==="Circle")status=this.collidedRectCirc(otherShape,collisionInfo);
        else status=this.collidedRectRect(this,otherShape,collisionInfo);
        return status;
    }
    findSupportPoint(dir,ptOnEdge){
        let vToEdge,projection,tmpSupport={};
        tmpSupport.supportPointDistance=-9999999;
        tmpSupport.supportPoint=null;
        for(let i=0;i<this.vertices.length;++i){
            vToEdge=this.vertices[i].sub(ptOnEdge);
            projection=vToEdge.dot(dir);
            if((projection>0)&&(projection>tmpSupport.supportPointDistance)){
                tmpSupport.supportPoint=this.vertices[i];
                tmpSupport.supportPointDistance=projection;
            }
        }
        return tmpSupport;
    }
    findAxisLeastPenetration(otherRect,collisionInfo){
        let n,supportPoint,bestDistance,bestIndex,hasSupport,i,tmpSupport;
        bestDistance=9999999;
        bestIndex=null;
        hasSupport=true;
        i=0;
        while((hasSupport)&&(i<this.faceNormals.length)){
            n=this.faceNormals[i];
            let dir,ptOnEdge;
            dir=n.scale(-1);
            ptOnEdge=this.vertices[i];
            tmpSupport=otherRect.findSupportPoint(dir,ptOnEdge);
            hasSupport=(tmpSupport.supportPoint!==null);
            if((hasSupport)&&(tmpSupport.supportPointDistance<bestDistance)){
                bestDistance=tmpSupport.supportPointDistance;
                bestIndex=i;
                supportPoint=tmpSupport.supportPoint;
            }
            ++i;
        }
        if(hasSupport){
            let bestVec=this.faceNormals[bestIndex].scale(bestDistance);
            collisionInfo.setInfo(bestDistance,this.faceNormals[bestIndex],supportPoint.add(bestVec));
        }
        return hasSupport;
    }
    collidedRectRect(r1,r2,collisionInfo){
        let status1,status2,collisionInfoR1,collisionInfoR2;
        status1=false;
        status2=false;
        collisionInfoR1=new CollisionInfo();
        status1=r1.findAxisLeastPenetration(r2,collisionInfoR1);
        if(status1){
            collisionInfoR2=new CollisionInfo();
            status2=r2.findAxisLeastPenetration(r1,collisionInfoR2);
            if(status2){
                if(collisionInfoR1.getDepth()<collisionInfoR2.getDepth()){
                    let depthVec=collisionInfoR1.getNormal().scale(collisionInfoR1.getDepth());
                    collisionInfo.setInfo(collisionInfoR1.getDepth(),collisionInfoR1.getNormal(),collisionInfoR1.start.sub(depthVec));
                }else{
                    collisionInfo.setInfo(collisionInfoR2.getDepth(),collisionInfoR2.getNormal().scale(-1),collisionInfoR2.start);
                }
            }
        }
        return status1&&status2;
    }
    collidedRectCirc(circle,collisionInfo){
        let circ2Pos,v,projection,inside,bestDistance=0,nearestEdge;
        for(let i=0;i<4;++i){
            circ2Pos=circle.center;
            v=circ2Pos.sub(this.vertices[i]);
            projection=v.dot(this.faceNormals[i]);
            if(projection>0){
                bestDistance=projection;
                nearestEdge=i;
                inside=false;
                break;
            }
            if(projection<bestDistance){
                bestDistance=projection;
                nearestEdge=i;
            }
        }
        if(!inside){
            let v1,v2,dot,distance;
            v1=circ2Pos.sub(this.vertices[nearestEdge]);
            v2=this.vertices[(nearestEdge+1)%4].sub(this.vertices[nearestEdge]);
            dot=v1.dot(v2);
            if(dot<0){
                distance=v1.getMag();
                if(distance>circle.radius)return false;
                let normal,radiusVec;
                normal=v1.normalize();
                radiusVec=normal.scale(-circle.radius);
                collisionInfo.setInfo(circle.radius-distance,normal,circ2Pos.add(radiusVec));
            }else{
                v1=circ2Pos.sub(this.vertices[(nearestEdge+1)%4]);
                v2=v2.scale(-1);
                dot=v1.dot(v2);
                if(dot<0){
                    distance=v1.getMag();
                    if(distance>circle.radius)return false;
                    let normal,radiusVec;
                    normal=v1.normalize();
                    radiusVec=normal.scale(-circle.radius);
                    collisionInfo.setInfo(circle.radius-distance,normal,circ2Pos.add(radiusVec));
                }else{
                    if(bestDistance<circle.radius){
                        let radiusVec=this.faceNormals[nearestEdge].scale(-circle.radius);
                        collisionInfo.setInfo(circle.radius-bestDistance,this.faceNormals[nearestEdge],circ2Pos.add(radiusVec));
                    }else return false;
                }
            }
        }/*else{
            let radiusVec=this.faceNormals[nearestEdge].scale(-circle.radius);
            collisionInfo.setInfo(circle.radius-bestDistance,this.faceNormals[nearestEdge],circ2Pos.add(radiusVec));
        }*/
        return true;
    }
    draw(ctx){
        ctx.translate(this.vertices[0].x,this.vertices[0].y);
        ctx.rotate(this.angle);
        ctx.strokeRect(0,0,this.width,this.height);
        ctx.rotate(-this.angle);
        ctx.translate(-this.vertices[0].x,-this.vertices[0].y);
    }
}
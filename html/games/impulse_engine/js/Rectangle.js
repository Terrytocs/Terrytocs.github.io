("use strict");

import RigidShape from "./RigidShape.js";

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

    constructor(screen,center,width,height){
        super(screen,center);
        this.type="Rectangle";
        this.width=width;
        this.height=height;
        this.vertices=[];
        this.faceNormals=[];
        this.boundRadius=Math.floor(Math.sqrt(width*width+height*height)/2);
        Rectangle.setVertices(this.vertices,center,width,height);
        Rectangle.setFaceNormals(this.faceNormals,this.vertices);
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
    collisionTest(otherShape,collisionInfo){
        let status=false;
        if(otherShape.type==="Circle")status=false;
        else status=false;
        return status;
    }
    draw(ctx){
        ctx.translate(this.vertices[0].x,this.vertices[0].y);
        ctx.rotate(this.angle);
        ctx.strokeRect(0,0,this.width,this.height);
        ctx.rotate(-this.angle);
        ctx.translate(-this.vertices[0].x,-this.vertices[0].y);
    }
}
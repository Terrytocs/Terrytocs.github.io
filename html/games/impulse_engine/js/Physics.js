("use strict");

import CollisionInfo    from "./CollisionInfo.js";
import Vec2             from "./Vec2.js";

export default class Physics{
    static gravity=new Vec2(0,50);
    static movement=true;

    static positionalCorrectionFlag=true;
    static relaxationCount=15;
    static positionalCorrectionRate=0.8; 

    static collision(screen){
        const   {allObjects}=screen,
                collisionInfo=new CollisionInfo();
        let i,j,k;
        for(k=0;k<Physics.relaxationCount;++k){
            for(i=5;i<allObjects.length;++i){
                for(j=i+1;j<allObjects.length;++j){
                    if(allObjects[i].boundTest(allObjects[j])){
                        if(allObjects[i].collisionTest(allObjects[j],collisionInfo)){
                            Physics.resolveCollision(allObjects[i],allObjects[j],collisionInfo);
                            if(collisionInfo.getNormal().dot(allObjects[j].center.sub(allObjects[i].center))<0)collisionInfo.changeDir();
                        }
                    }
                }
            }
        }
    }
    static resolveCollision(s1,s2,collisionInfo){
        if((s1.invMass===0)&&(s2.invMass===0))return;

        if(Physics.positionalCorrectionFlag)Physics.positionalCorrection(s1,s2,collisionInfo);

        var n=collisionInfo.getNormal();
        var v1=s1.velocity;
        var v2=s2.velocity;
        var relativeVelocity=v2.sub(v1);
        var rVelocityInNormal=relativeVelocity.dot(n);

        if(rVelocityInNormal>0)return;

        var newRestitution=Math.min(s1.restitution,s2.restitution);
        var newFriction=Math.min(s1.friction,s2.friction);

        var jN=-(1+newRestitution)*rVelocityInNormal;
        jN=jN/(s1.invMass+s2.invMass);

        var impulse=n.scale(jN);
        s1.velocity=s1.velocity.sub(impulse.scale(s1.invMass));
        s2.velocity=s2.velocity.add(impulse.scale(s2.invMass));

        var tangent=relativeVelocity.sub(n.scale(relativeVelocity.dot(n)));
        tangent=tangent.normalize().scale(-1);

        var jT=-(1+newRestitution)*relativeVelocity.dot(tangent)*newFriction;
        jT=jT/(s1.invMass+s2.invMass);

        if(jT>jN)jT=jN;

        impulse=tangent.scale(jT);
        s1.velocity=s1.velocity.sub(impulse.scale(s1.invMass));
        s2.velocity=s2.velocity.add(impulse.scale(s2.invMass));

        var n=collisionInfo.getNormal();
        var start=collisionInfo.start.scale(s2.invMass/(s1.invMass+s2.invMass));
        var end=collisionInfo.end.scale(s1.invMass/(s1.invMass+s2.invMass));
        var p=start.add(end);
        var r1=p.sub(s1.center);
        var r2=p.sub(s2.center);

        var v1=s1.velocity.add(new Vec2(-1*s1.angularVelocity*r1.y,s1.angularVelocity*r1.x));
        var v2=s2.velocity.add(new Vec2(-1*s2.angularVelocity*r2.y,s2.angularVelocity*r2.x));
        var relativeVelocity=v2.sub(v1);
        var rVelocityInNormal=relativeVelocity.dot(n);

        var newFriction=Math.min(s1.friction,s2.friction);
        var R1crossN=r1.cross(n);
        var R2crossN=r2.cross(n);

        var jN=-(1+newRestitution)*rVelocityInNormal;
        jN=jN/(s1.invMass+s2.invMass+R1crossN*R1crossN*s1.inertia+R2crossN*R2crossN*s2.inertia);

        s1.angularVelocity-=R1crossN*jN*s1.inertia;
        s2.angularVelocity+=R2crossN*jN*s2.inertia;
        
        tangent=tangent.normalize().scale(-1);

        var R1crossT=r1.cross(tangent);
        var R2crossT=r2.cross(tangent);

        var jT=-(1+newRestitution)*relativeVelocity.dot(tangent)*newFriction;
        jT=jT/(s1.invMass+s2.invMass+R1crossT*R1crossT*s1.inertia+R2crossT*R2crossT*s2.inertia);

        s1.angularVelocity-=R1crossT*jT*s1.inertia;
        s2.angularVelocity+=R2crossT*jT*s2.inertia;
    }
    static positionalCorrection(s1,s2,collisionInfo){
        let s1InvMass,s2InvMass,num,correctionAmount;
        s1InvMass=s1.invMass;
        s2InvMass=s2.invMass;
        num=collisionInfo.getDepth()/(s1InvMass+s2InvMass)*Physics.positionalCorrectionRate;
        correctionAmount=collisionInfo.getNormal().scale(num);
        s1.move(correctionAmount.scale(-s1InvMass));
        s2.move(correctionAmount.scale(s2InvMass));
    }
    static drawCollisionInfo(collisionInfo,ctx){
        ctx.beginPath();
        ctx.moveTo(collisionInfo.start.x,collisionInfo.start.y);
        ctx.lineTo(collisionInfo.end.x,collisionInfo.end.y);
        ctx.stroke();
    }
}
("use strict");

import Physics  from "./Physics.js";
import Vec2     from "./Vec2.js";

export default class RigidShape{
    constructor(screen,center,config={}){
        const {mass,friction,restitution}=config;

        this.center=center;
        this.velocity=new Vec2(0,0);
        this.acceleration=Physics.gravity;
        
        this.angle=0;
        this.angularVelocity=0;
        this.angularAcceleration=0;

        this.inertia=0;

        //MASS
        if(mass!==undefined){
            this.mass=mass;
            this.invMass=mass;
        }
        else{
            this.mass=1;
            this.invMass=1;
        }

        //FRICTION
        if(friction!==undefined)this.friction=friction;
        else this.friction=0.8;

        //RESTITUTION
        if(restitution!==undefined)this.restitution=restitution;
        else this.restitution=0.2;

        //INVERSE MASS
        if(this.mass!==0){
            this.invMass=1/this.mass;
            this.acceleration=Physics.gravity;
        }else this.acceleration=new Vec2(0,0);

        this.boundRadius=0;

        screen.allObjects.push(this);
    }
    update(time){
        if(Physics.movement){
            this.velocity=this.velocity.add(this.acceleration.scale(time));
            this.move(this.velocity.scale(time));

            this.angularVelocity+=this.angularAcceleration*time;
            this.rotate(this.angularVelocity*time);
        }
    }
    updateMass(delta){
        this.mass+=delta;
        if(this.mass<=0){
            this.invMass=0;
            this.velocity=new Vec2(0,0);
            this.acceleration=new Vec2(0,0);
            this.angularVelocity=0;
            this.angularAcceleration=0;
        }else{
            this.invMass=1/this.mass;
            this.acceleration=Physics.gravity;
        }
        this.updateInertia();
    }
    updateInertia(){}
    boundTest(otherShape){
        const   vFrom1To2=otherShape.center.sub(this.center),
                rSum=this.boundRadius+otherShape.boundRadius,
                dist=vFrom1To2.getMag();
                if(dist>rSum)return false;
                return true;
    }
}
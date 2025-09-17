("use strict");

export default class RigidShape{
    constructor(screen,center){
        this.angle=0;
        this.center=center;
        this.boundRadius=0;
        
        screen.allObjects.push(this);
    }
    update(){}
    boundTest(otherShape){
        const   vFrom1To2=otherShape.center.sub(this.center),
                rSum=this.boundRadius+otherShape.boundRadius,
                dist=vFrom1To2.length();
                if(dist>rSum)return false;
                return true;
    }
}
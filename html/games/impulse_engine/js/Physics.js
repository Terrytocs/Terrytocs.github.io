("use strict");

import CollisionInfo from "./CollisionInfo.js";

export default class Physics{
    static collision(screen){
        const   {ctx,allObjects}=screen,
                collisionInfo=new CollisionInfo();
        let i,j;
        for(i=5;i<allObjects.length;++i){
            for(j=i+1;j<allObjects.length;++j){
                if(allObjects[i].boundTest(allObjects[j])){
                    if(allObjects[i].collisionTest(allObjects[j],collisionInfo)){
                        if(collisionInfo.getNormal().dot(allObjects[j].sub(allObjects[i]))<0){
                            collisionInfo.changeDir();
                        }
                    }
                }
            }
        }
    }
    static drawCollisionInfo(collisionInfo,ctx){

    }
}
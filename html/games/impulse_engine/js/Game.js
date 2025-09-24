("use strict");

import Rectangle    from "./Rectangle.js";
import Vec2         from "./Vec2.js";

export default class Game{
    constructor(screen){
        const   {width,height}=screen,
                [halfWidth,halfHeight]=[Math.floor(width/2),Math.floor(height/2)],
                config={mass:0};
        let     up,down,left,right,r1,r2;
                up=new Rectangle(screen,new Vec2(halfWidth,0),width,3,config);
                right=new Rectangle(screen,new Vec2(width,halfHeight),3,height,config);
                down=new Rectangle(screen,new Vec2(halfWidth,height),width,3,config);
                left=new Rectangle(screen,new Vec2(0,halfHeight),3,height,config);
                r1=new Rectangle(screen,new Vec2(halfWidth,halfHeight),3,3,config);
                r2=new Rectangle(screen,new Vec2(200,400),400,20,{mass:0,friction:1,restitution:0});
    }
}
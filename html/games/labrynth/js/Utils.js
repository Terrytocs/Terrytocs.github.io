("use strict");

import Vec2 from "./Vec2.js";

export default class Utils{
    static getMouse(e,elem){
        const rect=elem.getBoundingClientRect();
        return new Vec2(e.clientX-rect.left,e.clientY-rect.top);
    }
    static toRad(deg){
        return deg*(Math.PI/180);
    }
    static fixFisheye(rayAngle,entityAngle,distance){
        return distance*Math.cos(rayAngle-entityAngle);
    }
    static lerp(s,e,t){
        return s+(e-s)*t;
    }
}
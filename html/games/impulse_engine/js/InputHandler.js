("use strict");

import Vec2             from "./Vec2.js";
import Rectangle        from "./Rectangle.js";
import Circle           from "./Circle.js";

export default class InputHandler{
        static objectNum=4;

        static handleUserInput(e,screen){
                const   keycode=window.e?e.keyCode:e.which?e.which:null,
                        preventDefault=InputHandler.preventDefault(e,keycode),
                        keydownHandler=InputHandler.handleKeydown(keycode,screen);

        }

        static preventDefault(e,keycode){
                if(keycode===38||keycode===40)e.preventDefault();
        }

        static handleKeydown(keycode,screen){
                const {ctx,width,height,allObjects}=screen;
                //SPAWN OBJECTS
                if(keycode===70){//f
                        const r1=new Rectangle(screen,new Vec2(allObjects[this.objectNum].center.x,allObjects[this.objectNum].center.y),10+Math.random()*30,10+Math.random()*30);
                }
                if(keycode===71){//g
                        const c1=new Circle(screen,new Vec2(allObjects[this.objectNum].center.x,allObjects[this.objectNum].center.y),20+Math.random()*10);
                }

                //CHANGE SELECTED OBJECT
                if(keycode>=48&&keycode<=57){//numbers
                        if(keycode-48<allObjects.length)InputHandler.objectNum=keycode-48;
                }
                if(keycode===38){//up arrow
                        if(InputHandler.objectNum<allObjects.length-1)++InputHandler.objectNum;
                }
                if(keycode===40){//down arrow
                        if(InputHandler.objectNum>0)--InputHandler.objectNum;
                }

                //MOVE SELECTED OBJECT
                if(keycode===87){//w
                        allObjects[InputHandler.objectNum].move(new Vec2(0,-10));
                }
                if(keycode===83){//s
                        allObjects[InputHandler.objectNum].move(new Vec2(+0,10));
                }
                if(keycode===65){//a
                        allObjects[InputHandler.objectNum].move(new Vec2(-10,0));
                }
                if(keycode===68){//d
                        allObjects[InputHandler.objectNum].move(new Vec2(10,+0));
                }

                //ROTATE SELECTED OBJECT
                if(keycode===81){//q
                        allObjects[InputHandler.objectNum].rotate(-0.1);
                }
                if(keycode===69){//e
                        allObjects[InputHandler.objectNum].rotate(+0.1);
                }

                //NOT ASSIGNED
                if(keycode===72){//h

                }

                //RESET SCENE
                if(keycode===82){//r
                        allObjects.splice(5,allObjects.length);
                        InputHandler.objectNum=4;
                }
        }
}


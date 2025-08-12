("use strict");

import Enums from "./Enum.js";
import Entity from "./Entity.js";
import Images from "./Images.js";
import Animations from "./Animations.js";
import PlayerStateMachine from "./PlayerStateMachine/PlayerStateMachine.js";
import WeaponStateMachine from "./WeaponStateMachine/WeaponStateMachine.js";

export default class Player extends Entity{
    constructor(game,pos){
        super(game,pos);
        Object.assign(this,Enums.PlayerProperties)
        this.stateMachine=new PlayerStateMachine(this);
        this.weaponStateMachine=new WeaponStateMachine(this);

        
    }
    update(t){
        this.stateMachine[this.stateMachine.currentState].update(t);
        
        
        if(this.animationFrame>Animations.PlayerAnimations[this.weaponStateMachine.currentState].length-1){
            this.animationFrame=0;
        }else{
            this.animationFrame++;
        }
    }
}
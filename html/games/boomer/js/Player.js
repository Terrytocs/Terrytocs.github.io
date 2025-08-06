("use strict");

import Entity from "./Entity.js";
import {PlayerEnums, PlayerWeapons} from "./Enum.js";
import PlayerStateMachine from "./PlayerStateMachine.js";
import PlayerAnimations from "./PlayerAnimations.js";
import Textures from "./Textures.js";

export default class Player extends Entity {
    constructor(pos,config = {}) {
        super(pos); 
        Object.assign(this,PlayerEnums.PlayerData,config,PlayerWeapons.weapons,PlayerAnimations.data); // Assign default player data from Enums and any additional config
        this.stateMachine=new PlayerStateMachine(this); // Initialize the state machine for the player
    }
  
    update(deltaTime) {
        this.stateMachine.update(deltaTime); // Update the player's state machine
        this.currentWeapon=this.weapons[this.loadout[this.weaponIndex]];
        this.currentWeaponSprite=Textures.textures.types.sprites.player[this.currentWeapon.name];
        [this.currentFrame,this.frameOffset,this.animationFrameDelay]=this.frames.get(this.animations[this.currentWeapon.name][this.stateMachine.currentState][this.animationFrame]);

        (++this.animationTimer);
        if(this.animationTimer>this.animationFrameDelay){
            (this.animationTimer=0);
            if(this.animationFrame<this.animations[this.currentWeapon.name][this.stateMachine.currentState].length-1){
                (++this.animationFrame);
            }else{
                this.animationFrame=0;
            }
        }

        if(this.keys["w"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_FORWARD);
        }else if(this.keys["s"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_BACKWARD);
        }else if(this.keys["a"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_LEFT);
        }else if(this.keys["d"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_RIGHT);
        }else if(this.keys[" "]&&this.grounded){
            this.stateMachine.setState(PlayerEnums.PlayerStates.JUMPING);
        }else{
            if(this.stateMachine.currentState==="attacking"){
                //PUT LOGIC FOR GUN COOLDOWN (TBD). YOU CAN USE THE WEAPON COOLDOWN AS A TIMER
            }else{
                this.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
            }
        }

        this.headBob=this.enableHeadBob ? Math.sin(Date.now()/100)*4-this.pos.z*200 : 0; // Simple head bob effect

        this.currentWeapon.update(this.currentWeapon,this,deltaTime);
    }
  }
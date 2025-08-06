("use strict");

import {PlayerEnums} from "./Enum.js";
import Idle from "./PlayerStateMethods/Idle.js";
import MoveForward from "./PlayerStateMethods/MoveForward.js";
import MoveBackward from "./PlayerStateMethods/MoveBackward.js";
import MoveLeft from "./PlayerStateMethods/MoveLeft.js";
import MoveRight from "./PlayerStateMethods/MoveRight.js";
import Crouch from "./PlayerStateMethods/Crouch.js";
import Jump from "./PlayerStateMethods/Jump.js";
import Attack from "./PlayerStateMethods/Attack.js";
import WeaponSwitch from "./PlayerStateMethods/WeaponSwitch.js";
import PowerSlide from "./PlayerStateMethods/PowerSlide.js";
import Aim from "./PlayerStateMethods/Aim.js";
import Sprint from "./PlayerStateMethods/Sprint.js";
import Fall from "./PlayerStateMethods/Fall.js";

export default class PlayerStateMachine {
    constructor(player) {
      Object.assign(this, Idle.methods, MoveForward.methods, MoveBackward.methods, MoveLeft.methods, MoveRight.methods, Crouch.methods, Jump.methods, Attack.methods, WeaponSwitch.methods, PowerSlide.methods, Aim.methods, Sprint.methods, Fall.methods); // Assign methods from all state classes
        this.player = player;
        this.currentState = PlayerEnums.PlayerStates.IDLE;
        
        this.stateData = {
          [PlayerEnums.PlayerStates.IDLE]: {
            init: this.idleInit,
            update: this.idleUpdate,
            teardown: this.idleTeardown,
            transitions:[PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING, PlayerEnums.PlayerStates.SPRINTING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.MOVE_FORWARD]: {
            init: this.moveForwardInit,
            update: this.moveForwardUpdate,
            teardown: this.moveForwardTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD,PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.MOVE_BACKWARD]: {
            init: this.moveBackwardInit,
            update: this.moveBackwardUpdate,
            teardown: this.moveBackwardTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD,PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.MOVE_LEFT]: {
            init: this.moveLeftInit,
            update: this.moveLeftUpdate,
            teardown: this.moveLeftTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT,PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.MOVE_RIGHT]: {
            init: this.moveRightInit,
            update: this.moveRightUpdate,
            teardown: this.moveRightTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT,PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.CROUCHING]: {
            init: this.crouchInit,
            update: this.crouchUpdate,
            teardown: this.crouchTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.JUMPING]: {
            init: this.jumpInit,
            update: this.jumpUpdate,
            teardown: this.jumpTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.FALLING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.ATTACKING]: {
            init: this.attackInit,
            update: this.attackUpdate,
            teardown: this.attackTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.FALLING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.SWITCHING]: {
            init: this.weaponSwitchInit,
            update: this.weaponSwitchUpdate,
            teardown: this.weaponSwitchTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.SLIDING]: {
            init: this.powerSlideInit,
            update: this.powerSlideUpdate,
            teardown: this.powerSlideTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.AIM]: {  
            init: this.aimInit,
            update: this.aimUpdate,
            teardown: this.aimTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.SPRINTING]: {
            init: this.sprintInit,
            update: this.sprintUpdate,
            teardown: this.sprintTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING]
          },
          [PlayerEnums.PlayerStates.FALL]: {
            init: this.fallInit,
            update: this.fallUpdate,
            teardown: this.fallTeardown,
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.JUMPING]
          }
        };
        this.stateData[this.currentState].init(player);
    }
    get currentStateData() {
        return this.stateData[this.currentState];
    }
    setState(newState) {
        if (!this.currentStateData.transitions.includes(newState)) {
            //console.log("Transition not allowed from", this.currentState, "to", newState);
            return;
        }
            this.stateData[this.currentState].teardown(this.player); // Call teardown of the current state
            this.currentState = newState;
            this.stateData[newState].init(this.player);
    }
    update(deltaTime) {
        this.currentStateData.update(this.player,deltaTime);
    }
}
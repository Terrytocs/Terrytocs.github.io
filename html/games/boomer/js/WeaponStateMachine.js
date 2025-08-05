("use strict");

import {WeaponEnums} from "./Enum.js";
import Idle from "./WeaponStateMethods/Idle.js";
import Fire from "./WeaponStateMethods/Fire.js";
import Reload from "./WeaponStateMethods/Reload.js";
import Cooldown from "./WeaponStateMethods/Cooldown.js";
import WeaponSwitch from "./WeaponStateMethods/WeaponSwitch.js";

export default class WeaponStateMachine {
    constructor(weapon) {
        Object.assign(this, Idle.methods, Fire.methods, Reload.methods, Cooldown.methods, WeaponSwitch.methods); // Assign methods from state classes to the instance
        this.weapon = weapon; // Reference to the weapon instance
        this.currentState = WeaponEnums.WeaponStates.IDLE; // Initial state

        this.stateData = {
          [WeaponEnums.WeaponStates.IDLE]: {
            init: this.idleInit,
            update: this.idleUpdate,
            teardown: this.idleTeardown,
            transitions: [WeaponEnums.WeaponStates.FIRING, WeaponEnums.WeaponStates.RELOADING], // Possible transitions from this state
          },
          [WeaponEnums.WeaponStates.FIRING]: {
            init: this.fireInit,
            update: this.fireUpdate,
            teardown: this.fireTeardown,
            transitions: [WeaponEnums.WeaponStates.IDLE, WeaponEnums.WeaponStates.COOLDOWN], // Possible transitions from this state
          },
          [WeaponEnums.WeaponStates.COOLDOWN]: {
            init: this.cooldownInit,
            update: this.cooldownUpdate,
            teardown: this.cooldownTeardown,
            transitions: [WeaponEnums.WeaponStates.IDLE, WeaponEnums.WeaponStates.FIRING, WeaponEnums.WeaponStates.RELOADING], // Possible transitions from this state
          },
          [WeaponEnums.WeaponStates.RELOADING]: {
            init: this.reloadInit,
            update: this.reloadUpdate,
            teardown: this.reloadTeardown,
            transitions: [WeaponEnums.WeaponStates.IDLE, WeaponEnums.WeaponStates.FIRING, WeaponEnums.WeaponStates.COOLDOWN], // Possible transitions from this state
          },
          [WeaponEnums.WeaponStates.SWITCHING]: {
            init: this.switchInit,
            update: this.switchUpdate,
            teardown: this.switchTeardown,
            transitions: [WeaponEnums.WeaponStates.IDLE, WeaponEnums.WeaponStates.FIRING, WeaponEnums.WeaponStates.RELOADING], // Possible transitions from this state
          },
        }; // Data specific to the current state
        this.stateData[this.currentState].init(weapon, null); // Initialize the current state
    }
    // Get the current state
    get currentStateData() {
      return this.stateData[this.currentState];
    }

    //change state
    setState(newState) {
        if (!this.currentStateData.transitions.includes(newState)) {
          console.log("Transition not allowed from", this.currentState, "to", newState);
          return; // Prevent transition if it's not allowed
        }
        this.stateData[this.currentState].teardown(this.weapon, null); // Teardown the current state
        this.currentState = newState; // Change to the new state
        this.stateData[this.currentState].init(this.weapon, null); // Initialize the new state
    }
    // update state
    update(player,deltaTime) {
      const nextState = this.currentStateData.update(this.player, deltaTime); // Call update of the current state
      if(typeof nextState==="string"){
          this.setState(nextState); // Change state if nextState is a valid state string
      }else {
          this.currentStateData.update(player,deltaTime); // Call update of the current state
      }
    }
  }
  
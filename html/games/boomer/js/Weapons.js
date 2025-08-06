("use strict");

import {WeaponEnums} from "./Enum.js";
import WeaponStateMachine from "./WeaponStateMachine.js";

export default class Weapon {
    constructor(name, config) {
        Object.assign(this,config); // Assign any additional configuration to the weapon
        this.name = name; // Name of the weapon
        this.state = WeaponEnums.WeaponStates.IDLE; // Initial state of the weapon
        this.stateMachine = new WeaponStateMachine(this); // Initialize the state machine for the weapon
    }
  
    update(player, delta) {
        this.stateMachine.update(player,delta);
    }
}
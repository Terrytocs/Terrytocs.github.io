("use strict");

import Entity from "./Entity.js";
import {EnemyEnums} from "./Enum.js";
import EnemyStateMachine from "./EnemyStateMachine.js";

export default class Enemy extends Entity {
    constructor(pos, config = {}) {
        super(pos); // Call the parent constructor with the position
        Object.assign(this, EnemyEnums.EnemyData,config); // Assign default enemy data from Enums
        this.stateMachine = new EnemyStateMachine(this,this.player); // Initialize the state machine for the enemy
    }

    update(deltaTime) {
        // Update logic for the enemy, e.g., movement, state changes
        this.stateMachine.update(deltaTime); // Update the enemy's state machine
    }
}
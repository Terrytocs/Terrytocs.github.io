("use strict");

import {EnemyEnums} from "./Enum.js";
import Idle from "./EnemyStateMethods/Idle.js";
import Patrol from "./EnemyStateMethods/Patrol.js";
import Attack from "./EnemyStateMethods/Attack.js";
import Die from "./EnemyStateMethods/Die.js";

export default class EnemyStateMachine {
    constructor(enemy,player) {
        Object.assign(this, Idle.methods, Patrol.methods, Attack.methods, Die.methods); // Assign methods from different states to the instance
        this.enemy = enemy; // Reference to the enemy instance
        this.player = player; // Reference to the player instance
        this.currentState = EnemyEnums.EnemyStates.IDLE; // Initial state of the enemy
        
        this.stateData = {
            [EnemyEnums.EnemyStates.IDLE]: {
                init: this.idleInit.bind(this),
                update: this.idleUpdate.bind(this),
                teardown: this.idleTeardown.bind(this),
                transitions: [EnemyEnums.EnemyStates.PATROLLING, EnemyEnums.EnemyStates.ATTACKING], // Possible transitions from idle state
            },
            [EnemyEnums.EnemyStates.PATROLLING]: {
                init: this.patrollingInit.bind(this),
                update: this.patrollingUpdate.bind(this),
                teardown: this.patrollingTeardown.bind(this),
                transitions: [EnemyEnums.EnemyStates.IDLE, EnemyEnums.EnemyStates.ATTACKING],
            },
            [EnemyEnums.EnemyStates.ATTACKING]: {
                init: this.attackingInit.bind(this),
                update: this.attackingUpdate.bind(this),
                teardown: this.attackingTeardown.bind(this),
                transitions: [EnemyEnums.EnemyStates.IDLE, EnemyEnums.EnemyStates.DYING],
            },
            [EnemyEnums.EnemyStates.DYING]: {
                init: this.dyingInit.bind(this),
                update: this.dyingUpdate.bind(this),
                teardown: this.dyingTeardown.bind(this),
                transitions: [],
            },
        }; // Data specific to the current state
        this.stateData[this.currentState].init(this.enemy); // Initialize the current state
    }

    get currentStateData() {
        // Return the data for the current state
        return this.stateData[this.currentState];
    }

    setState(newState){
        // Change to a new state if the transition is allowed
        if (!this.currentStateData.transitions.includes(newState)) {
            console.log("Transition not allowed from", this.currentState, "to", newState);
            return;
        }
            this.stateData[this.currentState].teardown(this.enemy); // Teardown the current state
            this.currentState = newState; // Change to the new state
            this.stateData[this.currentState].init(this.enemy); // Initialize the new state
        
    }

    update(deltaTime) {
        // Update logic based on the current state
        const nextState = this.currentStateData.update(this.player, deltaTime); // Call update of the current state
        if(typeof nextState==="string"){
            this.setState(nextState); // Change state if nextState is a valid state string
        }else {
            this.currentStateData.update(this.player,deltaTime); // Call update of the current state
        }
    }
}
("use strict");

import Enums from "../Enum.js";
import Idle from "./Idle.js";
import Walk_Forward from "./Walk_Forward.js";
import Walk_Backward from "./Walk_Backward.js";
import Walk_Left from "./Walk_Left.js";
import Walk_Right from "./Walk_Right.js";
import Walk_Forward_Left from "./Walk_Forward_Left.js";
import Walk_Forward_Right from "./Walk_Forward_Right.js";
import Walk_Backward_Left from "./Walk_Backward_Left.js";
import Walk_Backward_Right from "./Walk_Backward_Right.js";

export default class PlayerStateMachine{
    constructor(player){
        Object.assign(this,Idle.methods,Walk_Forward.methods,Walk_Backward.methods,Walk_Left.methods,Walk_Right.methods,Walk_Forward_Left.methods,Walk_Forward_Right.methods,Walk_Backward_Left.methods,Walk_Backward_Right.methods);

        this.states={
            [Enums.PlayerStates.IDLE]:{
                init:this.init_idle,
                update:this.update_idle,
                exit:this.exit_idle,
                transitions:[]
            },
            [Enums.PlayerStates.WALK_FORWARD]:{
                init:this.init_walk_forward,
                update:this.update_walk_forward,
                exit:this.exit_walk_forward,
                transitions:[]
            },
            [Enums.PlayerStates.WALK_BACKWARD]:{
                init:this.init_walk_backward,
                update:this.update_walk_backward,
                exit:this.exit_walk_backward,
                transitions:[]
            },
            [Enums.PlayerStates.WALK_LEFT]:{
                init:this.init_walk_left,
                update:this.update_walk_left,
                exit:this.exit_walk_left,
                transitions:[]
            },
            [Enums.PlayerStates.WALK_RIGHT]:{
                init:this.init_walk_right,
                update:this.update_walk_right,
                exit:this.exit_walk_right,
                transitions:[]
            },
            [Enums.PlayerStates.WALK_FORWARD_LEFT]:{
                init:this.init_walk_forward_left,
                update:this.update_walk_forward_left,
                exit:this.exit_walk_forward_left,
                transitions:[]
            },
            [Enums.PlayerStates.WALK_FORWARD_Right]:{
                init:this.init_walk_forward_right,
                update:this.update_walk_forward_right,
                exit:this.exit_walk_forward_right,
                transitions:[]
            },
            [Enums.PlayerStates.WALK_BACKWARD_LEFT]:{
                init:this.init_walk_backward_left,
                update:this.update_walk_backward_left,
                exit:this.exit_walk_backward_left,
                transitions:[]
            },
            [Enums.PlayerStates.WALK_BACKWARD_RIGHT]:{
                init:this.init_walk_backward_right,
                update:this.update_walk_backward_right,
                exit:this.exit_walk_backward_right,
                transitions:[]
            }
        }

        this.currentState=Enums.PlayerStates.IDLE;
        this.states[this.currentState].init();
    }
    changeState(newState){
        if(!this.currentState.transitions.includes(newState))return;
    }
    update(t){}
}
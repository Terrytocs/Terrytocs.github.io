("use strict");

export default class Enums{

    //GAME
    static GameStates={
        
    };

    //PLAYER
    static PlayerStates={
        IDLE:"idle",
        WALK_FORWARD:"walk-forward",
        WALK_BACKWARD:"walk=backward",
        WALK_LEFT:"walk-left",
        WALK_RIGHT:"walk-right",
        WALK_FORWARD_RIGHT:"walk-forward-right",
        WALK_FORWARD_LEFT:"walk-forward-left",
        WALK_BACKWARD_LEFT:"walk-backward-left",
        WALK_BACKWARD_RIGHT:"walk-backward-right"
    }

    static PlayerProperties={
        inventory:[]
    }

    //WEAPON
    static WeaponStates={
        IDLE:"idle",
        MOVE:"move",
        FIRE:"fire",
        RELOAD:"reload"
    }

    static WeaponList={
        PISTOL:{
            max_clip:9,
            damage:10
        },
        SGUN:{
            max_clip:2,
            damage:30,
            fire_mode:[1,2]
        }
    }
}
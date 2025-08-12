("use strict");

import Enums from "../Enum.js";
import Idle from "./Idle.js";
import Move from "./Move.js";
import Fire from "./Fire.js";
import Reload from "./Reload.js";

export default class WeaponStateMachine{
    constructor(player){
        Object.assign(this,Idle.methods,Move.methods,Fire.methods,Reload.methods);

        this.states={
            
        };

        
    }

}
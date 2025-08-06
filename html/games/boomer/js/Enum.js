("use strict");

import Vec3 from "./Vec3.js";
import Weapon from "./Weapons.js";

export class Enums{
    static EntityData = {
        health: 100,
        maxHealth: 100,
        dir: new Vec3(0, 0, 0),
        vel: new Vec3(0, 0, 0),
        isDead: false,
        spriteType:null,
        frame: 0,
    };

    static PlayerData = {
        jumpStrength: -0.15,
        grounded:true,
        stamina: 100,
        maxStamina: 100,
        currentWeaponIndex: 0,
        speed:5,
        sprintSpeed: 5,
        weaponFrame: 0,
        keys:{},
        FOV:60,
        headBob: 0,
        enableHeadBob: false,
        animationTimer:0,
        animationFrame:0,
        weaponIndex:0,
    };
    
    static EnemyData = {
        speed: 1,
        damage: 10,
        attackRange: 2,
    };

    static WeaponStates = {
        IDLE: "idle",
        MOVING: "moving",
        FIRING: "firing",
        COOLDOWN: "cooldown",
        RELOADING: "reloading",
        SWITCHING: "switching",
    };

    static PlayerStates={
        IDLE: "idle",
        MOVE_FORWARD: "move_forward",
        MOVE_BACKWARD: "move_backward",
        MOVE_LEFT: "move_left",
        MOVE_RIGHT: "move_right",
        CROUCHING: "crouching",
        JUMPING: "jumping",
        ATTACKING: "attacking",
        RELOADING: "reloading",
        SWITCHING: "switching",
        SLIDING: "sliding",
        AIM: "aim",
        SPRINTING: "sprinting",
        FALL:"falling"
    };

    static EnemyStates = {
        IDLE: "idle",
        PATROLLING: "patrolling",
        ATTACKING: "attacking",
        DYING: "dying",
    };

    static GameState = {
        PLAYING: "playing",
        PAUSED: "paused",
        GAME_OVER: "game_over",
    };
}

export class EnemyEnums extends Enums {
    static EnemyData = {
        ...Enums.EnemyData,
    };
    static EnemyStates = {
        ...Enums.EnemyStates,
    };
}

export class EntityEnums extends Enums {
    static EntityData = {
        ...Enums.EntityData,
    };
}

export class PlayerEnums extends Enums {
    static PlayerData = {
        ...EntityEnums.PlayerData,
        
    };

    static PlayerStates = {
        ...EntityEnums.PlayerStates,
    };
}

export class WeaponEnums extends Enums {
    static WeaponStates = {
        ...EntityEnums.WeaponStates,
    };
}

export class PlayerWeapons {
    static weapons={
        weapons:{
            pistol: new Weapon("Pistol", {
                type: "ranged",
                damage: 20,
                range: 50,
                cooldown: 3,
                reloadTime: 1.5,
                ammo: 12,
                maxAmmo: 12,
                isAutomatic: false,
                isReloading: false,
                isFiring: false,
                altFire: false,
                hasItem: true, // Pistol is not in inventory by default
            }),
            shotgun: new Weapon("Shotgun", {
                type: "ranged",
                damage: 50,
                range: 20,
                cooldown: 1.0,
                reloadTime: 2.5,
                ammo: 8,
                maxAmmo: 8,
                isAutomatic: false,
                isReloading: false,
                isFiring: false,
                altFire: false,
                hasItem: false, // Shotgun is not in inventory by default
            }),
        },
        loadout: [
            "pistol",
            "shotgun",
        ],
        inventory:["Pistol"],
    };
}
("use strict");

import { PlayerEnums } from "./Enum.js";

export default class PlayerAnimations{
    static data={
        frames:new Map([
            //PISTOL ANIMATIONS
            //IDLE
            ["pistol-idle-1",[[0,0,242,357],[144,239,144,240],60]],
            ["pistol-idle-2",[[0,0,242,357],[144,235,144,240],60]],

            //MOVING
            ["pistol-move-1",[[0,0,242,357],[144,239,144,240],10]],
            ["pistol-move-2",[[0,0,242,357],[145,235,144,240],10]],
            ["pistol-move-3",[[0,0,242,357],[150,235,144,240],10]],
            ["pistol-move-4",[[0,0,242,357],[155,239,144,240],10]],
            ["pistol-move-5",[[0,0,242,357],[150,235,144,240],10]],
            ["pistol-move-6",[[0,0,242,357],[145,235,144,240],10]],

            //Reload
            ["pistol-reload-1",[[0,0,72,120],[145,235,144,240],10]],
            ["pistol-reload-2",[[0,0,72,120],[145,235,144,240],10]],
            ["pistol-reload-3",[[0,0,72,120],[145,235,144,240],10]],
            ["pistol-reload-4",[[0,0,72,120],[145,235,144,240],10]],
            ["pistol-reload-5",[[0,0,72,120],[145,235,144,240],10]],

            //Pistol
            ["pistol-fire-1",[[80,0,72,120],[145,235,144,240],5]],
            ["pistol-fire-2",[[190,0,72,120],[145,235,144,240],5]],

            //SHOTGUN ANIMATIONS
            //IDLE
            ["shotgun-idle-1",[[0,0,72,120],[144,239,144,240],60]],
            ["shotgun-idle-2",[[0,0,72,120],[144,235,144,240],60]],

            //MOVING
            ["shotgun-move-1",[[0,0,72,120],[144,239,144,240],10]],
            ["shotgun-move-2",[[0,0,72,120],[145,235,144,240],10]],
            ["shotgun-move-3",[[0,0,72,120],[150,235,144,240],10]],
            ["shotgun-move-4",[[0,0,72,120],[155,239,144,240],10]],
            ["shotgun-move-5",[[0,0,72,120],[150,235,144,240],10]],
            ["shotgun-move-6",[[0,0,72,120],[145,235,144,240],10]],

            //Reload
            ["shotgun-reload-1",[[0,0,72,120],[145,235,144,240],10]],
            ["shotgun-reload-2",[[0,0,72,120],[145,235,144,240],10]],
            ["shotgun-reload-3",[[0,0,72,120],[145,235,144,240],10]],
            ["shotgun-reload-4",[[0,0,72,120],[145,235,144,240],10]],
            ["shotgun-reload-5",[[0,0,72,120],[145,235,144,240],10]],

            //Pistol
            ["shotgun-fire-1",[[0,0,72,120],[145,235,144,240],10]],
            ["shotgun-fire-2",[[0,0,72,120],[145,235,144,240],10]],
            ["shotgun-fire-3",[[0,0,72,120],[145,235,144,240],10]],
            ["shotgun-fire-4",[[0,0,72,120],[145,235,144,240],10]],
        ]),
        animations:{
            Pistol:{
                //IDLE
                [PlayerEnums.PlayerStates.IDLE]:["pistol-idle-1","pistol-idle-2"],

                //MOVING
                [PlayerEnums.PlayerStates.MOVE_FORWARD]:["pistol-move-1","pistol-move-2","pistol-move-3","pistol-move-4","pistol-move-5","pistol-move-6"],
                [PlayerEnums.PlayerStates.MOVE_FORWARD_LEFT]:["pistol-move-1","pistol-move-2","pistol-move-3","pistol-move-4","pistol-move-5","pistol-move-6"],
                [PlayerEnums.PlayerStates.MOVE_FORWARD_RIGHT]:["pistol-move-1","pistol-move-2","pistol-move-3","pistol-move-4","pistol-move-5","pistol-move-6"],
                [PlayerEnums.PlayerStates.MOVE_BACKWARD]:["pistol-move-1","pistol-move-2","pistol-move-3","pistol-move-4","pistol-move-5","pistol-move-6"],
                [PlayerEnums.PlayerStates.MOVE_BACKWARD_LEFT]:["pistol-move-1","pistol-move-2","pistol-move-3","pistol-move-4","pistol-move-5","pistol-move-6"],
                [PlayerEnums.PlayerStates.MOVE_BACKWARD_RIGHT]:["pistol-move-1","pistol-move-2","pistol-move-3","pistol-move-4","pistol-move-5","pistol-move-6"],
                [PlayerEnums.PlayerStates.MOVE_LEFT]:["pistol-move-1","pistol-move-2","pistol-move-3","pistol-move-4","pistol-move-5","pistol-move-6"],
                [PlayerEnums.PlayerStates.MOVE_RIGHT]:["pistol-move-1","pistol-move-2","pistol-move-3","pistol-move-4","pistol-move-5","pistol-move-6"],

                //ATTACKING
                [PlayerEnums.PlayerStates.ATTACKING]:["pistol-fire-1","pistol-fire-2"],

                //RELOADING
                [PlayerEnums.PlayerStates.RELOADING]:["reload-1","reload-2","reload-3","reload-4","reload-5"],
            },
            Shotgun:{
                //IDLE
                [PlayerEnums.PlayerStates.IDLE]:["shotgun-idle-1","shotgun-idle-2"],

                //MOVING
                [PlayerEnums.PlayerStates.MOVE_FORWARD]:["shotgun-move-1","shotgun-move-2","shotgun-move-3","shotgun-move-4","shotgun-move-5","shotgun-move-6"],
                [PlayerEnums.PlayerStates.MOVE_BACKWARD]:["shotgun-move-1","shotgun-move-2","shotgun-move-3","shotgun-move-4","shotgun-move-5","shotgun-move-6"],
                [PlayerEnums.PlayerStates.MOVE_LEFT]:["shotgun-move-1","shotgun-move-2","shotgun-move-3","shotgun-move-4","shotgun-move-5","shotgun-move-6"],
                [PlayerEnums.PlayerStates.MOVE_RIGHT]:["shotgun-move-1","shotgun-move-2","shotgun-move-3","shotgun-move-4","shotgun-move-5","shotgun-move-6"],

                //ATTACKING
                [PlayerEnums.PlayerStates.ATTACKING]:["shotgun-fire-1","shotgun-fire-2","shotgun-fire-3","shotgun-fire-4"],

                //RELOADING
                [PlayerEnums.PlayerStates.RELOADING]:["shotgun-reload-1","shotgun-reload-2","shotgun-reload-3","shotgun-reload-4","shotgun-reload-5"],
            },
        }
    };
}
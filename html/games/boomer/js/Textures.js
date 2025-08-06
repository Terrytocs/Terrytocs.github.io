("use strict");

export default class Textures {
    static textures = {
        types: {
            walls:{
                1:document.getElementById("Bricks_01_128x128"),
                2:document.getElementById("Bricks_02_128x128"),
                3:document.getElementById("Bricks_03_128x128"),
                4:document.getElementById("Bricks_04_128x128"),
                5:document.getElementById("Bricks_05_128x128"),
                6:document.getElementById("Bricks_06_128x128"),
                7:document.getElementById("Bricks_07_128x128"),
                8:document.getElementById("Bricks_08_128x128"),
                9:document.getElementById("Bricks_09_128x128"),
                10:document.getElementById("Bricks_10_128x128"),
                11:document.getElementById("Bricks_11_128x128"),
                12:document.getElementById("Bricks_12_128x128"),
                13:document.getElementById("Bricks_13_128x128"),
                14:document.getElementById("Bricks_14_128x128"),
                15:document.getElementById("Bricks_15_128x128"),
                16:document.getElementById("Bricks_16_128x128"),
                17:document.getElementById("Bricks_17_128x128"),
                18:document.getElementById("Bricks_18_128x128"),
                19:document.getElementById("Bricks_19_128x128"),
                20:document.getElementById("Bricks_20_128x128"),
                21:document.getElementById("Bricks_21_128x128"),
                22:document.getElementById("Bricks_22_128x128"),
                23:document.getElementById("Bricks_23_128x128"),
                24:document.getElementById("Bricks_24_128x128"),
                25:document.getElementById("Bricks_25_128x128"),
            },
            sprites:{
                enemy:[],
                player:{
                    Pistol:document.getElementById("PIST2"),
                    Shotgun:document.getElementById("Sgun")
                },
            },
            floor:[
                document.getElementById("Bricks_03_128x128"),
            ],
            ceiling:[
                document.getElementById("Bricks_03_128x128"),
            ],
        }
    }
}
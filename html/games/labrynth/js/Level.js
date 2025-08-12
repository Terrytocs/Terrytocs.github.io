("use strict");

import Vec2 from "./Vec2.js";

export default class Level{
    static size=new Vec2(49,39);
    static tileSize=64;
    static scaleFactor=277;

    //1. BUILD MAZE - REQUIRES MAZE TO HAVE EMPTY CELLS WITH WALLS BETWEEN EACH CELL
    static preMaze=Array.from({length:this.size.y-2},(_,i)=>{
        if(i%2===0){
            return Array.from({length:this.size.x-1},(_,i)=>{
                if(i%2===1){
                    return 1;
                }else{
                    return 0;
                };
            });
        }else{
            return Array(this.size.x-1).fill(1);
        }
    });

    //2. CREATES WALL AROUND PERIMETER OF MAZE
    static get postMaze(){
        this.preMaze.forEach((cell)=>{
            cell.unshift(1);
        });
        this.preMaze.unshift(Array(this.size.x).fill(1));
        this.preMaze.push(Array(this.size.x).fill(1));
        return [this.preMaze];
    }

    static maze=this.postMaze.pop();
    static endPoints=[[1,1],[this.maze.length-2,this.maze[0].length-2]];
    static path=[];

    //3. REMOVES WALLS BETWEEN EMPTY CELLS IN MAZE
    static createMaze=(maze,startCell,endCell,path)=>{
        if(path.length===0)path.push(JSON.stringify(startCell));
        let currentCell=JSON.parse(path[path.length-1]);
        let neighborList,topNeighbor,bottomNeighbor,leftNeighbor,rightNeighbor;
        topNeighbor=[currentCell[0]-2,currentCell[1]];
        bottomNeighbor=[currentCell[0]+2,currentCell[1]];
        leftNeighbor=[currentCell[0],currentCell[1]-2];
        rightNeighbor=[currentCell[0],currentCell[1]+2];
        neighborList=[topNeighbor,bottomNeighbor,leftNeighbor,rightNeighbor];
        if(topNeighbor[0]<=0&&neighborList.includes(topNeighbor))neighborList.splice(neighborList.indexOf(topNeighbor),1);
        if(bottomNeighbor[0]>=(maze.length-1)&&neighborList.includes(bottomNeighbor))neighborList.splice(neighborList.indexOf(bottomNeighbor),1);
        if(leftNeighbor[1]<=0&&neighborList.includes(leftNeighbor))neighborList.splice(neighborList.indexOf(leftNeighbor),1);
        if(rightNeighbor[1]>=(maze[0].length-1)&&neighborList.includes(rightNeighbor))neighborList.splice(neighborList.indexOf(rightNeighbor),1);

        for(let i=0;i<neighborList.length;++i){
            neighborList[i]=neighborList[Math.floor(Math.random()*(neighborList.length))];
        }
        
        neighborList.forEach((cell)=>{
            if(!path.includes(JSON.stringify(cell))){
                path.push(JSON.stringify(cell));
                if(cell===topNeighbor){
                    maze[topNeighbor[0]+1][topNeighbor[1]]=0;
                }
                if(cell===bottomNeighbor){
                    maze[bottomNeighbor[0]-1][bottomNeighbor[1]]=0;
                }
                if(cell===leftNeighbor){
                    maze[leftNeighbor[0]][leftNeighbor[1]+1]=0;
                }
                if(cell===rightNeighbor){
                    maze[rightNeighbor[0]][rightNeighbor[1]-1]=0;
                }
                this.createMaze(maze,startCell,endCell,path);
            }
        });
        if(!path.includes(JSON.stringify(endCell))){
            path.shift();
            this.createMaze(maze,startCell,endCell,path);
        }
        return maze;
    }

    //ARRAY POSITION METHODS
    static getPos=(arrayPosition,level)=>{
        const {x,y}=arrayPosition;
        return level[y][x];
    }
    static outOfBounds(arrayPosition,level){
        const {x,y}=arrayPosition;
        return y<0||y>=level.length||x<0||x>=level[y].length;
    }

    //ENTITY POSITION METHODS
    static isWall(entityPosition,level){
        return this.getPos(entityPosition.scale(1/this.tileSize),level)!==0;
    }
    static isNotWall(entityPosition,level){
        return this.getPos(entityPosition.scale(1/this.tileSize),level)===0;
    }
    
    constructor(){
        const {maze,endPoints,path}=Level;
        this.maze=Level.createMaze(maze,endPoints[0],endPoints[1],path);
    }
}
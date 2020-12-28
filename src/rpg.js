import React, { Component } from 'react'
import mapImg from './image/map.png';
import UserImg from './image/yuusya.png';
import GoalImg from './image/goal.png';
import './rpg.css';

var map = [
    [0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
    [0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
    [0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
    [1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
    [0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
    [0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
    [0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
    [0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
    [1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
    [1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
    [1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
    [1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
    [0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
    [0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
    [0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
    [1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
    [0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
    [0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
    [0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
    [0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0]
];

export default class Snow extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            MoveX:0,
            MoveY:0,
            GoalX:-1300,
            GoalY:-1300
        };
    }
    componentDidMount(){
        document.addEventListener(
            "keydown",
            this.handleKeyDown,
        );
        this.intervalId = setInterval(()=>{
            this.DoCanvas();
        }, 200);
    }

    componentWillUnmount() {
        document.removeEventListener(
          "keydown",
          this.handleKeyDown,
        );
     }
   
     handleKeyDown = (e: KeyboardEvent) => {
       switch (e.key) {
         case "Left": // IE/Edge specific value
         case "ArrowLeft":
           this.keyboardLeft();
           break;
         case "Right": // IE/Edge specific value
         case "ArrowRight":
            this.keyboardRight();
           break;
         case "Up": // IE/Edge specific value
         case "ArrowUp":
              this.keyboardUp();

            break;
         case "Down": // IE/Edge specific value
         case "ArrowDown":
              this.keyboardDown();
            break;
        default:
            console.log("key Error");
            break;
       }
     };
   
     keyboardRight = () => {
       var {MoveX} = this.state;
       var {MoveY} = this.state;
       if(map.length-1 > MoveX){
           if(map[MoveY][MoveX+1] === 0){
                MoveX += 1;
           }
       }
       this.setState({MoveX:MoveX})
     };

     keyboardLeft = () => {
        var {MoveX} = this.state;
        var {MoveY} = this.state;
        if(0 < MoveX){
            if(map[MoveY][MoveX-1] === 0){
                MoveX -= 1;
            }
        }
        this.setState({MoveX:MoveX})
      };

      keyboardUp = () => {
        var {MoveX} = this.state;
        var {MoveY} = this.state;
        if(0 < MoveY){
            if(map[MoveY-1][MoveX] === 0){
                MoveY -= 1;
            }
        }
        this.setState({MoveY:MoveY})
      };
 
      keyboardDown = () => {
         var {MoveX} = this.state;
         var {MoveY} = this.state;
         if((map.length-1 > MoveY)){
             if(map[MoveY+1][MoveX] === 0){
                MoveY += 1;
             }
        }
         this.setState({MoveY:MoveY})
       };

    DoCanvas = () =>{
        var img = new Image();
        img.src = mapImg;

        var usrimg = new Image();
        usrimg.src = UserImg;

        var goalimg = new Image();
        goalimg.src = GoalImg;

        const {MoveX} = this.state;
        const {MoveY} = this.state;

        var canvas = document.getElementById('canvas');
        
        canvas.width=640;
        canvas.height=640;
        var ctx = canvas.getContext('2d');

        for (var y = 0; y<map.length;y++){
            for(var x=0; x<map.length;x++){
                if(map[y][x] === 0){
                    ctx.drawImage(img,0,0,32,32,32*x,32*y,32,32);
                }else{
                    ctx.drawImage(img,32,0,32,32,32*x,32*y,32,32);
                }
            }
        }

        ctx.drawImage(goalimg,0,0,32,32,(map.length-1)*32,(map.length-1)*32,32,32);

        ctx.drawImage(usrimg,0,0,32,32,MoveX*32,MoveY*32,32,32);

        if((MoveX === map.length-1) && (MoveY === map.length-1)){
            this.setState({GoalX:100})
            this.setState({GoalY:30})
        }
    }

    render () {
        const {GoalX} = this.state;
        const {GoalY} = this.state;

        return(
            <div>
                <canvas id="canvas"></canvas>
                <p className="goal" style={{left:GoalX, top:GoalY}}>Goal</p>
            </div>
        )
    }
}
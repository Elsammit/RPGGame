import React, { Component } from 'react'
import Monster from './image/monstar.png';
import './battle.css'

var menu_id = 0;

export default class Battle extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            xx:0,
            yy:0,
            usrparam:[350,100,30,30,30,30,50],   // HP,MP,Atk,Def,SpAtk,SpDef,Speed,Lv
            enemyparam:[60,5,100,10,5,5,10,1],     // HP,MP,Atk,Def,SpAtk,SpDef,Speed,Lv
        };
    }
    componentDidMount(){
        console.log("pp:"+this.props.location.state);
        console.log("x:"+this.props.location.state.xx+", y:"+this.props.location.state.yy);
        this.setState({xx:this.props.location.state.xx});
        this.setState({yy:this.props.location.state.yy});
        this.props.location.state = undefined;

        document.addEventListener(
            "keydown",
            this.handleKeyDown,
        );
        this.activeMenu(1);
    }

    componentWillUnmount() {
        document.removeEventListener(
          "keydown",
          this.handleKeyDown,
        );
        menu_id = 0;
    }

    handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
                document.getElementById("game_control").value = "←";
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
                document.getElementById("game_control").value = "→";
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
                document.getElementById("game_control").value = "↑";
                if (menu_id <= 1) {
                    this.activeMenu(5);
                } else {
                    this.activeMenu(menu_id - 1);
                }
                break;
            case "Down": // IE/Edge specific value
            case "ArrowDown":
                document.getElementById("game_control").value = "↓";
                if (menu_id >= 5) {
                    this.activeMenu(1);
                } else {
                    this.activeMenu(menu_id + 1);
                }
                break;
            case "Enter":
                this.doCommand(menu_id);
                break;
            default:
                console.log("key Error");
                break;
            }
      };

    activeMenu = (id) =>{
	    if (menu_id === id) {
		    this.doCommand(id);
	    } else {
		    if (menu_id !== 0) {
			    document.getElementById('menu' + menu_id).className = 'menu';
		    }
		    document.getElementById('menu' + id).className = 'menu menu-active';
		    menu_id = id;
	    }
    }
    
    //コマンドの実行
    doCommand = (command_id) => {
	    document.getElementById("game_control").value = "コマンド番号:" + command_id;
	    switch (command_id) {
		    case 1: //たたかう
			    this.DoAttack();
                break;
            case 2: //たたかう
			    document.getElementById('message').innerHTML = '<span class="message">残念！  まほうを覚えていない！</span>';
                break;
		    case 3: //ぼうぎょ
			    document.getElementById('message').innerHTML = '<span class="message">AAAは みをまもっている！</span>';
			    break;
		    case 4: //どうぐ
			    document.getElementById('message').innerHTML = '<span class="message">しかし　なにももっていなかった。</span>';
			    break;
		    case 5: //にげる
                document.getElementById('message').innerHTML = '<span class="message">AAAたちは戦闘から逃げた！！</span>';
                setTimeout(this.DoEscape, 2000);
                break;
		    default:
			    break;
	    }
    }

    DoEscape = () =>{
        this.props.history.push({
            pathname:'/Rpg',
            state: {xx:this.state.xx,yy:this.state.yy+1}
        });
    }

    DoAttack = () =>{
        var usrparam = this.state.usrparam.slice();
        var enemyparam = this.state.enemyparam.slice();
        var damege = usrparam[2] - enemyparam[3];
        console.log("usr:"+usrparam[2]+" enemy:"+enemyparam[3]+"damege:"+damege);
        document.getElementById('message').innerHTML = '<span class="message">AAAの こうげき！  '+ damege + 'のダメージ</span>';
        if(enemyparam[0]-damege <=0){
            setTimeout(this.KnockDown, 1000);
        }else{
            enemyparam[0] -= damege;
            this.setState({enemyparam:enemyparam});
            console.log("enemyHP:"+enemyparam[0]);
            setTimeout(this.DoAtkEnemy, 1000);
        }
        
    }

    DoAtkEnemy = () =>{
        var usrparam = this.state.usrparam.slice();
        var enemyparam = this.state.enemyparam.slice();
        var damege = enemyparam[2] - usrparam[3];      
        document.getElementById('message').innerHTML = '<span class="message">ハナカマキリのこうげき！  '+ damege + 'のダメージ</span>';
        if(usrparam[0]-damege <=0){
            setTimeout(this.KnockDown, 1000);
        }else{
            usrparam[0] -= damege;
            this.setState({usrparam:usrparam});
        }
    }

    KnockDown = () =>{
        document.getElementById('message').innerHTML = '<span class="message">ハナカマキリを倒した。</span>';
        setTimeout(this.DoEscape, 2000);
    }

    statusTable = () =>{
        const param = this.state.usrparam.slice();
        return(
            <div>
                <table className="status" cellPadding="5px">
                    <tr>
                        <th>名前</th>
                        <th>AAA</th>
                        <th>BBB</th>
                    </tr>
                    <tr>
                        <td>HP</td>
                        <td>{param[0]}</td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <td>MP</td>
                        <td>{param[1]}</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>Lv</td>
                        <td>{param[5]}</td>
                        <td>30</td>
                    </tr>
                </table>
            </div>
        );
    }

    render () {
        return(
            <div className="game_window">
                <div>
                    {this.statusTable()}
                </div>
                <div className="game_menu">
                    <div id="menu1" class="menu">たたかう</div>
                    <div id="menu2" class="menu">まほう</div>
                    <div id="menu3" class="menu">ぼうぎょ</div>
                    <div id="menu4" class="menu">どうぐ</div>
                    <div id="menu5" class="menu">にげる</div>
                </div>
                <div className="game_enemy">
                    <img className="enemyImg" alt="ハナカマキリ" src={Monster} width="200px"/>
                    <span className="monsmessage">ハナカマキリが現れた</span>
                    <div id="message">
                        <span className="message">敵が現れた</span>
                    </div>
                </div>
                <div>
                    <input type="text" id="game_control" />
                </div>
            </div>
        )
    }
}
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

import dispatcher from "./dispatcher"
import {EventType} from "./consts"

@ccclass
export class client extends cc.Component {

    private result: boolean = false;
    private lvl: number = 1;
    private play_time: number = 0;

    constructor() {
        super();
        dispatcher.add_dispatch(EventType.EVENT_GAME_OVER_2, this.on_game_over, this);
    },

    init(): void {
    },

    on_game_over(result: boolean, lvl: number, play_time: number) : void {
        this.result = result;
        this.lvl = lvl;
        this.play_time = play_time;
    },

    get_result(): boolean {
        return this.result;
    },
    
    get_lvl(): number {
        return this.lvl;
    },

    get_play_time(): number {
        return this.play_time;
    }
}

var client_mgr = new client();
export default client_mgr; 

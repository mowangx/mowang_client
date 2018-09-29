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

import dispatcher from "./../logic/dispatcher"
import {EventType} from "./../logic/consts"

@ccclass
export default class tail_info extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property(Boolean)
    game_over_flag: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.player_node = this.player.getComponent('player');
        this.game_over_flag = false;
        dispatcher.add_dispatch(EventType.EVENT_GAME_OVER_1, this.on_game_over, this);
    },

    // update (dt) {},

    on_click_lvl_1(): void 
    {
        if (this.game_over_flag) {
            return;
        }
        this.player_node.ready_start(1);
    },

    on_click_lvl_2(): void 
    {
        if (this.game_over_flag) {
            return;
        }
        this.player_node.ready_start(2);
    },

    on_click_lvl_3(): void 
    {
        if (this.game_over_flag) {
            return;
        }
        this.player_node.ready_start(3);
    },

    on_click_lvl_4(): void 
    {
        if (this.game_over_flag) {
            return;
        }
        this.player_node.ready_start(4);
    },

    on_click_lvl_5(): void 
    {
        if (this.game_over_flag) {
            return;
        }
        this.player_node.ready_start(5);
    },

    on_game_over(): void {
        this.game_over_flag = true;
    }
}

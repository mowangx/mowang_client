import dispatcher from "../logic/dispatcher";

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
import client_mgr from "./../logic/client"

@ccclass
export default class head_info extends cc.Component {

    @property(cc.Label)
    time_label: cc.Label = null;

    private play_time: number = 0;

    private lvl_desc: string = "";

    @property(cc.Button)
    flag_btn: cc.Button = null;

    private game_over: boolean = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        dispatcher.add_dispatch(EventType.EVENT_GAME_OVER, this.on_game_over, this)
        this.init_head();
    },

    // update (dt) {},

    init_head(): void {
        console.log("init head info 2222222");
        this.game_over = false;
        this.play_time = 0;
        this.unschedule(this.on_1_minute_timer);
        this.schedule(this.on_1_minute_timer, 1);
        this.time_label.string = '00:00';
    },

    get_lvl_desc(): string {
        if (client_mgr.get_lvl() == 1) {
            return "挑战入门\r\n";
        }
        else if (client_mgr.get_lvl() == 2) {
            return "挑战精英\r\n";
        }
        else if (client_mgr.get_lvl() == 3) {
            return "挑战大师\r\n";
        }
        else if (client_mgr.get_lvl() == 4) {
            return "挑战史诗\r\n";
        }
        else {
            return "挑战传奇\r\n";
        }
    },

    on_1_minute_timer(): void {
        this.play_time += 1;
        let minute = Math.floor(this.play_time / 60);
        let second = this.play_time % 60;
        if (minute < 10) {
            if (second < 10) {
                this.time_label.string = '0' + minute + ':0' + second;
            }
            else{
                this.time_label.string = '0' + minute + ':' + second;
            }
        }
        else {
            if (second < 10) {
                this.time_label.string = '' + minute + ':0' + second;
            }
            else{
                this.time_label.string = '' + minute + ':' + second;
            }
        }
    },

    on_click_back_btn(): void {
        if (this.game_over) {
            return;
        }
        cc.director.loadScene("start");
    },

    on_cick_flag_btn(): void {
        if (this.game_over) {
            return;
        }
        dispatcher.dispatch(EventType.EVENT_CLICK_FLAG_BTN);
    },

    on_game_over(result: boolean) {
        this.game_over = true;
        this.unschedule(this.on_1_minute_timer);
        client_mgr.set_result(result);
        client_mgr.set_play_time(this.play_time);
    },
}

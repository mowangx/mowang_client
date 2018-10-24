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

    @property(Number)
    play_time: number = 0;

    @property(String)
    lvl_desc: string = "";

    @property(cc.Button)
    open_btn: cc.Button = null;

    @property(cc.Button)
    flag_btn: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        dispatcher.add_dispatch(EventType.EVENT_GAME_OVER, this.on_game_over, this)
        dispatcher.add_dispatch(EventType.EVENT_START_GAME, this.on_start_game, this);
    },

    // update (dt) {},

    init_head(): void {
        this.play_time = 0;
        this.unschedule(this.on_1_minute_timer);
        this.schedule(this.on_1_minute_timer, 1);
        this.time_label.string = this.get_lvl_desc() + '00:00';
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
                this.time_label.string = this.get_lvl_desc() + '0' + minute + ':0' + second;
            }
            else{
                this.time_label.string = this.get_lvl_desc() + '0' + minute + ':' + second;
            }
        }
        else {
            if (second < 10) {
                this.time_label.string = this.get_lvl_desc() + minute + ':0' + second;
            }
            else{
                this.time_label.string = this.get_lvl_desc() + minute + ':' + second;
            }
        }
    },

    on_click_back_btn(): void {
        cc.director.loadScene("start");
    },

    on_click_open_btn(): void {
        this.open_btn.interactable = false;
        this.flag_btn.interactable = true;
        dispatcher.dispatch(EventType.EVENT_CLICK_OPEN_BTN);
    },

    on_cick_flag_btn(): void {
        this.open_btn.interactable = true;
        this.flag_btn.interactable = false;
        dispatcher.dispatch(EventType.EVENT_CLICK_FLAG_BTN);
    },

    on_game_over(result: boolean) {
        this.unschedule(this.on_1_minute_timer);
        this.open_btn.node.active = false;
        this.flag_btn.node.active = false;
        client_mgr.set_result(result);
        client_mgr.set_play_time(this.play_time);
    },

    on_start_game(): void {
        this.open_btn.node.active = true;
        this.flag_btn.node.active = true;
        if (this.open_btn.interactable) {
            this.open_btn.interactable = false;
        }
        if (!this.flag_btn.interactable) {
            this.flag_btn.interactable = true;
        }
        this.init_head();
    },
}

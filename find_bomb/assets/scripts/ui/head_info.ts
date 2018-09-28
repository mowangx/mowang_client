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

@ccclass
export default class head_info extends cc.Component {

    @property(cc.Label)
    lvl_label: cc.Label = null;

    @property(cc.Label)
    time_label: cc.Label = null;

    @property(Number)
    play_time: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        dispatcher.add_dispatch(EventType.EVENT_GAME_OVER_1, this.on_game_over, this)

    },

    // update (dt) {},

    init_head(lvl: number): void {
        this.play_time = 0;
        this.unschedule(this.on_1_minute_timer);
        this.schedule(this.on_1_minute_timer, 1);
        let lvl_desc = ''
        if (lvl == 1) {
            lvl_desc = '入门';
        }
        else if (lvl == 2) {
            lvl_desc = '精英';
        }
        else if (lvl == 3) {
            lvl_desc = '大师';
        }
        else if (lvl == 4) {
            lvl_desc = '史诗';
        }
        else if (lvl == 5) {
            lvl_desc = '传奇';
        }

        this.lvl_label.string = '挑战:' + lvl_desc;
        this.time_label.string = '00:00';
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

    on_click_bomb_btn(): void {
        dispatcher.dispatch(EventType.EVENT_CLICK_BOMB_BTN);
    }

    on_game_over(result: boolean, lvl: number) {
        dispatcher.dispatch(EventType.EVENT_GAME_OVER_2, result, lvl, this.play_time);
    }
}

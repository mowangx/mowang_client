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

import client_mgr from "./../logic/client"

@ccclass
export default class result extends cc.Component {

    @property(cc.Node)
    result_info: cc.Node = null;

    @property(cc.Node)
    title_info: cc.Node = null;

    @property(cc.Node)
    content_info: cc.Node = null;

    @property(cc.Node)
    back_info: cc.Node = null;

    @property(cc.Label)
    result_label: cc.Label = null;

    @property(cc.Label)
    content_label_1: cc.Label = null;

    @property(cc.Label)
    content_label_2: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.result_label.string = "扫雷结果"
        if (client_mgr.get_result()) {
            this.content_label_1.string = "恭喜成功排除所有地雷, 通关时间: " + client_mgr.get_play_time();
            if (client_mgr.get_lvl() < 5) {
                this.content_label_2.string = "解锁下一等级: " + this.get_next_lvl_desc();
            }
        }
        else {
            this.content_label_1.string = "很遗憾, 敌人过于狡猾, 未能排除所有地雷";
        }
    },

    // update (dt) {},

    get_next_lvl_desc(): String {
        let lvl = client_mgr.get_lvl();
        if (lvl == 1) {
            return "精英";
        }
        else if (lvl == 2) {
            return "大师";
        }
        else if (lvl == 3) {
            return "史诗";
        }
        else if (lvl == 4) {
            return "传奇";
        }
        return "";
    }

    on_click_btn(): void {
        cc.director.loadScene("game");
    }
}

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import client_mgr from "./../logic/client"

@ccclass
export default class start_game extends cc.Component {

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    on_click_lvl_1() {
        client_mgr.set_lvl(1);
        cc.director.loadScene("game");
    },

    on_click_lvl_2() {
        client_mgr.set_lvl(2);
        cc.director.loadScene("game");
    },

    on_click_lvl_3() {
        client_mgr.set_lvl(3);
        cc.director.loadScene("game");
    },

    on_click_lvl_4() {
        client_mgr.set_lvl(4);
        cc.director.loadScene("game");
    },

    on_click_lvl_5() {
        client_mgr.set_lvl(5);
        cc.director.loadScene("game");
    },
}

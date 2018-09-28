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
export default class player extends cc.Component {

    @property(cc.Node)
    head_info: cc.Node = null;

    @property(cc.Node)
    body_info: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        this.head_node = this.head_info.getComponent("head_info");
        this.body_node = this.body_info.getComponent("body_info");
        this.ready_start(client_mgr.get_lvl());
    },

    // update (dt) {},

    ready_start(lvl: number): void {
        this.head_node.init_head(lvl);
        this.body_node.init_body(lvl);
    },
}

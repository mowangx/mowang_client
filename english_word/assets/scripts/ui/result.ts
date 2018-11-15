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
import dispatcher from "./../logic/dispatcher"
import {EventType} from "./../logic/consts"

@ccclass
export default class result extends cc.Component {

    @property(cc.Label)
    content_label: cc.Label = null;

    @property(cc.Node)
    rank_node: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    // update (dt) {
    // },

    on_click_continue(): void {
        let cur_section = client_mgr.get_cur_section();
        cur_section += 1;
        let max_section = client_mgr.get_max_section();
        if (cur_section > client_mgr.get_max_section() && max_section < client_mgr.get_last_word_section()) {
            max_section += 1;
            client_mgr.set_max_section(max_section);
            client_mgr.set_cur_section(cur_section);
        }
        cc.director.loadScene("study");
    },

    on_click_share(): void {
        client_mgr.share_game();
    },

    init_panel(result: number): void {
        let content_desc = "恭喜完成挑战成功:" + result + "个单词";
        this.content_label.string = content_desc;
        
        // wx.getOpenDataContext().postMessage({
        //     lvl: client_mgr.get_lvl(),
        //     play_time: play_game_time
        // });

        console.log("send play msg to sub contnet");
        
        this.rank_node.runAction(cc.moveTo(0.5, 0.5, 0));
    },
}

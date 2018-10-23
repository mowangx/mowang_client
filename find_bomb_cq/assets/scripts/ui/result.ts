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

    @property(cc.Label)
    content_label: cc.Label = null;

    @property(cc.Node)
    rank_node: cc.Node = null;

    //private tex: cc.Texture2D = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //this.tex = new cc.Texture2D();
        this._show = cc.moveTo(0.5, 0, 50);
    },

    // update (dt) {
    //     this.updaet_sub_domain_canvas();
    // },

    on_click_continue(): void {
        cc.director.loadScene("game");
    },

    on_click_share(): void {
        
    },

    init_panel(result: boolean): void {
        let content_desc = "";
        if (result) {
            content_desc = "用时: " + client_mgr.get_play_time();
        } 
        else {
            content_desc = "您踩到屎了\r\n祝您天天走狗屎运!";
        }
        this.content_label.string = content_desc;
        
        wx.getOpenDataContext().postMessage({
            lvl: client_mgr.get_lvl(),
            play_time: client_mgr.get_play_time()
        });
        
        this.rank_node.runAction(this._show);
    },

    // updaet_sub_domain_canvas (): void {
    //     // if (!this.tex) {
    //     //     return;
    //     // }
    //     // var openDataContext = wx.getOpenDataContext();
    //     // var sharedCanvas = openDataContext.canvas;
    //     // this.tex.initWithElement(sharedCanvas);
    //     // this.tex.handleLoadedTexture();
    //     // this.rank_node.spriteFrame = new cc.SpriteFrame(this.tex);
    // },
}

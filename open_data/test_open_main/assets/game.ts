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

@ccclass
export default class game extends cc.Component {

    @property(cc.Node)
    display: cc.Node = null;

    private first_flag: boolean = false;
    private tex: cc.Texture2D = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this._show = cc.moveTo(0.5, 0, 110);
        this.tex = new cc.Texture2D();
        wx.getOpenDataContext().postMessage({
            message: "User info get success."    
        });
        this.display.runAction(this._show);
    },

    // update (dt) {
    //     this._update_sub_domain_canvas();
    // },

    // _update_sub_domain_canvas () {
    //     if (!this.tex) {
    //         return;
    //     }
    //     var openDataContext = wx.getOpenDataContext();
    //     var sharedCanvas = openDataContext.canvas;
    //     this.tex.initWithElement(sharedCanvas);
    //     this.tex.handleLoadedTexture();
    //     this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    // },
}

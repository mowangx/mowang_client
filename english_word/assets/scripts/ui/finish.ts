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
export default class finish extends cc.Component {

    @property(cc.Label)
    desc_label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.desc_label.string = '         头条新闻\r\n\r\n       恭喜学习完成' + 
        this.get_level_desc() + '的所有单词！请继续加油！\r\n特发此证！！ ！\r\n       by 爱记英语单词';
    },

    get_level_desc():string {
        let lvl = client_mgr.get_lvl();
        if (lvl == 1) {
            return '小学';
        }
        else if (lvl == 2) {
            return '初中';
        }
        else if (lvl == 3) {
            return '高中';
        }
        else if (lvl == 4) {
            return '四级';
        }
        else {
            return '六级';
        }
    },

    // update (dt) {}

    on_click_study(): void {
        cc.director.loadScene("start");
    },

    on_click_share(): void {
        client_mgr.share_game();
    },
}

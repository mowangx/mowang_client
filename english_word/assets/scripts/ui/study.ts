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
import word_1_mgr from "./../logic/word_x_1"

@ccclass
export default class study extends cc.Component {

    @property(cc.Label)
    word_label: cc.Label = null;

    @property(cc.Node)
    pass_node: cc.Node = null;

    @property(cc.Prefab)
    pass_fight_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    unpass_fight_prefab: cc.Prefab = null;

    private pass_fight_node: cc.Node = null;
    private unpass_fight_node: cc.Node = null;
    private hide_node: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.pass_fight_node = cc.instantiate(this.pass_fight_prefab);
        this.unpass_fight_node = cc.instantiate(this.unpass_fight_prefab);
        word_1_mgr.init();
        let word_idx = 0;
        client_mgr.set_word_idx(word_idx);
        this.show_words(word_idx);
    }

    // update (dt) {}

    on_click_last(): void {
        let word_idx = client_mgr.get_word_idx();
        if (word_idx == 0) {
            cc.director.loadScene("jump");
        }
        else {
            word_idx -= 1;
            client_mgr.set_word_idx(word_idx);
            this.show_words(word_idx);
        }
    },

    on_click_share(): void {
        client_mgr.share_game();
    },

    on_click_fight(): void {
        cc.director.loadScene("game");
    },

    on_click_next(): void {
        let word_idx = client_mgr.get_word_idx();
        if (word_idx == 2) {
            cc.director.loadScene("jump");
        }
        else {
            word_idx += 1;
            client_mgr.set_word_idx(word_idx);
            this.show_words(word_idx);
        }
    },

    on_click_back(): void {
        cc.director.loadScene("start");
    },

    show_words(idx: number): void {
        let replace_node = null;
        if (client_mgr.is_pass_fight(idx)) {
            replace_node = this.pass_fight_node;
        }
        else {
            replace_node = this.unpass_fight_node;
        }
        replace_node.parent = this.pass_node;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = this.pass_node.width;
        replace_node.height = this.pass_node.height;

        let word_desc = word_1_mgr.words_1[idx][0];
        word_desc += '\r\n' + word_1_mgr.words_1[idx][1];
        word_desc += '\r\n' + word_1_mgr.words_1[idx][2];
        this.word_label.string = word_desc;
    },
}

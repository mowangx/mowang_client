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
import wx_mgr from "../logic/wx_wrapper";

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

    @property(cc.Node)
    unit_info: cc.Node = null;

    @property(cc.Sprite)
    tips_sprit: cc.Sprite = null;

    @property(cc.Sprite)
    guide_next_sprite: cc.Sprite = null;

    private unit_node:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.pass_fight_node = cc.instantiate(this.pass_fight_prefab);
        this.unpass_fight_node = cc.instantiate(this.unpass_fight_prefab);
        this.unit_node = this.unit_info.getComponent("unit");
        this.unit_node.show_unit();
        this.show_words(0);
        if (client_mgr.is_guide()) {
            this.tips_sprit.enabled = false;
            this.guide_next_sprite.enabled = true;
        } else {
            this.tips_sprit.enabled = true;
            this.guide_next_sprite.enabled = false;
        }
    },

    // update (dt) {}

    on_click_last(): void {
        this.clear_sound();
        let word_idx = client_mgr.get_cur_word_idx();
        if (word_idx == 0) {
            if (client_mgr.is_guide()) {
                return;
            }

            let cur_section = client_mgr.get_cur_section();
            if (cur_section == 1) {
                return;
            }

            cur_section -= 1;
            this.update_section(cur_section);
            word_idx = client_mgr.get_max_word_idx();
        }
        word_idx -= 1;
        this.show_words(word_idx);
    },

    on_click_share(): void {
        client_mgr.share_game();
    },

    on_click_fight(): void {
        cc.director.loadScene("game");
    },

    on_click_next(): void {
        this.clear_sound();
        let word_idx = client_mgr.get_cur_word_idx();
        word_idx += 1;
        if (word_idx == client_mgr.get_max_word_idx()) {
            if (client_mgr.is_guide()) {
                cc.director.loadScene("jump");
                return;
            }
            
            let cur_section = client_mgr.get_cur_section()
            if (cur_section == client_mgr.get_history_section()) {
                cc.director.loadScene("jump");
                return;
            }

            cur_section += 1;
            this.update_section(cur_section);
            word_idx = 0;
        }
        this.show_words(word_idx);
    },

    update_section(cur_section: number): void {
        client_mgr.set_cur_section(cur_section);
        this.unit_node.show_unit();
    },

    on_click_back(): void {
        this.clear_sound();
        cc.director.loadScene("start");
    },

    on_click_sound(): void {
        let sound_data = client_mgr.get_sound_data();
        if (sound_data) {
            cc.audioEngine.play(sound_data, false, 1);
        }
        else {
            let word_idx = client_mgr.get_cur_word_idx();
            let real_idx = client_mgr.get_real_word_idx(word_idx);
            let sound_url = 'https://fanyi.baidu.com/gettts?lan=en&spd=3&text=' + client_mgr.get_word_info(real_idx, 0);
            cc.loader.load({url: sound_url, type: 'mp3'}, function (err, data) {
                if (err) {
                    return;
                }

                cc.audioEngine.play(data, false, 1);
                client_mgr.set_sound_data(data);
            });
        }
    },

    clear_sound(): void {
        let sound_data = client_mgr.get_sound_data();
        if (sound_data) {
            cc.loader.release(sound_data);
            client_mgr.set_sound_data(null);
        }
    },

    show_words(idx: number): void {
        client_mgr.set_cur_word_idx(idx);
        let real_idx = client_mgr.get_real_word_idx(idx);

        let replace_node = null;
        let replace_hide_node = null;
        if (client_mgr.is_word_pass(idx)) {
            replace_node = this.pass_fight_node;
            replace_hide_node = this.unpass_fight_node;
        }
        else {
            replace_node = this.unpass_fight_node;
            replace_hide_node = this.pass_fight_node;
        }
        this.replace_node_parent(replace_node, this.pass_node)
        replace_hide_node.parent = this.hide_node;

        let word_desc = client_mgr.get_word_info(real_idx, 0);
        word_desc += '\r\n' + client_mgr.get_word_info(real_idx, 1);
        word_desc += '\r\n' + client_mgr.get_word_info(real_idx, 2);
        this.word_label.string = word_desc;
    },

    replace_node_parent(replace_node: cc.Node, parent_node: cc.Node): void {
        replace_node.parent = parent_node;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = parent_node.width;
        replace_node.height = parent_node.height;
    },
}

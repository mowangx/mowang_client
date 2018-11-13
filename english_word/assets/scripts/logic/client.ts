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

import dispatcher from "./dispatcher"
import {EventType} from "./consts"
//import wx_mgr from "./wx_wrapper"

@ccclass
export class client extends cc.Component {

    private lvl: number = 1;
    private section: number = 1;
    private word_idx: number = 0;
    private user_flag_1: string = '';
    private user_flag_2: string = '';
    private user_flag_3: string = '';
    private user_flag_4: string = '';
    private user_flag_5: string = '';

    constructor() {
        super();
    },

    init(): void {
        //wx_mgr.init();
        for (let i=0; i<1024; ++i) {
            this.user_flag_1 += '0';
            this.user_flag_2 += '0';
            this.user_flag_3 += '0';
            this.user_flag_4 += '0';
            this.user_flag_5 += '0';
        }
    },

    share_game(): void {
        //wx_mgr.share_game();
    },

    set_lvl(lvl: number): void {
        this.lvl = lvl;
    },
    
    get_lvl(): number {
        return this.lvl;
    },

    set_section(section: number): void {
        this.section = section;
    },

    get_section(section: number): number {
        return this.section;
    },

    set_word_idx(idx: number): void {
        this.word_idx = idx;
    },

    get_word_idx(): number {
        return this.word_idx;
    },

    get_real_word_idx(idx: number): number {
        let param = 0;
        if (this.lvl = 1) {
            param = 10;
        }
        else if (this.lvl == 2) {
            param = 15;
        }
        else if (this.lvl == 3) {
            param = 20;
        }
        else if (this.lvl == 4) {
            param = 30;
        }
        else {
            param = 30;
        }
        return (this.section - 1) * param + idx;
    },

    set_right_flag(idx: number, flag: boolean): void {
        let value  = flag ? '1' : '0';
        let replace_value = '';
        if (this.lvl == 1) {
            replace_value = this.user_flag_1;
        }
        else if (this.lvl == 2) {
            replace_value = this.user_flag_2;
        }
        else if (this.lvl == 3) {
            replace_value = this.user_flag_3;
        }
        else if (this.lvl == 4) {
            replace_value = this.user_flag_4;
        }
        else {
            replace_value = this.user_flag_5;
        }
        let real_idx = this.get_real_word_idx(idx);
        let left_value = replace_value.substr(0, real_idx);
        let right_value = this.user_flag_1.substr(real_idx+1, this.user_flag_1.length - real_idx);
        replace_value = left_value + value + right_value;
        if (this.lvl == 1) {
            this.user_flag_1 = replace_value;
        }
        else if (this.lvl == 2) {
            this.user_flag_2 = replace_value;
        }
        else if (this.lvl == 3) {
            this.user_flag_3 = replace_value;
        }
        else if (this.lvl == 4) {
            this.user_flag_4 = replace_value;
        }
        else {
            this.user_flag_5 = replace_value;
        }
        console.log('set right flag!', real_idx, this.user_flag_1);
    },

    get_right_flag(idx: number): boolean {
        let value = '';
        if (this.lvl == 1) {
            value = this.user_flag_1[idx];
        }
        else if (this.lvl == 2) {
            value = this.user_flag_2[idx];
        }
        else if (this.lvl == 3) {
            value = this.user_flag_3[idx];
        }
        else if (this.lvl == 4) {
            value = this.user_flag_4[idx];
        }
        else {
            value = this.user_flag_5[idx];
        }
        return value == '1';
    },
}

var client_mgr = new client();
export default client_mgr; 

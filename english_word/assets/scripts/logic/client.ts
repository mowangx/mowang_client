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
import word_xiao_mgr from "./word_xiao"
import word_zhong_mgr from "./word_zhong"
import word_four_mgr from "./word_four"
import word_six_mgr from "./word_six"
import word_job_mgr from "./word_job"

//import wx_mgr from "./wx_wrapper"

@ccclass
export class client extends cc.Component {

    private lvl: number = 1;
    private cur_section: number = 1;
    private history_section: number = 1;    // pass fight history section
    private last_word_section: number = 0;   // last word section
    private last_word_idx: number = 0; // last word index
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
        word_xiao_mgr.init();
        word_zhong_mgr.init();
        word_four_mgr.init();
        word_six_mgr.init();
        word_job_mgr.init();
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
        let max_word_idx = this.get_config_word_idx();
        let len = 0;
        if (this.lvl == 1) {
            len = word_xiao_mgr.words_ary.length;
        }
        else if (this.lvl == 2) {
            len = word_zhong_mgr.words_ary.length;
        }
        else if (this.lvl == 3) {
            len = word_four_mgr.words_ary.length;
        }
        else if (this.lvl == 4) {
            len = word_six_mgr.words_ary.length;
        }
        else {
            len = word_job_mgr.words_ary.length;
        }
        this.last_word_section = Math.ceil(len / max_word_idx);
        this.last_word_idx = len - (this.last_word_section - 1) * max_word_idx;
    },
    
    get_lvl(): number {
        return this.lvl;
    },

    get_last_word_section(): number {
        return this.last_word_section;
    },

    get_last_word_idx(): number {
        return this.last_word_idx;
    },

    set_cur_section(section: number): void {
        this.cur_section = section;
    },

    get_cur_section(): number {
        return this.cur_section;
    },

    set_history_section(section: number): void {
        this.history_section = section;
    },

    get_history_section(): number {
        return this.history_section;
    }

    set_word_idx(idx: number): void {
        this.word_idx = idx;
    },

    get_word_idx(): number {
        return this.word_idx;
    },

    get_max_word_idx(): number {
        if (this.cur_section == this.last_word_section) {
            return this.last_word_idx;
        }
        else {
            return this.get_config_word_idx();
        }
    },

    get_config_word_idx(): number {
        if (this.lvl == 1) {
            return 10;
        }
        else if (this.lvl == 2) {
            return 15;
        }
        else if (this.lvl == 3) {
            return 20;
        }
        else if (this.lvl == 4) {
            return 30;
        }
        else {
            return 30;
        }
    },

    get_real_word_idx(idx: number): number {
        let param = this.get_config_word_idx();
        return (this.cur_section - 1) * param + idx;
    },

    set_word_pass(idx: number, flag: boolean): void {
        let value  = flag ? '1' : '0';
        let replace_value = this.get_user_flag();
        let left_value = replace_value.substr(0, idx);
        let right_value = replace_value.substr(idx+1, replace_value.length - idx);
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
    },

    is_word_pass(idx: number): boolean {
        let user_flag = this.get_user_flag();
        let real_idx = this.get_real_word_idx(idx);
        return user_flag[real_idx] == '1';
    },

    get_user_flag(): string {
        if (this.lvl == 1) {
            return this.user_flag_1;
        }
        else if (this.lvl == 2) {
            return this.user_flag_2;
        }
        else if (this.lvl == 3) {
            return this.user_flag_3;
        }
        else if (this.lvl == 4) {
            return this.user_flag_4;
        }
        else {
            return this.user_flag_5;
        }
    },

    get_word_info(word_idx: number, info_idx: number): string {
        if (this.lvl == 1) {
            return word_xiao_mgr.words_ary[word_idx][info_idx];
        }
        else if (this.lvl == 2) {
            return word_zhong_mgr.words_ary[word_idx][info_idx];
        }
        else if (this.lvl == 3) {
            return word_four_mgr.words_ary[word_idx][info_idx];
        }
        else if (this.lvl == 4) {
            return word_six_mgr.words_ary[word_idx][info_idx];
        }
        else {
            return word_job_mgr.words_ary[word_idx][info_idx];
        }
    },
}

var client_mgr = new client();
export default client_mgr; 

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
import word_guide_mgr from "./word_guide"
import word_xiao_mgr from "./word_xiao"
import word_chu_mgr from "./word_chu"
import word_gao_mgr from "./word_gao"
import word_four_mgr from "./word_four"
import word_six_mgr from "./word_six"
import wx_mgr from "./wx_wrapper"

@ccclass
export class client extends cc.Component {

    private init_flag: boolean = false;
    private lvl: number = 1;
    private cur_section: number = 1;
    private cur_word_idx: number = 0;
    private last_word_section: number = 0;   // max(last) word section
    private last_word_idx: number = 0; // max(last) word index
    private random_xiao_ary: Array<number> = [];
    private random_chu_ary: Array<number> = [];
    private random_gao_ary: Array<number> = [];
    private random_four_ary: Array<number> = [];
    private random_six_ary: Array<number> = [];

    constructor() {
        super();
    },

    init(): void {
        if (this.init_flag) {
            return;
        }
        
        this.init_flag = true;

        word_guide_mgr.init();
        word_xiao_mgr.init();
        word_chu_mgr.init();
        word_gao_mgr.init();
        word_four_mgr.init();
        word_six_mgr.init();

        let words_size_ary = [];
        words_size_ary.push(word_xiao_mgr.words_ary.length);
        words_size_ary.push(word_chu_mgr.words_ary.length);
        words_size_ary.push(word_gao_mgr.words_ary.length);
        words_size_ary.push(word_four_mgr.words_ary.length);
        words_size_ary.push(word_six_mgr.words_ary.length);
        wx_mgr.init(words_size_ary);

        let xiao_ary = [];
        for (let i=0; i<word_xiao_mgr.words_ary.length; ++i) {
            xiao_ary.push(i);
        }
        for (let i=0; i<word_xiao_mgr.words_ary.length; ++i) {
            let idx = this.get_random_range(0, xiao_ary.length-1);
            this.random_xiao_ary.push(xiao_ary[idx]);
            xiao_ary.splice(idx, 1);
        }
        console.log("random xiao ary", this.random_xiao_ary);
    },

    get_random_range(min: number, max: number): number {  
        let range_value = max - min;  
        let rand_value = Math.random();  
        return (min + Math.round(rand_value * range_value));  
    },

    inited_finish(): boolean {
        if (!this.init_flag) {
            return false;
        }
        return wx_mgr.init_finish_flag;
    }

    share_game(): void {
        wx_mgr.share_game();
    },

    is_guide(): boolean {
        return wx_mgr.guide_flag;
    },

    set_guide_flag(): void {
        wx_mgr.update_guide_flag();
    }

    set_lvl(lvl: number): void {
        this.lvl = lvl;

        this.cur_section = this.get_history_section();

        let max_word_idx = this.get_config_word_idx();
        let len = 0;
        if (this.lvl == 1) {
            len = word_xiao_mgr.words_ary.length;
        }
        else if (this.lvl == 2) {
            len = word_chu_mgr.words_ary.length;
        }
        else if (this.lvl == 3) {
            len = word_gao_mgr.words_ary.length;
        }
        else if (this.lvl == 4) {
            len = word_four_mgr.words_ary.length;
        }
        else {
            len = word_six_mgr.words_ary.length;
        }
        this.last_word_section = Math.ceil(len / max_word_idx);
        this.last_word_idx = len - (this.last_word_section - 1) * max_word_idx;
        console.log("set lvl!", this.lvl, this.cur_section, this.last_word_section, this.last_word_idx);
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
        if (this.lvl == 1) {
            wx_mgr.history_section_1 = section;
        }
        else if (this.lvl == 2) {
            wx_mgr.history_section_2 = section;
        }
        else if (this.lvl == 3) {
            wx_mgr.history_section_3 = section;
        }
        else if (this.lvl == 4) {
            wx_mgr.history_section_4 = section;
        }
        else {
            wx_mgr.history_section_5 = section;
        }
    },

    get_history_section(): number {
        if (this.lvl == 1) {
            return wx_mgr.history_section_1;
        }
        else if (this.lvl == 2) {
            return wx_mgr.history_section_2;
        }
        else if (this.lvl == 3) {
            return wx_mgr.history_section_3;
        }
        else if (this.lvl == 4) {
            return wx_mgr.history_section_4;
        }
        else {
            return wx_mgr.history_section_5;
        }
    }

    set_cur_word_idx(idx: number): void {
        this.cur_word_idx = idx;
    },

    get_cur_word_idx(): number {
        return this.cur_word_idx;
    },

    get_max_word_idx(): number {
        if (this.is_guide()) {
            return word_guide_mgr.words_ary.length;
        }

        if (this.cur_section == this.last_word_section) {
            return this.last_word_idx;
        }
        else {
            return this.get_config_word_idx();
        }
    },

    get_config_word_idx(): number {
        if (this.lvl == 1) {
            return 5;
        }
        else if (this.lvl == 2) {
            return 10;
        }
        else if (this.lvl == 3) {
            return 15;
        }
        else if (this.lvl == 4) {
            return 15;
        }
        else {
            return 15;
        }
    },

    get_real_word_idx(idx: number): number {
        if (this.is_guide()) {
            return idx;
        }
        
        let param = this.get_config_word_idx();
        return (this.cur_section - 1) * param + idx;
    },

    set_word_pass(idx: number, flag: boolean): void {
        if (this.is_guide()) {
            return ;
        }

        let value  = flag ? '1' : '0';
        let replace_value = this.get_user_flag();
        let left_value = replace_value.substr(0, idx);
        let right_value = replace_value.substr(idx+1, replace_value.length - idx);
        replace_value = left_value + value + right_value;
        if (this.lvl == 1) {
            wx_mgr.user_flag_1 = replace_value;
        }
        else if (this.lvl == 2) {
            wx_mgr.user_flag_2 = replace_value;
        }
        else if (this.lvl == 3) {
            wx_mgr.user_flag_3 = replace_value;
        }
        else if (this.lvl == 4) {
            wx_mgr.user_flag_4 = replace_value;
        }
        else {
            wx_mgr.user_flag_5 = replace_value;
        }
    },

    is_word_pass(idx: number): boolean {
        if (this.is_guide()) {
            return true;
        }

        let user_flag = this.get_user_flag();
        let real_idx = this.get_real_word_idx(idx);
        return user_flag[real_idx] == '1';
    },

    get_current_pass_word_num(): number {
        if (this.is_guide()) {
            return word_guide_mgr.words_ary.length;
        }

        let pass_num = 0;
        let user_flag = this.get_user_flag();
        let max_num = this.get_config_word_idx();
        for (let idx=0; idx<max_num; ++idx) {
            let real_idx = this.get_real_word_idx(idx);
            if (user_flag[real_idx] == '1') {
                pass_num += 1;
            }
        }
        return pass_num;
    },

    get_total_pass_word_num(): number {
        let pass_num = 0;
        let user_flag = this.get_user_flag();
        for (let i=0; i<user_flag.length; ++i) {
            if (user_flag[i] == '1') {
                pass_num += 1;
            }
        }
        return pass_num;
    }

    get_user_flag(): string {
        if (this.lvl == 1) {
            return wx_mgr.user_flag_1;
        }
        else if (this.lvl == 2) {
            return wx_mgr.user_flag_2;
        }
        else if (this.lvl == 3) {
            return wx_mgr.user_flag_3;
        }
        else if (this.lvl == 4) {
            return wx_mgr.user_flag_4;
        }
        else {
            return wx_mgr.user_flag_5;
        }
    },

    get_word_info(word_idx: number, info_idx: number): string {
        if (this.is_guide()) {
            return word_guide_mgr.words_ary[word_idx][info_idx];
        }
        else if (this.lvl == 1) {
            return word_xiao_mgr.words_ary[word_idx][info_idx];
        }
        else if (this.lvl == 2) {
            return word_chu_mgr.words_ary[word_idx][info_idx];
        }
        else if (this.lvl == 3) {
            return word_gao_mgr.words_ary[word_idx][info_idx];
        }
        else if (this.lvl == 4) {
            return word_four_mgr.words_ary[word_idx][info_idx];
        }
        else {
            return word_six_mgr.words_ary[word_idx][info_idx];
        }
    },

    save_user_info(): void {
        if (wx_mgr.init_finish_flag) {
            wx_mgr.save_cloud_value(this.lvl);
        }
    },
}

var client_mgr = new client();
export default client_mgr; 

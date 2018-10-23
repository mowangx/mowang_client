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
import wx_mgr from "./wx_wrapper"

@ccclass
export class client extends cc.Component {

    private result: boolean = false;
    private lvl: number = 1;
    private play_time: number = 0;
    private tip_times: number = 3;
    private relive_times: number = 3;
    private gold: number = 0;

    constructor() {
        super();
    },

    init(): void {
        wx_mgr.init();
    },

    set_result(result: boolean): void {
        this.result = result;
    },

    get_result(): boolean {
        return this.result;
    },

    set_lvl(lvl: number): void {
        this.lvl = lvl;
    },
    
    get_lvl(): number {
        return this.lvl;
    },

    set_play_time(play_time: number): void {
        this.play_time = play_time;
    },

    get_play_time(): number {
        return this.play_time;
    },

    add_tip_times(): void {
        this.tip_times += 1;
    },

    desc_tip_times(): void {
        this.tip_times -= 1;
        if (this.tip_times < 0) {
            this.tip_times = 0;
        }
    },

    get_tip_times(): number {
        return this.tip_times;
    },

    add_relive_times(): void {
        this.relive_times += 1;
    },

    desc_relive_times(): void {
        this.relive_times -= 1;
        if (this.relive_times < 0) {
            this.relive_times = 0;
        }
    },

    get_relive_times(): number {
        return this.relive_times;
    },

    add_gold_num(num: number): void {
        this.gold += num;
    },

    desc_gold_num(num: number): void {
        this.gold -= num;
        if (this.gold < 0) {
            this.gold = 0;
        }
    }
    
    get_gold_num(): number {
        return this.gold;
    },
}

var client_mgr = new client();
export default client_mgr; 

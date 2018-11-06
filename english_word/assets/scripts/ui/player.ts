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
export default class player extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    tail_info: cc.Node = null;

    @property(cc.Label)
    word_label: cc.Label = null;

    @property(cc.Node)
    btn_area: cc.Node = null;

    @property([cc.Node])
    btn_grid_list: Array<cc.Node> = [];

    private grid_list: Array<cc.Node> = [];

    private hide_node: cc.Node = null;

    @property(cc.Prefab)
    word_a: cc.Prefab = null;

    private word_a_pool: Array<cc.Node> = [];

    @property(cc.Prefab)
    word_b: cc.Prefab = null;

    private word_b_pool: Array<cc.Node> = [];

    private finish_words: Array<string> = [];

    private click_x: Number = 0;
    private click_y: Number = 0;

    onLoad () {
        this.btn_area.on('touchend', this.on_touch_end, this);
        this.btn_area.on('touchcancel', this.on_touch_end, this);
    },

    start () {
        for (let i=0; i<35; ++i) {
            this.word_a_pool[i] = cc.instantiate(this.word_a);
            this.word_b_pool[i] = cc.instantiate(this.word_b);
        }
        this.finish_words = [];
        this.init_word();
    },

    // update (dt) {},

    init_word(): void {
        this.hide_all();
        this.show_words();
    },

    hide_all(): void {
        for (let i=0; i<this.grid_list.length; ++i) {
            let child_node = this.grid_list[i];
            child_node.parent = this.hide_node;
        }
    },

    show_words(): void {
        let words = this.random_words();
        this.finish_words.push(words);
        let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
        for (let i=0; i<words.length; ++i) {
            let random_index = this.get_random_range(0, indexes.length);
            let real_index = indexes[random_index];
            this.show_word(words[i], real_index);
            indexes.splice(random_index, 1);
        }
    },

    show_word(word, idx): void {
        let replace_node = null;
        if (word == 'a') {
            replace_node = this.word_a_pool[idx];
        }
        else if (word == 'b') {
            replace_node = this.word_b_pool[idx];
        }
        let grid = this.btn_grid_list[idx]
        replace_node.parent = grid;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = grid.width;
        replace_node.height = grid.height;
    },

    random_words(): string {
        return "aba";
    },

    get_random_range(min: number, max: number): number {  
        var Range = max - min;  
        var Rand = Math.random();  
        return(min + Math.round(Rand * Range));  
    },

    on_touch_end(event): void {
        this.click_x = this.btn_area.convertTouchToNodeSpaceAR(event).x;
        this.click_y = this.btn_area.convertTouchToNodeSpaceAR(event).y;
        this.check_click();
    },

    check_click(): void {
        let grids = this.btn_grid_list;
        let len = grids.length;
        for (let i = 0; i < len; i ++) {
            let grid = grids[i];
            let start_x = grid.x - grid.width / 2;
            let start_y = grid.y - grid.height / 2;
            let end_x = grid.x + grid.width / 2;
            let end_y = grid.y + grid.height / 2;
            if (start_x < this.click_x && end_x > this.click_x &&
                start_y < this.click_y && end_y > this.click_y) {
                this.on_click_grid(i);
                return;
            }
        }
    },

    on_click_grid(idx: number) : void {
        console.log("on click grid", idx);
    },
}

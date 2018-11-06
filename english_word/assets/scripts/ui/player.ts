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
    word_a_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_a_2: cc.Prefab = null;

    @property(cc.Prefab)
    word_b_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_b_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_c_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_c_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_d_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_d_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_e_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_e_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_f_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_f_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_g_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_g_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_h_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_h_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_i_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_i_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_j_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_j_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_k_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_k_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_l_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_l_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_m_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_m_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_n_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_n_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_o_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_o_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_p_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_p_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_q_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_q_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_r_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_r_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_s_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_s_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_t_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_t_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_u_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_u_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_v_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_v_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_w_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_w_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_x_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_x_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_y_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_y_2: cc.Prefab = null;
    
    @property(cc.Prefab)
    word_z_1: cc.Prefab = null;
    @property(cc.Prefab)
    word_z_2: cc.Prefab = null;

    private finish_words: Array<string> = [];
    private word_indexes: Array<string> = [];

    private click_x: Number = 0;
    private click_y: Number = 0;

    onLoad () {
        this.btn_area.on('touchend', this.on_touch_end, this);
        this.btn_area.on('touchcancel', this.on_touch_end, this);
    },

    start () {
        this.finish_words = [];
        this.word_indexes = [];
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
            this.word_indexes[real_index] = words[i];
            let prefab_node = this.get_word_prefab_1(words[i]);
            this.show_word(prefab_node, real_index);
            indexes.splice(random_index, 1);
        }
    },

    show_word(prefab_node, idx): void {
        if (!prefab_node) {
            return;
        }
        let replace_node = cc.instantiate(prefab_node);
        let grid = this.btn_grid_list[idx]
        replace_node.parent = grid;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = grid.width;
        replace_node.height = grid.height;
    },

    get_word_prefab_1(word): cc.Prefab {
        switch(word) {
            case 'a':
                return this.word_a_1;
            case 'b':
                return this.word_b_1;
            case 'c':
                return this.word_c_1;
            case 'd':
                return this.word_d_1;
            case 'e':
                return this.word_e_1;
            case 'f':
                return this.word_f_1;
            case 'g':
                return this.word_g_1;
            case 'h':
                return this.word_h_1;
            default:
                return null;
        }
    },

    get_word_prefab_2(word): cc.Prefab {
        switch(word) {
            case 'a':
                return this.word_a_2;
            case 'b':
                return this.word_b_2;
            case 'c':
                return this.word_c_2;
            case 'd':
                return this.word_d_2;
            case 'e':
                return this.word_e_2;
            case 'f':
                return this.word_f_2;
            case 'g':
                return this.word_g_2;
            case 'h':
                return this.word_h_2;
            default:
                return null;
        }
    },

    random_words(): string {
        return "beahdfcg";
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
        let word = this.word_indexes[idx];
        let prefab_node = this.get_word_prefab_2(word);
        this.show_word(prefab_node, idx);
    },
}

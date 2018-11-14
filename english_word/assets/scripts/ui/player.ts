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
    unit_info: cc.Node = null;

    private unit_node:cc.Node = null;

    @property(cc.Node)
    tail_info: cc.Node = null;

    @property(cc.Label)
    word_label: cc.Label = null;

    @property(cc.Node)
    btn_area: cc.Node = null;

    @property([cc.Node])
    btn_grid_list: Array<cc.Node> = [];

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

    private word_list_pool: Array<Array<cc.Node>> = [];

    private word_indexes: Array<string> = [];

    private click_x: Number = 0;
    private click_y: Number = 0;

    private cur_click_words: string = '';
    private show_fayin_flag: boolean = false;
    private show_word_idx: number = 0;
    private wait_fight_indexes: Array<number> = []

    private grid_status: Array<boolean> = [];

    onLoad () {
        this.btn_area.on('touchend', this.on_touch_end, this);
        this.btn_area.on('touchcancel', this.on_touch_end, this);
    },

    start () {
        this.unit_node = this.unit_info.getComponent("unit");
        this.unit_node.show_unit();
        this.init_all_node();
        this.wait_fight_indexes = [];
        for (let i=0; i<client_mgr.get_max_word_idx(); ++i) {
            this.wait_fight_indexes.push(i);
        }
        this.restart();
    },

    // update (dt) {},

    restart(): void {
        this.show_fayin_flag = false;
        this.word_indexes = [];
        this.random_words();
        this.init_word();
    }

    init_word(): void {
        for (let i=0; i<35; ++i) {
            this.grid_status[i] = true;
        }
        this.cur_click_words = '';
        this.hide_all();
        this.show_words();
    },

    hide_node_pool(word_pool: Array<cc.Node>): void {
        for (let i=0; i<word_pool.length; ++i) {
            let child_node = word_pool[i];
            child_node.parent = this.hide_node;
        }
    }

    show_words(): void {
        let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
        let cur_random_words = client_mgr.get_word_info(this.show_word_idx, 0);
        for (let i=0; i<cur_random_words.length; ++i) {
            let random_index = this.get_random_range(0, indexes.length - 1);
            let real_index = indexes[random_index];
            this.grid_status[real_index] = false;
            this.word_indexes[real_index] = cur_random_words[i];
            let replace_node = this.get_word_node_1(cur_random_words[i], real_index);
            this.show_word_area(replace_node, real_index);
            indexes.splice(random_index, 1);
        }
        this.show_word_label('');
    },

    show_word_area(replace_node, idx): void {
        if (!replace_node) {
            return;
        }
        let grid = this.btn_grid_list[idx];
        replace_node.parent = grid;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = grid.width;
        replace_node.height = grid.height;
    },

    show_word_label(head_desc: string): void {
        let fayin = this.show_fayin_flag ? client_mgr.get_word_info(this.show_word_idx, 1) : '';
        this.word_label.string = head_desc + '\r\n' + this.cur_click_words + '\r\n' + fayin + '\r\n' + client_mgr.get_word_info(this.show_word_idx, 2);
    },

    random_words(): void {
        let idx = this.get_random_range(0, this.wait_fight_indexes.length - 1);
        this.show_word_idx = client_mgr.get_real_word_idx(this.wait_fight_indexes[idx]);
        this.wait_fight_indexes.splice(idx, 1);
    },

    get_random_range(min: number, max: number): number {  
        let range_value = max - min;  
        let rand_value = Math.random();  
        return (min + Math.round(rand_value * range_value));  
    },

    on_touch_end(event): void {
        this.click_x = this.btn_area.convertTouchToNodeSpaceAR(event).x;
        this.click_y = this.btn_area.convertTouchToNodeSpaceAR(event).y;
        this.check_click();
    },

    check_click(): void {
        let len = this.btn_grid_list.length;
        for (let i = 0; i < len; i ++) {
            let grid = this.btn_grid_list[i];
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
        if (this.grid_status[idx]) {
            return;
        }

        this.grid_status[idx] = true;
        let word = this.word_indexes[idx];
        this.cur_click_words += word;
        let replace_node = this.get_word_node_2(word, idx);
        this.show_word_area(replace_node, idx);
        let head_desc = '';
        if (this.check_game_over()) {
            this.show_fayin_flag = true;
            if (this.cur_click_words == client_mgr.get_word_info(this.show_word_idx, 0)) {
                head_desc = '回答正确';
                client_mgr.set_word_pass(this.show_word_idx, true);
            }
            else {
                head_desc = '回答错误';
                client_mgr.set_word_pass(this.show_word_idx, false);
            }
        }
        this.show_word_label(head_desc);
    },

    check_game_over(): boolean {
        for (let i=0; i<this.grid_status.length; ++i) {
            if (!this.grid_status[i]) {
                return false;
            }
        }
        return true;
    },

    on_click_back(): void {
        cc.director.loadScene("start");
    },

    on_click_clear(): void {
        this.init_word();
    },

    on_click_share(): void {
        client_mgr.share_game();
    },

    on_click_study(): void {
        cc.director.loadScene("study");
    },

    on_click_next(): void {
        if (this.wait_fight_indexes.length > 0) {
            this.restart();
        }
        else {
            cc.director.loadScene("jump");
        }
    },

    on_click_tip(): void {
        this.show_fayin_flag = true;
        this.show_word_label('');
    },

    init_all_node(): void {
        for (let i=0; i<52; ++i) {
            this.word_list_pool[i] = new Array();
        }
        for (let i=0; i<35; ++i) {
            this.word_list_pool[0][i] = cc.instantiate(this.word_a_1);
            this.word_list_pool[1][i] = cc.instantiate(this.word_a_2);
            this.word_list_pool[2][i] = cc.instantiate(this.word_b_1);
            this.word_list_pool[3][i] = cc.instantiate(this.word_b_2);
            this.word_list_pool[4][i] = cc.instantiate(this.word_c_1);
            this.word_list_pool[5][i] = cc.instantiate(this.word_c_2);
            this.word_list_pool[6][i] = cc.instantiate(this.word_d_1);
            this.word_list_pool[7][i] = cc.instantiate(this.word_d_2);
            this.word_list_pool[8][i] = cc.instantiate(this.word_e_1);
            this.word_list_pool[9][i] = cc.instantiate(this.word_e_2);
            this.word_list_pool[10][i] = cc.instantiate(this.word_f_1);
            this.word_list_pool[11][i] = cc.instantiate(this.word_f_2);
            this.word_list_pool[12][i] = cc.instantiate(this.word_g_1);
            this.word_list_pool[13][i] = cc.instantiate(this.word_g_2);
            this.word_list_pool[14][i] = cc.instantiate(this.word_h_1);
            this.word_list_pool[15][i] = cc.instantiate(this.word_h_2);
            this.word_list_pool[16][i] = cc.instantiate(this.word_i_1);
            this.word_list_pool[17][i] = cc.instantiate(this.word_i_2);
            this.word_list_pool[18][i] = cc.instantiate(this.word_j_1);
            this.word_list_pool[19][i] = cc.instantiate(this.word_j_2);
            this.word_list_pool[20][i] = cc.instantiate(this.word_k_1);
            this.word_list_pool[21][i] = cc.instantiate(this.word_k_2);
            this.word_list_pool[22][i] = cc.instantiate(this.word_l_1);
            this.word_list_pool[23][i] = cc.instantiate(this.word_l_2);
            this.word_list_pool[24][i] = cc.instantiate(this.word_m_1);
            this.word_list_pool[25][i] = cc.instantiate(this.word_m_2);
            this.word_list_pool[26][i] = cc.instantiate(this.word_n_1);
            this.word_list_pool[27][i] = cc.instantiate(this.word_n_2);
            this.word_list_pool[28][i] = cc.instantiate(this.word_o_1);
            this.word_list_pool[29][i] = cc.instantiate(this.word_o_2);
            this.word_list_pool[30][i] = cc.instantiate(this.word_p_1);
            this.word_list_pool[31][i] = cc.instantiate(this.word_p_2);
            this.word_list_pool[32][i] = cc.instantiate(this.word_q_1);
            this.word_list_pool[33][i] = cc.instantiate(this.word_q_2);
            this.word_list_pool[34][i] = cc.instantiate(this.word_r_1);
            this.word_list_pool[35][i] = cc.instantiate(this.word_r_2);
            this.word_list_pool[36][i] = cc.instantiate(this.word_s_1);
            this.word_list_pool[37][i] = cc.instantiate(this.word_s_2);
            this.word_list_pool[38][i] = cc.instantiate(this.word_t_1);
            this.word_list_pool[39][i] = cc.instantiate(this.word_t_2);
            this.word_list_pool[40][i] = cc.instantiate(this.word_u_1);
            this.word_list_pool[41][i] = cc.instantiate(this.word_u_2);
            this.word_list_pool[42][i] = cc.instantiate(this.word_v_1);
            this.word_list_pool[43][i] = cc.instantiate(this.word_v_2);
            this.word_list_pool[44][i] = cc.instantiate(this.word_w_1);
            this.word_list_pool[45][i] = cc.instantiate(this.word_w_2);
            this.word_list_pool[46][i] = cc.instantiate(this.word_x_1);
            this.word_list_pool[47][i] = cc.instantiate(this.word_x_2);
            this.word_list_pool[48][i] = cc.instantiate(this.word_y_1);
            this.word_list_pool[49][i] = cc.instantiate(this.word_y_2);
            this.word_list_pool[50][i] = cc.instantiate(this.word_z_1);
            this.word_list_pool[51][i] = cc.instantiate(this.word_z_2);
        }
    }

    hide_all(): void {
        for (let i=0; i<52; ++i) {
            this.hide_node_pool(this.word_list_pool[i]);
        }
    },

    get_word_node_1(word, idx): cc.Node {
        let word_idx = (word.charCodeAt() - 97) * 2;
        return this.word_list_pool[word_idx][idx];
    },

    get_word_node_2(word, idx): cc.Node {
        let word_idx = (word.charCodeAt() - 97) * 2 + 1;
        return this.word_list_pool[word_idx][idx];
    },
}

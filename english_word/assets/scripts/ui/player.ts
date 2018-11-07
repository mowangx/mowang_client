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

    private word_a_1_pool: Array<cc.Node> = [];
    private word_a_2_pool: Array<cc.Node> = [];
    private word_b_1_pool: Array<cc.Node> = [];
    private word_b_2_pool: Array<cc.Node> = [];
    private word_c_1_pool: Array<cc.Node> = [];
    private word_c_2_pool: Array<cc.Node> = [];
    private word_d_1_pool: Array<cc.Node> = [];
    private word_d_2_pool: Array<cc.Node> = [];
    private word_e_1_pool: Array<cc.Node> = [];
    private word_e_2_pool: Array<cc.Node> = [];
    private word_f_1_pool: Array<cc.Node> = [];
    private word_f_2_pool: Array<cc.Node> = [];
    private word_g_1_pool: Array<cc.Node> = [];
    private word_g_2_pool: Array<cc.Node> = [];
    private word_h_1_pool: Array<cc.Node> = [];
    private word_h_2_pool: Array<cc.Node> = [];
    private word_i_1_pool: Array<cc.Node> = [];
    private word_i_2_pool: Array<cc.Node> = [];
    private word_j_1_pool: Array<cc.Node> = [];
    private word_j_2_pool: Array<cc.Node> = [];
    private word_k_1_pool: Array<cc.Node> = [];
    private word_k_2_pool: Array<cc.Node> = [];
    private word_l_1_pool: Array<cc.Node> = [];
    private word_l_2_pool: Array<cc.Node> = [];
    private word_m_1_pool: Array<cc.Node> = [];
    private word_m_2_pool: Array<cc.Node> = [];
    private word_n_1_pool: Array<cc.Node> = [];
    private word_n_2_pool: Array<cc.Node> = [];
    private word_o_1_pool: Array<cc.Node> = [];
    private word_o_2_pool: Array<cc.Node> = [];
    private word_p_1_pool: Array<cc.Node> = [];
    private word_p_2_pool: Array<cc.Node> = [];
    private word_q_1_pool: Array<cc.Node> = [];
    private word_q_2_pool: Array<cc.Node> = [];
    private word_r_1_pool: Array<cc.Node> = [];
    private word_r_2_pool: Array<cc.Node> = [];
    private word_s_1_pool: Array<cc.Node> = [];
    private word_s_2_pool: Array<cc.Node> = [];
    private word_t_1_pool: Array<cc.Node> = [];
    private word_t_2_pool: Array<cc.Node> = [];
    private word_u_1_pool: Array<cc.Node> = [];
    private word_u_2_pool: Array<cc.Node> = [];
    private word_v_1_pool: Array<cc.Node> = [];
    private word_v_2_pool: Array<cc.Node> = [];
    private word_w_1_pool: Array<cc.Node> = [];
    private word_w_2_pool: Array<cc.Node> = [];
    private word_x_1_pool: Array<cc.Node> = [];
    private word_x_2_pool: Array<cc.Node> = [];
    private word_y_1_pool: Array<cc.Node> = [];
    private word_y_2_pool: Array<cc.Node> = [];
    private word_z_1_pool: Array<cc.Node> = [];
    private word_z_2_pool: Array<cc.Node> = [];

    private finish_words: Array<string> = [];
    private word_indexes: Array<string> = [];

    private click_x: Number = 0;
    private click_y: Number = 0;

    private cur_random_words: string = '';
    private cur_click_words: string = '';
    private cur_words_desc: string = '';

    private grid_status: Array<boolean> = [];

    onLoad () {
        this.btn_area.on('touchend', this.on_touch_end, this);
        this.btn_area.on('touchcancel', this.on_touch_end, this);
    },

    start () {
        for (let i=0; i<35; ++i) {
            this.word_a_1_pool[i] = cc.instantiate(this.word_a_1);
            this.word_a_2_pool[i] = cc.instantiate(this.word_a_2);
            this.word_b_1_pool[i] = cc.instantiate(this.word_b_1);
            this.word_b_2_pool[i] = cc.instantiate(this.word_b_2);
            this.word_c_1_pool[i] = cc.instantiate(this.word_c_1);
            this.word_c_2_pool[i] = cc.instantiate(this.word_c_2);
            this.word_d_1_pool[i] = cc.instantiate(this.word_d_1);
            this.word_d_2_pool[i] = cc.instantiate(this.word_d_2);
            this.word_e_1_pool[i] = cc.instantiate(this.word_e_1);
            this.word_e_2_pool[i] = cc.instantiate(this.word_e_2);
            this.word_f_1_pool[i] = cc.instantiate(this.word_f_1);
            this.word_f_2_pool[i] = cc.instantiate(this.word_f_2);
            this.word_g_1_pool[i] = cc.instantiate(this.word_g_1);
            this.word_g_2_pool[i] = cc.instantiate(this.word_g_2);
            this.word_h_1_pool[i] = cc.instantiate(this.word_h_1);
            this.word_h_2_pool[i] = cc.instantiate(this.word_h_2);
            this.word_i_1_pool[i] = cc.instantiate(this.word_i_1);
            this.word_i_2_pool[i] = cc.instantiate(this.word_i_2);
            this.word_j_1_pool[i] = cc.instantiate(this.word_j_1);
            this.word_j_2_pool[i] = cc.instantiate(this.word_j_2);
            this.word_k_1_pool[i] = cc.instantiate(this.word_k_1);
            this.word_k_2_pool[i] = cc.instantiate(this.word_k_2);
            this.word_l_1_pool[i] = cc.instantiate(this.word_l_1);
            this.word_l_2_pool[i] = cc.instantiate(this.word_l_2);
            this.word_m_1_pool[i] = cc.instantiate(this.word_m_1);
            this.word_m_2_pool[i] = cc.instantiate(this.word_m_2);
            this.word_n_1_pool[i] = cc.instantiate(this.word_n_1);
            this.word_n_2_pool[i] = cc.instantiate(this.word_n_2);
            this.word_o_1_pool[i] = cc.instantiate(this.word_o_1);
            this.word_o_2_pool[i] = cc.instantiate(this.word_o_2);
            this.word_p_1_pool[i] = cc.instantiate(this.word_p_1);
            this.word_p_2_pool[i] = cc.instantiate(this.word_p_2);
            this.word_q_1_pool[i] = cc.instantiate(this.word_q_1);
            this.word_q_2_pool[i] = cc.instantiate(this.word_q_2);
            this.word_r_1_pool[i] = cc.instantiate(this.word_r_1);
            this.word_r_2_pool[i] = cc.instantiate(this.word_r_2);
            this.word_s_1_pool[i] = cc.instantiate(this.word_s_1);
            this.word_s_2_pool[i] = cc.instantiate(this.word_s_2);
            this.word_t_1_pool[i] = cc.instantiate(this.word_t_1);
            this.word_t_2_pool[i] = cc.instantiate(this.word_t_2);
            this.word_u_1_pool[i] = cc.instantiate(this.word_u_1);
            this.word_u_2_pool[i] = cc.instantiate(this.word_u_2);
            this.word_v_1_pool[i] = cc.instantiate(this.word_v_1);
            this.word_v_2_pool[i] = cc.instantiate(this.word_v_2);
            this.word_w_1_pool[i] = cc.instantiate(this.word_w_1);
            this.word_w_2_pool[i] = cc.instantiate(this.word_w_2);
            this.word_x_1_pool[i] = cc.instantiate(this.word_x_1);
            this.word_x_2_pool[i] = cc.instantiate(this.word_x_2);
            this.word_y_1_pool[i] = cc.instantiate(this.word_y_1);
            this.word_y_2_pool[i] = cc.instantiate(this.word_y_2);
            this.word_z_1_pool[i] = cc.instantiate(this.word_z_1);
            this.word_z_2_pool[i] = cc.instantiate(this.word_z_2);
        }
        this.finish_words = [];
        this.restart();
    },

    // update (dt) {},

    restart(): void {
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

    hide_all(): void {
        this.hide_node_pool(this.word_a_1_pool);
        this.hide_node_pool(this.word_a_2_pool);
        this.hide_node_pool(this.word_b_1_pool);
        this.hide_node_pool(this.word_b_2_pool);
        this.hide_node_pool(this.word_c_1_pool);
        this.hide_node_pool(this.word_c_2_pool);
        this.hide_node_pool(this.word_d_1_pool);
        this.hide_node_pool(this.word_d_2_pool);
        this.hide_node_pool(this.word_e_1_pool);
        this.hide_node_pool(this.word_e_2_pool);
        this.hide_node_pool(this.word_f_1_pool);
        this.hide_node_pool(this.word_f_2_pool);
        this.hide_node_pool(this.word_g_1_pool);
        this.hide_node_pool(this.word_g_2_pool);
        this.hide_node_pool(this.word_h_1_pool);
        this.hide_node_pool(this.word_h_2_pool);
        this.hide_node_pool(this.word_i_1_pool);
        this.hide_node_pool(this.word_i_2_pool);
        this.hide_node_pool(this.word_j_1_pool);
        this.hide_node_pool(this.word_j_2_pool);
        this.hide_node_pool(this.word_k_1_pool);
        this.hide_node_pool(this.word_k_2_pool);
        this.hide_node_pool(this.word_l_1_pool);
        this.hide_node_pool(this.word_l_2_pool);
        this.hide_node_pool(this.word_m_1_pool);
        this.hide_node_pool(this.word_m_2_pool);
        this.hide_node_pool(this.word_n_1_pool);
        this.hide_node_pool(this.word_n_2_pool);
        this.hide_node_pool(this.word_o_1_pool);
        this.hide_node_pool(this.word_o_2_pool);
        this.hide_node_pool(this.word_p_1_pool);
        this.hide_node_pool(this.word_p_2_pool);
        this.hide_node_pool(this.word_q_1_pool);
        this.hide_node_pool(this.word_q_2_pool);
        this.hide_node_pool(this.word_r_1_pool);
        this.hide_node_pool(this.word_r_2_pool);
        this.hide_node_pool(this.word_s_1_pool);
        this.hide_node_pool(this.word_s_2_pool);
        this.hide_node_pool(this.word_t_1_pool);
        this.hide_node_pool(this.word_t_2_pool);
        this.hide_node_pool(this.word_u_1_pool);
        this.hide_node_pool(this.word_u_2_pool);
        this.hide_node_pool(this.word_v_1_pool);
        this.hide_node_pool(this.word_v_2_pool);
        this.hide_node_pool(this.word_w_1_pool);
        this.hide_node_pool(this.word_w_2_pool);
        this.hide_node_pool(this.word_x_1_pool);
        this.hide_node_pool(this.word_x_2_pool);
        this.hide_node_pool(this.word_y_1_pool);
        this.hide_node_pool(this.word_y_2_pool);
        this.hide_node_pool(this.word_z_1_pool);
        this.hide_node_pool(this.word_z_2_pool);
    },

    hide_node_pool(word_pool: Array<cc.Node>): void {
        for (let i=0; i<word_pool.length; ++i) {
            let child_node = word_pool[i];
            child_node.parent = this.hide_node;
        }
    }

    show_words(): void {
        this.finish_words.push(this.cur_random_words);
        let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
        for (let i=0; i<this.cur_random_words.length; ++i) {
            let random_index = this.get_random_range(0, indexes.length);
            let real_index = indexes[random_index];
            this.grid_status[real_index] = false;
            this.word_indexes[real_index] = this.cur_random_words[i];
            let replace_node = this.get_word_node_1(this.cur_random_words[i], real_index);
            this.show_word_area(replace_node, real_index);
            indexes.splice(random_index, 1);
        }
        this.show_word_label('');
    },

    show_word_area(replace_node, idx): void {
        if (!replace_node) {
            return;
        }
        let grid = this.btn_grid_list[idx]
        replace_node.parent = grid;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = grid.width;
        replace_node.height = grid.height;
    },

    show_word_label(head_desc: string): void {
        this.word_label.string = head_desc + '\r\n' + this.cur_click_words + '\r\n' + this.cur_words_desc;
    },

    get_word_node_1(word, idx): cc.Node {
        switch(word) {
            case 'a':
                return this.word_a_1_pool[idx];
            case 'b':
                return this.word_b_1_pool[idx];
            case 'c':
                return this.word_c_1_pool[idx];
            case 'd':
                return this.word_d_1_pool[idx];
            case 'e':
                return this.word_e_1_pool[idx];
            case 'f':
                return this.word_f_1_pool[idx];
            case 'g':
                return this.word_g_1_pool[idx];
            case 'h':
                return this.word_h_1_pool[idx];
            case 'i':
                return this.word_i_1_pool[idx];
            case 'j':
                return this.word_j_1_pool[idx];
            case 'k':
                return this.word_k_1_pool[idx];
            case 'l':
                return this.word_l_1_pool[idx];
            case 'm':
                return this.word_m_1_pool[idx];
            case 'n':
                return this.word_n_1_pool[idx];
            case 'o':
                return this.word_o_1_pool[idx];
            case 'p':
                return this.word_p_1_pool[idx];
            case 'q':
                return this.word_q_1_pool[idx];
            case 'r':
                return this.word_r_1_pool[idx];
            case 's':
                return this.word_s_1_pool[idx];
            case 't':
                return this.word_t_1_pool[idx];
            case 'u':
                return this.word_u_1_pool[idx];
            case 'v':
                return this.word_v_1_pool[idx];
            case 'w':
                return this.word_w_1_pool[idx];
            case 'x':
                return this.word_x_1_pool[idx];
            case 'y':
                return this.word_y_1_pool[idx];
            case 'z':
                return this.word_z_1_pool[idx];
            default:
                return null;
        }
    },

    get_word_node_2(word, idx): cc.Node {
        switch(word) {
            case 'a':
                return this.word_a_2_pool[idx];
            case 'b':
                return this.word_b_2_pool[idx];
            case 'c':
                return this.word_c_2_pool[idx];
            case 'd':
                return this.word_d_2_pool[idx];
            case 'e':
                return this.word_e_2_pool[idx];
            case 'f':
                return this.word_f_2_pool[idx];
            case 'g':
                return this.word_g_2_pool[idx];
            case 'h':
                return this.word_h_2_pool[idx];
            case 'i':
                return this.word_i_2_pool[idx];
            case 'j':
                return this.word_j_2_pool[idx];
            case 'k':
                return this.word_k_2_pool[idx];
            case 'l':
                return this.word_l_2_pool[idx];
            case 'm':
                return this.word_m_2_pool[idx];
            case 'n':
                return this.word_n_2_pool[idx];
            case 'o':
                return this.word_o_2_pool[idx];
            case 'p':
                return this.word_p_2_pool[idx];
            case 'q':
                return this.word_q_2_pool[idx];
            case 'r':
                return this.word_r_2_pool[idx];
            case 's':
                return this.word_s_2_pool[idx];
            case 't':
                return this.word_t_2_pool[idx];
            case 'u':
                return this.word_u_2_pool[idx];
            case 'v':
                return this.word_v_2_pool[idx];
            case 'w':
                return this.word_w_2_pool[idx];
            case 'x':
                return this.word_x_2_pool[idx];
            case 'y':
                return this.word_y_2_pool[idx];
            case 'z':
                return this.word_z_2_pool[idx];
            default:
                return null;
        }
    },

    random_words(): void {
        this.cur_random_words = 'abcdefghijklmnopqrstuvwxyz';
        this.cur_words_desc = 'adj: 漂亮的';
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
        if (this.check_game_over()) {
            this.show_word_label('结束了');
        }
        else {
            this.show_word_label('');
        }
    },

    check_game_over(): boolean {
        for (let i=0; i<this.grid_status.length; ++i) {
            if (!this.grid_status[i]) {
                return false;
            }
        }
        return true;
    },
    

    on_click_clear(): void {
        this.init_word();
    },

    on_click_share(): void {
    },

    on_click_study(): void {

    },

    on_click_next(): void {
        this.restart();
    },
}

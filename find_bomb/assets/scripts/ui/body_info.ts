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

import dispatcher from "./../logic/dispatcher"
import {EventType} from "./../logic/consts"
import { rand } from "../../../creator";
import client_mgr from "./../logic/client"

@ccclass
export default class body_info extends cc.Component {

    @property(cc.Node)
    bomb_lvl_1: cc.Node = null;

    @property(cc.Node)
    bomb_lvl_2: cc.Node = null;
    
    @property(cc.Node)
    bomb_lvl_3: cc.Node = null;
    
    @property(cc.Node)
    bomb_lvl_4: cc.Node = null;
    
    @property(cc.Node)
    bomb_lvl_5: cc.Node = null;

    private hide_node: cc.Node = null;
    private grid_list: Array<cc.Node> = [];

    private bomb_node_list: Array<cc.Node> = [];
    private flag_node_list: Array<cc.Node> = [];

    @property([cc.Node])
    grid_lvl_1: Array<cc.Node> = [];

    @property([cc.Node])
    grid_lvl_2: Array<cc.Node> = [];

    @property([cc.Node])
    grid_lvl_3: Array<cc.Node> = [];

    @property([cc.Node])
    grid_lvl_4: Array<cc.Node> = [];

    @property([cc.Node])
    grid_lvl_5: Array<cc.Node> = [];

    @property(cc.Prefab)
    normal_grid: cc.Prefab = null;

    @property(cc.Prefab)
    bomb_node: cc.Prefab = null;

    @property(cc.Prefab)
    flag_node: cc.Prefab = null;

    @property(cc.Prefab)
    num_0: cc.Prefab = null;

    @property(cc.Prefab)
    num_1: cc.Prefab = null;

    @property(cc.Prefab)
    num_2: cc.Prefab = null;

    @property(cc.Prefab)
    num_3: cc.Prefab = null;

    @property(cc.Prefab)
    num_4: cc.Prefab = null;

    @property(cc.Prefab)
    num_5: cc.Prefab = null;

    @property(cc.Prefab)
    num_6: cc.Prefab = null;

    @property(cc.Node)
    bg_info: cc.Node = null;

    @property(cc.Prefab)
    bg_panel: cc.Prefab = null;

    private bg_node: cc.Node = null;

    
    private click_x: Number = 0;
    private click_y: Number = 0;

    private bomb_list: Array<Number> = [];

    private grid_status: Array<boolean> = [];
    private tip_flag: boolean = false;
    private game_over_flag = false;

    @property(cc.Node)
    result_info: cc.Node = null;

    private win_node: cc.Node = null;
    private lose_node: cc.Node = null;

    @property(cc.Prefab)
    win_panel: cc.Prefab = null;

    @property(cc.Prefab)
    lose_panel: cc.Prefab = null;

    private num_0_pool: Array<cc.Node> = [];
    private num_1_pool: Array<cc.Node> = [];
    private num_2_pool: Array<cc.Node> = [];
    private num_3_pool: Array<cc.Node> = [];
    private num_4_pool: Array<cc.Node> = [];
    private num_5_pool: Array<cc.Node> = [];
    private num_6_pool: Array<cc.Node> = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bomb_lvl_1.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_1.on('touchcancel', this.on_touch_end, this);

        this.bomb_lvl_2.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_2.on('touchcancel', this.on_touch_end, this);

        this.bomb_lvl_3.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_3.on('touchcancel', this.on_touch_end, this);

        this.bomb_lvl_4.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_4.on('touchcancel', this.on_touch_end, this);

        this.bomb_lvl_5.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_5.on('touchcancel', this.on_touch_end, this);
    },

    start () {
        for (let i=0; i<81; ++i) {
            this.num_0_pool[i] = cc.instantiate(this.num_0);
            this.num_1_pool[i] = cc.instantiate(this.num_1);
            this.num_2_pool[i] = cc.instantiate(this.num_2);
            this.num_3_pool[i] = cc.instantiate(this.num_3);
            this.num_4_pool[i] = cc.instantiate(this.num_4);
            this.num_5_pool[i] = cc.instantiate(this.num_5);
            this.num_6_pool[i] = cc.instantiate(this.num_6);
            this.bomb_node_list[i] = cc.instantiate(this.bomb_node);
            this.flag_node_list[i] = cc.instantiate(this.flag_node);
            this.grid_status[i] = false;
        }
        dispatcher.add_dispatch(EventType.EVENT_CLICK_OPEN_BTN, this.on_change_open, this);
        dispatcher.add_dispatch(EventType.EVENT_CLICK_FLAG_BTN, this.on_change_flag, this)
        this.win_node = cc.instantiate(this.win_panel);
        this.lose_node = cc.instantiate(this.lose_panel);
        this.init_body();
    },

    // update (dt) {},

    init_body(): void {
        console.log("init body info 33333333");
        this.hide_all();
        this.game_over_flag = false;
        this.tip_flag = false;
        if (client_mgr.get_lvl() == 1) {
            this.init_grid_list(this.grid_lvl_1);
        }
        else if (client_mgr.get_lvl() == 2) {
            this.init_grid_list(this.grid_lvl_2);
        }
        else if (client_mgr.get_lvl() == 3) {
            this.init_grid_list(this.grid_lvl_3);
        }
        else if (client_mgr.get_lvl() == 4) {
            this.init_grid_list(this.grid_lvl_4);
        }
        else if (client_mgr.get_lvl() == 5) {
            this.init_grid_list(this.grid_lvl_5);
        }
        this.init_bomb_list();
    },

    hide_all(): void {
        for (let i=0; i<this.grid_list.length; ++i) {
            let child_node = this.grid_list[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.num_0_pool.length; ++i) {
            let child_node = this.num_0_pool[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.num_1_pool.length; ++i) {
            let child_node = this.num_1_pool[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.num_2_pool.length; ++i) {
            let child_node = this.num_2_pool[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.num_3_pool.length; ++i) {
            let child_node = this.num_3_pool[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.num_4_pool.length; ++i) {
            let child_node = this.num_4_pool[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.num_5_pool.length; ++i) {
            let child_node = this.num_5_pool[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.num_6_pool.length; ++i) {
            let child_node = this.num_6_pool[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.bomb_node_list.length; ++i) {
            let child_node = this.bomb_node_list[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.flag_node_list.length; ++i) {
            let child_node = this.flag_node_list[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.grid_status.length; ++i) {
            this.grid_status[i] = false;
        }
        for (let i=0; i<this.bomb_list.length; ++i) {
            this.bomb_list[i] = -1;
        }
    },

    init_grid_list(grid_lvl_list): void {
        for (let i = 0 ; i < grid_lvl_list.length; i ++) {
            this.grid_list[i] = cc.instantiate(this.normal_grid);
            let node = this.grid_list[i];
            let parent_node = grid_lvl_list[i];
            node.parent = parent_node;
            node.setPosition(cc.p(0, 0));
            node.width = parent_node.width;
            node.height = parent_node.height;
        }
    },

    init_bomb_list(): void {
        if (client_mgr.get_lvl() == 1) {
            this.init_bombo_list_1();
        }
        else if(client_mgr.get_lvl() == 2) {
            this.init_bomb_list_2();
        }
        else if(client_mgr.get_lvl() == 3) {
            this.init_bomb_list_3();
        }
        else if(client_mgr.get_lvl() ==4) {
            this.init_bomb_list_4();
        }
        else {
            this.init_bomb_list_5();
        }
    },

    init_bombo_list_1(): void {
        let start_indexes = [0, 3, 10];
        let j_ary = [3, 2, 3];
        for (let i=0; i<start_indexes.length; ++i) {
            let random_idx = 0;
            if (i == 0) {
                random_idx = this.get_random_range(0, 5);
            }
            else if (i == 1) {
                random_idx = this.get_random_range(0, 9);
            }
            else {
                random_idx = this.get_random_range(0, 8);
            }
            this.bomb_list[i] = this.get_real_random_idx(start_indexes[i], random_idx, j_ary[i], 5);
        }
    },

    init_bomb_list_2(): void {
        let start_indexes = [0, 2, 4, 18, 20, 22];
        for (let i=0; i<start_indexes.length; ++i) {
            let random_idx = this.get_random_range(0, 5);
            this.bomb_list[i] = this.get_real_random_idx(start_indexes[i], random_idx, 2, 6);
        }
    },

    init_bomb_list_3(): void {
        let start_indexes = [0, 3, 5, 14, 24, 28, 30, 39];
        let j_ary = [3, 2, 2, 3, 4, 2, 2, 3];
        for (let i=0; i<start_indexes.length; ++i) {
            let random_idx = this.get_random_range(0, i == 4 ? 6: 5);
            if (i == 4) {
                let random_idx = this.get_random_range(0, 6);
                let idx = this.get_real_random_idx(start_indexes[i], random_idx, j_ary[i], 7);
                this.bomb_list[i] = random_idx > 3 ? (idx + 1) : idx;
            }
            else {
                let random_idx = this.get_random_range(0, 5);
                this.bomb_list[i] = this.get_real_random_idx(start_indexes[i], random_idx, j_ary[i], 7);
            }
        }
    },

    init_bomb_list_4(): void {
        let start_indexes = [0, 2, 6, 18, 32, 36, 38, 48];
        let random_indexes = [];
        let j_ary = [2, 4, 2 , 4, 4, 2, 2, 4];
        for (let i=0; i<20; ++i) {
            let idx = this.get_random_range(0, 7);
            if (random_indexes.indexOf(idx) >= 0) {
                continue;
            }
            random_indexes.push(idx);
            if (random_indexes.length > 3) {
                break;
            }
        }
        let k = 0;
        for (let i=0; i<start_indexes.length; ++i) {
            let len = random_indexes.indexOf(i) >= 0 ? 2 : 1;
            let cur_len = 0;
            for (let j=0; j<5; ++j) {
                let random_idx = this.get_random_range(0, 7);
                let idx = this.get_real_random_idx(start_indexes[i], random_idx, j_ary[i], 8);
                if (this.bomb_list.indexOf(idx) >=0) {
                    continue;
                }
                this.bomb_list[k] = idx;
                k += 1;
                cur_len += 1;
                if (cur_len >= len) {
                    break;
                }
            }
        }
    },

    init_bomb_list_5(): void {
        let start_indexes = [0, 5, 7, 18, 36, 38, 49, 67];
        let j_ary = [5, 2, 2, 5, 2, 2, 5, 5];
        let k = 0;
        for (let i=0; i<start_indexes.length; ++i) {
            let cur_len =0;
            for (let j=0; j<5; ++j) {
                let random_idx = this.get_random_range(0, i == 3 ? 10 : 9);
                let idx = this.get_real_random_idx(start_indexes[i], random_idx, j_ary[i], 9);
                if (i == 3 && random_idx == 10) {
                    idx += 4;
                }
                if (this.bomb_list.indexOf(idx) >= 0) {
                    continue;
                }
                this.bomb_list[k] = idx;
                k += 1;
                cur_len += 1;
                if (cur_len > 1) {
                    break;
                }
            }
        }
    },

    get_real_random_idx(start_index: number, random_idx: number, j: number, coln: number): number {
        return start_index + Math.floor(random_idx / j) * coln + random_idx % j;
    },

    get_random_range(min: number, max: number): number {  
        var Range = max - min;  
        var Rand = Math.random();  
        return(min + Math.round(Rand * Range));  
    },

    on_touch_end(event): void {
        let lvl_node = this.get_lvl_node();
        this.click_x = lvl_node.convertTouchToNodeSpaceAR(event).x;
        this.click_y = lvl_node.convertTouchToNodeSpaceAR(event).y;
        this.check_click();
    },

    get_lvl_node(): cc.Node {
        if (client_mgr.get_lvl() == 1) {
            return this.bomb_lvl_1;
        }
        else if (client_mgr.get_lvl() == 2) {
            return this.bomb_lvl_2;
        }
        else if (client_mgr.get_lvl() == 3) {
            return this.bomb_lvl_3;
        }
        else if (client_mgr.get_lvl() == 4) {
            return this.bomb_lvl_4;
        }
        else {
            return this.bomb_lvl_5;
        }
    },

    get_grid_nodes(): Array<cc.Node> {
        if (client_mgr.get_lvl() == 1) {
            return this.grid_lvl_1;
        }
        else if (client_mgr.get_lvl() == 2) {
            return this.grid_lvl_2;
        }
        else if (client_mgr.get_lvl() == 3) {
            return this.grid_lvl_3;
        }
        else if (client_mgr.get_lvl() == 4) {
            return this.grid_lvl_4;
        }
        else {
            return this.grid_lvl_5;
        }
    },

    get_grid_node(idx: number): cc.Node {
        let grids = this.get_grid_nodes();
        return grids[idx];
    },

    check_click(): void {
        let grids = this.get_grid_nodes();
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
        if (this.game_over_flag || this.grid_status[idx]) {
            return ;
        }

        this.update_grid_node(idx, []);
        if (this.tip_flag) {
            this.grid_status[idx] = false;
            this.tip_flag = false;
        }
        else if (this.bomb_list.indexOf(idx) >= 0) {
            this.game_over_flag = true;
            this.show_all_grid();
        }
        else if (this.check_game_over()) {
            this.on_game_over(true);
        }
    },

    check_game_over(): boolean {
        let max_coln_num = this.get_coln_num();
        let len = max_coln_num * max_coln_num;
        for (let i=0; i<len; ++i) {
            if (this.grid_status[i] || this.bomb_list.indexOf(i) >= 0) {
                continue;
            }

            return false;
        }
        return true;
    }

    update_grid_node(idx: number, ignore_indexes: Array<number>) : void {
        this.grid_status[idx] = true;

        let child_node = this.grid_list[idx];
        child_node.parent = this.hide_node;

        let replace_node = null;
        if (this.tip_flag || this.bomb_list.indexOf(idx) >= 0) {
            if (this.tip_flag) {
                replace_node = this.flag_node_list[idx];
            }
            else {
                replace_node = this.bomb_node_list[idx];
            }

            let grid = this.get_grid_node(idx);
            replace_node.parent = grid;
            replace_node.setPosition(cc.p(0, 0));
            replace_node.width = grid.width;
            replace_node.height = grid.height;
        }
        else {
            let bomb_node = this.bomb_node_list[idx];
            bomb_node.parent = this.hide_node;

            let check_indexes = this.get_around_indexs(idx);
            let bomb_num = this.get_bomb_num(idx, check_indexes);

            if (bomb_num == 0) {
                replace_node = this.num_0_pool[idx];
            }
            else if (bomb_num == 1) {
                replace_node = this.num_1_pool[idx];
            }
            else if (bomb_num == 2) {
                replace_node = this.num_2_pool[idx];
            }
            else if (bomb_num == 3) {
                replace_node = this.num_3_pool[idx];
            }
            else if (bomb_num == 4) {
                replace_node = this.num_4_pool[idx];
            }
            else if (bomb_num == 5) {
                replace_node = this.num_5_pool[idx];
            }
            else if (bomb_num == 6) {
                replace_node = this.num_6_pool[idx];
            }
            
            let grid = this.get_grid_node(idx);
            replace_node.parent = grid;
            replace_node.setPosition(cc.p(0, 0));
            replace_node.width = grid.width;
            replace_node.height = grid.height;

            if (bomb_num == 0) {
                let cur_ingore_indexes = ignore_indexes.concat([idx]);
                for (let i=0; i<check_indexes.length; ++i) {
                    let cur_idx = idx + check_indexes[i];
                    if (ignore_indexes.indexOf(cur_idx) >= 0) {
                        continue;
                    }
                    cur_ingore_indexes.push(cur_idx);
                }
                for (let i=0; i<check_indexes.length; ++i) {
                    let cur_idx = idx + check_indexes[i];
                    if (ignore_indexes.indexOf(cur_idx) >= 0) {
                        continue;
                    }
                    this.update_grid_node(cur_idx, cur_ingore_indexes);
                }
                return;
            }
        }
    }

    get_around_indexs(idx: number): Array<number> {
        let max_coln_num = this.get_coln_num();
        let row = Math.floor(idx / max_coln_num);
        let coln = idx % max_coln_num;
        let check_indexes: Array<number> = [];
        if (row > 0 && row < (max_coln_num - 1)) {
            check_indexes.push(-1 * max_coln_num);
            check_indexes.push(max_coln_num);
            if (coln > 0 && coln < (max_coln_num - 1)) {
                check_indexes.push(-1);
                check_indexes.push(1);
                check_indexes.push(-1 * max_coln_num + 1);
                check_indexes.push(max_coln_num + 1);
                check_indexes.push(-1 * max_coln_num - 1);
                check_indexes.push(max_coln_num - 1);
            } 
            else if (coln == 0) {
                check_indexes.push(1);
                check_indexes.push(-1 * max_coln_num + 1);
                check_indexes.push(max_coln_num + 1);
            }
            else {
                check_indexes.push(-1);
                check_indexes.push(-1 * max_coln_num - 1);
                check_indexes.push(max_coln_num - 1);
            }
        } 
        else if (row == 0) {
            check_indexes.push(max_coln_num);
            if (coln > 0 && coln < (max_coln_num - 1)) {
                check_indexes.push(-1);
                check_indexes.push(1);
                check_indexes.push(max_coln_num - 1);
                check_indexes.push(max_coln_num + 1);
            }
            else if (coln  == 0) {
                check_indexes.push(1);
                check_indexes.push(max_coln_num + 1);
            }
            else {
                check_indexes.push(-1);
                check_indexes.push(max_coln_num - 1);
            }
        }
        else {
            check_indexes.push(-1 * max_coln_num);
            if (coln > 0 && coln < (max_coln_num - 1)) {
                check_indexes.push(-1);
                check_indexes.push(1);
                check_indexes.push(-1 * max_coln_num - 1);
                check_indexes.push(-1 * max_coln_num + 1);
            }
            else if (coln  == 0) {
                check_indexes.push(1);
                check_indexes.push(-1 * max_coln_num + 1);
            }
            else {
                check_indexes.push(-1);
                check_indexes.push(-1 * max_coln_num - 1);
            }
        }
        return check_indexes;
    }

    get_bomb_num(idx: number, check_indexes: Array<number>): number {
        let bomb_num = 0;
        for (let i=0; i<check_indexes.length; ++i) {
            let cur_idx = idx + check_indexes[i];
            if (this.check_bomb_by_idx(cur_idx)) {
                bomb_num += 1;
            }
        }

        return bomb_num;
    },

    check_bomb_by_idx(idx: number) : boolean {
        if (idx < 0) {
            return false;
        }
    
        return this.bomb_list.indexOf(idx) >= 0;
    },

    get_coln_num(): number {
        if (client_mgr.get_lvl() == 1) {
            return 5;
        }
        else if (client_mgr.get_lvl() == 2) {
            return 6;
        }
        else if (client_mgr.get_lvl() == 3) {
            return 7;
        }
        else if (client_mgr.get_lvl() == 4) {
            return 8;
        }
        else {
            return 9;
        }
    },
    
    on_destory() : void {
        // this.bomb_lvl_1.off('touchstart', this.on_touch_start, this);
        this.bomb_lvl_1.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_1.off('touchcancel', this.on_touch_end, this);
 
        this.bomb_lvl_2.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_2.off('touchcancel', this.on_touch_end, this);
 
        this.bomb_lvl_3.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_3.off('touchcancel', this.on_touch_end, this);
 
        this.bomb_lvl_4.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_4.off('touchcancel', this.on_touch_end, this);
 
        this.bomb_lvl_5.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_5.off('touchcancel', this.on_touch_end, this);
    },

    show_all_grid(): void {
        this.schedule(this.show_grid_delay, 0.1);
    },

    show_grid_delay(): void {
        let max_coln_num = this.get_coln_num();
        let len = max_coln_num * max_coln_num;
        for (let i=0 ; i<len; ++i) {
            if (this.grid_status[i]) {
                continue;
            }
            this.grid_status[i] = true;
            this.update_grid_node(i, []);
            return;
        }

        this.unschedule(this.show_grid_delay);
        this.on_game_over(false);
     },

     on_change_flag(): void {
        this.tip_flag = true;
     },

    on_game_over(result: boolean): void {
        this.bg_node = cc.instantiate(this.bg_panel);
        this.bg_node.parent = this.bg_info;
        this.bg_node.setPosition(cc.v2(0, 0));
        this.bg_node.width = this.bg_info.width;
        this.bg_node.height = this.bg_info.height;

        dispatcher.dispatch(EventType.EVENT_GAME_OVER, result);
        let result_node = result ? this.win_node : this.lose_node;
        result_node.parent = this.result_info;
        result_node.setPosition(cc.v2(0, 0));
        result_node.width = this.result_info.width;
        result_node.height = this.result_info.height;
        result_node.getComponent("result").init_panel(result);
    },
}

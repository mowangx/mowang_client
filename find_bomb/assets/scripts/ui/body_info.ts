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

    @property(cc.Node)
    hide_node: cc.Node = null;
    
    @property([cc.Node])
    grid_list: Array<cc.Node> = [];

    @property([cc.Node])
    bomb_node_list: Array<cc.Node> = [];

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
    normal_grid_1: cc.Prefab = null;

    @property(cc.Prefab)
    normal_grid_2: cc.Prefab = null;

    @property(cc.Prefab)
    normal_grid_3: cc.Prefab = null;

    @property(cc.Prefab)
    normal_grid_4: cc.Prefab = null;
    
    @property(cc.Prefab)
    normal_grid_5: cc.Prefab = null;

    @property(cc.Prefab)
    bomb_node: cc.Prefab = null;

    @property(Number)
    click_x: Number = 0;

    @property(Number)
    click_y: Number = 0;

    @property(Number)
    lvl: Number = 0;

    @property([Number])
    bomb_list: Array<Number> = []

    @property([cc.Node])
    text_list: Array<cc.Node> = [];

    @property([Boolean])
    grid_status: Array<boolean> = []

    @property(Boolean)
    bomb_flag: boolean = false;

    @property(Boolean)
    game_over_flag = false;

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
            this.text_list[i] = new cc.Node('text');
            this.text_list[i].addComponent(cc.Label);
            this.bomb_node_list[i] = cc.instantiate(this.bomb_node);
            this.grid_status[i] = false;
        }
        dispatcher.add_dispatch(EventType.EVENT_CLICK_BOMB_BTN, this.on_change_bomb_flag, this);
    },

    // update (dt) {},

    init_body(lvl: number): void {
        this.hide_all();
        this.game_over_flag = false;
        this.bomb_flag = false;
        this.lvl = lvl;
        if (this.lvl == 1) {
            this.init_grid_list(this.grid_lvl_1, this.normal_grid_1);
        }
        else if (this.lvl == 2) {
            this.init_grid_list(this.grid_lvl_2, this.normal_grid_2);
        }
        else if (this.lvl == 3) {
            this.init_grid_list(this.grid_lvl_3, this.normal_grid_3);
        }
        else if (this.lvl == 4) {
            this.init_grid_list(this.grid_lvl_4, this.normal_grid_4);
        }
        else if (this.lvl == 5) {
            this.init_grid_list(this.grid_lvl_5, this.normal_grid_5);
        }
        this.init_bomb_list();
    },

    hide_all(): void {
        for (let i=0; i<this.grid_list.length; ++i) {
            let child_node = this.grid_list[i];
            child_node.parent = this.hide_node;
        }

        for (let i=0; i<this.text_list.length; ++i) {
            let child_node = this.text_list[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.bomb_node_list.length; ++i) {
            let child_node = this.bomb_node_list[i];
            child_node.parent = this.hide_node;
        }
        for (let i=0; i<this.grid_status.length; ++i) {
            this.grid_status[i] = false;
        }
    },

    init_grid_list(grid_lvl_list, normal_grid): void {
        for (let i = 0 ; i < grid_lvl_list.length; i ++) {
            this.grid_list[i] = cc.instantiate(normal_grid);
            let node = this.grid_list[i];
            let parent_node = grid_lvl_list[i];
            node.parent = parent_node;
            node.setPosition(cc.p(0, 0));
            node.width = parent_node.width;
            node.height = parent_node.height;
        }
    }

    init_bomb_list(): void {
        let bomb_num = this.get_random_bomb_num()
        for (let i=0; i<bomb_num; ++i) {
            let idx = 0;
            let coln_num = this.get_coln_num();
            let max_index = coln_num * coln_num - 1;
            for (let i=0; i<coln_num; ++i) {
                idx = this.get_random_range(0, max_index);
                if (this.bomb_list.indexOf(idx) >= 0) {
                    continue;
                } 
                else {
                    break;
                }
            }
            this.bomb_list[i] = idx;
        }
    },

    get_random_bomb_num(): number {
        let min_num = 0;
        let max_num = 0;
        if (this.lvl == 1) {
            min_num = 3;
            max_num = 4;
        }
        else if (this.lvl == 2) {
            min_num = 5;
            max_num = 6;
        }
        else if (this.lvl == 3) {
            min_num = 8;
            max_num = 9;
        }
        else if (this.lvl == 4) {
            min_num = 11;
            max_num = 12;
        }
        else {
            min_num = 15;
            max_num = 16;
        }
        return this.get_random_range(min_num, max_num);
    }

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
        if (this.lvl == 1) {
            return this.bomb_lvl_1;
        }
        else if (this.lvl == 2) {
            return this.bomb_lvl_2;
        }
        else if (this.lvl == 3) {
            return this.bomb_lvl_3;
        }
        else if (this.lvl == 4) {
            return this.bomb_lvl_4;
        }
        else {
            return this.bomb_lvl_5;
        }
    }

    get_grid_nodes(): Array<cc.Node> {
        if (this.lvl == 1) {
            return this.grid_lvl_1;
        }
        else if (this.lvl == 2) {
            return this.grid_lvl_2;
        }
        else if (this.lvl == 3) {
            return this.grid_lvl_3;
        }
        else if (this.lvl == 4) {
            return this.grid_lvl_4;
        }
        else {
            return this.grid_lvl_5;
        }
    }

    get_grid_node(idx: number): cc.Node {
        let grids = this.get_grid_nodes();
        return grids[idx];
    }

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
        if (this.bomb_flag) {
            this.bomb_flag = false;
            this.grid_status[idx] = false;
        }
        else if (this.bomb_list.indexOf(idx) >= 0) {
            this.game_over_flag = true;
            this.show_all_grid();
        }
        else {
            let max_coln_num = this.get_coln_num();
            let len = max_coln_num * max_coln_num;
            for (let i=0; i<len; ++i) {
                if (this.grid_status[i] || this.bomb_list.indexOf(i) >= 0) {
                    continue;
                }

                return ;
            }
            this.on_game_over(true);
        }
    },

    update_grid_node(idx: number, ignore_indexes: Array<number>) : void {
        this.grid_status[idx] = true;

        let child_node = this.grid_list[idx];
        child_node.parent = this.hide_node;

        let replace_node = null;
        if (this.bomb_flag || this.bomb_list.indexOf(idx) >= 0) {
            replace_node = this.bomb_node_list[idx];
        }
        else {
            let bomb_node = this.bomb_node_list[idx];
            bomb_node.parent = this.hide_node;

            replace_node = this.text_list[idx];
            let check_indexes = this.get_around_indexs(idx);
            let bomb_num = this.get_bomb_num(idx, check_indexes);
            if (bomb_num > 0) {
                replace_node.getComponent(cc.Label).string = '' + bomb_num;
            }
            else {
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
        let grid = this.get_grid_node(idx);
        replace_node.parent = grid;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = grid.width;
        replace_node.height = grid.height;
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
        if (this.lvl == 1) {
            return 5;
        }
        else if (this.lvl == 2) {
            return 6;
        }
        else if (this.lvl == 3) {
            return 7;
        }
        else if (this.lvl == 4) {
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
        this.bomb_flag = false;
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

     on_change_bomb_flag(): void {
        this.bomb_flag = true;
     }

    on_game_over(result: boolean): void {
        dispatcher.dispatch(EventType.EVENT_GAME_OVER_1, result, this.lvl);
        cc.director.loadScene("result");
    }
}

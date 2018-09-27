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
        }
    },

    // update (dt) {},

    init_body(lvl: number): void {
        this.hide_all();
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
        let bomb_num = this.get_random_range(4, 6)
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

    get_random_range(min: number, max: number): number {  
        var Range = max - min;  
        var Rand = Math.random();  
        return(min + Math.round(Rand * Range));  
    },

    on_touch_end(event): void {
        if (this.lvl == 1) {
            this.click_x = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_1);
        }
        else if (this.lvl == 2) {
            this.click_x = this.bomb_lvl_2.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_2.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_2);
        }
        else if (this.lvl == 3) {
            this.click_x = this.bomb_lvl_3.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_3.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_3);
        }
        else if (this.lvl == 4) {
            this.click_x = this.bomb_lvl_4.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_4.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_4);
        }
        else if (this.lvl == 5) {
            this.click_x = this.bomb_lvl_5.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_5.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_5);
        }
    },

    check_click(grids: Array<cc.Node>): void {
        let len = grids.length;
        for (let i = 0; i < len; i ++) {
            let grid = grids[i];
            let start_x = grid.x - grid.width / 2;
            let start_y = grid.y - grid.height / 2;
            let end_x = grid.x + grid.width / 2;
            let end_y = grid.y + grid.height / 2;
            if (start_x < this.click_x && end_x > this.click_x &&
                start_y < this.click_y && end_y > this.click_y) {
                this.on_click_grid(grid, i);
                return;
            }
        }
    },

    on_click_grid(grid: cc.Node, idx: number) : void {
        let child_node = this.grid_list[idx];
        child_node.parent = this.hide_node;

        let text_node = this.text_list[idx];
        if (this.bomb_list.indexOf(idx) >= 0) {
            text_node.getComponent(cc.Label).string = 'bo';
        }
        else {
            text_node.getComponent(cc.Label).string = this.get_bomb_num(idx);
        }
        text_node.parent = grid;
        text_node.setPosition(cc.p(0, 0));
        text_node.width = grid.width;
        text_node.height = grid.height;
    },

    get_bomb_num(idx: number): String {
        let max_coln_num = this.get_coln_num();
        let bomb_num = 0;
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
        for (let i=0; i<check_indexes.length; ++i) {
            let cur_idx = idx + check_indexes[i];
            if (this.check_bomb_by_idx(cur_idx)) {
                bomb_num += 1;
            }
        }
        return "" + bomb_num;
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
}

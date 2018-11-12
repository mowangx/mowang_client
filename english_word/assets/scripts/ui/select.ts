
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class select extends cc.Component {

    @property([cc.Node])
    grid_list: Array<cc.Node> = [];

    @property(cc.Prefab)
    num_1: cc.Prefab = null;

    @property(cc.Node)
    lvl_node: cc.Node = null;

    private click_x: Number = 0;
    private click_y: Number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lvl_node.on('touchend', this.on_touch_end, this);
        this.lvl_node.on('touchcancel', this.on_touch_end, this);
    },

    start () {
        for (let i=0; i<this.grid_list.length; ++i) {
            let grid = this.grid_list[i];
            let replace_prefab = this.get_num_prefab(i);
            let replace_node = cc.instantiate(replace_prefab);
            replace_node.parent = grid;
            replace_node.setPosition(cc.p(0, 0));
            replace_node.width = grid.width;
            replace_node.height = grid.height;

        }
    },

    // update (dt) {}

    on_touch_end(event): void {
        this.click_x = this.lvl_node.convertTouchToNodeSpaceAR(event).x;
        this.click_y = this.lvl_node.convertTouchToNodeSpaceAR(event).y;
        this.check_click();
    },

    check_click(): void {
        let len = this.grid_list.length;
        for (let i = 0; i < len; i ++) {
            let grid = this.grid_list[i];
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

    on_click_grid(i: number): void {

    },

    get_num_prefab(idx: number): cc.Prefab {
        return this.num_1;
    },

    on_click_back(): void {

    },
}

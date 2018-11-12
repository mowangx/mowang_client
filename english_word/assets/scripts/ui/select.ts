
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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

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
    }

    // update (dt) {}

    get_num_prefab(idx: number): cc.Prefab {
        return this.num_1;
    },

    on_click_back(): void {

    },
}

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

import client_mgr from "./../logic/client"

@ccclass
export default class unit extends cc.Component {

    private hide_node: cc.Node = null;

    @property(cc.Node)
    unit_node: cc.Node = null;

    @property(cc.Node)
    unit_1_node: cc.Node = null;

    @property(cc.Node)
    unit_2_node: cc.Node = null;

    @property(cc.Prefab)
    num_0_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_1_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_2_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_3_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_4_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_5_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_6_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_7_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_8_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    num_9_prefab: cc.Prefab = null;

    private num_0_pool: Array<cc.Node> = [];
    private num_1_pool: Array<cc.Node> = [];
    private num_2_pool: Array<cc.Node> = [];
    private num_3_pool: Array<cc.Node> = [];
    private num_4_pool: Array<cc.Node> = [];
    private num_5_pool: Array<cc.Node> = [];
    private num_6_pool: Array<cc.Node> = [];
    private num_7_pool: Array<cc.Node> = [];
    private num_8_pool: Array<cc.Node> = [];
    private num_9_pool: Array<cc.Node> = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (let i=0; i<2; ++i) {
            this.num_0_pool[i] = cc.instantiate(this.num_0_prefab);
            this.num_1_pool[i] = cc.instantiate(this.num_1_prefab);
            this.num_2_pool[i] = cc.instantiate(this.num_2_prefab);
            this.num_3_pool[i] = cc.instantiate(this.num_3_prefab);
            this.num_4_pool[i] = cc.instantiate(this.num_4_prefab);
            this.num_5_pool[i] = cc.instantiate(this.num_5_prefab);
            this.num_6_pool[i] = cc.instantiate(this.num_6_prefab);
            this.num_7_pool[i] = cc.instantiate(this.num_7_prefab);
            this.num_8_pool[i] = cc.instantiate(this.num_8_prefab);
            this.num_9_pool[i] = cc.instantiate(this.num_9_prefab);
        }
    },

    // start () {
        
    // },

    // update (dt) {}

    show_unit(): void {
        for (let i=0; i<2; ++i) {
            this.num_0_pool[i].parent = this.hide_node;
            this.num_1_pool[i].parent = this.hide_node;
            this.num_2_pool[i].parent = this.hide_node;
            this.num_3_pool[i].parent = this.hide_node;
            this.num_4_pool[i].parent = this.hide_node;
            this.num_5_pool[i].parent = this.hide_node;
            this.num_6_pool[i].parent = this.hide_node;
            this.num_7_pool[i].parent = this.hide_node;
            this.num_8_pool[i].parent = this.hide_node;
            this.num_9_pool[i].parent = this.hide_node;
        }
        let cur_section = client_mgr.get_cur_section();
        if (cur_section > 9) {
            let section_1 = Math.floor(cur_section / 10);
            let section_2 = cur_section % 10;
            let section_node_1 = this.get_unit_node(section_1, 0);
            let section_node_2 = this.get_unit_node(section_2, 1);
            this.replace_node_parent(section_node_1, this.unit_1_node);
            this.replace_node_parent(section_node_2, this.unit_2_node);
        }
        else {
            let section_node = this.get_unit_node(cur_section, 0);
            this.replace_node_parent(section_node, this.unit_node);
        }
    },

    get_unit_node(section: number, idx: number): cc.Node {
        if (section == 0) {
            return this.num_0_pool[idx];
        }
        else if (section == 1) {
            return this.num_1_pool[idx];
        }
        else if (section == 2) {
            return this.num_2_pool[idx];
        }
        else if (section == 3) {
            return this.num_3_pool[idx];
        }
        else if (section == 4) {
            return this.num_4_pool[idx];
        }
        else if (section == 5) {
            return this.num_5_pool[idx];
        }
        else if (section == 6) {
            return this.num_6_pool[idx];
        }
        else if (section == 7) {
            return this.num_7_pool[idx];
        }
        else if (section == 8) {
            return this.num_8_pool[idx];
        }
        else {
            return this.num_9_pool[idx];
        }
    },

    replace_node_parent(replace_node: cc.Node, parent_node: cc.Node): void {
        replace_node.parent = parent_node;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = parent_node.width;
        replace_node.height = parent_node.height;
    },
}

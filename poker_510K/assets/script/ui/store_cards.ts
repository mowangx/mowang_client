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
export default class store_cards extends cc.Component {
    @property(cc.Prefab)
    card_7_3: cc.Prefab = null;

    @property(cc.Prefab)
    card_8_3: cc.Prefab = null;

    @property([cc.Node])
    card_list: Array<cc.Node> = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (let i=0; i<this.card_list.length; ++i) {
            if (i % 2 == 0) {
                this.card_list[i] = cc.instantiate(this.card_7_3);
            } else {
                this.card_list[i] = cc.instantiate(this.card_8_3);
            }
        }
    },

    start () {

    },

    // update (dt) {},
    clear_cards(): void {
        for (let i=0; i<this.card_list.length; ++i) {
            let node = this.card_list[i];
            node.parent = this.node;
            node.width = 0;
            node.height = 0;
        }
    }

    update_card(idx, parent_node): void {
        let node = this.card_list[idx];
        cc.log("update card, %d, %s, %s", idx, parent_node, node);
        node.parent = parent_node;
        node.setPosition(cc.p(0, 0));
        node.width = parent_node.width;
        node.height = parent_node.height;
     },
}

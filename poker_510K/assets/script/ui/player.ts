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
export default class player extends cc.Component {

    @property(cc.Node)
    poker_layout: cc.Node = null;
    

    @property([cc.Node])
    poker_node_list: Array<cc.Node> = [];

    @property([Boolean])
    poker_selected_list: Array<Boolean> = [];

    @property([Number])
    poker_cards: Array<Number> = [];

    @property(Number)
    start_x: Number = 0;

    @property(Number)
    end_x: Number = 0;

    @property(cc.Node)
    store_cards: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.poker_selected_list = [];
        for (var i = 0 ; i < this.poker_node_list.length; i ++) {
            this.poker_selected_list.push(false);
        }
        
        this.poker_layout.on('touchstart', this.on_touch_start, this);
        this.poker_layout.on('touchend', this.on_touch_end, this);
        this.poker_layout.on('touchcancel', this.on_touch_end, this);
    },

    start () {
        this.store_cards_node = this.store_cards.getComponent("store_cards");
    },

    // update (dt) {},

    update_poker_cards(cards: Array<Number>) : void {
        cc.log("update poker cards, %s", cards);
        
        this.poker_cards = [];
        for (let i=0; i<cards.length; ++i) {
            this.poker_cards.push(cards[i]);
        }
        this.show_card_list();
    },

    on_destory() : void {
        this.poker_layout.off('touchstart', this.on_touch_start, this);
        this.poker_layout.off('touchend', this.on_touch_end, this);
        this.poker_layout.off('touchcancel', this.on_touch_end, this);
    },

    on_touch_start(event): void {
        this.start_x = this.poker_layout.convertTouchToNodeSpaceAR(event).x;
    },

    on_touch_end(event): void {
        this.end_x = this.poker_layout.convertTouchToNodeSpaceAR(event).x;
        this.check_selected(this.start_x, this.end_x);
    },


    check_selected(x1, x2): void {
        if (x1 > x2) {
            let t = x1;
            x1 = x2;
            x2 = t;
        }
        let len = this.poker_node_list.length;
        for (let i = 0; i < len; i ++) {
            let start = this.poker_node_list[i].x - this.poker_node_list[i].width / 2;
            let end = 0;
            if (i < (len - 1)) {
                end = this.poker_node_list[i+1].x - this.poker_node_list[i+1].width / 2;
            } else{
                end = this.poker_node_list[i].x + this.poker_node_list[i].width / 2;
            }
            if (start < x2 && end > x1) {
                this._update_selected(i);
            }
        }
    },

    _update_selected(idx): void {
        if (this.poker_selected_list[idx]) {
            this.poker_selected_list[idx] = false;
            this.poker_node_list[idx].y = 0;
        }
        else {
            this.poker_selected_list[idx] = true;
            this.poker_node_list[idx].y = 30;
        }
    },

    show_card_list(): void {
        this.store_cards_node.clear_cards();
        let card_num = this.poker_cards.length;
        let start_idx = Math.floor((this.poker_node_list.length - card_num) / 2);
        let end_idx = start_idx + card_num;
        for (var i=start_idx; i<end_idx; ++i) {
            this.poker_node_list[i].active = true;
                this.poker_node_list[i].y = 0;
            
                let card_idx = i - start_idx;
                this.store_cards_node.update_card(this.poker_cards[card_idx], this.poker_node_list[i]);
        }
    },
}

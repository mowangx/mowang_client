import { Component } from "../../../creator";

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
export default class game_scene extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        cc.log("game load scene!");
        

        this.schedule( function() {
            this.on_5_timer();
        }, 0.5);
    },

    update (dt) {
        
    },

    on_5_timer(): void {
        let card_num = Math.floor(Math.random() * 20);
        let cards: Array<Number> = [];
        for (let i =1; i<card_num; ++i) {
            cards.push(i);
        }
        this.player.getComponent("player").update_poker_cards(cards);
    }
}

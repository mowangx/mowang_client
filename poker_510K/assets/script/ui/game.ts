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

import client_mgr from "./../logic/client"
import dispatcher from "./../logic/dispatcher"
import {EventType} from "./../logic/consts"
import { client } from "../../../build/wechatgame/src/project.dev.ab3b5";

@ccclass
export default class game_scene extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        cc.log("game load scene!");
        

        dispatcher.add_dispatch(EventType.EVENT_SHOW_CARD, this.show_card, this);

        // this.schedule( function() {
        //     this.on_5_timer();
        // }, 0.5);

        client_mgr.create_room();
    },

    update (dt) {
        
    },

    on_5_timer(): void {
        dispatcher.dispatch(EventType.EVENT_START_SHOW_CARD);
    },

    show_card(cards: Array<Number>): void {
        cc.log("show card");
        this.player.getComponent("player").update_poker_cards(cards);
    },

    on_click_ready(): void {
        client_mgr.ready_start();
    }
}

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

import net_mgr from "./net_wrapper"
import wx_mgr from "./wx_wrapper"
import dispatcher from "./dispatcher"
import {EventType} from "./consts"

@ccclass
export class client extends cc.Component {

    constructor() {
        super();
        this.init();
    },

    init(): void {
        net_mgr.init("wss://www.mowang.com:10101");
        wx_mgr.init();
        dispatcher.add_dispatch(EventType.EVENT_RECV_MSG, this.handle_msg, this);
    },

    login(): void {
        let login_data = '{"cmd": "login", "code":"ABALKFJASLKDFJASLKcdlkj", "name":"xiedi", "sex":1}';
        net_mgr.send_msg(login_data);
    },

    handle_msg(msg): void {
        let obj = JSON.parse(msg);
        if (obj.cmd == "add_cards") {
            this.handle_add_cards(obj);
        }
        cc.log("handle msg: %s", msg);
    },

    handle_add_cards(obj): void {
        cc.log("handle start show card");
        dispatcher.dispatch(EventType.EVENT_SHOW_CARD, obj.cards);
    }

    create_room(): void {
        let msg = '{"cmd": "create_room", "pwd": "test"}';
        net_mgr.send_msg(msg);
    }

    ready_start(): void {
        let msg = '{"cmd":"ready_start"}';
        net_mgr.send_msg(msg);
    }

    pop_cards(cards: Array<Number>): void {
        let msg = '{"cmd":"pop_cards", "cards": []}';
        net_mgr.send_msg(msg);
    }
}

var client_mgr = new client();
export default client_mgr; 
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

@ccclass
export class client extends cc.Component {

    constructor() {
        super();
        this.init();
    },

    init(): void {
        net_mgr.init("ws://127.0.0.1:10121");
        wx_mgr.init();
        dispatcher.register("on_msg", this.handle_msg, this);
        dispatcher.register("start_show_card", this.handle_start_show_card, this);
    },

    login(): void {
        let login_data = '{"cmd": "login", "code":"ABALKFJASLKDFJASLKcdlkj", "name":"xiedi", "sex":1}';
        net_mgr.send_msg(login_data);
    },

    handle_msg(event_name, msg): void {
        cc.log("handle msg: %s", msg);
    },

    handle_start_show_card(event_name): void {
        cc.log("handle start show card");
        dispatcher.fire("show_card")
    }
}

var client_mgr = new client();
export default client_mgr; 
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

import dispatcher from "./dispatcher"

@ccclass
export class net_wrapper extends cc.Component {

    private ws: WebSocket = null;

    private msg: String = "";

    init(url: string): void {
        this.ws = new WebSocket(url);

        this.ws.onopen = this.on_open;
        this.ws.onclose = this.on_close;
        this.ws.onmessage = this.on_message;
        this.ws.onerror = this.on_error;
    },
   
    on_open(event): void {
        
    },
      
    on_close(event): void {
       
    },

    on_message(event): void {
        let start_idx = 0;
        let end_idx = 0;
        this.msg += event.data;
        for (let i=0; i<this.msg.length; ++i) {
            if (this.msg[i] == String.fromCharCode(2)) {
                start_idx = i + 1;
            }
            else if (this.msg[i] == String.fromCharCode(3)) {
                end_idx = i;
            }
        }
        let json_msg = this.msg.substring(start_idx, end_idx);
        dispatcher.fire("on_msg", json_msg);
        this.msg = this.msg.substring(end_idx);
    },
    
    on_error(event): void {
       
    },
   
    send_msg(data): void {
        let msg = String.fromCharCode(2) + data + String.fromCharCode(3);
        this.ws.send(msg);
    },

    is_valid(): Boolean {
        return this.ws.readyState === WebSocket.OPEN;
    }
}

var net_mgr = new net_wrapper();

export default net_mgr;

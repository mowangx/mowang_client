(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/logic/client.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4d5a4Y7D+NPA72p6o/X5X+H', 'client', __filename);
// scripts/logic/client.ts

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dispatcher_1 = require("./dispatcher");
var consts_1 = require("./consts");
var client = /** @class */ (function (_super) {
    __extends(client, _super);
    function client() {
        var _this = _super.call(this) || this;
        _this.result = false;
        _this.lvl = 1;
        _this.play_time = 0;
        dispatcher_1.default.add_dispatch(consts_1.EventType.EVENT_GAME_OVER_2, _this.on_game_over, _this);
        return _this;
    }
    client.prototype.init = function () {
    };
    client.prototype.on_game_over = function (result, lvl, play_time) {
        this.result = result;
        this.lvl = lvl;
        this.play_time = play_time;
    };
    client.prototype.get_result = function () {
        return this.result;
    };
    client.prototype.get_lvl = function () {
        return this.lvl;
    };
    client.prototype.get_play_time = function () {
        return this.play_time;
    };
    client = __decorate([
        ccclass
    ], client);
    return client;
}(cc.Component));
exports.client = client;
var client_mgr = new client();
exports.default = client_mgr;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=client.js.map
        
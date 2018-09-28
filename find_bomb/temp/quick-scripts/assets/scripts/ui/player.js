(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ui/player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '40f41ntPqVBYJdYnUq8dxPT', 'player', __filename);
// scripts/ui/player.ts

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
var client_1 = require("./../logic/client");
var player = /** @class */ (function (_super) {
    __extends(player, _super);
    function player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.head_info = null;
        _this.body_info = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    player.prototype.onLoad = function () {
    };
    player.prototype.start = function () {
        this.head_node = this.head_info.getComponent("head_info");
        this.body_node = this.body_info.getComponent("body_info");
        this.ready_start(client_1.default.get_lvl());
    };
    // update (dt) {},
    player.prototype.ready_start = function (lvl) {
        this.head_node.init_head(lvl);
        this.body_node.init_body(lvl);
    };
    __decorate([
        property(cc.Node)
    ], player.prototype, "head_info", void 0);
    __decorate([
        property(cc.Node)
    ], player.prototype, "body_info", void 0);
    player = __decorate([
        ccclass
    ], player);
    return player;
}(cc.Component));
exports.default = player;

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
        //# sourceMappingURL=player.js.map
        
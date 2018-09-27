(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ui/tail_info.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4543bv0IiNLdZ937ZZN86Hr', 'tail_info', __filename);
// scripts/ui/tail_info.ts

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
var tail_info = /** @class */ (function (_super) {
    __extends(tail_info, _super);
    function tail_info() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    tail_info.prototype.start = function () {
        this.player_node = this.player.getComponent('player');
    };
    // update (dt) {},
    tail_info.prototype.on_click_lvl_1 = function () {
        this.player_node.ready_start(1);
    };
    tail_info.prototype.on_click_lvl_2 = function () {
        this.player_node.ready_start(2);
    };
    tail_info.prototype.on_click_lvl_3 = function () {
        this.player_node.ready_start(3);
    };
    tail_info.prototype.on_click_lvl_4 = function () {
        this.player_node.ready_start(4);
    };
    tail_info.prototype.on_click_lvl_5 = function () {
        this.player_node.ready_start(5);
    };
    __decorate([
        property(cc.Node)
    ], tail_info.prototype, "player", void 0);
    tail_info = __decorate([
        ccclass
    ], tail_info);
    return tail_info;
}(cc.Component));
exports.default = tail_info;

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
        //# sourceMappingURL=tail_info.js.map
        
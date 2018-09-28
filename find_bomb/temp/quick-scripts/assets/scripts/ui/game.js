(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ui/game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '79e08S9ePlGt5MxH0Mi5CC8', 'game', __filename);
// scripts/ui/game.ts

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
var game = /** @class */ (function (_super) {
    __extends(game, _super);
    function game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        return _this;
        // update (dt) {},
    }
    // LIFE-CYCLE CALLBACKS:
    game.prototype.onLoad = function () {
        client_1.default.init();
    };
    game.prototype.start = function () {
    };
    __decorate([
        property(cc.Node)
    ], game.prototype, "player", void 0);
    game = __decorate([
        ccclass
    ], game);
    return game;
}(cc.Component));
exports.default = game;

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
        //# sourceMappingURL=game.js.map
        
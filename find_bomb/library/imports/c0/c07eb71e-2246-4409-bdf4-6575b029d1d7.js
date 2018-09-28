"use strict";
cc._RF.push(module, 'c07ebceIkZECb30ZXWwKdHX', 'result');
// scripts/ui/result.ts

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
var result = /** @class */ (function (_super) {
    __extends(result, _super);
    function result() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.result_info = null;
        _this.title_info = null;
        _this.content_info = null;
        _this.back_info = null;
        _this.result_label = null;
        _this.content_label_1 = null;
        _this.content_label_2 = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    result.prototype.start = function () {
        this.result_label.string = "扫雷结果";
        if (client_1.default.get_result()) {
            this.content_label_1.string = "恭喜成功排除所有地雷, 通关时间: " + client_1.default.get_play_time();
            if (client_1.default.get_lvl() < 5) {
                this.content_label_2.string = "解锁下一等级: " + this.get_next_lvl_desc();
            }
        }
        else {
            this.content_label_1.string = "很遗憾, 敌人过于狡猾, 未能排除所有地雷";
        }
    };
    // update (dt) {},
    result.prototype.get_next_lvl_desc = function () {
        var lvl = client_1.default.get_lvl();
        if (lvl == 1) {
            return "精英";
        }
        else if (lvl == 2) {
            return "大师";
        }
        else if (lvl == 3) {
            return "史诗";
        }
        else if (lvl == 4) {
            return "传奇";
        }
        return "";
    };
    result.prototype.on_click_btn = function () {
        cc.director.loadScene("game");
    };
    __decorate([
        property(cc.Node)
    ], result.prototype, "result_info", void 0);
    __decorate([
        property(cc.Node)
    ], result.prototype, "title_info", void 0);
    __decorate([
        property(cc.Node)
    ], result.prototype, "content_info", void 0);
    __decorate([
        property(cc.Node)
    ], result.prototype, "back_info", void 0);
    __decorate([
        property(cc.Label)
    ], result.prototype, "result_label", void 0);
    __decorate([
        property(cc.Label)
    ], result.prototype, "content_label_1", void 0);
    __decorate([
        property(cc.Label)
    ], result.prototype, "content_label_2", void 0);
    result = __decorate([
        ccclass
    ], result);
    return result;
}(cc.Component));
exports.default = result;

cc._RF.pop();
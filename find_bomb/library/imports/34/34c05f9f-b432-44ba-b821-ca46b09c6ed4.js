"use strict";
cc._RF.push(module, '34c05+ftDJEurghykawnG7U', 'head_info');
// scripts/ui/head_info.ts

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
var head_info = /** @class */ (function (_super) {
    __extends(head_info, _super);
    function head_info() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lvl_label = null;
        _this.time_label = null;
        _this.play_time = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    head_info.prototype.start = function () {
    };
    // update (dt) {},
    head_info.prototype.init_head = function (lvl) {
        this.play_time = 0;
        this.unschedule(this.on_1_minute_timer);
        this.schedule(this.on_1_minute_timer, 1);
        var lvl_desc = '';
        if (lvl == 1) {
            lvl_desc = '入门';
        }
        else if (lvl == 2) {
            lvl_desc = '精英';
        }
        else if (lvl == 3) {
            lvl_desc = '大师';
        }
        else if (lvl == 4) {
            lvl_desc = '史诗';
        }
        else if (lvl == 5) {
            lvl_desc = '传奇';
        }
        this.lvl_label.string = '当前挑战：' + lvl_desc;
        this.time_label.string = '00 : 00';
    };
    head_info.prototype.on_1_minute_timer = function () {
        this.play_time += 1;
        var minute = Math.floor(this.play_time / 60);
        var second = this.play_time % 60;
        if (minute < 10) {
            if (second < 10) {
                this.time_label.string = '0' + minute + ' : 0' + second;
            }
            else {
                this.time_label.string = '0' + minute + ' : ' + second;
            }
        }
        else {
            if (second < 10) {
                this.time_label.string = '' + minute + ' : 0' + second;
            }
            else {
                this.time_label.string = '' + minute + ' : ' + second;
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], head_info.prototype, "lvl_label", void 0);
    __decorate([
        property(cc.Label)
    ], head_info.prototype, "time_label", void 0);
    __decorate([
        property(Number)
    ], head_info.prototype, "play_time", void 0);
    head_info = __decorate([
        ccclass
    ], head_info);
    return head_info;
}(cc.Component));
exports.default = head_info;

cc._RF.pop();
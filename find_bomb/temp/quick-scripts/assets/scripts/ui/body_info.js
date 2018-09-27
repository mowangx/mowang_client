(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ui/body_info.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b90d7H1R5pDTpHuBi1UgTlb', 'body_info', __filename);
// scripts/ui/body_info.ts

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
var body_info = /** @class */ (function (_super) {
    __extends(body_info, _super);
    function body_info() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bomb_lvl_1 = null;
        _this.bomb_lvl_2 = null;
        _this.bomb_lvl_3 = null;
        _this.bomb_lvl_4 = null;
        _this.bomb_lvl_5 = null;
        _this.hide_node = null;
        _this.grid_list = [];
        _this.grid_lvl_1 = [];
        _this.grid_lvl_2 = [];
        _this.grid_lvl_3 = [];
        _this.grid_lvl_4 = [];
        _this.grid_lvl_5 = [];
        _this.normal_grid_1 = null;
        _this.normal_grid_2 = null;
        _this.normal_grid_3 = null;
        _this.normal_grid_4 = null;
        _this.normal_grid_5 = null;
        _this.click_x = 0;
        _this.click_y = 0;
        _this.lvl = 0;
        _this.bomb_list = [];
        _this.text_list = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    body_info.prototype.onLoad = function () {
        this.bomb_lvl_1.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_1.on('touchcancel', this.on_touch_end, this);
        this.bomb_lvl_2.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_2.on('touchcancel', this.on_touch_end, this);
        this.bomb_lvl_3.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_3.on('touchcancel', this.on_touch_end, this);
        this.bomb_lvl_4.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_4.on('touchcancel', this.on_touch_end, this);
        this.bomb_lvl_5.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_5.on('touchcancel', this.on_touch_end, this);
    };
    body_info.prototype.start = function () {
        for (var i = 0; i < 81; ++i) {
            this.text_list[i] = new cc.Node('text');
            this.text_list[i].addComponent(cc.Label);
        }
    };
    // update (dt) {},
    body_info.prototype.init_body = function (lvl) {
        this.hide_all();
        this.lvl = lvl;
        if (this.lvl == 1) {
            this.init_grid_list(this.grid_lvl_1, this.normal_grid_1);
        }
        else if (this.lvl == 2) {
            this.init_grid_list(this.grid_lvl_2, this.normal_grid_2);
        }
        else if (this.lvl == 3) {
            this.init_grid_list(this.grid_lvl_3, this.normal_grid_3);
        }
        else if (this.lvl == 4) {
            this.init_grid_list(this.grid_lvl_4, this.normal_grid_4);
        }
        else if (this.lvl == 5) {
            this.init_grid_list(this.grid_lvl_5, this.normal_grid_5);
        }
        this.init_bomb_list();
    };
    body_info.prototype.hide_all = function () {
        for (var i = 0; i < this.grid_list.length; ++i) {
            var child_node = this.grid_list[i];
            child_node.parent = this.hide_node;
        }
        for (var i = 0; i < this.text_list.length; ++i) {
            var child_node = this.text_list[i];
            child_node.parent = this.hide_node;
        }
    };
    body_info.prototype.init_grid_list = function (grid_lvl_list, normal_grid) {
        for (var i = 0; i < grid_lvl_list.length; i++) {
            this.grid_list[i] = cc.instantiate(normal_grid);
            var node = this.grid_list[i];
            var parent_node = grid_lvl_list[i];
            node.parent = parent_node;
            node.setPosition(cc.p(0, 0));
            node.width = parent_node.width;
            node.height = parent_node.height;
        }
    };
    body_info.prototype.init_bomb_list = function () {
        var bomb_num = this.get_random_range(4, 6);
        for (var i = 0; i < bomb_num; ++i) {
            var idx = 0;
            var coln_num = this.get_coln_num();
            var max_index = coln_num * coln_num - 1;
            for (var i_1 = 0; i_1 < coln_num; ++i_1) {
                idx = this.get_random_range(0, max_index);
                if (this.bomb_list.indexOf(idx) >= 0) {
                    continue;
                }
                else {
                    break;
                }
            }
            this.bomb_list[i] = idx;
        }
    };
    body_info.prototype.get_random_range = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    body_info.prototype.on_touch_end = function (event) {
        if (this.lvl == 1) {
            this.click_x = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_1);
        }
        else if (this.lvl == 2) {
            this.click_x = this.bomb_lvl_2.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_2.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_2);
        }
        else if (this.lvl == 3) {
            this.click_x = this.bomb_lvl_3.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_3.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_3);
        }
        else if (this.lvl == 4) {
            this.click_x = this.bomb_lvl_4.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_4.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_4);
        }
        else if (this.lvl == 5) {
            this.click_x = this.bomb_lvl_5.convertTouchToNodeSpaceAR(event).x;
            this.click_y = this.bomb_lvl_5.convertTouchToNodeSpaceAR(event).y;
            this.check_click(this.grid_lvl_5);
        }
    };
    body_info.prototype.check_click = function (grids) {
        var len = grids.length;
        for (var i = 0; i < len; i++) {
            var grid = grids[i];
            var start_x = grid.x - grid.width / 2;
            var start_y = grid.y - grid.height / 2;
            var end_x = grid.x + grid.width / 2;
            var end_y = grid.y + grid.height / 2;
            if (start_x < this.click_x && end_x > this.click_x &&
                start_y < this.click_y && end_y > this.click_y) {
                this.on_click_grid(grid, i);
                return;
            }
        }
    };
    body_info.prototype.on_click_grid = function (grid, idx) {
        var child_node = this.grid_list[idx];
        child_node.parent = this.hide_node;
        var text_node = this.text_list[idx];
        if (this.bomb_list.indexOf(idx) >= 0) {
            text_node.getComponent(cc.Label).string = 'bo';
        }
        else {
            text_node.getComponent(cc.Label).string = this.get_bomb_num(idx);
        }
        text_node.parent = grid;
        text_node.setPosition(cc.p(0, 0));
        text_node.width = grid.width;
        text_node.height = grid.height;
    };
    body_info.prototype.get_bomb_num = function (idx) {
        var max_coln_num = this.get_coln_num();
        var bomb_num = 0;
        var row = Math.floor(idx / max_coln_num);
        var coln = idx % max_coln_num;
        var check_indexes = [];
        if (row > 0 && row < (max_coln_num - 1)) {
            check_indexes.push(-1 * max_coln_num);
            check_indexes.push(max_coln_num);
            if (coln > 0 && coln < (max_coln_num - 1)) {
                check_indexes.push(-1);
                check_indexes.push(1);
                check_indexes.push(-1 * max_coln_num + 1);
                check_indexes.push(max_coln_num + 1);
                check_indexes.push(-1 * max_coln_num - 1);
                check_indexes.push(max_coln_num - 1);
            }
            else if (coln == 0) {
                check_indexes.push(1);
                check_indexes.push(-1 * max_coln_num + 1);
                check_indexes.push(max_coln_num + 1);
            }
            else {
                check_indexes.push(-1);
                check_indexes.push(-1 * max_coln_num - 1);
                check_indexes.push(max_coln_num - 1);
            }
        }
        else if (row == 0) {
            check_indexes.push(max_coln_num);
            if (coln > 0 && coln < (max_coln_num - 1)) {
                check_indexes.push(-1);
                check_indexes.push(1);
                check_indexes.push(max_coln_num - 1);
                check_indexes.push(max_coln_num + 1);
            }
            else if (coln == 0) {
                check_indexes.push(1);
                check_indexes.push(max_coln_num + 1);
            }
            else {
                check_indexes.push(-1);
                check_indexes.push(max_coln_num - 1);
            }
        }
        else {
            check_indexes.push(-1 * max_coln_num);
            if (coln > 0 && coln < (max_coln_num - 1)) {
                check_indexes.push(-1);
                check_indexes.push(1);
                check_indexes.push(-1 * max_coln_num - 1);
                check_indexes.push(-1 * max_coln_num + 1);
            }
            else if (coln == 0) {
                check_indexes.push(1);
                check_indexes.push(-1 * max_coln_num + 1);
            }
            else {
                check_indexes.push(-1);
                check_indexes.push(-1 * max_coln_num - 1);
            }
        }
        for (var i = 0; i < check_indexes.length; ++i) {
            var cur_idx = idx + check_indexes[i];
            if (this.check_bomb_by_idx(cur_idx)) {
                bomb_num += 1;
            }
        }
        return "" + bomb_num;
    };
    body_info.prototype.check_bomb_by_idx = function (idx) {
        if (idx < 0) {
            return false;
        }
        return this.bomb_list.indexOf(idx) >= 0;
    };
    body_info.prototype.get_coln_num = function () {
        if (this.lvl == 1) {
            return 5;
        }
        else if (this.lvl == 2) {
            return 6;
        }
        else if (this.lvl == 3) {
            return 7;
        }
        else if (this.lvl == 4) {
            return 8;
        }
        else {
            return 9;
        }
    };
    body_info.prototype.on_destory = function () {
        // this.bomb_lvl_1.off('touchstart', this.on_touch_start, this);
        this.bomb_lvl_1.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_1.off('touchcancel', this.on_touch_end, this);
        this.bomb_lvl_2.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_2.off('touchcancel', this.on_touch_end, this);
        this.bomb_lvl_3.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_3.off('touchcancel', this.on_touch_end, this);
        this.bomb_lvl_4.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_4.off('touchcancel', this.on_touch_end, this);
        this.bomb_lvl_5.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_5.off('touchcancel', this.on_touch_end, this);
    };
    __decorate([
        property(cc.Node)
    ], body_info.prototype, "bomb_lvl_1", void 0);
    __decorate([
        property(cc.Node)
    ], body_info.prototype, "bomb_lvl_2", void 0);
    __decorate([
        property(cc.Node)
    ], body_info.prototype, "bomb_lvl_3", void 0);
    __decorate([
        property(cc.Node)
    ], body_info.prototype, "bomb_lvl_4", void 0);
    __decorate([
        property(cc.Node)
    ], body_info.prototype, "bomb_lvl_5", void 0);
    __decorate([
        property(cc.Node)
    ], body_info.prototype, "hide_node", void 0);
    __decorate([
        property([cc.Node])
    ], body_info.prototype, "grid_list", void 0);
    __decorate([
        property([cc.Node])
    ], body_info.prototype, "grid_lvl_1", void 0);
    __decorate([
        property([cc.Node])
    ], body_info.prototype, "grid_lvl_2", void 0);
    __decorate([
        property([cc.Node])
    ], body_info.prototype, "grid_lvl_3", void 0);
    __decorate([
        property([cc.Node])
    ], body_info.prototype, "grid_lvl_4", void 0);
    __decorate([
        property([cc.Node])
    ], body_info.prototype, "grid_lvl_5", void 0);
    __decorate([
        property(cc.Prefab)
    ], body_info.prototype, "normal_grid_1", void 0);
    __decorate([
        property(cc.Prefab)
    ], body_info.prototype, "normal_grid_2", void 0);
    __decorate([
        property(cc.Prefab)
    ], body_info.prototype, "normal_grid_3", void 0);
    __decorate([
        property(cc.Prefab)
    ], body_info.prototype, "normal_grid_4", void 0);
    __decorate([
        property(cc.Prefab)
    ], body_info.prototype, "normal_grid_5", void 0);
    __decorate([
        property(Number)
    ], body_info.prototype, "click_x", void 0);
    __decorate([
        property(Number)
    ], body_info.prototype, "click_y", void 0);
    __decorate([
        property(Number)
    ], body_info.prototype, "lvl", void 0);
    __decorate([
        property([Number])
    ], body_info.prototype, "bomb_list", void 0);
    __decorate([
        property([cc.Node])
    ], body_info.prototype, "text_list", void 0);
    body_info = __decorate([
        ccclass
    ], body_info);
    return body_info;
}(cc.Component));
exports.default = body_info;

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
        //# sourceMappingURL=body_info.js.map
        
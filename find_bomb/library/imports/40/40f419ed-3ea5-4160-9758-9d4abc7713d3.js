"use strict";
cc._RF.push(module, '40f41ntPqVBYJdYnUq8dxPT', 'player');
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
var player = /** @class */ (function (_super) {
    __extends(player, _super);
    function player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hide_node = null;
        _this.bomb_lvl_1 = null;
        _this.bomb_lvl_2 = null;
        _this.bomb_lvl_3 = null;
        _this.bomb_lvl_4 = null;
        _this.bomb_lvl_5 = null;
        _this.grid_list = [];
        _this.grid_lvl_1 = [];
        _this.grid_lvl_2 = [];
        _this.grid_lvl_3 = [];
        _this.grid_lvl_4 = [];
        _this.grid_lvl_5 = [];
        _this.normal_grid = null;
        _this.click_x = 0;
        _this.click_y = 0;
        _this.lvl = 0;
        _this.bomb_list = [];
        _this.text_list = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    player.prototype.onLoad = function () {
        //this.bomb_lvl_1.on('touchstart', this.on_touch_start, this);
        this.bomb_lvl_1.on('touchend', this.on_touch_end, this);
        this.bomb_lvl_1.on('touchcancel', this.on_touch_end, this);
        // this.bomb_lvl_2.on('touchend', this.on_touch_end, this);
        // this.bomb_lvl_2.on('touchcancel', this.on_touch_end, this);
        // this.bomb_lvl_3.on('touchend', this.on_touch_end, this);
        // this.bomb_lvl_3.on('touchcancel', this.on_touch_end, this);
        // this.bomb_lvl_4.on('touchend', this.on_touch_end, this);
        // this.bomb_lvl_4.on('touchcancel', this.on_touch_end, this);
        // this.bomb_lvl_5.on('touchend', this.on_touch_end, this);
        // this.bomb_lvl_5.on('touchcancel', this.on_touch_end, this);
    };
    player.prototype.start = function () {
        for (var i = 0; i < 81; ++i) {
            this.text_list[i] = new cc.Node('text');
            this.text_list[i].addComponent(cc.Label);
        }
        this.ready_start(1);
    };
    // update (dt) {},
    player.prototype.ready_start = function (lvl) {
        this.lvl = lvl;
        if (this.lvl == 1) {
            this.init_grid_list(this.grid_lvl_1);
        }
        else if (this.lvl == 2) {
            this.init_grid_list(this.grid_lvl_2);
        }
        else if (this.lvl == 3) {
            this.init_grid_list(this.grid_lvl_3);
        }
        else if (this.lvl == 4) {
            this.init_grid_list(this.grid_lvl_4);
        }
        else if (this.lvl == 5) {
            this.init_grid_list(this.grid_lvl_5);
        }
        this.init_bomb_list();
    };
    player.prototype.init_grid_list = function (grid_lvl_list) {
        for (var i = 0; i < grid_lvl_list.length; i++) {
            this.grid_list[i] = cc.instantiate(this.normal_grid);
            var node = this.grid_list[i];
            var parent_node = this.grid_lvl_1[i];
            node.parent = parent_node;
            node.setPosition(cc.p(0, 0));
            node.width = parent_node.width;
            node.height = parent_node.height;
        }
    };
    player.prototype.init_bomb_list = function () {
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
        this.bomb_list = [6, 7, 10, 12, 23];
    };
    player.prototype.get_random_range = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    player.prototype.on_destory = function () {
        // this.bomb_lvl_1.off('touchstart', this.on_touch_start, this);
        this.bomb_lvl_1.off('touchend', this.on_touch_end, this);
        this.bomb_lvl_1.off('touchcancel', this.on_touch_end, this);
        // this.bomb_lvl_2.off('touchend', this.on_touch_end, this);
        // this.bomb_lvl_2.off('touchcancel', this.on_touch_end, this);
        // this.bomb_lvl_3.off('touchend', this.on_touch_end, this);
        // this.bomb_lvl_3.off('touchcancel', this.on_touch_end, this);
        // this.bomb_lvl_4.off('touchend', this.on_touch_end, this);
        // this.bomb_lvl_4.off('touchcancel', this.on_touch_end, this);
        // this.bomb_lvl_5.off('touchend', this.on_touch_end, this);
        // this.bomb_lvl_5.off('touchcancel', this.on_touch_end, this);
    };
    player.prototype.on_touch_start = function (event) {
        // this.start_x = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).x;
        // this.start_y = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).y;
    };
    player.prototype.on_touch_end = function (event) {
        this.click_x = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).x;
        this.click_y = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).y;
        if (this.lvl == 1) {
            this.check_click(this.grid_lvl_1);
        }
        else if (this.lvl == 2) {
            this.check_click(this.grid_lvl_2);
        }
        else if (this.lvl == 3) {
            this.check_click(this.grid_lvl_3);
        }
        else if (this.lvl == 4) {
            this.check_click(this.grid_lvl_4);
        }
        else if (this.lvl == 5) {
            this.check_click(this.grid_lvl_5);
        }
    };
    player.prototype.check_click = function (grids) {
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
    player.prototype.on_click_grid = function (grid, idx) {
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
    player.prototype.get_bomb_num = function (idx) {
        var max_coln_num = this.get_coln_num();
        var bomb_num = 0;
        var row = Math.floor(idx / max_coln_num);
        var coln = idx % max_coln_num;
        var check_indexes = [];
        cc.log("row %d, coln %d", row, coln);
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
            cc.log("check index 111 %d", cur_idx);
            if (this.check_bomb_by_idx(cur_idx)) {
                bomb_num += 1;
                cc.log("check index 222 %d", cur_idx);
            }
        }
        return "" + bomb_num;
    };
    player.prototype.check_bomb_by_idx = function (idx) {
        if (idx < 0) {
            return false;
        }
        return this.bomb_list.indexOf(idx) >= 0;
    };
    player.prototype.get_coln_num = function () {
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
    __decorate([
        property(cc.Node)
    ], player.prototype, "hide_node", void 0);
    __decorate([
        property(cc.Node)
    ], player.prototype, "bomb_lvl_1", void 0);
    __decorate([
        property(cc.Node)
    ], player.prototype, "bomb_lvl_2", void 0);
    __decorate([
        property(cc.Node)
    ], player.prototype, "bomb_lvl_3", void 0);
    __decorate([
        property(cc.Node)
    ], player.prototype, "bomb_lvl_4", void 0);
    __decorate([
        property(cc.Node)
    ], player.prototype, "bomb_lvl_5", void 0);
    __decorate([
        property([cc.Node])
    ], player.prototype, "grid_list", void 0);
    __decorate([
        property([cc.Node])
    ], player.prototype, "grid_lvl_1", void 0);
    __decorate([
        property([cc.Node])
    ], player.prototype, "grid_lvl_2", void 0);
    __decorate([
        property([cc.Node])
    ], player.prototype, "grid_lvl_3", void 0);
    __decorate([
        property([cc.Node])
    ], player.prototype, "grid_lvl_4", void 0);
    __decorate([
        property([cc.Node])
    ], player.prototype, "grid_lvl_5", void 0);
    __decorate([
        property(cc.Prefab)
    ], player.prototype, "normal_grid", void 0);
    __decorate([
        property(Number)
    ], player.prototype, "click_x", void 0);
    __decorate([
        property(Number)
    ], player.prototype, "click_y", void 0);
    __decorate([
        property(Number)
    ], player.prototype, "lvl", void 0);
    __decorate([
        property([Number])
    ], player.prototype, "bomb_list", void 0);
    __decorate([
        property([cc.Node])
    ], player.prototype, "text_list", void 0);
    player = __decorate([
        ccclass
    ], player);
    return player;
}(cc.Component));
exports.default = player;

cc._RF.pop();
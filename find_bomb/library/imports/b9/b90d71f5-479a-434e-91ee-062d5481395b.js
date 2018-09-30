"use strict";
cc._RF.push(module, 'b90d7H1R5pDTpHuBi1UgTlb', 'body_info');
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
var dispatcher_1 = require("./../logic/dispatcher");
var consts_1 = require("./../logic/consts");
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
        _this.bomb_node_list = [];
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
        _this.bomb_node = null;
        _this.num_label = null;
        _this.click_x = 0;
        _this.click_y = 0;
        _this.lvl = 0;
        _this.bomb_list = [];
        _this.text_list = [];
        _this.grid_status = [];
        _this.bomb_flag = false;
        _this.game_over_flag = false;
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
            this.text_list[i] = cc.instantiate(this.num_label);
            this.bomb_node_list[i] = cc.instantiate(this.bomb_node);
            this.grid_status[i] = false;
        }
        dispatcher_1.default.add_dispatch(consts_1.EventType.EVENT_CLICK_BOMB_BTN, this.on_change_bomb_flag, this);
    };
    // update (dt) {},
    body_info.prototype.init_body = function (lvl) {
        this.hide_all();
        this.game_over_flag = false;
        this.bomb_flag = false;
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
        for (var i = 0; i < this.bomb_node_list.length; ++i) {
            var child_node = this.bomb_node_list[i];
            child_node.parent = this.hide_node;
        }
        for (var i = 0; i < this.grid_status.length; ++i) {
            this.grid_status[i] = false;
        }
        for (var i = 0; i < this.bomb_list.length; ++i) {
            this.bomb_list[i] = -1;
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
        if (this.lvl == 1) {
            this.init_bombo_list_1();
        }
        else if (this.lvl == 2) {
            this.init_bomb_list_2();
        }
        else if (this.lvl == 3) {
            this.init_bomb_list_3();
        }
        else if (this.lvl == 4) {
            this.init_bomb_list_4();
        }
        else {
            this.init_bomb_list_5();
        }
        // let coln_num = this.get_coln_num();
        // let max_index = coln_num * coln_num - 1;
        // let bomb_num = this.get_random_bomb_num() + this.lvl;
        // for (let i=0; i<bomb_num; ++i) {
        //     let idx = 0;
        //     for (let i=0; i<coln_num; ++i) {
        //         idx = this.get_random_range(0, max_index);
        //         if (this.bomb_list.indexOf(idx) >= 0) {
        //             continue;
        //         } 
        //         else {
        //             break;
        //         }
        //     }
        //     this.bomb_list[i] = idx;
        // }
        // this.optimizate_bomb_list(max_index);
    };
    body_info.prototype.init_bombo_list_1 = function () {
        var start_indexes = [0, 3, 10];
        var j_ary = [3, 2, 3];
        for (var i = 0; i < start_indexes.length; ++i) {
            var random_idx = 0;
            if (i == 0) {
                random_idx = this.get_random_range(0, 5);
            }
            else if (i == 1) {
                random_idx = this.get_random_range(0, 9);
            }
            else {
                random_idx = this.get_random_range(0, 8);
            }
            this.bomb_list[i] = this.get_real_random_idx(start_indexes[i], random_idx, j_ary[i], 5);
        }
    };
    body_info.prototype.init_bomb_list_2 = function () {
        var start_indexes = [0, 2, 4, 18, 20, 22];
        for (var i = 0; i < start_indexes.length; ++i) {
            var random_idx = this.get_random_range(0, 5);
            this.bomb_list[i] = this.get_real_random_idx(start_indexes[i], random_idx, 2, 6);
        }
    };
    body_info.prototype.init_bomb_list_3 = function () {
        var start_indexes = [0, 3, 5, 14, 24, 28, 30, 39];
        var j_ary = [3, 2, 2, 3, 4, 2, 2, 3];
        for (var i = 0; i < start_indexes.length; ++i) {
            var random_idx = this.get_random_range(0, i == 4 ? 6 : 5);
            if (i == 4) {
                var random_idx_1 = this.get_random_range(0, 6);
                var idx = this.get_real_random_idx(start_indexes[i], random_idx_1, j_ary[i], 7);
                this.bomb_list[i] = random_idx_1 > 3 ? (idx + 1) : idx;
            }
            else {
                var random_idx_2 = this.get_random_range(0, 5);
                this.bomb_list[i] = this.get_real_random_idx(start_indexes[i], random_idx_2, j_ary[i], 7);
            }
        }
    };
    body_info.prototype.init_bomb_list_4 = function () {
        var start_indexes = [0, 2, 6, 18, 32, 36, 38, 48];
        var random_indexes = [];
        var j_ary = [2, 4, 2, 4, 4, 2, 2, 4];
        for (var i = 0; i < 20; ++i) {
            var idx = this.get_random_range(0, 7);
            if (random_indexes.indexOf(idx) >= 0) {
                continue;
            }
            random_indexes.push(idx);
            if (random_indexes.length > 3) {
                break;
            }
        }
        var k = 0;
        for (var i = 0; i < start_indexes.length; ++i) {
            var len = random_indexes.indexOf(i) >= 0 ? 2 : 1;
            var cur_len = 0;
            for (var j = 0; j < 5; ++j) {
                var random_idx = this.get_random_range(0, 7);
                var idx = this.get_real_random_idx(start_indexes[i], random_idx, j_ary[i], 8);
                if (this.bomb_list.indexOf(idx) >= 0) {
                    continue;
                }
                this.bomb_list[k] = idx;
                k += 1;
                cur_len += 1;
                if (cur_len >= len) {
                    break;
                }
            }
        }
    };
    body_info.prototype.init_bomb_list_5 = function () {
        var start_indexes = [0, 5, 7, 18, 36, 38, 49, 67];
        var j_ary = [5, 2, 2, 5, 2, 2, 5, 5];
        var k = 0;
        for (var i = 0; i < start_indexes.length; ++i) {
            var cur_len = 0;
            for (var j = 0; j < 5; ++j) {
                var random_idx = this.get_random_range(0, i == 3 ? 10 : 9);
                var idx = this.get_real_random_idx(start_indexes[i], random_idx, j_ary[i], 9);
                if (i == 3 && random_idx == 10) {
                    idx += 4;
                }
                if (this.bomb_list.indexOf(idx) >= 0) {
                    continue;
                }
                this.bomb_list[k] = idx;
                k += 1;
                cur_len += 1;
                if (cur_len > 1) {
                    break;
                }
            }
        }
    };
    body_info.prototype.get_real_random_idx = function (start_index, random_idx, j, coln) {
        return start_index + Math.floor(random_idx / j) * coln + random_idx % j;
    };
    body_info.prototype.get_random_bomb_num = function () {
        var min_num = 0;
        var max_num = 0;
        if (this.lvl == 1) {
            min_num = 3;
            max_num = 4;
        }
        else if (this.lvl == 2) {
            min_num = 5;
            max_num = 6;
        }
        else if (this.lvl == 3) {
            min_num = 8;
            max_num = 9;
        }
        else if (this.lvl == 4) {
            min_num = 11;
            max_num = 12;
        }
        else {
            min_num = 15;
            max_num = 16;
        }
        return this.get_random_range(min_num, max_num);
    };
    body_info.prototype.get_random_range = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    body_info.prototype.optimizate_bomb_list = function (max_index) {
        var desc_bomb_num = this.lvl;
        for (var i = 0; i < max_index; ++i) {
            var around_indexes = this.get_around_indexs(i);
            var cur_bomb_num = this.get_bomb_num(i, around_indexes);
            if (cur_bomb_num < 4) {
                continue;
            }
            for (var j = 0; j < around_indexes.length; ++j) {
                var idx = i + around_indexes[j];
                if (idx >= this.bomb_list.length || this.bomb_list[idx] < 0) {
                    continue;
                }
                this.bomb_list[idx] = -1;
                desc_bomb_num -= 1;
                break;
            }
        }
        for (var i = 0; i < 20; ++i) {
            if (desc_bomb_num < 1) {
                return;
            }
            var idx = this.get_random_range(0, this.bomb_list.length - 1);
            if (this.bomb_list[idx] < 0) {
                continue;
            }
            this.bomb_list[idx] = -1;
            desc_bomb_num -= 1;
        }
    };
    body_info.prototype.on_touch_end = function (event) {
        var lvl_node = this.get_lvl_node();
        this.click_x = lvl_node.convertTouchToNodeSpaceAR(event).x;
        this.click_y = lvl_node.convertTouchToNodeSpaceAR(event).y;
        this.check_click();
    };
    body_info.prototype.get_lvl_node = function () {
        if (this.lvl == 1) {
            return this.bomb_lvl_1;
        }
        else if (this.lvl == 2) {
            return this.bomb_lvl_2;
        }
        else if (this.lvl == 3) {
            return this.bomb_lvl_3;
        }
        else if (this.lvl == 4) {
            return this.bomb_lvl_4;
        }
        else {
            return this.bomb_lvl_5;
        }
    };
    body_info.prototype.get_grid_nodes = function () {
        if (this.lvl == 1) {
            return this.grid_lvl_1;
        }
        else if (this.lvl == 2) {
            return this.grid_lvl_2;
        }
        else if (this.lvl == 3) {
            return this.grid_lvl_3;
        }
        else if (this.lvl == 4) {
            return this.grid_lvl_4;
        }
        else {
            return this.grid_lvl_5;
        }
    };
    body_info.prototype.get_grid_node = function (idx) {
        var grids = this.get_grid_nodes();
        return grids[idx];
    };
    body_info.prototype.check_click = function () {
        var grids = this.get_grid_nodes();
        var len = grids.length;
        for (var i = 0; i < len; i++) {
            var grid = grids[i];
            var start_x = grid.x - grid.width / 2;
            var start_y = grid.y - grid.height / 2;
            var end_x = grid.x + grid.width / 2;
            var end_y = grid.y + grid.height / 2;
            if (start_x < this.click_x && end_x > this.click_x &&
                start_y < this.click_y && end_y > this.click_y) {
                this.on_click_grid(i);
                return;
            }
        }
    };
    body_info.prototype.on_click_grid = function (idx) {
        if (this.game_over_flag || this.grid_status[idx]) {
            return;
        }
        this.update_grid_node(idx, []);
        if (this.bomb_flag) {
            this.bomb_flag = false;
            this.grid_status[idx] = false;
        }
        else if (this.bomb_list.indexOf(idx) >= 0) {
            this.game_over_flag = true;
            this.show_all_grid();
        }
        else {
            var max_coln_num = this.get_coln_num();
            var len = max_coln_num * max_coln_num;
            for (var i = 0; i < len; ++i) {
                if (this.grid_status[i] || this.bomb_list.indexOf(i) >= 0) {
                    continue;
                }
                return;
            }
            this.on_game_over(true);
        }
    };
    body_info.prototype.update_grid_node = function (idx, ignore_indexes) {
        this.grid_status[idx] = true;
        var child_node = this.grid_list[idx];
        child_node.parent = this.hide_node;
        var replace_node = null;
        if (this.bomb_flag || this.bomb_list.indexOf(idx) >= 0) {
            replace_node = this.bomb_node_list[idx];
        }
        else {
            var bomb_node = this.bomb_node_list[idx];
            bomb_node.parent = this.hide_node;
            replace_node = this.text_list[idx];
            var check_indexes = this.get_around_indexs(idx);
            var bomb_num = this.get_bomb_num(idx, check_indexes);
            if (bomb_num > 0) {
                var cur_label = replace_node.getComponent(cc.Label);
                cur_label.string = '' + bomb_num;
            }
            else {
                var cur_ingore_indexes = ignore_indexes.concat([idx]);
                for (var i = 0; i < check_indexes.length; ++i) {
                    var cur_idx = idx + check_indexes[i];
                    if (ignore_indexes.indexOf(cur_idx) >= 0) {
                        continue;
                    }
                    cur_ingore_indexes.push(cur_idx);
                }
                for (var i = 0; i < check_indexes.length; ++i) {
                    var cur_idx = idx + check_indexes[i];
                    if (ignore_indexes.indexOf(cur_idx) >= 0) {
                        continue;
                    }
                    this.update_grid_node(cur_idx, cur_ingore_indexes);
                }
                return;
            }
        }
        var grid = this.get_grid_node(idx);
        replace_node.parent = grid;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = grid.width;
        replace_node.height = grid.height;
    };
    body_info.prototype.get_around_indexs = function (idx) {
        var max_coln_num = this.get_coln_num();
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
        return check_indexes;
    };
    body_info.prototype.get_bomb_num = function (idx, check_indexes) {
        var bomb_num = 0;
        for (var i = 0; i < check_indexes.length; ++i) {
            var cur_idx = idx + check_indexes[i];
            if (this.check_bomb_by_idx(cur_idx)) {
                bomb_num += 1;
            }
        }
        return bomb_num;
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
    body_info.prototype.show_all_grid = function () {
        this.schedule(this.show_grid_delay, 0.1);
    };
    body_info.prototype.show_grid_delay = function () {
        dispatcher_1.default.dispatch(consts_1.EventType.EVENT_GAME_OVER_1);
        this.bomb_flag = false;
        var max_coln_num = this.get_coln_num();
        var len = max_coln_num * max_coln_num;
        for (var i = 0; i < len; ++i) {
            if (this.grid_status[i]) {
                continue;
            }
            this.grid_status[i] = true;
            this.update_grid_node(i, []);
            return;
        }
        this.unschedule(this.show_grid_delay);
        this.on_game_over(false);
    };
    body_info.prototype.on_change_bomb_flag = function () {
        this.bomb_flag = true;
    };
    body_info.prototype.on_game_over = function (result) {
        dispatcher_1.default.dispatch(consts_1.EventType.EVENT_GAME_OVER_2, result, this.lvl);
        cc.director.loadScene("result");
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
    ], body_info.prototype, "bomb_node_list", void 0);
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
        property(cc.Prefab)
    ], body_info.prototype, "bomb_node", void 0);
    __decorate([
        property(cc.Prefab)
    ], body_info.prototype, "num_label", void 0);
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
    __decorate([
        property([Boolean])
    ], body_info.prototype, "grid_status", void 0);
    __decorate([
        property(Boolean)
    ], body_info.prototype, "bomb_flag", void 0);
    __decorate([
        property(Boolean)
    ], body_info.prototype, "game_over_flag", void 0);
    body_info = __decorate([
        ccclass
    ], body_info);
    return body_info;
}(cc.Component));
exports.default = body_info;

cc._RF.pop();
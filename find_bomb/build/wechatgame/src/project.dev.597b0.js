require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79e08S9ePlGt5MxH0Mi5CC8", "game");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var game = function(_super) {
      __extends(game, _super);
      function game() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.player = null;
        return _this;
      }
      game.prototype.start = function() {};
      __decorate([ property(cc.Node) ], game.prototype, "player", void 0);
      game = __decorate([ ccclass ], game);
      return game;
    }(cc.Component);
    exports.default = game;
    cc._RF.pop();
  }, {} ],
  player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "40f41ntPqVBYJdYnUq8dxPT", "player");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var player = function(_super) {
      __extends(player, _super);
      function player() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
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
      player.prototype.onLoad = function() {
        this.bomb_lvl_1.on("touchend", this.on_touch_end, this);
        this.bomb_lvl_1.on("touchcancel", this.on_touch_end, this);
      };
      player.prototype.start = function() {
        for (var i = 0; i < 81; ++i) {
          this.text_list[i] = new cc.Node("text");
          this.text_list[i].addComponent(cc.Label);
        }
        this.ready_start(1);
      };
      player.prototype.ready_start = function(lvl) {
        this.lvl = lvl;
        1 == this.lvl ? this.init_grid_list(this.grid_lvl_1) : 2 == this.lvl ? this.init_grid_list(this.grid_lvl_2) : 3 == this.lvl ? this.init_grid_list(this.grid_lvl_3) : 4 == this.lvl ? this.init_grid_list(this.grid_lvl_4) : 5 == this.lvl && this.init_grid_list(this.grid_lvl_5);
        this.init_bomb_list();
      };
      player.prototype.init_grid_list = function(grid_lvl_list) {
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
      player.prototype.init_bomb_list = function() {
        var bomb_num = this.get_random_range(4, 6);
        for (var i = 0; i < bomb_num; ++i) {
          var idx = 0;
          var coln_num = this.get_coln_num();
          var max_index = coln_num * coln_num - 1;
          for (var i_1 = 0; i_1 < coln_num; ++i_1) {
            idx = this.get_random_range(0, max_index);
            if (this.bomb_list.indexOf(idx) >= 0) continue;
            break;
          }
          this.bomb_list[i] = idx;
        }
      };
      player.prototype.get_random_range = function(min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return min + Math.round(Rand * Range);
      };
      player.prototype.on_destory = function() {
        this.bomb_lvl_1.off("touchend", this.on_touch_end, this);
        this.bomb_lvl_1.off("touchcancel", this.on_touch_end, this);
      };
      player.prototype.on_touch_start = function(event) {};
      player.prototype.on_touch_end = function(event) {
        this.click_x = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).x;
        this.click_y = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).y;
        1 == this.lvl ? this.check_click(this.grid_lvl_1) : 2 == this.lvl ? this.check_click(this.grid_lvl_2) : 3 == this.lvl ? this.check_click(this.grid_lvl_3) : 4 == this.lvl ? this.check_click(this.grid_lvl_4) : 5 == this.lvl && this.check_click(this.grid_lvl_5);
      };
      player.prototype.check_click = function(grids) {
        var len = grids.length;
        for (var i = 0; i < len; i++) {
          var grid = grids[i];
          var start_x = grid.x - grid.width / 2;
          var start_y = grid.y - grid.height / 2;
          var end_x = grid.x + grid.width / 2;
          var end_y = grid.y + grid.height / 2;
          if (start_x < this.click_x && end_x > this.click_x && start_y < this.click_y && end_y > this.click_y) {
            this.on_click_grid(grid, i);
            return;
          }
        }
      };
      player.prototype.on_click_grid = function(grid, idx) {
        var child_node = this.grid_list[idx];
        child_node.parent = this.hide_node;
        var text_node = this.text_list[idx];
        this.bomb_list.indexOf(idx) >= 0 ? text_node.getComponent(cc.Label).string = "bo" : text_node.getComponent(cc.Label).string = this.get_bomb_num(idx);
        text_node.parent = grid;
        text_node.setPosition(cc.p(0, 0));
        text_node.width = grid.width;
        text_node.height = grid.height;
      };
      player.prototype.get_bomb_num = function(idx) {
        var max_coln_num = this.get_coln_num();
        var bomb_num = 0;
        var row = Math.round(idx / max_coln_num);
        var coln = idx % max_coln_num;
        var check_indexes = [];
        if (row > 0 && row < max_coln_num - 1) {
          check_indexes.push(-1 * max_coln_num);
          check_indexes.push(max_coln_num);
          if (coln > 0 && coln < max_coln_num - 1) {
            check_indexes.push(-1);
            check_indexes.push(1);
            check_indexes.push(-1 * max_coln_num + 1);
            check_indexes.push(max_coln_num + 1);
            check_indexes.push(-1 * max_coln_num - 1);
            check_indexes.push(max_coln_num - 1);
          } else if (0 == coln) {
            check_indexes.push(1);
            check_indexes.push(-1 * max_coln_num + 1);
            check_indexes.push(max_coln_num + 1);
          } else {
            check_indexes.push(-1);
            check_indexes.push(-1 * max_coln_num - 1);
            check_indexes.push(max_coln_num - 1);
          }
        } else if (0 == row) {
          check_indexes.push(max_coln_num);
          if (coln > 0 && coln < max_coln_num - 1) {
            check_indexes.push(-1);
            check_indexes.push(1);
            check_indexes.push(max_coln_num - 1);
            check_indexes.push(max_coln_num + 1);
          } else if (0 == coln) {
            check_indexes.push(1);
            check_indexes.push(max_coln_num + 1);
          } else {
            check_indexes.push(-1);
            check_indexes.push(max_coln_num - 1);
          }
        } else {
          check_indexes.push(-1 * max_coln_num);
          if (coln > 0 && coln < max_coln_num - 1) {
            check_indexes.push(-1);
            check_indexes.push(1);
            check_indexes.push(-1 * max_coln_num - 1);
            check_indexes.push(-1 * max_coln_num + 1);
          } else if (0 == coln) {
            check_indexes.push(1);
            check_indexes.push(-1 * max_coln_num + 1);
          } else {
            check_indexes.push(-1);
            check_indexes.push(-1 * max_coln_num - 1);
          }
        }
        for (var i = 0; i < check_indexes.length; ++i) {
          var cur_idx = idx + check_indexes[i];
          this.check_bomb_by_idx(cur_idx) && (bomb_num += 1);
        }
        return "" + bomb_num;
      };
      player.prototype.check_bomb_by_idx = function(idx) {
        if (idx < 0) return false;
        return this.bomb_list.indexOf(idx) >= 0;
      };
      player.prototype.get_coln_num = function() {
        return 1 == this.lvl ? 5 : 2 == this.lvl ? 6 : 3 == this.lvl ? 7 : 4 == this.lvl ? 8 : 9;
      };
      __decorate([ property(cc.Node) ], player.prototype, "hide_node", void 0);
      __decorate([ property(cc.Node) ], player.prototype, "bomb_lvl_1", void 0);
      __decorate([ property(cc.Node) ], player.prototype, "bomb_lvl_2", void 0);
      __decorate([ property(cc.Node) ], player.prototype, "bomb_lvl_3", void 0);
      __decorate([ property(cc.Node) ], player.prototype, "bomb_lvl_4", void 0);
      __decorate([ property(cc.Node) ], player.prototype, "bomb_lvl_5", void 0);
      __decorate([ property([ cc.Node ]) ], player.prototype, "grid_list", void 0);
      __decorate([ property([ cc.Node ]) ], player.prototype, "grid_lvl_1", void 0);
      __decorate([ property([ cc.Node ]) ], player.prototype, "grid_lvl_2", void 0);
      __decorate([ property([ cc.Node ]) ], player.prototype, "grid_lvl_3", void 0);
      __decorate([ property([ cc.Node ]) ], player.prototype, "grid_lvl_4", void 0);
      __decorate([ property([ cc.Node ]) ], player.prototype, "grid_lvl_5", void 0);
      __decorate([ property(cc.Prefab) ], player.prototype, "normal_grid", void 0);
      __decorate([ property(Number) ], player.prototype, "click_x", void 0);
      __decorate([ property(Number) ], player.prototype, "click_y", void 0);
      __decorate([ property(Number) ], player.prototype, "lvl", void 0);
      __decorate([ property([ Number ]) ], player.prototype, "bomb_list", void 0);
      __decorate([ property([ cc.Node ]) ], player.prototype, "text_list", void 0);
      player = __decorate([ ccclass ], player);
      return player;
    }(cc.Component);
    exports.default = player;
    cc._RF.pop();
  }, {} ],
  start: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8b3aMJe4RAyJ2RYsQ1J6ih", "start");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.start = function() {};
      NewClass.prototype.on_click_start = function() {
        cc.director.loadScene("game");
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ]
}, {}, [ "game", "player", "start" ]);
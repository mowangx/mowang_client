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
  body_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b90d7H1R5pDTpHuBi1UgTlb", "body_info");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var body_info = function(_super) {
      __extends(body_info, _super);
      function body_info() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
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
      body_info.prototype.onLoad = function() {
        this.bomb_lvl_1.on("touchend", this.on_touch_end, this);
        this.bomb_lvl_1.on("touchcancel", this.on_touch_end, this);
        this.bomb_lvl_2.on("touchend", this.on_touch_end, this);
        this.bomb_lvl_2.on("touchcancel", this.on_touch_end, this);
      };
      body_info.prototype.start = function() {
        for (var i = 0; i < 81; ++i) {
          this.text_list[i] = new cc.Node("text");
          this.text_list[i].addComponent(cc.Label);
        }
      };
      body_info.prototype.init_body = function(lvl) {
        this.hide_all();
        this.lvl = lvl;
        1 == this.lvl ? this.init_grid_list(this.grid_lvl_1, this.normal_grid_1) : 2 == this.lvl ? this.init_grid_list(this.grid_lvl_2, this.normal_grid_2) : 3 == this.lvl ? this.init_grid_list(this.grid_lvl_3, this.normal_grid_3) : 4 == this.lvl ? this.init_grid_list(this.grid_lvl_4, this.normal_grid_4) : 5 == this.lvl && this.init_grid_list(this.grid_lvl_5, this.normal_grid_5);
        this.init_bomb_list();
      };
      body_info.prototype.hide_all = function() {
        for (var i = 0; i < this.grid_list.length; ++i) {
          var child_node = this.grid_list[i];
          child_node.parent = this.hide_node;
        }
        for (var i = 0; i < this.text_list.length; ++i) {
          var child_node = this.text_list[i];
          child_node.parent = this.hide_node;
        }
      };
      body_info.prototype.init_grid_list = function(grid_lvl_list, normal_grid) {
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
      body_info.prototype.init_bomb_list = function() {
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
      body_info.prototype.get_random_range = function(min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return min + Math.round(Rand * Range);
      };
      body_info.prototype.on_touch_end = function(event) {
        if (1 == this.lvl) {
          this.click_x = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).x;
          this.click_y = this.bomb_lvl_1.convertTouchToNodeSpaceAR(event).y;
          this.check_click(this.grid_lvl_1);
        } else if (2 == this.lvl) {
          this.click_x = this.bomb_lvl_2.convertTouchToNodeSpaceAR(event).x;
          this.click_y = this.bomb_lvl_2.convertTouchToNodeSpaceAR(event).y;
          this.check_click(this.grid_lvl_2);
        } else 3 == this.lvl ? this.check_click(this.grid_lvl_3) : 4 == this.lvl ? this.check_click(this.grid_lvl_4) : 5 == this.lvl && this.check_click(this.grid_lvl_5);
      };
      body_info.prototype.check_click = function(grids) {
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
      body_info.prototype.on_click_grid = function(grid, idx) {
        var child_node = this.grid_list[idx];
        child_node.parent = this.hide_node;
        var text_node = this.text_list[idx];
        this.bomb_list.indexOf(idx) >= 0 ? text_node.getComponent(cc.Label).string = "bo" : text_node.getComponent(cc.Label).string = this.get_bomb_num(idx);
        text_node.parent = grid;
        text_node.setPosition(cc.p(0, 0));
        text_node.width = grid.width;
        text_node.height = grid.height;
      };
      body_info.prototype.get_bomb_num = function(idx) {
        var max_coln_num = this.get_coln_num();
        var bomb_num = 0;
        var row = Math.floor(idx / max_coln_num);
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
      body_info.prototype.check_bomb_by_idx = function(idx) {
        if (idx < 0) return false;
        return this.bomb_list.indexOf(idx) >= 0;
      };
      body_info.prototype.get_coln_num = function() {
        return 1 == this.lvl ? 5 : 2 == this.lvl ? 6 : 3 == this.lvl ? 7 : 4 == this.lvl ? 8 : 9;
      };
      body_info.prototype.on_destory = function() {
        this.bomb_lvl_1.off("touchend", this.on_touch_end, this);
        this.bomb_lvl_1.off("touchcancel", this.on_touch_end, this);
        this.bomb_lvl_2.off("touchend", this.on_touch_end, this);
        this.bomb_lvl_2.off("touchcancel", this.on_touch_end, this);
      };
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_1", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_2", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_3", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_4", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_5", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "hide_node", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "grid_list", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "grid_lvl_1", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "grid_lvl_2", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "grid_lvl_3", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "grid_lvl_4", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "grid_lvl_5", void 0);
      __decorate([ property(cc.Prefab) ], body_info.prototype, "normal_grid_1", void 0);
      __decorate([ property(cc.Prefab) ], body_info.prototype, "normal_grid_2", void 0);
      __decorate([ property(cc.Prefab) ], body_info.prototype, "normal_grid_3", void 0);
      __decorate([ property(cc.Prefab) ], body_info.prototype, "normal_grid_4", void 0);
      __decorate([ property(cc.Prefab) ], body_info.prototype, "normal_grid_5", void 0);
      __decorate([ property(Number) ], body_info.prototype, "click_x", void 0);
      __decorate([ property(Number) ], body_info.prototype, "click_y", void 0);
      __decorate([ property(Number) ], body_info.prototype, "lvl", void 0);
      __decorate([ property([ Number ]) ], body_info.prototype, "bomb_list", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "text_list", void 0);
      body_info = __decorate([ ccclass ], body_info);
      return body_info;
    }(cc.Component);
    exports.default = body_info;
    cc._RF.pop();
  }, {} ],
  client: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d5a4Y7D+NPA72p6o/X5X+H", "client");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
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
  head_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34c05+ftDJEurghykawnG7U", "head_info");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var head_info = function(_super) {
      __extends(head_info, _super);
      function head_info() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lvl_label = null;
        _this.time_label = null;
        _this.play_time = 0;
        return _this;
      }
      head_info.prototype.start = function() {};
      head_info.prototype.init_head = function(lvl) {
        this.play_time = 0;
        this.unschedule(this.on_1_minute_timer);
        this.schedule(this.on_1_minute_timer, 1);
        var lvl_desc = "";
        1 == lvl ? lvl_desc = "入门" : 2 == lvl ? lvl_desc = "精英" : 3 == lvl ? lvl_desc = "大师" : 4 == lvl ? lvl_desc = "史诗" : 5 == lvl && (lvl_desc = "传奇");
        this.lvl_label.string = "当前挑战：" + lvl_desc;
        this.time_label.string = "00 : 00";
      };
      head_info.prototype.on_1_minute_timer = function() {
        this.play_time += 1;
        var minute = Math.floor(this.play_time / 60);
        var second = this.play_time % 60;
        this.time_label.string = minute < 10 ? second < 10 ? "0" + minute + " : 0" + second : "0" + minute + " : " + second : second < 10 ? minute + " : 0" + second : minute + " : " + second;
      };
      __decorate([ property(cc.Label) ], head_info.prototype, "lvl_label", void 0);
      __decorate([ property(cc.Label) ], head_info.prototype, "time_label", void 0);
      __decorate([ property(Number) ], head_info.prototype, "play_time", void 0);
      head_info = __decorate([ ccclass ], head_info);
      return head_info;
    }(cc.Component);
    exports.default = head_info;
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
        _this.head_info = null;
        _this.body_info = null;
        return _this;
      }
      player.prototype.onLoad = function() {};
      player.prototype.start = function() {
        this.head_node = this.head_info.getComponent("head_info");
        this.body_node = this.body_info.getComponent("body_info");
      };
      player.prototype.ready_start = function(lvl) {
        this.head_node.init_head(lvl);
        this.body_node.init_body(lvl);
      };
      __decorate([ property(cc.Node) ], player.prototype, "head_info", void 0);
      __decorate([ property(cc.Node) ], player.prototype, "body_info", void 0);
      player = __decorate([ ccclass ], player);
      return player;
    }(cc.Component);
    exports.default = player;
    cc._RF.pop();
  }, {} ],
  tail_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4543bv0IiNLdZ937ZZN86Hr", "tail_info");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var tail_info = function(_super) {
      __extends(tail_info, _super);
      function tail_info() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.player = null;
        return _this;
      }
      tail_info.prototype.start = function() {
        this.player_node = this.player.getComponent("player");
      };
      tail_info.prototype.on_click_lvl_1 = function() {
        this.player_node.ready_start(1);
      };
      tail_info.prototype.on_click_lvl_2 = function() {
        this.player_node.ready_start(2);
      };
      tail_info.prototype.on_click_lvl_3 = function() {
        this.player_node.ready_start(3);
      };
      tail_info.prototype.on_click_lvl_4 = function() {
        this.player_node.ready_start(4);
      };
      tail_info.prototype.on_click_lvl_5 = function() {
        this.player_node.ready_start(5);
      };
      __decorate([ property(cc.Node) ], tail_info.prototype, "player", void 0);
      tail_info = __decorate([ ccclass ], tail_info);
      return tail_info;
    }(cc.Component);
    exports.default = tail_info;
    cc._RF.pop();
  }, {} ]
}, {}, [ "client", "body_info", "game", "head_info", "player", "tail_info" ]);
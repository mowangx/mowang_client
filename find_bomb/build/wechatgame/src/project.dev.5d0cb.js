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
    var dispatcher_1 = require("./../logic/dispatcher");
    var consts_1 = require("./../logic/consts");
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
      body_info.prototype.onLoad = function() {
        this.bomb_lvl_1.on("touchend", this.on_touch_end, this);
        this.bomb_lvl_1.on("touchcancel", this.on_touch_end, this);
        this.bomb_lvl_2.on("touchend", this.on_touch_end, this);
        this.bomb_lvl_2.on("touchcancel", this.on_touch_end, this);
        this.bomb_lvl_3.on("touchend", this.on_touch_end, this);
        this.bomb_lvl_3.on("touchcancel", this.on_touch_end, this);
        this.bomb_lvl_4.on("touchend", this.on_touch_end, this);
        this.bomb_lvl_4.on("touchcancel", this.on_touch_end, this);
        this.bomb_lvl_5.on("touchend", this.on_touch_end, this);
        this.bomb_lvl_5.on("touchcancel", this.on_touch_end, this);
      };
      body_info.prototype.start = function() {
        for (var i = 0; i < 81; ++i) {
          this.text_list[i] = cc.instantiate(this.num_label);
          this.bomb_node_list[i] = cc.instantiate(this.bomb_node);
          this.grid_status[i] = false;
        }
        dispatcher_1.default.add_dispatch(consts_1.EventType.EVENT_CLICK_BOMB_BTN, this.on_change_bomb_flag, this);
      };
      body_info.prototype.init_body = function(lvl) {
        this.hide_all();
        this.game_over_flag = false;
        this.bomb_flag = false;
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
        for (var i = 0; i < this.bomb_node_list.length; ++i) {
          var child_node = this.bomb_node_list[i];
          child_node.parent = this.hide_node;
        }
        for (var i = 0; i < this.grid_status.length; ++i) this.grid_status[i] = false;
        for (var i = 0; i < this.bomb_list.length; ++i) this.bomb_list[i] = -1;
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
        var coln_num = this.get_coln_num();
        var max_index = coln_num * coln_num - 1;
        var bomb_num = this.get_random_bomb_num() + this.lvl;
        for (var i = 0; i < bomb_num; ++i) {
          var idx = 0;
          for (var i_1 = 0; i_1 < coln_num; ++i_1) {
            idx = this.get_random_range(0, max_index);
            if (this.bomb_list.indexOf(idx) >= 0) continue;
            break;
          }
          this.bomb_list[i] = idx;
        }
        this.optimizate_bomb_list(max_index);
      };
      body_info.prototype.get_random_bomb_num = function() {
        var min_num = 0;
        var max_num = 0;
        if (1 == this.lvl) {
          min_num = 3;
          max_num = 4;
        } else if (2 == this.lvl) {
          min_num = 5;
          max_num = 6;
        } else if (3 == this.lvl) {
          min_num = 8;
          max_num = 9;
        } else if (4 == this.lvl) {
          min_num = 11;
          max_num = 12;
        } else {
          min_num = 15;
          max_num = 16;
        }
        return this.get_random_range(min_num, max_num);
      };
      body_info.prototype.get_random_range = function(min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return min + Math.round(Rand * Range);
      };
      body_info.prototype.optimizate_bomb_list = function(max_index) {
        var desc_bomb_num = this.lvl;
        for (var i = 0; i < max_index; ++i) {
          var around_indexes = this.get_around_indexs(i);
          var cur_bomb_num = this.get_bomb_num(i, around_indexes);
          if (cur_bomb_num < 4) continue;
          for (var j = 0; j < around_indexes.length; ++j) {
            var idx = i + around_indexes[j];
            if (idx >= this.bomb_list.length || this.bomb_list[idx] < 0) continue;
            this.bomb_list[idx] = -1;
            desc_bomb_num -= 1;
            break;
          }
        }
        for (var i = 0; i < 20; ++i) {
          if (desc_bomb_num < 1) return;
          var idx = this.get_random_range(0, this.bomb_list.length - 1);
          if (this.bomb_list[idx] < 0) continue;
          this.bomb_list[idx] = -1;
          desc_bomb_num -= 1;
        }
      };
      body_info.prototype.on_touch_end = function(event) {
        var lvl_node = this.get_lvl_node();
        this.click_x = lvl_node.convertTouchToNodeSpaceAR(event).x;
        this.click_y = lvl_node.convertTouchToNodeSpaceAR(event).y;
        this.check_click();
      };
      body_info.prototype.get_lvl_node = function() {
        return 1 == this.lvl ? this.bomb_lvl_1 : 2 == this.lvl ? this.bomb_lvl_2 : 3 == this.lvl ? this.bomb_lvl_3 : 4 == this.lvl ? this.bomb_lvl_4 : this.bomb_lvl_5;
      };
      body_info.prototype.get_grid_nodes = function() {
        return 1 == this.lvl ? this.grid_lvl_1 : 2 == this.lvl ? this.grid_lvl_2 : 3 == this.lvl ? this.grid_lvl_3 : 4 == this.lvl ? this.grid_lvl_4 : this.grid_lvl_5;
      };
      body_info.prototype.get_grid_node = function(idx) {
        var grids = this.get_grid_nodes();
        return grids[idx];
      };
      body_info.prototype.check_click = function() {
        var grids = this.get_grid_nodes();
        var len = grids.length;
        for (var i = 0; i < len; i++) {
          var grid = grids[i];
          var start_x = grid.x - grid.width / 2;
          var start_y = grid.y - grid.height / 2;
          var end_x = grid.x + grid.width / 2;
          var end_y = grid.y + grid.height / 2;
          if (start_x < this.click_x && end_x > this.click_x && start_y < this.click_y && end_y > this.click_y) {
            this.on_click_grid(i);
            return;
          }
        }
      };
      body_info.prototype.on_click_grid = function(idx) {
        if (this.game_over_flag || this.grid_status[idx]) return;
        this.update_grid_node(idx, []);
        if (this.bomb_flag) {
          this.bomb_flag = false;
          this.grid_status[idx] = false;
        } else if (this.bomb_list.indexOf(idx) >= 0) {
          this.game_over_flag = true;
          this.show_all_grid();
        } else {
          var max_coln_num = this.get_coln_num();
          var len = max_coln_num * max_coln_num;
          for (var i = 0; i < len; ++i) {
            if (this.grid_status[i] || this.bomb_list.indexOf(i) >= 0) continue;
            return;
          }
          this.on_game_over(true);
        }
      };
      body_info.prototype.update_grid_node = function(idx, ignore_indexes) {
        this.grid_status[idx] = true;
        var child_node = this.grid_list[idx];
        child_node.parent = this.hide_node;
        var replace_node = null;
        if (this.bomb_flag || this.bomb_list.indexOf(idx) >= 0) replace_node = this.bomb_node_list[idx]; else {
          var bomb_node = this.bomb_node_list[idx];
          bomb_node.parent = this.hide_node;
          replace_node = this.text_list[idx];
          var check_indexes = this.get_around_indexs(idx);
          var bomb_num = this.get_bomb_num(idx, check_indexes);
          if (!(bomb_num > 0)) {
            var cur_ingore_indexes = ignore_indexes.concat([ idx ]);
            for (var i = 0; i < check_indexes.length; ++i) {
              var cur_idx = idx + check_indexes[i];
              if (ignore_indexes.indexOf(cur_idx) >= 0) continue;
              cur_ingore_indexes.push(cur_idx);
            }
            for (var i = 0; i < check_indexes.length; ++i) {
              var cur_idx = idx + check_indexes[i];
              if (ignore_indexes.indexOf(cur_idx) >= 0) continue;
              this.update_grid_node(cur_idx, cur_ingore_indexes);
            }
            return;
          }
          var cur_label = replace_node.getComponent(cc.Label);
          cur_label.string = "" + bomb_num;
        }
        var grid = this.get_grid_node(idx);
        replace_node.parent = grid;
        replace_node.setPosition(cc.p(0, 0));
        replace_node.width = grid.width;
        replace_node.height = grid.height;
      };
      body_info.prototype.get_around_indexs = function(idx) {
        var max_coln_num = this.get_coln_num();
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
        return check_indexes;
      };
      body_info.prototype.get_bomb_num = function(idx, check_indexes) {
        var bomb_num = 0;
        for (var i = 0; i < check_indexes.length; ++i) {
          var cur_idx = idx + check_indexes[i];
          this.check_bomb_by_idx(cur_idx) && (bomb_num += 1);
        }
        return bomb_num;
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
        this.bomb_lvl_3.off("touchend", this.on_touch_end, this);
        this.bomb_lvl_3.off("touchcancel", this.on_touch_end, this);
        this.bomb_lvl_4.off("touchend", this.on_touch_end, this);
        this.bomb_lvl_4.off("touchcancel", this.on_touch_end, this);
        this.bomb_lvl_5.off("touchend", this.on_touch_end, this);
        this.bomb_lvl_5.off("touchcancel", this.on_touch_end, this);
      };
      body_info.prototype.show_all_grid = function() {
        this.schedule(this.show_grid_delay, .1);
      };
      body_info.prototype.show_grid_delay = function() {
        dispatcher_1.default.dispatch(consts_1.EventType.EVENT_GAME_OVER_1);
        this.bomb_flag = false;
        var max_coln_num = this.get_coln_num();
        var len = max_coln_num * max_coln_num;
        for (var i = 0; i < len; ++i) {
          if (this.grid_status[i]) continue;
          this.grid_status[i] = true;
          this.update_grid_node(i, []);
          return;
        }
        this.unschedule(this.show_grid_delay);
        this.on_game_over(false);
      };
      body_info.prototype.on_change_bomb_flag = function() {
        this.bomb_flag = true;
      };
      body_info.prototype.on_game_over = function(result) {
        dispatcher_1.default.dispatch(consts_1.EventType.EVENT_GAME_OVER_2, result, this.lvl);
        cc.director.loadScene("result");
      };
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_1", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_2", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_3", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_4", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "bomb_lvl_5", void 0);
      __decorate([ property(cc.Node) ], body_info.prototype, "hide_node", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "grid_list", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "bomb_node_list", void 0);
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
      __decorate([ property(cc.Prefab) ], body_info.prototype, "bomb_node", void 0);
      __decorate([ property(cc.Prefab) ], body_info.prototype, "num_label", void 0);
      __decorate([ property(Number) ], body_info.prototype, "click_x", void 0);
      __decorate([ property(Number) ], body_info.prototype, "click_y", void 0);
      __decorate([ property(Number) ], body_info.prototype, "lvl", void 0);
      __decorate([ property([ Number ]) ], body_info.prototype, "bomb_list", void 0);
      __decorate([ property([ cc.Node ]) ], body_info.prototype, "text_list", void 0);
      __decorate([ property([ Boolean ]) ], body_info.prototype, "grid_status", void 0);
      __decorate([ property(Boolean) ], body_info.prototype, "bomb_flag", void 0);
      __decorate([ property(Boolean) ], body_info.prototype, "game_over_flag", void 0);
      body_info = __decorate([ ccclass ], body_info);
      return body_info;
    }(cc.Component);
    exports.default = body_info;
    cc._RF.pop();
  }, {
    "./../logic/consts": "consts",
    "./../logic/dispatcher": "dispatcher"
  } ],
  client: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d5a4Y7D+NPA72p6o/X5X+H", "client");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dispatcher_1 = require("./dispatcher");
    var consts_1 = require("./consts");
    var client = function(_super) {
      __extends(client, _super);
      function client() {
        var _this = _super.call(this) || this;
        _this.result = false;
        _this.lvl = 1;
        _this.play_time = 0;
        dispatcher_1.default.add_dispatch(consts_1.EventType.EVENT_GAME_OVER_3, _this.on_game_over, _this);
        return _this;
      }
      client.prototype.init = function() {};
      client.prototype.on_game_over = function(result, lvl, play_time) {
        this.result = result;
        this.lvl = lvl;
        this.play_time = play_time;
      };
      client.prototype.get_result = function() {
        return this.result;
      };
      client.prototype.get_lvl = function() {
        return this.lvl;
      };
      client.prototype.get_play_time = function() {
        return this.play_time;
      };
      client = __decorate([ ccclass ], client);
      return client;
    }(cc.Component);
    exports.client = client;
    var client_mgr = new client();
    exports.default = client_mgr;
    cc._RF.pop();
  }, {
    "./consts": "consts",
    "./dispatcher": "dispatcher"
  } ],
  consts: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f99dasGAqlNkoRY1d6Plz2b", "consts");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventType;
    (function(EventType) {
      EventType[EventType["EVENT_GAME_OVER_1"] = 1] = "EVENT_GAME_OVER_1";
      EventType[EventType["EVENT_GAME_OVER_2"] = 1] = "EVENT_GAME_OVER_2";
      EventType[EventType["EVENT_GAME_OVER_3"] = 2] = "EVENT_GAME_OVER_3";
      EventType[EventType["EVENT_CLICK_BOMB_BTN"] = 3] = "EVENT_CLICK_BOMB_BTN";
    })(EventType = exports.EventType || (exports.EventType = {}));
    cc._RF.pop();
  }, {} ],
  dispatcher: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a028cxHAlNCIZEiex65c5Q/", "dispatcher");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var dispatcher = function() {
      function dispatcher() {}
      dispatcher.add_dispatch = function(event, callback, context) {
        var observers = dispatcher.listeners[event];
        observers || (dispatcher.listeners[event] = []);
        dispatcher.listeners[event].push(new observer(callback, context));
      };
      dispatcher.remove = function(event, callback, context) {
        var observers = dispatcher.listeners[event];
        if (!observers) return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
          var observer_1 = observers[i];
          if (observer_1.compar(context)) {
            observers.splice(i, 1);
            break;
          }
        }
        0 == observers.length && delete dispatcher.listeners[event];
      };
      dispatcher.dispatch = function(event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        var observers = dispatcher.listeners[event];
        if (!observers) return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
          var observer_2 = observers[i];
          observer_2.notify.apply(observer_2, args);
        }
      };
      dispatcher.listeners = {};
      return dispatcher;
    }();
    exports.default = dispatcher;
    var observer = function() {
      function observer(callback, context) {
        this.callback = null;
        this.context = null;
        this.callback = callback;
        this.context = context;
      }
      observer.prototype.notify = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        (_a = this.callback).call.apply(_a, [ this.context ].concat(args));
        var _a;
      };
      observer.prototype.compar = function(context) {
        return context == this.context;
      };
      return observer;
    }();
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79e08S9ePlGt5MxH0Mi5CC8", "game");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var client_1 = require("./../logic/client");
    var game = function(_super) {
      __extends(game, _super);
      function game() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.player = null;
        return _this;
      }
      game.prototype.onLoad = function() {
        client_1.default.init();
      };
      game.prototype.start = function() {};
      __decorate([ property(cc.Node) ], game.prototype, "player", void 0);
      game = __decorate([ ccclass ], game);
      return game;
    }(cc.Component);
    exports.default = game;
    cc._RF.pop();
  }, {
    "./../logic/client": "client"
  } ],
  head_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34c05+ftDJEurghykawnG7U", "head_info");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var dispatcher_1 = require("../logic/dispatcher");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var consts_1 = require("./../logic/consts");
    var head_info = function(_super) {
      __extends(head_info, _super);
      function head_info() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lvl_label = null;
        _this.time_label = null;
        _this.play_time = 0;
        return _this;
      }
      head_info.prototype.start = function() {
        dispatcher_1.default.add_dispatch(consts_1.EventType.EVENT_GAME_OVER_2, this.on_game_over, this);
      };
      head_info.prototype.init_head = function(lvl) {
        this.play_time = 0;
        this.unschedule(this.on_1_minute_timer);
        this.schedule(this.on_1_minute_timer, 1);
        var lvl_desc = "";
        1 == lvl ? lvl_desc = "入门" : 2 == lvl ? lvl_desc = "精英" : 3 == lvl ? lvl_desc = "大师" : 4 == lvl ? lvl_desc = "史诗" : 5 == lvl && (lvl_desc = "传奇");
        this.lvl_label.string = "挑战:" + lvl_desc;
        this.time_label.string = "00:00";
      };
      head_info.prototype.on_1_minute_timer = function() {
        this.play_time += 1;
        var minute = Math.floor(this.play_time / 60);
        var second = this.play_time % 60;
        this.time_label.string = minute < 10 ? second < 10 ? "0" + minute + ":0" + second : "0" + minute + ":" + second : second < 10 ? minute + ":0" + second : minute + ":" + second;
      };
      head_info.prototype.on_click_bomb_btn = function() {
        dispatcher_1.default.dispatch(consts_1.EventType.EVENT_CLICK_BOMB_BTN);
      };
      head_info.prototype.on_game_over = function(result, lvl) {
        dispatcher_1.default.dispatch(consts_1.EventType.EVENT_GAME_OVER_3, result, lvl, this.play_time);
      };
      __decorate([ property(cc.Label) ], head_info.prototype, "lvl_label", void 0);
      __decorate([ property(cc.Label) ], head_info.prototype, "time_label", void 0);
      __decorate([ property(Number) ], head_info.prototype, "play_time", void 0);
      head_info = __decorate([ ccclass ], head_info);
      return head_info;
    }(cc.Component);
    exports.default = head_info;
    cc._RF.pop();
  }, {
    "../logic/dispatcher": "dispatcher",
    "./../logic/consts": "consts"
  } ],
  player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "40f41ntPqVBYJdYnUq8dxPT", "player");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var client_1 = require("./../logic/client");
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
        this.ready_start(client_1.default.get_lvl());
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
  }, {
    "./../logic/client": "client"
  } ],
  result: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c07ebceIkZECb30ZXWwKdHX", "result");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var client_1 = require("./../logic/client");
    var result = function(_super) {
      __extends(result, _super);
      function result() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.result_info = null;
        _this.title_info = null;
        _this.content_info = null;
        _this.back_info = null;
        _this.result_label = null;
        _this.content_label_1 = null;
        _this.content_label_2 = null;
        return _this;
      }
      result.prototype.start = function() {
        this.result_label.string = "扫雷结果";
        if (client_1.default.get_result()) {
          this.content_label_1.string = "恭喜成功排除所有地雷, 通关时间: " + client_1.default.get_play_time();
          client_1.default.get_lvl() < 5 && (this.content_label_2.string = "解锁下一等级: " + this.get_next_lvl_desc());
        } else this.content_label_1.string = "很遗憾, 敌人过于狡猾, 未能排除所有地雷";
      };
      result.prototype.get_next_lvl_desc = function() {
        var lvl = client_1.default.get_lvl();
        if (1 == lvl) return "精英";
        if (2 == lvl) return "大师";
        if (3 == lvl) return "史诗";
        if (4 == lvl) return "传奇";
        return "";
      };
      result.prototype.on_click_btn = function() {
        cc.director.loadScene("game");
      };
      __decorate([ property(cc.Node) ], result.prototype, "result_info", void 0);
      __decorate([ property(cc.Node) ], result.prototype, "title_info", void 0);
      __decorate([ property(cc.Node) ], result.prototype, "content_info", void 0);
      __decorate([ property(cc.Node) ], result.prototype, "back_info", void 0);
      __decorate([ property(cc.Label) ], result.prototype, "result_label", void 0);
      __decorate([ property(cc.Label) ], result.prototype, "content_label_1", void 0);
      __decorate([ property(cc.Label) ], result.prototype, "content_label_2", void 0);
      result = __decorate([ ccclass ], result);
      return result;
    }(cc.Component);
    exports.default = result;
    cc._RF.pop();
  }, {
    "./../logic/client": "client"
  } ],
  tail_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4543bv0IiNLdZ937ZZN86Hr", "tail_info");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dispatcher_1 = require("./../logic/dispatcher");
    var consts_1 = require("./../logic/consts");
    var tail_info = function(_super) {
      __extends(tail_info, _super);
      function tail_info() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.game_over_flag = false;
        return _this;
      }
      tail_info.prototype.start = function() {
        this.player_node = this.player.getComponent("player");
        this.game_over_flag = false;
        dispatcher_1.default.add_dispatch(consts_1.EventType.EVENT_GAME_OVER_1, this.on_game_over, this);
      };
      tail_info.prototype.on_click_lvl_1 = function() {
        if (this.game_over_flag) return;
        this.player_node.ready_start(1);
      };
      tail_info.prototype.on_click_lvl_2 = function() {
        if (this.game_over_flag) return;
        this.player_node.ready_start(2);
      };
      tail_info.prototype.on_click_lvl_3 = function() {
        if (this.game_over_flag) return;
        this.player_node.ready_start(3);
      };
      tail_info.prototype.on_click_lvl_4 = function() {
        if (this.game_over_flag) return;
        this.player_node.ready_start(4);
      };
      tail_info.prototype.on_click_lvl_5 = function() {
        if (this.game_over_flag) return;
        this.player_node.ready_start(5);
      };
      tail_info.prototype.on_game_over = function() {
        this.game_over_flag = true;
      };
      __decorate([ property(cc.Node) ], tail_info.prototype, "player", void 0);
      __decorate([ property(Boolean) ], tail_info.prototype, "game_over_flag", void 0);
      tail_info = __decorate([ ccclass ], tail_info);
      return tail_info;
    }(cc.Component);
    exports.default = tail_info;
    cc._RF.pop();
  }, {
    "./../logic/consts": "consts",
    "./../logic/dispatcher": "dispatcher"
  } ]
}, {}, [ "client", "consts", "dispatcher", "body_info", "game", "head_info", "player", "result", "tail_info" ]);
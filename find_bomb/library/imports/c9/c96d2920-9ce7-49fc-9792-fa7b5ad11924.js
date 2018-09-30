"use strict";
cc._RF.push(module, 'c96d2kgnOdJ/JeS+nta0Rkk', 'wx_wrapper');
// scripts/logic/wx_wrapper.ts

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
var wx_wrapper = /** @class */ (function (_super) {
    __extends(wx_wrapper, _super);
    function wx_wrapper() {
        return _super.call(this) || this;
    }
    wx_wrapper.prototype.init = function () {
        var self = this;
        wx.login({
            success: function () {
                self.on_login_success();
            }
        });
    };
    wx_wrapper.prototype.on_login_success = function () {
        var self = this;
        wx.getUserInfo({
            success: function (res) {
                self.on_get_user_info_success(res);
            },
            fail: function (res) {
                self.on_get_user_info_failed(res);
            }
        });
        wx.onShareAppMessage(function () {
            return {
                "title": "扫雷",
                "imageUrl": "res/raw-assets/resource/texture/share_img.png",
            };
        });
        console.log("on login success");
    };
    wx_wrapper.prototype.on_get_user_info_success = function (res) {
        var self = this;
        wx.showShareMenu({
            success: function () {
                self.on_share_success();
            },
            fail: function () {
                self.on_share_failed();
            },
            complete: function () {
                self.on_share_complete();
            }
        });
        console.log("get user info success");
        // self.has_get_user_info = true;
        // var userInfo = res.userInfo
        // this.nickname = userInfo.nickName
        // console.log("get user info success, nick name %s, url %s, gender %d, province %s, open id %s", 
        // this.nickname, userInfo.avatarUrl, userInfo.gender, userInfo.province, userInfo.openId)
    };
    wx_wrapper.prototype.on_get_user_info_failed = function (res) {
        // this.nickname = "failed"
        // // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
        // if (res.errMsg.indexOf('auth deny') > -1 || 	res.errMsg.indexOf('auth denied') > -1 ) {
        //     // 处理用户拒绝授权的情况
        // }
        var self = this;
        wx.showShareMenu({
            success: function () {
                self.on_share_success();
            },
            fail: function () {
                self.on_share_failed();
            },
            complete: function () {
                self.on_share_complete();
            }
        });
        console.log("get user info failed!");
    };
    wx_wrapper.prototype.on_share_success = function () {
        console.log("on share success");
    };
    wx_wrapper.prototype.on_share_failed = function () {
        console.log("on share failed");
    };
    wx_wrapper.prototype.on_share_complete = function () {
        console.log("on share complete");
    };
    wx_wrapper = __decorate([
        ccclass
    ], wx_wrapper);
    return wx_wrapper;
}(cc.Component));
exports.wx_wrapper = wx_wrapper;
var wx_mgr = new wx_wrapper();
exports.default = wx_mgr;

cc._RF.pop();
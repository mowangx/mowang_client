// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export class wx_wrapper extends cc.Component {

    constructor() {
        super();
    },

    init(): void {
        var self = this;
        // wx.login({
        //     success: function () {
        //         self.on_login_success();
        //     }
        // });

        wx.onShareAppMessage(function() {
            return {
                "title": "扫雷传奇",
                "imageUrl": "res/raw-assets/share.jpg",
            };
        });
        wx.showShareMenu({
            success: function() {
                self.on_share_success();
            },
            fail: function() {
                self.on_share_failed();
            },
            complete: function() {
                self.on_share_complete();
            }
        });
    },

    share_game(): void {
        wx.shareAppMessage({
            "title": "扫雷传奇,踩不到算你赢",
            "imageUrl": "res/raw-assets/share.jpg",
        });
    },

    on_login_success(): void {
        var self = this
        wx.getUserInfo({
            success: function(res) {
                self.on_get_user_info_success(res);
            },            
            fail: function(res) {
                self.on_get_user_info_failed(res);
            }
        });
        wx.onShareAppMessage(function() {
            return {
                "title": "扫雷战士",
                "imageUrl": "res/raw-assets/share.jpg",
            };
        });
    },

    on_get_user_info_success(res): void {
        var self = this;
        wx.showShareMenu({
            success: function() {
                self.on_share_success();
            },
            fail: function() {
                self.on_share_failed();
            },
            complete: function() {
                self.on_share_complete();
            }
        });
        // self.has_get_user_info = true;
        // var userInfo = res.userInfo
        // this.nickname = userInfo.nickName
        // console.log("get user info success, nick name %s, url %s, gender %d, province %s, open id %s", 
        // this.nickname, userInfo.avatarUrl, userInfo.gender, userInfo.province, userInfo.openId)
    },

    on_get_user_info_failed(res): void {
        // this.nickname = "failed"
        // // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
        // if (res.errMsg.indexOf('auth deny') > -1 || 	res.errMsg.indexOf('auth denied') > -1 ) {
        //     // 处理用户拒绝授权的情况
        // }
        var self = this;
        wx.showShareMenu({
            success: function() {
                self.on_share_success();
            },
            fail: function() {
                self.on_share_failed();
            },
            complete: function() {
                self.on_share_complete();
            }
        });
    },

    on_share_success(): void {
        console.log("on share success");
    },

    on_share_failed(): void {
        console.log("on share failed");
    },

    on_share_complete(): void {
        console.log("on share complete");
    },
}

var wx_mgr = new wx_wrapper();
export default wx_mgr;

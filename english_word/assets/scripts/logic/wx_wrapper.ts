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

    public init_finish_flag: boolean = false;
    public history_section_1: number = 1;
    public history_section_2: number = 1;
    public history_section_3: number = 1;
    public history_section_4: number = 1;
    public history_section_5: number = 1;
    public user_flag_1: string = '';
    public user_flag_2: string = '';
    public user_flag_3: string = '';
    public user_flag_4: string = '';
    public user_flag_5: string = '';

    constructor() {
        super();
    },

    init(): void {
        this.init_value();

        var self = this;
        // wx.login({
        //     success: function () {
        //         self.on_login_success();
        //     }
        // });

        wx.onShareAppMessage(function() {
            return {
                "title": "英语单词开心游戏",
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

    init_value(): void {
        for (let i=0; i<1024; ++i) {
            this.user_flag_1 += '0';
            this.user_flag_2 += '0';
            this.user_flag_3 += '0';
            this.user_flag_4 += '0';
            this.user_flag_5 += '0';
        }
        this.load_cloud_value();
    },

    share_game(): void {
        wx.shareAppMessage({
            "title": "英语单词开心游戏,每天进步一点点",
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
                "title": "英语单词开心游戏,每天进步一点点",
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

    on_get_cloud_value_success(res): void {
        for (let i=0; i<res.KVDataList.length; ++i) {
            let key_name = res.KVDataList[i].key;
            if (key_name == "english_word_game_flag_1") {
                this.user_flag_1 = res.KVDataList[i].value;
            }
            else if (key_name == "english_word_game_flag_2") {
                this.user_flag_2 = res.KVDataList[i].value;
            }
            else if (key_name == "english_word_game_flag_3") {
                this.user_flag_3 = res.KVDataList[i].value;
            }
            else if (key_name == "english_word_game_flag_4") {
                this.user_flag_4 = res.KVDataList[i].value;
            }
            else if (key_name == "english_word_game_flag_5") {
                this.user_flag_5 = res.KVDataList[i].value;
            }
            else if (key_name == "english_word_game_word_1") {
                this.history_section_1 = Number(res.KVDataList[i].value);
            }
            else if (key_name == "english_word_game_word_2") {
                this.history_section_2 = Number(res.KVDataList[i].value);
            }
            else if (key_name == "english_word_game_word_3") {
                this.history_section_3 = Number(res.KVDataList[i].value);
            }
            else if (key_name == "english_word_game_word_4") {
                this.history_section_4 = Number(res.KVDataList[i].value);
            }
            else if (key_name == "english_word_game_word_5") {
                this.history_section_5 = Number(res.KVDataList[i].value);
            }
        }
        this.init_finish_flag = true;
        console.log("load clound value success");
    },

    load_cloud_value(): void {
        let key_name_list = [];
        for (let i=1; i<6; ++i) {
            key_name_list.push("english_word_game_flag_" + i);
            key_name_list.push("english_word_game_word_" + i);
        }

        let self = this;
        let file_path = `${wx.env.USER_DATA_PATH}/english_word`;
        let fs = wx.getFileSystemManager();
        let res = fs.access({
            path: file_path,
            success: function(res) {
                console.log("load success", res);
            },
            fail: function(res) {
                console.log("load fail", res);
                self.create_dir();
            },
            complete: function(res) {
                console.log("load complete", res);
            },
        });
        
        // wx.getUserCloudStorage({
        //     keyList: key_name_list,
        //     success: function (res) {
        //         console.log('get cloud storage success', res);
        //         self.on_get_cloud_value_success(res);
        //     },
        // });
    },

    create_dir() {
        let fs = wx.getFileSystemManager();
        let file_path = `${wx.env.USER_DATA_PATH}/english_word`;
        fs.mkdir({
            dirPath: file_path,
            recursive: true,
            success: function(res) {
                console.log("create dir success", res);
            },
            fail: function(res) {
                console.log("create dir failed", res);
            },
        })
    },

    save_cloud_value(lvl: number): void {
        let user_flag = '';
        let history_section = 1;
        if (lvl == 1) {
            user_flag = this.user_flag_1;
            history_section = this.history_section_1;
        }
        else if (lvl == 2) {
            user_flag = this.user_flag_2;
            history_section = this.history_section_2;
        }
        else if (lvl == 2) {
            user_flag = this.user_flag_3;
            history_section = this.history_section_3;
        }
        else if (lvl == 2) {
            user_flag = this.user_flag_4;
            history_section = this.history_section_4;
        }
        else {
            user_flag = this.user_flag_5;
            history_section = this.history_section_5;
        }

        console.log("save clound info!", lvl, history_section, user_flag);

        wx.setUserCloudStorage({
            KVDataList: [
                {
                    key: "english_word_game_flag_" + lvl,
                    value: user_flag
                }, 
                {
                    key: "english_word_game_word_" + lvl,
                    value: '' + history_section
                }
            ]
        });
    },
}

var wx_mgr = new wx_wrapper();
export default wx_mgr;

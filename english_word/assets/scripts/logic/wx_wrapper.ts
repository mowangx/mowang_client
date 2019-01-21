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

    init(words_size_ary: Array<number>): void {
        this.init_value(words_size_ary);

        var self = this;
        // wx.login({
        //     success: function () {
        //         self.on_login_success();
        //     }
        // });

        wx.onShareAppMessage(function() {
            return {
                "title": "爱记英语单词,我也可以变学霸",
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

    init_value(words_size_ary: Array<number>): void {
        for (let i=0; i<words_size_ary.length; ++i) {
            let len = words_size_ary[i];
            for (let j=0; j<len; ++j) {
                if (i == 0) {
                    this.user_flag_1 += '0';
                }
                else if (i == 1) {
                    this.user_flag_2 += '0';
                }
                else if (i == 2) {
                    this.user_flag_3 += '0';
                }
                else if (i == 3) {
                    this.user_flag_4 += '0';
                }
                else {
                    this.user_flag_5 += '0';
                }
            }
        }
        this.load_cloud_value();
    },

    share_game(): void {
        wx.shareAppMessage({
            "title": "爱记英语单词,每天进步一点点",
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

    load_cloud_value(): void {
        let key_name_list = [];
        for (let i=1; i<6; ++i) {
            key_name_list.push("english_word_game_flag_" + i);
            key_name_list.push("english_word_game_word_" + i);
        }

        let self = this;
        let file_path = this.get_save_file_path();
        let fs = wx.getFileSystemManager();
        let res = fs.access({
            path: file_path,
            success: function(res) {
                console.log("load success", res);
                self.read_file();
            },
            fail: function(res) {
                console.log("load fail", res.errMsg);
                self.write_file();
            },
            complete: function(res) {
                console.log("load complete", res);
            },
        });
    },

    write_file(): void {
        let self = this;
        let fs = wx.getFileSystemManager();
        let file_path = this.get_save_file_path();
        let file_data = this.get_save_file_data();
        fs.writeFile({
            filePath: file_path,
            data: file_data,
            recursive: true,
            success: function(res) {
                console.log("write file success", res);
                self.init_finish_flag = true;
            },
            fail: function(res) {
                console.log("write file failed", res.errMsg);
            },
        })
    },

    read_file(): void {
        let self = this;
        let fs = wx.getFileSystemManager();
        let file_path = this.get_save_file_path();
        fs.readFile({
            filePath: file_path,
            encoding: 'utf-8',
            success: function(res) {
                console.log("read file success!", res.data);
                self.on_read_file_success(res.data);
            },
            fail: function(res) {
                console.log("read file failed!", res.errMsg);
            }
        });
    },

    on_read_file_success(file_data: string): void {
        let file_object = JSON.parse(file_data);
        this.user_flag_1 = this.load_user_flag(this.user_flag_1, file_object[1].flag);
        this.history_section_1 = file_object[1].section;
        this.user_flag_2 = this.load_user_flag(this.user_flag_2, file_object[2].flag);
        this.history_section_2 = file_object[2].section;
        this.user_flag_3 = this.load_user_flag(this.user_flag_3, file_object[3].flag);
        this.history_section_3 = file_object[3].section;
        this.user_flag_4 = this.load_user_flag(this.user_flag_4, file_object[4].flag);
        this.history_section_4 = file_object[4].section;
        this.user_flag_5 = this.load_user_flag(this.user_flag_5, file_object[5].flag);
        this.history_section_5 = file_object[5].section;
        this.init_finish_flag = true;
        console.log("load cloud value success");
    },

    load_user_flag(user_flag: string, read_flag: string): string {
        if (user_flag.length <= read_flag.length) {
            return read_flag;
        }
        else {
            return read_flag + user_flag.substr(read_flag.length, user_flag.length - read_flag.length);
        }
    },

    get_save_file_path(): string {
        return `${wx.env.USER_DATA_PATH}/game_english_word.txt`;
    },

    get_save_file_data(): string {
        let file_object = {
            1: {'flag': this.user_flag_1, 'section': this.history_section_1},
            2: {'flag': this.user_flag_2, 'section': this.history_section_2},
            3: {'flag': this.user_flag_3, 'section': this.history_section_3},
            4: {'flag': this.user_flag_4, 'section': this.history_section_4},
            5: {'flag': this.user_flag_5, 'section': this.history_section_5},
        };
        let file_data = JSON.stringify(file_object);
        return file_data;
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

        console.log("save cloud info!", lvl, history_section, user_flag);

        this.write_file();

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

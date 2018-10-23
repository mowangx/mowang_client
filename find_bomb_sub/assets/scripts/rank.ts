// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import user_info from "./user_info"

@ccclass
export default class rank extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Sprite)
    user_icon_1: cc.Sprite = null;

    @property(cc.Sprite)
    user_icon_2: cc.Sprite = null;

    @property(cc.Sprite)
    user_icon_3: cc.Sprite = null;

    @property(cc.Label)
    rank_label: cc.Label = null;
    
    private user_info_list: Array<user_info> = [];

    // onLoad () {}

    start () {
        let self = this;
        wx.onMessage(data => {
            let key_name = 't_' + data.lvl;
            let play_time = '' + data.play_time;
            console.log('set user cloud storage:', play_time)
            wx.setUserCloudStorage({
                KVDataList: [{
                    key: key_name,
                    value: play_time
                }]
            });
            self.show_rank(data.lvl);
        });
    },

    // update (dt) {}

    show_rank(lvl: number): void {
        let self = this;
        // wx.getUserInfo({
        //     openIdList: ['selfOpenId'],
        //     lang: 'zh_CN',
        //     success: (res) => {
        //         console.log('get user info success', res.data);
        //         this.own_user_info = true;
        //         let avatar_info = res.data[0];
        //         self.add_user_info(avatar_info, lvl);
        //     },
        // });

        wx.getFriendCloudStorage({
            keyList: ['t_' + lvl],
            success: function (res) {
                console.log('get friend cloud storage success', res.data)
                for (let i = 0; i < res.data.length; i++) {
                    let avatar_info = res.data[i];
                    if (avatar_info) {
                        self.add_user_info(avatar_info, lvl);
                    }
                }
                self.on_show_rank();
            },
        });
    },

    add_user_info(user, lvl: number): void {
        let avatar_info = new user_info();
        avatar_info.set_avatar_url(user.avatarUrl);
        avatar_info.set_user_name(user.nickName ? user.nickName : user.nickname);
        let key_name = 't_' + lvl;
        for (let i=0; i<user.KVDataList.length; ++i) {
            if (user.KVDataList[i].key == key_name) {
                avatar_info.set_play_time(Number(user.KVDataList[i].value));
            }
        }
        this.user_info_list.push(avatar_info);
    },

    on_show_rank(): void {
        let rank_desc = '';
        let user_info_1 = null;
        for (let i=0; i<this.user_info_list.length; ++i) {
            let avatar_info = this.user_info_list[i];
            if (!user_info_1 || avatar_info.get_playt_time() < user_info_1.get_playt_time()) {
                user_info_1 = avatar_info;
            }
        }
        if (!user_info_1) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += user_info_1.get_user_name() +  " " + user_info_1.get_playt_time();
        this.show_user_info(user_info_1, this.user_icon_1);
        let user_info_2 = null;
        for (let i=0; i<this.user_info_list.length; ++i) {
            let avatar_info = this.user_info_list[i];
            if (avatar_info.get_user_name() == user_info_1.get_user_name() && 
            avatar_info.get_avatar_url() == user_info_1.get_avatar_url()) {
                continue;
            }
            if (!user_info_2 || avatar_info.get_playt_time() < user_info_2.get_playt_time()) {
                user_info_2 = avatar_info;
            }
        }
        if (!user_info_2) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += "\r\n" + user_info_2.get_user_name() +  " " + user_info_2.get_playt_time();
        this.show_user_info(user_info_2, this.user_icon_2);
        let user_info_3 = null;
        for (let i=0; i<this.user_info_list.length; ++i) {
            let avatar_info = this.user_info_list[i];
            if (avatar_info.get_user_name() == user_info_1.get_user_name() && 
            avatar_info.get_avatar_url() == user_info_1.get_avatar_url()) {
                continue;
            }
            if (avatar_info.get_user_name() == user_info_2.get_user_name() && 
            avatar_info.get_avatar_url() == user_info_2.get_avatar_url()) {
                continue;
            }
            if (!user_info_3 || avatar_info.get_playt_time() < user_info_3.get_playt_time()) {
                user_info_3 = avatar_info;
            }
        }
        if (!user_info_3) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += "\r\n" + user_info_3.get_user_name() +  " " + user_info_3.get_playt_time();
        this.show_user_info(user_info_3, this.user_icon_3);
        this.rank_label.string = rank_desc;
    },

    show_user_info(user, user_icon): void {
        if (!user) {
            return;
        }
        console.log(user.get_user_name() + '\'s info has been getten.');
        cc.loader.load({
            url: user.get_avatar_url(), 
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            user_icon.spriteFrame = new cc.SpriteFrame(texture);
        });
    },
}

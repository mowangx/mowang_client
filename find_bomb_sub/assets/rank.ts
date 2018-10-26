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
export default class sub_game extends cc.Component {

    @property(cc.Sprite)
    user_icon_1: cc.Sprite = null;

    @property(cc.Sprite)
    user_icon_2: cc.Sprite = null;

    @property(cc.Sprite)
    user_icon_3: cc.Sprite = null;

    @property(cc.Label)
    rank_label: cc.Label = null;

    private nick_name: string = '';
    private play_time: number = 0;
    private lvl: number = 1;

    private user_info_list: Array<user_info> = [];

    // onLoad () {}

    start () {
        console.log("start load sub content!!!!!!!");
        let self = this;
        wx.onMessage(data => {
            console.log("recv main msg!!!!", data.lvl, data.play_time);
            if (data && data.lvl) {
                self.play_time = data.play_time;
                self.lvl = data.lvl;
                self.show_rank();
            }
        });
    },

    // update (dt) {}

    show_rank(): void {
        this.clear_rank()

        let self = this;
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: (res) => {
                console.log('get user info success', res.data);
                self.nick_name = res.data[0].nickName ? res.data[0].nickName : res.data[0].nickname;
            },
        });

        wx.getFriendCloudStorage({
            keyList: ['t_' + self.lvl],
            success: function (res) {
                console.log('get friend cloud storage success', res.data)
                for (let i = 0; i < res.data.length; i++) {
                    let avatar_info = res.data[i];
                    if (avatar_info) {
                        self.add_user_info(avatar_info);
                    }
                }
                self.on_show_rank();
            },
        });
    },

    clear_rank(): void {
        console.log("clear rank");
        this.user_info_list = [];
        this.user_icon_1.spriteFrame = null;
        this.user_icon_2.spriteFrame = null;
        this.user_icon_3.spriteFrame = null;
    },

    add_user_info(user): void {
        let avatar_info = new user_info();
        avatar_info.set_avatar_url(user.avatarUrl);
        let nick_name = user.nickName ? user.nickName : user.nickname;
        avatar_info.set_user_name(nick_name);
        let key_name = 't_' + this.lvl;
        for (let i=0; i<user.KVDataList.length; ++i) {
            let play_time = Number(user.KVDataList[i].value);
            if (!play_time) {
                play_time = 0;
            }
            avatar_info.set_play_time(play_time);
            if (user.KVDataList[i].key != key_name) {
                continue;
            }
            if (this.nick_name != nick_name) {
                continue;
            }
            if (!play_time || (this.play_time > 0 && play_time > this.play_time)) {
                play_time = this.play_time;
                this.sync_user_info();
                avatar_info.set_play_time(play_time);
            }
        }
        this.user_info_list.push(avatar_info);
    },

    sync_user_info(): void {
        let key_name = 't_' + this.lvl;
        let play_time = '' + this.play_time;
        console.log('set user cloud storage 222:', play_time);
        wx.setUserCloudStorage({
            KVDataList: [{
                key: key_name,
                value: play_time
            }]
        });
    },

    on_show_rank(): void {
        let rank_desc = '';
        let user_info_1 = null;
        for (let i=0; i<this.user_info_list.length; ++i) {
            let avatar_info = this.user_info_list[i];
            if (!user_info_1 || user_info_1.get_play_time() < 1 || 
            (avatar_info.get_play_time() < user_info_1.get_play_time() && avatar_info.get_play_time() > 0)) {
                user_info_1 = avatar_info;
            }
        }
        if (!user_info_1) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += user_info_1.get_user_name() + this.get_play_time_desc(user_info_1);
        this.show_user_info(user_info_1, 1);
        let user_info_2 = null;
        for (let i=0; i<this.user_info_list.length; ++i) {
            let avatar_info = this.user_info_list[i];
            if (avatar_info.get_user_name() == user_info_1.get_user_name()) {
                continue;
            }
            if (!user_info_2 || user_info_2.get_play_time() < 1 || 
            (avatar_info.get_play_time() < user_info_2.get_play_time() && avatar_info.get_play_time() > 0)) {
                user_info_2 = avatar_info;
            }
        }
        if (!user_info_2) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += "\r\n" + user_info_2.get_user_name() + this.get_play_time_desc(user_info_2);
        this.show_user_info(user_info_2, 2);
        let user_info_3 = null;
        for (let i=0; i<this.user_info_list.length; ++i) {
            let avatar_info = this.user_info_list[i];
            if (avatar_info.get_user_name() == user_info_1.get_user_name()) {
                continue;
            }
            if (avatar_info.get_user_name() == user_info_2.get_user_name()) {
                continue;
            }
            if (!user_info_3 || user_info_3.get_play_time() < 1 || 
            (avatar_info.get_play_time() < user_info_3.get_play_time() && avatar_info.get_play_time() > 0)) {
                user_info_3 = avatar_info;
            }
        }
        if (!user_info_3) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += "\r\n" + user_info_3.get_user_name() + this.get_play_time_desc(user_info_3);
        this.show_user_info(user_info_3, 3);
        this.rank_label.string = rank_desc;
    },

    get_play_time_desc(avatar_info): string {
        if (avatar_info.get_play_time() < 1) {
            return "   踩屎了";
        }
        else {
            return "   " + avatar_info.get_play_time() + "秒";
        }
    },

    show_user_info(user, idx): void {
        if (!user) {
            console.log("show user info failed!!!!");
            return;
        }
        console.log(user.get_user_name() + '\'s info has been getten.', idx,  user.get_avatar_url());
        let user_icon = null;
        if (idx == 1) {
            user_icon = this.user_icon_1;
        }
        else if (idx == 2) {
            user_icon = this.user_icon_2;
        }
        else {
            user_icon = this.user_icon_3;
        }
        cc.loader.load({
            url: user.get_avatar_url(), 
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            user_icon.spriteFrame = new cc.SpriteFrame(texture);
            console.log("load user icon success");
        });
    },
}

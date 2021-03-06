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
    private pass_num: number = 0;
    private lvl: number = 1;
    private update_times: number = 0;

    private user_info_list: Array<user_info> = [];

    // onLoad () {}

    start () {
        console.log("start load sub content!!!!!!!");
        let self = this;
        wx.onMessage(data => {
            console.log("recv main msg!!!!", data.lvl, data.pass_num);
            if (data && data.lvl) {
                self.pass_num = data.pass_num;
                self.lvl = data.lvl;
                self.show_rank();
            }
        });
    },

    // update (dt) {}

    show_rank(): void {
        this.update_times = 0;
        this.clear_rank()

        let self = this;
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: (res) => {
                console.log('get user info success', res.data);
                self.nick_name = res.data[0].nickName ? res.data[0].nickName : res.data[0].nickname;
                self.get_friend_cloud_storage();
            },
        });
    },

    get_friend_cloud_storage(): void {
        let self = this;
        wx.getFriendCloudStorage({
            keyList: ['loveenglishword_t_' + self.lvl],
            success: function (res) {
                console.log('get friend cloud storage success', res.data);
                let own_flag: boolean = false; 
                for (let i = 0; i < res.data.length; i++) {
                    let avatar_info = res.data[i];
                    if (avatar_info && self.add_user_info(avatar_info)) {
                        own_flag = true;
                    }
                }
                if (own_flag || self.update_times > 0) {
                    self.on_show_rank();
                } else {
                    self.sync_user_info();
                    self.get_friend_cloud_storage();
                    self.update_times += 1;
                }
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

    add_user_info(user): boolean {
        let own_flag: boolean = false;
        let avatar_info = new user_info();
        avatar_info.set_avatar_url(user.avatarUrl);
        let nick_name = user.nickName ? user.nickName : user.nickname;
        avatar_info.set_user_name(nick_name);
        let key_name = 'loveenglishword_t_' + this.lvl;
        for (let i=0; i<user.KVDataList.length; ++i) {
            let pass_num = Number(user.KVDataList[i].value);
            if (!pass_num) {
                pass_num = 0;
            }
            avatar_info.set_play_time(pass_num);
            if (user.KVDataList[i].key != key_name) {
                continue;
            }
            if (this.nick_name != nick_name) {
                continue;
            }
            own_flag = true;
            if (pass_num < this.pass_num) {
                pass_num = this.pass_num;
                this.sync_user_info();
                avatar_info.set_play_time(pass_num);
            }
        }
        this.user_info_list.push(avatar_info);
        return own_flag ? true : false;
    },

    sync_user_info(): void {
        let key_name = 'loveenglishword_t_' + this.lvl;
        let pass_num = '' + this.pass_num;
        console.log('set user cloud storage 222:', pass_num);
        wx.setUserCloudStorage({
            KVDataList: [{
                key: key_name,
                value: pass_num
            }]
        });
    },

    on_show_rank(): void {
        let rank_desc = '';
        let user_info_1 = null;
        for (let i=0; i<this.user_info_list.length; ++i) {
            let avatar_info = this.user_info_list[i];
            if (!user_info_1 || user_info_1.get_play_time() < 1 || 
            (avatar_info.get_play_time() > user_info_1.get_play_time())) {
                user_info_1 = avatar_info;
            }
        }
        if (!user_info_1) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += this.get_user_desc(user_info_1);
        this.show_user_info(user_info_1, 1);
        let user_info_2 = null;
        for (let i=0; i<this.user_info_list.length; ++i) {
            let avatar_info = this.user_info_list[i];
            if (avatar_info.get_user_name() == user_info_1.get_user_name()) {
                continue;
            }
            if (!user_info_2 || user_info_2.get_play_time() < 1 || 
            (avatar_info.get_play_time() > user_info_2.get_play_time())) {
                user_info_2 = avatar_info;
            }
        }
        if (!user_info_2) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += "\r\n" + this.get_user_desc(user_info_2);
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
            (avatar_info.get_play_time() > user_info_3.get_play_time())) {
                user_info_3 = avatar_info;
            }
        }
        if (!user_info_3) {
            this.rank_label.string = rank_desc;
            return;
        }
        rank_desc += "\r\n" + this.get_user_desc(user_info_3);
        this.show_user_info(user_info_3, 3);
        this.rank_label.string = rank_desc;
    },

    get_user_desc(avatar_info): string {
        let avatar_desc = '';
        let user_name = avatar_info.get_user_name();
        if (user_name.length > 2) {
            avatar_desc = user_name.substr(0, 2) + '...';
        }
        else {
            avatar_desc = user_name;
        }
        return avatar_desc + this.get_play_time_desc(avatar_info);
    },

    get_play_time_desc(avatar_info): string {
        if (avatar_info.get_play_time() < 1) {
            return "   0个";
        }
        else {
            return "   " + avatar_info.get_play_time() + "个";
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

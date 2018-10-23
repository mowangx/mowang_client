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

@ccclass
export default class sub_game extends cc.Component {

    @property(cc.Sprite)
    rank_head_1: cc.Sprite = null;

    @property(cc.Sprite)
    rank_head_2: cc.Sprite = null;

    @property(cc.Label)
    user_name_1: cc.Label = null;

    @property(cc.Label)
    user_name_2: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

        console.log("start load sub carmera");

        let _self = this;

        wx.onMessage( data => {
            console.log(data.message);
        });

        // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserInfo.html
        // wx.getUserInfo({
        //     openIdList: ['selfOpenId'],
        //     lang: 'zh_CN',
        //     success: (res) => {
        //         console.log('success', res.data);
        //         let userInfo = res.data[0];
        //         _self.createUserBlock(userInfo);
        //     },
        //     fail: (res) => {
        //         reject(res);
        //     }
        // });

        wx.setUserCloudStorage({
            KVDataList: [{
                key: "t_1",
                value: "8"
            }]
        });
        
        // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getFriendCloudStorage.html
        wx.getFriendCloudStorage({
            keyList: ["t_1"],
            success: function (res) {
                console.log("get friend data!", res.data);
                for (let i = 0; i < res.data.length; i++) {
                    let friendInfo = res.data[i];
                    if (friendInfo) {
                        _self.createUserBlock(friendInfo, i);
                    }
                }
            },
            fail: function (res) {
                console.error(res);
            }
        });
    },

    // update (dt) {}

    createUserBlock (user, idx) {
        let user_icon = null;
        let name_label = null;
        if (idx == 0) {
            user_icon = this.rank_head_1;
            name_label = this.user_name_1;
        }
        else {
            user_icon = this.rank_head_2;
            name_label = this.user_name_2;
        }
        // getUserInfo will return the nickName, getFriendCloudStorage will return the nickname.
        let nickName = user.nickName ? user.nickName : user.nickname;
        let avatarUrl = user.avatarUrl;

        name_label.string = nickName;
        //let userName = node.getChildByName('user_name').getComponent(cc.Label);
        //let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);

        //userName.string = nickName;
        console.log(nickName + '\'s info has been getten.');
        cc.loader.load({
            url: avatarUrl, type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            user_icon.spriteFrame = new cc.SpriteFrame(texture);
        });                   
    },
}

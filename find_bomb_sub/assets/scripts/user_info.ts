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
export default class user_info extends cc.Component {

    private avatar_url: string = "";
    private avatar_name: string = "";
    private play_time: number = 0;

    set_avatar_url(url: string): void {
        this.avatar_url = url;
    },

    get_avatar_url(): string {
        return this.avatar_url;
    },

    set_user_name(name: string): void {
        this.avatar_name = name;
    },

    get_user_name(): string {
        return this.avatar_name;
    },

    set_play_time(time: number): void {
        this.play_time = time;
    },

    get_playt_time(): number {
        return this.play_time;
    },
}

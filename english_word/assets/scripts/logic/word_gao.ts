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
export class word_gao extends cc.Component {

    public words_ary: Array<Array<string>> = [];

    init(): void {
        this.words_ary.push(['after', '英音[\'ɑ:ftə] 美音[\'æftɚ]', '1.在...以后\r\n2.在...后面；随...之后']);
    }
}

var word_gao_mgr = new word_gao();
export default word_gao_mgr;

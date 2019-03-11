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
export class word_guide  extends cc.Component {

    public words_ary: Array<Array<string>> = [];

    init(): void {
        this.words_ary.push(['love', '[lʌv]', '1.喜爱，热爱']);
        this.words_ary.push(['test', ' [test]', '1.测试\r\n2.试验，考验']);
    }
}

var word_guide_mgr = new word_guide();
export default word_guide_mgr;

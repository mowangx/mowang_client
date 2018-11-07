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
export class word_x_1 extends cc.Component {

    public words_1: Array<Array<string>> = [];

    init(): void {
        this.words_1.push(['after', '英音[\'ɑ:ftə] 美音[\'æftɚ]', 'prep.\r\n1.在...以后\r\n2.低于；次于\r\nad.\r\n1.以后，之后\r\n2.在后面，随后']);
        this.words_1.push(['afternoon', '英音[ˌɑ:ftə\'nu:n] 美音[ˌɑ:ftə\'nu:n]', '名词:\r\n下午，午后']);
        this.words_1.push(['again', '英音[ə\'gein] 美音[ə\'gein] ', 'ad.\r\n1.再，再一次\r\n2.重回；恢复原状\r\n3.再者；此外']);
    }
}

var word_1_mgr = new word_x_1();
export default word_1_mgr;

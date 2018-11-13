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
        this.words_1.push(['after', '英音[\'ɑ:ftə] 美音[\'æftɚ]', '1.在...以后\r\n2.在...后面；随...之后']);
        this.words_1.push(['afternoon', '英音[ˌɑ:ftə\'nu:n] 美音[ˌɑ:ftə\'nu:n]', '1.下午，午后']);
        this.words_1.push(['again', '英音[ə\'gein] 美音[ə\'gein]', '1.再，再一次\r\n2.重回；恢复原状\r\n3.再者；此外']);
        this.words_1.push(['ago', '英音[ə\'gəu] 美音[ə\'gəu]', '1.以前,…前']);
        this.words_1.push(['air', '英音[ɛə] 美音[ɛə]', '1. 空气；大气\r\n2. 压缩空气\r\n3. 天空；空间\r\n4. 微风']);
        this.words_1.push(['along', '英音[ə\'lɔŋ] 美音[ə\'lɔŋ]', '1.沿着；循着\r\n2.依照；根据\r\n3.在...的过程中']);
        this.words_1.push(['angry', '英音[\'æŋgri] 美音[\'æŋgri]', '1.发怒的，愤怒的，生气的\r\n2.【文学】狂风暴雨的，波涛汹涌的']);
        this.words_1.push(['animal', '英音[\'æniməl] 美音[\'æniməl]', '1.动物（能有感觉并能自行移动的生物）\r\n2.动物（除人以外的此类任何生物）']);
        this.words_1.push(['answer', '英音[\'ɑ:nsə] 美音[\'ænsɚ]', '1.回答；答复；复信\r\n2.反应；回报\r\n3.答案；解决办法']);
        this.words_1.push(['ant', '英音[ænt] 美音[ænt]', '1.蚂蚁']);
        this.words_1.push(['any', '英音[\'eni] 美音[\'eni]', '1.任一的；每一的\r\n2.若干，一些；一点，什么；丝毫的\r\n3.【口】一个']);
        this.words_1.push(['apple', '英音[\'æpl] 美音[\'æpl]', '1.苹果；苹果树']);
        this.words_1.push(['ask', '英音[ɑ:sk] 美音[æsk]', '1. 问；询问\r\n2. 请求；要求\r\n3.邀请']);
        this.words_1.push(['at', '英音[æt,ət] 美音[æt,ət]', '1.（表示位置）在，于；到达，达到；经，由\r\n2.（表示时间）在，在…时刻\r\n3.（表示状态）处于…状态']);
        this.words_1.push(['aunt', '英音[ɑ:nt] 美音[ænt]', '1.姑母，姨母，婶婶，伯母，舅母\r\n2.（尤指父母的朋友）阿姨，大妈，大娘']);
        this.words_1.push(['auntie', '英音[\'ɑ:nti] 美音[\'ɑ:nti]', '1.（aunt的昵称）伯母；婶母；姑母；姨母；舅母']);
        this.words_1.push(['aunty', '英音[\'ɑ:nti] 美音[\'æ:nti]', '1.姑母；姨母；伯母；舅母；阿姨；婶婶']);
        this.words_1.push(['autumn', '英音[\'ɔ:təm] 美音[\'ɔ:təm]', '1.秋，秋天，秋季 \r\n2.成熟期，渐衰期']);
        this.words_1.push(['bad', '英音[bæd] 美音[bæd]', '1.坏的，不好的；拙劣的；令人不悦的\r\n2.有害的(+for)\r\n3.严重的；厉害的\r\n4.（食物）腐坏的；腐烂的']);
        this.words_1.push(['bag', '英音 [bæg] 美音 [bæg]', '1.背包，纸袋，塑料袋\r\n2.一袋（的量）']);
    }
}

var word_1_mgr = new word_x_1();
export default word_1_mgr;

//根据原本的播放的帧动画来设定
const resultCardType = {
    0: {
        //1，没牛
        name: "无牛",
    },
    1: {
        name: "牛丁",
    },
    2: {
        name: "牛二",
    },
    3: {
        name: "牛三",
    },
    4: {
        name: "牛四",
    },
    5: {
        name: "牛五",
    },
    6: {
        name: "牛六",
    },
    7: {
        name: "牛七",
    },
    8: {
        name: "牛八",
    },
    9: {
        name: "牛九",
    },
    10: {
        name: "牛牛",
    },
    //顺子牛
    12: {
        name: "顺子牛",
    },
    //同花牛
    13: {
        name: "同花牛",
    },
    //葫芦牛
    14: {
        name: "葫芦牛",
    },
    //炸弹牛
    15: {
        name: "炸弹牛",
    },
    //五花牛
    17: {
        name: "五花牛",
    },
    //五小牛
    18: {
        name: "五小牛",
    },
}

glGame.baseclass.extend({
    properties: {
        gameData: cc.Node,
        gameContent: cc.Node,
        gameItem: cc.Node,
        atlas_poker: cc.SpriteAtlas,    //卡牌图集
    },
    onLoad() {
        this.registerEvent();
    },

    registerEvent() {
    },
    unRegisterEvent() {
    },

    OnDestroy() {
        this.unRegisterEvent();
    },

    onClick(name, node) {
        switch (name) {
            case "btn_return": glGame.emitter.emit("openGameRecord"); break;
            default:
                break
        }
    },

    initData(data, list) {
        this.initRoomData(data, list);
        this.initRecordUI(data, list);
    },

    initRoomData(data, list) {
        this.gameData.getChildByName("number").getComponent(cc.Label).string = data.summaryId;
        this.gameData.getChildByName("roundnum").getComponent(cc.Label).string = list.handNumber;
        this.gameData.getChildByName("game").getComponent(cc.Label).string = data.gameName;
        this.gameData.getChildByName("round").getComponent(cc.Label).string = data.totalRound;
        this.gameData.getChildByName("score").getComponent(cc.Label).string = this.getFixNumber(data.score);
        this.gameData.getChildByName("score").color = data.score > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);

    },

    //渲染牌局记录
    initRecordUI(rdata, list) {
        this.gameContent.removeAllChildren();
        let userData = list.detail;
        if (userData.length == 0) {
            return;
        }
        for (let i = 0; i < userData.length; i++) {
            let node = cc.instantiate(this.gameItem);
            // node.getChildByName("bg").active = i % 2 != 0;
            node.parent = this.gameContent;
            node.active = true;
            let data = userData[i];

            node.getChildByName("name").getComponent(cc.Label).string = data.nickname;
            node.getChildByName("img_fangzhu").active = rdata.masterUid == data.uid;
            node.getChildByName("id").getComponent(cc.Label).string = data.logicId;
            node.getChildByName("img_wu").active = Number(data.uid) == glGame.user.get("userID");

            let node_card = node.getChildByName("poker");
            for (let j = 0; j < data.cards.length; j++) {
                let cardName = `bull1_${this.getSixValue(data.cards[j])}`;
                node_card.getChildByName(String(j)).getComponent(cc.Sprite).spriteFrame = this.atlas_poker._spriteFrames[cardName];
            }

            node.getChildByName("type").getComponent(cc.Label).string = `${resultCardType[data.cardType].name}-${data.cardRate}倍`;
            node.getChildByName("bet").getComponent(cc.Label).string = data.isBanker ? `抢${data.dealerTimes}倍` : `下${data.multiple}倍`;
            node.getChildByName("bet").color = data.isBanker ? cc.color(0xf6, 0xd0, 0x1e) : cc.color(0x46, 0xbf, 0xff);
            node.getChildByName("win").getComponent(cc.Label).string = data.scoreOffset > 0 ? '赢' : '输';
            node.getChildByName("win").color = data.scoreOffset > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
            node.getChildByName("score").getComponent(cc.Label).string = this.getFixNumber(data.scoreOffset);
            node.getChildByName("score").color = data.scoreOffset > 0 ? cc.color(0x48, 0xd4, 0xa8) : cc.color(0xf6, 0x8e, 0x1e);
        }
    },

    //获取牌的16进制值
    getSixValue(logicNum) {
        logicNum = parseInt(logicNum);
        let str = logicNum < 14 ? "0x0" : "0x";
        return str + logicNum.toString(16);
    },

    
    getFixNumber(value) {
        let value1 = Number(value).div(10);
        value = Number(value).div(100);
        if (isNaN(value)) return;
        if (~~value === value) {
            return value.toString();
        } else if (~~value1 === value1) {
            return value.toFixed(1);
        } else {
            return value.toFixed(2);
        }
    },

});

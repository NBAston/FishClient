const TITLE_LIST = {
    "ordinary": 1,
    "fishdemon": 2,
    "specialfish": 3,
    "boss": 4
}
let CONST = require("nfishConst");
glGame.movieClip.extend({
    properties: {
        json_fishTable: {
            default: null,
            displayName: "fish table",
            tooltip: "鱼表",
            type: cc.JsonAsset,
        },
        fish_AtlaLists: {
            default: [],
            displayName: "所有鱼",
            tooltip: "鱼",
            type: [cc.SpriteAtlas],
        },
        fish_unit: cc.Node,
        selectItem: cc.Node,
        content: cc.Node,
        iconAtlas: cc.SpriteAtlas,
        fishInfo: cc.Node,
        fishdesc: cc.Label,
        fishNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.json_fishTable = this.json_fishTable.json;
        this.curLevel = 1;
        glGame.gameNet.send_msg('http.ReqNewFishConfig', { gameid: glGame.scenetag.FISH2 }, (route, msg) => {
            if (msg.result != null) {
                this.fishMutipleCfg = msg.result;
            }
            this.initSelectToggle();
        });
    },
    //初始化选择复选框
    initSelectToggle() {
        this.content.destroyAllChildren();
        this.content.removeAllChildren();
        for (let key in this.fishMutipleCfg) {
            if (!this.json_fishTable[key] || !this.isCurLevel(this.json_fishTable[key].level)) continue;
            let selectItem = cc.instantiate(this.selectItem);
            let sprite = selectItem.getChildByName("icon").getComponent(cc.Sprite);
            sprite.spriteFrame = this.iconAtlas.getSpriteFrame(`${this.json_fishTable[key].resGroupId}`);
            selectItem.getChildByName("fishname").getComponent(cc.Label).string = this.json_fishTable[key].fishName;
            if (this.fishMutipleCfg[key] <= 0) {//图鉴中，螃蟹特殊处理，不显示倍数(小于等于0的情况不显示倍数)
                selectItem.getChildByName("times").active = false;
            } else {
                selectItem.getChildByName("times").active = true;
            }
            selectItem.getChildByName("times").getComponent(cc.Label).string = `${this.fishMutipleCfg[key]}倍`;
            selectItem.parent = this.content;
            selectItem.getChildByName("Background").name = `${key}`;
            selectItem.active = true;
        }
        if (this.content.childrenCount == 0) return this.resetInfo();
        this.setInfo(this.content.children[0]);
    },
    onClick(name, node) {
        switch (name) {
            case "btn_close": this.remove(); break;
            case "selectItem": this.setInfo(node); break;
            case "fishdemon": case "specialfish": case "ordinary": case "boss":
                this.switchTitle(name);
                break;
            default: console.error("no find button name -> %s", name);
        }
    },
    isCurLevel(listLevel) {
        let draw = false;
        if (this.curLevel == 1 && listLevel >= 0 && listLevel <= 3) {
            draw = true;
        } else if (this.curLevel == 2 && listLevel == 4) {
            draw = true;
        } else if (this.curLevel == 3 && listLevel >= 7 && listLevel <= 8) {
            draw = true;
        } else if (this.curLevel == 4 && listLevel >= 9) {
            draw = true;
        }
        return draw;
    },
    //切换标签
    switchTitle(name) {
        this.curLevel = TITLE_LIST[name];
        this.initSelectToggle();
    },
    //设置页面上的详情
    setInfo(node) {
        let index = Number(node.children[0].name);
        this.fishInfo.getChildByName("fishname").getComponent(cc.Label).string = this.json_fishTable[index].fishName;
        this.fishdesc.string = this.json_fishTable[index].fishDesc;
        if (this.fishMutipleCfg[index] <= 0) {//图鉴中，螃蟹特殊处理，不显示倍数(小于等于0的情况不显示倍数)
            this.fishInfo.getChildByName("times").active = false;
        } else {
            this.fishInfo.getChildByName("times").active = true;
        }
        this.fishInfo.getChildByName("times").getComponent(cc.Label).string = `${this.fishMutipleCfg[index]}倍`;

        this.fishNode.destroyAllChildren();
        this.fishNode.removeAllChildren();
        let fish_unit = cc.instantiate(this.fish_unit);
        this.fishNode.addChild(fish_unit);
        fish_unit.active = true;
        let script = fish_unit.getComponent("nfish_MovieClip");
        script.initFishMovieClip();
        script.initAtlas(this.fish_AtlaLists);
        script.updateFrequency(0.1);
        script.startFishRuning(this.json_fishTable[index].resGroupId);
        const fishRateMin = 4;        //需要放大小鱼倍率
        const rateValue = 1.3;
        if (fish_unit.width > this.fishNode.width || fish_unit.height > this.fishNode.height) {
            let widthRate = this.fishNode.width / fish_unit.width,
                heightRate = this.fishNode.height / fish_unit.height,
                rate = widthRate > heightRate ? heightRate : widthRate;
            fish_unit.setScale(rate);
        } else if (this.fishNode.height / fish_unit.height > fishRateMin) {     //添加小鱼的处理倍率
            fish_unit.setScale(rateValue);
        }
    },
    //重置初始化信息
    resetInfo() {
        this.fishNode.destroyAllChildren();
        this.fishNode.removeAllChildren();
        this.fishInfo.getChildByName("fishname").getComponent(cc.Label).string = "";
        this.fishdesc.string = "";
        this.fishInfo.getChildByName("times").getComponent(cc.Label).string = "";
    }
    // update (dt) {},
});

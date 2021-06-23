"use strict";
cc._RF.push(module, 'bd65a6zWplLpK2qB07E+5iN', 'nfish_illustrated');
// modules/games/nfish/script/prefab/nfish_illustrated.js

"use strict";

var TITLE_LIST = {
  "ordinary": 1,
  "fishdemon": 2,
  "specialfish": 3,
  "boss": 4
};
glGame.movieClip.extend({
  properties: {
    json_fishTable: {
      "default": null,
      displayName: "fish table",
      tooltip: "鱼表",
      type: cc.JsonAsset
    },
    fish_AtlaLists: {
      "default": [],
      displayName: "所有鱼",
      tooltip: "鱼",
      type: [cc.SpriteAtlas]
    },
    fish_unit: cc.Node,
    selectItem: cc.Node,
    content: cc.Node,
    iconAtlas: cc.SpriteAtlas,
    fishInfo: cc.Node,
    fishdesc: cc.Label,
    fishNode: cc.Node,
    bossInfo: [cc.Node],
    bossdesc: [cc.Label],
    bossNode: [cc.Node],
    baseView: cc.Node,
    bossView: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var _this = this;

    this.json_fishTable = this.json_fishTable.json;
    this.curLevel = 1;
    glGame.gameNet.send_msg('http.ReqNewFishConfig', {
      gameid: glGame.scenetag.FISH2
    }, function (route, msg) {
      if (msg.result != null) {
        _this.fishMutipleCfg = msg.result;
      }

      _this.initSelectToggle();
    });
  },
  //初始化选择复选框
  initSelectToggle: function initSelectToggle() {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();

    for (var key in this.fishMutipleCfg) {
      if (!this.json_fishTable[key] || !this.isCurLevel(this.json_fishTable[key].level)) continue;
      var selectItem = cc.instantiate(this.selectItem);
      var sprite = selectItem.getChildByName("icon").getComponent(cc.Sprite);
      sprite.spriteFrame = this.iconAtlas.getSpriteFrame("".concat(this.json_fishTable[key].resGroupId));
      selectItem.getChildByName("fishname").getComponent(cc.Label).string = this.json_fishTable[key].fishName;

      if (this.fishMutipleCfg[key] <= 0) {
        //图鉴中，螃蟹特殊处理，不显示倍数(小于等于0的情况不显示倍数)
        selectItem.getChildByName("times").active = false;
      } else {
        selectItem.getChildByName("times").active = true;
      }

      selectItem.getChildByName("times").getComponent(cc.Label).string = "".concat(this.fishMutipleCfg[key], "\u500D");
      selectItem.parent = this.content;
      selectItem.getChildByName("Background").name = "".concat(key);
      selectItem.active = true;
    }

    if (this.content.childrenCount == 0) return this.resetInfo();
    this.setInfo(this.content.children[0]);
  },
  //初始化选择复选框
  initSelectToggleBoss: function initSelectToggleBoss() {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    var index = 0;

    for (var key in this.fishMutipleCfg) {
      if (!this.json_fishTable[key] || !this.isCurLevel(this.json_fishTable[key].level) || !this.bossInfo[index] || !this.bossdesc[index] || !this.bossNode[index]) continue;
      this.setFishInfo(this.bossInfo[index], this.bossdesc[index], key);
      this.setFishNode(this.bossNode[index], key);
      index++;
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "selectItem":
        this.setInfo(node);
        break;

      case "fishdemon":
      case "specialfish":
      case "ordinary":
      case "boss":
        this.switchTitle(name);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  // 策划配置的要求
  // 0~3属于第一档次的鱼  4 属于第二档次的鱼  7~8属于第三档次的鱼， d大于9等于第四档次的鱼
  isCurLevel: function isCurLevel(listLevel) {
    var draw = false;

    if (this.curLevel == 1 && listLevel >= 0 && listLevel <= 3) {
      //一档
      draw = true;
    } else if (this.curLevel == 2 && listLevel == 4) {
      //二挡
      draw = true;
    } else if (this.curLevel == 3 && listLevel >= 7 && listLevel <= 8) {
      //三挡
      draw = true;
    } else if (this.curLevel == 4 && listLevel >= 9) {
      //四挡
      draw = true;
    }

    return draw;
  },
  //切换标签
  switchTitle: function switchTitle(name) {
    var isShowBoosView = name === "boss";
    this.baseView.active = !isShowBoosView;
    this.bossView.active = isShowBoosView;
    this.curLevel = TITLE_LIST[name];

    if (isShowBoosView) {
      this.initSelectToggleBoss();
    } else {
      this.initSelectToggle();
    }
  },
  //设置页面上的详情
  setInfo: function setInfo(node) {
    var index = Number(node.children[0].name);
    this.setFishInfo(this.fishInfo, this.fishdesc, index);
    this.setFishNode(this.fishNode, index);
  },
  //设置鱼的详细信息
  setFishInfo: function setFishInfo(fishInfo, fishdesc, index) {
    fishInfo.getChildByName("fishname").getComponent(cc.Label).string = this.json_fishTable[index].fishName;
    fishdesc.string = this.json_fishTable[index].fishDesc;

    if (this.fishMutipleCfg[index] <= 0) {
      //图鉴中，螃蟹特殊处理，不显示倍数(小于等于0的情况不显示倍数)
      fishInfo.getChildByName("times").active = false;
    } else {
      fishInfo.getChildByName("times").active = true;
    }

    fishInfo.getChildByName("times").getComponent(cc.Label).string = "".concat(this.fishMutipleCfg[index], "\u500D");
  },
  //设置鱼帧图
  setFishNode: function setFishNode(fishNode, index) {
    fishNode.destroyAllChildren();
    fishNode.removeAllChildren();
    var fish_unit = cc.instantiate(this.fish_unit);
    fishNode.addChild(fish_unit);
    fish_unit.active = true;
    var script = fish_unit.getComponent("nfish_MovieClip");
    script.initFishMovieClip();
    script.initAtlas(this.fish_AtlaLists);
    script.updateFrequency(0.1);
    script.startFishRuning(this.json_fishTable[index].resGroupId);
    var fishRateMin = 4; //需要放大小鱼倍率

    var rateValue = 1.3;

    if (fish_unit.width > fishNode.width || fish_unit.height > fishNode.height) {
      var widthRate = fishNode.width / fish_unit.width,
          heightRate = fishNode.height / fish_unit.height,
          rate = widthRate > heightRate ? heightRate : widthRate;
      fish_unit.setScale(rate);
    } else if (fishNode.height / fish_unit.height > fishRateMin) {
      //添加小鱼的处理倍率
      fish_unit.setScale(rateValue);
    }
  },
  //重置初始化信息
  resetInfo: function resetInfo() {
    this.fishNode.destroyAllChildren();
    this.fishNode.removeAllChildren();
    this.fishInfo.getChildByName("fishname").getComponent(cc.Label).string = "";
    this.fishdesc.string = "";
    this.fishInfo.getChildByName("times").getComponent(cc.Label).string = "";
  } // update (dt) {},

});

cc._RF.pop();
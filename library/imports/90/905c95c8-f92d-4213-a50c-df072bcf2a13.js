"use strict";
cc._RF.push(module, '905c9XI+S1CE6UM3wcrzyoT', 'gameitem');
// modules/plaza/script/prefab/enterRoom/gameitem.js

"use strict";

/**
 * 大厅子游戏图标通用脚本
 */
var BGCOLOR = {
  BLUE: 0,
  ORANGE: 1,
  GREEN: 2,
  RED: 3,
  PURPLE: 4
};
var CORNER_MARK = {
  0: "维护",
  1: "推荐",
  2: "火爆",
  3: "最新"
};
glGame.baseclass.extend({
  properties: {
    pic_downloadBg: cc.Sprite,
    processNew: cc.Node,
    progressPic: cc.Sprite,
    inconSpine: sp.Skeleton,
    gamespine: {
      "default": [],
      type: sp.SkeletonData
    },
    corner_mark: cc.Sprite,
    atlas_corner_mark: cc.SpriteAtlas,
    grayMaterial: cc.Material
  },
  onLoad: function onLoad() {
    glGame.emitter.on("roomEntrance", this.roomEntrance, this);
    glGame.emitter.on("hotUIRefresh", this.hotUIRefresh, this);
    if (this.blInit) this.inconSpine.setAnimation(0, "animation", true);
  },
  roomEntrance: function roomEntrance(gameid) {
    if (gameid == this.gameID && this.node.active) {
      this.onClick();
    }
  },

  /**
   * 界面数据初始化
   */
  resetData: function resetData() {
    //game 的相关数据对应
    this.GAME_ITEM = [glGame.scenetag.BAIJIALE, // 百家乐
    glGame.scenetag.BRNN, // 百人牛牛
    glGame.scenetag.DDZ, // 斗地主
    glGame.scenetag.DZPK, // 德州扑克
    glGame.scenetag.HONGHEI, // 红黑
    glGame.scenetag.LABA, // 拉霸
    glGame.scenetag.LONGHUDOU, // 龙虎斗
    glGame.scenetag.LUCKTURNTABLE, // 幸运大转盘
    glGame.scenetag.PAIJIU, // 牌九
    glGame.scenetag.QZNN, // 抢庄牛牛
    glGame.scenetag.SANGONG, // 三公
    glGame.scenetag.SHUIGUOJI, // 水果机
    glGame.scenetag.ZHAJINHUA, // 炸金花
    glGame.scenetag.JSZJH, // 极速炸金花
    glGame.scenetag.ESYD, // 二十一点
    glGame.scenetag.EBG, // 二八杠
    glGame.scenetag.FISH, // 捕鱼
    glGame.scenetag.QHBJL, // 抢红包接龙
    glGame.scenetag.SSS, // 十三水
    glGame.scenetag.HCPY, // 豪车漂移
    glGame.scenetag.SLWH, // 森林舞会
    glGame.scenetag.WQZNN, // 五人抢庄
    glGame.scenetag.HBSL, // 红包扫雷
    glGame.scenetag.FISH2, // 新捕鱼
    glGame.scenetag.FISH3 // 新捕鱼2
    ];
    this.isUpdate = false;
    this.isEnter = false;
    this.gameInfo = {};
    this.spineList = {};
    this.assetsManager = null; // 对 this.gameicon 进行了包装, 使用图片名字作为 key, 图片对象作为 value

    for (var i = 0; i < this.GAME_ITEM.length; i++) {
      if (this.gamespine[i]) {
        this.spineList[this.GAME_ITEM[i]] = this.gamespine[i];
      }
    }
  },

  /**
   * 初始化图标状态
   */
  initUI: function initUI(gameList) {
    this.gameID = gameList.id;
    this.blInit = true; // this.status = this.gameInfo["status"] ? this.gameInfo["status"] : 2;    //这里已经生成图标，取不到状态默认设置为维护中

    this.gameName = glGame.scene.getSceneNameByID(this.gameID);
    if (!this.gameName) return this.node.active = false; //临时措施，PHP已给游戏，客户端还未完成
    // 设置角标

    if (gameList.tag > 0) {
      this.corner_mark.spriteFrame = this.atlas_corner_mark.getSpriteFrame("img_corner_mark".concat(gameList.tag));
      this.corner_mark.node.getChildByName("txt").getComponent(cc.Label).string = CORNER_MARK[gameList.tag];
      this.corner_mark.node.active = true;
    }

    if (gameList.processState == 2) {
      this.corner_mark.spriteFrame = this.atlas_corner_mark.getSpriteFrame("img_corner_mark0");
      this.corner_mark.node.getChildByName("txt").getComponent(cc.Label).string = CORNER_MARK[0];
      this.corner_mark.node.active = true;
      this.inconSpine.setMaterial(0, this.grayMaterial); //给精灵添加新材质

      var newMaterial = cc.Material.createWithBuiltin(cc.Material.BUILTIN_NAME.GRAY_SPRITE, 0);
      this.node.getChildByName("bg").getComponent(cc.Sprite).setMaterial(0, newMaterial); //给精灵添加新材质
    }

    this.inconSpine.skeletonData = this.spineList[this.gameID];
    this.inconSpine.setAnimation(0, "animation", true);
    this.gameIsHotStatus();
  },
  checkGame: function checkGame(gameid) {
    return this.GAME_ITEM.indexOf(gameid);
  },
  set: function set(key, value) {
    this[key] = value;
  },
  // 按钮点击事件
  onClick: function onClick(name, node) {
    // 打开自己游戏
    glGame.gamelistcfg.onEnterGame(this.gameID, false); // // 查找是否需要更新
    // glGame.gamelistcfg.isNeedUpdate(this.gameID).then(bol => {
    //     // 需要更新
    //     if (bol) glGame.gamelistcfg.setGameUpdate(this.gameName, false);
    //     // 打开自己游戏
    //     glGame.gamelistcfg.onEnterGame(this.gameID);
    // });
  },
  // 判断游戏是否在热更
  gameIsHotStatus: function gameIsHotStatus() {
    if (!cc.sys.isNative) return; // 检查当前是否有游戏正在跟新

    var is_update_queue = glGame.assetsManager.isBeingUpdate(this.gameName);

    if (is_update_queue != null) {
      var data = {
        gameName: this.gameName,
        isActive: true
      };

      if (is_update_queue) {
        data.isStatus = 0;
      }

      this.hotUIRefresh(data);
    } else {
      // 查找是否需要更新
      glGame.assetsManager.isNeedUpdate(this.gameName);
    }
  },
  // 热更刷新UI
  hotUIRefresh: function hotUIRefresh(data) {
    if (data.gameName == this.gameName) {
      // 黑色遮罩
      this.pic_downloadBg.node.active = data.isActive; // 进度条

      this.processNew.active = data.isActive; // 显示下载进度

      var schedule = this.processNew.getChildByName("label").getComponent(cc.Label);

      switch (data.isStatus) {
        case 0:
          // 热更接续
          schedule.string = "0%";
          this.progressPic.fillRange = 0;
          break;

        case 1:
          // 下载中
          schedule.string = "".concat(parseInt(data.process * 100) || 0, "%");
          this.progressPic.fillRange = data.process;
          break;

        default:
          // 下载列表大于最大同时下载量的时候显示等待中
          schedule.string = "等待中";
          this.progressPic.fillRange = 0;
          break;
      }
    }
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("roomEntrance", this);
    glGame.emitter.off("hotUIRefresh", this);
  }
});

cc._RF.pop();
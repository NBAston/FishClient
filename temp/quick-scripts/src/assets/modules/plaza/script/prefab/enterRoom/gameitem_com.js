"use strict";
cc._RF.push(module, 'a24dbIh0ldOxbwTWwkPSf+V', 'gameitem_com');
// modules/plaza/script/prefab/enterRoom/gameitem_com.js

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
    game_icon: cc.Node,
    game_name: cc.Label,
    pic_downloadBg: cc.Sprite,
    processNew: cc.Node,
    progressPic: cc.Sprite,
    cornerMark: cc.Sprite,
    atlas_corner_mark: cc.SpriteAtlas,
    atlas_game_icon: cc.SpriteAtlas
  },
  onLoad: function onLoad() {
    glGame.emitter.on("roomEntrance", this.roomEntrance, this);
    glGame.emitter.on("hotUIRefresh", this.hotUIRefresh, this);
  },
  roomEntrance: function roomEntrance(gameid) {
    if (gameid == this.gameID) {
      console.log("gameitem_com , 进入游戏监听===》", gameid);
      this.onClick();
    }
  },

  /**
   * 初始化图标状态
   */
  initUI: function initUI(gameList) {
    this.gameList = gameList;
    this.gameID = gameList.id;
    this.gameName = glGame.scene.getSceneNameByID(this.gameID); // if (!this.gameName) return this.node.active = false;                          //临时措施，PHP已给游戏，客户端还未完成

    this.game_name.string = this.gameList.gameName; // 设置游戏名称
    // this.game_name._forceUpdateRenderData();
    // console.log("this.game_name 2222 ===> ", this.game_name.node, this.game_name.node.width);

    if (this.gameList.tag > 0) {
      //设置角标
      this.cornerMark.spriteFrame = this.atlas_corner_mark.getSpriteFrame("img_corner_mark".concat(this.gameList.tag));
      this.cornerMark.node.getChildByName("txt").getComponent(cc.Label).string = CORNER_MARK[this.gameList.tag];
      this.cornerMark.node.active = true;
    }

    if (this.gameList.processState == 2) {
      this.cornerMark.spriteFrame = this.atlas_corner_mark.getSpriteFrame("img_corner_mark0");
      this.cornerMark.node.getChildByName("txt").getComponent(cc.Label).string = CORNER_MARK[0];
      this.cornerMark.node.active = true;
      var newMaterial = cc.Material.createWithBuiltin(cc.Material.BUILTIN_NAME.GRAY_SPRITE, 0);
      this.game_icon.getComponent(cc.Sprite).setMaterial(0, newMaterial); //给精灵添加新材质
    } // 加载游戏图片


    if (this.gameID < 10000) {
      this.game_icon.getComponent(cc.Sprite).spriteFrame = this.atlas_game_icon.getSpriteFrame("icon_".concat(this.gameID));
    } else {
      if (this.gameList.icon) {
        var url = glGame.user.get('url').resource_url;
        glGame.panel.showRemoteImage(this.game_icon, url + this.gameList.icon);
      }
    }

    if (this.gameID < 10000) {
      this.gameIsHotStatus();
    }
  },
  set: function set(key, value) {
    this[key] = value;
  },
  // 按钮点击事件
  onClick: function onClick(name, node) {
    console.log("点击了游戏", this.gameID); // 打开三方游戏

    if (this.gameID > 9999) {
      // if (!isEnableHotUpdate) return;
      glGame.gamelistcfg.openTripartiteGame({
        gamesList: this.gameList,
        type: 1
      });
      return;
    } // 打开自己游戏


    glGame.gamelistcfg.onEnterGame(this.gameID, false); // // 查找是否需要更新
    // glGame.gamelistcfg.isNeedUpdate(this.gameID).then(bol => {
    //     console.log("开始进入游戏", bol);
    //     // 需要更新
    //     if (bol) glGame.gamelistcfg.setGameUpdate(this.gameName, false);
    //     console.log("打开自己游戏=====>")
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
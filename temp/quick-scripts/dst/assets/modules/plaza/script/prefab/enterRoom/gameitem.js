
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/gameitem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXGdhbWVpdGVtLmpzIl0sIm5hbWVzIjpbIkJHQ09MT1IiLCJCTFVFIiwiT1JBTkdFIiwiR1JFRU4iLCJSRUQiLCJQVVJQTEUiLCJDT1JORVJfTUFSSyIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJwaWNfZG93bmxvYWRCZyIsImNjIiwiU3ByaXRlIiwicHJvY2Vzc05ldyIsIk5vZGUiLCJwcm9ncmVzc1BpYyIsImluY29uU3BpbmUiLCJzcCIsIlNrZWxldG9uIiwiZ2FtZXNwaW5lIiwidHlwZSIsIlNrZWxldG9uRGF0YSIsImNvcm5lcl9tYXJrIiwiYXRsYXNfY29ybmVyX21hcmsiLCJTcHJpdGVBdGxhcyIsImdyYXlNYXRlcmlhbCIsIk1hdGVyaWFsIiwib25Mb2FkIiwiZW1pdHRlciIsIm9uIiwicm9vbUVudHJhbmNlIiwiaG90VUlSZWZyZXNoIiwiYmxJbml0Iiwic2V0QW5pbWF0aW9uIiwiZ2FtZWlkIiwiZ2FtZUlEIiwibm9kZSIsImFjdGl2ZSIsIm9uQ2xpY2siLCJyZXNldERhdGEiLCJHQU1FX0lURU0iLCJzY2VuZXRhZyIsIkJBSUpJQUxFIiwiQlJOTiIsIkREWiIsIkRaUEsiLCJIT05HSEVJIiwiTEFCQSIsIkxPTkdIVURPVSIsIkxVQ0tUVVJOVEFCTEUiLCJQQUlKSVUiLCJRWk5OIiwiU0FOR09ORyIsIlNIVUlHVU9KSSIsIlpIQUpJTkhVQSIsIkpTWkpIIiwiRVNZRCIsIkVCRyIsIkZJU0giLCJRSEJKTCIsIlNTUyIsIkhDUFkiLCJTTFdIIiwiV1FaTk4iLCJIQlNMIiwiRklTSDIiLCJGSVNIMyIsImlzVXBkYXRlIiwiaXNFbnRlciIsImdhbWVJbmZvIiwic3BpbmVMaXN0IiwiYXNzZXRzTWFuYWdlciIsImkiLCJsZW5ndGgiLCJpbml0VUkiLCJnYW1lTGlzdCIsImlkIiwiZ2FtZU5hbWUiLCJzY2VuZSIsImdldFNjZW5lTmFtZUJ5SUQiLCJ0YWciLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsInByb2Nlc3NTdGF0ZSIsInNldE1hdGVyaWFsIiwibmV3TWF0ZXJpYWwiLCJjcmVhdGVXaXRoQnVpbHRpbiIsIkJVSUxUSU5fTkFNRSIsIkdSQVlfU1BSSVRFIiwic2tlbGV0b25EYXRhIiwiZ2FtZUlzSG90U3RhdHVzIiwiY2hlY2tHYW1lIiwiaW5kZXhPZiIsInNldCIsImtleSIsInZhbHVlIiwibmFtZSIsImdhbWVsaXN0Y2ZnIiwib25FbnRlckdhbWUiLCJzeXMiLCJpc05hdGl2ZSIsImlzX3VwZGF0ZV9xdWV1ZSIsImlzQmVpbmdVcGRhdGUiLCJkYXRhIiwiaXNBY3RpdmUiLCJpc1N0YXR1cyIsImlzTmVlZFVwZGF0ZSIsInNjaGVkdWxlIiwiZmlsbFJhbmdlIiwicGFyc2VJbnQiLCJwcm9jZXNzIiwiT25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQSxJQUFNQSxPQUFPLEdBQUc7QUFDWkMsRUFBQUEsSUFBSSxFQUFFLENBRE07QUFFWkMsRUFBQUEsTUFBTSxFQUFFLENBRkk7QUFHWkMsRUFBQUEsS0FBSyxFQUFFLENBSEs7QUFJWkMsRUFBQUEsR0FBRyxFQUFFLENBSk87QUFLWkMsRUFBQUEsTUFBTSxFQUFFO0FBTEksQ0FBaEI7QUFPQSxJQUFNQyxXQUFXLEdBQUc7QUFDaEIsS0FBRyxJQURhO0FBRWhCLEtBQUcsSUFGYTtBQUdoQixLQUFHLElBSGE7QUFJaEIsS0FBRztBQUphLENBQXBCO0FBTUFDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxjQUFjLEVBQUVDLEVBQUUsQ0FBQ0MsTUFEWDtBQUVSQyxJQUFBQSxVQUFVLEVBQUVGLEVBQUUsQ0FBQ0csSUFGUDtBQUdSQyxJQUFB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ZSxHQUFoQixDQUFSLElBQWdDLENBQXJEO0FBQ0EsZUFBS25HLFdBQUwsQ0FBaUJpRyxTQUFqQixHQUE2QkwsSUFBSSxDQUFDTyxPQUFsQztBQUNBOztBQUNKO0FBQ0k7QUFDQUgsVUFBQUEsUUFBUSxDQUFDekIsTUFBVCxHQUFrQixLQUFsQjtBQUNBLGVBQUt2RSxXQUFMLENBQWlCaUcsU0FBakIsR0FBNkIsQ0FBN0I7QUFDQTtBQWZSO0FBaUJIO0FBQ0osR0E1S21CO0FBOEtwQkcsRUFBQUEsU0E5S29CLHVCQThLUjtBQUNSN0csSUFBQUEsTUFBTSxDQUFDc0IsT0FBUCxDQUFld0YsR0FBZixDQUFtQixjQUFuQixFQUFtQyxJQUFuQztBQUNBOUcsSUFBQUEsTUFBTSxDQUFDc0IsT0FBUCxDQUFld0YsR0FBZixDQUFtQixjQUFuQixFQUFtQyxJQUFuQztBQUNIO0FBakxtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWkp+WOheWtkOa4uOaIj+Wbvuagh+mAmueUqOiEmuacrFxyXG4gKi9cclxuY29uc3QgQkdDT0xPUiA9IHtcclxuICAgIEJMVUU6IDAsXHJcbiAgICBPUkFOR0U6IDEsXHJcbiAgICBHUkVFTjogMixcclxuICAgIFJFRDogMyxcclxuICAgIFBVUlBMRTogNCxcclxufVxyXG5jb25zdCBDT1JORVJfTUFSSyA9IHtcclxuICAgIDA6IFwi57u05oqkXCIsXHJcbiAgICAxOiBcIuaOqOiNkFwiLFxyXG4gICAgMjogXCLngavniIZcIixcclxuICAgIDM6IFwi5pyA5pawXCIsXHJcbn1cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBpY19kb3dubG9hZEJnOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgcHJvY2Vzc05ldzogY2MuTm9kZSxcclxuICAgICAgICBwcm9ncmVzc1BpYzogY2MuU3ByaXRlLFxyXG5cclxuICAgICAgICBpbmNvblNwaW5lOiBzcC5Ta2VsZXRvbixcclxuICAgICAgICBnYW1lc3BpbmU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IHNwLlNrZWxldG9uRGF0YVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvcm5lcl9tYXJrOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgYXRsYXNfY29ybmVyX21hcms6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIGdyYXlNYXRlcmlhbDogY2MuTWF0ZXJpYWwsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwicm9vbUVudHJhbmNlXCIsIHRoaXMucm9vbUVudHJhbmNlLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcImhvdFVJUmVmcmVzaFwiLCB0aGlzLmhvdFVJUmVmcmVzaCwgdGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuYmxJbml0KSB0aGlzLmluY29uU3BpbmUuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByb29tRW50cmFuY2UoZ2FtZWlkKSB7XHJcbiAgICAgICAgaWYgKGdhbWVpZCA9PSB0aGlzLmdhbWVJRCAmJiB0aGlzLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLmlbDmja7liJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgcmVzZXREYXRhKCkge1xyXG4gICAgICAgIC8vZ2FtZSDnmoTnm7jlhbPmlbDmja7lr7nlupRcclxuICAgICAgICB0aGlzLkdBTUVfSVRFTSA9IFtcclxuICAgICAgICAgICAgZ2xHYW1lLnNjZW5ldGFnLkJBSUpJQUxFLCAgICAgICAgIC8vIOeZvuWutuS5kFxyXG4gICAgICAgICAgICBnbEdhbWUuc2NlbmV0YWcuQlJOTiwgICAgICAgICAgICAgLy8g55m+5Lq654mb54mbXHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5ERFosICAgICAgICAgICAgICAvLyDmlpflnLDkuLtcclxuICAgICAgICAgICAgZ2xHYW1lLnNjZW5ldGFnLkRaUEssICAgICAgICAgICAgIC8vIOW+t+W3nuaJkeWFi1xyXG4gICAgICAgICAgICBnbEdhbWUuc2NlbmV0YWcuSE9OR0hFSSwgICAgICAgICAgLy8g57qi6buRXHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5MQUJBLCAgICAgICAgICAgICAvLyDmi4npnLhcclxuICAgICAgICAgICAgZ2xHYW1lLnNjZW5ldGFnLkxPTkdIVURPVSwgICAgICAgIC8vIOm+meiZjuaWl1xyXG4gICAgICAgICAgICBnbEdhbWUuc2NlbmV0YWcuTFVDS1RVUk5UQUJMRSwgICAgLy8g5bm46L+Q5aSn6L2s55uYXHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5QQUlKSVUsICAgICAgICAgICAvLyDniYzkuZ1cclxuICAgICAgICAgICAgZ2xHYW1lLnNjZW5ldGFnLlFaTk4sICAgICAgICAgICAgIC8vIOaKouW6hOeJm+eJm1xyXG4gICAgICAgICAgICBnbEdhbWUuc2NlbmV0YWcuU0FOR09ORywgICAgICAgICAgLy8g5LiJ5YWsXHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5TSFVJR1VPSkksICAgICAgICAvLyDmsLTmnpzmnLpcclxuICAgICAgICAgICAgZ2xHYW1lLnNjZW5ldGFnLlpIQUpJTkhVQSwgICAgICAgIC8vIOeCuOmHkeiKsVxyXG4gICAgICAgICAgICBnbEdhbWUuc2NlbmV0YWcuSlNaSkgsICAgICAgICAgICAgLy8g5p6B6YCf54K46YeR6IqxXHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5FU1lELCAgICAgICAgICAgICAvLyDkuozljYHkuIDngrlcclxuICAgICAgICAgICAgZ2xHYW1lLnNjZW5ldGFnLkVCRywgICAgICAgICAgICAgIC8vIOS6jOWFq+adoFxyXG4gICAgICAgICAgICBnbEdhbWUuc2NlbmV0YWcuRklTSCwgICAgICAgICAgICAgLy8g5o2V6bG8XHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5RSEJKTCwgICAgICAgICAgICAvLyDmiqLnuqLljIXmjqXpvplcclxuICAgICAgICAgICAgZ2xHYW1lLnNjZW5ldGFnLlNTUywgICAgICAgICAgICAgIC8vIOWNgeS4ieawtFxyXG4gICAgICAgICAgICBnbEdhbWUuc2NlbmV0YWcuSENQWSwgICAgICAgICAgICAgLy8g6LGq6L2m5ryC56e7XHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5TTFdILCAgICAgICAgICAgICAvLyDmo67mnpfoiJ7kvJpcclxuICAgICAgICAgICAgZ2xHYW1lLnNjZW5ldGFnLldRWk5OLCAgICAgICAgICAgIC8vIOS6lOS6uuaKouW6hFxyXG4gICAgICAgICAgICBnbEdhbWUuc2NlbmV0YWcuSEJTTCwgICAgICAgICAgICAgLy8g57qi5YyF5omr6Zu3XHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5GSVNIMiwgICAgICAgICAgICAgLy8g5paw5o2V6bG8XHJcbiAgICAgICAgICAgIGdsR2FtZS5zY2VuZXRhZy5GSVNIMywgICAgICAgICAgICAgLy8g5paw5o2V6bG8MlxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMuaXNVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzRW50ZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVJbmZvID0ge307XHJcbiAgICAgICAgdGhpcy5zcGluZUxpc3QgPSB7fTtcclxuICAgICAgICB0aGlzLmFzc2V0c01hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIC8vIOWvuSB0aGlzLmdhbWVpY29uIOi/m+ihjOS6huWMheijhSwg5L2/55So5Zu+54mH5ZCN5a2X5L2c5Li6IGtleSwg5Zu+54mH5a+56LGh5L2c5Li6IHZhbHVlXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkdBTUVfSVRFTS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lc3BpbmVbaV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmVMaXN0W3RoaXMuR0FNRV9JVEVNW2ldXSA9IHRoaXMuZ2FtZXNwaW5lW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluWbvuagh+eKtuaAgVxyXG4gICAgICovXHJcbiAgICBpbml0VUkoZ2FtZUxpc3QpIHtcclxuICAgICAgICB0aGlzLmdhbWVJRCA9IGdhbWVMaXN0LmlkO1xyXG4gICAgICAgIHRoaXMuYmxJbml0ID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLnN0YXR1cyA9IHRoaXMuZ2FtZUluZm9bXCJzdGF0dXNcIl0gPyB0aGlzLmdhbWVJbmZvW1wic3RhdHVzXCJdIDogMjsgICAgLy/ov5nph4zlt7Lnu4/nlJ/miJDlm77moIfvvIzlj5bkuI3liLDnirbmgIHpu5jorqTorr7nva7kuLrnu7TmiqTkuK1cclxuICAgICAgICB0aGlzLmdhbWVOYW1lID0gZ2xHYW1lLnNjZW5lLmdldFNjZW5lTmFtZUJ5SUQodGhpcy5nYW1lSUQpO1xyXG4gICAgICAgIGlmICghdGhpcy5nYW1lTmFtZSkgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Li05pe25o6q5pa977yMUEhQ5bey57uZ5ri45oiP77yM5a6i5oi356uv6L+Y5pyq5a6M5oiQXHJcblxyXG4gICAgICAgIC8vIOiuvue9ruinkuagh1xyXG4gICAgICAgIGlmIChnYW1lTGlzdC50YWcgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ybmVyX21hcmsuc3ByaXRlRnJhbWUgPSB0aGlzLmF0bGFzX2Nvcm5lcl9tYXJrLmdldFNwcml0ZUZyYW1lKGBpbWdfY29ybmVyX21hcmske2dhbWVMaXN0LnRhZ31gKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JuZXJfbWFyay5ub2RlLmdldENoaWxkQnlOYW1lKFwidHh0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gQ09STkVSX01BUktbZ2FtZUxpc3QudGFnXTtcclxuICAgICAgICAgICAgdGhpcy5jb3JuZXJfbWFyay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZ2FtZUxpc3QucHJvY2Vzc1N0YXRlID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3JuZXJfbWFyay5zcHJpdGVGcmFtZSA9IHRoaXMuYXRsYXNfY29ybmVyX21hcmsuZ2V0U3ByaXRlRnJhbWUoXCJpbWdfY29ybmVyX21hcmswXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcm5lcl9tYXJrLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0eHRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBDT1JORVJfTUFSS1swXTtcclxuICAgICAgICAgICAgdGhpcy5jb3JuZXJfbWFyay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW5jb25TcGluZS5zZXRNYXRlcmlhbCgwLCB0aGlzLmdyYXlNYXRlcmlhbCk7IC8v57uZ57K+54G15re75Yqg5paw5p2Q6LSoXHJcbiAgICAgICAgICAgIGxldCBuZXdNYXRlcmlhbCA9IGNjLk1hdGVyaWFsLmNyZWF0ZVdpdGhCdWlsdGluKGNjLk1hdGVyaWFsLkJVSUxUSU5fTkFNRS5HUkFZX1NQUklURSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIG5ld01hdGVyaWFsKTsgLy/nu5nnsr7ngbXmt7vliqDmlrDmnZDotKhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5jb25TcGluZS5za2VsZXRvbkRhdGEgPSB0aGlzLnNwaW5lTGlzdFt0aGlzLmdhbWVJRF07XHJcbiAgICAgICAgdGhpcy5pbmNvblNwaW5lLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lSXNIb3RTdGF0dXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tHYW1lKGdhbWVpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdBTUVfSVRFTS5pbmRleE9mKGdhbWVpZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaMiemSrueCueWHu+S6i+S7tlxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgLy8g5omT5byA6Ieq5bex5ri45oiPXHJcbiAgICAgICAgZ2xHYW1lLmdhbWVsaXN0Y2ZnLm9uRW50ZXJHYW1lKHRoaXMuZ2FtZUlELCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIC8vIOafpeaJvuaYr+WQpumcgOimgeabtOaWsFxyXG4gICAgICAgIC8vIGdsR2FtZS5nYW1lbGlzdGNmZy5pc05lZWRVcGRhdGUodGhpcy5nYW1lSUQpLnRoZW4oYm9sID0+IHtcclxuICAgICAgICAvLyAgICAgLy8g6ZyA6KaB5pu05pawXHJcbiAgICAgICAgLy8gICAgIGlmIChib2wpIGdsR2FtZS5nYW1lbGlzdGNmZy5zZXRHYW1lVXBkYXRlKHRoaXMuZ2FtZU5hbWUsIGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgLy8g5omT5byA6Ieq5bex5ri45oiPXHJcbiAgICAgICAgLy8gICAgIGdsR2FtZS5nYW1lbGlzdGNmZy5vbkVudGVyR2FtZSh0aGlzLmdhbWVJRCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIpOaWrea4uOaIj+aYr+WQpuWcqOeDreabtFxyXG4gICAgZ2FtZUlzSG90U3RhdHVzKCkge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSByZXR1cm47XHJcbiAgICAgICAgLy8g5qOA5p+l5b2T5YmN5piv5ZCm5pyJ5ri45oiP5q2j5Zyo6Lef5pawXHJcbiAgICAgICAgbGV0IGlzX3VwZGF0ZV9xdWV1ZSA9IGdsR2FtZS5hc3NldHNNYW5hZ2VyLmlzQmVpbmdVcGRhdGUodGhpcy5nYW1lTmFtZSk7XHJcbiAgICAgICAgaWYgKGlzX3VwZGF0ZV9xdWV1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge2dhbWVOYW1lOnRoaXMuZ2FtZU5hbWUsIGlzQWN0aXZlOnRydWV9XHJcbiAgICAgICAgICAgIGlmIChpc191cGRhdGVfcXVldWUpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuaXNTdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaG90VUlSZWZyZXNoKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOafpeaJvuaYr+WQpumcgOimgeabtOaWsFxyXG4gICAgICAgICAgICBnbEdhbWUuYXNzZXRzTWFuYWdlci5pc05lZWRVcGRhdGUodGhpcy5nYW1lTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDng63mm7TliLfmlrBVSVxyXG4gICAgaG90VUlSZWZyZXNoKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5nYW1lTmFtZSA9PSB0aGlzLmdhbWVOYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIOm7keiJsumBrue9qVxyXG4gICAgICAgICAgICB0aGlzLnBpY19kb3dubG9hZEJnLm5vZGUuYWN0aXZlID0gZGF0YS5pc0FjdGl2ZTtcclxuICAgICAgICAgICAgLy8g6L+b5bqm5p2hXHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ldy5hY3RpdmUgPSBkYXRhLmlzQWN0aXZlO1xyXG4gICAgICAgICAgICAvLyDmmL7npLrkuIvovb3ov5vluqZcclxuICAgICAgICAgICAgbGV0IHNjaGVkdWxlID0gdGhpcy5wcm9jZXNzTmV3LmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEuaXNTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAvLyDng63mm7TmjqXnu61cclxuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZS5zdHJpbmcgPSBcIjAlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1BpYy5maWxsUmFuZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4i+i9veS4rVxyXG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlLnN0cmluZyA9IGAke3BhcnNlSW50KGRhdGEucHJvY2VzcyAqIDEwMCkgfHwgMH0lYDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzUGljLmZpbGxSYW5nZSA9IGRhdGEucHJvY2VzcztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiL6L295YiX6KGo5aSn5LqO5pyA5aSn5ZCM5pe25LiL6L296YeP55qE5pe25YCZ5pi+56S6562J5b6F5LitXHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGUuc3RyaW5nID0gXCLnrYnlvoXkuK1cIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzUGljLmZpbGxSYW5nZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJyb29tRW50cmFuY2VcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwiaG90VUlSZWZyZXNoXCIsIHRoaXMpO1xyXG4gICAgfVxyXG59KTtcclxuIl19
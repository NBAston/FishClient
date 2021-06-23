
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/enterRoom/gameitem_com.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbnRlclJvb21cXGdhbWVpdGVtX2NvbS5qcyJdLCJuYW1lcyI6WyJCR0NPTE9SIiwiQkxVRSIsIk9SQU5HRSIsIkdSRUVOIiwiUkVEIiwiUFVSUExFIiwiQ09STkVSX01BUksiLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiZ2FtZV9pY29uIiwiY2MiLCJOb2RlIiwiZ2FtZV9uYW1lIiwiTGFiZWwiLCJwaWNfZG93bmxvYWRCZyIsIlNwcml0ZSIsInByb2Nlc3NOZXciLCJwcm9ncmVzc1BpYyIsImNvcm5lck1hcmsiLCJhdGxhc19jb3JuZXJfbWFyayIsIlNwcml0ZUF0bGFzIiwiYXRsYXNfZ2FtZV9pY29uIiwib25Mb2FkIiwiZW1pdHRlciIsIm9uIiwicm9vbUVudHJhbmNlIiwiaG90VUlSZWZyZXNoIiwiZ2FtZWlkIiwiZ2FtZUlEIiwiY29uc29sZSIsImxvZyIsIm9uQ2xpY2siLCJpbml0VUkiLCJnYW1lTGlzdCIsImlkIiwiZ2FtZU5hbWUiLCJzY2VuZSIsImdldFNjZW5lTmFtZUJ5SUQiLCJzdHJpbmciLCJ0YWciLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiYWN0aXZlIiwicHJvY2Vzc1N0YXRlIiwibmV3TWF0ZXJpYWwiLCJNYXRlcmlhbCIsImNyZWF0ZVdpdGhCdWlsdGluIiwiQlVJTFRJTl9OQU1FIiwiR1JBWV9TUFJJVEUiLCJzZXRNYXRlcmlhbCIsImljb24iLCJ1cmwiLCJ1c2VyIiwiZ2V0IiwicmVzb3VyY2VfdXJsIiwicGFuZWwiLCJzaG93UmVtb3RlSW1hZ2UiLCJnYW1lSXNIb3RTdGF0dXMiLCJzZXQiLCJrZXkiLCJ2YWx1ZSIsIm5hbWUiLCJnYW1lbGlzdGNmZyIsIm9wZW5UcmlwYXJ0aXRlR2FtZSIsImdhbWVzTGlzdCIsInR5cGUiLCJvbkVudGVyR2FtZSIsInN5cyIsImlzTmF0aXZlIiwiaXNfdXBkYXRlX3F1ZXVlIiwiYXNzZXRzTWFuYWdlciIsImlzQmVpbmdVcGRhdGUiLCJkYXRhIiwiaXNBY3RpdmUiLCJpc1N0YXR1cyIsImlzTmVlZFVwZGF0ZSIsInNjaGVkdWxlIiwiZmlsbFJhbmdlIiwicGFyc2VJbnQiLCJwcm9jZXNzIiwiT25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQSxJQUFNQSxPQUFPLEdBQUc7QUFDWkMsRUFBQUEsSUFBSSxFQUFFLENBRE07QUFFWkMsRUFBQUEsTUFBTSxFQUFFLENBRkk7QUFHWkMsRUFBQUEsS0FBSyxFQUFFLENBSEs7QUFJWkMsRUFBQUEsR0FBRyxFQUFFLENBSk87QUFLWkMsRUFBQUEsTUFBTSxFQUFFO0FBTEksQ0FBaEI7QUFPQSxJQUFNQyxXQUFXLEdBQUc7QUFDaEIsS0FBRyxJQURhO0FBRWhCLEtBQUcsSUFGYTtBQUdoQixLQUFHLElBSGE7QUFJaEIsS0FBRztBQUphLENBQXBCO0FBTUFDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVDLEVBQUUsQ0FBQ0MsSUFETjtBQUVSQyxJQUFBQSxTQUFTLEVBQUVGLEVBQUUsQ0FBQ0csS0FGTjtBQUdSQyxJQUFBQSxjQUFjLEVBQUVKLEVBQUUsQ0FBQ0ssTUFIWDtBQUlSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0MsSUFKUDtBQUtSTSxJQUFBQSxXQUFXLEVBQUVQLEVBQUUsQ0FBQ0ssTUFMUjtBQU1SRyxJQUFBQSxVQUFVLEVBQUVSLEVBQUUsQ0FBQ0ssTUFOUDtBQVFSSSxJQUFBQSxpQkFBaUIsRUFBRVQsRUFBRSxDQUFDVSxXQVJkO0FBU1JDLElBQUFBLGVBQWUsRUFBRVgsRUFBRSxDQUFDVTtBQVRaLEdBRFE7QUFhcEJFLEVBQUFBLE1BYm9CLG9CQWFYO0FBQ0xqQixJQUFBQSxNQUFNLENBQUNrQixPQUFQLENBQWVDLEVBQWYsQ0FBa0IsY0FBbEIsRUFBa0MsS0FBS0MsWUFBdkMsRUFBcUQsSUFBckQ7QUFDQXBCLElBQUFBLE1BQU0sQ0FBQ2tCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixjQUFsQixFQUFrQyxLQUFLRSxZQUF2QyxFQUFxRCxJQUFyRDtBQUNILEdBaEJtQjtBQWtCcEJELEVBQUFBLFlBbEJvQix3QkFrQlBFLE1BbEJPLEVBa0JDO0FBQ2pCLFFBQUlBLE1BQU0sSUFBSSxLQUFLQyxNQUFuQixFQUEyQjtBQUN2QkMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMkJBQVosRUFBeUNILE1BQXpDO0FBQ0EsV0FBS0ksT0FBTDtBQUNIO0FBQ0osR0F2Qm1COztBQXlCcEI7OztBQUdBQyxFQUFBQSxNQTVCb0Isa0JBNEJiQyxRQTVCYSxFQTRCSDtBQUNiLFNBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0wsTUFBTCxHQUFjSyxRQUFRLENBQUNDLEVBQXZCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQjlCLE1BQU0sQ0FBQytCLEtBQVAsQ0FBYUMsZ0JBQWIsQ0FBOEIsS0FBS1QsTUFBbkMsQ0FBaEIsQ0FIYSxDQUtiOztBQUVBLFNBQUtoQixTQUFMLENBQWUwQixNQUFmLEdBQXdCLEtBQUtMLFFBQUwsQ0FBY0UsUUFBdEMsQ0FQYSxDQU9tQztBQUNoRDtBQUNBOztBQUNBLFFBQUksS0FBS0YsUUFBTCxDQUFjTSxHQUFkLEdBQW9CLENBQXhCLEVBQTJCO0FBQUs7QUFDNUIsV0FBS3JCLFVBQUwsQ0FBZ0JzQixXQUFoQixHQUE4QixLQUFLckIsaUJBQUwsQ0FBdUJzQixjQUF2QiwwQkFBd0QsS0FBS1IsUUFBTCxDQUFjTSxHQUF0RSxFQUE5QjtBQUNBLFdBQUtyQixVQUFMLENBQWdCd0IsSUFBaEIsQ0FBcUJDLGNBQXJCLENBQW9DLEtBQXBDLEVBQTJDQyxZQUEzQyxDQUF3RGxDLEVBQUUsQ0FBQ0csS0FBM0QsRUFBa0V5QixNQUFsRSxHQUEyRWxDLFdBQVcsQ0FBQyxLQUFLNkIsUUFBTCxDQUFjTSxHQUFmLENBQXRGO0FBQ0EsV0FBS3JCLFVBQUwsQ0FBZ0J3QixJQUFoQixDQUFxQkcsTUFBckIsR0FBOEIsSUFBOUI7QUFDSDs7QUFFRCxRQUFJLEtBQUtaLFFBQUwsQ0FBY2EsWUFBZCxJQUE4QixDQUFsQyxFQUFxQztBQUNqQyxXQUFLNUIsVUFBTCxDQUFnQnNCLFdBQWhCLEdBQThCLEtBQUtyQixpQkFBTCxDQUF1QnNCLGNBQXZCLENBQXNDLGtCQUF0QyxDQUE5QjtBQUNBLFdBQUt2QixVQUFMLENBQWdCd0IsSUFBaEIsQ0FBcUJDLGNBQXJCLENBQW9DLEtBQXBDLEVBQTJDQyxZQUEzQyxDQUF3RGxDLEVBQUUsQ0FBQ0csS0FBM0QsRUFBa0V5QixNQUFsRSxHQUEyRWxDLFdBQVcsQ0FBQyxDQUFELENBQXRGO0FBQ0EsV0FBS2MsVUFBTCxDQUFnQndCLElBQWhCLENBQXFCRyxNQUFyQixHQUE4QixJQUE5QjtBQUNBLFVBQUlFLFdBQVcsR0FBR3JDLEVBQUUsQ0FBQ3NDLFFBQUgsQ0FBWUMsaUJBQVosQ0FBOEJ2QyxFQUFFLENBQUNzQyxRQUFILENBQVlFLFlBQVosQ0FBeUJDLFdBQXZELEVBQW9FLENBQXBFLENBQWxCO0FBQ0EsV0FBSzFDLFNBQUwsQ0FBZW1DLFlBQWYsQ0FBNEJsQyxFQUFFLENBQUNLLE1BQS9CLEVBQXVDcUMsV0FBdkMsQ0FBbUQsQ0FBbkQsRUFBc0RMLFdBQXRELEVBTGlDLENBS21DO0FBQ3ZFLEtBdEJZLENBd0JiOzs7QUFDQSxRQUFJLEtBQUtuQixNQUFMLEdBQWMsS0FBbEIsRUFBeUI7QUFDckIsV0FBS25CLFNBQUwsQ0FBZW1DLFlBQWYsQ0FBNEJsQyxFQUFFLENBQUNLLE1BQS9CLEVBQXVDeUIsV0FBdkMsR0FBcUQsS0FBS25CLGVBQUwsQ0FBcUJvQixjQUFyQixnQkFBNEMsS0FBS2IsTUFBakQsRUFBckQ7QUFDSCxLQUZELE1BRU87QUFDSCxVQUFJLEtBQUtLLFFBQUwsQ0FBY29CLElBQWxCLEVBQXdCO0FBQ3BCLFlBQUlDLEdBQUcsR0FBR2pELE1BQU0sQ0FBQ2tELElBQVAsQ0FBWUMsR0FBWixDQUFnQixLQUFoQixFQUF1QkMsWUFBakM7QUFDQXBELFFBQUFBLE1BQU0sQ0FBQ3FELEtBQVAsQ0FBYUMsZUFBYixDQUE2QixLQUFLbEQsU0FBbEMsRUFBNkM2QyxHQUFHLEdBQUcsS0FBS3JCLFFBQUwsQ0FBY29CLElBQWpFO0FBQ0g7QUFDSjs7QUFFRCxRQUFJLEtBQUt6QixNQUFMLEdBQWMsS0FBbEIsRUFBeUI7QUFDckIsV0FBS2dDLGVBQUw7QUFDSDtBQUNKLEdBakVtQjtBQW1FcEJDLEVBQUFBLEdBbkVvQixlQW1FaEJDLEdBbkVnQixFQW1FWEMsS0FuRVcsRUFtRUo7QUFDWixTQUFLRCxHQUFMLElBQVlDLEtBQVo7QUFDSCxHQXJFbUI7QUF1RXBCO0FBQ0FoQyxFQUFBQSxPQXhFb0IsbUJBd0VaaUMsSUF4RVksRUF3RU50QixJQXhFTSxFQXdFQTtBQUNoQmIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWixFQUFxQixLQUFLRixNQUExQixFQURnQixDQUVoQjs7QUFDQSxRQUFJLEtBQUtBLE1BQUwsR0FBYyxJQUFsQixFQUF3QjtBQUNwQjtBQUNBdkIsTUFBQUEsTUFBTSxDQUFDNEQsV0FBUCxDQUFtQkMsa0JBQW5CLENBQXNDO0FBQUVDLFFBQUFBLFNBQVMsRUFBRSxLQUFLbEMsUUFBbEI7QUFBNEJtQyxRQUFBQSxJQUFJLEVBQUU7QUFBbEMsT0FBdEM7QUFDQTtBQUNILEtBUGUsQ0FTaEI7OztBQUNBL0QsSUFBQUEsTUFBTSxDQUFDNEQsV0FBUCxDQUFtQkksV0FBbkIsQ0FBK0IsS0FBS3pDLE1BQXBDLEVBQTRDLEtBQTVDLEVBVmdCLENBWWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEdBN0ZtQjtBQStGcEI7QUFDQWdDLEVBQUFBLGVBaEdvQiw2QkFnR0Y7QUFDZCxRQUFJLENBQUNsRCxFQUFFLENBQUM0RCxHQUFILENBQU9DLFFBQVosRUFBc0IsT0FEUixDQUVkOztBQUNBLFFBQUlDLGVBQWUsR0FBR25FLE1BQU0sQ0FBQ29FLGFBQVAsQ0FBcUJDLGFBQXJCLENBQW1DLEtBQUt2QyxRQUF4QyxDQUF0Qjs7QUFDQSxRQUFJcUMsZUFBZSxJQUFJLElBQXZCLEVBQTZCO0FBQ3pCLFVBQUlHLElBQUksR0FBRztBQUFDeEMsUUFBQUEsUUFBUSxFQUFDLEtBQUtBLFFBQWY7QUFBeUJ5QyxRQUFBQSxRQUFRLEVBQUM7QUFBbEMsT0FBWDs7QUFDQSxVQUFJSixlQUFKLEVBQXFCO0FBQ2pCRyxRQUFBQSxJQUFJLENBQUNFLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDSDs7QUFDRCxXQUFLbkQsWUFBTCxDQUFrQmlELElBQWxCO0FBQ0gsS0FORCxNQU1PO0FBQ0g7QUFDQXRFLE1BQUFBLE1BQU0sQ0FBQ29FLGFBQVAsQ0FBcUJLLFlBQXJCLENBQWtDLEtBQUszQyxRQUF2QztBQUNIO0FBQ0osR0E5R21CO0FBZ0hwQjtBQUNBVCxFQUFBQSxZQWpIb0Isd0JBaUhQaUQsSUFqSE8sRUFpSEQ7QUFDZixRQUFJQSxJQUFJLENBQUN4QyxRQUFMLElBQWlCLEtBQUtBLFFBQTFCLEVBQW9DO0FBQ2hDO0FBQ0EsV0FBS3JCLGNBQUwsQ0FBb0I0QixJQUFwQixDQUF5QkcsTUFBekIsR0FBa0M4QixJQUFJLENBQUNDLFFBQXZDLENBRmdDLENBR2hDOztBQUNBLFdBQUs1RCxVQUFMLENBQWdCNkIsTUFBaEIsR0FBeUI4QixJQUFJLENBQUNDLFFBQTlCLENBSmdDLENBS2hDOztBQUNBLFVBQUlHLFFBQVEsR0FBRyxLQUFLL0QsVUFBTCxDQUFnQjJCLGNBQWhCLENBQStCLE9BQS9CLEVBQXdDQyxZQUF4QyxDQUFxRGxDLEVBQUUsQ0FBQ0csS0FBeEQsQ0FBZjs7QUFDQSxjQUFROEQsSUFBSSxDQUFDRSxRQUFiO0FBQ0ksYUFBSyxDQUFMO0FBQ0k7QUFDQUUsVUFBQUEsUUFBUSxDQUFDekMsTUFBVCxHQUFrQixJQUFsQjtBQUNBLGVBQUtyQixXQUFMLENBQWlCK0QsU0FBakIsR0FBNkIsQ0FBN0I7QUFDQTs7QUFDSixhQUFLLENBQUw7QUFDSTtBQUNBRCxVQUFBQSxRQUFRLENBQUN6QyxNQUFULGFBQXFCMkMsUUFBUSxDQUFDTixJQUFJLENBQUNPLE9BQUwsR0FBZSxHQUFoQixDQUFSLElBQWdDLENBQXJEO0FBQ0EsZUFBS2pFLFdBQUwsQ0FBaUIrRCxTQUFqQixHQUE2QkwsSUFBSSxDQUFDTyxPQUFsQztBQUNBOztBQUNKO0FBQ0k7QUFDQUgsVUFBQUEsUUFBUSxDQUFDekMsTUFBVCxHQUFrQixLQUFsQjtBQUNBLGVBQUtyQixXQUFMLENBQWlCK0QsU0FBakIsR0FBNkIsQ0FBN0I7QUFDQTtBQWZSO0FBaUJIO0FBQ0osR0EzSW1CO0FBNklwQkcsRUFBQUEsU0E3SW9CLHVCQTZJUjtBQUNSOUUsSUFBQUEsTUFBTSxDQUFDa0IsT0FBUCxDQUFlNkQsR0FBZixDQUFtQixjQUFuQixFQUFtQyxJQUFuQztBQUNBL0UsSUFBQUEsTUFBTSxDQUFDa0IsT0FBUCxDQUFlNkQsR0FBZixDQUFtQixjQUFuQixFQUFtQyxJQUFuQztBQUNIO0FBaEptQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWkp+WOheWtkOa4uOaIj+Wbvuagh+mAmueUqOiEmuacrFxyXG4gKi9cclxuY29uc3QgQkdDT0xPUiA9IHtcclxuICAgIEJMVUU6IDAsXHJcbiAgICBPUkFOR0U6IDEsXHJcbiAgICBHUkVFTjogMixcclxuICAgIFJFRDogMyxcclxuICAgIFBVUlBMRTogNCxcclxufVxyXG5jb25zdCBDT1JORVJfTUFSSyA9IHtcclxuICAgIDA6IFwi57u05oqkXCIsXHJcbiAgICAxOiBcIuaOqOiNkFwiLFxyXG4gICAgMjogXCLngavniIZcIixcclxuICAgIDM6IFwi5pyA5pawXCIsXHJcbn1cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdhbWVfaWNvbjogY2MuTm9kZSxcclxuICAgICAgICBnYW1lX25hbWU6IGNjLkxhYmVsLFxyXG4gICAgICAgIHBpY19kb3dubG9hZEJnOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgcHJvY2Vzc05ldzogY2MuTm9kZSxcclxuICAgICAgICBwcm9ncmVzc1BpYzogY2MuU3ByaXRlLFxyXG4gICAgICAgIGNvcm5lck1hcms6IGNjLlNwcml0ZSxcclxuXHJcbiAgICAgICAgYXRsYXNfY29ybmVyX21hcms6IGNjLlNwcml0ZUF0bGFzLFxyXG4gICAgICAgIGF0bGFzX2dhbWVfaWNvbjogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInJvb21FbnRyYW5jZVwiLCB0aGlzLnJvb21FbnRyYW5jZSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJob3RVSVJlZnJlc2hcIiwgdGhpcy5ob3RVSVJlZnJlc2gsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICByb29tRW50cmFuY2UoZ2FtZWlkKSB7XHJcbiAgICAgICAgaWYgKGdhbWVpZCA9PSB0aGlzLmdhbWVJRCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVpdGVtX2NvbSAsIOi/m+WFpea4uOaIj+ebkeWQrD09PeOAi1wiLCBnYW1laWQpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Zu+5qCH54q25oCBXHJcbiAgICAgKi9cclxuICAgIGluaXRVSShnYW1lTGlzdCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUxpc3QgPSBnYW1lTGlzdDtcclxuICAgICAgICB0aGlzLmdhbWVJRCA9IGdhbWVMaXN0LmlkO1xyXG4gICAgICAgIHRoaXMuZ2FtZU5hbWUgPSBnbEdhbWUuc2NlbmUuZ2V0U2NlbmVOYW1lQnlJRCh0aGlzLmdhbWVJRCk7XHJcblxyXG4gICAgICAgIC8vIGlmICghdGhpcy5nYW1lTmFtZSkgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Li05pe25o6q5pa977yMUEhQ5bey57uZ5ri45oiP77yM5a6i5oi356uv6L+Y5pyq5a6M5oiQXHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZV9uYW1lLnN0cmluZyA9IHRoaXMuZ2FtZUxpc3QuZ2FtZU5hbWU7IC8vIOiuvue9rua4uOaIj+WQjeensFxyXG4gICAgICAgIC8vIHRoaXMuZ2FtZV9uYW1lLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMuZ2FtZV9uYW1lIDIyMjIgPT09PiBcIiwgdGhpcy5nYW1lX25hbWUubm9kZSwgdGhpcy5nYW1lX25hbWUubm9kZS53aWR0aCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUxpc3QudGFnID4gMCkgeyAgICAvL+iuvue9ruinkuagh1xyXG4gICAgICAgICAgICB0aGlzLmNvcm5lck1hcmsuc3ByaXRlRnJhbWUgPSB0aGlzLmF0bGFzX2Nvcm5lcl9tYXJrLmdldFNwcml0ZUZyYW1lKGBpbWdfY29ybmVyX21hcmske3RoaXMuZ2FtZUxpc3QudGFnfWApO1xyXG4gICAgICAgICAgICB0aGlzLmNvcm5lck1hcmsubm9kZS5nZXRDaGlsZEJ5TmFtZShcInR4dFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IENPUk5FUl9NQVJLW3RoaXMuZ2FtZUxpc3QudGFnXTtcclxuICAgICAgICAgICAgdGhpcy5jb3JuZXJNYXJrLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVMaXN0LnByb2Nlc3NTdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ybmVyTWFyay5zcHJpdGVGcmFtZSA9IHRoaXMuYXRsYXNfY29ybmVyX21hcmsuZ2V0U3ByaXRlRnJhbWUoXCJpbWdfY29ybmVyX21hcmswXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcm5lck1hcmsubm9kZS5nZXRDaGlsZEJ5TmFtZShcInR4dFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IENPUk5FUl9NQVJLWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmNvcm5lck1hcmsubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbmV3TWF0ZXJpYWwgPSBjYy5NYXRlcmlhbC5jcmVhdGVXaXRoQnVpbHRpbihjYy5NYXRlcmlhbC5CVUlMVElOX05BTUUuR1JBWV9TUFJJVEUsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBuZXdNYXRlcmlhbCk7IC8v57uZ57K+54G15re75Yqg5paw5p2Q6LSoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOWKoOi9vea4uOaIj+WbvueJh1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVJRCA8IDEwMDAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9pY29uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hdGxhc19nYW1lX2ljb24uZ2V0U3ByaXRlRnJhbWUoYGljb25fJHt0aGlzLmdhbWVJRH1gKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lTGlzdC5pY29uKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gZ2xHYW1lLnVzZXIuZ2V0KCd1cmwnKS5yZXNvdXJjZV91cmw7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlbW90ZUltYWdlKHRoaXMuZ2FtZV9pY29uLCB1cmwgKyB0aGlzLmdhbWVMaXN0Lmljb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5nYW1lSUQgPCAxMDAwMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJc0hvdFN0YXR1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8vIOaMiemSrueCueWHu+S6i+S7tlxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLngrnlh7vkuobmuLjmiI9cIiwgdGhpcy5nYW1lSUQpO1xyXG4gICAgICAgIC8vIOaJk+W8gOS4ieaWuea4uOaIj1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVJRCA+IDk5OTkpIHtcclxuICAgICAgICAgICAgLy8gaWYgKCFpc0VuYWJsZUhvdFVwZGF0ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZWxpc3RjZmcub3BlblRyaXBhcnRpdGVHYW1lKHsgZ2FtZXNMaXN0OiB0aGlzLmdhbWVMaXN0LCB0eXBlOiAxIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDmiZPlvIDoh6rlt7HmuLjmiI9cclxuICAgICAgICBnbEdhbWUuZ2FtZWxpc3RjZmcub25FbnRlckdhbWUodGhpcy5nYW1lSUQsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gLy8g5p+l5om+5piv5ZCm6ZyA6KaB5pu05pawXHJcbiAgICAgICAgLy8gZ2xHYW1lLmdhbWVsaXN0Y2ZnLmlzTmVlZFVwZGF0ZSh0aGlzLmdhbWVJRCkudGhlbihib2wgPT4ge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+i/m+WFpea4uOaIj1wiLCBib2wpO1xyXG4gICAgICAgIC8vICAgICAvLyDpnIDopoHmm7TmlrBcclxuICAgICAgICAvLyAgICAgaWYgKGJvbCkgZ2xHYW1lLmdhbWVsaXN0Y2ZnLnNldEdhbWVVcGRhdGUodGhpcy5nYW1lTmFtZSwgZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuaJk+W8gOiHquW3sea4uOaIjz09PT09PlwiKVxyXG4gICAgICAgIC8vICAgICAvLyDmiZPlvIDoh6rlt7HmuLjmiI9cclxuICAgICAgICAvLyAgICAgZ2xHYW1lLmdhbWVsaXN0Y2ZnLm9uRW50ZXJHYW1lKHRoaXMuZ2FtZUlEKTtcclxuICAgICAgICAvLyB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Yik5pat5ri45oiP5piv5ZCm5Zyo54Ot5pu0XHJcbiAgICBnYW1lSXNIb3RTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHJldHVybjtcclxuICAgICAgICAvLyDmo4Dmn6XlvZPliY3mmK/lkKbmnInmuLjmiI/mraPlnKjot5/mlrBcclxuICAgICAgICBsZXQgaXNfdXBkYXRlX3F1ZXVlID0gZ2xHYW1lLmFzc2V0c01hbmFnZXIuaXNCZWluZ1VwZGF0ZSh0aGlzLmdhbWVOYW1lKTtcclxuICAgICAgICBpZiAoaXNfdXBkYXRlX3F1ZXVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB7Z2FtZU5hbWU6dGhpcy5nYW1lTmFtZSwgaXNBY3RpdmU6dHJ1ZX1cclxuICAgICAgICAgICAgaWYgKGlzX3VwZGF0ZV9xdWV1ZSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5pc1N0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ob3RVSVJlZnJlc2goZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5p+l5om+5piv5ZCm6ZyA6KaB5pu05pawXHJcbiAgICAgICAgICAgIGdsR2FtZS5hc3NldHNNYW5hZ2VyLmlzTmVlZFVwZGF0ZSh0aGlzLmdhbWVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOeDreabtOWIt+aWsFVJXHJcbiAgICBob3RVSVJlZnJlc2goZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhLmdhbWVOYW1lID09IHRoaXMuZ2FtZU5hbWUpIHtcclxuICAgICAgICAgICAgLy8g6buR6Imy6YGu572pXHJcbiAgICAgICAgICAgIHRoaXMucGljX2Rvd25sb2FkQmcubm9kZS5hY3RpdmUgPSBkYXRhLmlzQWN0aXZlO1xyXG4gICAgICAgICAgICAvLyDov5vluqbmnaFcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3LmFjdGl2ZSA9IGRhdGEuaXNBY3RpdmU7XHJcbiAgICAgICAgICAgIC8vIOaYvuekuuS4i+i9vei/m+W6plxyXG4gICAgICAgICAgICBsZXQgc2NoZWR1bGUgPSB0aGlzLnByb2Nlc3NOZXcuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5pc1N0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOeDreabtOaOpee7rVxyXG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlLnN0cmluZyA9IFwiMCVcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzUGljLmZpbGxSYW5nZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiL6L295LitXHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGUuc3RyaW5nID0gYCR7cGFyc2VJbnQoZGF0YS5wcm9jZXNzICogMTAwKSB8fCAwfSVgO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NQaWMuZmlsbFJhbmdlID0gZGF0YS5wcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIvovb3liJfooajlpKfkuo7mnIDlpKflkIzml7bkuIvovb3ph4/nmoTml7blgJnmmL7npLrnrYnlvoXkuK1cclxuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZS5zdHJpbmcgPSBcIuetieW+heS4rVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NQaWMuZmlsbFJhbmdlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInJvb21FbnRyYW5jZVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJob3RVSVJlZnJlc2hcIiwgdGhpcyk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=
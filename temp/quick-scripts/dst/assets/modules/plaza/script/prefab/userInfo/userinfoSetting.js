
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/userinfoSetting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '148b1ixsVdBO7A+1dZIYnlb', 'userinfoSetting');
// modules/plaza/script/prefab/userInfo/userinfoSetting.js

"use strict";

/**
 * 设置面板
 */
glGame.baseclass.extend({
  properties: {
    BGM: cc.Toggle,
    SE: cc.Toggle,
    content: cc.Node,
    item: cc.Node
  },
  onLoad: function onLoad() {
    this.page = 1;
    this.size = 10;
    this.totalPage = 0;
    this.musicList = glGame.audio.musicList;
    var data = glGame.storage.getItem("bgName") || {
      audio: this.musicList[0]
    };
    this.selectAudio = data.audio;
    this.selectItem = null;
    this.showPanelInfo();
    this.initBgMusic();
    this.registerEvent();
  },
  registerEvent: function registerEvent() {
    this.BGM.node.on("toggle", this.click_music, this);
    this.SE.node.on("toggle", this.click_effect, this);
  },
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  showPanelInfo: function showPanelInfo() {
    // 根据本地缓存的声音数据来更新按钮状态
    var BGMSE = glGame.audio.get("BGMSE");
    this.BGM.isChecked = BGMSE["BGMPlayState"];
    this.BGM.node.getChildByName("music").active = !BGMSE["BGMPlayState"];
    this.SE.isChecked = BGMSE["SoundEffectPlayState"];
    this.SE.node.getChildByName("effect").active = !BGMSE["SoundEffectPlayState"];
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_changepsw":
        this.changepsw_cb();
        break;

      case "btn_exit":
        this.switchacc_cb();
        break;

      default:
        if (name.indexOf("item") > -1) return this.click_itemAudio(name);
        break;
    }
  },
  click_music: function click_music(event) {
    var node = event.target;
    var isChecked = event.isChecked;
    node.active = !isChecked;
    if (isChecked) glGame.audio.openBGM();else glGame.audio.closeBGM();
  },
  click_effect: function click_effect(event) {
    var node = event.target;
    var isChecked = event.isChecked;
    node.active = !isChecked;
    if (isChecked) glGame.audio.openSE();else glGame.audio.closeSE();
  },
  click_switchacc: function click_switchacc() {
    glGame.logon.logout();
    glGame.storage.removeItemByKey("loginCache");
  },
  //修改密码
  changepsw_cb: function changepsw_cb() {
    if (glGame.user.get("loginSwitch").self_edit_login_pwd == 1) {
      glGame.panel.showPanelByName("modifypsw");
    } else {
      glGame.panel.showServiceBox(glGame.tips.USER.PASSWORD.SERVICE);
    }
  },
  //设置
  switchacc_cb: function switchacc_cb() {
    //退出登录清楚缓存是记录密码
    glGame.panel.showPanelByName("exitAcc");
  },

  /*
  {
    "total": 3,
    "totalPage": 1,
    "data": [
      {
        "id": 1,
        "name": "爱你斯柯达",
        "url": "http://192.168.3.101:10005/music/askdjsal.mp3",
        "downloads": 999,
        "isDefault": 1,
        "isDefaultDes": "默认"
      },
      ......
    ],
    "page": 1,
    "pageSize": 10
  }
  */
  ReqBackgroundMusic: function ReqBackgroundMusic() {
    var _this = this;

    glGame.gameNet.send_msg('http.ReqBackgroundMusic', {
      page: page,
      pageSize: pageSize
    }, function (route, msg) {
      _this.addBgMusic();
    });
  },
  initBgMusic: function initBgMusic() {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    var count = this.musicList.length;

    for (var i = 0; i < count; i++) {
      var item = cc.instantiate(this.item);
      item.active = true;
      item.name = "item_".concat(i);
      item.getChildByName("name").getComponent(cc.Label).string = this.musicList[i];

      if (this.musicList[i] == this.selectAudio) {
        this.setTaggle(item, true);
        this.selectItem = item;
      }

      item.parent = this.content;
    }
  },
  addBgMusic: function addBgMusic() {},
  setTaggle: function setTaggle(item, bol) {
    item.getChildByName("Toggle").getChildByName("checkmark").active = bol;
  },
  click_itemAudio: function click_itemAudio(name) {
    if (this.selectItem) this.setTaggle(this.selectItem, false);
    var index = Number(name.substring(5));
    this.selectItem = this.content.children[index];
    this.setTaggle(this.selectItem, true);
    glGame.storage.setItem("bgName", {
      audio: this.musicList[index]
    });
    glGame.audio.playPathBGM();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xcdXNlcmluZm9TZXR0aW5nLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJCR00iLCJjYyIsIlRvZ2dsZSIsIlNFIiwiY29udGVudCIsIk5vZGUiLCJpdGVtIiwib25Mb2FkIiwicGFnZSIsInNpemUiLCJ0b3RhbFBhZ2UiLCJtdXNpY0xpc3QiLCJhdWRpbyIsImRhdGEiLCJzdG9yYWdlIiwiZ2V0SXRlbSIsInNlbGVjdEF1ZGlvIiwic2VsZWN0SXRlbSIsInNob3dQYW5lbEluZm8iLCJpbml0QmdNdXNpYyIsInJlZ2lzdGVyRXZlbnQiLCJub2RlIiwib24iLCJjbGlja19tdXNpYyIsImNsaWNrX2VmZmVjdCIsInVuUmVnaXN0ZXJFdmVudCIsIk9uRGVzdHJveSIsIkJHTVNFIiwiZ2V0IiwiaXNDaGVja2VkIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJvbkNsaWNrIiwibmFtZSIsImNoYW5nZXBzd19jYiIsInN3aXRjaGFjY19jYiIsImluZGV4T2YiLCJjbGlja19pdGVtQXVkaW8iLCJldmVudCIsInRhcmdldCIsIm9wZW5CR00iLCJjbG9zZUJHTSIsIm9wZW5TRSIsImNsb3NlU0UiLCJjbGlja19zd2l0Y2hhY2MiLCJsb2dvbiIsImxvZ291dCIsInJlbW92ZUl0ZW1CeUtleSIsInVzZXIiLCJzZWxmX2VkaXRfbG9naW5fcHdkIiwicGFuZWwiLCJzaG93UGFuZWxCeU5hbWUiLCJzaG93U2VydmljZUJveCIsInRpcHMiLCJVU0VSIiwiUEFTU1dPUkQiLCJTRVJWSUNFIiwiUmVxQmFja2dyb3VuZE11c2ljIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicGFnZVNpemUiLCJyb3V0ZSIsIm1zZyIsImFkZEJnTXVzaWMiLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsImNvdW50IiwibGVuZ3RoIiwiaSIsImluc3RhbnRpYXRlIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJzZXRUYWdnbGUiLCJwYXJlbnQiLCJib2wiLCJpbmRleCIsIk51bWJlciIsInN1YnN0cmluZyIsImNoaWxkcmVuIiwic2V0SXRlbSIsInBsYXlQYXRoQkdNIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEdBQUcsRUFBRUMsRUFBRSxDQUFDQyxNQURBO0FBRVJDLElBQUFBLEVBQUUsRUFBRUYsRUFBRSxDQUFDQyxNQUZDO0FBSVJFLElBQUFBLE9BQU8sRUFBRUgsRUFBRSxDQUFDSSxJQUpKO0FBS1JDLElBQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDSTtBQUxELEdBRFE7QUFRcEJFLEVBQUFBLE1BUm9CLG9CQVFYO0FBQ0wsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCZixNQUFNLENBQUNnQixLQUFQLENBQWFELFNBQTlCO0FBQ0EsUUFBSUUsSUFBSSxHQUFHakIsTUFBTSxDQUFDa0IsT0FBUCxDQUFlQyxPQUFmLENBQXVCLFFBQXZCLEtBQW9DO0FBQUVILE1BQUFBLEtBQUssRUFBRSxLQUFLRCxTQUFMLENBQWUsQ0FBZjtBQUFULEtBQS9DO0FBQ0EsU0FBS0ssV0FBTCxHQUFtQkgsSUFBSSxDQUFDRCxLQUF4QjtBQUNBLFNBQUtLLFVBQUwsR0FBa0IsSUFBbEI7QUFFQSxTQUFLQyxhQUFMO0FBQ0EsU0FBS0MsV0FBTDtBQUNBLFNBQUtDLGFBQUw7QUFDSCxHQXBCbUI7QUFxQnBCQSxFQUFBQSxhQXJCb0IsMkJBcUJKO0FBQ1osU0FBS3BCLEdBQUwsQ0FBU3FCLElBQVQsQ0FBY0MsRUFBZCxDQUFpQixRQUFqQixFQUEy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QUFNLENBQUNnQixLQUFQLENBQWFxRSxXQUFiO0FBQ0g7QUE5SW1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6K6+572u6Z2i5p2/XHJcbiAqL1xyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQkdNOiBjYy5Ub2dnbGUsXHJcbiAgICAgICAgU0U6IGNjLlRvZ2dsZSxcclxuXHJcbiAgICAgICAgY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBpdGVtOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IDEwO1xyXG4gICAgICAgIHRoaXMudG90YWxQYWdlID0gMDtcclxuICAgICAgICB0aGlzLm11c2ljTGlzdCA9IGdsR2FtZS5hdWRpby5tdXNpY0xpc3Q7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBnbEdhbWUuc3RvcmFnZS5nZXRJdGVtKFwiYmdOYW1lXCIpIHx8IHsgYXVkaW86IHRoaXMubXVzaWNMaXN0WzBdIH07XHJcbiAgICAgICAgdGhpcy5zZWxlY3RBdWRpbyA9IGRhdGEuYXVkaW87XHJcbiAgICAgICAgdGhpcy5zZWxlY3RJdGVtID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zaG93UGFuZWxJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QmdNdXNpYygpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5CR00ubm9kZS5vbihcInRvZ2dsZVwiLCB0aGlzLmNsaWNrX211c2ljLCB0aGlzKTtcclxuICAgICAgICB0aGlzLlNFLm5vZGUub24oXCJ0b2dnbGVcIiwgdGhpcy5jbGlja19lZmZlY3QsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICBzaG93UGFuZWxJbmZvKCkge1xyXG4gICAgICAgIC8vIOagueaNruacrOWcsOe8k+WtmOeahOWjsOmfs+aVsOaNruadpeabtOaWsOaMiemSrueKtuaAgVxyXG4gICAgICAgIGxldCBCR01TRSA9IGdsR2FtZS5hdWRpby5nZXQoXCJCR01TRVwiKTtcclxuICAgICAgICB0aGlzLkJHTS5pc0NoZWNrZWQgPSBCR01TRVtcIkJHTVBsYXlTdGF0ZVwiXTtcclxuICAgICAgICB0aGlzLkJHTS5ub2RlLmdldENoaWxkQnlOYW1lKFwibXVzaWNcIikuYWN0aXZlID0gIUJHTVNFW1wiQkdNUGxheVN0YXRlXCJdO1xyXG4gICAgICAgIHRoaXMuU0UuaXNDaGVja2VkID0gQkdNU0VbXCJTb3VuZEVmZmVjdFBsYXlTdGF0ZVwiXTtcclxuICAgICAgICB0aGlzLlNFLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3RcIikuYWN0aXZlID0gIUJHTVNFW1wiU291bmRFZmZlY3RQbGF5U3RhdGVcIl07XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2NoYW5nZXBzd1wiOiB0aGlzLmNoYW5nZXBzd19jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9leGl0XCI6IHRoaXMuc3dpdGNoYWNjX2NiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZihcIml0ZW1cIikgPiAtMSkgcmV0dXJuIHRoaXMuY2xpY2tfaXRlbUF1ZGlvKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19tdXNpYyhldmVudCkge1xyXG4gICAgICAgIGxldCBub2RlID0gZXZlbnQudGFyZ2V0XHJcbiAgICAgICAgbGV0IGlzQ2hlY2tlZCA9IGV2ZW50LmlzQ2hlY2tlZDtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9ICFpc0NoZWNrZWQ7XHJcbiAgICAgICAgaWYgKGlzQ2hlY2tlZCkgZ2xHYW1lLmF1ZGlvLm9wZW5CR00oKTtcclxuICAgICAgICBlbHNlIGdsR2FtZS5hdWRpby5jbG9zZUJHTSgpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2VmZmVjdChldmVudCkge1xyXG4gICAgICAgIGxldCBub2RlID0gZXZlbnQudGFyZ2V0XHJcbiAgICAgICAgbGV0IGlzQ2hlY2tlZCA9IGV2ZW50LmlzQ2hlY2tlZDtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9ICFpc0NoZWNrZWQ7XHJcbiAgICAgICAgaWYgKGlzQ2hlY2tlZCkgZ2xHYW1lLmF1ZGlvLm9wZW5TRSgpO1xyXG4gICAgICAgIGVsc2UgZ2xHYW1lLmF1ZGlvLmNsb3NlU0UoKTtcclxuICAgIH0sXHJcbiAgICBjbGlja19zd2l0Y2hhY2MoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmxvZ29uLmxvZ291dCgpO1xyXG4gICAgICAgIGdsR2FtZS5zdG9yYWdlLnJlbW92ZUl0ZW1CeUtleShcImxvZ2luQ2FjaGVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5L+u5pS55a+G56CBXHJcbiAgICBjaGFuZ2Vwc3dfY2IoKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmdldChcImxvZ2luU3dpdGNoXCIpLnNlbGZfZWRpdF9sb2dpbl9wd2QgPT0gMSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwibW9kaWZ5cHN3XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2VydmljZUJveChnbEdhbWUudGlwcy5VU0VSLlBBU1NXT1JELlNFUlZJQ0UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iuvue9rlxyXG4gICAgc3dpdGNoYWNjX2NiKCkge1xyXG4gICAgICAgIC8v6YCA5Ye655m75b2V5riF5qWa57yT5a2Y5piv6K6w5b2V5a+G56CBXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcImV4aXRBY2NcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICB7XHJcbiAgICAgIFwidG90YWxcIjogMyxcclxuICAgICAgXCJ0b3RhbFBhZ2VcIjogMSxcclxuICAgICAgXCJkYXRhXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImlkXCI6IDEsXHJcbiAgICAgICAgICBcIm5hbWVcIjogXCLniLHkvaDmlq/mn6/ovr5cIixcclxuICAgICAgICAgIFwidXJsXCI6IFwiaHR0cDovLzE5Mi4xNjguMy4xMDE6MTAwMDUvbXVzaWMvYXNrZGpzYWwubXAzXCIsXHJcbiAgICAgICAgICBcImRvd25sb2Fkc1wiOiA5OTksXHJcbiAgICAgICAgICBcImlzRGVmYXVsdFwiOiAxLFxyXG4gICAgICAgICAgXCJpc0RlZmF1bHREZXNcIjogXCLpu5jorqRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLi4uLi4uXHJcbiAgICAgIF0sXHJcbiAgICAgIFwicGFnZVwiOiAxLFxyXG4gICAgICBcInBhZ2VTaXplXCI6IDEwXHJcbiAgICB9XHJcbiAgICAqL1xyXG5cclxuICAgIFJlcUJhY2tncm91bmRNdXNpYygpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFCYWNrZ3JvdW5kTXVzaWMnLCB7IHBhZ2UsIHBhZ2VTaXplIH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEJnTXVzaWMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluaXRCZ011c2ljKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgY291bnQgPSB0aGlzLm11c2ljTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBgaXRlbV8ke2l9YDtcclxuICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLm11c2ljTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXVzaWNMaXN0W2ldID09IHRoaXMuc2VsZWN0QXVkaW8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGFnZ2xlKGl0ZW0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhZGRCZ011c2ljKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0VGFnZ2xlKGl0ZW0sIGJvbCkge1xyXG4gICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJUb2dnbGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja21hcmtcIikuYWN0aXZlID0gYm9sO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19pdGVtQXVkaW8obmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdEl0ZW0pIHRoaXMuc2V0VGFnZ2xlKHRoaXMuc2VsZWN0SXRlbSwgZmFsc2UpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IE51bWJlcihuYW1lLnN1YnN0cmluZyg1KSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RJdGVtID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2luZGV4XTtcclxuICAgICAgICB0aGlzLnNldFRhZ2dsZSh0aGlzLnNlbGVjdEl0ZW0sIHRydWUpO1xyXG4gICAgICAgIGdsR2FtZS5zdG9yYWdlLnNldEl0ZW0oXCJiZ05hbWVcIiwgeyBhdWRpbzogdGhpcy5tdXNpY0xpc3RbaW5kZXhdIH0pO1xyXG4gICAgICAgIGdsR2FtZS5hdWRpby5wbGF5UGF0aEJHTSgpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
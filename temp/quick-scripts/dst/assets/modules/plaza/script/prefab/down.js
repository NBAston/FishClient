
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/down.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb73ee59rVJGbO+daPZZB4c', 'down');
// modules/plaza/script/prefab/down.js

"use strict";

glGame.baseclass.extend({
  properties: {
    btnLayout: cc.Node,
    //按钮父节点排序之用
    btn_popu: cc.Node,
    //推广按钮
    btn_acctivit: cc.Node,
    //活动按钮
    //btn_yuebao: cc.Node,//余额宝按钮
    btn_backWater: cc.Node,
    //返水按钮
    btn_email: cc.Node,
    //邮件按钮
    btn_task: cc.Node,
    //任务按钮
    btn_withdraw: cc.Node,
    //提现按钮
    btn_shop: cc.Node,
    //充值按钮
    btn_rank: cc.Node
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.initUI();
    this.reqRedDot();
  },
  initUI: function initUI() {
    this.btn_task.active = glGame.user.missionSwitch == 1;
    this.btn_backWater.active = glGame.user.rebateSwitch == 1;
    console.log("这是当前的开关", glGame.user.missionSwitch, glGame.user.rebateSwitch);
    var count = 0;

    for (var i = 1; i < this.btnLayout.childrenCount; i++) {
      if (this.btnLayout.children[i].active) {
        count++;
      }
    } //根据当前窗口大小调整按钮大小从而调整间距


    var windowsWidth = (cc.winSize.width - this.btn_shop.width - this.btn_popu.width) / count;

    for (var _i = 1; _i < this.btnLayout.childrenCount; _i++) {
      this.btnLayout.children[_i].width = windowsWidth;
    }
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on(MESSAGE.UI.SCENE, this.initUI, this);
    glGame.emitter.on("ReqRedDot", this.reqRedDot, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off(MESSAGE.UI.SCENE, this);
    glGame.emitter.off("ReqRedDot", this);
  },
  //刷新按钮上的红点
  reqRedDot: function reqRedDot(data) {
    if (!data) data = glGame.user.get('redDotData');
    var count = 0;

    for (var i in data) {
      count++;
    }

    ;
    if (count == 0) return;
    this.btn_email.getChildByName("redMark").active = data['mailReq'] == 1 || data['mailCapitalReq'] == 1;
    this.btn_popu.getChildByName("redMark").active = data['extensionReq'] == 1;
    this.btn_acctivit.getChildByName("redMark").active = data['discountReq'].length != 0;
    this.btn_backWater.getChildByName("redMark").active = data['playerRebatReq'] == 1;
    this.btn_task.getChildByName("redMark").active = data['missionReq'] == 1;
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  // 重写父类按钮点击事件
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_email":
        this.click_email();
        break;

      case "btn_withdraw":
        this.click_exchange();
        break;

      case "btn_shop":
        this.click_shop();
        break;

      case "btn_acctivit":
        this.click_acctivit();
        break;

      case "btn_popu":
        this.click_popu();
        break;

      case "btn_task":
        this.click_task();
        break;

      case "btn_backWater":
        this.click_backWater();
        break;
      //这是洗码的功能

      case "btn_rank":
        this.click_Rank();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_Rank: function click_Rank() {
    glGame.panel.showPanelByName("rank");
  },
  click_backWater: function click_backWater() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("receive_rebate")) {
      return;
    }

    if (glGame.user.get("rebateSwitchEx") != 1) {
      glGame.panel.showTip("该功能暂未开放");
      return;
    }

    glGame.panel.showPanelByName('backWater');
  },
  click_task: function click_task() {
    glGame.panel.showPanelByName("Task");
  },
  click_popu: function click_popu() {
    if (glGame.panel.showSuspicious("receive_promotion_award")) {
      return;
    }

    glGame.panel.showPanelByName("popularize");
  },
  click_acctivit: function click_acctivit() {
    if (glGame.panel.showSuspicious("receive_discount")) {
      return;
    }

    glGame.panel.showPanelByName("announcement");
  },
  click_email: function click_email() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    glGame.panel.showPanelByName("email");
  },
  click_exchange: function click_exchange() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("withdraw")) {
      return;
    }

    if (glGame.user.is_withdraw == 2) {
      glGame.panel.showDialog("账号异常", glGame.tips.COMMON.ACCOUNTEXCEPTION, function () {
        glGame.panel.showService();
      }, function () {}, "我知道了", "联系客服");
      return;
    } //glGame.panel.showPanelByName("exchangeType");


    glGame.panel.showPanelByName("withdrawal");
  },
  click_shop: function click_shop() {
    if (glGame.user.isTourist()) {
      glGame.panel.showRegisteredGift(true);
      return;
    }

    if (glGame.panel.showSuspicious("recharge")) {
      return;
    }

    glGame.panel.showShop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxkb3duLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJidG5MYXlvdXQiLCJjYyIsIk5vZGUiLCJidG5fcG9wdSIsImJ0bl9hY2N0aXZpdCIsImJ0bl9iYWNrV2F0ZXIiLCJidG5fZW1haWwiLCJidG5fdGFzayIsImJ0bl93aXRoZHJhdyIsImJ0bl9zaG9wIiwiYnRuX3JhbmsiLCJvbkxvYWQiLCJyZWdpc3RlckV2ZW50IiwiaW5pdFVJIiwicmVxUmVkRG90IiwiYWN0aXZlIiwidXNlciIsIm1pc3Npb25Td2l0Y2giLCJyZWJhdGVTd2l0Y2giLCJjb25zb2xlIiwibG9nIiwiY291bnQiLCJpIiwiY2hpbGRyZW5Db3VudCIsImNoaWxkcmVuIiwid2luZG93c1dpZHRoIiwid2luU2l6ZSIsIndpZHRoIiwiZW1pdHRlciIsIm9uIiwiTUVTU0FHRSIsIlVJIiwiU0NFTkUiLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJkYXRhIiwiZ2V0IiwiZ2V0Q2hpbGRCeU5hbWUiLCJsZW5ndGgiLCJPbkRlc3Ryb3kiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJjbGlja19lbWFpbCIsImNsaWNrX2V4Y2hhbmdlIiwiY2xpY2tfc2hvcCIsImNsaWNrX2FjY3Rpdml0IiwiY2xpY2tfcG9wdSIsImNsaWNrX3Rhc2siLCJjbGlja19iYWNrV2F0ZXIiLCJjbGlja19SYW5rIiwiZXJyb3IiLCJwYW5lbCIsInNob3dQYW5lbEJ5TmFtZSIsImlzVG91cmlzdCIsInNob3dSZWdpc3RlcmVkR2lmdCIsInNob3dTdXNwaWNpb3VzIiwic2hvd1RpcCIsImlzX3dpdGhkcmF3Iiwic2hvd0RpYWxvZyIsInRpcHMiLCJDT01NT04iLCJBQ0NPVU5URVhDRVBUSU9OIiwic2hvd1NlcnZpY2UiLCJzaG93U2hvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7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LENBQWFJLGNBQWIsQ0FBNEIsVUFBNUIsQ0FBSixFQUE2QztBQUN6QztBQUNIOztBQUNELFFBQUk1RCxNQUFNLENBQUNvQixJQUFQLENBQVkwQyxXQUFaLElBQTJCLENBQS9CLEVBQWtDO0FBQzlCOUQsTUFBQUEsTUFBTSxDQUFDd0QsS0FBUCxDQUFhTyxVQUFiLENBQXdCLE1BQXhCLEVBQWdDL0QsTUFBTSxDQUFDZ0UsSUFBUCxDQUFZQyxNQUFaLENBQW1CQyxnQkFBbkQsRUFDSSxZQUFNO0FBQUVsRSxRQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWFXLFdBQWI7QUFBNEIsT0FEeEMsRUFDMEMsWUFBTSxDQUFHLENBRG5ELEVBQ3FELE1BRHJELEVBQzZELE1BRDdEO0FBRUE7QUFDSCxLQVpZLENBYWI7OztBQUNBbkUsSUFBQUEsTUFBTSxDQUFDd0QsS0FBUCxDQUFhQyxlQUFiLENBQTZCLFlBQTdCO0FBQ0gsR0F0SW1CO0FBdUlwQlIsRUFBQUEsVUF2SW9CLHdCQXVJUDtBQUNULFFBQUlqRCxNQUFNLENBQUNvQixJQUFQLENBQVlzQyxTQUFaLEVBQUosRUFBNkI7QUFDekIxRCxNQUFBQSxNQUFNLENBQUN3RCxLQUFQLENBQWFHLGtCQUFiLENBQWdDLElBQWhDO0FBQ0E7QUFDSDs7QUFDRCxRQUFJM0QsTUFBTSxDQUFDd0QsS0FBUCxDQUFhSSxjQUFiLENBQTRCLFVBQTVCLENBQUosRUFBNkM7QUFDekM7QUFDSDs7QUFDRDVELElBQUFBLE1BQU0sQ0FBQ3dELEtBQVAsQ0FBYVksUUFBYjtBQUNIO0FBaEptQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJ0bkxheW91dDogY2MuTm9kZSwvL+aMiemSrueItuiKgueCueaOkuW6j+S5i+eUqFxyXG4gICAgICAgIGJ0bl9wb3B1OiBjYy5Ob2RlLC8v5o6o5bm/5oyJ6ZKuXHJcbiAgICAgICAgYnRuX2FjY3Rpdml0OiBjYy5Ob2RlLC8v5rS75Yqo5oyJ6ZKuXHJcbiAgICAgICAgLy9idG5feXVlYmFvOiBjYy5Ob2RlLC8v5L2Z6aKd5a6d5oyJ6ZKuXHJcbiAgICAgICAgYnRuX2JhY2tXYXRlcjogY2MuTm9kZSwvL+i/lOawtOaMiemSrlxyXG4gICAgICAgIGJ0bl9lbWFpbDogY2MuTm9kZSwvL+mCruS7tuaMiemSrlxyXG4gICAgICAgIGJ0bl90YXNrOiBjYy5Ob2RlLC8v5Lu75Yqh5oyJ6ZKuXHJcbiAgICAgICAgYnRuX3dpdGhkcmF3OiBjYy5Ob2RlLC8v5o+Q546w5oyJ6ZKuXHJcbiAgICAgICAgYnRuX3Nob3A6IGNjLk5vZGUsLy/lhYXlgLzmjInpkq5cclxuICAgICAgICBidG5fcmFuazpjYy5Ob2RlXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgICAgIHRoaXMucmVxUmVkRG90KCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdFVJKCkge1xyXG4gICAgICAgIHRoaXMuYnRuX3Rhc2suYWN0aXZlID0gZ2xHYW1lLnVzZXIubWlzc2lvblN3aXRjaCA9PSAxO1xyXG4gICAgICAgIHRoaXMuYnRuX2JhY2tXYXRlci5hY3RpdmUgPSBnbEdhbWUudXNlci5yZWJhdGVTd2l0Y2ggPT0gMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOW8gOWFs1wiLGdsR2FtZS51c2VyLm1pc3Npb25Td2l0Y2gsZ2xHYW1lLnVzZXIucmViYXRlU3dpdGNoKVxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmJ0bkxheW91dC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5idG5MYXlvdXQuY2hpbGRyZW5baV0uYWN0aXZlKXtcclxuICAgICAgICAgICAgICAgIGNvdW50KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+agueaNruW9k+WJjeeql+WPo+Wkp+Wwj+iwg+aVtOaMiemSruWkp+Wwj+S7juiAjOiwg+aVtOmXtOi3nVxyXG4gICAgICAgIGxldCB3aW5kb3dzV2lkdGggPSAoY2Mud2luU2l6ZS53aWR0aCAtIHRoaXMuYnRuX3Nob3Aud2lkdGggLSB0aGlzLmJ0bl9wb3B1LndpZHRoKSAvIGNvdW50O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5idG5MYXlvdXQuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuTGF5b3V0LmNoaWxkcmVuW2ldLndpZHRoID0gd2luZG93c1dpZHRoO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyDms6jlhoznlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5TQ0VORSwgdGhpcy5pbml0VUksIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwiUmVxUmVkRG90XCIsIHRoaXMucmVxUmVkRG90LCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvLyDplIDmr4HnlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoTUVTU0FHRS5VSS5TQ0VORSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwiUmVxUmVkRG90XCIsIHRoaXMpO1xyXG4gICAgfSxcclxuIFxyXG4gICAgLy/liLfmlrDmjInpkq7kuIrnmoTnuqLngrlcclxuICAgIHJlcVJlZERvdChkYXRhKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSBkYXRhID0gZ2xHYW1lLnVzZXIuZ2V0KCdyZWREb3REYXRhJyk7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGRhdGEpIHsgY291bnQrKyB9O1xyXG4gICAgICAgIGlmIChjb3VudCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5idG5fZW1haWwuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRNYXJrXCIpLmFjdGl2ZSA9IGRhdGFbJ21haWxSZXEnXSA9PSAxIHx8IGRhdGFbJ21haWxDYXBpdGFsUmVxJ10gPT0gMTtcclxuICAgICAgICB0aGlzLmJ0bl9wb3B1LmdldENoaWxkQnlOYW1lKFwicmVkTWFya1wiKS5hY3RpdmUgPSBkYXRhWydleHRlbnNpb25SZXEnXSA9PSAxO1xyXG4gICAgICAgIHRoaXMuYnRuX2FjY3Rpdml0LmdldENoaWxkQnlOYW1lKFwicmVkTWFya1wiKS5hY3RpdmUgPSBkYXRhWydkaXNjb3VudFJlcSddLmxlbmd0aCAhPSAwO1xyXG4gICAgICAgIHRoaXMuYnRuX2JhY2tXYXRlci5nZXRDaGlsZEJ5TmFtZShcInJlZE1hcmtcIikuYWN0aXZlID0gZGF0YVsncGxheWVyUmViYXRSZXEnXSA9PSAxO1xyXG4gICAgICAgIHRoaXMuYnRuX3Rhc2suZ2V0Q2hpbGRCeU5hbWUoXCJyZWRNYXJrXCIpLmFjdGl2ZSA9IGRhdGFbJ21pc3Npb25SZXEnXSA9PSAxO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICAvLyDph43lhpnniLbnsbvmjInpkq7ngrnlh7vkuovku7ZcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2VtYWlsXCI6IHRoaXMuY2xpY2tfZW1haWwoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fd2l0aGRyYXdcIjogdGhpcy5jbGlja19leGNoYW5nZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9zaG9wXCI6IHRoaXMuY2xpY2tfc2hvcCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9hY2N0aXZpdFwiOiB0aGlzLmNsaWNrX2FjY3Rpdml0KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3BvcHVcIjogdGhpcy5jbGlja19wb3B1KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3Rhc2tcIjogdGhpcy5jbGlja190YXNrKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2JhY2tXYXRlclwiOiB0aGlzLmNsaWNrX2JhY2tXYXRlcigpOyBicmVhazsgLy/ov5nmmK/mtJfnoIHnmoTlip/og71cclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9yYW5rXCI6IHRoaXMuY2xpY2tfUmFuaygpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsaWNrX1JhbmsoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcInJhbmtcIik7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfYmFja1dhdGVyKCkge1xyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0KHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChnbEdhbWUucGFuZWwuc2hvd1N1c3BpY2lvdXMoXCJyZWNlaXZlX3JlYmF0ZVwiKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihnbEdhbWUudXNlci5nZXQoXCJyZWJhdGVTd2l0Y2hFeFwiKSAhPSAxKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93VGlwKFwi6K+l5Yqf6IO95pqC5pyq5byA5pS+XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKCdiYWNrV2F0ZXInKTtcclxuICAgIH0sXHJcbiAgICBjbGlja190YXNrKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJUYXNrXCIpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX3BvcHUoKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS5wYW5lbC5zaG93U3VzcGljaW91cyhcInJlY2VpdmVfcHJvbW90aW9uX2F3YXJkXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcInBvcHVsYXJpemVcIik7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfYWNjdGl2aXQoKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS5wYW5lbC5zaG93U3VzcGljaW91cyhcInJlY2VpdmVfZGlzY291bnRcIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwiYW5ub3VuY2VtZW50XCIpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2VtYWlsKCkge1xyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0KHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJlbWFpbFwiKTtcclxuICAgIH0sXHJcbiAgIFxyXG4gICAgY2xpY2tfZXhjaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzVG91cmlzdCgpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UmVnaXN0ZXJlZEdpZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdsR2FtZS5wYW5lbC5zaG93U3VzcGljaW91cyhcIndpdGhkcmF3XCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmlzX3dpdGhkcmF3ID09IDIpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coXCLotKblj7flvILluLhcIiwgZ2xHYW1lLnRpcHMuQ09NTU9OLkFDQ09VTlRFWENFUFRJT04sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpIH0sICgpID0+IHsgfSwgXCLmiJHnn6XpgZPkuoZcIiwgXCLogZTns7vlrqLmnI1cIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2dsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJleGNoYW5nZVR5cGVcIik7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcIndpdGhkcmF3YWxcIilcclxuICAgIH0sXHJcbiAgICBjbGlja19zaG9wKCkge1xyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5pc1RvdXJpc3QoKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0KHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnbEdhbWUucGFuZWwuc2hvd1N1c3BpY2lvdXMoXCJyZWNoYXJnZVwiKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93U2hvcCgpO1xyXG4gICAgfSxcclxuICBcclxuXHJcbn0pO1xyXG4iXX0=
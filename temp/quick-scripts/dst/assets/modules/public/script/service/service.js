
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/service/service.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70334FFXFNJCIEUL2Z/Jk/A', 'service');
// modules/public/script/service/service.js

"use strict";

/**
 * 客服面板, 直接webView连接到 php 指定网址, 具体功能由 php 完成
 */
glGame.baseclass.extend({
  properties: {
    audio: {
      type: cc.AudioClip,
      "default": null
    },
    leftContent: cc.Node,
    node_detail: cc.Node,
    prefab_Question: cc.Prefab,
    prefab_phone: cc.Prefab,
    prefab_exclusive: cc.Prefab,
    node_QRcode: cc.Node,
    code_bg: cc.Node,
    node_webOnline: cc.Node,
    node_head: cc.Node,
    node_copyid: cc.Node,
    label_copyid: cc.Label
  },
  start: function start() {
    this.registerEvent();
    glGame.audio.playSoundEffect(this.audio); // this.node_copyid.active = !glGame.user.isTourist();
    // if (this.node_copyid.active) this.label_copyid.string = "" + glGame.user.get("logicID");

    glGame.user.ReqCustomServerConfig();
  },
  setShowKefu: function setShowKefu(bFirstShowKefu) {
    this.bFirstShowKefu = bFirstShowKefu;
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("showWechatCode", this.initCode, this);
    glGame.emitter.on("updateCustomServer", this.customServer, this);
    glGame.emitter.on("updateCustomServerConfig", this.updateCustomServerConfig, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("showWechatCode", this);
    glGame.emitter.off("updateCustomServer", this);
    glGame.emitter.off("updateCustomServerConfig", this);
  },
  updateCustomServerConfig: function updateCustomServerConfig() {
    glGame.user.reqCustomServer(1, 1, true);
  },
  userUrlData: function userUrlData() {},
  showUI: function showUI() {
    var CustomServerConfig = glGame.user.get("CustomServerConfig").result;
    var count = 1;

    for (var i = 0; i < CustomServerConfig.length; i++) {
      console.log("这是当前的code", CustomServerConfig[i].code);
      if (!this.leftContent.getChildByName("".concat(CustomServerConfig[i].code))) continue;
      this.leftContent.getChildByName("".concat(CustomServerConfig[i].code)).active = true;
      this.leftContent.getChildByName("".concat(CustomServerConfig[i].code)).setSiblingIndex(count);
      count++;
    }

    if (this.bFirstShowKefu && CustomServerConfig.length >= 4) {
      this.leftContent.getChildByName("".concat(CustomServerConfig[3].code)).getComponent(cc.Toggle).check();
      this.onClick("".concat(CustomServerConfig[3].code));
    } else {
      this.leftContent.getChildByName("".concat(CustomServerConfig[0].code)).getComponent(cc.Toggle).check();
      this.onClick("".concat(CustomServerConfig[0].code));
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.click_close();
        break;

      case "question":
        this.click_question();
        break;

      case "exclusive":
        this.click_exclusiveService();
        break;

      case "third":
        this.click_onLineSevrice();
        break;

      case "btn_saveCode":
        this.saveBigQRcodeSprite();
        break;

      case "phone":
        this.click_phone();
        break;

      case "code_bg":
        this.code_bg.active = false;
        break;

      case "btn_cpid":
        glGame.platform.copyToClip("" + glGame.user.get("logicID"), "");
        break;
      //default: console.error("no find button name -> %s", name);
    }
  },
  click_close: function click_close() {
    this.remove();
  },
  click_phone: function click_phone() {
    this.showPanel('phone');
  },
  click_question: function click_question() {
    this.showPanel('Question');
  },
  // 专享客服
  click_exclusiveService: function click_exclusiveService() {
    this.showPanel('exclusive');
  },
  click_onLineSevrice: function click_onLineSevrice() {
    this.showPanel('web');
  },
  hideOtherPanel: function hideOtherPanel() {
    if (this.QuestionPanel) {
      this.QuestionPanel.active = false;
    }

    if (this.webPanel) {
      this.webPanel.active = false;
    }

    if (this.phonePanel) {
      this.phonePanel.active = false;
    }

    if (this.exclusivePanel) {
      this.exclusivePanel.active = false;
    }
  },
  showPanel: function showPanel(panelName) {
    this.hideOtherPanel();

    if (this[panelName + "Panel"]) {
      this[panelName + "Panel"].active = true;
      return;
    }

    if (panelName == 'web') {
      this.webPanel = cc.instantiate(this.node_webOnline);
      this.webPanel.active = true;
      this.webPanel.parent = this.node_detail;
      this.webPanel.getComponent("cc.WebView").url = this.thirdUrl;
      console.log(this.webPanel);
    } else {
      this[panelName + "Panel"] = glGame.panel.showChildPanel(this["prefab_".concat(panelName)], this.node_detail);
      this[panelName + "Panel"].active = true;
      var script = this[panelName + "Panel"].getComponent(this[panelName + "Panel"].name);
      script.customData();
    }
  },
  customServer: function customServer(bRefresh) {
    this.severice = glGame.user.get("customSever");
    if (this.severice.third) this.thirdUrl = this.severice.third.url;
    if (bRefresh) this.showUI();
  },
  //保持二维码
  saveBigQRcodeSprite: function saveBigQRcodeSprite() {
    glGame.screenshot.captureScreenshot('shareCode', this.node_QRcode);
  },
  initCode: function initCode(msg) {
    this.code_bg.active = true;
    this.node_head.active = true;
    console.log('dddddd', msg);
    glGame.panel.showRemoteImage(this.node_head, msg.url);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXHNlcnZpY2VcXHNlcnZpY2UuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImF1ZGlvIiwidHlwZSIsImNjIiwiQXVkaW9DbGlwIiwibGVmdENvbnRlbnQiLCJOb2RlIiwibm9kZV9kZXRhaWwiLCJwcmVmYWJfUXVlc3Rpb24iLCJQcmVmYWIiLCJwcmVmYWJfcGhvbmUiLCJwcmVmYWJfZXhjbHVzaXZlIiwibm9kZV9RUmNvZGUiLCJjb2RlX2JnIiwibm9kZV93ZWJPbmxpbmUiLCJub2RlX2hlYWQiLCJub2RlX2NvcHlpZCIsImxhYmVsX2NvcHlpZCIsIkxhYmVsIiwic3RhcnQiLCJyZWdpc3RlckV2ZW50IiwicGxheVNvdW5kRWZmZWN0IiwidXNlciIsIlJlcUN1c3RvbVNlcnZlckNvbmZpZyIsInNldFNob3dLZWZ1IiwiYkZpcnN0U2hvd0tlZnUiLCJlbWl0dGVyIiwib24iLCJpbml0Q29kZSIsImN1c3RvbVNlcnZlciIsInVwZGF0ZUN1c3RvbVNlcnZlckNvbmZpZyIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsInJlcUN1c3RvbVNlcnZlciIsInVzZXJVcmxEYXRhIiwic2hvd1VJIiwiQ3VzdG9tU2VydmVyQ29uZmlnIiwiZ2V0IiwicmVzdWx0IiwiY291bnQiLCJpIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImNvZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsInNldFNpYmxpbmdJbmRleCIsImdldENvbXBvbmVudCIsIlRvZ2dsZSIsImNoZWNrIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiY2xpY2tfY2xvc2UiLCJjbGlja19xdWVzdGlvbiIsImNsaWNrX2V4Y2x1c2l2ZVNlcnZpY2UiLCJjbGlja19vbkxpbmVTZXZyaWNlIiwic2F2ZUJpZ1FSY29kZVNwcml0ZSIsImNsaWNrX3Bob25lIiwicGxhdGZvcm0iLCJjb3B5VG9DbGlwIiwicmVtb3ZlIiwic2hvd1BhbmVsIiwiaGlkZU90aGVyUGFuZWwiLCJRdWVzdGlvblBhbmVsIiwid2ViUGFuZWwiLCJwaG9uZVBhbmVsIiwiZXhjbHVzaXZlUGFuZWwiLCJwYW5lbE5hbWUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInVybCIsInRoaXJkVXJsIiwicGFuZWwiLCJzaG93Q2hpbGRQYW5lbCIsInNjcmlwdCIsImN1c3RvbURhdGEiLCJiUmVmcmVzaCIsInNldmVyaWNlIiwidGhpcmQiLCJzY3JlZW5zaG90IiwiY2FwdHVyZVNjcmVlbnNob3QiLCJtc2ciLCJzaG93UmVtb3RlSW1hZ2UiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztBQUdBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFO0FBQ0hDLE1BQUFBLElBQUksRUFBRUMsRUFBRSxDQUFDQyxTQUROO0FBRUgsaUJBQVM7QUFGTixLQURDO0FBTVJDLElBQUFBLFdBQVcsRUFBRUYsRUFBRSxDQUFDRyxJQU5SO0FBT1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDRyxJQVBSO0FBUVJFLElBQUFBLGVBQWUsRUFBRUwsRUFBRSxDQUFDTSxNQVJaO0FBU1JDLElBQUFBLFlBQVksRUFBRVAsRUFBRSxDQUFDTSxNQVRUO0FBVVJFLElBQUFBLGdCQUFnQixFQUFFUixFQUFFLENBQUNNLE1BVmI7QUFXUkcsSUFBQUEsV0FBVyxFQUFFVCxFQUFFLENBQUNHLElBWFI7QUFZUk8sSUFBQUEsT0FBTyxFQUFFVixFQUFFLENBQUNHLElBWko7QUFhUlEsSUFBQUEsY0FBYyxFQUFFWCxFQUFFLENBQUNHLElBYlg7QUFjUlMsSUFBQUEsU0FBUyxFQUFFWixFQUFFLENBQUNHLElBZE47QUFlUlUsSUFBQUEsV0FBVyxFQUFFYixFQUFFLENBQUNHLElBZlI7QUFnQlJXLElBQUFBLFlBQVksRUFBRWQsRUFBRSxDQUFDZTtBQWhCVCxHQURRO0FBbUJwQkMsRUFBQUEsS0FuQm9CLG1CQW1CWjtBQUNKLFNBQUtDLGFBQUw7QUFDQXZCLElBQUFBLE1BQU0sQ0FBQ0ksS0FBUCxDQUFhb0IsZUFBYixDQUE2QixLQUFLcEIsS0FBbEMsRUFGSSxDQUdKO0FBQ0E7O0FBQ0FKLElBQUFBLE1BQU0sQ0FBQ3lCLElBQVAsQ0FBWUMscUJBQVo7QUFFSCxHQTFCbUI7QUE0QnBCQyxFQUFBQSxXQTVCb0IsdUJBNEJSQyxjQTVCUSxFQTRCTztBQUN2QixTQUFLQSxjQUFMLEdBQXNCQSxjQUF0QjtBQUNILEdBOUJtQjtBQWdDcEJMLEVBQUFBLGFBaENvQiwyQkFnQ0o7QUFDWnZCLElBQUFBLE1BQU0sQ0FBQzZCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixnQkFBbEIsRUFBb0MsS0FBS0MsUUFBekMsRUFBbUQsSUFBbkQ7QUFDQS9CLElBQUFBLE1BQU0sQ0FBQzZCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixvQkFBbEIsRUFBd0MsS0FBS0UsWUFBN0MsRUFBMkQsSUFBM0Q7QUFDQWhDLElBQUFBLE1BQU0sQ0FBQzZCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQiwwQkFBbEIsRUFBOEMsS0FBS0csd0JBQW5ELEVBQTZFLElBQTdFO0FBQ0gsR0FwQ21CO0FBcUNwQkMsRUFBQUEsZUFyQ29CLDZCQXFDRjtBQUNkbEMsSUFBQUEsTUFBTSxDQUFDNkIsT0FBUCxDQUFlTSxHQUFmLENBQW1CLGdCQUFuQixFQUFxQyxJQUFyQztBQUNBbkMsSUFBQUEsTUFBTSxDQUFDNkIsT0FBUCxDQUFlTSxHQUFmLENBQW1CLG9CQUFuQixFQUF5QyxJQUF6QztBQUNBbkMsSUFBQUEsTUFBTSxDQUFDNkIsT0FBUCxDQUFlTSxHQUFmLENBQW1CLDBCQUFuQixFQUErQyxJQUEvQztBQUNILEdBekNtQjtBQTBDcEJGLEVBQUFBLHdCQTFDb0Isc0NBMENPO0FBQ3ZCakMsSUFBQUEsTUFBTSxDQUFDeUIsSUFBUCxDQUFZVyxlQUFaLENBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLElBQWxDO0FBQ0gsR0E1Q21CO0FBNkNwQkMsRUFBQUEsV0E3Q29CLHlCQTZDTixDQUViLENBL0NtQjtBQWdEcEJDLEVBQUFBLE1BaERvQixvQkFnRFg7QUFDTCxRQUFJQyxrQkFBa0IsR0FBR3ZDLE1BQU0sQ0FBQ3lCLElBQVAsQ0FBWWUsR0FBWixDQUFnQixvQkFBaEIsRUFBc0NDLE1BQS9EO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLENBQVo7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixrQkFBa0IsQ0FBQ0ssTUFBdkMsRUFBK0NELENBQUMsRUFBaEQsRUFBb0Q7QUFDaERFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVosRUFBeUJQLGtCQUFrQixDQUFDSSxDQUFELENBQWxCLENBQXNCSSxJQUEvQztBQUNBLFVBQUksQ0FBQyxLQUFLdkMsV0FBTCxDQUFpQndDLGNBQWpCLFdBQW1DVCxrQkFBa0IsQ0FBQ0ksQ0FBRCxDQUFsQixDQUFzQkksSUFBekQsRUFBTCxFQUF1RTtBQUN2RSxXQUFLdkMsV0FBTCxDQUFpQndDLGNBQWpCLFdBQW1DVCxrQkFBa0IsQ0FBQ0ksQ0FBRCxDQUFsQixDQUFzQkksSUFBekQsR0FBaUVFLE1BQWpFLEdBQTBFLElBQTFFO0FBQ0EsV0FBS3pDLFdBQUwsQ0FBaUJ3QyxjQUFqQixXQUFtQ1Qsa0JBQWtCLENBQUNJLENBQUQsQ0FBbEIsQ0FBc0JJLElBQXpELEdBQWlFRyxlQUFqRSxDQUFpRlIsS0FBakY7QUFDQUEsTUFBQUEsS0FBSztBQUNSOztBQUdELFFBQUcsS0FBS2QsY0FBTCxJQUF1Qlcsa0JBQWtCLENBQUNLLE1BQW5CLElBQTJCLENBQXJELEVBQXdEO0FBQ3BELFdBQUtwQyxXQUFMLENBQWlCd0MsY0FBakIsV0FBbUNULGtCQUFrQixDQUFDLENBQUQsQ0FBbEIsQ0FBc0JRLElBQXpELEdBQWlFSSxZQUFqRSxDQUE4RTdDLEVBQUUsQ0FBQzhDLE1BQWpGLEVBQXlGQyxLQUF6RjtBQUNBLFdBQUtDLE9BQUwsV0FBZ0JmLGtCQUFrQixDQUFDLENBQUQsQ0FBbEIsQ0FBc0JRLElBQXRDO0FBQ0gsS0FIRCxNQUdPO0FBQ0gsV0FBS3ZDLFdBQUwsQ0FBaUJ3QyxjQUFqQixXQUFtQ1Qsa0JBQWtCLENBQUMsQ0FBRCxDQUFsQixDQUFzQlEsSUFBekQsR0FBaUVJLFlBQWpFLENBQThFN0MsRUFBRSxDQUFDOEMsTUFBakYsRUFBeUZDLEtBQXpGO0FBQ0EsV0FBS0MsT0FBTCxXQUFnQmYsa0JBQWtCLENBQUMsQ0FBRCxDQUFsQixDQUFzQlEsSUFBdEM7QUFDSDtBQUNKLEdBbkVtQjtBQW9FcEJPLEVBQUFBLE9BcEVvQixtQkFvRVpDLElBcEVZLEVBb0VOQyxJQXBFTSxFQW9FQTtBQUNoQixZQUFRRCxJQUFSO0FBQ0ksV0FBSyxXQUFMO0FBQWtCLGFBQUtFLFdBQUw7QUFBb0I7O0FBQ3RDLFdBQUssVUFBTDtBQUFpQixhQUFLQyxjQUFMO0FBQXVCOztBQUN4QyxXQUFLLFdBQUw7QUFBa0IsYUFBS0Msc0JBQUw7QUFBK0I7O0FBQ2pELFdBQUssT0FBTDtBQUFjLGFBQUtDLG1CQUFMO0FBQTRCOztBQUMxQyxXQUFLLGNBQUw7QUFBcUIsYUFBS0MsbUJBQUw7QUFBNEI7O0FBQ2pELFdBQUssT0FBTDtBQUFjLGFBQUtDLFdBQUw7QUFBb0I7O0FBQ2xDLFdBQUssU0FBTDtBQUFnQixhQUFLOUMsT0FBTCxDQUFhaUMsTUFBYixHQUFzQixLQUF0QjtBQUE2Qjs7QUFDN0MsV0FBSyxVQUFMO0FBQWlCakQsUUFBQUEsTUFBTSxDQUFDK0QsUUFBUCxDQUFnQkMsVUFBaEIsQ0FBMkIsS0FBS2hFLE1BQU0sQ0FBQ3lCLElBQVAsQ0FBWWUsR0FBWixDQUFnQixTQUFoQixDQUFoQyxFQUE0RCxFQUE1RDtBQUFpRTtBQUNsRjtBQVRKO0FBV0gsR0FoRm1CO0FBaUZwQmlCLEVBQUFBLFdBakZvQix5QkFpRk47QUFDVixTQUFLUSxNQUFMO0FBQ0gsR0FuRm1CO0FBb0ZwQkgsRUFBQUEsV0FwRm9CLHlCQW9GTjtBQUNWLFNBQUtJLFNBQUwsQ0FBZSxPQUFmO0FBQ0gsR0F0Rm1CO0FBdUZwQlIsRUFBQUEsY0F2Rm9CLDRCQXVGSDtBQUNiLFNBQUtRLFNBQUwsQ0FBZSxVQUFmO0FBQ0gsR0F6Rm1CO0FBMEZwQjtBQUNBUCxFQUFBQSxzQkEzRm9CLG9DQTJGSztBQUNyQixTQUFLTyxTQUFMLENBQWUsV0FBZjtBQUNILEdBN0ZtQjtBQThGcEJOLEVBQUFBLG1CQTlGb0IsaUNBOEZFO0FBQ2xCLFNBQUtNLFNBQUwsQ0FBZSxLQUFmO0FBQ0gsR0FoR21CO0FBaUdwQkMsRUFBQUEsY0FqR29CLDRCQWlHSDtBQUNiLFFBQUksS0FBS0MsYUFBVCxFQUF3QjtBQUFFLFdBQUtBLGFBQUwsQ0FBbUJuQixNQUFuQixHQUE0QixLQUE1QjtBQUFtQzs7QUFDN0QsUUFBSSxLQUFLb0IsUUFBVCxFQUFtQjtBQUFFLFdBQUtBLFFBQUwsQ0FBY3BCLE1BQWQsR0FBdUIsS0FBdkI7QUFBOEI7O0FBQ25ELFFBQUksS0FBS3FCLFVBQVQsRUFBcUI7QUFBRSxXQUFLQSxVQUFMLENBQWdCckIsTUFBaEIsR0FBeUIsS0FBekI7QUFBZ0M7O0FBQ3ZELFFBQUksS0FBS3NCLGNBQVQsRUFBeUI7QUFBRSxXQUFLQSxjQUFMLENBQW9CdEIsTUFBcEIsR0FBNkIsS0FBN0I7QUFBb0M7QUFDbEUsR0F0R21CO0FBdUdwQmlCLEVBQUFBLFNBdkdvQixxQkF1R1ZNLFNBdkdVLEVBdUdDO0FBQ2pCLFNBQUtMLGNBQUw7O0FBQ0EsUUFBSSxLQUFLSyxTQUFTLEdBQUcsT0FBakIsQ0FBSixFQUErQjtBQUMzQixXQUFLQSxTQUFTLEdBQUcsT0FBakIsRUFBMEJ2QixNQUExQixHQUFtQyxJQUFuQztBQUNBO0FBQ0g7O0FBQ0QsUUFBSXVCLFNBQVMsSUFBSSxLQUFqQixFQUF3QjtBQUNwQixXQUFLSCxRQUFMLEdBQWdCL0QsRUFBRSxDQUFDbUUsV0FBSCxDQUFlLEtBQUt4RCxjQUFwQixDQUFoQjtBQUNBLFdBQUtvRCxRQUFMLENBQWNwQixNQUFkLEdBQXVCLElBQXZCO0FBQ0EsV0FBS29CLFFBQUwsQ0FBY0ssTUFBZCxHQUF1QixLQUFLaEUsV0FBNUI7QUFDQSxXQUFLMkQsUUFBTCxDQUFjbEIsWUFBZCxDQUEyQixZQUEzQixFQUF5Q3dCLEdBQXpDLEdBQStDLEtBQUtDLFFBQXBEO0FBQ0EvQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLdUIsUUFBakI7QUFDSCxLQU5ELE1BTU87QUFDSCxXQUFLRyxTQUFTLEdBQUcsT0FBakIsSUFBNEJ4RSxNQUFNLENBQUM2RSxLQUFQLENBQWFDLGNBQWIsQ0FBNEIsc0JBQWVOLFNBQWYsRUFBNUIsRUFBeUQsS0FBSzlELFdBQTlELENBQTVCO0FBQ0EsV0FBSzhELFNBQVMsR0FBRyxPQUFqQixFQUEwQnZCLE1BQTFCLEdBQW1DLElBQW5DO0FBQ0EsVUFBSThCLE1BQU0sR0FBRyxLQUFLUCxTQUFTLEdBQUcsT0FBakIsRUFBMEJyQixZQUExQixDQUF1QyxLQUFLcUIsU0FBUyxHQUFHLE9BQWpCLEVBQTBCakIsSUFBakUsQ0FBYjtBQUNBd0IsTUFBQUEsTUFBTSxDQUFDQyxVQUFQO0FBQ0g7QUFFSixHQTFIbUI7QUEySHBCaEQsRUFBQUEsWUEzSG9CLHdCQTJIUGlELFFBM0hPLEVBMkhHO0FBQ25CLFNBQUtDLFFBQUwsR0FBZ0JsRixNQUFNLENBQUN5QixJQUFQLENBQVllLEdBQVosQ0FBZ0IsYUFBaEIsQ0FBaEI7QUFDQSxRQUFJLEtBQUswQyxRQUFMLENBQWNDLEtBQWxCLEVBQXlCLEtBQUtQLFFBQUwsR0FBZ0IsS0FBS00sUUFBTCxDQUFjQyxLQUFkLENBQW9CUixHQUFwQztBQUN6QixRQUFJTSxRQUFKLEVBQWMsS0FBSzNDLE1BQUw7QUFDakIsR0EvSG1CO0FBZ0lwQjtBQUNBdUIsRUFBQUEsbUJBaklvQixpQ0FpSUU7QUFDbEI3RCxJQUFBQSxNQUFNLENBQUNvRixVQUFQLENBQWtCQyxpQkFBbEIsQ0FBb0MsV0FBcEMsRUFBaUQsS0FBS3RFLFdBQXREO0FBQ0gsR0FuSW1CO0FBc0lwQmdCLEVBQUFBLFFBdElvQixvQkFzSVh1RCxHQXRJVyxFQXNJTjtBQUNWLFNBQUt0RSxPQUFMLENBQWFpQyxNQUFiLEdBQXNCLElBQXRCO0FBQ0EsU0FBSy9CLFNBQUwsQ0FBZStCLE1BQWYsR0FBd0IsSUFBeEI7QUFDQUosSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWixFQUFzQndDLEdBQXRCO0FBQ0F0RixJQUFBQSxNQUFNLENBQUM2RSxLQUFQLENBQWFVLGVBQWIsQ0FBNkIsS0FBS3JFLFNBQWxDLEVBQTZDb0UsR0FBRyxDQUFDWCxHQUFqRDtBQUVILEdBNUltQjtBQTZJcEJhLEVBQUFBLFNBN0lvQix1QkE2SVI7QUFDUixTQUFLdEQsZUFBTDtBQUNIO0FBL0ltQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWuouacjemdouadvywg55u05o6ld2ViVmlld+i/nuaOpeWIsCBwaHAg5oyH5a6a572R5Z2ALCDlhbfkvZPlip/og73nlLEgcGhwIOWujOaIkFxyXG4gKi9cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGF1ZGlvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxlZnRDb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfZGV0YWlsOiBjYy5Ob2RlLFxyXG4gICAgICAgIHByZWZhYl9RdWVzdGlvbjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHByZWZhYl9waG9uZTogY2MuUHJlZmFiLFxyXG4gICAgICAgIHByZWZhYl9leGNsdXNpdmU6IGNjLlByZWZhYixcclxuICAgICAgICBub2RlX1FSY29kZTogY2MuTm9kZSxcclxuICAgICAgICBjb2RlX2JnOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfd2ViT25saW5lOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfaGVhZDogY2MuTm9kZSxcclxuICAgICAgICBub2RlX2NvcHlpZDogY2MuTm9kZSxcclxuICAgICAgICBsYWJlbF9jb3B5aWQ6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIGdsR2FtZS5hdWRpby5wbGF5U291bmRFZmZlY3QodGhpcy5hdWRpbylcclxuICAgICAgICAvLyB0aGlzLm5vZGVfY29weWlkLmFjdGl2ZSA9ICFnbEdhbWUudXNlci5pc1RvdXJpc3QoKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5ub2RlX2NvcHlpZC5hY3RpdmUpIHRoaXMubGFiZWxfY29weWlkLnN0cmluZyA9IFwiXCIgKyBnbEdhbWUudXNlci5nZXQoXCJsb2dpY0lEXCIpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLlJlcUN1c3RvbVNlcnZlckNvbmZpZygpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRTaG93S2VmdShiRmlyc3RTaG93S2VmdSl7XHJcbiAgICAgICAgdGhpcy5iRmlyc3RTaG93S2VmdSA9IGJGaXJzdFNob3dLZWZ1O1xyXG4gICAgfSxcclxuXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwic2hvd1dlY2hhdENvZGVcIiwgdGhpcy5pbml0Q29kZSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVDdXN0b21TZXJ2ZXJcIiwgdGhpcy5jdXN0b21TZXJ2ZXIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlQ3VzdG9tU2VydmVyQ29uZmlnXCIsIHRoaXMudXBkYXRlQ3VzdG9tU2VydmVyQ29uZmlnLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwic2hvd1dlY2hhdENvZGVcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlQ3VzdG9tU2VydmVyXCIsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInVwZGF0ZUN1c3RvbVNlcnZlckNvbmZpZ1wiLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGVDdXN0b21TZXJ2ZXJDb25maWcoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIucmVxQ3VzdG9tU2VydmVyKDEsIDEsIHRydWUpO1xyXG4gICAgfSxcclxuICAgIHVzZXJVcmxEYXRhKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBzaG93VUkoKSB7XHJcbiAgICAgICAgbGV0IEN1c3RvbVNlcnZlckNvbmZpZyA9IGdsR2FtZS51c2VyLmdldChcIkN1c3RvbVNlcnZlckNvbmZpZ1wiKS5yZXN1bHQ7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEN1c3RvbVNlcnZlckNvbmZpZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahGNvZGVcIiwgQ3VzdG9tU2VydmVyQ29uZmlnW2ldLmNvZGUpXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sZWZ0Q29udGVudC5nZXRDaGlsZEJ5TmFtZShgJHtDdXN0b21TZXJ2ZXJDb25maWdbaV0uY29kZX1gKSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoYCR7Q3VzdG9tU2VydmVyQ29uZmlnW2ldLmNvZGV9YCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q29udGVudC5nZXRDaGlsZEJ5TmFtZShgJHtDdXN0b21TZXJ2ZXJDb25maWdbaV0uY29kZX1gKS5zZXRTaWJsaW5nSW5kZXgoY291bnQpO1xyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaWYodGhpcy5iRmlyc3RTaG93S2VmdSAmJiBDdXN0b21TZXJ2ZXJDb25maWcubGVuZ3RoPj00KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoYCR7Q3VzdG9tU2VydmVyQ29uZmlnWzNdLmNvZGV9YCkuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuY2hlY2soKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGAke0N1c3RvbVNlcnZlckNvbmZpZ1szXS5jb2RlfWApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoYCR7Q3VzdG9tU2VydmVyQ29uZmlnWzBdLmNvZGV9YCkuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuY2hlY2soKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGAke0N1c3RvbVNlcnZlckNvbmZpZ1swXS5jb2RlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLmNsaWNrX2Nsb3NlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicXVlc3Rpb25cIjogdGhpcy5jbGlja19xdWVzdGlvbigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV4Y2x1c2l2ZVwiOiB0aGlzLmNsaWNrX2V4Y2x1c2l2ZVNlcnZpY2UoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0aGlyZFwiOiB0aGlzLmNsaWNrX29uTGluZVNldnJpY2UoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fc2F2ZUNvZGVcIjogdGhpcy5zYXZlQmlnUVJjb2RlU3ByaXRlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicGhvbmVcIjogdGhpcy5jbGlja19waG9uZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNvZGVfYmdcIjogdGhpcy5jb2RlX2JnLmFjdGl2ZSA9IGZhbHNlOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jcGlkXCI6IGdsR2FtZS5wbGF0Zm9ybS5jb3B5VG9DbGlwKFwiXCIgKyBnbEdhbWUudXNlci5nZXQoXCJsb2dpY0lEXCIpLCBcIlwiKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vZGVmYXVsdDogY29uc29sZS5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsaWNrX2Nsb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2tfcGhvbmUoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UGFuZWwoJ3Bob25lJylcclxuICAgIH0sXHJcbiAgICBjbGlja19xdWVzdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNob3dQYW5lbCgnUXVlc3Rpb24nKVxyXG4gICAgfSxcclxuICAgIC8vIOS4k+S6q+WuouacjVxyXG4gICAgY2xpY2tfZXhjbHVzaXZlU2VydmljZSgpIHtcclxuICAgICAgICB0aGlzLnNob3dQYW5lbCgnZXhjbHVzaXZlJylcclxuICAgIH0sXHJcbiAgICBjbGlja19vbkxpbmVTZXZyaWNlKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BhbmVsKCd3ZWInKVxyXG4gICAgfSxcclxuICAgIGhpZGVPdGhlclBhbmVsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLlF1ZXN0aW9uUGFuZWwpIHsgdGhpcy5RdWVzdGlvblBhbmVsLmFjdGl2ZSA9IGZhbHNlIH1cclxuICAgICAgICBpZiAodGhpcy53ZWJQYW5lbCkgeyB0aGlzLndlYlBhbmVsLmFjdGl2ZSA9IGZhbHNlIH1cclxuICAgICAgICBpZiAodGhpcy5waG9uZVBhbmVsKSB7IHRoaXMucGhvbmVQYW5lbC5hY3RpdmUgPSBmYWxzZSB9XHJcbiAgICAgICAgaWYgKHRoaXMuZXhjbHVzaXZlUGFuZWwpIHsgdGhpcy5leGNsdXNpdmVQYW5lbC5hY3RpdmUgPSBmYWxzZSB9XHJcbiAgICB9LFxyXG4gICAgc2hvd1BhbmVsKHBhbmVsTmFtZSkge1xyXG4gICAgICAgIHRoaXMuaGlkZU90aGVyUGFuZWwoKVxyXG4gICAgICAgIGlmICh0aGlzW3BhbmVsTmFtZSArIFwiUGFuZWxcIl0pIHtcclxuICAgICAgICAgICAgdGhpc1twYW5lbE5hbWUgKyBcIlBhbmVsXCJdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhbmVsTmFtZSA9PSAnd2ViJykge1xyXG4gICAgICAgICAgICB0aGlzLndlYlBhbmVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlX3dlYk9ubGluZSk7XHJcbiAgICAgICAgICAgIHRoaXMud2ViUGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53ZWJQYW5lbC5wYXJlbnQgPSB0aGlzLm5vZGVfZGV0YWlsO1xyXG4gICAgICAgICAgICB0aGlzLndlYlBhbmVsLmdldENvbXBvbmVudChcImNjLldlYlZpZXdcIikudXJsID0gdGhpcy50aGlyZFVybDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy53ZWJQYW5lbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpc1twYW5lbE5hbWUgKyBcIlBhbmVsXCJdID0gZ2xHYW1lLnBhbmVsLnNob3dDaGlsZFBhbmVsKHRoaXNbYHByZWZhYl8ke3BhbmVsTmFtZX1gXSwgdGhpcy5ub2RlX2RldGFpbCk7XHJcbiAgICAgICAgICAgIHRoaXNbcGFuZWxOYW1lICsgXCJQYW5lbFwiXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSB0aGlzW3BhbmVsTmFtZSArIFwiUGFuZWxcIl0uZ2V0Q29tcG9uZW50KHRoaXNbcGFuZWxOYW1lICsgXCJQYW5lbFwiXS5uYW1lKTtcclxuICAgICAgICAgICAgc2NyaXB0LmN1c3RvbURhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGN1c3RvbVNlcnZlcihiUmVmcmVzaCkge1xyXG4gICAgICAgIHRoaXMuc2V2ZXJpY2UgPSBnbEdhbWUudXNlci5nZXQoXCJjdXN0b21TZXZlclwiKTtcclxuICAgICAgICBpZiAodGhpcy5zZXZlcmljZS50aGlyZCkgdGhpcy50aGlyZFVybCA9IHRoaXMuc2V2ZXJpY2UudGhpcmQudXJsO1xyXG4gICAgICAgIGlmIChiUmVmcmVzaCkgdGhpcy5zaG93VUkoKTtcclxuICAgIH0sXHJcbiAgICAvL+S/neaMgeS6jOe7tOeggVxyXG4gICAgc2F2ZUJpZ1FSY29kZVNwcml0ZSgpIHtcclxuICAgICAgICBnbEdhbWUuc2NyZWVuc2hvdC5jYXB0dXJlU2NyZWVuc2hvdCgnc2hhcmVDb2RlJywgdGhpcy5ub2RlX1FSY29kZSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbml0Q29kZShtc2cpIHtcclxuICAgICAgICB0aGlzLmNvZGVfYmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGVfaGVhZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkZGRkZGQnLCBtc2cpXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dSZW1vdGVJbWFnZSh0aGlzLm5vZGVfaGVhZCwgbXNnLnVybClcclxuXHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
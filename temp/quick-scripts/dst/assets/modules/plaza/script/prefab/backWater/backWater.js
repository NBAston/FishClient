
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/backWater/backWater.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0785c2MukJO7KgCVyT1fIgx', 'backWater');
// modules/plaza/script/prefab/backWater/backWater.js

"use strict";

/**
 * 返水信息面板
 * 有效投注*比例 = 返水金额
 * 今日有效投注 = 总的子游戏有效投注之和
 * 今日预计返水 = 总的子游戏返水金额之和
 */
var GAMETYPE = {
  CHESS: 1,
  //棋牌版
  COMPLEX: 2 //综合版

};
glGame.baseclass.extend({
  properties: {
    sonPanel: cc.Node
  },
  onLoad: function onLoad() {
    this.gameDisplayType = glGame.user.get("gameDisplayType");
    this.registerEvent();
    this.showPanel("mywater");
    glGame.panel.showEffectPariticle(this.node);
  },
  start: function start() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on(MESSAGE.UI.FORBIDDEN_BACKWATER, this.onForbbidden, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off(MESSAGE.UI.FORBIDDEN_BACKWATER, this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.remove();
        break;

      case "mywater":
      case "rateexplain":
      case "record":
        this.showPanel(name);
        break;

      default:
        break;
    }
  },
  onForbbidden: function onForbbidden() {
    var _this = this;

    glGame.user.rebateSwitchEx = 0;
    glGame.panel.showMsgBox("该功能暂未开放", "该功能暂未开放", function () {
      _this.remove();
    });
  },
  //隐藏所有界面
  hideAllPanel: function hideAllPanel() {
    if (!this.sonPanel.childrenCount) return;

    for (var i = 0; i < this.sonPanel.childrenCount; i++) {
      this.sonPanel.children[i].active = false;
    }
  },
  //显示某个界面。按名字来显示
  showPanel: function showPanel(panelName) {
    var _this2 = this;

    // this.gameDisplayType = GAMETYPE.CHESS;
    this.hideAllPanel();
    var panellist = {};
    panellist["mywater"] = this.gameDisplayType == GAMETYPE.CHESS ? "mybackWater" : "mybackWater_complex";
    panellist["rateexplain"] = this.gameDisplayType == GAMETYPE.CHESS ? "porpor" : "porpor_complex";
    ;
    panellist["record"] = "waterrecord";

    if (this.sonPanel.getChildByName(panellist[panelName])) {
      this.sonPanel.getChildByName(panellist[panelName]).active = true;
      return;
    }

    glGame.panel.getPanelByName(panellist[panelName]).then(function (panelData) {
      panelData.parent = _this2.sonPanel;
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxiYWNrV2F0ZXJcXGJhY2tXYXRlci5qcyJdLCJuYW1lcyI6WyJHQU1FVFlQRSIsIkNIRVNTIiwiQ09NUExFWCIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJzb25QYW5lbCIsImNjIiwiTm9kZSIsIm9uTG9hZCIsImdhbWVEaXNwbGF5VHlwZSIsInVzZXIiLCJnZXQiLCJyZWdpc3RlckV2ZW50Iiwic2hvd1BhbmVsIiwicGFuZWwiLCJzaG93RWZmZWN0UGFyaXRpY2xlIiwibm9kZSIsInN0YXJ0IiwiZW1pdHRlciIsIm9uIiwiTUVTU0FHRSIsIlVJIiwiRk9SQklEREVOX0JBQ0tXQVRFUiIsIm9uRm9yYmJpZGRlbiIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsIk9uRGVzdHJveSIsIm9uQ2xpY2siLCJuYW1lIiwicmVtb3ZlIiwicmViYXRlU3dpdGNoRXgiLCJzaG93TXNnQm94IiwiaGlkZUFsbFBhbmVsIiwiY2hpbGRyZW5Db3VudCIsImkiLCJjaGlsZHJlbiIsImFjdGl2ZSIsInBhbmVsTmFtZSIsInBhbmVsbGlzdCIsImdldENoaWxkQnlOYW1lIiwiZ2V0UGFuZWxCeU5hbWUiLCJ0aGVuIiwicGFuZWxEYXRhIiwicGFyZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxJQUFNQSxRQUFRLEdBQUc7QUFDYkMsRUFBQUEsS0FBSyxFQUFDLENBRE87QUFDRDtBQUNaQyxFQUFBQSxPQUFPLEVBQUMsQ0FGSyxDQUVEOztBQUZDLENBQWpCO0FBS0FDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUVDLEVBQUUsQ0FBQ0M7QUFETCxHQURRO0FBS3BCQyxFQUFBQSxNQUxvQixvQkFLWDtBQUNMLFNBQUtDLGVBQUwsR0FBdUJS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QUQsQ0FBckMsRUFBa0RJLElBQWxELENBQXVELFVBQUFDLFNBQVMsRUFBSTtBQUFFQSxNQUFBQSxTQUFTLENBQUNDLE1BQVYsR0FBbUIsTUFBSSxDQUFDdEMsUUFBeEI7QUFBbUMsS0FBekc7QUFDSDtBQW5FbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDov5TmsLTkv6Hmga/pnaLmnb9cclxuICog5pyJ5pWI5oqV5rOoKuavlOS+iyA9IOi/lOawtOmHkeminVxyXG4gKiDku4rml6XmnInmlYjmipXms6ggPSDmgLvnmoTlrZDmuLjmiI/mnInmlYjmipXms6jkuYvlkoxcclxuICog5LuK5pel6aKE6K6h6L+U5rC0ID0g5oC755qE5a2Q5ri45oiP6L+U5rC06YeR6aKd5LmL5ZKMXHJcbiAqL1xyXG5jb25zdCBHQU1FVFlQRSA9IHtcclxuICAgIENIRVNTOjEsICAgIC8v5qOL54mM54mIXHJcbiAgICBDT01QTEVYOjIsICAvL+e7vOWQiOeJiFxyXG59XHJcblxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc29uUGFuZWw6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVEaXNwbGF5VHlwZSA9IGdsR2FtZS51c2VyLmdldChcImdhbWVEaXNwbGF5VHlwZVwiKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnNob3dQYW5lbChcIm15d2F0ZXJcIik7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3RQYXJpdGljbGUodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuRk9SQklEREVOX0JBQ0tXQVRFUiwgdGhpcy5vbkZvcmJiaWRkZW4sIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuRk9SQklEREVOX0JBQ0tXQVRFUiwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5yZW1vdmUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJteXdhdGVyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJyYXRlZXhwbGFpblwiOlxyXG4gICAgICAgICAgICBjYXNlIFwicmVjb3JkXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYW5lbChuYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRm9yYmJpZGRlbigpIHtcclxuICAgICAgICBnbEdhbWUudXNlci5yZWJhdGVTd2l0Y2hFeCA9IDA7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dNc2dCb3goXCLor6Xlip/og73mmoLmnKrlvIDmlL5cIiwgXCLor6Xlip/og73mmoLmnKrlvIDmlL5cIixcclxuICAgICAgICAgICAgKCkgPT4geyB0aGlzLnJlbW92ZSgpOyB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+makOiXj+aJgOacieeVjOmdolxyXG4gICAgaGlkZUFsbFBhbmVsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zb25QYW5lbC5jaGlsZHJlbkNvdW50KSByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvblBhbmVsLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNvblBhbmVsLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aYvuekuuafkOS4queVjOmdouOAguaMieWQjeWtl+adpeaYvuekulxyXG4gICAgc2hvd1BhbmVsKHBhbmVsTmFtZSkge1xyXG4gICAgICAgIC8vIHRoaXMuZ2FtZURpc3BsYXlUeXBlID0gR0FNRVRZUEUuQ0hFU1M7XHJcbiAgICAgICAgdGhpcy5oaWRlQWxsUGFuZWwoKVxyXG4gICAgICAgIGxldCBwYW5lbGxpc3QgPSB7fVxyXG4gICAgICAgIHBhbmVsbGlzdFtcIm15d2F0ZXJcIl0gPSB0aGlzLmdhbWVEaXNwbGF5VHlwZSA9PSBHQU1FVFlQRS5DSEVTUyA/IFwibXliYWNrV2F0ZXJcIiA6XCJteWJhY2tXYXRlcl9jb21wbGV4XCI7XHJcbiAgICAgICAgcGFuZWxsaXN0W1wicmF0ZWV4cGxhaW5cIl0gPSB0aGlzLmdhbWVEaXNwbGF5VHlwZSA9PSBHQU1FVFlQRS5DSEVTUyA/IFwicG9ycG9yXCIgOlwicG9ycG9yX2NvbXBsZXhcIjs7XHJcbiAgICAgICAgcGFuZWxsaXN0W1wicmVjb3JkXCJdID0gXCJ3YXRlcnJlY29yZFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zb25QYW5lbC5nZXRDaGlsZEJ5TmFtZShwYW5lbGxpc3RbcGFuZWxOYW1lXSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zb25QYW5lbC5nZXRDaGlsZEJ5TmFtZShwYW5lbGxpc3RbcGFuZWxOYW1lXSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLmdldFBhbmVsQnlOYW1lKHBhbmVsbGlzdFtwYW5lbE5hbWVdKS50aGVuKHBhbmVsRGF0YSA9PiB7IHBhbmVsRGF0YS5wYXJlbnQgPSB0aGlzLnNvblBhbmVsOyB9KVxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/popularize/popularize.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50a0c4IuF1Nq6/5kQbdFucE', 'popularize');
// modules/plaza/script/prefab/popularize/popularize.js

"use strict";

glGame.baseclass.extend({
  properties: {
    select: cc.Node,
    content: cc.Node,
    audio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.registerEvent();
    glGame.audio.playSoundEffect(this.audio);
    this.openAllChildInteractable(false);
    glGame.panel.showEffectPariticle(this.node);
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("refreshPopularize", this.refreshPopularize, this);
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.ReqPlayerExtensionCountless, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("refreshPopularize", this);
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
  },
  refreshPopularize: function refreshPopularize() {
    var _this = this;

    // 清理相关数据界面
    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountless', {}, function (route, msg) {
      _this.pandectdata = msg;
      _this.ruleDetaildata = msg.level;
      var name = "pandect";

      var pandect = _this.content.getChildByName(name);

      var script = pandect.getComponent(name);
      script.initUI(_this.pandectdata, _this.ruleDetaildata);
      if (_this.content.getChildByName("getrecord")) _this.content.getChildByName("getrecord").removeFromParent();
      if (_this.content.getChildByName("ruleDetail")) _this.content.getChildByName("ruleDetail").removeFromParent();
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "pandect":
        this.pandect_CB();
        break;

      case "todaybrokerage":
        this.todaybrokerage_CB();
        break;

      case "historybrokerage":
        this.historybrokerage_CB();
        break;

      case "subordinate":
        this.subordinate_CB();
        break;

      case "getrecord":
        this.getrecord_CB();
        break;

      case "bonus":
        this.bonus_CB();
        break;

      case "btn_return":
        this.close();
        break;
    }
  },
  //推广总览的数据
  ReqPlayerExtensionCountless: function ReqPlayerExtensionCountless() {
    var _this2 = this;

    this.openAllChildInteractable(false);
    var name = "pandect";

    if (this.pandectdata && this.content.getChildByName(name)) {
      this.content.getChildByName(name).active = true;
      this.openAllChildInteractable(true);
      return;
    }

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountless', {}, function (route, msg) {
      _this2.pandectdata = msg;
      _this2.ruleDetaildata = msg.level;
      glGame.panel.getPanelByName(name).then(function (pandect) {
        pandect.parent = _this2.content;

        _this2.openAllChildInteractable(true);

        var script = pandect.getComponent(name);
        script.initUI(_this2.pandectdata, _this2.ruleDetaildata);
      });
    });
  },
  //今日佣金
  ReqPlayerExtensionCountlessDaily: function ReqPlayerExtensionCountlessDaily() {
    var _this3 = this;

    this.openAllChildInteractable(false);
    var name = "todaybrokerage";

    if (this.todaybrokeragetdata && this.content.getChildByName(name)) {
      this.content.getChildByName(name).active = true;
      this.openAllChildInteractable(true);
      return;
    }

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessDaily', {
      page: 1,
      page_size: 8
    }, function (route, msg) {
      _this3.todaybrokeragetdata = msg;
      glGame.panel.showPanelByName(name).then(function (todaybrokerage) {
        todaybrokerage.parent = _this3.content;

        _this3.openAllChildInteractable(true);

        var script = todaybrokerage.getComponent(name);
        script.initUI(_this3.todaybrokeragetdata);
      });
    });
  },
  ReqPlayerExtensionCountlessRecord: function ReqPlayerExtensionCountlessRecord() {
    var _this4 = this;

    this.openAllChildInteractable(false);
    var name = "historybrokerage";

    if (this.historybrokeragedata && this.content.getChildByName(name)) {
      this.content.getChildByName(name).active = true;
      this.openAllChildInteractable(true);
      return;
    }

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRecord', {
      page: 1,
      page_size: 8
    }, function (route, msg) {
      _this4.historybrokeragedata = msg;
      glGame.panel.showPanelByName(name).then(function (historybrokerage) {
        historybrokerage.parent = _this4.content;

        _this4.openAllChildInteractable(true);

        var script = historybrokerage.getComponent(name);
        script.initUI(_this4.historybrokeragedata);
      });
    });
  },
  ReqPlayerExtensionCountlessMember: function ReqPlayerExtensionCountlessMember() {
    var _this5 = this;

    this.openAllChildInteractable(false);
    var name = "subordinate";

    if (this.subordinatedata && this.content.getChildByName(name)) {
      this.content.getChildByName(name).active = true;
      this.openAllChildInteractable(true);
      return;
    }

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessMember', {
      page: 1,
      page_size: 8
    }, function (route, msg) {
      _this5.subordinatedata = msg;
      glGame.panel.showPanelByName(name).then(function (subordinate) {
        subordinate.parent = _this5.content;

        _this5.openAllChildInteractable(true);

        var script = subordinate.getComponent(name);
        script.initUI(_this5.subordinatedata);
      });
    });
  },
  ReqPlayerExtensionCountlessFlow: function ReqPlayerExtensionCountlessFlow() {
    var _this6 = this;

    this.openAllChildInteractable(false);
    var name = "getrecord";

    if (this.getrecorddata && this.content.getChildByName(name)) {
      this.content.getChildByName(name).active = true;
      this.openAllChildInteractable(true);
      return;
    }

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessFlow', {
      page: 1,
      page_size: 8
    }, function (route, msg) {
      _this6.getrecorddata = msg;
      glGame.panel.showPanelByName(name).then(function (getrecord) {
        getrecord.parent = _this6.content;

        _this6.openAllChildInteractable(true);

        var script = getrecord.getComponent(name);
        script.initUI(_this6.pandectdata, _this6.getrecorddata);
      });
    });
  },
  ReqPlayerExtensionCountlessLevel: function ReqPlayerExtensionCountlessLevel() {
    var _this7 = this;

    this.openAllChildInteractable(false);
    var name = "ruleDetail";

    if (this.ruleDetaildata && this.content.getChildByName(name)) {
      this.content.getChildByName(name).active = true;
      this.openAllChildInteractable(true);
    } else if (this.ruleDetaildata) {
      glGame.panel.showPanelByName(name).then(function (ruleDetail) {
        ruleDetail.parent = _this7.content;

        _this7.openAllChildInteractable(true);

        var script = ruleDetail.getComponent(name);
        script.initUI(_this7.pandectdata, _this7.ruleDetaildata);
      });
    } else {
      glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessLevel', {}, function (route, msg) {
        _this7.ruleDetaildata = msg;
        glGame.panel.showPanelByName(name).then(function (ruleDetail) {
          ruleDetail.parent = _this7.content;

          _this7.openAllChildInteractable(true);

          var script = ruleDetail.getComponent(name);
          script.initUI(_this7.pandectdata, _this7.ruleDetaildata);
        });
      });
    }
  },
  pandect_CB: function pandect_CB() {
    this.allChildActive();
    this.ReqPlayerExtensionCountless();
  },
  todaybrokerage_CB: function todaybrokerage_CB() {
    this.allChildActive();
    this.ReqPlayerExtensionCountlessDaily();
  },
  historybrokerage_CB: function historybrokerage_CB() {
    this.allChildActive();
    this.ReqPlayerExtensionCountlessRecord();
  },
  subordinate_CB: function subordinate_CB() {
    this.allChildActive();
    this.ReqPlayerExtensionCountlessMember();
  },
  getrecord_CB: function getrecord_CB() {
    this.allChildActive();
    this.ReqPlayerExtensionCountlessFlow();
  },
  bonus_CB: function bonus_CB() {
    this.allChildActive();
    this.ReqPlayerExtensionCountlessLevel();
  },
  allChildActive: function allChildActive() {
    if (!this.content.childrenCount) return;

    for (var i = 0; i < this.content.childrenCount; i++) {
      this.content.children[i].active = false;
    }
  },
  openAllChildInteractable: function openAllChildInteractable(bol) {
    if (!this.select.childrenCount) return;

    for (var i = 0; i < this.select.childrenCount; i++) {
      if (!this.select.children[i].getComponent(cc.Toggle)) continue;
      this.select.children[i].getComponent(cc.Toggle).interactable = bol;
    }
  },
  close: function close() {
    this.remove();
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxwb3B1bGFyaXplXFxwb3B1bGFyaXplLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJzZWxlY3QiLCJjYyIsIk5vZGUiLCJjb250ZW50IiwiYXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwicmVnaXN0ZXJFdmVudCIsInBsYXlTb3VuZEVmZmVjdCIsIm9wZW5BbGxDaGlsZEludGVyYWN0YWJsZSIsInBhbmVsIiwic2hvd0VmZmVjdFBhcml0aWNsZSIsIm5vZGUiLCJlbWl0dGVyIiwib24iLCJyZWZyZXNoUG9wdWxhcml6ZSIsIm5hbWUiLCJNRVNTQUdFIiwiVUkiLCJBQ1RJT05fRU5EIiwiUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzIiwidW5SZWdpc3RlckV2ZW50Iiwib2ZmIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJtc2ciLCJwYW5kZWN0ZGF0YSIsInJ1bGVEZXRhaWxkYXRhIiwibGV2ZWwiLCJwYW5kZWN0IiwiZ2V0Q2hpbGRCeU5hbWUiLCJzY3JpcHQiLCJnZXRDb21wb25lbnQiLCJpbml0VUkiLCJyZW1vdmVGcm9tUGFyZW50Iiwib25DbGljayIsInBhbmRlY3RfQ0IiLCJ0b2RheWJyb2tlcmFnZV9DQiIsImhpc3Rvcnlicm9rZXJhZ2VfQ0IiLCJzdWJvcmRpbmF0ZV9DQiIsImdldHJlY29yZF9DQiIsImJvbnVzX0NCIiwiY2xvc2UiLCJhY3RpdmUiLCJnZXRQYW5lbEJ5TmFtZSIsInRoZW4iLCJwYXJlbnQiLCJSZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NEYWlseSIsInRvZGF5YnJva2VyYWdldGRhdGEiLCJwYWdlIiwicGFnZV9zaXplIiwic2hvd1BhbmVsQnlOYW1lIiwidG9kYXlicm9rZXJhZ2UiLCJSZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZWNvcmQiLCJoaXN0b3J5YnJva2VyYWdlZGF0YSIsImhpc3Rvcnlicm9rZXJhZ2UiLCJSZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NNZW1iZXIiLCJzdWJvcmRpbmF0ZWRhdGEiLCJzdWJvcmRpbmF0ZSIsIlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc0Zsb3ciLCJnZXRyZWNvcmRkYXRhIiwiZ2V0cmVjb3JkIiwiUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzTGV2ZWwiLCJydWxlRGV0YWlsIiwiYWxsQ2hpbGRBY3RpdmUiLCJjaGlsZHJlbkNvdW50IiwiaSIsImNoaWxkcmVuIiwiYm9sIiwiVG9nZ2xlIiwiaW50ZXJhY3RhYmxlIiwicmVtb3ZlIiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFQyxFQUFFLENBQUNDLElBREg7QUFFUkMsSUFBQUEsT0FBTyxFQUFFRixFQUFFLENBQUNDLElBRko7QUFHUkUsSUFBQUEsS0FBSyxFQUFFO0FBQ0hDLE1BQUFBLElBQUksRUFBRUosRUFBRSxDQUFDSyxTQUROO0FBRUgsaUJBQVM7QUFGTjtBQUhDLEdBRFE7QUFTcEJDLEVBQUFBLE1BVG9CLG9CQVNYO0FBQ0wsU0FBS0MsYUFBTDtBQUNBWixJQUFBQSxNQUFNLENBQUNRLEtBQVAsQ0FBYUssZUFBYixDQUE2QixLQUFLTCxLQUFsQztBQUNBLFNBQUtNLHdCQUFMLENBQThCLEtBQTlCO0FBQ0FkLElBQUFBLE1BQU0sQ0FBQ2UsS0FBUCxDQUFhQyxtQkFBYixDQUFpQyxLQUFLQyxJQUF0QztBQUNILEdBZG1CO0FBZ0JwQjtBQUNBTCxFQUFBQSxhQWpCb0IsMkJBaUJKO0FBQ1paLElBQUFBLE1BQU0sQ0FBQ2tCLE9BQVAsQ0FBZUMsRUFBZixDQUFrQixtQkFBbEIsRUFBdUMsS0FBS0MsaUJBQTVDLEVBQStELElBQS9EO0FBQ0FwQixJQUFBQSxNQUFN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QUFhZ0UsYUFBbEIsRUFBaUM7O0FBQ2pDLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLakUsT0FBTCxDQUFhZ0UsYUFBakMsRUFBZ0RDLENBQUMsRUFBakQsRUFBcUQ7QUFDakQsV0FBS2pFLE9BQUwsQ0FBYWtFLFFBQWIsQ0FBc0JELENBQXRCLEVBQXlCdkIsTUFBekIsR0FBa0MsS0FBbEM7QUFDSDtBQUNKLEdBeE1tQjtBQTBNcEJuQyxFQUFBQSx3QkExTW9CLG9DQTBNSzRELEdBMU1MLEVBME1VO0FBQzFCLFFBQUksQ0FBQyxLQUFLdEUsTUFBTCxDQUFZbUUsYUFBakIsRUFBZ0M7O0FBQ2hDLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLcEUsTUFBTCxDQUFZbUUsYUFBaEMsRUFBK0NDLENBQUMsRUFBaEQsRUFBb0Q7QUFDaEQsVUFBSSxDQUFDLEtBQUtwRSxNQUFMLENBQVlxRSxRQUFaLENBQXFCRCxDQUFyQixFQUF3QmxDLFlBQXhCLENBQXFDakMsRUFBRSxDQUFDc0UsTUFBeEMsQ0FBTCxFQUFzRDtBQUN0RCxXQUFLdkUsTUFBTCxDQUFZcUUsUUFBWixDQUFxQkQsQ0FBckIsRUFBd0JsQyxZQUF4QixDQUFxQ2pDLEVBQUUsQ0FBQ3NFLE1BQXhDLEVBQWdEQyxZQUFoRCxHQUErREYsR0FBL0Q7QUFDSDtBQUNKLEdBaE5tQjtBQWtOcEIxQixFQUFBQSxLQWxOb0IsbUJBa05aO0FBQ0osU0FBSzZCLE1BQUw7QUFDSCxHQXBObUI7QUFxTnBCQyxFQUFBQSxTQXJOb0IsdUJBcU5SO0FBQ1IsU0FBS3BELGVBQUw7QUFDSCxHQXZObUIsQ0F3TnBCOztBQXhOb0IsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzZWxlY3Q6IGNjLk5vZGUsXHJcbiAgICAgICAgY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBhdWRpbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICBnbEdhbWUuYXVkaW8ucGxheVNvdW5kRWZmZWN0KHRoaXMuYXVkaW8pXHJcbiAgICAgICAgdGhpcy5vcGVuQWxsQ2hpbGRJbnRlcmFjdGFibGUoZmFsc2UpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0UGFyaXRpY2xlKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOazqOWGjOeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInJlZnJlc2hQb3B1bGFyaXplXCIsIHRoaXMucmVmcmVzaFBvcHVsYXJpemUsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKGAke3RoaXMubm9kZS5uYW1lfSR7TUVTU0FHRS5VSS5BQ1RJT05fRU5EfWAsIHRoaXMuUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvLyDplIDmr4HnlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJyZWZyZXNoUG9wdWxhcml6ZVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2hQb3B1bGFyaXplKCkge1xyXG4gICAgICAgIC8vIOa4heeQhuebuOWFs+aVsOaNrueVjOmdolxyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzcycsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmRlY3RkYXRhID0gbXNnO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVEZXRhaWxkYXRhID0gbXNnLmxldmVsO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IFwicGFuZGVjdFwiO1xyXG4gICAgICAgICAgICBsZXQgcGFuZGVjdCA9IHRoaXMuY29udGVudC5nZXRDaGlsZEJ5TmFtZShuYW1lKTtcclxuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IHBhbmRlY3QuZ2V0Q29tcG9uZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBzY3JpcHQuaW5pdFVJKHRoaXMucGFuZGVjdGRhdGEsIHRoaXMucnVsZURldGFpbGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKFwiZ2V0cmVjb3JkXCIpKSB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJnZXRyZWNvcmRcIikucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKFwicnVsZURldGFpbFwiKSkgdGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKFwicnVsZURldGFpbFwiKS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwYW5kZWN0XCI6IHRoaXMucGFuZGVjdF9DQigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInRvZGF5YnJva2VyYWdlXCI6IHRoaXMudG9kYXlicm9rZXJhZ2VfQ0IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoaXN0b3J5YnJva2VyYWdlXCI6IHRoaXMuaGlzdG9yeWJyb2tlcmFnZV9DQigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1Ym9yZGluYXRlXCI6IHRoaXMuc3Vib3JkaW5hdGVfQ0IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnZXRyZWNvcmRcIjogdGhpcy5nZXRyZWNvcmRfQ0IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJib251c1wiOiB0aGlzLmJvbnVzX0NCKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JldHVyblwiOiB0aGlzLmNsb3NlKCk7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aOqOW5v+aAu+iniOeahOaVsOaNrlxyXG4gICAgUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzKCkge1xyXG4gICAgICAgIHRoaXMub3BlbkFsbENoaWxkSW50ZXJhY3RhYmxlKGZhbHNlKTtcclxuICAgICAgICBsZXQgbmFtZSA9IFwicGFuZGVjdFwiO1xyXG4gICAgICAgIGlmICh0aGlzLnBhbmRlY3RkYXRhICYmIHRoaXMuY29udGVudC5nZXRDaGlsZEJ5TmFtZShuYW1lKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUobmFtZSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQWxsQ2hpbGRJbnRlcmFjdGFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzJywge30sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZGVjdGRhdGEgPSBtc2c7XHJcbiAgICAgICAgICAgIHRoaXMucnVsZURldGFpbGRhdGEgPSBtc2cubGV2ZWw7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5nZXRQYW5lbEJ5TmFtZShuYW1lKS50aGVuKHBhbmRlY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFuZGVjdC5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGxDaGlsZEludGVyYWN0YWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSBwYW5kZWN0LmdldENvbXBvbmVudChuYW1lKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5pbml0VUkodGhpcy5wYW5kZWN0ZGF0YSwgdGhpcy5ydWxlRGV0YWlsZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy/ku4rml6XkvaPph5FcclxuICAgIFJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc0RhaWx5KCkge1xyXG4gICAgICAgIHRoaXMub3BlbkFsbENoaWxkSW50ZXJhY3RhYmxlKGZhbHNlKTtcclxuICAgICAgICBsZXQgbmFtZSA9IFwidG9kYXlicm9rZXJhZ2VcIjtcclxuICAgICAgICBpZiAodGhpcy50b2RheWJyb2tlcmFnZXRkYXRhICYmIHRoaXMuY29udGVudC5nZXRDaGlsZEJ5TmFtZShuYW1lKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUobmFtZSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQWxsQ2hpbGRJbnRlcmFjdGFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzRGFpbHknLCB7IHBhZ2U6IDEsIHBhZ2Vfc2l6ZTogOCB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvZGF5YnJva2VyYWdldGRhdGEgPSBtc2c7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUobmFtZSkudGhlbih0b2RheWJyb2tlcmFnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0b2RheWJyb2tlcmFnZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGxDaGlsZEludGVyYWN0YWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSB0b2RheWJyb2tlcmFnZS5nZXRDb21wb25lbnQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQuaW5pdFVJKHRoaXMudG9kYXlicm9rZXJhZ2V0ZGF0YSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBSZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZWNvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuQWxsQ2hpbGRJbnRlcmFjdGFibGUoZmFsc2UpO1xyXG4gICAgICAgIGxldCBuYW1lID0gXCJoaXN0b3J5YnJva2VyYWdlXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeWJyb2tlcmFnZWRhdGEgJiYgdGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5nZXRDaGlsZEJ5TmFtZShuYW1lKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5BbGxDaGlsZEludGVyYWN0YWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZWNvcmQnLCB7IHBhZ2U6IDEsIHBhZ2Vfc2l6ZTogOCB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhpc3Rvcnlicm9rZXJhZ2VkYXRhID0gbXNnO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKG5hbWUpLnRoZW4oaGlzdG9yeWJyb2tlcmFnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5YnJva2VyYWdlLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkFsbENoaWxkSW50ZXJhY3RhYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGhpc3Rvcnlicm9rZXJhZ2UuZ2V0Q29tcG9uZW50KG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LmluaXRVSSh0aGlzLmhpc3Rvcnlicm9rZXJhZ2VkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBSZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NNZW1iZXIoKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuQWxsQ2hpbGRJbnRlcmFjdGFibGUoZmFsc2UpO1xyXG4gICAgICAgIGxldCBuYW1lID0gXCJzdWJvcmRpbmF0ZVwiO1xyXG4gICAgICAgIGlmICh0aGlzLnN1Ym9yZGluYXRlZGF0YSAmJiB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUobmFtZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKG5hbWUpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkFsbENoaWxkSW50ZXJhY3RhYmxlKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc01lbWJlcicsIHsgcGFnZTogMSwgcGFnZV9zaXplOiA4IH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vib3JkaW5hdGVkYXRhID0gbXNnO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKG5hbWUpLnRoZW4oc3Vib3JkaW5hdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3Vib3JkaW5hdGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQWxsQ2hpbGRJbnRlcmFjdGFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0ID0gc3Vib3JkaW5hdGUuZ2V0Q29tcG9uZW50KG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LmluaXRVSSh0aGlzLnN1Ym9yZGluYXRlZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzRmxvdygpIHtcclxuICAgICAgICB0aGlzLm9wZW5BbGxDaGlsZEludGVyYWN0YWJsZShmYWxzZSk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBcImdldHJlY29yZFwiO1xyXG4gICAgICAgIGlmICh0aGlzLmdldHJlY29yZGRhdGEgJiYgdGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5nZXRDaGlsZEJ5TmFtZShuYW1lKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5BbGxDaGlsZEludGVyYWN0YWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NGbG93JywgeyBwYWdlOiAxLCBwYWdlX3NpemU6IDggfSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRyZWNvcmRkYXRhID0gbXNnO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKG5hbWUpLnRoZW4oZ2V0cmVjb3JkID0+IHtcclxuICAgICAgICAgICAgICAgIGdldHJlY29yZC5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGxDaGlsZEludGVyYWN0YWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSBnZXRyZWNvcmQuZ2V0Q29tcG9uZW50KG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LmluaXRVSSh0aGlzLnBhbmRlY3RkYXRhLCB0aGlzLmdldHJlY29yZGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIFJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc0xldmVsKCkge1xyXG4gICAgICAgIHRoaXMub3BlbkFsbENoaWxkSW50ZXJhY3RhYmxlKGZhbHNlKTtcclxuICAgICAgICBsZXQgbmFtZSA9IFwicnVsZURldGFpbFwiO1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bGVEZXRhaWxkYXRhICYmIHRoaXMuY29udGVudC5nZXRDaGlsZEJ5TmFtZShuYW1lKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUobmFtZSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQWxsQ2hpbGRJbnRlcmFjdGFibGUodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJ1bGVEZXRhaWxkYXRhKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUobmFtZSkudGhlbihydWxlRGV0YWlsID0+IHtcclxuICAgICAgICAgICAgICAgIHJ1bGVEZXRhaWwucGFyZW50ID0gdGhpcy5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQWxsQ2hpbGRJbnRlcmFjdGFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0ID0gcnVsZURldGFpbC5nZXRDb21wb25lbnQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQuaW5pdFVJKHRoaXMucGFuZGVjdGRhdGEsIHRoaXMucnVsZURldGFpbGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NMZXZlbCcsIHt9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydWxlRGV0YWlsZGF0YSA9IG1zZztcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUobmFtZSkudGhlbihydWxlRGV0YWlsID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBydWxlRGV0YWlsLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGxDaGlsZEludGVyYWN0YWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NyaXB0ID0gcnVsZURldGFpbC5nZXRDb21wb25lbnQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmluaXRVSSh0aGlzLnBhbmRlY3RkYXRhLCB0aGlzLnJ1bGVEZXRhaWxkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYW5kZWN0X0NCKCkge1xyXG4gICAgICAgIHRoaXMuYWxsQ2hpbGRBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzcygpO1xyXG4gICAgfSxcclxuICAgIHRvZGF5YnJva2VyYWdlX0NCKCkge1xyXG4gICAgICAgIHRoaXMuYWxsQ2hpbGRBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc0RhaWx5KCk7XHJcbiAgICB9LFxyXG4gICAgaGlzdG9yeWJyb2tlcmFnZV9DQigpIHtcclxuICAgICAgICB0aGlzLmFsbENoaWxkQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5SZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZWNvcmQoKTtcclxuICAgIH0sXHJcbiAgICBzdWJvcmRpbmF0ZV9DQigpIHtcclxuICAgICAgICB0aGlzLmFsbENoaWxkQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5SZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NNZW1iZXIoKTtcclxuICAgIH0sXHJcbiAgICBnZXRyZWNvcmRfQ0IoKSB7XHJcbiAgICAgICAgdGhpcy5hbGxDaGlsZEFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMuUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzRmxvdygpO1xyXG4gICAgfSxcclxuICAgIGJvbnVzX0NCKCkge1xyXG4gICAgICAgIHRoaXMuYWxsQ2hpbGRBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc0xldmVsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFsbENoaWxkQWN0aXZlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQpIHJldHVybjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb3BlbkFsbENoaWxkSW50ZXJhY3RhYmxlKGJvbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3QuY2hpbGRyZW5Db3VudCkgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3QuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3QuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pbnRlcmFjdGFibGUgPSBib2w7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
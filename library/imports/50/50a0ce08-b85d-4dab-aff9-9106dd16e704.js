"use strict";
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
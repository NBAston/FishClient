
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/userinfoVip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '95cb3zE6uZNR6yTsM5/9ZmX', 'userinfoVip');
// modules/plaza/script/prefab/userInfo/userinfoVip.js

"use strict";

var AWARD_TYPE = {
  UP: 1,
  WEEK: 2,
  MONTH: 3
};
glGame.baseclass.extend({
  properties: {
    lab_viplevel1: cc.Label,
    //左边图标的等级 显示当前VIP等级
    lab_viplevel2: cc.Label,
    //右边图标的等级 显示下一个VIP等级
    node_nextVipLayout: cc.Node,
    //next viplevel
    node_nextVipMaxLevel: cc.Node,
    node_vipTip: cc.Node,
    node_vipMaxTip: cc.Node,
    lab_vipExpTip: cc.Label,
    //升级提示
    lab_vipExpTypeTip: cc.Label,
    //升级提示
    lab_vipLevelTip: cc.Label,
    //升级提示
    progress: cc.Sprite,
    //进度条
    //说明界面
    imgGetStates: [cc.SpriteFrame],
    pageView: cc.PageView,
    content: cc.Node,
    item: cc.Node,
    levelInfo: cc.Node,
    curVip: cc.Label,
    normalMaterial: cc.Material,
    grayMaterial: cc.Material
  },
  onLoad: function onLoad() {
    this.vipList = null; // vip信息列表

    this.userinfo = null;
    this.upgradeType = 0;
    this.showData = null;
    this.showInfoLevel = null; // 当前vip等级

    this.vipCount = 0;
    this.registerEvent();
    this.ReqVipInfo();
    this.pageView.node.on("scroll-ended", this.onPageScrollEnd, this);
  },
  start: function start() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on("notifyReqVipInfo", this.ReqVipInfo, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("notifyReqVipInfo", this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  initUI: function initUI() {
    this.initLevelInfoUI();
    this.setLevelInfo();
    this.initAwardInfo();
  },
  initLevelInfoUI: function initLevelInfoUI() {
    this.levelInfo.getChildByName("img_viptubiaonext").active = true;
    var data = this.userinfo;
    var level,
        ismaxLevel = false,
        nextlevel;

    for (var i = 0; i < this.vipList.length; i++) {
      if (this.vipList[i].id == data.vipId) {
        level = this.vipList[i].vipName;
        ismaxLevel = i == this.vipList.length - 1;
        nextlevel = i == this.vipList.length - 1 ? "" : this.vipList[i + 1].vipName;
        break;
      }
    }

    this.lab_viplevel1.string = "VIP " + level;
    this.lab_viplevel2.string = "VIP " + nextlevel;
    var exp = 0;
    var progressWidth = 718;

    if (Number(this.upgradeType) == 1) {
      exp = data.recharge - data.rechargeSum >= 0 ? data.recharge - data.rechargeSum : 0;
      this.progress.node.width = data.rechargeSum / data.recharge == 0 ? 0.001 * progressWidth : data.rechargeSum / data.recharge * progressWidth;
      this.lab_vipExpTypeTip.string = "充值金额";
      this.lab_vipExpTip.string = this.cutFloat(exp);
      this.lab_vipLevelTip.string = nextlevel;
    } else {
      exp = data.betting - data.bettingSum >= 0 ? data.betting - data.bettingSum : 0;
      this.progress.node.width = data.bettingSum / data.betting == 0 ? 0.001 * progressWidth : data.bettingSum / data.betting * progressWidth;
      this.lab_vipExpTypeTip.string = "打码量";
      this.lab_vipExpTip.string = this.cutFloat(exp);
      this.lab_vipLevelTip.string = nextlevel;
    }

    this.node_vipTip.active = !ismaxLevel;
    this.node_vipMaxTip.active = !!ismaxLevel;
    this.node_nextVipLayout.active = !ismaxLevel;
    this.node_nextVipMaxLevel.active = !!ismaxLevel;
    if (ismaxLevel) this.progress.node.width = progressWidth;
  },
  // 设置vip等级信息
  setLevelInfo: function setLevelInfo() {
    var vipInfo = this.vipList[this.showInfoLevel];
    var level = vipInfo.vipName;
    var nextlevel;

    if (this.showInfoLevel < this.vipList.length - 1) {
      nextlevel = this.vipList[this.showInfoLevel + 1].vipName;
    }

    var frame = this.node.getChildByName("frame_grzx");
    var leftBtn = frame.getChildByName("left");
    var rightBtn = frame.getChildByName("right");
    leftBtn.active = this.showInfoLevel != 0;
    leftBtn.getChildByName("lv").getComponent(cc.Label).string = level - 1;
    rightBtn.active = nextlevel != undefined;

    if (nextlevel) {
      rightBtn.getChildByName("lv").getComponent(cc.Label).string = nextlevel;
    }

    this.curVip.string = "VIP".concat(vipInfo.vipName, "\u4E13\u5C5E\u6743\u76CA");
    this.curVip.node.active = true;
  },
  // 设置奖励 分三页循环滚动
  initAwardInfo: function initAwardInfo() {
    var nCount = this.vipCount;
    var curLv = this.showInfoLevel;
    this.showData = this.vipList[this.showInfoLevel];

    if (this.content.childrenCount == 0) {
      for (var i = 0; i < 3; i++) {
        var pageNode = cc.instantiate(this.item);
        pageNode.active = true;
        pageNode.name = "imte".concat(i);
        this.pageView.addPage(pageNode);
      } // 初始化时滚动到玩家当前等级的页面


      if (curLv == 0) {
        this.pageView.scrollToPage(0, 0);
      } else if (curLv == nCount - 1) {
        this.pageView.scrollToPage(2, 0);
      } else {
        this.pageView.scrollToPage(1, 0);
      }
    }

    var startIndex = curLv - 1;

    if (curLv == 0) {
      startIndex = 0;
    } else if (curLv == nCount - 1) {
      startIndex = curLv - 2;
    }

    for (var _i = 0; _i < 3; _i++) {
      var _pageNode = this.content.children[_i];
      this.showPageInfo(_pageNode, this.vipList[startIndex + _i]);
    }

    var frame = this.node.getChildByName("frame_grzx"); // 判断左侧按钮是否显示红点

    var leftInfo = this.vipList[startIndex];

    if (curLv == nCount - 1) {
      leftInfo = this.vipList[startIndex + 1];
    }

    if (this.isCanGet(leftInfo)) {
      frame.getChildByName("left").getChildByName("red_dot").active = true;
    } else {
      frame.getChildByName("left").getChildByName("red_dot").active = false;
    } // 判断右侧是否显示红点


    var rightInfo = this.vipList[startIndex + 2];

    if (curLv == 0) {
      rightInfo = this.vipList[startIndex + 1];
    }

    if (this.isCanGet(rightInfo)) {
      frame.getChildByName("right").getChildByName("red_dot").active = true;
    } else {
      frame.getChildByName("right").getChildByName("red_dot").active = false;
    }
  },
  // 是否可以领取
  isCanGet: function isCanGet(vipInfo) {
    if (vipInfo.unclaimed == 2 && vipInfo.bonusUpgrade > 0) {
      return true;
    }

    if (vipInfo.unclaimedWeek == 2 && vipInfo.bonusWeekDiff > 0) {
      return true;
    }

    if (vipInfo.unclaimedMonth == 2 && vipInfo.bonusMonthDiff) {
      return true;
    }

    return false;
  },
  // 显示每页信息
  showPageInfo: function showPageInfo(pageNode, vipInfo) {
    var award = pageNode.getChildByName("award"); // 晋级礼金

    var upAward = award.getChildByName("btn_upaward");
    upAward.getChildByName("awardcoin").getComponent(cc.Label).string = this.cutFloat(vipInfo.bonusUpgrade); // 周礼金

    var weekAward = award.getChildByName("btn_weekaward");
    weekAward.getChildByName("awardcoin").getComponent(cc.Label).string = this.cutFloat(vipInfo.bonusWeek); // 月礼金

    var monthAward = award.getChildByName("btn_monthaward");
    monthAward.getChildByName("awardcoin").getComponent(cc.Label).string = this.cutFloat(vipInfo.bonusMonth);
    var otherAward = pageNode.getChildByName("otherAward"); // 余额宝

    var blanceAward = otherAward.getChildByName("btn_blanceaward");
    var temp = (Number(vipInfo.balance) / 100 * 365).toFixed(2).toString();
    blanceAward.getChildByName("awardcoin").getComponent(cc.Label).string = "".concat(temp, "%"); // 返水奖励

    var ratioAward = otherAward.getChildByName("btn_ratioaward");
    ratioAward.getChildByName("awardcoin").getComponent(cc.Label).string = "".concat(this.cutFloat(vipInfo.returnRatio), "%"); // 设置晋级礼金状态

    this.setUpAwardState(upAward, vipInfo.unclaimed, vipInfo, vipInfo.bonusUpgrade); // 设置周礼金状态

    this.setWeekAwardState(weekAward, vipInfo.unclaimedWeek, vipInfo, glGame.tips.VIPAWARD.WEEKTIPS, this.userinfo.weekIsReceive, vipInfo.bonusWeekDiff); // 设置月礼金状态

    this.setWeekAwardState(monthAward, vipInfo.unclaimedMonth, vipInfo, glGame.tips.VIPAWARD.MONTHTIPS, this.userinfo.monthIsReceive, vipInfo.bonusMonthDiff);
  },
  //状态，1已领取，2可领取，3暂不可领取
  setUpAwardState: function setUpAwardState(nodeObj, unclaimed, vipInfo, bonusUpgrade) {
    nodeObj.getComponent(cc.Button).interactable = unclaimed == 2; // 按钮领取状态

    var btnGet = nodeObj.getChildByName("btn_get");
    this.setButtonMaterial(btnGet, unclaimed == 2);
    btnGet.getComponent(cc.Button).interactable = unclaimed == 2;
    btnGet.getChildByName("red").active = unclaimed == 2;
    btnGet.getChildByName("img_lq").getComponent(cc.Sprite).spriteFrame = this.imgGetStates[unclaimed];

    if (vipInfo.id == 1 || bonusUpgrade <= 0) {
      btnGet.getChildByName("img_lq").getComponent(cc.Sprite).spriteFrame = this.imgGetStates[3];
      btnGet.getChildByName("red").active = false;
    } // 奖励图标


    nodeObj.getChildByName("img_awardicon").active = unclaimed == 2;
    nodeObj.getChildByName("img_awardicon_grey").active = unclaimed != 2; // 奖励金额

    var awardcoin = nodeObj.getChildByName("awardcoin");
    awardcoin.color = unclaimed == 2 ? new cc.Color(254, 192, 17) : new cc.Color(0x8f, 0x8f, 0x8f); // 标题

    var title_gray = nodeObj.getChildByName("title_gray");
    title_gray.active = unclaimed != 2; // 奖励说明

    var explain = nodeObj.getChildByName("explain");

    switch (unclaimed) {
      case 1:
        explain.active = false;
        break;

      case 2:
        explain.active = true;
        explain.getComponent(cc.Label).string = "";
        break;

      case 3:
        explain.active = true;
        explain.getComponent(cc.Label).string = glGame.tips.VIPAWARD.LVGETCONDITION.format(vipInfo.vipName);
        break;
    }
  },
  // 设置周礼金和月礼金
  //状态，1已领取，2可领取，3暂不可领取
  setWeekAwardState: function setWeekAwardState(nodeObj, unclaimed, vipInfo, describle, userUnclaimed, bonus) {
    // 面板已领取或者等级条件不满足置灰 单纯置灰 还是可以点击
    if (unclaimed == 1 || this.userinfo.vipId < vipInfo.id) {
      this.setPanelState(nodeObj, false);
    } else {
      this.setPanelState(nodeObj, true);
    } // 等级不满足时不可点击


    nodeObj.getComponent(cc.Button).interactable = this.userinfo.vipId >= vipInfo.id;

    if (userUnclaimed == 2 && this.userinfo.vipId >= vipInfo.id && vipInfo.id != 1) {
      unclaimed = 2;
    } // 按钮领取状态


    var btnGet = nodeObj.getChildByName("btn_get");
    btnGet.getChildByName("img_lq").getComponent(cc.Sprite).spriteFrame = this.imgGetStates[unclaimed]; // 只要vip等级达到 就设置为高亮状态

    if (this.userinfo.vipId >= vipInfo.id) {
      this.setButtonMaterial(btnGet, true);
      btnGet.getComponent(cc.Button).interactable = true; // vip等级达到 如果不是可领取状态或者可领取金额为0则显示为查看详情

      if (unclaimed != 2 || userUnclaimed != 2) {
        btnGet.getChildByName("img_lq").getComponent(cc.Sprite).spriteFrame = this.imgGetStates[0];
      }
    } // 可领取显示红点


    btnGet.getChildByName("red").active = unclaimed == 2 && userUnclaimed == 2 && bonus > 0; // 描述

    var explain = nodeObj.getChildByName("explain").getComponent(cc.Label);

    if (unclaimed == 2) {
      explain.string = "";
    } else if (this.userinfo.vipId >= vipInfo.id && unclaimed == 3) {
      explain.string = glGame.tips.VIPAWARD.CANNOTGETTIPS;
    } else {
      explain.string = describle;
    } // vip0特殊处理


    if (vipInfo.id == 1 || bonus == 0 && this.userinfo.vipId >= vipInfo.id) {
      btnGet.getChildByName("img_lq").getComponent(cc.Sprite).spriteFrame = this.imgGetStates[0]; // 按钮显示查看详情

      this.setPanelState(nodeObj, true);
    }

    if (bonus <= 0) {
      explain.string = describle;
    }
  },
  // 设置面板状态
  setPanelState: function setPanelState(nodeObj, bEnable) {
    this.setButtonMaterial(nodeObj.getChildByName("bg"), bEnable); // 按钮领取状态

    this.setButtonMaterial(nodeObj.getChildByName("btn_get"), bEnable);
    nodeObj.getChildByName("btn_get").getComponent(cc.Button).interactable = bEnable; // 奖励图标

    this.setButtonMaterial(nodeObj.getChildByName("img_awardicon"), bEnable); // 奖励金额

    var awardcoin = nodeObj.getChildByName("awardcoin");
    awardcoin.color = bEnable ? new cc.Color(254, 192, 17) : new cc.Color(0x8f, 0x8f, 0x8f); // 标题

    this.setButtonMaterial(nodeObj.getChildByName("title"), bEnable);
  },
  setButtonMaterial: function setButtonMaterial(node, bEnable) {
    if (bEnable) {
      node.getComponent(cc.RenderComponent).setMaterial(0, this.normalMaterial);
    } else {
      node.getComponent(cc.RenderComponent).setMaterial(0, this.grayMaterial);
    }
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_upaward":
        this.caijin_cb();
        break;

      case "btn_weekaward":
        this.week_cb();
        break;

      case "btn_monthaward":
        this.month_cb();
        break;

      case "btn_detail":
        this.detail_cb();
        break;

      case "left":
        this.left_cb();
        break;

      case "right":
        this.right_cb();
        break;

      case "btn_ratioaward":
        this.ratio_cb();
        break;

      case "btn_blanceaward":
        this.blance_cb();
        break;

      case "btn_get":
        this.btnGet_cb(node);
        break;
    }
  },
  btnGet_cb: function btnGet_cb(node) {
    var name = node.parent.name;

    switch (name) {
      case "btn_upaward":
        this.caijin_cb();
        break;

      case "btn_weekaward":
        this.week_cb();
        break;

      case "btn_monthaward":
        this.month_cb();
        break;
    }
  },
  // pageview滚动结束
  onPageScrollEnd: function onPageScrollEnd() {
    var curPage = this.pageView.getCurrentPageIndex();

    switch (curPage) {
      case 0:
        if (this.showInfoLevel > 0) {
          this.showInfoLevel--;
        }

        break;

      case 2:
        if (this.showInfoLevel < this.vipList.length - 1) {
          this.showInfoLevel++;
        }

        break;

      case 1:
        if (this.showInfoLevel == 0) {
          this.showInfoLevel++;
        } else if (this.showInfoLevel == this.vipList.length - 1) {
          this.showInfoLevel--;
        }

        break;
    } // 滚动到中间一页


    this.pageView.stopAutoScroll();

    if (this.showInfoLevel == 0) {
      this.pageView.scrollToPage(0, 0);
    } else if (this.showInfoLevel == this.vipList.length - 1) {
      this.pageView.scrollToPage(2, 0);
    } else {
      this.pageView.scrollToPage(1, 0);
    }

    this.initUI();
  },
  caijin_cb: function caijin_cb() {
    this.ReqVipReward(AWARD_TYPE.UP, this.showData.id);
  },
  week_cb: function week_cb() {
    var _this = this;

    var vipName = "userinfoVipGet";
    glGame.panel.showPanelByName(vipName).then(function (panel) {
      panel.getComponent(vipName).showWeekGift(_this.vipList, _this.userinfo);
    });
  },
  month_cb: function month_cb() {
    var _this2 = this;

    var vipName = "userinfoVipGet";
    glGame.panel.showPanelByName(vipName).then(function (panel) {
      panel.getComponent(vipName).showMonthGift(_this2.vipList, _this2.userinfo);
    });
  },
  detail_cb: function detail_cb() {
    var _this3 = this;

    var vipName = "userinfoVipRight";
    glGame.panel.showPanelByName(vipName).then(function (panel) {
      panel.getComponent(vipName).showVipRight(_this3.vipList, Number(_this3.upgradeType));
      ;
    });
  },
  left_cb: function left_cb() {
    if (this.showInfoLevel <= 0) {
      return;
    }

    this.pageView.scrollToPage(0);
  },
  right_cb: function right_cb() {
    var nCount = this.vipList.length;

    if (this.showInfoLevel >= nCount - 1) {
      return;
    }

    this.pageView.scrollToPage(2);
  },
  ratio_cb: function ratio_cb() {
    glGame.panel.showPanelByName('backWater');
  },
  blance_cb: function blance_cb() {
    glGame.panel.showPanelByName('yubao');
  },
  ReqVipInfo: function ReqVipInfo() {
    var _this4 = this;

    glGame.gameNet.send_msg('http.ReqVipInfo', null, function (route, data) {
      var result = data.result;
      _this4.vipList = result.vipList;

      _this4.vipList.sort(function (a, b) {
        return a.vipName - b.vipName;
      });

      for (var k in _this4.vipList) {
        _this4.vipList[k].id = _this4.vipList[k].vipName + 1;
      }

      _this4.userinfo = result.userInfo;
      _this4.upgradeType = result.upgradeType;

      if (!_this4.showInfoLevel) {
        for (var i = 0; i < _this4.vipList.length; i++) {
          if (_this4.vipList[i].id == _this4.userinfo.vipId) {
            _this4.showInfoLevel = i;
            _this4.vipCount = _this4.vipList.length;
            break;
          }
        }
      } //做一层校验，有可能在未结算时不计算打码量时，


      _this4.showData = _this4.vipList[_this4.showInfoLevel];

      _this4.initUI();

      glGame.emitter.emit("notifyVipInfo", data.result);
    });
  },
  //领取 1彩金，2周礼金，3月礼金
  ReqVipReward: function ReqVipReward(type, vipid) {
    var _this5 = this;

    var msg = {
      "type": type,
      "vip_id": vipid
    };
    glGame.gameNet.send_msg('http.ReqVipReward', msg, function (route, data) {
      if (data.result) {
        glGame.user.ReqRedDot();
        glGame.user.reqGetCoin();

        _this5.ReqVipInfo();

        var strTitle = "";
        if (type == AWARD_TYPE.UP) strTitle = glGame.tips.VIPAWARD.UPAWARD;else if (type == AWARD_TYPE.WEEK) strTitle = glGame.tips.VIPAWARD.WEEKAWARD;else if (type == AWARD_TYPE.MONTH) strTitle = glGame.tips.VIPAWARD.MONTHAWARD;
        glGame.panel.showAwardBox(strTitle, [{
          type: glGame.awardtype.COIN,
          value: _this5.cutFloat(data.coin)
        }]);
      }
    });
  },
  //截取小数点后2位
  cutFloat: function cutFloat(value) {
    if (typeof value !== 'string' && typeof value !== 'number') return;
    return (Math.floor(parseFloat(value)) / 100).toFixed(2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xcdXNlcmluZm9WaXAuanMiXSwibmFtZXMiOlsiQVdBUkRfVFlQRSIsIlVQIiwiV0VFSyIsIk1PTlRIIiwiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImxhYl92aXBsZXZlbDEiLCJjYyIsIkxhYmVsIiwibGFiX3ZpcGxldmVsMiIsIm5vZGVfbmV4dFZpcExheW91dCIsIk5vZGUiLCJub2RlX25leHRWaXBNYXhMZXZlbCIsIm5vZGVfdmlwVGlwIiwibm9kZV92aXBNYXhUaXAiLCJsYWJfdmlwRXhwVGlwIiwibGFiX3ZpcEV4cFR5cGVUaXAiLCJsYWJfdmlwTGV2ZWxUaXAiLCJwcm9ncmVzcyIsIlNwcml0ZSIsImltZ0dldFN0YXRlcyIsIlNwcml0ZUZyYW1lIiwicGFnZVZpZXciLCJQYWdlVmlldyIsImNvbnRlbnQiLCJpdGVtIiwibGV2ZWxJbmZvIiwiY3VyVmlwIiwibm9ybWFsTWF0ZXJpYWwiLCJNYXRlcmlhbCIsImdyYXlNYXRlcmlhbCIsIm9uTG9hZCIsInZpcExpc3QiLCJ1c2VyaW5mbyIsInVwZ3JhZGVUeXBlIiwic2hvd0RhdGEiLCJzaG93SW5mb0xldmVsIiwidmlwQ291bnQiLCJyZWdpc3RlckV2ZW50IiwiUmVxVmlwSW5mbyIsIm5vZGUiLCJvbiIsIm9uUGFnZVNjcm9sbEVuZCIsInN0YXJ0IiwiZW1pdHRlciIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsIk9uRGVzdHJveSIsImluaXRVSSIsImluaXRMZXZlbEluZm9VSSIsInNldExldmVsSW5mbyIsImluaXRBd2FyZEluZm8iLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsImRhdGEiLCJsZXZlbCIsImlzbWF4TGV2ZWwiLCJuZXh0bGV2ZWwiLCJpIiwibGVuZ3RoIiwiaWQiLCJ2aXBJZCIsInZpcE5hbWUiLCJzdHJpbmciLCJleHAiLCJwcm9ncmVzc1dpZHRoIiwiTnVtYmVyIiwicmVjaGFyZ2UiLCJyZWNoYXJnZVN1bSIsIndpZHRoIiwiY3V0RmxvYXQiLCJiZXR0aW5nIiwiYmV0dGluZ1N1bSIsInZpcEluZm8iLCJmcmFtZSIsImxlZnRCdG4iLCJyaWdodEJ0biIsImdldENvbXBvbmVudCIsInVuZGVmaW5lZCIsIm5Db3VudCIsImN1ckx2IiwiY2hpbGRyZW5Db3VudCIsInBhZ2VOb2RlIiwiaW5zdGFudGlhdGUiLCJuYW1lIiwiYWRkUGFnZSIsInNjcm9sbFRvUGFnZSIsInN0YXJ0SW5kZXgiLCJjaGlsZHJlbiIsInNob3dQYWdlSW5mbyIsImxlZnRJbmZvIiwiaXNDYW5HZXQiLCJyaWdodEluZm8iLCJ1bmNsYWltZWQiLCJib251c1VwZ3JhZGUiLCJ1bmNsYWltZWRXZWVrIiwiYm9udXNXZWVrRGlmZiIsInVuY2xhaW1lZE1vbnRoIiwiYm9udXNNb250aERpZmYiLCJhd2FyZCIsInVwQXdhcmQiLCJ3ZWVrQXdhcmQiLCJib251c1dlZWsiLCJtb250aEF3YXJkIiwiYm9udXNNb250aCIsIm90aGVyQXdhcmQiLCJibGFuY2VBd2FyZCIsInRlbXAiLCJiYWxhbmNlIiwidG9GaXhlZCIsInRvU3RyaW5nIiwicmF0aW9Bd2FyZCIsInJldHVyblJhdGlvIiwic2V0VXBBd2FyZFN0YXRlIiwic2V0V2Vla0F3YXJkU3RhdGUiLCJ0aXBzIiwiVklQQVdBUkQiLCJXRUVLVElQUyIsIndlZWtJc1JlY2VpdmUiLCJNT05USFRJUFMiLCJtb250aElzUmVjZWl2ZSIsIm5vZGVPYmoiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJidG5HZXQiLCJzZXRCdXR0b25NYXRlcmlhbCIsInNwcml0ZUZyYW1lIiwiYXdhcmRjb2luIiwiY29sb3IiLCJDb2xvciIsInRpdGxlX2dyYXkiLCJleHBsYWluIiwiTFZHRVRDT05ESVRJT04iLCJmb3JtYXQiLCJkZXNjcmlibGUiLCJ1c2VyVW5jbGFpbWVkIiwiYm9udXMiLCJzZXRQYW5lbFN0YXRlIiwiQ0FOTk9UR0VUVElQUyIsImJFbmFibGUiLCJSZW5kZXJDb21wb25lbnQiLCJzZXRNYXRlcmlhbCIsIm9uQ2xpY2siLCJjYWlqaW5fY2IiLCJ3ZWVrX2NiIiwibW9udGhfY2IiLCJkZXRhaWxfY2IiLCJsZWZ0X2NiIiwicmlnaHRfY2IiLCJyYXRpb19jYiIsImJsYW5jZV9jYiIsImJ0bkdldF9jYiIsInBhcmVudCIsImN1clBhZ2UiLCJnZXRDdXJyZW50UGFnZUluZGV4Iiwic3RvcEF1dG9TY3JvbGwiLCJSZXFWaXBSZXdhcmQiLCJwYW5lbCIsInNob3dQYW5lbEJ5TmFtZSIsInRoZW4iLCJzaG93V2Vla0dpZnQiLCJzaG93TW9udGhHaWZ0Iiwic2hvd1ZpcFJpZ2h0IiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJyZXN1bHQiLCJzb3J0IiwiYSIsImIiLCJrIiwidXNlckluZm8iLCJlbWl0IiwidHlwZSIsInZpcGlkIiwibXNnIiwidXNlciIsIlJlcVJlZERvdCIsInJlcUdldENvaW4iLCJzdHJUaXRsZSIsIlVQQVdBUkQiLCJXRUVLQVdBUkQiLCJNT05USEFXQVJEIiwic2hvd0F3YXJkQm94IiwiYXdhcmR0eXBlIiwiQ09JTiIsInZhbHVlIiwiY29pbiIsIk1hdGgiLCJmbG9vciIsInBhcnNlRmxvYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsVUFBVSxHQUFHO0FBQ2ZDLEVBQUFBLEVBQUUsRUFBRSxDQURXO0FBRWZDLEVBQUFBLElBQUksRUFBRSxDQUZTO0FBR2ZDLEVBQUFBLEtBQUssRUFBRTtBQUhRLENBQW5CO0FBTUFDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxhQUFhLEVBQUVDLEVBQUUsQ0FBQ0MsS0FEVjtBQUN3QjtBQUNoQ0MsSUFBQUEsYUFBYSxFQUFFRixFQUFFLENBQUNDLEtBRlY7QUFFd0I7QUFFaENFLElBQUFBLGtCQUFrQixFQUFFSCxFQUFFLENBQUNJLElBSmY7QUFJNEI7QUFDcENDLElBQUFBLG9C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LENBQUNpSCxJQUFQLENBQVlDLFFBQVosQ0FBcUJnRSxPQUFoQyxDQUEzQixLQUNLLElBQUlQLElBQUksSUFBSS9LLFVBQVUsQ0FBQ0UsSUFBdkIsRUFBNkJtTCxRQUFRLEdBQUdqTCxNQUFNLENBQUNpSCxJQUFQLENBQVlDLFFBQVosQ0FBcUJpRSxTQUFoQyxDQUE3QixLQUNBLElBQUlSLElBQUksSUFBSS9LLFVBQVUsQ0FBQ0csS0FBdkIsRUFBOEJrTCxRQUFRLEdBQUdqTCxNQUFNLENBQUNpSCxJQUFQLENBQVlDLFFBQVosQ0FBcUJrRSxVQUFoQztBQUNuQ3BMLFFBQUFBLE1BQU0sQ0FBQzJKLEtBQVAsQ0FBYTBCLFlBQWIsQ0FBMEJKLFFBQTFCLEVBQW9DLENBQUM7QUFBRU4sVUFBQUEsSUFBSSxFQUFFM0ssTUFBTSxDQUFDc0wsU0FBUCxDQUFpQkMsSUFBekI7QUFBK0JDLFVBQUFBLEtBQUssRUFBRSxNQUFJLENBQUNwSCxRQUFMLENBQWNoQixJQUFJLENBQUNxSSxJQUFuQjtBQUF0QyxTQUFELENBQXBDO0FBQ0g7QUFDSixLQVhEO0FBWUgsR0EzZ0JtQjtBQTZnQnBCO0FBQ0FySCxFQUFBQSxRQTlnQm9CLG9CQThnQlhvSCxLQTlnQlcsRUE4Z0JKO0FBQ1osUUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLElBQTZCLE9BQU9BLEtBQVAsS0FBaUIsUUFBbEQsRUFBNEQ7QUFDNUQsV0FBTyxDQUFDRSxJQUFJLENBQUNDLEtBQUwsQ0FBV0MsVUFBVSxDQUFDSixLQUFELENBQXJCLElBQWdDLEdBQWpDLEVBQXNDN0UsT0FBdEMsQ0FBOEMsQ0FBOUMsQ0FBUDtBQUNIO0FBamhCbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCBBV0FSRF9UWVBFID0ge1xyXG4gICAgVVA6IDEsXHJcbiAgICBXRUVLOiAyLFxyXG4gICAgTU9OVEg6IDNcclxufVxyXG5cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhYl92aXBsZXZlbDE6IGNjLkxhYmVsLCAgICAgICAgLy/lt6bovrnlm77moIfnmoTnrYnnuqcg5pi+56S65b2T5YmNVklQ562J57qnXHJcbiAgICAgICAgbGFiX3ZpcGxldmVsMjogY2MuTGFiZWwsICAgICAgICAvL+WPs+i+ueWbvuagh+eahOetiee6pyDmmL7npLrkuIvkuIDkuKpWSVDnrYnnuqdcclxuXHJcbiAgICAgICAgbm9kZV9uZXh0VmlwTGF5b3V0OiBjYy5Ob2RlLCAgICAgICAgLy9uZXh0IHZpcGxldmVsXHJcbiAgICAgICAgbm9kZV9uZXh0VmlwTWF4TGV2ZWw6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIG5vZGVfdmlwVGlwOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfdmlwTWF4VGlwOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxhYl92aXBFeHBUaXA6IGNjLkxhYmVsLCAgICAgICAgLy/ljYfnuqfmj5DnpLpcclxuICAgICAgICBsYWJfdmlwRXhwVHlwZVRpcDogY2MuTGFiZWwsICAgIC8v5Y2H57qn5o+Q56S6XHJcbiAgICAgICAgbGFiX3ZpcExldmVsVGlwOiBjYy5MYWJlbCwgICAgICAvL+WNh+e6p+aPkOekulxyXG5cclxuICAgICAgICBwcm9ncmVzczogY2MuU3ByaXRlLCAgICAgICAgICAgIC8v6L+b5bqm5p2hXHJcblxyXG4gICAgICAgIC8v6K+05piO55WM6Z2iXHJcbiAgICAgICAgaW1nR2V0U3RhdGVzOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHBhZ2VWaWV3OiBjYy5QYWdlVmlldyxcclxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIGl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgbGV2ZWxJbmZvOiBjYy5Ob2RlLFxyXG4gICAgICAgIGN1clZpcDogY2MuTGFiZWwsXHJcbiAgICAgICAgbm9ybWFsTWF0ZXJpYWw6IGNjLk1hdGVyaWFsLFxyXG4gICAgICAgIGdyYXlNYXRlcmlhbDogY2MuTWF0ZXJpYWwsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMudmlwTGlzdCA9IG51bGw7ICAgICAgICAvLyB2aXDkv6Hmga/liJfooahcclxuICAgICAgICB0aGlzLnVzZXJpbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLnVwZ3JhZGVUeXBlID0gMDtcclxuICAgICAgICB0aGlzLnNob3dEYXRhID0gbnVsbDsgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaG93SW5mb0xldmVsID0gbnVsbDsgIC8vIOW9k+WJjXZpcOetiee6p1xyXG4gICAgICAgIHRoaXMudmlwQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuUmVxVmlwSW5mbygpO1xyXG5cclxuICAgICAgICB0aGlzLnBhZ2VWaWV3Lm5vZGUub24oXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblBhZ2VTY3JvbGxFbmQsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwibm90aWZ5UmVxVmlwSW5mb1wiLCB0aGlzLlJlcVZpcEluZm8sIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJub3RpZnlSZXFWaXBJbmZvXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0TGV2ZWxJbmZvVUkoKTtcclxuICAgICAgICB0aGlzLnNldExldmVsSW5mbygpO1xyXG4gICAgICAgIHRoaXMuaW5pdEF3YXJkSW5mbygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0TGV2ZWxJbmZvVUkoKSB7XHJcbiAgICAgICAgdGhpcy5sZXZlbEluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfdmlwdHViaWFvbmV4dFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy51c2VyaW5mbztcclxuICAgICAgICBsZXQgbGV2ZWwsIGlzbWF4TGV2ZWwgPSBmYWxzZSwgbmV4dGxldmVsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aXBMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcExpc3RbaV0uaWQgPT0gZGF0YS52aXBJZCkge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwgPSB0aGlzLnZpcExpc3RbaV0udmlwTmFtZTtcclxuICAgICAgICAgICAgICAgIGlzbWF4TGV2ZWwgPSBpID09IHRoaXMudmlwTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgbmV4dGxldmVsID0gaSA9PSB0aGlzLnZpcExpc3QubGVuZ3RoIC0gMSA/IFwiXCIgOiB0aGlzLnZpcExpc3RbaSArIDFdLnZpcE5hbWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhYl92aXBsZXZlbDEuc3RyaW5nID0gXCJWSVAgXCIgKyBsZXZlbDtcclxuICAgICAgICB0aGlzLmxhYl92aXBsZXZlbDIuc3RyaW5nID0gXCJWSVAgXCIgKyBuZXh0bGV2ZWw7XHJcbiAgICAgICAgbGV0IGV4cCA9IDA7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzV2lkdGggPSA3MTg7XHJcbiAgICAgICAgaWYgKE51bWJlcih0aGlzLnVwZ3JhZGVUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGV4cCA9IChkYXRhLnJlY2hhcmdlIC0gZGF0YS5yZWNoYXJnZVN1bSkgPj0gMCA/IChkYXRhLnJlY2hhcmdlIC0gZGF0YS5yZWNoYXJnZVN1bSkgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLm5vZGUud2lkdGggPSBkYXRhLnJlY2hhcmdlU3VtIC8gZGF0YS5yZWNoYXJnZSA9PSAwID8gMC4wMDEgKiBwcm9ncmVzc1dpZHRoIDogZGF0YS5yZWNoYXJnZVN1bSAvIGRhdGEucmVjaGFyZ2UgKiBwcm9ncmVzc1dpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmxhYl92aXBFeHBUeXBlVGlwLnN0cmluZyA9IFwi5YWF5YC86YeR6aKdXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX3ZpcEV4cFRpcC5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGV4cCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX3ZpcExldmVsVGlwLnN0cmluZyA9IG5leHRsZXZlbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBleHAgPSAoZGF0YS5iZXR0aW5nIC0gZGF0YS5iZXR0aW5nU3VtKSA+PSAwID8gKGRhdGEuYmV0dGluZyAtIGRhdGEuYmV0dGluZ1N1bSkgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLm5vZGUud2lkdGggPSBkYXRhLmJldHRpbmdTdW0gLyBkYXRhLmJldHRpbmcgPT0gMCA/IDAuMDAxICogcHJvZ3Jlc3NXaWR0aCA6IGRhdGEuYmV0dGluZ1N1bSAvIGRhdGEuYmV0dGluZyAqIHByb2dyZXNzV2lkdGg7IFxyXG4gICAgICAgICAgICB0aGlzLmxhYl92aXBFeHBUeXBlVGlwLnN0cmluZyA9IFwi5omT56CB6YePXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX3ZpcEV4cFRpcC5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGV4cCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX3ZpcExldmVsVGlwLnN0cmluZyA9IG5leHRsZXZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9kZV92aXBUaXAuYWN0aXZlID0gIWlzbWF4TGV2ZWw7XHJcbiAgICAgICAgdGhpcy5ub2RlX3ZpcE1heFRpcC5hY3RpdmUgPSAhIWlzbWF4TGV2ZWw7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZV9uZXh0VmlwTGF5b3V0LmFjdGl2ZSA9ICFpc21heExldmVsO1xyXG4gICAgICAgIHRoaXMubm9kZV9uZXh0VmlwTWF4TGV2ZWwuYWN0aXZlID0gISFpc21heExldmVsO1xyXG5cclxuICAgICAgICBpZiAoaXNtYXhMZXZlbCkgdGhpcy5wcm9ncmVzcy5ub2RlLndpZHRoID0gcHJvZ3Jlc3NXaWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572udmlw562J57qn5L+h5oGvXHJcbiAgICBzZXRMZXZlbEluZm8oKSB7XHJcbiAgICAgICAgbGV0IHZpcEluZm8gPSB0aGlzLnZpcExpc3RbdGhpcy5zaG93SW5mb0xldmVsXTtcclxuICAgICAgICBsZXQgbGV2ZWwgPSB2aXBJbmZvLnZpcE5hbWU7XHJcbiAgICAgICAgbGV0IG5leHRsZXZlbDtcclxuICAgICAgICBpZih0aGlzLnNob3dJbmZvTGV2ZWwgPCB0aGlzLnZpcExpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBuZXh0bGV2ZWwgPSB0aGlzLnZpcExpc3RbdGhpcy5zaG93SW5mb0xldmVsICsgMV0udmlwTmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmcmFtZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImZyYW1lX2dyenhcIik7XHJcbiAgICAgICAgbGV0IGxlZnRCdG4gPSBmcmFtZS5nZXRDaGlsZEJ5TmFtZShcImxlZnRcIik7XHJcbiAgICAgICAgbGV0IHJpZ2h0QnRuID0gZnJhbWUuZ2V0Q2hpbGRCeU5hbWUoXCJyaWdodFwiKTtcclxuICAgICAgICBsZWZ0QnRuLmFjdGl2ZSA9IHRoaXMuc2hvd0luZm9MZXZlbCAhPSAwO1xyXG4gICAgICAgIGxlZnRCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJsdlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxldmVsIC0gMTtcclxuXHJcbiAgICAgICAgcmlnaHRCdG4uYWN0aXZlID0gbmV4dGxldmVsICE9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZihuZXh0bGV2ZWwpIHtcclxuICAgICAgICAgICAgcmlnaHRCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJsdlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5leHRsZXZlbDsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmN1clZpcC5zdHJpbmcgPSBgVklQJHt2aXBJbmZvLnZpcE5hbWV95LiT5bGe5p2D55uKYDtcclxuICAgICAgICB0aGlzLmN1clZpcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9ruWlluWKsSDliIbkuInpobXlvqrnjq/mu5rliqhcclxuICAgIGluaXRBd2FyZEluZm8oKSB7XHJcbiAgICAgICAgbGV0IG5Db3VudCA9IHRoaXMudmlwQ291bnQ7XHJcbiAgICAgICAgbGV0IGN1ckx2ID0gdGhpcy5zaG93SW5mb0xldmVsO1xyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEgPSB0aGlzLnZpcExpc3RbdGhpcy5zaG93SW5mb0xldmVsXTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYWdlTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBwYWdlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcGFnZU5vZGUubmFtZSA9IGBpbXRlJHtpfWA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LmFkZFBhZ2UocGFnZU5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDliJ3lp4vljJbml7bmu5rliqjliLDnjqnlrrblvZPliY3nrYnnuqfnmoTpobXpnaJcclxuICAgICAgICAgICAgaWYoY3VyTHYgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlVmlldy5zY3JvbGxUb1BhZ2UoMCwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihjdXJMdiA9PSBuQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LnNjcm9sbFRvUGFnZSgyLCAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKDEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgIFxyXG5cclxuICAgICAgICBsZXQgc3RhcnRJbmRleCA9IGN1ckx2IC0gMTtcclxuICAgICAgICBpZihjdXJMdiA9PSAwKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0SW5kZXggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZihjdXJMdiA9PSBuQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBjdXJMdiAtIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlTm9kZSA9IHRoaXMuY29udGVudC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UGFnZUluZm8ocGFnZU5vZGUsIHRoaXMudmlwTGlzdFtzdGFydEluZGV4ICsgaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZnJhbWVfZ3J6eFwiKTtcclxuXHJcbiAgICAgICAgLy8g5Yik5pat5bem5L6n5oyJ6ZKu5piv5ZCm5pi+56S657qi54K5XHJcbiAgICAgICAgbGV0IGxlZnRJbmZvID0gdGhpcy52aXBMaXN0W3N0YXJ0SW5kZXhdO1xyXG4gICAgICAgIGlmKGN1ckx2ID09IG5Db3VudCAtIDEpIHtcclxuICAgICAgICAgICAgbGVmdEluZm8gPSB0aGlzLnZpcExpc3Rbc3RhcnRJbmRleCArIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzQ2FuR2V0KGxlZnRJbmZvKSkge1xyXG4gICAgICAgICAgICBmcmFtZS5nZXRDaGlsZEJ5TmFtZShcImxlZnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRfZG90XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZnJhbWUuZ2V0Q2hpbGRCeU5hbWUoXCJsZWZ0XCIpLmdldENoaWxkQnlOYW1lKFwicmVkX2RvdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWIpOaWreWPs+S+p+aYr+WQpuaYvuekuue6oueCuVxyXG4gICAgICAgIGxldCByaWdodEluZm8gPSB0aGlzLnZpcExpc3Rbc3RhcnRJbmRleCsyXTtcclxuICAgICAgICBpZihjdXJMdiA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJpZ2h0SW5mbyA9IHRoaXMudmlwTGlzdFtzdGFydEluZGV4KzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzQ2FuR2V0KHJpZ2h0SW5mbykpIHtcclxuICAgICAgICAgICAgZnJhbWUuZ2V0Q2hpbGRCeU5hbWUoXCJyaWdodFwiKS5nZXRDaGlsZEJ5TmFtZShcInJlZF9kb3RcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmcmFtZS5nZXRDaGlsZEJ5TmFtZShcInJpZ2h0XCIpLmdldENoaWxkQnlOYW1lKFwicmVkX2RvdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaYr+WQpuWPr+S7pemihuWPllxyXG4gICAgaXNDYW5HZXQodmlwSW5mbykge1xyXG4gICAgICAgIGlmKHZpcEluZm8udW5jbGFpbWVkID09IDIgJiYgdmlwSW5mby5ib251c1VwZ3JhZGUgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodmlwSW5mby51bmNsYWltZWRXZWVrID09IDIgJiYgdmlwSW5mby5ib251c1dlZWtEaWZmID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHZpcEluZm8udW5jbGFpbWVkTW9udGggPT0gMiAmJiB2aXBJbmZvLmJvbnVzTW9udGhEaWZmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmmL7npLrmr4/pobXkv6Hmga9cclxuICAgIHNob3dQYWdlSW5mbyhwYWdlTm9kZSwgdmlwSW5mbykge1xyXG4gICAgICAgIGxldCBhd2FyZCA9IHBhZ2VOb2RlLmdldENoaWxkQnlOYW1lKFwiYXdhcmRcIik7XHJcblxyXG4gICAgICAgIC8vIOaZi+e6p+ekvOmHkVxyXG4gICAgICAgIGxldCB1cEF3YXJkID0gYXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdXBhd2FyZFwiKTtcclxuICAgICAgICB1cEF3YXJkLmdldENoaWxkQnlOYW1lKFwiYXdhcmRjb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jdXRGbG9hdCh2aXBJbmZvLmJvbnVzVXBncmFkZSk7XHJcblxyXG4gICAgICAgIC8vIOWRqOekvOmHkVxyXG4gICAgICAgIGxldCB3ZWVrQXdhcmQgPSBhd2FyZC5nZXRDaGlsZEJ5TmFtZShcImJ0bl93ZWVrYXdhcmRcIik7XHJcbiAgICAgICAgd2Vla0F3YXJkLmdldENoaWxkQnlOYW1lKFwiYXdhcmRjb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jdXRGbG9hdCh2aXBJbmZvLmJvbnVzV2Vlayk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5pyI56S86YeRXHJcbiAgICAgICAgbGV0IG1vbnRoQXdhcmQgPSBhd2FyZC5nZXRDaGlsZEJ5TmFtZShcImJ0bl9tb250aGF3YXJkXCIpO1xyXG4gICAgICAgIG1vbnRoQXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJhd2FyZGNvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KHZpcEluZm8uYm9udXNNb250aCk7XHJcbiAgICBcclxuICAgICAgICBsZXQgb3RoZXJBd2FyZCA9IHBhZ2VOb2RlLmdldENoaWxkQnlOYW1lKFwib3RoZXJBd2FyZFwiKTtcclxuXHJcbiAgICAgICAgLy8g5L2Z6aKd5a6dXHJcbiAgICAgICAgbGV0IGJsYW5jZUF3YXJkID0gb3RoZXJBd2FyZC5nZXRDaGlsZEJ5TmFtZShcImJ0bl9ibGFuY2Vhd2FyZFwiKTtcclxuICAgICAgICBsZXQgdGVtcCA9IChOdW1iZXIodmlwSW5mby5iYWxhbmNlKSAvIDEwMCAqIDM2NSkudG9GaXhlZCgyKS50b1N0cmluZygpXHJcbiAgICAgICAgYmxhbmNlQXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJhd2FyZGNvaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHt0ZW1wfSVgIDtcclxuXHJcbiAgICAgICAgLy8g6L+U5rC05aWW5YqxXHJcbiAgICAgICAgbGV0IHJhdGlvQXdhcmQgPSBvdGhlckF3YXJkLmdldENoaWxkQnlOYW1lKFwiYnRuX3JhdGlvYXdhcmRcIik7XHJcbiAgICAgICAgcmF0aW9Bd2FyZC5nZXRDaGlsZEJ5TmFtZShcImF3YXJkY29pblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke3RoaXMuY3V0RmxvYXQodmlwSW5mby5yZXR1cm5SYXRpbyl9JWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g6K6+572u5pmL57qn56S86YeR54q25oCBXHJcbiAgICAgICAgdGhpcy5zZXRVcEF3YXJkU3RhdGUodXBBd2FyZCwgdmlwSW5mby51bmNsYWltZWQsIHZpcEluZm8sIHZpcEluZm8uYm9udXNVcGdyYWRlKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDorr7nva7lkajnpLzph5HnirbmgIFcclxuICAgICAgICB0aGlzLnNldFdlZWtBd2FyZFN0YXRlKHdlZWtBd2FyZCwgdmlwSW5mby51bmNsYWltZWRXZWVrLCB2aXBJbmZvLCBnbEdhbWUudGlwcy5WSVBBV0FSRC5XRUVLVElQUywgdGhpcy51c2VyaW5mby53ZWVrSXNSZWNlaXZlLCB2aXBJbmZvLmJvbnVzV2Vla0RpZmYpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8g6K6+572u5pyI56S86YeR54q25oCBXHJcbiAgICAgICAgdGhpcy5zZXRXZWVrQXdhcmRTdGF0ZShtb250aEF3YXJkLCB2aXBJbmZvLnVuY2xhaW1lZE1vbnRoLCB2aXBJbmZvLCBnbEdhbWUudGlwcy5WSVBBV0FSRC5NT05USFRJUFMsIHRoaXMudXNlcmluZm8ubW9udGhJc1JlY2VpdmUsIHZpcEluZm8uYm9udXNNb250aERpZmYpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+eKtuaAge+8jDHlt7Lpooblj5bvvIwy5Y+v6aKG5Y+W77yMM+aaguS4jeWPr+mihuWPllxyXG4gICAgc2V0VXBBd2FyZFN0YXRlKG5vZGVPYmosIHVuY2xhaW1lZCwgdmlwSW5mbywgYm9udXNVcGdyYWRlKSB7XHJcblxyXG4gICAgICAgIG5vZGVPYmouZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdW5jbGFpbWVkID09IDI7XHJcblxyXG4gICAgICAgIC8vIOaMiemSrumihuWPlueKtuaAgVxyXG4gICAgICAgIGxldCBidG5HZXQgPSBub2RlT2JqLmdldENoaWxkQnlOYW1lKFwiYnRuX2dldFwiKTtcclxuICAgICAgICB0aGlzLnNldEJ1dHRvbk1hdGVyaWFsKGJ0bkdldCwgdW5jbGFpbWVkID09IDIpO1xyXG4gICAgICAgIGJ0bkdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB1bmNsYWltZWQgPT0gMjtcclxuICAgICAgICBidG5HZXQuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRcIikuYWN0aXZlID0gdW5jbGFpbWVkID09IDI7XHJcbiAgICAgICAgYnRuR2V0LmdldENoaWxkQnlOYW1lKFwiaW1nX2xxXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5pbWdHZXRTdGF0ZXNbdW5jbGFpbWVkXTtcclxuXHJcbiAgICAgICAgaWYodmlwSW5mby5pZCA9PSAxIHx8IGJvbnVzVXBncmFkZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIGJ0bkdldC5nZXRDaGlsZEJ5TmFtZShcImltZ19scVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaW1nR2V0U3RhdGVzWzNdO1xyXG4gICAgICAgICAgICBidG5HZXQuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlpZblirHlm77moIdcclxuICAgICAgICBub2RlT2JqLmdldENoaWxkQnlOYW1lKFwiaW1nX2F3YXJkaWNvblwiKS5hY3RpdmUgPSB1bmNsYWltZWQgPT0gMjtcclxuICAgICAgICBub2RlT2JqLmdldENoaWxkQnlOYW1lKFwiaW1nX2F3YXJkaWNvbl9ncmV5XCIpLmFjdGl2ZSA9IHVuY2xhaW1lZCAhPSAyO1xyXG5cclxuICAgICAgICAvLyDlpZblirHph5Hpop1cclxuICAgICAgICBsZXQgYXdhcmRjb2luID0gbm9kZU9iai5nZXRDaGlsZEJ5TmFtZShcImF3YXJkY29pblwiKTtcclxuICAgICAgICBhd2FyZGNvaW4uY29sb3IgPSB1bmNsYWltZWQgPT0gMiA/IG5ldyBjYy5Db2xvcigyNTQsIDE5MiwgMTcpIDogbmV3IGNjLkNvbG9yKDB4OGYsIDB4OGYsIDB4OGYpO1xyXG5cclxuICAgICAgICAvLyDmoIfpophcclxuICAgICAgICBsZXQgdGl0bGVfZ3JheSA9IG5vZGVPYmouZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZV9ncmF5XCIpO1xyXG4gICAgICAgIHRpdGxlX2dyYXkuYWN0aXZlID0gdW5jbGFpbWVkICE9IDI7XHJcblxyXG4gICAgICAgIC8vIOWlluWKseivtOaYjlxyXG4gICAgICAgIGxldCBleHBsYWluID0gbm9kZU9iai5nZXRDaGlsZEJ5TmFtZShcImV4cGxhaW5cIik7XHJcbiAgICAgICAgc3dpdGNoKHVuY2xhaW1lZCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBleHBsYWluLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGV4cGxhaW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGV4cGxhaW4uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGV4cGxhaW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGV4cGxhaW4uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBnbEdhbWUudGlwcy5WSVBBV0FSRC5MVkdFVENPTkRJVElPTi5mb3JtYXQodmlwSW5mby52aXBOYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g6K6+572u5ZGo56S86YeR5ZKM5pyI56S86YeRXHJcbiAgICAvL+eKtuaAge+8jDHlt7Lpooblj5bvvIwy5Y+v6aKG5Y+W77yMM+aaguS4jeWPr+mihuWPllxyXG4gICAgc2V0V2Vla0F3YXJkU3RhdGUobm9kZU9iaiwgdW5jbGFpbWVkLCB2aXBJbmZvLCBkZXNjcmlibGUsIHVzZXJVbmNsYWltZWQsIGJvbnVzKSB7XHJcbiAgICAgICAgLy8g6Z2i5p2/5bey6aKG5Y+W5oiW6ICF562J57qn5p2h5Lu25LiN5ruh6Laz572u54GwIOWNlee6r+e9rueBsCDov5jmmK/lj6/ku6Xngrnlh7tcclxuICAgICAgICBpZih1bmNsYWltZWQgPT0gMSB8fCB0aGlzLnVzZXJpbmZvLnZpcElkIDwgdmlwSW5mby5pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFBhbmVsU3RhdGUobm9kZU9iaiwgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFuZWxTdGF0ZShub2RlT2JqLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOetiee6p+S4jea7oei2s+aXtuS4jeWPr+eCueWHu1xyXG4gICAgICAgIG5vZGVPYmouZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdGhpcy51c2VyaW5mby52aXBJZCA+PSB2aXBJbmZvLmlkO1xyXG5cclxuICAgICAgICBpZih1c2VyVW5jbGFpbWVkPT0yICYmIHRoaXMudXNlcmluZm8udmlwSWQgPj0gdmlwSW5mby5pZCAmJiB2aXBJbmZvLmlkICE9IDEpIHtcclxuICAgICAgICAgICAgdW5jbGFpbWVkID0gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOaMiemSrumihuWPlueKtuaAgVxyXG4gICAgICAgIGxldCBidG5HZXQgPSBub2RlT2JqLmdldENoaWxkQnlOYW1lKFwiYnRuX2dldFwiKTtcclxuICAgICAgICBidG5HZXQuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfbHFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmltZ0dldFN0YXRlc1t1bmNsYWltZWRdO1xyXG4gICAgICAgIC8vIOWPquimgXZpcOetiee6p+i+vuWIsCDlsLHorr7nva7kuLrpq5jkuq7nirbmgIFcclxuICAgICAgICBpZih0aGlzLnVzZXJpbmZvLnZpcElkID49IHZpcEluZm8uaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25NYXRlcmlhbChidG5HZXQsIHRydWUpOyAgXHJcbiAgICAgICAgICAgIGJ0bkdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdmlw562J57qn6L6+5YiwIOWmguaenOS4jeaYr+WPr+mihuWPlueKtuaAgeaIluiAheWPr+mihuWPlumHkemineS4ujDliJnmmL7npLrkuLrmn6XnnIvor6bmg4VcclxuICAgICAgICAgICAgaWYodW5jbGFpbWVkICE9IDIgfHwgdXNlclVuY2xhaW1lZCAhPSAyKSB7XHJcbiAgICAgICAgICAgICAgICBidG5HZXQuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfbHFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmltZ0dldFN0YXRlc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Y+v6aKG5Y+W5pi+56S657qi54K5XHJcbiAgICAgICAgYnRuR2V0LmdldENoaWxkQnlOYW1lKFwicmVkXCIpLmFjdGl2ZSA9IHVuY2xhaW1lZCA9PSAyICYmIHVzZXJVbmNsYWltZWQgPT0gMiAmJiBib251cyA+IDA7XHJcblxyXG4gICAgICAgIC8vIOaPj+i/sFxyXG4gICAgICAgIGxldCBleHBsYWluID0gbm9kZU9iai5nZXRDaGlsZEJ5TmFtZShcImV4cGxhaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBpZih1bmNsYWltZWQgPT0gMikge1xyXG4gICAgICAgICAgICBleHBsYWluLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMudXNlcmluZm8udmlwSWQgPj0gdmlwSW5mby5pZCAmJiB1bmNsYWltZWQgPT0gMykge1xyXG4gICAgICAgICAgICBleHBsYWluLnN0cmluZyA9IGdsR2FtZS50aXBzLlZJUEFXQVJELkNBTk5PVEdFVFRJUFM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXhwbGFpbi5zdHJpbmcgPSBkZXNjcmlibGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB2aXAw54m55q6K5aSE55CGXHJcbiAgICAgICAgaWYodmlwSW5mby5pZCA9PSAxIHx8IChib251cyA9PSAwICYmIHRoaXMudXNlcmluZm8udmlwSWQgPj0gdmlwSW5mby5pZCkgKSB7XHJcbiAgICAgICAgICAgIGJ0bkdldC5nZXRDaGlsZEJ5TmFtZShcImltZ19scVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaW1nR2V0U3RhdGVzWzBdOyAvLyDmjInpkq7mmL7npLrmn6XnnIvor6bmg4VcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5lbFN0YXRlKG5vZGVPYmosIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYm9udXMgPD0gMCkge1xyXG4gICAgICAgICAgICBleHBsYWluLnN0cmluZyA9IGRlc2NyaWJsZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiuvue9rumdouadv+eKtuaAgVxyXG4gICAgc2V0UGFuZWxTdGF0ZShub2RlT2JqLCBiRW5hYmxlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRCdXR0b25NYXRlcmlhbChub2RlT2JqLmdldENoaWxkQnlOYW1lKFwiYmdcIiksIGJFbmFibGUpO1xyXG5cclxuICAgICAgICAvLyDmjInpkq7pooblj5bnirbmgIFcclxuICAgICAgICB0aGlzLnNldEJ1dHRvbk1hdGVyaWFsKG5vZGVPYmouZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZ2V0XCIpLCBiRW5hYmxlKTtcclxuICAgICAgICBub2RlT2JqLmdldENoaWxkQnlOYW1lKFwiYnRuX2dldFwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBiRW5hYmxlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOWlluWKseWbvuagh1xyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uTWF0ZXJpYWwobm9kZU9iai5nZXRDaGlsZEJ5TmFtZShcImltZ19hd2FyZGljb25cIiksIGJFbmFibGUpO1xyXG5cclxuICAgICAgICAvLyDlpZblirHph5Hpop1cclxuICAgICAgICBsZXQgYXdhcmRjb2luID0gbm9kZU9iai5nZXRDaGlsZEJ5TmFtZShcImF3YXJkY29pblwiKTtcclxuICAgICAgICBhd2FyZGNvaW4uY29sb3IgPSBiRW5hYmxlID8gbmV3IGNjLkNvbG9yKDI1NCwgMTkyLCAxNykgOiBuZXcgY2MuQ29sb3IoMHg4ZiwgMHg4ZiwgMHg4Zik7XHJcblxyXG4gICAgICAgIC8vIOagh+mimFxyXG4gICAgICAgIHRoaXMuc2V0QnV0dG9uTWF0ZXJpYWwobm9kZU9iai5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLCBiRW5hYmxlKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0QnV0dG9uTWF0ZXJpYWwobm9kZSwgYkVuYWJsZSkge1xyXG4gICAgICAgIGlmKGJFbmFibGUpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuUmVuZGVyQ29tcG9uZW50KS5zZXRNYXRlcmlhbCgwLCB0aGlzLm5vcm1hbE1hdGVyaWFsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5SZW5kZXJDb21wb25lbnQpLnNldE1hdGVyaWFsKDAsIHRoaXMuZ3JheU1hdGVyaWFsKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3VwYXdhcmRcIjogdGhpcy5jYWlqaW5fY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fd2Vla2F3YXJkXCI6IHRoaXMud2Vla19jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9tb250aGF3YXJkXCI6IHRoaXMubW9udGhfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZGV0YWlsXCI6IHRoaXMuZGV0YWlsX2NiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOiB0aGlzLmxlZnRfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOiB0aGlzLnJpZ2h0X2NiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JhdGlvYXdhcmRcIjogdGhpcy5yYXRpb19jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9ibGFuY2Vhd2FyZFwiOiB0aGlzLmJsYW5jZV9jYigpOyBicmVhaztcclxuICAgICAgICAgICBcdGNhc2UgXCJidG5fZ2V0XCI6IHRoaXMuYnRuR2V0X2NiKG5vZGUpOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgXHRidG5HZXRfY2Iobm9kZSkge1xyXG4gICBcdFx0bGV0IG5hbWUgPSBub2RlLnBhcmVudC5uYW1lO1xyXG4gICBcdFx0c3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fdXBhd2FyZFwiOiB0aGlzLmNhaWppbl9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl93ZWVrYXdhcmRcIjogdGhpcy53ZWVrX2NiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX21vbnRoYXdhcmRcIjogdGhpcy5tb250aF9jYigpOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHBhZ2V2aWV35rua5Yqo57uT5p2fXHJcbiAgICBvblBhZ2VTY3JvbGxFbmQoKSB7XHJcbiAgICAgICAgbGV0IGN1clBhZ2UgPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuXHJcbiAgICAgICAgc3dpdGNoKGN1clBhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSAwOiBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hvd0luZm9MZXZlbCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dJbmZvTGV2ZWwtLTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOiBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hvd0luZm9MZXZlbCA8IHRoaXMudmlwTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SW5mb0xldmVsKys7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hvd0luZm9MZXZlbCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SW5mb0xldmVsKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zaG93SW5mb0xldmVsID09IHRoaXMudmlwTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SW5mb0xldmVsLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOa7muWKqOWIsOS4remXtOS4gOmhtVxyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuc3RvcEF1dG9TY3JvbGwoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zaG93SW5mb0xldmVsID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVmlldy5zY3JvbGxUb1BhZ2UoMCwgMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2hvd0luZm9MZXZlbCA9PSB0aGlzLnZpcExpc3QubGVuZ3RoIC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKDIsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKDEsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgY2FpamluX2NiKCkge1xyXG4gICAgICAgIHRoaXMuUmVxVmlwUmV3YXJkKEFXQVJEX1RZUEUuVVAsIHRoaXMuc2hvd0RhdGEuaWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICB3ZWVrX2NiKCkge1xyXG4gICAgICAgIGxldCB2aXBOYW1lID0gXCJ1c2VyaW5mb1ZpcEdldFwiO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUodmlwTmFtZSkudGhlbihwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudCh2aXBOYW1lKS5zaG93V2Vla0dpZnQodGhpcy52aXBMaXN0LCB0aGlzLnVzZXJpbmZvKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBtb250aF9jYigpIHtcclxuICAgICAgICBsZXQgdmlwTmFtZSA9IFwidXNlcmluZm9WaXBHZXRcIjtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKHZpcE5hbWUpLnRoZW4ocGFuZWwgPT4ge1xyXG4gICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQodmlwTmFtZSkuc2hvd01vbnRoR2lmdCh0aGlzLnZpcExpc3QsIHRoaXMudXNlcmluZm8pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGRldGFpbF9jYigpIHtcclxuICAgICAgICBsZXQgdmlwTmFtZSA9IFwidXNlcmluZm9WaXBSaWdodFwiO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUodmlwTmFtZSkudGhlbihwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudCh2aXBOYW1lKS5zaG93VmlwUmlnaHQodGhpcy52aXBMaXN0LCBOdW1iZXIodGhpcy51cGdyYWRlVHlwZSkpOztcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBsZWZ0X2NiKCkge1xyXG4gICAgICAgIGlmKHRoaXMuc2hvd0luZm9MZXZlbCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKDApO1xyXG4gICAgfSxcclxuXHJcbiAgICByaWdodF9jYigpIHtcclxuICAgICAgICBsZXQgbkNvdW50ID0gdGhpcy52aXBMaXN0Lmxlbmd0aDtcclxuICAgICAgICBpZih0aGlzLnNob3dJbmZvTGV2ZWwgPj0gKG5Db3VudCAtIDEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICByYXRpb19jYigpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKCdiYWNrV2F0ZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgYmxhbmNlX2NiKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoJ3l1YmFvJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlcVZpcEluZm8oKSB7XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxVmlwSW5mbycsIG51bGwsIChyb3V0ZSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMudmlwTGlzdCA9IHJlc3VsdC52aXBMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLnZpcExpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYS52aXBOYW1lIC0gYi52aXBOYW1lO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgayBpbiB0aGlzLnZpcExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlwTGlzdFtrXS5pZCA9IHRoaXMudmlwTGlzdFtrXS52aXBOYW1lICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy51c2VyaW5mbyA9IHJlc3VsdC51c2VySW5mbztcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlVHlwZSA9IHJlc3VsdC51cGdyYWRlVHlwZTtcclxuXHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnNob3dJbmZvTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aXBMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlwTGlzdFtpXS5pZCA9PSB0aGlzLnVzZXJpbmZvLnZpcElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0luZm9MZXZlbCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlwQ291bnQgPSB0aGlzLnZpcExpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5YGa5LiA5bGC5qCh6aqM77yM5pyJ5Y+v6IO95Zyo5pyq57uT566X5pe25LiN6K6h566X5omT56CB6YeP5pe277yMXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0RhdGEgPSB0aGlzLnZpcExpc3RbdGhpcy5zaG93SW5mb0xldmVsXTtcclxuICAgICAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuXHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJub3RpZnlWaXBJbmZvXCIsIGRhdGEucmVzdWx0KTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+mihuWPliAx5b2p6YeR77yMMuWRqOekvOmHke+8jDPmnIjnpLzph5FcclxuICAgIFJlcVZpcFJld2FyZCh0eXBlLCB2aXBpZCkge1xyXG4gICAgICAgIGxldCBtc2cgPSB7IFwidHlwZVwiOiB0eXBlLCBcInZpcF9pZFwiOiB2aXBpZCB9XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxVmlwUmV3YXJkJywgbXNnLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUudXNlci5SZXFSZWREb3QoKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcUdldENvaW4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVxVmlwSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0clRpdGxlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IEFXQVJEX1RZUEUuVVApIHN0clRpdGxlID0gZ2xHYW1lLnRpcHMuVklQQVdBUkQuVVBBV0FSRDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gQVdBUkRfVFlQRS5XRUVLKSBzdHJUaXRsZSA9IGdsR2FtZS50aXBzLlZJUEFXQVJELldFRUtBV0FSRDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gQVdBUkRfVFlQRS5NT05USCkgc3RyVGl0bGUgPSBnbEdhbWUudGlwcy5WSVBBV0FSRC5NT05USEFXQVJEO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dBd2FyZEJveChzdHJUaXRsZSwgW3sgdHlwZTogZ2xHYW1lLmF3YXJkdHlwZS5DT0lOLCB2YWx1ZTogdGhpcy5jdXRGbG9hdChkYXRhLmNvaW4pIH1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5oiq5Y+W5bCP5pWw54K55ZCOMuS9jVxyXG4gICAgY3V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKHBhcnNlRmxvYXQodmFsdWUpKSAvIDEwMCkudG9GaXhlZCgyKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
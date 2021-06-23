"use strict";
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
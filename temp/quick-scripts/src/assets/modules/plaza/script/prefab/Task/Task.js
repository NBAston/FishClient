"use strict";
cc._RF.push(module, '5df070hUjBKu4ma8nhCN9WE', 'Task');
// modules/plaza/script/prefab/Task/Task.js

"use strict";

var taskcfg = require('taskcfg');

var ON_TYPE = {
  DAYTASK: 0,
  // 每日任务
  WEEKTASK: 1,
  //每周任务
  ACHIEVERE: 2,
  //成就奖励
  MAKEMONEY: 3 //我要赚钱

};
var SELECTINDEX = {
  "isDaily": 1,
  "isWeekly": 2,
  "isAchievement": 0
};
var TaskType = {
  dailyType: 1,
  activeType: 2
};
glGame.baseclass.extend({
  properties: {
    awardTips: cc.Prefab,
    interFace: cc.Node,
    selectType: cc.Node,
    UsualItem: cc.Node,
    boxList: cc.Node,
    arrIcon: [cc.SpriteFrame]
  },
  onLoad: function onLoad() {
    this.in_type = 0; // 当前所在的界面类型

    this.record = {}; //将请求过的数据存入

    this.registerEvent();
    this.ImageCode = {
      101: this.arrIcon[0],
      102: this.arrIcon[1],
      103: this.arrIcon[2],
      104: this.arrIcon[3],
      105: this.arrIcon[4],
      106: this.arrIcon[5],
      107: this.arrIcon[6],
      108: this.arrIcon[7],
      109: this.arrIcon[8],
      201: this.arrIcon[9],
      202: this.arrIcon[10],
      203: this.arrIcon[11],
      204: this.arrIcon[12],
      205: this.arrIcon[13]
    };
    glGame.panel.showEffectPariticle(this.node);
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.ReqMissionConfig, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "isDaily":
      case "isWeekly":
      case "isAchievement":
        this.ReqMissionList(name);
        break;

      case "makeMonkey":
        this.switchFace(name);
        break;

      case "close":
        this.remove();
        break;

      case "btn_getReward":
        this.getReward();
        break;

      case "btn_goReward":
        this.goReward(node);
        break;

      case "btn_Reward":
        this.Reward(node);
        break;

      case "btn_gopopularize":
        this.popularize();
        break;

      case "btn_goannounce":
        this.announce();
        break;

      case "btn_goTask":
        this.goTask();
        break;

      case "btn_gobackWater":
        this.gobackWater();
        break;

      case "btn_goyubao":
        this.goyubao();
        break;

      case "btn_goplaza":
        this.goplaza();
        break;

      case "icon_box_1":
      case "icon_box_2":
      case "icon_box_3":
      case "icon_box_4":
      case "icon_box_5":
        this.boxReward(name, node);
        break;

      default:
        console.log(" btn name: ", name);
        break;
    }
  },
  //请求标题的显示
  ReqMissionConfig: function ReqMissionConfig() {
    var _this = this;

    glGame.gameNet.send_msg('http.ReqMissionConfig', null, function (route, data) {
      _this.initSelect(data.result);

      for (var i = 0; i < _this.selectType.childrenCount; i++) {
        if (_this.selectType.children[i].active) {
          _this.selectType.children[i].getComponent(cc.Toggle).check();

          if (i == 0) _this.onClick("isDaily");
          break;
        }
      }
    });
  },
  //1任务 2 活跃
  //state 1:进行中 2 可领取 3已完成
  ReqMissionList: function ReqMissionList(name) {
    var _this2 = this;

    if (this.record[name]) return this.switchFace(name);
    var type = SELECTINDEX[name];
    glGame.gameNet.send_msg('http.ReqMissionList', {
      cycleType: type
    }, function (route, data) {
      _this2.record[name] = data.result;

      _this2.switchFace(name);

      _this2.initFaceInfo(data.result);

      _this2.initTask(data.result.activeList);

      _this2.isgetReward();
    });
  },
  //一次性领取全部的奖励
  ReqMissionAllReward: function ReqMissionAllReward(cycleType) {
    var _this3 = this;

    glGame.gameNet.send_msg('http.ReqMissionAllReward', {
      cycleType: cycleType
    }, function (route, data) {
      _this3.initWindowInfo(data.result);

      _this3.refreshAllReward();

      var oldReward = _this3.interFace.children[_this3.in_type].getChildByName("totalReward").getChildByName("oldReward").getComponent(cc.Label);

      oldReward.string = Number(oldReward.string) - Number(data.result.missionCoin).div(100);
      glGame.user.reqGetCoin();
      glGame.user.reqGetDiamond();

      _this3.isgetReward();
    });
  },
  //初始化点击选项
  initSelect: function initSelect(selectResult) {
    for (var key in selectResult) {
      if (this.selectType.getChildByName("".concat(key))) {
        this.selectType.getChildByName("".concat(key)).active = selectResult[key];
      }

      for (var i = 0; i < this.selectType.childrenCount; i++) {
        if (this.selectType.children[i].getChildByName("".concat(key))) {
          this.selectType.children[i].getChildByName("".concat(key)).active = selectResult[key];
        }
      }
    }

    if (this.selectType.getChildByName("makeMonkey")) this.selectType.getChildByName("makeMonkey").active = true;
  },
  //界面转换
  switchFace: function switchFace(name) {
    for (var i = 0; i < this.interFace.childrenCount; i++) {
      if (this.interFace.children[i].name == name) {
        this.interFace.children[i].active = true;
        this.in_type = i;
      } else {
        this.interFace.children[i].active = false;
      }
    }
  },
  //界面信息初始化
  initFaceInfo: function initFaceInfo(data) {
    var content = this.interFace.children[this.in_type].getChildByName("TaskList").getChildByName("view").getChildByName("content");
    var missionList = data.missionList;

    for (var i = 0; i < missionList.length; i++) {
      var UsualItem = cc.instantiate(this.UsualItem);
      UsualItem.parent = content;
      UsualItem.active = false;
      UsualItem.getChildByName("Title").getComponent(cc.Label).string = missionList[i].title;
      UsualItem.getChildByName("describe").getComponent(cc.Label).string = taskcfg.getDescribe(missionList[i]); //UsualItem.getChildByName("coinreward").getComponent(cc.Label).string = this.getFloat(missionList[i].rewardCoin);

      UsualItem.name = "".concat(i);
      var coinreward = UsualItem.getChildByName("layout").getChildByName("coinreward");
      var dimandreward = UsualItem.getChildByName("layout").getChildByName("dimandreward");
      var activereward = UsualItem.getChildByName("activereward"); // coinreward.active = missionList[i].rewardCoin;
      // dimandreward.active = missionList[i].rewardDiamond || glGame.user.get("roomSwitch") == 1;
      // activereward.active = missionList[i].rewardActive;

      if (missionList[i].rewardCoin > 0) {
        coinreward.active = true;
        coinreward.getComponent(cc.Label).string = this.getFloat(missionList[i].rewardCoin);
      } else {
        coinreward.active = false;
      }

      if (missionList[i].rewardDiamond > 0 && glGame.user.get("roomSwitch") == 1) {
        dimandreward.active = true;
        dimandreward.getComponent(cc.Label).string = this.getFloat(missionList[i].rewardDiamond);
      } else {
        dimandreward.active = false;
      }

      if (missionList[i].rewardActive > 0) {
        activereward.active = true;
        activereward.getChildByName("lab_reward").getComponent(cc.Label).string = missionList[i].rewardActive;
      } else {
        activereward.active = false;
      } //成就奖励的项目没有活跃度奖励而且icon没有底框


      if (this.in_type == ON_TYPE.ACHIEVERE) {
        UsualItem.getChildByName("activereward").active = false;
      } else {
        activereward.getChildByName("lab_reward").getComponent(cc.Label).string = missionList[i].rewardActive;
      } //根据当前进度与目标进度匹配显示内容


      if (Number(missionList[i].progress) >= Number(missionList[i].progressTarget) && missionList[i].state != 3) {
        UsualItem.getChildByName("schdule_des").getComponent(cc.Label).string = glGame.tips.TASK.STATE_COMPLETE;
      } else if (missionList[i].state == 3) {
        UsualItem.getChildByName("schdule_des").getComponent(cc.Label).string = glGame.tips.TASK.STATE_GETREWARD;
        UsualItem.getChildByName("schdule_des").y = 4;
      } else {
        UsualItem.getChildByName("schdule_des").getComponent(cc.Label).string = "".concat(missionList[i].progress, "/").concat(missionList[i].progressTarget);
      }

      UsualItem.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.ImageCode[missionList[i].icon];
      UsualItem.getChildByName("btn_goReward").active = missionList[i].state == 1;
      UsualItem.getChildByName("btn_Reward").active = missionList[i].state == 2;
    }

    glGame.panel.showEffectNode(this, content, 0.02, true);
    var totalReward = this.interFace.children[this.in_type].getChildByName("totalReward");
    totalReward.getChildByName("dayTotalReward").getComponent(cc.Label).string = this.getFloat(data.rewardInfo.totalReward);
    totalReward.getChildByName("oldReward").getComponent(cc.Label).string = this.getFloat(data.rewardInfo.unReceiveReward);

    if (this.in_type == ON_TYPE.DAYTASK || this.in_type == ON_TYPE.WEEKTASK) {
      var activeValue = this.interFace.children[this.in_type].getChildByName("activeNum").getChildByName("Number");
      activeValue.getComponent(cc.Label).string = data.activeValue;
    }
  },
  //对宝箱进行排序
  initTask: function initTask(boxList) {
    if (this.in_type > 1) return;
    if (boxList.length == 0) this.interFace.children[this.in_type].getChildByName("taskProgress").active = false;
    var boxNode = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");

    for (var i = 0; i < boxList.length; i++) {
      var boxItem = cc.instantiate(this.boxList.getChildByName("icon_box_".concat(boxList[i].iconId)));
      boxItem.parent = boxNode;
      boxItem.name = "icon_box_".concat(i + 1);
      boxItem.active = true; // let box = boxNode.getChildByName(`icon_box_${boxList[i].iconId}`);
      // box.active = true;
      // box.setSiblingIndex(i);
    }
    /*boxNode.runAction(cc.sequence(
        cc.delayTime(0.1),
        cc.callFunc(()=>{
            this.refreshbox();
            this.refreshProress();
        })
    ))
    */


    this.refreshbox();
    this.refreshProress();
  },
  refreshbox: function refreshbox() {
    var boxNode = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
    var activeValue = Number(this.record[this.interFace.children[this.in_type].name].activeValue);
    var boxList = this.record[this.interFace.children[this.in_type].name].activeList;

    for (var i = 0; i < boxList.length; i++) {
      boxNode.children[i].getChildByName("achieveNum").getComponent(cc.Label).string = boxList[i].activity;
      console.log("这是当前的宝箱活跃度", boxList[i].activity, boxNode.children[i].getChildByName("achieveNum").getComponent(cc.Label).string);

      if (boxList[i].activity <= activeValue) {
        if (boxList[i].state == 3) {
          boxNode.children[i].getChildByName("closing").active = false;
          boxNode.children[i].getChildByName("opening").active = true;
        } else {
          boxNode.children[i].getChildByName("light").active = true;
          boxNode.children[i].getChildByName("manypill").active = true;
        }
      }

      boxNode.children[i].x = (i + 1) / boxList.length * boxNode.width;
    }
  },
  //刷新进度条信息
  refreshProress: function refreshProress() {
    var boxList = this.record[this.interFace.children[this.in_type].name].activeList;
    var activeValue = Number(this.record[this.interFace.children[this.in_type].name].activeValue);
    var boxNode = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
    var mask = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("mask");

    for (var i = 0; i < boxList.length; i++) {
      if (activeValue <= boxList[i].activity) {
        if (i == 0) {
          mask.width = boxNode.children[i].x * activeValue / boxList[i].activity;
        } else {
          var startX = boxNode.children[i - 1].x;
          var endX = boxNode.children[i].x;
          var range = boxList[i].activity - boxList[i - 1].activity;
          mask.width = startX + (activeValue - boxList[i - 1].activity) / range * (endX - startX);
        }

        return;
      }
    }

    mask.width = mask.getChildByName("bar").width;
  },
  //跳转游戏
  jumpGame: function jumpGame(gameid) {
    console.log("====》这是跳转的游戏的gameid", gameid); // glGame.emitter.emit("roomEntrance", gameid);

    if (gameid == 0) {
      this.remove();
    } else {
      glGame.gamelistcfg.onEnterGame(gameid, true);
    }
  },
  //桌面数据的显示
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  popularize: function popularize() {
    this.remove(false);
    glGame.panel.showPanelByName("popularize");
  },
  //去完成
  goReward: function goReward(node) {
    this.remove(false);
    var Index = node.parent.name;
    var missionList = this.record[this.interFace.children[this.in_type].name].missionList;

    if (missionList[Index].missionType >= 5) {
      this.jumpGame(missionList[Index].gameId);
    } else if (missionList[Index].missionType == 2) {
      glGame.panel.showPanelByName("popularize");
    } else if (missionList[Index].missionType == 3 || missionList[Index].missionType == 4) {
      glGame.panel.showShop();
    }
  },
  //领取任务奖励
  Reward: function Reward(node) {
    var _this4 = this;

    var Index = node.parent.name;
    var cycleType = SELECTINDEX[this.interFace.children[this.in_type].name];
    var rewardType = TaskType.dailyType;
    var rewardId = this.record[this.interFace.children[this.in_type].name].missionList[Index].id;
    console.log("这是当前领取任务奖励参数", cycleType, rewardType, rewardId);
    glGame.gameNet.send_msg('http.ReqMissionReward', {
      cycleType: cycleType,
      rewardType: rewardType,
      rewardId: rewardId
    }, function (route, data) {
      _this4.initWindowInfo(data.result);

      node.active = false;
      node.parent.getChildByName("schdule_des").getComponent(cc.Label).string = glGame.tips.TASK.STATE_GETREWARD;
      node.parent.getChildByName("schdule_des").y = 4;
      node.parent.getChildByName("btn_Reward").active = false;
      _this4.record[_this4.interFace.children[_this4.in_type].name].missionList[Index].state = 3;

      var oldReward = _this4.interFace.children[_this4.in_type].getChildByName("totalReward").getChildByName("oldReward").getComponent(cc.Label);

      oldReward.string = Number(oldReward.string) - Number(data.result.coin).div(100);
      glGame.user.reqGetCoin();
      glGame.user.reqGetDiamond();

      _this4.isgetReward();
    });
  },
  //宝箱领取奖励
  boxReward: function boxReward(name, node) {
    var _this5 = this;

    //if (!node.getChildByName("light").active) return;
    var interFaceData = this.record[this.interFace.children[this.in_type].name];
    var index = this.getIndex(name);
    var activeValue = interFaceData.activeValue;
    var coin = null,
        score = null,
        randDiamond = null;

    if (Number(interFaceData.activeList[index].activity) > activeValue) {
      var awardTips = glGame.panel.showChildPanel(this.awardTips, this.node);

      if (interFaceData.activeList[index].randCoin.length != 0) {
        coin = "".concat(this.getFloat(interFaceData.activeList[index].randCoin.min), "~").concat(this.getFloat(interFaceData.activeList[index].randCoin.max));
      }

      console.log("这是当前数组", interFaceData.activeList[index].randIntegral, interFaceData.activeList[index].randIntegral.length);

      if (interFaceData.activeList[index].randIntegral.length != 0) {
        score = "".concat(this.getFloat(interFaceData.activeList[index].randIntegral.min), "~").concat(this.getFloat(interFaceData.activeList[index].randIntegral.max));
      }

      if (interFaceData.activeList[index].randDiamond.length != 0) {
        randDiamond = "".concat(this.getFloat(interFaceData.activeList[index].randDiamond.min), "~").concat(this.getFloat(interFaceData.activeList[index].randDiamond.max));
      }

      awardTips.getComponent("awardTips").showMsg(glGame.tips.TASK.AWARD_TITTLE, coin, score, randDiamond);
      return;
    }

    var cycleType = SELECTINDEX[this.interFace.children[this.in_type].name];
    var rewardType = TaskType.activeType;
    var rewardId = interFaceData.activeList[index].id;
    glGame.gameNet.send_msg('http.ReqMissionReward', {
      cycleType: cycleType,
      rewardType: rewardType,
      rewardId: rewardId
    }, function (route, data) {
      _this5.initWindowInfo(data.result);

      node.getChildByName("light").active = false;
      node.getChildByName("manypill").active = false;
      node.getChildByName("closing").active = false;
      node.getChildByName("opening").active = true;
      interFaceData.activeList[index].state = 3;
      glGame.user.reqGetCoin();
      glGame.user.reqGetDiamond();

      _this5.isgetReward();
    });
  },
  //获取当前宝箱的索引
  getIndex: function getIndex(name) {
    var allReward = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");

    for (var i = 0; i < allReward.childrenCount; i++) {
      if (allReward.children[i].name == name) {
        console.log("allReward.children[i].name", allReward.children[i].name, i, name);
        return i;
      }
    }
  },
  //初始化弹窗回包信息
  initWindowInfo: function initWindowInfo(data) {
    var awardlist = [];
    data.coin != null && data.coin > 0 ? awardlist.push({
      type: glGame.awardtype.COIN,
      value: this.getFloat(data.coin)
    }) : null;
    data.integral != null && data.integral > 0 ? awardlist.push({
      type: glGame.awardtype.SCORE,
      value: this.getFloat(data.integral)
    }) : null;
    data.active != null && data.active > 0 ? awardlist.push({
      type: glGame.awardtype.VITALITY,
      value: data.active
    }) : null;
    data.diamond != null && data.diamond > 0 ? awardlist.push({
      type: glGame.awardtype.DIAMOND,
      value: this.getFloat(data.diamond)
    }) : null;
    console.log("这是当前奖励的数组", awardlist, glGame.user.get("roomSwitch"));
    glGame.panel.showAwardBox(glGame.tips.TASK.AWARD_TIPS, awardlist);

    if (data.active && data.active != 0) {
      // this.playflash();
      var activeNum = this.interFace.children[this.in_type].getChildByName("activeNum").getChildByName("Number").getComponent(cc.Label);
      this.record[this.interFace.children[this.in_type].name].activeValue = Number(this.record[this.interFace.children[this.in_type].name].activeValue) + Number(data.active);
      activeNum.string = this.record[this.interFace.children[this.in_type].name].activeValue;
      this.refreshProress();
      this.refreshbox();
    }
  },
  refreshAllReward: function refreshAllReward() {
    var TaskList = this.interFace.children[this.in_type].getChildByName("TaskList").getChildByName("view").getChildByName("content");

    for (var i = 0; i < TaskList.childrenCount; i++) {
      if (TaskList.children[i].getChildByName("btn_Reward").active) {
        TaskList.children[i].getChildByName("btn_Reward").active = false;
        TaskList.children[i].getChildByName("schdule_des").getComponent(cc.Label).string = glGame.tips.TASK.STATE_GETREWARD;
        TaskList.children[i].getChildByName("schdule_des").y = 4;
      }
    }

    if (this.in_type != ON_TYPE.ACHIEVERE) {
      var BoxList = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");

      for (var _i = 0; _i < BoxList.childrenCount; _i++) {
        if (BoxList.children[_i].getChildByName("light").active) {
          BoxList.children[_i].getChildByName("light").active = false;
          BoxList.children[_i].getChildByName("manypill").active = false;
          BoxList.children[_i].getChildByName("closing").active = false;
          BoxList.children[_i].getChildByName("opening").active = true;
        }
      }
    }

    var activeList = this.record[this.interFace.children[this.in_type].name].activeList;

    for (var _i2 = 0; _i2 < activeList.length; _i2++) {
      activeList[_i2].state = 3;
    }

    var missionList = this.record[this.interFace.children[this.in_type].name].missionList;

    for (var _i3 = 0; _i3 < missionList.length; _i3++) {
      missionList[_i3].state = 3;
    }
  },
  playflash: function playflash() {
    var flash = this.interFace.children[this.in_type].getChildByName("flash");
    flash.active = true;
    flash.getComponent(sp.Skeleton).setAnimation(0, "huoyuedu", false);
    flash.getComponent(sp.Skeleton).setCompleteListener(function (trackEntry, loopCount) {
      var name = trackEntry.animation ? trackEntry.animation.name : "";

      if (name == 'huoyuedu') {
        flash.active = false;
      }
    });
  },
  //是否有可领取的奖励
  isgetReward: function isgetReward() {
    var TaskList = this.interFace.children[this.in_type].getChildByName("TaskList").getChildByName("view").getChildByName("content");
    var btn_getReward = this.interFace.children[this.in_type].getChildByName("totalReward").getChildByName("btn_getReward");
    var interFaceData = this.record[this.interFace.children[this.in_type].name];
    var isReward = false; // for (let i = 0; i < TaskList.childrenCount; i++) {
    //     if (TaskList.children[i].getChildByName("btn_Reward").active) {
    //         isReward = true;
    //         break;
    //     }
    // }

    var missionList = interFaceData.missionList;

    for (var i = 0; i < missionList.length; i++) {
      if (Number(missionList[i].progress) >= Number(missionList[i].progressTarget) && missionList[i].state != 3) {
        isReward = true;
        break;
      }
    }

    if (this.in_type != ON_TYPE.ACHIEVERE) {
      // let BoxList = this.interFace.children[this.in_type].getChildByName("taskProgress").getChildByName("allReward");
      // for (let i = 0; i < BoxList.childrenCount; i++) {
      //     if (BoxList.children[i].getChildByName("light").active) {
      //         isReward = true;
      //         break;
      //     }
      // }
      var activeList = interFaceData.activeList;

      for (var _i4 = 0; _i4 < activeList.length; _i4++) {
        if (activeList[_i4].activity <= interFaceData.activeValue && activeList[_i4].state != 3) {
          isReward = true;
          console.log("红点隐藏", activeList[_i4].activity, interFaceData.activeValue, activeList[_i4].state, activeList);
          break;
        }
      }
    }

    console.log("当前一键领取以及红点", isReward);
    btn_getReward.getComponent(cc.Button).interactable = isReward;
    this.selectType.children[this.in_type].children[2].active = isReward;

    for (var _i5 = 0; _i5 < this.selectType.childrenCount; _i5++) {
      if (this.selectType.children[_i5].children[2] && this.selectType.children[_i5].children[2].active) {
        return;
      }
    }

    if (!glGame.user.isTourist()) {
      glGame.user.redDotData.missionReq = 2;
      glGame.emitter.emit("ReqRedDot");
      console.log("关闭大厅任务红点");
    }
  },
  //一键领取所有奖励
  getReward: function getReward() {
    var cycleType = SELECTINDEX[this.interFace.children[this.in_type].name];
    console.log("这是当前的点击类型", cycleType);
    this.ReqMissionAllReward(cycleType);
  },
  announce: function announce() {
    this.remove(false);
    glGame.panel.showPanelByName("announcement");
  },
  goTask: function goTask() {
    for (var i = 0; i <= ON_TYPE.ACHIEVERE; i++) {
      if (this.selectType.children[i].active) {
        this.selectType.children[i].getComponent(cc.Toggle).check();
        break;
      }
    }
  },
  gobackWater: function gobackWater() {
    this.remove(false);
    glGame.panel.showPanelByName('backWater');
  },
  goyubao: function goyubao() {
    this.remove(false);
    glGame.panel.showPanelByName('yubao');
  },
  goplaza: function goplaza() {
    this.remove();
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
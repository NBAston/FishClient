
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/Task/Task.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxUYXNrXFxUYXNrLmpzIl0sIm5hbWVzIjpbInRhc2tjZmciLCJyZXF1aXJlIiwiT05fVFlQRSIsIkRBWVRBU0siLCJXRUVLVEFTSyIsIkFDSElFVkVSRSIsIk1BS0VNT05FWSIsIlNFTEVDVElOREVYIiwiVGFza1R5cGUiLCJkYWlseVR5cGUiLCJhY3RpdmVUeXBlIiwiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImF3YXJkVGlwcyIsImNjIiwiUHJlZmFiIiwiaW50ZXJGYWNlIiwiTm9kZSIsInNlbGVjdFR5cGUiLCJVc3VhbEl0ZW0iLCJib3hMaXN0IiwiYXJySWNvbiIsIlNwcml0ZUZyYW1lIiwib25Mb2FkIiwiaW5fdHlwZSIsInJlY29yZCIsInJlZ2lzdGVyRXZlbnQiLCJJbWFnZUNvZGUiLCJwYW5lbCIsInNob3dFZmZlY3RQYXJpdGljbGUiLCJub2RlIiwiZW1pdHRlciIsIm9uIiwibmFtZSIsIk1FU1NBR0UiLCJVSSIsIkFDVElPTl9FTkQiLCJSZXFNaXNzaW9uQ29uZmlnIiwidW5SZWdpc3RlckV2ZW50Iiwib2ZmIiwib25DbGljayIsIlJlcU1pc3Npb25MaXN0Iiwic3dpdGNoRmFjZSIsInJlbW92ZSIsImdldFJld2FyZCIsImdvUmV3YXJkIiwiUmV3YXJkIiwicG9wdWxhcml6ZSIsImFubm91bmNlIiwiZ29UYXNrIiwiZ29iYWNrV2F0ZXIiLCJnb3l1YmFvIiwiZ29wbGF6YSIsImJveFJld2FyZCIsImNvbnNvbGUiLCJsb2ciLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJyb3V0ZSIsImRhdGEiLCJpbml0U2VsZWN0IiwicmVzdWx0IiwiaSIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsImFjdGl2ZSIsImdldENvbXBvbmVudCIsIlRvZ2dsZSIsImNoZWNrIiwidHlwZSIsImN5Y2xlVHlwZSIsImluaXRGYWNlSW5mbyIsImluaXRUYXNrIiwiYWN0aXZlTGlzdCIsImlzZ2V0UmV3YXJkIiwiUmVxTWlzc2lvbkFsbFJld2FyZCIsImluaXRXaW5kb3dJbmZvIiwicmVmcmVzaEFsbFJld2FyZCIsIm9sZFJld2FyZCIsImdldENoaWxkQnlOYW1lIiwiTGFiZWwiLCJzdHJpbmciLCJOdW1iZXIiLCJtaXNzaW9uQ29pbiIsImRpdiIsInVzZXIiLCJyZXFHZXRDb2luIiwicmVxR2V0RGlhbW9uZCIsInNlbGVjdFJlc3VsdCIsImtleSIsImNvbnRlbnQiLCJtaXNzaW9uTGlzdCIsImxlbmd0aCIsImluc3RhbnRpYXRlIiwicGFyZW50IiwidGl0bGUiLCJnZXREZXNjcmliZSIsImNvaW5yZXdhcmQiLCJkaW1hbmRyZXdhcmQiLCJhY3RpdmVyZXdhcmQiLCJyZXdhcmRDb2luIiwiZ2V0RmxvYXQiLCJyZXdhcmREaWFtb25kIiwiZ2V0IiwicmV3YXJkQWN0aXZlIiwicHJvZ3Jlc3MiLCJwcm9ncmVzc1RhcmdldCIsInN0YXRlIiwidGlwcyIsIlRBU0siLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX0dFVFJFV0FSRCIsInkiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsImljb24iLCJzaG93RWZmZWN0Tm9kZSIsInRvdGFsUmV3YXJkIiwicmV3YXJkSW5mbyIsInVuUmVjZWl2ZVJld2FyZCIsImFjdGl2ZVZhbHVlIiwiYm94Tm9kZSIsImJveEl0ZW0iLCJpY29uSWQiLCJyZWZyZXNoYm94IiwicmVmcmVzaFByb3Jlc3MiLCJhY3Rpdml0eSIsIngiLCJ3aWR0aCIsIm1hc2siLCJzdGFydFgiLCJlbmRYIiwicmFuZ2UiLCJqdW1wR2FtZSIsImdhbWVpZCIsImdhbWVsaXN0Y2ZnIiwib25FbnRlckdhbWUiLCJ2YWx1ZSIsInRvU3RyaW5nIiwic2hvd1BhbmVsQnlOYW1lIiwiSW5kZXgiLCJtaXNzaW9uVHlwZSIsImdhbWVJZCIsInNob3dTaG9wIiwicmV3YXJkVHlwZSIsInJld2FyZElkIiwiaWQiLCJjb2luIiwiaW50ZXJGYWNlRGF0YSIsImluZGV4IiwiZ2V0SW5kZXgiLCJzY29yZSIsInJhbmREaWFtb25kIiwic2hvd0NoaWxkUGFuZWwiLCJyYW5kQ29pbiIsIm1pbiIsIm1heCIsInJhbmRJbnRlZ3JhbCIsInNob3dNc2ciLCJBV0FSRF9USVRUTEUiLCJhbGxSZXdhcmQiLCJhd2FyZGxpc3QiLCJwdXNoIiwiYXdhcmR0eXBlIiwiQ09JTiIsImludGVncmFsIiwiU0NPUkUiLCJWSVRBTElUWSIsImRpYW1vbmQiLCJESUFNT05EIiwic2hvd0F3YXJkQm94IiwiQVdBUkRfVElQUyIsImFjdGl2ZU51bSIsIlRhc2tMaXN0IiwiQm94TGlzdCIsInBsYXlmbGFzaCIsImZsYXNoIiwic3AiLCJTa2VsZXRvbiIsInNldEFuaW1hdGlvbiIsInNldENvbXBsZXRlTGlzdGVuZXIiLCJ0cmFja0VudHJ5IiwibG9vcENvdW50IiwiYW5pbWF0aW9uIiwiYnRuX2dldFJld2FyZCIsImlzUmV3YXJkIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwiaXNUb3VyaXN0IiwicmVkRG90RGF0YSIsIm1pc3Npb25SZXEiLCJlbWl0IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsT0FBTyxHQUFHO0FBQ1pDLEVBQUFBLE9BQU8sRUFBRSxDQURHO0FBQ0E7QUFDWkMsRUFBQUEsUUFBUSxFQUFFLENBRkU7QUFFQTtBQUNaQyxFQUFBQSxTQUFTLEVBQUUsQ0FIQztBQUdDO0FBQ2JDLEVBQUFBLFNBQVMsRUFBRSxDQUpDLENBSUM7O0FBSkQsQ0FBaEI7QUFNQSxJQUFNQyxXQUFXLEdBQUc7QUFDaEIsYUFBVyxDQURLO0FBRWhCLGNBQVksQ0FGSTtBQUdoQixtQkFBaUI7QUFIRCxDQUFwQjtBQUtBLElBQU1DLFFBQVEsR0FBRztBQUNiQyxFQUFBQSxTQUFTLEVBQUUsQ0FERTtBQUViQyxFQUFBQSxVQUFVLEVBQUU7QUFGQyxDQUFqQjtBQUlBQyxNQUFNLENBQUNDLFNBQVAs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QSxRQXplb0Isc0JBeWVUO0FBQ1AsU0FBS0wsTUFBTCxDQUFZLEtBQVo7QUFDQWxDLElBQUFBLE1BQU0sQ0FBQ21CLEtBQVAsQ0FBYStHLGVBQWIsQ0FBNkIsY0FBN0I7QUFDSCxHQTVlbUI7QUE2ZXBCMUYsRUFBQUEsTUE3ZW9CLG9CQTZlWDtBQUNMLFNBQUksSUFBSWEsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxJQUFJOUQsT0FBTyxDQUFDRyxTQUE1QixFQUF1QzJELENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsVUFBRyxLQUFLNUMsVUFBTCxDQUFnQjhDLFFBQWhCLENBQXlCRixDQUF6QixFQUE0QkcsTUFBL0IsRUFBdUM7QUFDbkMsYUFBSy9DLFVBQUwsQ0FBZ0I4QyxRQUFoQixDQUF5QkYsQ0FBekIsRUFBNEJJLFlBQTVCLENBQXlDcEQsRUFBRSxDQUFDcUQsTUFBNUMsRUFBb0RDLEtBQXBEO0FBQ0E7QUFDSDtBQUNKO0FBRUosR0FyZm1CO0FBc2ZwQmxCLEVBQUFBLFdBdGZvQix5QkFzZk47QUFDVixTQUFLUCxNQUFMLENBQVksS0FBWjtBQUNBbEMsSUFBQUEsTUFBTSxDQUFDbUIsS0FBUCxDQUFhK0csZUFBYixDQUE2QixXQUE3QjtBQUNILEdBemZtQjtBQTBmcEJ4RixFQUFBQSxPQTFmb0IscUJBMGZWO0FBQ04sU0FBS1IsTUFBTCxDQUFZLEtBQVo7QUFDQWxDLElBQUFBLE1BQU0sQ0FBQ21CLEtBQVAsQ0FBYStHLGVBQWIsQ0FBNkIsT0FBN0I7QUFDSCxHQTdmbUI7QUE4ZnBCdkYsRUFBQUEsT0E5Zm9CLHFCQThmVjtBQUNOLFNBQUtULE1BQUw7QUFDSCxHQWhnQm1CO0FBaWdCcEJxSixFQUFBQSxTQWpnQm9CLHVCQWlnQlI7QUFDUixTQUFLMUosZUFBTDtBQUNIO0FBbmdCbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCB0YXNrY2ZnID0gcmVxdWlyZSgndGFza2NmZycpO1xyXG5jb25zdCBPTl9UWVBFID0ge1xyXG4gICAgREFZVEFTSzogMCwgLy8g5q+P5pel5Lu75YqhXHJcbiAgICBXRUVLVEFTSzogMSwvL+avj+WRqOS7u+WKoVxyXG4gICAgQUNISUVWRVJFOiAyLC8v5oiQ5bCx5aWW5YqxXHJcbiAgICBNQUtFTU9ORVk6IDMgLy/miJHopoHotZrpkrFcclxufVxyXG5jb25zdCBTRUxFQ1RJTkRFWCA9IHtcclxuICAgIFwiaXNEYWlseVwiOiAxLFxyXG4gICAgXCJpc1dlZWtseVwiOiAyLFxyXG4gICAgXCJpc0FjaGlldmVtZW50XCI6IDBcclxufVxyXG5jb25zdCBUYXNrVHlwZSA9IHtcclxuICAgIGRhaWx5VHlwZTogMSxcclxuICAgIGFjdGl2ZVR5cGU6IDJcclxufVxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYXdhcmRUaXBzOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgaW50ZXJGYWNlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHNlbGVjdFR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgVXN1YWxJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJveExpc3Q6IGNjLk5vZGUsXHJcbiAgICAgICAgYXJySWNvbjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbl90eXBlID0gMDsgLy8g5b2T5YmN5omA5Zyo55qE55WM6Z2i57G75Z6LXHJcbiAgICAgICAgdGhpcy5yZWNvcmQgPSB7fTsvL+Wwhuivt+axgui/h+eahOaVsOaNruWtmOWFpVxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuSW1hZ2VDb2RlID0ge1xyXG4gICAgICAgICAgICAxMDE6IHRoaXMuYXJySWNvblswXSxcclxuICAgICAgICAgICAgMTAyOiB0aGlzLmFyckljb25bMV0sXHJcbiAgICAgICAgICAgIDEwMzogdGhpcy5hcnJJY29uWzJdLFxyXG4gICAgICAgICAgICAxMDQ6IHRoaXMuYXJySWNvblszXSxcclxuICAgICAgICAgICAgMTA1OiB0aGlzLmFyckljb25bNF0sXHJcbiAgICAgICAgICAgIDEwNjogdGhpcy5hcnJJY29uWzVdLFxyXG4gICAgICAgICAgICAxMDc6IHRoaXMuYXJySWNvbls2XSxcclxuICAgICAgICAgICAgMTA4OiB0aGlzLmFyckljb25bN10sXHJcbiAgICAgICAgICAgIDEwOTogdGhpcy5hcnJJY29uWzhdLFxyXG4gICAgICAgICAgICAyMDE6IHRoaXMuYXJySWNvbls5XSxcclxuICAgICAgICAgICAgMjAyOiB0aGlzLmFyckljb25bMTBdLFxyXG4gICAgICAgICAgICAyMDM6IHRoaXMuYXJySWNvblsxMV0sXHJcbiAgICAgICAgICAgIDIwNDogdGhpcy5hcnJJY29uWzEyXSxcclxuICAgICAgICAgICAgMjA1OiB0aGlzLmFyckljb25bMTNdLFxyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdFBhcml0aWNsZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDms6jlhoznlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcy5SZXFNaXNzaW9uQ29uZmlnLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvLyDplIDmr4HnlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpc0RhaWx5XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJpc1dlZWtseVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiaXNBY2hpZXZlbWVudFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXFNaXNzaW9uTGlzdChuYW1lKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYWtlTW9ua2V5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaEZhY2UobmFtZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5yZW1vdmUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZ2V0UmV3YXJkXCI6IHRoaXMuZ2V0UmV3YXJkKCk7IGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZ29SZXdhcmRcIjogdGhpcy5nb1Jld2FyZChub2RlKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fUmV3YXJkXCI6IHRoaXMuUmV3YXJkKG5vZGUpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9nb3BvcHVsYXJpemVcIjogdGhpcy5wb3B1bGFyaXplKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2dvYW5ub3VuY2VcIjogdGhpcy5hbm5vdW5jZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9nb1Rhc2tcIjogdGhpcy5nb1Rhc2soKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZ29iYWNrV2F0ZXJcIjogdGhpcy5nb2JhY2tXYXRlcigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9nb3l1YmFvXCI6IHRoaXMuZ295dWJhbygpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9nb3BsYXphXCI6IHRoaXMuZ29wbGF6YSgpOyBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJpY29uX2JveF8xXCI6IGNhc2UgXCJpY29uX2JveF8yXCI6IGNhc2UgXCJpY29uX2JveF8zXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJpY29uX2JveF80XCI6IGNhc2UgXCJpY29uX2JveF81XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJveFJld2FyZChuYW1lLCBub2RlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5sb2coXCIgYnRuIG5hbWU6IFwiLCBuYW1lKTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6K+35rGC5qCH6aKY55qE5pi+56S6XHJcbiAgICBSZXFNaXNzaW9uQ29uZmlnKCkge1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcU1pc3Npb25Db25maWcnLCBudWxsLCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0U2VsZWN0KGRhdGEucmVzdWx0KTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdFR5cGUuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RUeXBlLmNoaWxkcmVuW2ldLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VHlwZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5jaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHRoaXMub25DbGljayhcImlzRGFpbHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLzHku7vliqEgMiDmtLvot4NcclxuICAgIC8vc3RhdGUgMTrov5vooYzkuK0gMiDlj6/pooblj5YgM+W3suWujOaIkFxyXG4gICAgUmVxTWlzc2lvbkxpc3QobmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZFtuYW1lXSkgcmV0dXJuIHRoaXMuc3dpdGNoRmFjZShuYW1lKTtcclxuICAgICAgICBsZXQgdHlwZSA9IFNFTEVDVElOREVYW25hbWVdO1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcU1pc3Npb25MaXN0JywgeyBjeWNsZVR5cGU6IHR5cGUgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkW25hbWVdID0gZGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRmFjZShuYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RmFjZUluZm8oZGF0YS5yZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRUYXNrKGRhdGEucmVzdWx0LmFjdGl2ZUxpc3QpXHJcbiAgICAgICAgICAgIHRoaXMuaXNnZXRSZXdhcmQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+S4gOasoeaAp+mihuWPluWFqOmDqOeahOWlluWKsVxyXG4gICAgUmVxTWlzc2lvbkFsbFJld2FyZChjeWNsZVR5cGUpIHtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFNaXNzaW9uQWxsUmV3YXJkJywgeyBjeWNsZVR5cGU6IGN5Y2xlVHlwZSB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0V2luZG93SW5mbyhkYXRhLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEFsbFJld2FyZCgpO1xyXG4gICAgICAgICAgICBsZXQgb2xkUmV3YXJkID0gdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5nZXRDaGlsZEJ5TmFtZShcInRvdGFsUmV3YXJkXCIpLmdldENoaWxkQnlOYW1lKFwib2xkUmV3YXJkXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIG9sZFJld2FyZC5zdHJpbmcgPSBOdW1iZXIob2xkUmV3YXJkLnN0cmluZykgLSBOdW1iZXIoZGF0YS5yZXN1bHQubWlzc2lvbkNvaW4pLmRpdigxMDApO1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5yZXFHZXRDb2luKCk7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcUdldERpYW1vbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc2dldFJld2FyZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW54K55Ye76YCJ6aG5XHJcbiAgICBpbml0U2VsZWN0KHNlbGVjdFJlc3VsdCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzZWxlY3RSZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0VHlwZS5nZXRDaGlsZEJ5TmFtZShgJHtrZXl9YCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VHlwZS5nZXRDaGlsZEJ5TmFtZShgJHtrZXl9YCkuYWN0aXZlID0gc2VsZWN0UmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdFR5cGUuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RUeXBlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKGAke2tleX1gKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VHlwZS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShgJHtrZXl9YCkuYWN0aXZlID0gc2VsZWN0UmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0VHlwZS5nZXRDaGlsZEJ5TmFtZShgbWFrZU1vbmtleWApKSB0aGlzLnNlbGVjdFR5cGUuZ2V0Q2hpbGRCeU5hbWUoYG1ha2VNb25rZXlgKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8v55WM6Z2i6L2s5o2iXHJcbiAgICBzd2l0Y2hGYWNlKG5hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW50ZXJGYWNlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlckZhY2UuY2hpbGRyZW5baV0ubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVyRmFjZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbl90eXBlID0gaTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v55WM6Z2i5L+h5oGv5Yid5aeL5YyWXHJcbiAgICBpbml0RmFjZUluZm8oZGF0YSkge1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5nZXRDaGlsZEJ5TmFtZShcIlRhc2tMaXN0XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgbGV0IG1pc3Npb25MaXN0ID0gZGF0YS5taXNzaW9uTGlzdDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pc3Npb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBVc3VhbEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlVzdWFsSXRlbSk7XHJcbiAgICAgICAgICAgIFVzdWFsSXRlbS5wYXJlbnQgPSBjb250ZW50O1xyXG4gICAgICAgICAgICBVc3VhbEl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFVzdWFsSXRlbS5nZXRDaGlsZEJ5TmFtZShcIlRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbWlzc2lvbkxpc3RbaV0udGl0bGU7XHJcbiAgICAgICAgICAgIFVzdWFsSXRlbS5nZXRDaGlsZEJ5TmFtZShcImRlc2NyaWJlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGFza2NmZy5nZXREZXNjcmliZShtaXNzaW9uTGlzdFtpXSk7XHJcbiAgICAgICAgICAgIC8vVXN1YWxJdGVtLmdldENoaWxkQnlOYW1lKFwiY29pbnJld2FyZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQobWlzc2lvbkxpc3RbaV0ucmV3YXJkQ29pbik7XHJcbiAgICAgICAgICAgIFVzdWFsSXRlbS5uYW1lID0gYCR7aX1gXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGNvaW5yZXdhcmQgPSBVc3VhbEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYXlvdXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb2lucmV3YXJkXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGltYW5kcmV3YXJkID0gVXN1YWxJdGVtLmdldENoaWxkQnlOYW1lKFwibGF5b3V0XCIpLmdldENoaWxkQnlOYW1lKFwiZGltYW5kcmV3YXJkXCIpO1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlcmV3YXJkID0gVXN1YWxJdGVtLmdldENoaWxkQnlOYW1lKFwiYWN0aXZlcmV3YXJkXCIpO1xyXG4gICAgICAgICAgICAvLyBjb2lucmV3YXJkLmFjdGl2ZSA9IG1pc3Npb25MaXN0W2ldLnJld2FyZENvaW47XHJcbiAgICAgICAgICAgIC8vIGRpbWFuZHJld2FyZC5hY3RpdmUgPSBtaXNzaW9uTGlzdFtpXS5yZXdhcmREaWFtb25kIHx8IGdsR2FtZS51c2VyLmdldChcInJvb21Td2l0Y2hcIikgPT0gMTtcclxuICAgICAgICAgICAgLy8gYWN0aXZlcmV3YXJkLmFjdGl2ZSA9IG1pc3Npb25MaXN0W2ldLnJld2FyZEFjdGl2ZTtcclxuICAgICAgICAgICAgaWYobWlzc2lvbkxpc3RbaV0ucmV3YXJkQ29pbj4wKXtcclxuICAgICAgICAgICAgICAgIGNvaW5yZXdhcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvaW5yZXdhcmQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KG1pc3Npb25MaXN0W2ldLnJld2FyZENvaW4pO1xyXG4gICAgICAgICAgICB9ZWxzZSB7Y29pbnJld2FyZC5hY3RpdmUgPSBmYWxzZTt9XHJcbiAgICAgICAgICAgIGlmKG1pc3Npb25MaXN0W2ldLnJld2FyZERpYW1vbmQ+MCYmZ2xHYW1lLnVzZXIuZ2V0KFwicm9vbVN3aXRjaFwiKSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGRpbWFuZHJld2FyZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGltYW5kcmV3YXJkLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChtaXNzaW9uTGlzdFtpXS5yZXdhcmREaWFtb25kKTtcclxuICAgICAgICAgICAgfWVsc2Uge2RpbWFuZHJld2FyZC5hY3RpdmUgPSBmYWxzZTt9XHJcbiAgICAgICAgICAgIGlmKG1pc3Npb25MaXN0W2ldLnJld2FyZEFjdGl2ZT4wKXtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZXJld2FyZC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVyZXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJfcmV3YXJkXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbWlzc2lvbkxpc3RbaV0ucmV3YXJkQWN0aXZlXHJcbiAgICAgICAgICAgIH1lbHNlIHthY3RpdmVyZXdhcmQuYWN0aXZlID0gZmFsc2U7fVxyXG4gICAgICAgICAgICAvL+aIkOWwseWlluWKseeahOmhueebruayoeaciea0u+i3g+W6puWlluWKseiAjOS4lGljb27msqHmnInlupXmoYZcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5fdHlwZSA9PSBPTl9UWVBFLkFDSElFVkVSRSkge1xyXG4gICAgICAgICAgICAgICAgVXN1YWxJdGVtLmdldENoaWxkQnlOYW1lKFwiYWN0aXZlcmV3YXJkXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlcmV3YXJkLmdldENoaWxkQnlOYW1lKFwibGFiX3Jld2FyZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1pc3Npb25MaXN0W2ldLnJld2FyZEFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/moLnmja7lvZPliY3ov5vluqbkuI7nm67moIfov5vluqbljLnphY3mmL7npLrlhoXlrrlcclxuICAgICAgICAgICAgaWYgKE51bWJlcihtaXNzaW9uTGlzdFtpXS5wcm9ncmVzcykgPj0gTnVtYmVyKG1pc3Npb25MaXN0W2ldLnByb2dyZXNzVGFyZ2V0KSAmJiBtaXNzaW9uTGlzdFtpXS5zdGF0ZSAhPSAzKSB7XHJcbiAgICAgICAgICAgICAgICBVc3VhbEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJzY2hkdWxlX2Rlc1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGdsR2FtZS50aXBzLlRBU0suU1RBVEVfQ09NUExFVEU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWlzc2lvbkxpc3RbaV0uc3RhdGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgVXN1YWxJdGVtLmdldENoaWxkQnlOYW1lKFwic2NoZHVsZV9kZXNcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBnbEdhbWUudGlwcy5UQVNLLlNUQVRFX0dFVFJFV0FSRDtcclxuICAgICAgICAgICAgICAgIFVzdWFsSXRlbS5nZXRDaGlsZEJ5TmFtZShcInNjaGR1bGVfZGVzXCIpLnkgPSA0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVXN1YWxJdGVtLmdldENoaWxkQnlOYW1lKFwic2NoZHVsZV9kZXNcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHttaXNzaW9uTGlzdFtpXS5wcm9ncmVzc30vJHttaXNzaW9uTGlzdFtpXS5wcm9ncmVzc1RhcmdldH1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFVzdWFsSXRlbS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLkltYWdlQ29kZVttaXNzaW9uTGlzdFtpXS5pY29uXTtcclxuICAgICAgICAgICAgVXN1YWxJdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX2dvUmV3YXJkXCIpLmFjdGl2ZSA9IG1pc3Npb25MaXN0W2ldLnN0YXRlID09IDE7XHJcbiAgICAgICAgICAgIFVzdWFsSXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9SZXdhcmRcIikuYWN0aXZlID0gbWlzc2lvbkxpc3RbaV0uc3RhdGUgPT0gMlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsY29udGVudCwwLjAyLHRydWUpO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxSZXdhcmQgPSB0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLmdldENoaWxkQnlOYW1lKFwidG90YWxSZXdhcmRcIik7XHJcbiAgICAgICAgdG90YWxSZXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJkYXlUb3RhbFJld2FyZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQoZGF0YS5yZXdhcmRJbmZvLnRvdGFsUmV3YXJkKTtcclxuICAgICAgICB0b3RhbFJld2FyZC5nZXRDaGlsZEJ5TmFtZShcIm9sZFJld2FyZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQoZGF0YS5yZXdhcmRJbmZvLnVuUmVjZWl2ZVJld2FyZCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluX3R5cGUgPT0gT05fVFlQRS5EQVlUQVNLIHx8IHRoaXMuaW5fdHlwZSA9PSBPTl9UWVBFLldFRUtUQVNLKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVWYWx1ZSA9IHRoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0uZ2V0Q2hpbGRCeU5hbWUoXCJhY3RpdmVOdW1cIikuZ2V0Q2hpbGRCeU5hbWUoXCJOdW1iZXJcIik7XHJcbiAgICAgICAgICAgIGFjdGl2ZVZhbHVlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS5hY3RpdmVWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8v5a+55a6d566x6L+b6KGM5o6S5bqPXHJcbiAgICBpbml0VGFzayhib3hMaXN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5fdHlwZSA+IDEpIHJldHVyblxyXG4gICAgICAgIGlmIChib3hMaXN0Lmxlbmd0aCA9PSAwKSB0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLmdldENoaWxkQnlOYW1lKFwidGFza1Byb2dyZXNzXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBib3hOb2RlID0gdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5nZXRDaGlsZEJ5TmFtZShcInRhc2tQcm9ncmVzc1wiKS5nZXRDaGlsZEJ5TmFtZShcImFsbFJld2FyZFwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJveExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJveEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJveExpc3QuZ2V0Q2hpbGRCeU5hbWUoYGljb25fYm94XyR7Ym94TGlzdFtpXS5pY29uSWR9YCkpO1xyXG4gICAgICAgICAgICBib3hJdGVtLnBhcmVudCA9IGJveE5vZGU7XHJcbiAgICAgICAgICAgIGJveEl0ZW0ubmFtZSA9IGBpY29uX2JveF8ke2kgKyAxfWBcclxuICAgICAgICAgICAgYm94SXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBsZXQgYm94ID0gYm94Tm9kZS5nZXRDaGlsZEJ5TmFtZShgaWNvbl9ib3hfJHtib3hMaXN0W2ldLmljb25JZH1gKTtcclxuICAgICAgICAgICAgLy8gYm94LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGJveC5zZXRTaWJsaW5nSW5kZXgoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qYm94Tm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjEpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoYm94KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hQcm9yZXNzKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hib3goKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hQcm9yZXNzKCk7XHJcbiAgICB9LFxyXG4gICAgcmVmcmVzaGJveCgpIHtcclxuICAgICAgICBsZXQgYm94Tm9kZSA9IHRoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YXNrUHJvZ3Jlc3NcIikuZ2V0Q2hpbGRCeU5hbWUoXCJhbGxSZXdhcmRcIik7XHJcbiAgICAgICAgbGV0IGFjdGl2ZVZhbHVlID0gTnVtYmVyKHRoaXMucmVjb3JkW3RoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0ubmFtZV0uYWN0aXZlVmFsdWUpO1xyXG4gICAgICAgIGxldCBib3hMaXN0ID0gdGhpcy5yZWNvcmRbdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5uYW1lXS5hY3RpdmVMaXN0O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm94TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBib3hOb2RlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYWNoaWV2ZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGJveExpc3RbaV0uYWN0aXZpdHk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN55qE5a6d566x5rS76LeD5bqmXCIsIGJveExpc3RbaV0uYWN0aXZpdHksIGJveE5vZGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJhY2hpZXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nKVxyXG4gICAgICAgICAgICBpZiAoYm94TGlzdFtpXS5hY3Rpdml0eSA8PSBhY3RpdmVWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJveExpc3RbaV0uc3RhdGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveE5vZGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJjbG9zaW5nXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveE5vZGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJvcGVuaW5nXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveE5vZGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJsaWdodFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveE5vZGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJtYW55cGlsbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBib3hOb2RlLmNoaWxkcmVuW2ldLnggPSAoaSArIDEpIC8gYm94TGlzdC5sZW5ndGggKiBib3hOb2RlLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/liLfmlrDov5vluqbmnaHkv6Hmga9cclxuICAgIHJlZnJlc2hQcm9yZXNzKCkge1xyXG4gICAgICAgIGxldCBib3hMaXN0ID0gdGhpcy5yZWNvcmRbdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5uYW1lXS5hY3RpdmVMaXN0O1xyXG5cclxuICAgICAgICBsZXQgYWN0aXZlVmFsdWUgPSBOdW1iZXIodGhpcy5yZWNvcmRbdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5uYW1lXS5hY3RpdmVWYWx1ZSk7XHJcbiAgICAgICAgbGV0IGJveE5vZGUgPSB0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLmdldENoaWxkQnlOYW1lKFwidGFza1Byb2dyZXNzXCIpLmdldENoaWxkQnlOYW1lKFwiYWxsUmV3YXJkXCIpO1xyXG4gICAgICAgIGxldCBtYXNrID0gdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5nZXRDaGlsZEJ5TmFtZShcInRhc2tQcm9ncmVzc1wiKS5nZXRDaGlsZEJ5TmFtZShcIm1hc2tcIik7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxib3hMaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZihhY3RpdmVWYWx1ZSA8PSBib3hMaXN0W2ldLmFjdGl2aXR5KSB7XHJcbiAgICAgICAgICAgICAgICBpZihpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLndpZHRoID0gYm94Tm9kZS5jaGlsZHJlbltpXS54ICogYWN0aXZlVmFsdWUgLyBib3hMaXN0W2ldLmFjdGl2aXR5O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRYID0gYm94Tm9kZS5jaGlsZHJlbltpLTFdLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZFggPSBib3hOb2RlLmNoaWxkcmVuW2ldLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gYm94TGlzdFtpXS5hY3Rpdml0eSAtIGJveExpc3RbaS0xXS5hY3Rpdml0eTtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLndpZHRoID0gc3RhcnRYICsgKGFjdGl2ZVZhbHVlIC0gYm94TGlzdFtpLTFdLmFjdGl2aXR5KSAvIHJhbmdlICogKGVuZFggLSBzdGFydFgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWFzay53aWR0aCA9IG1hc2suZ2V0Q2hpbGRCeU5hbWUoXCJiYXJcIikud2lkdGg7XHJcbiAgICB9LFxyXG4gICAgLy/ot7PovazmuLjmiI9cclxuICAgIGp1bXBHYW1lKGdhbWVpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiPT09PeOAi+i/meaYr+i3s+i9rOeahOa4uOaIj+eahGdhbWVpZFwiLCBnYW1laWQpO1xyXG4gICAgICAgIC8vIGdsR2FtZS5lbWl0dGVyLmVtaXQoXCJyb29tRW50cmFuY2VcIiwgZ2FtZWlkKTtcclxuICAgICAgICBpZiAoZ2FtZWlkID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuZ2FtZWxpc3RjZmcub25FbnRlckdhbWUoZ2FtZWlkLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgLy/moYzpnaLmlbDmja7nmoTmmL7npLpcclxuICAgIGdldEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIHBvcHVsYXJpemUoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoZmFsc2UpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJwb3B1bGFyaXplXCIpO1xyXG4gICAgfSxcclxuICAgIC8v5Y675a6M5oiQXHJcbiAgICBnb1Jld2FyZChub2RlKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoZmFsc2UpO1xyXG4gICAgICAgIGxldCBJbmRleCA9IG5vZGUucGFyZW50Lm5hbWU7XHJcbiAgICAgICAgbGV0IG1pc3Npb25MaXN0ID0gdGhpcy5yZWNvcmRbdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5uYW1lXS5taXNzaW9uTGlzdDtcclxuICAgICAgICBpZiAobWlzc2lvbkxpc3RbSW5kZXhdLm1pc3Npb25UeXBlID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5qdW1wR2FtZShtaXNzaW9uTGlzdFtJbmRleF0uZ2FtZUlkKVxyXG4gICAgICAgIH0gZWxzZSBpZiAobWlzc2lvbkxpc3RbSW5kZXhdLm1pc3Npb25UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcInBvcHVsYXJpemVcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtaXNzaW9uTGlzdFtJbmRleF0ubWlzc2lvblR5cGUgPT0gMyB8fCBtaXNzaW9uTGlzdFtJbmRleF0ubWlzc2lvblR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1Nob3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/pooblj5bku7vliqHlpZblirFcclxuICAgIFJld2FyZChub2RlKSB7XHJcbiAgICAgICAgbGV0IEluZGV4ID0gbm9kZS5wYXJlbnQubmFtZTtcclxuICAgICAgICBsZXQgY3ljbGVUeXBlID0gU0VMRUNUSU5ERVhbdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5uYW1lXTtcclxuICAgICAgICBsZXQgcmV3YXJkVHlwZSA9IFRhc2tUeXBlLmRhaWx5VHlwZTtcclxuICAgICAgICBsZXQgcmV3YXJkSWQgPSB0aGlzLnJlY29yZFt0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLm5hbWVdLm1pc3Npb25MaXN0W0luZGV4XS5pZDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjemihuWPluS7u+WKoeWlluWKseWPguaVsFwiLCBjeWNsZVR5cGUsIHJld2FyZFR5cGUsIHJld2FyZElkKVxyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcU1pc3Npb25SZXdhcmQnLCB7IGN5Y2xlVHlwZTogY3ljbGVUeXBlLCByZXdhcmRUeXBlOiByZXdhcmRUeXBlLCByZXdhcmRJZDogcmV3YXJkSWQgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFdpbmRvd0luZm8oZGF0YS5yZXN1bHQpXHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwic2NoZHVsZV9kZXNcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBnbEdhbWUudGlwcy5UQVNLLlNUQVRFX0dFVFJFV0FSRDtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJzY2hkdWxlX2Rlc1wiKS55ID0gNDtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fUmV3YXJkXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZFt0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLm5hbWVdLm1pc3Npb25MaXN0W0luZGV4XS5zdGF0ZSA9IDM7XHJcbiAgICAgICAgICAgIGxldCBvbGRSZXdhcmQgPSB0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLmdldENoaWxkQnlOYW1lKFwidG90YWxSZXdhcmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRSZXdhcmRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgb2xkUmV3YXJkLnN0cmluZyA9IE51bWJlcihvbGRSZXdhcmQuc3RyaW5nKSAtIE51bWJlcihkYXRhLnJlc3VsdC5jb2luKS5kaXYoMTAwKTtcclxuICAgICAgICAgICAgZ2xHYW1lLnVzZXIucmVxR2V0Q29pbigpO1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5yZXFHZXREaWFtb25kKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNnZXRSZXdhcmQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+WuneeusemihuWPluWlluWKsVxyXG4gICAgYm94UmV3YXJkKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICAvL2lmICghbm9kZS5nZXRDaGlsZEJ5TmFtZShcImxpZ2h0XCIpLmFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBpbnRlckZhY2VEYXRhID0gdGhpcy5yZWNvcmRbdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5uYW1lXVxyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXgobmFtZSk7XHJcbiAgICAgICAgbGV0IGFjdGl2ZVZhbHVlID0gaW50ZXJGYWNlRGF0YS5hY3RpdmVWYWx1ZTtcclxuICAgICAgICBsZXQgY29pbiA9IG51bGwsIHNjb3JlID0gbnVsbCxyYW5kRGlhbW9uZCA9IG51bGw7XHJcbiAgICAgICAgaWYgKE51bWJlcihpbnRlckZhY2VEYXRhLmFjdGl2ZUxpc3RbaW5kZXhdLmFjdGl2aXR5KSA+IGFjdGl2ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCBhd2FyZFRpcHMgPSBnbEdhbWUucGFuZWwuc2hvd0NoaWxkUGFuZWwodGhpcy5hd2FyZFRpcHMsIHRoaXMubm9kZSlcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnRlckZhY2VEYXRhLmFjdGl2ZUxpc3RbaW5kZXhdLnJhbmRDb2luLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb2luID0gYCR7dGhpcy5nZXRGbG9hdChpbnRlckZhY2VEYXRhLmFjdGl2ZUxpc3RbaW5kZXhdLnJhbmRDb2luLm1pbil9fiR7dGhpcy5nZXRGbG9hdChpbnRlckZhY2VEYXRhLmFjdGl2ZUxpc3RbaW5kZXhdLnJhbmRDb2luLm1heCl9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5pWw57uEXCIsIGludGVyRmFjZURhdGEuYWN0aXZlTGlzdFtpbmRleF0ucmFuZEludGVncmFsLCBpbnRlckZhY2VEYXRhLmFjdGl2ZUxpc3RbaW5kZXhdLnJhbmRJbnRlZ3JhbC5sZW5ndGgpXHJcbiAgICAgICAgICAgIGlmIChpbnRlckZhY2VEYXRhLmFjdGl2ZUxpc3RbaW5kZXhdLnJhbmRJbnRlZ3JhbC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgPSBgJHt0aGlzLmdldEZsb2F0KGludGVyRmFjZURhdGEuYWN0aXZlTGlzdFtpbmRleF0ucmFuZEludGVncmFsLm1pbil9fiR7dGhpcy5nZXRGbG9hdChpbnRlckZhY2VEYXRhLmFjdGl2ZUxpc3RbaW5kZXhdLnJhbmRJbnRlZ3JhbC5tYXgpfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW50ZXJGYWNlRGF0YS5hY3RpdmVMaXN0W2luZGV4XS5yYW5kRGlhbW9uZC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmFuZERpYW1vbmQgPSBgJHt0aGlzLmdldEZsb2F0KGludGVyRmFjZURhdGEuYWN0aXZlTGlzdFtpbmRleF0ucmFuZERpYW1vbmQubWluKX1+JHt0aGlzLmdldEZsb2F0KGludGVyRmFjZURhdGEuYWN0aXZlTGlzdFtpbmRleF0ucmFuZERpYW1vbmQubWF4KX1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhcmRUaXBzLmdldENvbXBvbmVudChcImF3YXJkVGlwc1wiKS5zaG93TXNnKGdsR2FtZS50aXBzLlRBU0suQVdBUkRfVElUVExFLCBjb2luLCBzY29yZSxyYW5kRGlhbW9uZClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjeWNsZVR5cGUgPSBTRUxFQ1RJTkRFWFt0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLm5hbWVdO1xyXG4gICAgICAgIGxldCByZXdhcmRUeXBlID0gVGFza1R5cGUuYWN0aXZlVHlwZTtcclxuICAgICAgICBsZXQgcmV3YXJkSWQgPSBpbnRlckZhY2VEYXRhLmFjdGl2ZUxpc3RbaW5kZXhdLmlkO1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcU1pc3Npb25SZXdhcmQnLCB7IGN5Y2xlVHlwZTogY3ljbGVUeXBlLCByZXdhcmRUeXBlOiByZXdhcmRUeXBlLCByZXdhcmRJZDogcmV3YXJkSWQgfSwgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFdpbmRvd0luZm8oZGF0YS5yZXN1bHQpO1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwibGlnaHRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYW55cGlsbFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImNsb3NpbmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvcGVuaW5nXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGludGVyRmFjZURhdGEuYWN0aXZlTGlzdFtpbmRleF0uc3RhdGUgPSAzO1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5yZXFHZXRDb2luKCk7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcUdldERpYW1vbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc2dldFJld2FyZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5b2T5YmN5a6d566x55qE57Si5byVXHJcbiAgICBnZXRJbmRleChuYW1lKSB7XHJcbiAgICAgICAgbGV0IGFsbFJld2FyZCA9IHRoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YXNrUHJvZ3Jlc3NcIikuZ2V0Q2hpbGRCeU5hbWUoXCJhbGxSZXdhcmRcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxSZXdhcmQuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhbGxSZXdhcmQuY2hpbGRyZW5baV0ubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbFJld2FyZC5jaGlsZHJlbltpXS5uYW1lXCIsIGFsbFJld2FyZC5jaGlsZHJlbltpXS5uYW1lLCBpLCBuYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJblvLnnqpflm57ljIXkv6Hmga9cclxuICAgIGluaXRXaW5kb3dJbmZvKGRhdGEpIHtcclxuICAgICAgICBsZXQgYXdhcmRsaXN0ID0gW107XHJcbiAgICAgICAgZGF0YS5jb2luICE9IG51bGwgJiZkYXRhLmNvaW4+MD8gYXdhcmRsaXN0LnB1c2goeyB0eXBlOiBnbEdhbWUuYXdhcmR0eXBlLkNPSU4sIHZhbHVlOiB0aGlzLmdldEZsb2F0KGRhdGEuY29pbikgfSkgOiBudWxsO1xyXG4gICAgICAgIGRhdGEuaW50ZWdyYWwgIT0gbnVsbCYmZGF0YS5pbnRlZ3JhbD4wID8gYXdhcmRsaXN0LnB1c2goeyB0eXBlOiBnbEdhbWUuYXdhcmR0eXBlLlNDT1JFLCB2YWx1ZTogdGhpcy5nZXRGbG9hdChkYXRhLmludGVncmFsKSB9KSA6IG51bGw7XHJcbiAgICAgICAgZGF0YS5hY3RpdmUgIT0gbnVsbCAmJmRhdGEuYWN0aXZlPjA/IGF3YXJkbGlzdC5wdXNoKHsgdHlwZTogZ2xHYW1lLmF3YXJkdHlwZS5WSVRBTElUWSwgdmFsdWU6IGRhdGEuYWN0aXZlIH0pIDogbnVsbDtcclxuICAgICAgICBkYXRhLmRpYW1vbmQgIT0gbnVsbCAmJmRhdGEuZGlhbW9uZD4wPyBhd2FyZGxpc3QucHVzaCh7IHR5cGU6IGdsR2FtZS5hd2FyZHR5cGUuRElBTU9ORCwgdmFsdWU6IHRoaXMuZ2V0RmxvYXQoZGF0YS5kaWFtb25kKSB9KSA6IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3lpZblirHnmoTmlbDnu4RcIiwgYXdhcmRsaXN0LCBnbEdhbWUudXNlci5nZXQoXCJyb29tU3dpdGNoXCIpKTtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0F3YXJkQm94KGdsR2FtZS50aXBzLlRBU0suQVdBUkRfVElQUywgYXdhcmRsaXN0KTtcclxuICAgICAgICBpZiAoZGF0YS5hY3RpdmUgJiYgZGF0YS5hY3RpdmUgIT0gMCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnBsYXlmbGFzaCgpO1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlTnVtID0gdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5nZXRDaGlsZEJ5TmFtZShcImFjdGl2ZU51bVwiKS5nZXRDaGlsZEJ5TmFtZShcIk51bWJlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZFt0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLm5hbWVdLmFjdGl2ZVZhbHVlID0gTnVtYmVyKHRoaXMucmVjb3JkW3RoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0ubmFtZV0uYWN0aXZlVmFsdWUpICsgTnVtYmVyKGRhdGEuYWN0aXZlKTtcclxuICAgICAgICAgICAgYWN0aXZlTnVtLnN0cmluZyA9IHRoaXMucmVjb3JkW3RoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0ubmFtZV0uYWN0aXZlVmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFByb3Jlc3MoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoYm94KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlZnJlc2hBbGxSZXdhcmQoKSB7XHJcbiAgICAgICAgbGV0IFRhc2tMaXN0ID0gdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5nZXRDaGlsZEJ5TmFtZShcIlRhc2tMaXN0XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVGFza0xpc3QuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChUYXNrTGlzdC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9SZXdhcmRcIikuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBUYXNrTGlzdC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9SZXdhcmRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBUYXNrTGlzdC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcInNjaGR1bGVfZGVzXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZ2xHYW1lLnRpcHMuVEFTSy5TVEFURV9HRVRSRVdBUkQ7XHJcbiAgICAgICAgICAgICAgICBUYXNrTGlzdC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcInNjaGR1bGVfZGVzXCIpLnkgPSA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmluX3R5cGUgIT0gT05fVFlQRS5BQ0hJRVZFUkUpIHtcclxuICAgICAgICAgICAgbGV0IEJveExpc3QgPSB0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLmdldENoaWxkQnlOYW1lKFwidGFza1Byb2dyZXNzXCIpLmdldENoaWxkQnlOYW1lKFwiYWxsUmV3YXJkXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJveExpc3QuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQm94TGlzdC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImxpZ2h0XCIpLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEJveExpc3QuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJsaWdodFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBCb3hMaXN0LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwibWFueXBpbGxcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgQm94TGlzdC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImNsb3NpbmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgQm94TGlzdC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcIm9wZW5pbmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWN0aXZlTGlzdCA9IHRoaXMucmVjb3JkW3RoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0ubmFtZV0uYWN0aXZlTGlzdDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYWN0aXZlTGlzdFtpXS5zdGF0ZSA9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtaXNzaW9uTGlzdCA9IHRoaXMucmVjb3JkW3RoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0ubmFtZV0ubWlzc2lvbkxpc3Q7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaXNzaW9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtaXNzaW9uTGlzdFtpXS5zdGF0ZSA9IDM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBwbGF5Zmxhc2goKSB7XHJcbiAgICAgICAgbGV0IGZsYXNoID0gdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5nZXRDaGlsZEJ5TmFtZShcImZsYXNoXCIpO1xyXG4gICAgICAgIGZsYXNoLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZmxhc2guZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJodW95dWVkdVwiLCBmYWxzZSk7XHJcbiAgICAgICAgZmxhc2guZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICBpZiAobmFtZSA9PSAnaHVveXVlZHUnKSB7XHJcbiAgICAgICAgICAgICAgICBmbGFzaC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy/mmK/lkKbmnInlj6/pooblj5bnmoTlpZblirFcclxuICAgIGlzZ2V0UmV3YXJkKCkge1xyXG4gICAgICAgIGxldCBUYXNrTGlzdCA9IHRoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0uZ2V0Q2hpbGRCeU5hbWUoXCJUYXNrTGlzdFwiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG5cclxuICAgICAgICBsZXQgYnRuX2dldFJld2FyZCA9IHRoaXMuaW50ZXJGYWNlLmNoaWxkcmVuW3RoaXMuaW5fdHlwZV0uZ2V0Q2hpbGRCeU5hbWUoXCJ0b3RhbFJld2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9nZXRSZXdhcmRcIik7XHJcbiAgICAgICAgbGV0IGludGVyRmFjZURhdGEgPSB0aGlzLnJlY29yZFt0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLm5hbWVdXHJcbiAgICAgICAgbGV0IGlzUmV3YXJkID0gZmFsc2U7XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBUYXNrTGlzdC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAvLyAgICAgaWYgKFRhc2tMaXN0LmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYnRuX1Jld2FyZFwiKS5hY3RpdmUpIHtcclxuICAgICAgICAvLyAgICAgICAgIGlzUmV3YXJkID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCBtaXNzaW9uTGlzdCA9IGludGVyRmFjZURhdGEubWlzc2lvbkxpc3Q7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaXNzaW9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyKG1pc3Npb25MaXN0W2ldLnByb2dyZXNzKSA+PSBOdW1iZXIobWlzc2lvbkxpc3RbaV0ucHJvZ3Jlc3NUYXJnZXQpICYmIG1pc3Npb25MaXN0W2ldLnN0YXRlICE9IDMpIHtcclxuICAgICAgICAgICAgICAgIGlzUmV3YXJkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmluX3R5cGUgIT0gT05fVFlQRS5BQ0hJRVZFUkUpIHtcclxuICAgICAgICAgICAgLy8gbGV0IEJveExpc3QgPSB0aGlzLmludGVyRmFjZS5jaGlsZHJlblt0aGlzLmluX3R5cGVdLmdldENoaWxkQnlOYW1lKFwidGFza1Byb2dyZXNzXCIpLmdldENoaWxkQnlOYW1lKFwiYWxsUmV3YXJkXCIpO1xyXG4gICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IEJveExpc3QuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoQm94TGlzdC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImxpZ2h0XCIpLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlzUmV3YXJkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBsZXQgYWN0aXZlTGlzdCA9IGludGVyRmFjZURhdGEuYWN0aXZlTGlzdFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVMaXN0W2ldLmFjdGl2aXR5IDw9IGludGVyRmFjZURhdGEuYWN0aXZlVmFsdWUgJiYgYWN0aXZlTGlzdFtpXS5zdGF0ZSAhPSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNSZXdhcmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi57qi54K56ZqQ6JePXCIsIGFjdGl2ZUxpc3RbaV0uYWN0aXZpdHksIGludGVyRmFjZURhdGEuYWN0aXZlVmFsdWUsIGFjdGl2ZUxpc3RbaV0uc3RhdGUsIGFjdGl2ZUxpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlvZPliY3kuIDplK7pooblj5bku6Xlj4rnuqLngrlcIiwgaXNSZXdhcmQpXHJcbiAgICAgICAgYnRuX2dldFJld2FyZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBpc1Jld2FyZDtcclxuICAgICAgICB0aGlzLnNlbGVjdFR5cGUuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5jaGlsZHJlblsyXS5hY3RpdmUgPSBpc1Jld2FyZDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdFR5cGUuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdFR5cGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0gJiYgdGhpcy5zZWxlY3RUeXBlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzJdLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnVzZXIucmVkRG90RGF0YS5taXNzaW9uUmVxID0gMjtcclxuICAgICAgICAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcIlJlcVJlZERvdFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlhbPpl63lpKfljoXku7vliqHnuqLngrlcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/kuIDplK7pooblj5bmiYDmnInlpZblirFcclxuICAgIGdldFJld2FyZCgpIHtcclxuICAgICAgICBsZXQgY3ljbGVUeXBlID0gU0VMRUNUSU5ERVhbdGhpcy5pbnRlckZhY2UuY2hpbGRyZW5bdGhpcy5pbl90eXBlXS5uYW1lXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOeCueWHu+exu+Wei1wiLCBjeWNsZVR5cGUpXHJcbiAgICAgICAgdGhpcy5SZXFNaXNzaW9uQWxsUmV3YXJkKGN5Y2xlVHlwZSk7XHJcbiAgICB9LFxyXG4gICAgYW5ub3VuY2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoZmFsc2UpO1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJhbm5vdW5jZW1lbnRcIik7XHJcbiAgICB9LFxyXG4gICAgZ29UYXNrKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPD0gT05fVFlQRS5BQ0hJRVZFUkU7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdFR5cGUuY2hpbGRyZW5baV0uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFR5cGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuY2hlY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIGdvYmFja1dhdGVyKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKGZhbHNlKTtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKCdiYWNrV2F0ZXInKTtcclxuICAgIH0sXHJcbiAgICBnb3l1YmFvKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKGZhbHNlKTtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKCd5dWJhbycpO1xyXG4gICAgfSxcclxuICAgIGdvcGxhemEoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
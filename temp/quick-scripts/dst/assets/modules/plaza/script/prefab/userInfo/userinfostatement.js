
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/userinfostatement.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7fa3ZATyVNfYfaGXTkFETI', 'userinfostatement');
// modules/plaza/script/prefab/userInfo/userinfostatement.js

"use strict";

var valueDirt = [{
  name: '今天',
  value: 0,
  type: "day"
}, {
  name: '昨天',
  value: 1 * 24 * 60 * 60 * 1000,
  type: "day"
}, {
  name: '前天',
  value: 2 * 24 * 60 * 60 * 1000,
  type: "day"
}, {
  name: '本周',
  value: 0,
  type: "week"
}, {
  name: '上周',
  value: 7 * 24 * 60 * 60 * 1000,
  type: "week"
}];
glGame.baseclass.extend({
  properties: {
    //
    //打码量
    bet_lab: cc.Label,
    betScroll: cc.Node,
    betContent: cc.Node,
    betItem: cc.Node,
    //奖励金额
    award_lab: cc.Label,
    awardScroll: cc.Node,
    awardContent: cc.Node,
    awardItem: cc.Node,
    //时间选项
    typeContent: cc.Node,
    typeItem: cc.Node,
    typeScr: cc.Node,
    mask: cc.Node,
    type_lab: cc.Label,
    safebox_lab: cc.Label,
    coin_lab: cc.Label,
    norecord: cc.Node
  },
  onLoad: function onLoad() {
    this.timeIndex = 0;
    this.endTime = null;
    this.startTime = null;
    this.summary = {};
    this.statementList = [];
    this.bInit = false;
    this.registerEvent();
    this.initCoin();
    this.allbet_cb();
    this.initTypeUI();
  },
  start: function start() {
    this.searchByTime();
  },
  initCoin: function initCoin() {
    this.safebox_lab.string = this.cutFloat(glGame.user.get("bank_coin"));
    this.coin_lab.string = this.cutFloat(glGame.user.get("coin"));
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_selectType":
        this.selectType_cb();
        break;

      case "mask":
        this.mask_cb();
        break;

      case "btn_allbet":
        this.allbet_cb();
        break;

      case "btn_allaward":
        this.allaward_cb();
        break;

      default:
        if (name.indexOf("typeItem") > -1) return this.click_typeItem(name);
        break;
    }
  },
  allbet_cb: function allbet_cb() {
    if (this.betScroll.active) return;
    this.awardScroll.active = false;
    this.betScroll.active = true;
    this.click_typeItem("typeItem0");
  },
  allaward_cb: function allaward_cb() {
    if (this.awardScroll.active) return;
    this.betScroll.active = false;
    this.awardScroll.active = true;
    this.click_typeItem("typeItem0");
  },
  click_typeItem: function click_typeItem(name) {
    var string = name.substring(8);
    this.type_lab.string = valueDirt[Number(string)].name;
    this.typeScr.active = this.mask.active = false;
    this.timeIndex = Number(string); //全部游戏不传这个字段就OK

    this.searchByTime();
  },
  initTypeUI: function initTypeUI() {
    var typeItem = null;

    for (var key in valueDirt) {
      if (!valueDirt[key]) continue;
      typeItem = cc.instantiate(this.typeItem);
      typeItem.name = "typeItem".concat(key);
      typeItem.getChildByName("label").getComponent(cc.Label).string = valueDirt[key].name;
      typeItem.parent = this.typeContent;
      typeItem.active = true;
    }

    if (typeItem) {
      typeItem.getChildByName("img_xialafengexian").active = false;
    }

    this.typeScr.height = this.typeContent.childrenCount <= 10 ? this.typeContent.childrenCount * this.typeItem.height : 10 * this.typeItem.height;
  },
  initUi: function initUi() {
    var data = this.statementList[this.timeIndex];

    if (!this.bInit) {
      this.bet_lab.string = this.cutFloat(data.betTotalCoin);
      this.award_lab.string = this.cutFloat(data.rewardTotalCoin);
      this.initBetScrollUI();
      this.initAwardScrollUI();
      this.bInit = true;
      return;
    }

    if (this.betScroll.active) {
      this.bet_lab.string = this.cutFloat(data.betTotalCoin);
      this.initBetScrollUI();
    } else {
      this.award_lab.string = this.cutFloat(data.rewardTotalCoin);
      this.initAwardScrollUI();
    }
  },
  initBetScrollUI: function initBetScrollUI() {
    var list = this.statementList[this.timeIndex].betList;
    this.betContent.removeAllChildren();

    if (list.length == 0) {
      this.norecord.active = true;
      return;
    }

    this.norecord.active = false;
    var stripMax = 3;
    var count = Math.ceil(list.length / stripMax);
    var stripName = ['leftLabel', 'middleLabel', 'rightLabel'];

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.betItem);
      node.parent = this.betContent;
      node.active = false;
      node.getChildByName("bg").active = i % 2 != 0;
      var stripCount = Math.min((i + 1) * stripMax);

      for (var index = i * stripMax; index < stripCount; index++) {
        var nodeLabel = node.getChildByName(stripName[index % stripMax]);
        if (index >= list.length) nodeLabel.active = false;else {
          nodeLabel.getChildByName('name').getComponent(cc.Label).string = list[index].name + "：";
          nodeLabel.getChildByName('coin').getComponent(cc.Label).string = this.cutFloat(list[index].coin);
          glGame.panel.settingTableLabelColor(nodeLabel.getChildByName('coin'));
        }
      }
    }

    glGame.panel.showEffectNode(this, this.betContent, 0.02, true);
  },
  initAwardScrollUI: function initAwardScrollUI() {
    var list = this.statementList[this.timeIndex].rewardList;
    this.awardContent.removeAllChildren();
    if (list.length == 0) return;
    var stripMax = 2;
    var count = Math.ceil(list.length / stripMax);
    var stripName = ['leftLabel', 'rightLabel'];

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.awardItem);
      node.parent = this.awardContent;
      node.active = false;
      node.getChildByName("bg").active = i % 2 != 0;
      var stripCount = Math.min((i + 1) * stripMax);

      for (var index = i * stripMax; index < stripCount; index++) {
        var nodeLabel = node.getChildByName(stripName[index % stripMax]);
        if (index >= list.length) nodeLabel.active = false;else {
          nodeLabel.getChildByName('name').getComponent(cc.Label).string = list[index].name + "：";
          nodeLabel.getChildByName('coin').getComponent(cc.Label).string = this.cutFloat(list[index].coin);
        }
      }
    }

    glGame.panel.showEffectNode(this, this.awardContent, 0.02, true);
  },
  selectType_cb: function selectType_cb() {
    this.typeScr.active = !this.typeScr.active;
    if (this.typeScr.active) this.mask.active = true;
  },
  mask_cb: function mask_cb() {
    this.typeScr.active = this.mask.active = false;
  },
  ReqReport: function ReqReport() {
    var _this = this;

    if (this.statementList[this.timeIndex]) {
      this.initUi();
      return;
    }

    var msg = {};
    msg.type = this.timeIndex + 1;
    glGame.gameNet.send_msg('http.ReqReport', msg, function (route, data) {
      _this.statementList[_this.timeIndex] = data;

      _this.initUi();
    });
  },
  cutTimeString: function cutTimeString(time) {
    var newTime = new Date(time);
    var y = newTime.getFullYear();
    var m = newTime.getMonth() + 1 < 10 ? "0" + (newTime.getMonth() + 1) : newTime.getMonth() + 1;
    var d = newTime.getDate() < 10 ? "0" + newTime.getDate() : newTime.getDate();
    var strTime = y + "-" + m + "-" + d;
    return strTime;
  },
  searchByTime: function searchByTime() {
    var index = this.timeIndex;

    if (valueDirt[index].type == "day") {
      var startTime = Date.now() - valueDirt[index].value;
      this.startTime = this.cutTimeString(startTime);
      this.endTime = this.cutTimeString(startTime);
    } else if (valueDirt[index].type == "week") {
      var _startTime = Date.now() - valueDirt[index].value;

      var newTime = new Date(_startTime);
      var y = newTime.getFullYear();
      var m = newTime.getMonth();
      var d = newTime.getDate();
      var wd = newTime.getDay() == 0 ? 7 : newTime.getDay();
      var weekStartDate = new Date(y, m, d - wd + 1);
      var weekEndDate = new Date(y, m, d + (6 - wd) + 1);
      this.startTime = this.cutTimeString(weekStartDate);
      this.endTime = this.cutTimeString(weekEndDate);
    } else {
      this.endTime = null;
      this.startTime = null;
    }

    this.ReqReport();
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.initCoin, this);
    glGame.emitter.on("userinfo_switchFace", this.closeDown, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("userinfo_switchFace", this);
  },
  closeDown: function closeDown() {
    this.typeScr.active = this.mask.active = false;
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  //浮点型运算取俩位
  cutFloat: function cutFloat(value) {
    return Number(value).div(100).toString();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xcdXNlcmluZm9zdGF0ZW1lbnQuanMiXSwibmFtZXMiOlsidmFsdWVEaXJ0IiwibmFtZSIsInZhbHVlIiwidHlwZSIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJiZXRfbGFiIiwiY2MiLCJMYWJlbCIsImJldFNjcm9sbCIsIk5vZGUiLCJiZXRDb250ZW50IiwiYmV0SXRlbSIsImF3YXJkX2xhYiIsImF3YXJkU2Nyb2xsIiwiYXdhcmRDb250ZW50IiwiYXdhcmRJdGVtIiwidHlwZUNvbnRlbnQiLCJ0eXBlSXRlbSIsInR5cGVTY3IiLCJtYXNrIiwidHlwZV9sYWIiLCJzYWZlYm94X2xhYiIsImNvaW5fbGFiIiwibm9yZWNvcmQiLCJvbkxvYWQiLCJ0aW1lSW5kZXgiLCJlbmRUaW1lIiwic3RhcnRUaW1lIiwic3VtbWFyeSIsInN0YXRlbWVudExpc3QiLCJiSW5pdCIsInJlZ2lzdGVyRXZlbnQiLCJpbml0Q29pbiIsImFsbGJldF9jYiIsImluaXRUeXBlVUkiLCJzdGFydCIsInNlYXJjaEJ5VGltZSIsInN0cmluZyIsImN1dEZsb2F0IiwidXNlciIsImdldCIsIm9uQ2xpY2siLCJub2RlIiwic2VsZWN0VHlwZV9jYiIsIm1hc2tfY2IiLCJhbGxhd2FyZF9jYiIsImluZGV4T2YiLCJjbGlja190eXBlSXRlbSIsImFjdGl2ZSIsInN1YnN0cmluZyIsIk51bWJlciIsImtleSIsImluc3RhbnRpYXRlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJwYXJlbnQiLCJoZWlnaHQiLCJjaGlsZHJlbkNvdW50IiwiaW5pdFVpIiwiZGF0YSIsImJldFRvdGFsQ29pbiIsInJld2FyZFRvdGFsQ29pbiIsImluaXRCZXRTY3JvbGxVSSIsImluaXRBd2FyZFNjcm9sbFVJIiwibGlzdCIsImJldExpc3QiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImxlbmd0aCIsInN0cmlwTWF4IiwiY291bnQiLCJNYXRoIiwiY2VpbCIsInN0cmlwTmFtZSIsImkiLCJzdHJpcENvdW50IiwibWluIiwiaW5kZXgiLCJub2RlTGFiZWwiLCJjb2luIiwicGFuZWwiLCJzZXR0aW5nVGFibGVMYWJlbENvbG9yIiwic2hvd0VmZmVjdE5vZGUiLCJyZXdhcmRMaXN0IiwiUmVxUmVwb3J0IiwibXNnIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJjdXRUaW1lU3RyaW5nIiwidGltZSIsIm5ld1RpbWUiLCJEYXRlIiwieSIsImdldEZ1bGxZZWFyIiwibSIsImdldE1vbnRoIiwiZCIsImdldERhdGUiLCJzdHJUaW1lIiwibm93Iiwid2QiLCJnZXREYXkiLCJ3ZWVrU3RhcnREYXRlIiwid2Vla0VuZERhdGUiLCJlbWl0dGVyIiwib24iLCJjbG9zZURvd24iLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJPbkRlc3Ryb3kiLCJkaXYiLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxTQUFTLEdBQUcsQ0FDZDtBQUFFQyxFQUFBQSxJQUFJLEVBQUUsSUFBUjtBQUFjQyxFQUFBQSxLQUFLLEVBQUUsQ0FBckI7QUFBd0JDLEVBQUFBLElBQUksRUFBRTtBQUE5QixDQURjLEVBRWQ7QUFBRUYsRUFBQUEsSUFBSSxFQUFFLElBQVI7QUFBY0MsRUFBQUEsS0FBSyxFQUFFLElBQUksRUFBSixHQUFTLEVBQVQsR0FBYyxFQUFkLEdBQW1CLElBQXhDO0FBQThDQyxFQUFBQSxJQUFJLEVBQUU7QUFBcEQsQ0FGYyxFQUdkO0FBQUVGLEVBQUFBLElBQUksRUFBRSxJQUFSO0FBQWNDLEVBQUFBLEtBQUssRUFBRSxJQUFJLEVBQUosR0FBUyxFQUFULEdBQWMsRUFBZCxHQUFtQixJQUF4QztBQUE4Q0MsRUFBQUEsSUFBSSxFQUFFO0FBQXBELENBSGMsRUFJZDtBQUFFRixFQUFBQSxJQUFJLEVBQUUsSUFBUjtBQUFjQyxFQUFBQSxLQUFLLEVBQUUs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UUFyUW9CLG9CQXFRWHZDLEtBclFXLEVBcVFKO0FBQ1osV0FBUW1ELE1BQU0sQ0FBQ25ELEtBQUQsQ0FBTixDQUFjK0csR0FBZCxDQUFrQixHQUFsQixDQUFELENBQXlCQyxRQUF6QixFQUFQO0FBQ0g7QUF2UW1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgdmFsdWVEaXJ0ID0gW1xyXG4gICAgeyBuYW1lOiAn5LuK5aSpJywgdmFsdWU6IDAsIHR5cGU6IFwiZGF5XCIgfSxcclxuICAgIHsgbmFtZTogJ+aYqOWkqScsIHZhbHVlOiAxICogMjQgKiA2MCAqIDYwICogMTAwMCwgdHlwZTogXCJkYXlcIiB9LFxyXG4gICAgeyBuYW1lOiAn5YmN5aSpJywgdmFsdWU6IDIgKiAyNCAqIDYwICogNjAgKiAxMDAwLCB0eXBlOiBcImRheVwiIH0sXHJcbiAgICB7IG5hbWU6ICfmnKzlkagnLCB2YWx1ZTogMCwgdHlwZTogXCJ3ZWVrXCIgfSxcclxuICAgIHsgbmFtZTogJ+S4iuWRqCcsIHZhbHVlOiA3ICogMjQgKiA2MCAqIDYwICogMTAwMCwgdHlwZTogXCJ3ZWVrXCIgfSxcclxuXVxyXG5cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/miZPnoIHph49cclxuICAgICAgICBiZXRfbGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBiZXRTY3JvbGw6IGNjLk5vZGUsXHJcbiAgICAgICAgYmV0Q29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBiZXRJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIC8v5aWW5Yqx6YeR6aKdXHJcbiAgICAgICAgYXdhcmRfbGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBhd2FyZFNjcm9sbDogY2MuTm9kZSxcclxuICAgICAgICBhd2FyZENvbnRlbnQ6IGNjLk5vZGUsXHJcbiAgICAgICAgYXdhcmRJdGVtOiBjYy5Ob2RlLFxyXG5cclxuICAgICAgICAvL+aXtumXtOmAiemhuVxyXG4gICAgICAgIHR5cGVDb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIHR5cGVJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIHR5cGVTY3I6IGNjLk5vZGUsXHJcbiAgICAgICAgbWFzazogY2MuTm9kZSxcclxuICAgICAgICB0eXBlX2xhYjogY2MuTGFiZWwsXHJcblxyXG4gICAgICAgIHNhZmVib3hfbGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBjb2luX2xhYjogY2MuTGFiZWwsXHJcblxyXG4gICAgICAgIG5vcmVjb3JkOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnRpbWVJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5lbmRUaW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdW1tYXJ5ID0ge307XHJcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnRMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iSW5pdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmluaXRDb2luKCk7XHJcbiAgICAgICAgdGhpcy5hbGxiZXRfY2IoKTtcclxuICAgICAgICB0aGlzLmluaXRUeXBlVUkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hCeVRpbWUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdENvaW4oKSB7XHJcbiAgICAgICAgdGhpcy5zYWZlYm94X2xhYi5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGdsR2FtZS51c2VyLmdldChcImJhbmtfY29pblwiKSk7XHJcbiAgICAgICAgdGhpcy5jb2luX2xhYi5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGdsR2FtZS51c2VyLmdldChcImNvaW5cIikpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fc2VsZWN0VHlwZVwiOiB0aGlzLnNlbGVjdFR5cGVfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6IHRoaXMubWFza19jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9hbGxiZXRcIjogdGhpcy5hbGxiZXRfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYWxsYXdhcmRcIjogdGhpcy5hbGxhd2FyZF9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lLmluZGV4T2YoXCJ0eXBlSXRlbVwiKSA+IC0xKSByZXR1cm4gdGhpcy5jbGlja190eXBlSXRlbShuYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYWxsYmV0X2NiKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmJldFNjcm9sbC5hY3RpdmUpIHJldHVybjtcclxuICAgICAgICB0aGlzLmF3YXJkU2Nyb2xsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmV0U2Nyb2xsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jbGlja190eXBlSXRlbShcInR5cGVJdGVtMFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWxsYXdhcmRfY2IoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXdhcmRTY3JvbGwuYWN0aXZlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5iZXRTY3JvbGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hd2FyZFNjcm9sbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tfdHlwZUl0ZW0oXCJ0eXBlSXRlbTBcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX3R5cGVJdGVtKG5hbWUpIHtcclxuICAgICAgICBsZXQgc3RyaW5nID0gbmFtZS5zdWJzdHJpbmcoOCk7XHJcbiAgICAgICAgdGhpcy50eXBlX2xhYi5zdHJpbmcgPSB2YWx1ZURpcnRbTnVtYmVyKHN0cmluZyldLm5hbWU7XHJcbiAgICAgICAgdGhpcy50eXBlU2NyLmFjdGl2ZSA9IHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVJbmRleCA9IE51bWJlcihzdHJpbmcpOyAgICAgIC8v5YWo6YOo5ri45oiP5LiN5Lyg6L+Z5Liq5a2X5q615bCxT0tcclxuICAgICAgICB0aGlzLnNlYXJjaEJ5VGltZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0VHlwZVVJKCkge1xyXG4gICAgICAgIGxldCB0eXBlSXRlbSA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHZhbHVlRGlydCkge1xyXG4gICAgICAgICAgICBpZiAoIXZhbHVlRGlydFtrZXldKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdHlwZUl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnR5cGVJdGVtKTtcclxuICAgICAgICAgICAgdHlwZUl0ZW0ubmFtZSA9IGB0eXBlSXRlbSR7a2V5fWBcclxuICAgICAgICAgICAgdHlwZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZhbHVlRGlydFtrZXldLm5hbWU7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtLnBhcmVudCA9IHRoaXMudHlwZUNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHR5cGVJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlSXRlbSkge1xyXG4gICAgICAgICAgICB0eXBlSXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ194aWFsYWZlbmdleGlhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudHlwZVNjci5oZWlnaHQgPSB0aGlzLnR5cGVDb250ZW50LmNoaWxkcmVuQ291bnQ8PTEwP3RoaXMudHlwZUNvbnRlbnQuY2hpbGRyZW5Db3VudCp0aGlzLnR5cGVJdGVtLmhlaWdodDoxMCp0aGlzLnR5cGVJdGVtLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdFVpKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZW1lbnRMaXN0W3RoaXMudGltZUluZGV4XTtcclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5iSW5pdCkge1xyXG4gICAgICAgICAgICB0aGlzLmJldF9sYWIuc3RyaW5nID0gdGhpcy5jdXRGbG9hdChkYXRhLmJldFRvdGFsQ29pbik7XHJcbiAgICAgICAgICAgIHRoaXMuYXdhcmRfbGFiLnN0cmluZyA9IHRoaXMuY3V0RmxvYXQoZGF0YS5yZXdhcmRUb3RhbENvaW4pO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCZXRTY3JvbGxVSSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRBd2FyZFNjcm9sbFVJKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYkluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmJldFNjcm9sbC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5iZXRfbGFiLnN0cmluZyA9IHRoaXMuY3V0RmxvYXQoZGF0YS5iZXRUb3RhbENvaW4pO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCZXRTY3JvbGxVSSgpOyAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF3YXJkX2xhYi5zdHJpbmcgPSB0aGlzLmN1dEZsb2F0KGRhdGEucmV3YXJkVG90YWxDb2luKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0QXdhcmRTY3JvbGxVSSgpOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRCZXRTY3JvbGxVSSgpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuc3RhdGVtZW50TGlzdFt0aGlzLnRpbWVJbmRleF0uYmV0TGlzdDtcclxuICAgICAgICB0aGlzLmJldENvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vcmVjb3JkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9yZWNvcmQuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBzdHJpcE1heCA9IDM7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gTWF0aC5jZWlsKGxpc3QubGVuZ3RoIC8gc3RyaXBNYXgpO1xyXG4gICAgICAgIGxldCBzdHJpcE5hbWUgPSBbJ2xlZnRMYWJlbCcsICdtaWRkbGVMYWJlbCcsICdyaWdodExhYmVsJ107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5iZXRJdGVtKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmJldENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSBpICUgMiAhPSAwO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0cmlwQ291bnQgPSBNYXRoLm1pbigoaSArIDEpICogc3RyaXBNYXgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IGkgKiBzdHJpcE1heDsgaW5kZXggPCBzdHJpcENvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUxhYmVsID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShzdHJpcE5hbWVbaW5kZXggJSBzdHJpcE1heF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IGxpc3QubGVuZ3RoKSBub2RlTGFiZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlTGFiZWwuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxpc3RbaW5kZXhdLm5hbWUgKyBcIu+8mlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVMYWJlbC5nZXRDaGlsZEJ5TmFtZSgnY29pbicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jdXRGbG9hdChsaXN0W2luZGV4XS5jb2luKTtcclxuICAgICAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2V0dGluZ1RhYmxlTGFiZWxDb2xvcihub2RlTGFiZWwuZ2V0Q2hpbGRCeU5hbWUoJ2NvaW4nKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLHRoaXMuYmV0Q29udGVudCwwLjAyLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0QXdhcmRTY3JvbGxVSSgpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuc3RhdGVtZW50TGlzdFt0aGlzLnRpbWVJbmRleF0ucmV3YXJkTGlzdDtcclxuICAgICAgICB0aGlzLmF3YXJkQ29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHN0cmlwTWF4ID0gMjtcclxuICAgICAgICBsZXQgY291bnQgPSBNYXRoLmNlaWwobGlzdC5sZW5ndGggLyBzdHJpcE1heCk7XHJcbiAgICAgICAgbGV0IHN0cmlwTmFtZSA9IFsnbGVmdExhYmVsJywgJ3JpZ2h0TGFiZWwnXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmF3YXJkSXRlbSk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5hd2FyZENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSBpICUgMiAhPSAwO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0cmlwQ291bnQgPSBNYXRoLm1pbigoaSArIDEpICogc3RyaXBNYXgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IGkgKiBzdHJpcE1heDsgaW5kZXggPCBzdHJpcENvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUxhYmVsID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShzdHJpcE5hbWVbaW5kZXggJSBzdHJpcE1heF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IGxpc3QubGVuZ3RoKSBub2RlTGFiZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlTGFiZWwuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGxpc3RbaW5kZXhdLm5hbWUgKyBcIu+8mlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVMYWJlbC5nZXRDaGlsZEJ5TmFtZSgnY29pbicpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jdXRGbG9hdChsaXN0W2luZGV4XS5jb2luKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsdGhpcy5hd2FyZENvbnRlbnQsMC4wMix0cnVlKTtcclxuICAgIH0sXHJcbiAgICBzZWxlY3RUeXBlX2NiKCkge1xyXG4gICAgICAgIHRoaXMudHlwZVNjci5hY3RpdmUgPSAhdGhpcy50eXBlU2NyLmFjdGl2ZTtcclxuICAgICAgICBpZiAodGhpcy50eXBlU2NyLmFjdGl2ZSkgdGhpcy5tYXNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWFza19jYigpIHtcclxuICAgICAgICB0aGlzLnR5cGVTY3IuYWN0aXZlID0gdGhpcy5tYXNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXFSZXBvcnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVtZW50TGlzdFt0aGlzLnRpbWVJbmRleF0pIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXNnID0ge307XHJcbiAgICAgICAgbXNnLnR5cGUgPSB0aGlzLnRpbWVJbmRleCArIDE7XHJcblxyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVJlcG9ydCcsIG1zZywgKHJvdXRlLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVtZW50TGlzdFt0aGlzLnRpbWVJbmRleF0gPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjdXRUaW1lU3RyaW5nKHRpbWUpIHtcclxuICAgICAgICBsZXQgbmV3VGltZSA9IG5ldyBEYXRlKHRpbWUpO1xyXG4gICAgICAgIGxldCB5ID0gbmV3VGltZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIGxldCBtID0gKG5ld1RpbWUuZ2V0TW9udGgoKSArIDEpIDwgMTAgPyBcIjBcIiArIChuZXdUaW1lLmdldE1vbnRoKCkgKyAxKSA6IChuZXdUaW1lLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICBsZXQgZCA9IG5ld1RpbWUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIG5ld1RpbWUuZ2V0RGF0ZSgpIDogbmV3VGltZS5nZXREYXRlKCk7XHJcbiAgICAgICAgbGV0IHN0clRpbWUgPSB5ICsgXCItXCIgKyBtICsgXCItXCIgKyBkO1xyXG4gICAgICAgIHJldHVybiBzdHJUaW1lO1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIHNlYXJjaEJ5VGltZSgpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnRpbWVJbmRleDtcclxuICAgICAgICBpZiAodmFsdWVEaXJ0W2luZGV4XS50eXBlID09IFwiZGF5XCIpIHtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IERhdGUubm93KCkgLSB2YWx1ZURpcnRbaW5kZXhdLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuY3V0VGltZVN0cmluZyhzdGFydFRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmN1dFRpbWVTdHJpbmcoc3RhcnRUaW1lKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlRGlydFtpbmRleF0udHlwZSA9PSBcIndlZWtcIikge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKSAtIHZhbHVlRGlydFtpbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBuZXdUaW1lID0gbmV3IERhdGUoc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgbGV0IHkgPSBuZXdUaW1lLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIGxldCBtID0gbmV3VGltZS5nZXRNb250aCgpO1xyXG4gICAgICAgICAgICBsZXQgZCA9IG5ld1RpbWUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICBsZXQgd2QgPSBuZXdUaW1lLmdldERheSgpID09IDAgPyA3IDogbmV3VGltZS5nZXREYXkoKTtcclxuICAgICAgICAgICAgdmFyIHdlZWtTdGFydERhdGUgPSBuZXcgRGF0ZSh5LCBtLCBkIC0gd2QgKyAxKTtcclxuICAgICAgICAgICAgdmFyIHdlZWtFbmREYXRlID0gbmV3IERhdGUoeSwgbSwgZCArICg2IC0gd2QpICsgMSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuY3V0VGltZVN0cmluZyh3ZWVrU3RhcnREYXRlKTtcclxuICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5jdXRUaW1lU3RyaW5nKHdlZWtFbmREYXRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVuZFRpbWUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVxUmVwb3J0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOazqOWGjOeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZVVzZXJEYXRhXCIsIHRoaXMuaW5pdENvaW4sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXNlcmluZm9fc3dpdGNoRmFjZVwiLCB0aGlzLmNsb3NlRG93biwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgLy8g6ZSA5q+B55WM6Z2i55uR5ZCs5LqL5Lu2XHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXNlcmluZm9fc3dpdGNoRmFjZVwiLHRoaXMpO1xyXG4gICAgfSxcclxuICAgIGNsb3NlRG93bigpe1xyXG4gICAgICAgIHRoaXMudHlwZVNjci5hY3RpdmUgPSB0aGlzLm1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5rWu54K55Z6L6L+Q566X5Y+W5L+p5L2NXHJcbiAgICBjdXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
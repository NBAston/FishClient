"use strict";
cc._RF.push(module, '58429PuezNNUKAS8nlSnqLh', 'juhua');
// modules/public/script/msgbox/juhua.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_juhua: cc.Node
  },
  onLoad: function onLoad() {
    this.CountTime();
  },
  CountTime: function CountTime() {
    var _this = this;

    this.beginTime = new Date().getTime();
    this.node.zIndex = 1000;
    this.node_juhua.runAction(cc.repeatForever(cc.rotateBy(1.5, 360)));
    this.node.children[0].active = false;
    this.node.children[1].active = false; //菊花必须在网络访问后 一定时间后才开启

    this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
      _this.node.children[0].active = true;
      _this.node.children[1].active = true;
    })));
    this.time_max = 40;
    this.scheduleOnce(this.timeSchedule.bind(this), this.time_max);
  },
  setdisplay: function setdisplay() {
    this.node.children[0].active = true;
    this.node.children[1].active = true;
  },
  //默认关闭所有的菊花事件
  hidepic: function hidepic() {
    this.node.stopAllActions();
    this.node.children[0].active = false;
    this.node.children[1].active = false;
    this.unschedule(this.timeSchedule.bind(this));
  },
  timeSchedule: function timeSchedule() {
    if (this.node == null || this.node.runAction == null) return;
    glGame.panel.showErrorTip("网络断开连接，请重新登录！");
    this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
      //清除登录缓存
      // glGame.storage.removeItemByKey("loginCache");
      // 重启游戏
      reStartGame();
    })));
  },
  OnDestroy: function OnDestroy() {
    this.unschedule(this.timeSchedule.bind(this));
  },
  set: function set() {}
});

cc._RF.pop();
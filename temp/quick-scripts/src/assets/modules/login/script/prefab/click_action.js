"use strict";
cc._RF.push(module, '33150bTLOlNtJHyA7WMWqk4', 'click_action');
// modules/login/script/prefab/click_action.js

"use strict";

glGame.baseclass.extend({
  properties: {
    click_node: cc.Node,
    chick_act: cc.Node,
    chick_meihua: cc.Node,
    base_sprite: cc.SpriteFrame
  },
  onLoad: function onLoad() {
    this.registerEvent();
    cc.game.addPersistRootNode(this.node);
    this.creatSmear = true;
    this.itemScale = glGame.systemclass.convertInterface();
  },
  start: function start() {},
  registerEvent: function registerEvent() {
    glGame.emitter.on(MESSAGE.SYSTEM.TOUCH_BEGIN, this.clickCallBack, this);
    glGame.emitter.on(MESSAGE.SYSTEM.TOUCH_MOVE, this.moveCallBack, this);
    glGame.emitter.on(MESSAGE.SYSTEM.TOUCH_STATE, this.stateCallBack, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off(MESSAGE.SYSTEM.TOUCH_BEGIN, this);
    glGame.emitter.off(MESSAGE.SYSTEM.TOUCH_MOVE, this);
    glGame.emitter.off(MESSAGE.SYSTEM.TOUCH_STATE, this);
  },
  clickCallBack: function clickCallBack(pos) {
    this.action(pos);
  },
  moveCallBack: function moveCallBack(pos) {
    var _this = this;

    if (!this.creatSmear) return;
    this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
      _this.creatSmear = true;
    })));
    this.action(pos);
    this.creatSmear = false;
  },
  //设置点击特效的资源图片
  stateCallBack: function stateCallBack(picObj) {
    this.chick_meihua.getComponent(cc.Sprite).spriteFrame = picObj ? picObj : this.base_sprite;
    this.chick_act.getComponent(cc.ParticleSystem).spriteFrame = picObj ? picObj : this.base_sprite; //刷新图片，避免出现方块
  },
  action: function action(Pos) {
    var clickItem = cc.instantiate(this.chick_act);
    clickItem.parent = this.node;
    clickItem.active = true;
    clickItem.position = Pos;
    clickItem.scale = glGame.systemclass.convertInterface();
    clickItem.runAction(cc.sequence(cc.delayTime(0.6), cc.removeSelf()));
    var meihua = cc.instantiate(this.chick_meihua);
    meihua.parent = clickItem;
    meihua.active = true;
    meihua.x = 0;
    meihua.y = 0;
    meihua.scale = 1;
    var delay = cc.delayTime(0.1);
    var fadeOut = cc.fadeOut(0.3);
    var scaleTo = cc.scaleTo(0.4, 2.25);
    meihua.runAction(cc.spawn(cc.sequence(delay, fadeOut), scaleTo));
  },
  update: function update(dt) {},
  onDestroy: function onDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
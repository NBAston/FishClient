"use strict";
cc._RF.push(module, 'bb1e7x88CZGWpoS0eXLIh+i', 'confirmbox');
// modules/public/script/msgbox/confirmbox.js

"use strict";

glGame.baseclass.extend({
  properties: {
    node_cancel: cc.Node,
    cancel_label: cc.Label,
    node_confirm: cc.Node,
    confirm_label: cc.Label,
    lab_content: cc.Label,
    richText_content: cc.RichText
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1000;
    this.node.scale = glGame.systemclass.convertInterface();
    this.confirm = null;
    this.cancel = null;
    this.registerEvent();
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on("onStartGame", this.onStartGame, this);
  },
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("onStartGame", this);
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.cancel();
        break;

      case "confirm":
        this.confirm();
        break;

      default:
        console.error("no find button name -> %s", name);
    }

    this.remove();
  },

  /**
   * @param content 提示内容
   * @param isSingle 是否显示单个确定按钮
   * @param next 确定回调
   * @param cancel 取消回调
   * @param cancel_label 取消按钮文本
   * @param confirm_label 确定按钮文本
   */
  showMsg: function showMsg(content, isSingle, next, cancel, cancel_label, confirm_label) {
    var center = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    this.confirm = next || function () {};

    this.cancel = cancel || function () {
      this.node.destroy();
    };

    this.setType(isSingle);

    if (~content.indexOf("<color=")) {
      this.lab_content.node.active = false;
      this.richText_content.node.active = true;
      this.richText_content.string = content;
    } else {
      this.lab_content.string = content;
    }

    this.lab_content._forceUpdateRenderData();

    if (this.lab_content.node.height > 100) {
      this.lab_content.horizontalAlign = 0;
      this.setNewlineContent(this.lab_content);
    }

    if (this.richText_content.node.height > 100) {
      this.richText_content.horizontalAlign = 0;
      this.setNewlineContent(this.richText_content);
    }

    if (center) {
      this.lab_content.horizontalAlign = 1;
    }

    if (confirm_label) this.confirm_label.string = confirm_label;
  },
  onStartGame: function onStartGame() {
    this.remove();
  },
  //显示类型
  setType: function setType(isSingle) {
    if (isSingle) {
      this.node_cancel.active = false;
      this.node_confirm['_firstX'] = this.node_confirm.x;
      this.node_confirm.x = 0;
    } else {
      this.node_cancel.active = true;
      if (this.node_confirm['_firstX']) this.node_confirm.x = this.node_confirm['_firstX'];
    }
  },
  //有换行添加新的空格内容
  setNewlineContent: function setNewlineContent(lab_content) {
    var vacancy = "      ";
    lab_content.string = vacancy + lab_content.string;
  }
});

cc._RF.pop();
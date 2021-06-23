
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/email/email.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5c01f8L5/dK6bkitkZdSEHX', 'email');
// modules/plaza/script/prefab/email/email.js

"use strict";

/**
 * 邮件面板
 */
var MAIL_TYPE_ANNOUN = 0;
var MAIL_TYPE_SYSTEM = 1;
var MAIL_TYPE_MONEY = 2;
glGame.baseclass.extend({
  properties: {
    emailListView: cc.Node,
    // 邮件item列表
    emailItem: cc.Node,
    emailDetail: cc.Node,
    //正常邮件详细内容
    emailstatus: [cc.SpriteFrame],
    //邮件图片状态
    SystemScorll: cc.ScrollView,
    //其他的scorll
    MoneyScorll: cc.ScrollView,
    //其他的scorll
    btn_alldelete: cc.Button,
    btn_allRead: cc.Button,
    content: cc.Node,
    SystemEmail: cc.Node,
    MoneyEmail: cc.Node,
    node_noInfo: cc.Node,
    sysRedDot: cc.Node,
    coinRedDot: cc.Node,
    node_titleList: cc.Node,
    audio_coin: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.registerEvent();
    this.isReceive = false;
    this.page = [0, 1, 1];
    this.contenHeight = 0;
    this.emailUpdate = false;
    this.announUpdate = false;
    this.getIsAllGet = false;
    this.getIsAllDelete = false;
    this.index = 0;
    this.annPage = 1;
    this.tipTimeOut = null;
    this.textIndex = 1; //控制是否能提示飘字未查看还可领取，

    this.fistTime = true;
    this.MailMax = 10;
    this.msg = {};
    glGame.panel.showEffectPariticle(this.node); //this.reqSystemEmail();
  },
  // 初始化邮件数据
  resetData: function resetData() {// this.emailData = glGame.user.get("emails");
    //console.log('======查看邮件item',this.emailData)
  },
  initReddot: function initReddot() {
    var emailData = glGame.user.get("EmailData");
    this.sysRedDot.active = !!emailData.systemUnreadCount; //if (!!emailData.systemUnreadCount) this.sysRedDot.getChildByName("num").getComponent(cc.Label).string = emailData.systemUnreadCount;

    this.coinRedDot.active = !!emailData.moneyUnreadCount; //if (!!emailData.moneyUnreadCount) this.coinRedDot.getChildByName("num").getComponent(cc.Label).string = emailData.moneyUnreadCount;
  },
  // UI显示
  showUI: function showUI() {
    var setOne = true;

    for (var i = 0; i < this.emailListView.childrenCount; i++) {
      this.emailListView.children[i].active = true;

      if (setOne) {
        this.btnfirst = this.emailListView.children[i];
        setOne = false;
      }
    } //this.btnfirst.getComponent(cc.Toggle).isChecked = true;
    //this.onClick(this.btnfirst.name, this.btnfirst);

  },
  onClick: function onClick(name, node) {
    console.log('nnnnname', name);

    switch (name) {
      case "systemEmail":
        this.reqSystemEmail();
        break;

      case "moneyEmail":
        this.reqMoneyEmail();
        break;

      case "btn_close":
        this.remove();
        break;

      case "btn_closeDetail":
        this.CuremailDetail.destroy();
        break;
      //关闭邮件详情

      case "btn_alldelete":
        this.openDeleteFace(true);
        break;

      case "btn_allread":
        this.click_allread();
        break;
      //确定删除

      case "btn_delete":
        this.openDeleteFace(false);
        break;

      case "btn_realDelet":
        this.click_delete();
        break;
      //确定删除

      case 'btn_canel':
      default:
        if (this.SystemScorll.node.active) {
          for (var i = 0; i < this.SystemEmail.childrenCount; i++) {
            if (this.SystemEmail.children[i].name == name) {
              this.CuremailId = name;
              glGame.user.reqMailInfo(name, this.type);
              break;
            }
          }

          ;
        } else if (this.MoneyScorll.node.active) {
          for (var _i = 0; _i < this.MoneyEmail.childrenCount; _i++) {
            if (this.MoneyEmail.children[_i].name == name) {
              this.CuremailId = name;
              glGame.user.reqMailInfo(name, this.type);
              break;
            }
          }

          ;
        }

        break;
    }
  },
  reqSystemEmail: function reqSystemEmail() {
    this.btn_alldelete.node.active = this.SystemEmail.childrenCount > 0;
    this.btn_allRead.node.active = this.SystemEmail.childrenCount > 0;
    this.type = MAIL_TYPE_SYSTEM;
    this.textIndex = 1;
    this.SystemScorll.node.active = true;
    this.MoneyScorll.node.active = false;
    this.node_noInfo.active = this.SystemEmail.childrenCount == 0;

    if (!this.msg[this.type]) {
      glGame.user.reqMailList(this.page[this.type], this.MailMax, this.type);
    } else {
      this.node.getChildByName("panel").getChildByName("img_wujilu").active = this.SystemEmail.childrenCount == 0;
    }
  },
  reqMoneyEmail: function reqMoneyEmail() {
    this.type = MAIL_TYPE_MONEY;
    this.textIndex = 1;
    this.btn_allRead.node.active = this.MoneyEmail.childrenCount > 0;
    this.btn_alldelete.node.active = this.MoneyEmail.childrenCount > 0;
    this.SystemScorll.node.active = false;
    this.MoneyScorll.node.active = true;
    this.node_noInfo.active = this.MoneyEmail.childrenCount == 0;

    if (!this.msg[this.type]) {
      glGame.user.reqMailList(this.page[this.type], this.MailMax, this.type);
    } else {
      this.node.getChildByName("panel").getChildByName("img_wujilu").active = this.MoneyEmail.childrenCount == 0;
    }
  },

  /**
   *
   * @param {*} bool true: 全部删除 false: 指定删除
   */
  openDeleteFace: function openDeleteFace(bool) {
    var strText = "";

    if (bool) {
      strText = glGame.tips.EMAIL.DELETEALL;
      this.getIsAllDelete = true;
    } else {
      strText = glGame.tips.EMAIL.DELETEONE;
      this.getIsAllDelete = false;
    }

    glGame.panel.showDialog("", strText, this.click_delete.bind(this));
  },
  //点击删除邮件
  click_delete: function click_delete() {
    if (this.getIsAllDelete) {
      this.btn_allRead.node.active = false;
      this.btn_alldelete.node.active = false;
      glGame.user.ReqDeleMail(this.type);
    } else {
      this.textIndex = 1;
      glGame.user.ReqDeleOneMail(this.CuremailId);
    }
  },
  click_allread: function click_allread() {
    //if (!glGame.user.EmailData.systemUnreadCount) return;
    glGame.user.ReqAllReadMail(this.type);
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateEmailContent", this.updateEmailContent, this);
    glGame.emitter.on("updateEmail", this.updateEmail, this);
    glGame.emitter.on("updateDeleOneMail", this.updateDeleOneMail, this);
    glGame.emitter.on("updateDeleMail", this.updateDeleMail, this);
    glGame.emitter.on("updateReadAllMail", this.updateReadAllMail, this);
    glGame.emitter.on("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this.reqMoneyEmail, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateEmailContent", this);
    glGame.emitter.off("updateEmail", this);
    glGame.emitter.off("updateDeleOneMail", this);
    glGame.emitter.off("updateDeleMail", this);
    glGame.emitter.off("updateReadAllMail", this);
    glGame.emitter.off("".concat(this.node.name).concat(MESSAGE.UI.ACTION_END), this);
  },
  // 界面销毁的时候, 注销事件, 刷新一下看看有没最新邮件
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
    glGame.user.ReqRedDot();
    glGame.user.clearMail();
  },
  //邮件列表
  updateEmail: function updateEmail() {
    this.node.getChildByName("panel").getChildByName("img_wujilu").active = false;
    this.initReddot();
    this.msg = glGame.user.get("allEmailMsg");
    if (!this.emailTime) this.emailTime = this.msg[this.type].time;
    var emails = this.msg[this.type]["maillist"];
    var mailcontent = this.type == MAIL_TYPE_SYSTEM ? this.SystemEmail : this.MoneyEmail;

    if (mailcontent.childrenCount == 0) {
      this.node_noInfo.active = true;
      this.btn_allRead.node.active = false;
      this.btn_alldelete.node.active = false;
    }

    this.emailUpdate = false;

    if (emails.length == 0 || this.msg.count <= emails.length) {
      this.node.getChildByName("panel").getChildByName("img_wujilu").active = true;
      return;
    } //系统信息与资金信息


    for (var i = (this.page[this.type] - 1) * this.MailMax; i < emails.length; i++) {
      var data = emails[i];
      var emailItem = cc.instantiate(this.emailItem);
      emailItem.parent = mailcontent;
      emailItem.active = true;
      emailItem.getChildByName("email_time").getComponent(cc.Label).string = data.send_time;
      emailItem.getChildByName("email_title").getComponent(cc.Label).string = data.mail_title;
      emailItem.getChildByName("email_pic").getComponent(cc.Sprite).spriteFrame = data.status == 1 ? this.emailstatus[1] : this.emailstatus[0];
      emailItem.getChildByName("email_pic").getChildByName("img_yuandian").active = data.status == 0; //emailItem.getChildByName("email_pic").getChildByName("dian").active = data.status != 1;
      //emailItem.getChildByName("already").active = data.status == 1;

      emailItem.name = "".concat(data.id);
    }

    if (emails.length > 0) {
      this.emailUpdate = true;
    } //if (this.page[this.type] == 1) mailcontent.scrollToTop(0.1);


    this.node_noInfo.active = emails.length == 0;
    this.btn_alldelete.node.active = this.emailUpdate;
    this.btn_allRead.node.active = this.emailUpdate;
  },
  // updateEmailContent 事件回调函数, 刷新邮件显示内容
  updateEmailContent: function updateEmailContent(email) {
    this.getEmailInfo = email;
    this.CuremailDetail = cc.instantiate(this.emailDetail);
    this.CuremailDetail.parent = this.node;
    this.CuremailDetail.active = true;
    this.CuremailDetail.getChildByName("title").getComponent(cc.Label).string = email.mail_title;
    this.CuremailDetail.getChildByName("time").getComponent(cc.Label).string = email.send_time;
    this.CuremailDetail.getChildByName("scrollview").children[1].children[0].getComponent(cc.RichText).string = "       ".concat(email.mail_content);

    if (email.status == 0) {
      if (this.type == MAIL_TYPE_MONEY) glGame.user.EmailData.moneyUnreadCount--;else if (this.type == MAIL_TYPE_SYSTEM) glGame.user.EmailData.systemUnreadCount--;
      this.initReddot();
    }

    this.alreadyLook(email);
  },
  //时间戳获取年月日时间
  timestampToTime: function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return Y + M + D + h + m;
  },
  //删除全部邮件
  updateDeleMail: function updateDeleMail() {
    var mailcontent = this.type == MAIL_TYPE_SYSTEM ? this.SystemEmail : this.MoneyEmail;
    mailcontent.destroyAllChildren();
    mailcontent.removeAllChildren();
    this.btn_alldelete.node.active = false;
    this.btn_allRead.node.active = false;
    this.page[this.type] = 1;

    if (this.type == 2 || this.type == 1) {
      this.textIndex = 0;
    }

    glGame.user.clearMail(this.type);
    glGame.user.reqMailList(this.page[this.type], this.MailMax, this.type);
  },
  //读取全部邮件
  updateReadAllMail: function updateReadAllMail() {
    var mailcontent = this.type == MAIL_TYPE_SYSTEM ? this.SystemEmail : this.MoneyEmail;
    mailcontent.destroyAllChildren();
    this.page[this.type] = 1;
    glGame.user.clearMail(this.type);
    glGame.user.reqMailList(this.page[this.type], this.MailMax, this.type);
  },
  //删除选中的邮件
  updateDeleOneMail: function updateDeleOneMail() {
    var mailcontent = this.type == MAIL_TYPE_SYSTEM ? this.SystemEmail : this.MoneyEmail;
    mailcontent.destroyAllChildren();
    this.page[this.type] = 1;
    glGame.user.clearMail(this.type);
    glGame.user.reqMailList(this.page[this.type], this.MailMax, this.type);
    this.CuremailDetail.destroy(); // this.deleteEmail();
  },
  //删除指定邮件
  deleteEmail: function deleteEmail() {
    var mailcontent = this.type == MAIL_TYPE_SYSTEM ? this.SystemEmail : this.MoneyEmail;

    for (var i = 0; i < mailcontent.childrenCount; i++) {
      if (mailcontent.children[i].name == this.CuremailId) {
        mailcontent.children[i].destroy();
        break;
      }
    }

    if (mailcontent.childrenCount == 1) this.btn_alldelete.node.active = false;
  },
  //设置当前邮件已读
  alreadyLook: function alreadyLook(email) {
    var mailcontent = this.type == MAIL_TYPE_SYSTEM ? this.SystemEmail : this.MoneyEmail;

    if (email.attachment_status == 0) {
      //已领取
      if (email.status == 1) {
        for (var i = 0; i < mailcontent.childrenCount; i++) {
          if (mailcontent.children[i].name == this.CuremailId) {
            mailcontent.children[i].getChildByName("email_pic").getComponent(cc.Sprite).spriteFrame = this.emailstatus[1];
            mailcontent.children[i].getChildByName("email_pic").getChildByName("img_yuandian").active = false;
          }
        }

        return;
      }

      ;
    } //已读


    for (var _i2 = 0; _i2 < mailcontent.childrenCount; _i2++) {
      if (mailcontent.children[_i2].name == this.CuremailId) {
        mailcontent.children[_i2].getChildByName("email_pic").getComponent(cc.Sprite).spriteFrame = this.emailstatus[1];
        mailcontent.children[_i2].getChildByName("email_pic").getChildByName("img_yuandian").active = false;
        break;
      }
    }
  },
  //滚动到底部请求数据
  onScrollEvent: function onScrollEvent(scroll, event) {
    if (event == cc.ScrollView.EventType.SCROLL_TO_BOTTOM && this.emailUpdate) {
      // console.log("获取消息数据")
      // }
      // let mailcontent = this.type == MAIL_TYPE_SYSTEM ? this.SystemEmail : this.MoneyEmail;
      // if (mailcontent.y >= mailcontent.height && this.emailUpdate && mailcontent.height > 220) {
      this.page[this.type]++;
      this.emailUpdate = false;
      console.log("请求邮件列表", this.page[this.type]);
      glGame.user.reqMailList(this.page[this.type], this.MailMax, this.type, this.emailTime);
    }
  },
  cutFloat: function cutFloat(num) {
    return this.getFloat(Number(num).div(100));
  },
  //浮点型运算取俩位
  getFloat: function getFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    value = Number(value);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else {
      return (Math.floor(value * 100) / 100).toFixed(num);
    }
  },
  //截取小数点后两位
  cutDownNum: function cutDownNum(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.div(100).toString();
    } else {
      value = Number(value).div(100);
      return (Math.floor(value * 100) / 100).toFixed(num);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxlbWFpbFxcZW1haWwuanMiXSwibmFtZXMiOlsiTUFJTF9UWVBFX0FOTk9VTiIsIk1BSUxfVFlQRV9TWVNURU0iLCJNQUlMX1RZUEVfTU9ORVkiLCJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiZW1haWxMaXN0VmlldyIsImNjIiwiTm9kZSIsImVtYWlsSXRlbSIsImVtYWlsRGV0YWlsIiwiZW1haWxzdGF0dXMiLCJTcHJpdGVGcmFtZSIsIlN5c3RlbVNjb3JsbCIsIlNjcm9sbFZpZXciLCJNb25leVNjb3JsbCIsImJ0bl9hbGxkZWxldGUiLCJCdXR0b24iLCJidG5fYWxsUmVhZCIsImNvbnRlbnQiLCJTeXN0ZW1FbWFpbCIsIk1vbmV5RW1haWwiLCJub2RlX25vSW5mbyIsInN5c1JlZERvdCIsImNvaW5SZWREb3QiLCJub2RlX3RpdGxlTGlzdCIsImF1ZGlvX2NvaW4iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwicmVnaXN0ZXJFdmVudCIsImlzUmVjZWl2ZSIsInBhZ2UiLCJjb250ZW5IZWlnaHQiLCJlbWFpbFVwZGF0ZSIsImFubm91blVwZGF0ZSIsImdldElzQWxsR2V0IiwiZ2V0SXNBbGxEZWxldGUiLCJpbmRleCIsImFublBhZ2UiLCJ0aXBUaW1lT3V0IiwidGV4dEluZGV4IiwiZmlzdFRpbWUiLCJNYWlsTWF4IiwibXNnIiwicGFuZWwiLCJzaG93RWZmZWN0UGFyaXRpY2xlIiwibm9kZSIsInJlc2V0RGF0YSIsImluaXRSZWRkb3QiLCJlbWFpbERhdGEiLCJ1c2VyIiwiZ2V0IiwiYWN0aXZlIiwic3lzdGVtVW5yZWFkQ291bnQiLCJtb25leVVucmVhZENvdW50Iiwic2hvd1VJIiwic2V0T25lIiwiaSIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsImJ0bmZpcnN0Iiwib25DbGljayIsIm5hbWUiLCJjb25zb2xlIiwibG9nIiwicmVxU3lzdGVtRW1haWwiLCJyZXFNb25leUVtYWlsIiwicmVtb3ZlIiwiQ3VyZW1haWxEZXRhaWwiLCJkZXN0cm95Iiwib3BlbkRlbGV0ZUZhY2UiLCJjbGlja19hbGxyZWFkIiwiY2xpY2tfZGVsZXRlIiwiQ3VyZW1haWxJZCIsInJlcU1haWxJbmZvIiwicmVxTWFpbExpc3QiLCJnZXRDaGlsZEJ5TmFtZSIsImJvb2wiLCJzdHJUZXh0IiwidGlwcyIsIkVNQUlMIiwiREVMRVRFQUxMIiwiREVMRVRFT05FIiwic2hvd0RpYWxvZyIsImJpbmQiLCJSZXFEZWxlTWFpbCIsIlJlcURlbGVPbmVNYWlsIiwiUmVxQWxsUmVhZE1haWwiLCJlbWl0dGVyIiwib24iLCJ1cGRhdGVFbWFpbENvbnRlbnQiLCJ1cGRhdGVFbWFpbCIsInVwZGF0ZURlbGVPbmVNYWlsIiwidXBkYXRlRGVsZU1haWwiLCJ1cGRhdGVSZWFkQWxsTWFpbCIsIk1FU1NBR0UiLCJVSSIsIkFDVElPTl9FTkQiLCJ1blJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJPbkRlc3Ryb3kiLCJSZXFSZWREb3QiLCJjbGVhck1haWwiLCJlbWFpbFRpbWUiLCJ0aW1lIiwiZW1haWxzIiwibWFpbGNvbnRlbnQiLCJsZW5ndGgiLCJjb3VudCIsImRhdGEiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwic2VuZF90aW1lIiwibWFpbF90aXRsZSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwic3RhdHVzIiwiaWQiLCJlbWFpbCIsImdldEVtYWlsSW5mbyIsIlJpY2hUZXh0IiwibWFpbF9jb250ZW50IiwiRW1haWxEYXRhIiwiYWxyZWFkeUxvb2siLCJ0aW1lc3RhbXBUb1RpbWUiLCJ0aW1lc3RhbXAiLCJkYXRlIiwiRGF0ZSIsIlkiLCJnZXRGdWxsWWVhciIsIk0iLCJnZXRNb250aCIsIkQiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsImRlbGV0ZUVtYWlsIiwiYXR0YWNobWVudF9zdGF0dXMiLCJvblNjcm9sbEV2ZW50Iiwic2Nyb2xsIiwiZXZlbnQiLCJFdmVudFR5cGUiLCJTQ1JPTExfVE9fQk9UVE9NIiwiY3V0RmxvYXQiLCJudW0iLCJnZXRGbG9hdCIsIk51bWJlciIsImRpdiIsInZhbHVlIiwiaXNOYU4iLCJ0b1N0cmluZyIsIk1hdGgiLCJmbG9vciIsInRvRml4ZWQiLCJjdXREb3duTnVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQSxJQUFNQSxnQkFBZ0IsR0FBRyxDQUF6QjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLENBQXpCO0FBQ0EsSUFBTUMsZUFBZSxHQUFHLENBQXhCO0FBRUFDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxhQUFhLEVBQUVDLEVBQUUsQ0FBQ0MsSUFEVjtBQUNvQjtBQUU1QkMsSUFBQUEsU0FBUyxFQUFFRixFQUFFLENBQUNDLElBSE47QUFJUkUsSUFBQUEsV0FBVyxFQUFFSCxFQUFFLENBQUNDLElBSlI7QUFJZ0M7QUFDeENHLElBQUFBLFdBQVcsRUFBRSxDQUFDSixFQUFFLENBQUNLLFdBQUosQ0FMTDtBQUtnQztBQUV4Q0MsSUFBQUEsWUFBWSxFQUFFTixFQUFFLENBQUNPLFVBUFQ7QUFPZ0M7QUFDeENDLElBQUFBLFdBQVcsRUFBRVIsRUFBRSxDQUFDTyxVQVJSO0FBUWdDO0FBQ3hDRSxJQUFBQSxhQUFhLEVBQUVULEVBQUUsQ0FBQ1UsTUFUVjtBQVVSQyxJQUFBQSxXQUFXLEVBQUVYLEVBQUUsQ0FBQ1UsTUFWUjtBQVdSRSxJQUFBQSxPQUFPLEVBQUVaLEVBQUUsQ0FBQ0MsSUFYSjtBQVlSWSxJQUFBQSxXQUFXLEVBQUViLEVBQUUsQ0FBQ0MsSUFaUjtBQWFSYSxJQUFBQSxVQUFVLEVBQUVkLEVBQUUsQ0FBQ0MsSUFiUDtBQWVSYyxJQUFBQSxXQUFXLEVBQUVm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RCxLQUFELENBQVQsRUFBa0I7O0FBQ2xCLFFBQUksQ0FBQyxDQUFDQSxLQUFGLEtBQVlBLEtBQWhCLEVBQXVCO0FBQ25CLGFBQU9BLEtBQUssQ0FBQ0QsR0FBTixDQUFVLEdBQVYsRUFBZUcsUUFBZixFQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0hGLE1BQUFBLEtBQUssR0FBR0YsTUFBTSxDQUFDRSxLQUFELENBQU4sQ0FBY0QsR0FBZCxDQUFrQixHQUFsQixDQUFSO0FBQ0EsYUFBTyxDQUFDSSxJQUFJLENBQUNDLEtBQUwsQ0FBV0osS0FBSyxHQUFHLEdBQW5CLElBQTBCLEdBQTNCLEVBQWdDSyxPQUFoQyxDQUF3Q1QsR0FBeEMsQ0FBUDtBQUNIO0FBQ0o7QUF2WG1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6YKu5Lu26Z2i5p2/XHJcbiAqL1xyXG5jb25zdCBNQUlMX1RZUEVfQU5OT1VOID0gMDtcclxuY29uc3QgTUFJTF9UWVBFX1NZU1RFTSA9IDE7XHJcbmNvbnN0IE1BSUxfVFlQRV9NT05FWSA9IDI7XHJcblxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZW1haWxMaXN0VmlldzogY2MuTm9kZSwgICAgIC8vIOmCruS7tml0ZW3liJfooahcclxuXHJcbiAgICAgICAgZW1haWxJdGVtOiBjYy5Ob2RlLFxyXG4gICAgICAgIGVtYWlsRGV0YWlsOiBjYy5Ob2RlLCAgICAgICAgICAgICAgICAgICAvL+ato+W4uOmCruS7tuivpue7huWGheWuuVxyXG4gICAgICAgIGVtYWlsc3RhdHVzOiBbY2MuU3ByaXRlRnJhbWVdLCAgICAgICAgICAvL+mCruS7tuWbvueJh+eKtuaAgVxyXG5cclxuICAgICAgICBTeXN0ZW1TY29ybGw6IGNjLlNjcm9sbFZpZXcsICAgICAgICAgICAgLy/lhbbku5bnmoRzY29ybGxcclxuICAgICAgICBNb25leVNjb3JsbDogY2MuU2Nyb2xsVmlldywgICAgICAgICAgICAgLy/lhbbku5bnmoRzY29ybGxcclxuICAgICAgICBidG5fYWxsZGVsZXRlOiBjYy5CdXR0b24sXHJcbiAgICAgICAgYnRuX2FsbFJlYWQ6IGNjLkJ1dHRvbixcclxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIFN5c3RlbUVtYWlsOiBjYy5Ob2RlLFxyXG4gICAgICAgIE1vbmV5RW1haWw6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIG5vZGVfbm9JbmZvOiBjYy5Ob2RlLFxyXG4gICAgICAgIHN5c1JlZERvdDogY2MuTm9kZSxcclxuICAgICAgICBjb2luUmVkRG90OiBjYy5Ob2RlLFxyXG4gICAgICAgIG5vZGVfdGl0bGVMaXN0OiBjYy5Ob2RlLFxyXG4gICAgICAgIGF1ZGlvX2NvaW46IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5pc1JlY2VpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhZ2UgPSBbMCwgMSwgMV07XHJcbiAgICAgICAgdGhpcy5jb250ZW5IZWlnaHQgPSAwO1xyXG4gICAgICAgIHRoaXMuZW1haWxVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFubm91blVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ2V0SXNBbGxHZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdldElzQWxsRGVsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5hbm5QYWdlID0gMTtcclxuICAgICAgICB0aGlzLnRpcFRpbWVPdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGV4dEluZGV4ID0gMSAvL+aOp+WItuaYr+WQpuiDveaPkOekuumjmOWtl+acquafpeeci+i/mOWPr+mihuWPlu+8jFxyXG4gICAgICAgIHRoaXMuZmlzdFRpbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpbE1heCA9IDEwO1xyXG4gICAgICAgIHRoaXMubXNnID0ge307XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3RQYXJpdGljbGUodGhpcy5ub2RlKTtcclxuICAgICAgICAvL3RoaXMucmVxU3lzdGVtRW1haWwoKTtcclxuICAgIH0sXHJcbiAgICAvLyDliJ3lp4vljJbpgq7ku7bmlbDmja5cclxuICAgIHJlc2V0RGF0YSgpIHtcclxuICAgICAgICAvLyB0aGlzLmVtYWlsRGF0YSA9IGdsR2FtZS51c2VyLmdldChcImVtYWlsc1wiKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCc9PT09PT3mn6XnnIvpgq7ku7ZpdGVtJyx0aGlzLmVtYWlsRGF0YSlcclxuICAgIH0sXHJcbiAgICBpbml0UmVkZG90KCkge1xyXG4gICAgICAgIGxldCBlbWFpbERhdGEgPSBnbEdhbWUudXNlci5nZXQoXCJFbWFpbERhdGFcIik7XHJcbiAgICAgICAgdGhpcy5zeXNSZWREb3QuYWN0aXZlID0gISFlbWFpbERhdGEuc3lzdGVtVW5yZWFkQ291bnQ7XHJcbiAgICAgICAgLy9pZiAoISFlbWFpbERhdGEuc3lzdGVtVW5yZWFkQ291bnQpIHRoaXMuc3lzUmVkRG90LmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZW1haWxEYXRhLnN5c3RlbVVucmVhZENvdW50O1xyXG4gICAgICAgIHRoaXMuY29pblJlZERvdC5hY3RpdmUgPSAhIWVtYWlsRGF0YS5tb25leVVucmVhZENvdW50O1xyXG4gICAgICAgIC8vaWYgKCEhZW1haWxEYXRhLm1vbmV5VW5yZWFkQ291bnQpIHRoaXMuY29pblJlZERvdC5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGVtYWlsRGF0YS5tb25leVVucmVhZENvdW50O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBVSeaYvuekulxyXG4gICAgc2hvd1VJKCkge1xyXG4gICAgICAgIGxldCBzZXRPbmUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbWFpbExpc3RWaWV3LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsTGlzdFZpZXcuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHNldE9uZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5maXJzdCA9IHRoaXMuZW1haWxMaXN0Vmlldy5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgIHNldE9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5idG5maXJzdC5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vdGhpcy5vbkNsaWNrKHRoaXMuYnRuZmlyc3QubmFtZSwgdGhpcy5idG5maXJzdCk7XHJcbiAgICB9LFxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25ubm5uYW1lJywgbmFtZSlcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInN5c3RlbUVtYWlsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcVN5c3RlbUVtYWlsKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1vbmV5RW1haWxcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxTW9uZXlFbWFpbCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2xvc2VcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZURldGFpbFwiOiB0aGlzLkN1cmVtYWlsRGV0YWlsLmRlc3Ryb3koKTsgYnJlYWs7ICAgICAgICAgICAvL+WFs+mXremCruS7tuivpuaDhVxyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2FsbGRlbGV0ZVwiOiB0aGlzLm9wZW5EZWxldGVGYWNlKHRydWUpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9hbGxyZWFkXCI6IHRoaXMuY2xpY2tfYWxscmVhZCgpOyBicmVhazsgICAgICAgICAgICAgICAgICAgICAgICAgLy/noa7lrprliKDpmaRcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9kZWxldGVcIjogdGhpcy5vcGVuRGVsZXRlRmFjZShmYWxzZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3JlYWxEZWxldFwiOiB0aGlzLmNsaWNrX2RlbGV0ZSgpOyBicmVhazsgICAgICAgICAgICAgICAgICAgICAgICAgLy/noa7lrprliKDpmaRcclxuICAgICAgICAgICAgY2FzZSAnYnRuX2NhbmVsJzpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlN5c3RlbVNjb3JsbC5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5TeXN0ZW1FbWFpbC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU3lzdGVtRW1haWwuY2hpbGRyZW5baV0ubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkN1cmVtYWlsSWQgPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLnVzZXIucmVxTWFpbEluZm8obmFtZSwgdGhpcy50eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5Nb25leVNjb3JsbC5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5Nb25leUVtYWlsLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5Nb25leUVtYWlsLmNoaWxkcmVuW2ldLm5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DdXJlbWFpbElkID0gbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcU1haWxJbmZvKG5hbWUsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVxU3lzdGVtRW1haWwoKSB7XHJcbiAgICAgICAgdGhpcy5idG5fYWxsZGVsZXRlLm5vZGUuYWN0aXZlID0gdGhpcy5TeXN0ZW1FbWFpbC5jaGlsZHJlbkNvdW50ID4gMDtcclxuICAgICAgICB0aGlzLmJ0bl9hbGxSZWFkLm5vZGUuYWN0aXZlID0gdGhpcy5TeXN0ZW1FbWFpbC5jaGlsZHJlbkNvdW50ID4gMDtcclxuICAgICAgICB0aGlzLnR5cGUgPSBNQUlMX1RZUEVfU1lTVEVNO1xyXG4gICAgICAgIHRoaXMudGV4dEluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLlN5c3RlbVNjb3JsbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5Nb25leVNjb3JsbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZV9ub0luZm8uYWN0aXZlID0gdGhpcy5TeXN0ZW1FbWFpbC5jaGlsZHJlbkNvdW50ID09IDA7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1zZ1t0aGlzLnR5cGVdKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcU1haWxMaXN0KHRoaXMucGFnZVt0aGlzLnR5cGVdLCB0aGlzLk1haWxNYXgsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFuZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfd3VqaWx1XCIpLmFjdGl2ZSA9IHRoaXMuU3lzdGVtRW1haWwuY2hpbGRyZW5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXFNb25leUVtYWlsKCkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IE1BSUxfVFlQRV9NT05FWTtcclxuICAgICAgICB0aGlzLnRleHRJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5idG5fYWxsUmVhZC5ub2RlLmFjdGl2ZSA9IHRoaXMuTW9uZXlFbWFpbC5jaGlsZHJlbkNvdW50ID4gMDtcclxuICAgICAgICB0aGlzLmJ0bl9hbGxkZWxldGUubm9kZS5hY3RpdmUgPSB0aGlzLk1vbmV5RW1haWwuY2hpbGRyZW5Db3VudCA+IDA7XHJcbiAgICAgICAgdGhpcy5TeXN0ZW1TY29ybGwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLk1vbmV5U2NvcmxsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGVfbm9JbmZvLmFjdGl2ZSA9IHRoaXMuTW9uZXlFbWFpbC5jaGlsZHJlbkNvdW50ID09IDA7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1zZ1t0aGlzLnR5cGVdKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcU1haWxMaXN0KHRoaXMucGFnZVt0aGlzLnR5cGVdLCB0aGlzLk1haWxNYXgsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFuZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfd3VqaWx1XCIpLmFjdGl2ZSA9IHRoaXMuTW9uZXlFbWFpbC5jaGlsZHJlbkNvdW50ID09IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYm9vbCB0cnVlOiDlhajpg6jliKDpmaQgZmFsc2U6IOaMh+WumuWIoOmZpFxyXG4gICAgICovXHJcbiAgICBvcGVuRGVsZXRlRmFjZShib29sKSB7XHJcbiAgICAgICAgbGV0IHN0clRleHQgPSBcIlwiXHJcbiAgICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICAgICAgc3RyVGV4dCA9IGdsR2FtZS50aXBzLkVNQUlMLkRFTEVURUFMTDtcclxuICAgICAgICAgICAgdGhpcy5nZXRJc0FsbERlbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RyVGV4dCA9IGdsR2FtZS50aXBzLkVNQUlMLkRFTEVURU9ORTtcclxuICAgICAgICAgICAgdGhpcy5nZXRJc0FsbERlbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIlwiLCBzdHJUZXh0LCB0aGlzLmNsaWNrX2RlbGV0ZS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+WIoOmZpOmCruS7tlxyXG4gICAgY2xpY2tfZGVsZXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldElzQWxsRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2FsbFJlYWQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idG5fYWxsZGVsZXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLlJlcURlbGVNYWlsKHRoaXMudHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0SW5kZXggPSAxO1xyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5SZXFEZWxlT25lTWFpbCh0aGlzLkN1cmVtYWlsSWQpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19hbGxyZWFkKCkge1xyXG4gICAgICAgIC8vaWYgKCFnbEdhbWUudXNlci5FbWFpbERhdGEuc3lzdGVtVW5yZWFkQ291bnQpIHJldHVybjtcclxuICAgICAgICBnbEdhbWUudXNlci5SZXFBbGxSZWFkTWFpbCh0aGlzLnR5cGUpO1xyXG4gICAgfSxcclxuICAgIC8vIOazqOWGjOeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZUVtYWlsQ29udGVudFwiLCB0aGlzLnVwZGF0ZUVtYWlsQ29udGVudCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVFbWFpbFwiLCB0aGlzLnVwZGF0ZUVtYWlsLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZURlbGVPbmVNYWlsXCIsIHRoaXMudXBkYXRlRGVsZU9uZU1haWwsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlRGVsZU1haWxcIiwgdGhpcy51cGRhdGVEZWxlTWFpbCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVSZWFkQWxsTWFpbFwiLCB0aGlzLnVwZGF0ZVJlYWRBbGxNYWlsLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihgJHt0aGlzLm5vZGUubmFtZX0ke01FU1NBR0UuVUkuQUNUSU9OX0VORH1gLCB0aGlzLnJlcU1vbmV5RW1haWwsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIC8vIOmUgOavgeeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcInVwZGF0ZUVtYWlsQ29udGVudFwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVFbWFpbFwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVEZWxlT25lTWFpbFwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVEZWxlTWFpbFwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVSZWFkQWxsTWFpbFwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoYCR7dGhpcy5ub2RlLm5hbWV9JHtNRVNTQUdFLlVJLkFDVElPTl9FTkR9YCwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgLy8g55WM6Z2i6ZSA5q+B55qE5pe25YCZLCDms6jplIDkuovku7YsIOWIt+aWsOS4gOS4i+eci+eci+acieayoeacgOaWsOmCruS7tlxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIuUmVxUmVkRG90KCk7XHJcbiAgICAgICAgZ2xHYW1lLnVzZXIuY2xlYXJNYWlsKCk7XHJcbiAgICB9LFxyXG4gICAgLy/pgq7ku7bliJfooahcclxuICAgIHVwZGF0ZUVtYWlsKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBhbmVsXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX3d1amlsdVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmluaXRSZWRkb3QoKTtcclxuICAgICAgICB0aGlzLm1zZyA9IGdsR2FtZS51c2VyLmdldChcImFsbEVtYWlsTXNnXCIpO1xyXG4gICAgICAgIGlmKCF0aGlzLmVtYWlsVGltZSl0aGlzLmVtYWlsVGltZSA9IHRoaXMubXNnW3RoaXMudHlwZV0udGltZTtcclxuICAgICAgICBsZXQgZW1haWxzID0gdGhpcy5tc2dbdGhpcy50eXBlXVtcIm1haWxsaXN0XCJdO1xyXG4gICAgICAgIGxldCBtYWlsY29udGVudCA9IHRoaXMudHlwZSA9PSBNQUlMX1RZUEVfU1lTVEVNID8gdGhpcy5TeXN0ZW1FbWFpbCA6IHRoaXMuTW9uZXlFbWFpbDtcclxuICAgICAgICBpZiAobWFpbGNvbnRlbnQuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9ub0luZm8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5fYWxsUmVhZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9hbGxkZWxldGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWFpbFVwZGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZW1haWxzLmxlbmd0aCA9PSAwIHx8IHRoaXMubXNnLmNvdW50IDw9IGVtYWlscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFuZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfd3VqaWx1XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/ns7vnu5/kv6Hmga/kuI7otYTph5Hkv6Hmga9cclxuICAgICAgICBmb3IgKGxldCBpID0gKHRoaXMucGFnZVt0aGlzLnR5cGVdIC0gMSkgKiB0aGlzLk1haWxNYXg7IGkgPCBlbWFpbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBlbWFpbHNbaV07XHJcbiAgICAgICAgICAgIGxldCBlbWFpbEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVtYWlsSXRlbSk7XHJcbiAgICAgICAgICAgIGVtYWlsSXRlbS5wYXJlbnQgPSBtYWlsY29udGVudDtcclxuICAgICAgICAgICAgZW1haWxJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVtYWlsSXRlbS5nZXRDaGlsZEJ5TmFtZShcImVtYWlsX3RpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLnNlbmRfdGltZTtcclxuICAgICAgICAgICAgZW1haWxJdGVtLmdldENoaWxkQnlOYW1lKFwiZW1haWxfdGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLm1haWxfdGl0bGU7XHJcbiAgICAgICAgICAgIGVtYWlsSXRlbS5nZXRDaGlsZEJ5TmFtZShcImVtYWlsX3BpY1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGRhdGEuc3RhdHVzID09IDEgPyB0aGlzLmVtYWlsc3RhdHVzWzFdIDogdGhpcy5lbWFpbHN0YXR1c1swXTtcclxuICAgICAgICAgICAgZW1haWxJdGVtLmdldENoaWxkQnlOYW1lKFwiZW1haWxfcGljXCIpLmdldENoaWxkQnlOYW1lKFwiaW1nX3l1YW5kaWFuXCIpLmFjdGl2ZSA9IGRhdGEuc3RhdHVzID09IDA7XHJcblxyXG4gICAgICAgICAgICAvL2VtYWlsSXRlbS5nZXRDaGlsZEJ5TmFtZShcImVtYWlsX3BpY1wiKS5nZXRDaGlsZEJ5TmFtZShcImRpYW5cIikuYWN0aXZlID0gZGF0YS5zdGF0dXMgIT0gMTtcclxuICAgICAgICAgICAgLy9lbWFpbEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJhbHJlYWR5XCIpLmFjdGl2ZSA9IGRhdGEuc3RhdHVzID09IDE7XHJcblxyXG4gICAgICAgICAgICBlbWFpbEl0ZW0ubmFtZSA9IGAke2RhdGEuaWR9YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVtYWlscy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1haWxVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmICh0aGlzLnBhZ2VbdGhpcy50eXBlXSA9PSAxKSBtYWlsY29udGVudC5zY3JvbGxUb1RvcCgwLjEpO1xyXG4gICAgICAgIHRoaXMubm9kZV9ub0luZm8uYWN0aXZlID0gZW1haWxzLmxlbmd0aCA9PSAwO1xyXG4gICAgICAgIHRoaXMuYnRuX2FsbGRlbGV0ZS5ub2RlLmFjdGl2ZSA9IHRoaXMuZW1haWxVcGRhdGU7XHJcbiAgICAgICAgdGhpcy5idG5fYWxsUmVhZC5ub2RlLmFjdGl2ZSA9IHRoaXMuZW1haWxVcGRhdGU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGVFbWFpbENvbnRlbnQg5LqL5Lu25Zue6LCD5Ye95pWwLCDliLfmlrDpgq7ku7bmmL7npLrlhoXlrrlcclxuICAgIHVwZGF0ZUVtYWlsQ29udGVudChlbWFpbCkge1xyXG4gICAgICAgIHRoaXMuZ2V0RW1haWxJbmZvID0gZW1haWw7XHJcbiAgICAgICAgdGhpcy5DdXJlbWFpbERldGFpbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW1haWxEZXRhaWwpO1xyXG4gICAgICAgIHRoaXMuQ3VyZW1haWxEZXRhaWwucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHRoaXMuQ3VyZW1haWxEZXRhaWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkN1cmVtYWlsRGV0YWlsLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBlbWFpbC5tYWlsX3RpdGxlO1xyXG4gICAgICAgIHRoaXMuQ3VyZW1haWxEZXRhaWwuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZW1haWwuc2VuZF90aW1lO1xyXG4gICAgICAgIHRoaXMuQ3VyZW1haWxEZXRhaWwuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGx2aWV3XCIpLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCAgICAgICAke2VtYWlsLm1haWxfY29udGVudH1gO1xyXG4gICAgICAgIGlmIChlbWFpbC5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09IE1BSUxfVFlQRV9NT05FWSkgZ2xHYW1lLnVzZXIuRW1haWxEYXRhLm1vbmV5VW5yZWFkQ291bnQtLTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IE1BSUxfVFlQRV9TWVNURU0pIGdsR2FtZS51c2VyLkVtYWlsRGF0YS5zeXN0ZW1VbnJlYWRDb3VudC0tO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRSZWRkb3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbHJlYWR5TG9vayhlbWFpbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5pe26Ze05oiz6I635Y+W5bm05pyI5pel5pe26Ze0XHJcbiAgICB0aW1lc3RhbXBUb1RpbWUodGltZXN0YW1wKSB7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKTsvL+aXtumXtOaIs+S4ujEw5L2N6ZyAKjEwMDDvvIzml7bpl7TmiLPkuLoxM+S9jeeahOivneS4jemcgOS5mDEwMDBcclxuICAgICAgICB2YXIgWSA9IGRhdGUuZ2V0RnVsbFllYXIoKSArICctJztcclxuICAgICAgICB2YXIgTSA9IChkYXRlLmdldE1vbnRoKCkgKyAxIDwgMTAgPyAnMCcgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgOiBkYXRlLmdldE1vbnRoKCkgKyAxKSArICcvJztcclxuICAgICAgICB2YXIgRCA9IGRhdGUuZ2V0RGF0ZSgpICsgJyAnO1xyXG4gICAgICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpICsgJzonO1xyXG4gICAgICAgIHZhciBtID0gZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/ICcwJyArIGRhdGUuZ2V0TWludXRlcygpIDogZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIFkgKyBNICsgRCArIGggKyBtO1xyXG4gICAgfSxcclxuICAgIC8v5Yig6Zmk5YWo6YOo6YKu5Lu2XHJcbiAgICB1cGRhdGVEZWxlTWFpbCgpIHtcclxuICAgICAgICBsZXQgbWFpbGNvbnRlbnQgPSB0aGlzLnR5cGUgPT0gTUFJTF9UWVBFX1NZU1RFTSA/IHRoaXMuU3lzdGVtRW1haWwgOiB0aGlzLk1vbmV5RW1haWw7XHJcbiAgICAgICAgbWFpbGNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbWFpbGNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmJ0bl9hbGxkZWxldGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ0bl9hbGxSZWFkLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlW3RoaXMudHlwZV0gPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMiB8fCB0aGlzLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnRleHRJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS51c2VyLmNsZWFyTWFpbCh0aGlzLnR5cGUpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcU1haWxMaXN0KHRoaXMucGFnZVt0aGlzLnR5cGVdLCB0aGlzLk1haWxNYXgsIHRoaXMudHlwZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v6K+75Y+W5YWo6YOo6YKu5Lu2XHJcbiAgICB1cGRhdGVSZWFkQWxsTWFpbCgpIHtcclxuICAgICAgICBsZXQgbWFpbGNvbnRlbnQgPSB0aGlzLnR5cGUgPT0gTUFJTF9UWVBFX1NZU1RFTSA/IHRoaXMuU3lzdGVtRW1haWwgOiB0aGlzLk1vbmV5RW1haWw7XHJcbiAgICAgICAgbWFpbGNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlW3RoaXMudHlwZV0gPSAxO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLmNsZWFyTWFpbCh0aGlzLnR5cGUpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcU1haWxMaXN0KHRoaXMucGFnZVt0aGlzLnR5cGVdLCB0aGlzLk1haWxNYXgsIHRoaXMudHlwZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yig6Zmk6YCJ5Lit55qE6YKu5Lu2XHJcbiAgICB1cGRhdGVEZWxlT25lTWFpbCgpIHtcclxuICAgICAgICBsZXQgbWFpbGNvbnRlbnQgPSB0aGlzLnR5cGUgPT0gTUFJTF9UWVBFX1NZU1RFTSA/IHRoaXMuU3lzdGVtRW1haWwgOiB0aGlzLk1vbmV5RW1haWw7XHJcbiAgICAgICAgbWFpbGNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlW3RoaXMudHlwZV0gPSAxO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLmNsZWFyTWFpbCh0aGlzLnR5cGUpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcU1haWxMaXN0KHRoaXMucGFnZVt0aGlzLnR5cGVdLCB0aGlzLk1haWxNYXgsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgdGhpcy5DdXJlbWFpbERldGFpbC5kZXN0cm95KCk7XHJcbiAgICAgICAgLy8gdGhpcy5kZWxldGVFbWFpbCgpO1xyXG5cclxuICAgIH0sXHJcbiAgICAvL+WIoOmZpOaMh+WumumCruS7tlxyXG4gICAgZGVsZXRlRW1haWwoKSB7XHJcbiAgICAgICAgbGV0IG1haWxjb250ZW50ID0gdGhpcy50eXBlID09IE1BSUxfVFlQRV9TWVNURU0gPyB0aGlzLlN5c3RlbUVtYWlsIDogdGhpcy5Nb25leUVtYWlsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFpbGNvbnRlbnQuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtYWlsY29udGVudC5jaGlsZHJlbltpXS5uYW1lID09IHRoaXMuQ3VyZW1haWxJZCkge1xyXG4gICAgICAgICAgICAgICAgbWFpbGNvbnRlbnQuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1haWxjb250ZW50LmNoaWxkcmVuQ291bnQgPT0gMSkgdGhpcy5idG5fYWxsZGVsZXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy/orr7nva7lvZPliY3pgq7ku7blt7Lor7tcclxuICAgIGFscmVhZHlMb29rKGVtYWlsKSB7XHJcbiAgICAgICAgbGV0IG1haWxjb250ZW50ID0gdGhpcy50eXBlID09IE1BSUxfVFlQRV9TWVNURU0gPyB0aGlzLlN5c3RlbUVtYWlsIDogdGhpcy5Nb25leUVtYWlsO1xyXG4gICAgICAgIGlmIChlbWFpbC5hdHRhY2htZW50X3N0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8v5bey6aKG5Y+WXHJcbiAgICAgICAgICAgIGlmIChlbWFpbC5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYWlsY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpbGNvbnRlbnQuY2hpbGRyZW5baV0ubmFtZSA9PSB0aGlzLkN1cmVtYWlsSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbGNvbnRlbnQuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJlbWFpbF9waWNcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmVtYWlsc3RhdHVzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWlsY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImVtYWlsX3BpY1wiKS5nZXRDaGlsZEJ5TmFtZShcImltZ195dWFuZGlhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bey6K+7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYWlsY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1haWxjb250ZW50LmNoaWxkcmVuW2ldLm5hbWUgPT0gdGhpcy5DdXJlbWFpbElkKSB7XHJcbiAgICAgICAgICAgICAgICBtYWlsY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImVtYWlsX3BpY1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZW1haWxzdGF0dXNbMV07XHJcbiAgICAgICAgICAgICAgICBtYWlsY29udGVudC5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImVtYWlsX3BpY1wiKS5nZXRDaGlsZEJ5TmFtZShcImltZ195dWFuZGlhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy/mu5rliqjliLDlupXpg6jor7fmsYLmlbDmja5cclxuICAgIG9uU2Nyb2xsRXZlbnQoc2Nyb2xsLCBldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCA9PSBjYy5TY3JvbGxWaWV3LkV2ZW50VHlwZS5TQ1JPTExfVE9fQk9UVE9NICYmIHRoaXMuZW1haWxVcGRhdGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLojrflj5bmtojmga/mlbDmja5cIilcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gbGV0IG1haWxjb250ZW50ID0gdGhpcy50eXBlID09IE1BSUxfVFlQRV9TWVNURU0gPyB0aGlzLlN5c3RlbUVtYWlsIDogdGhpcy5Nb25leUVtYWlsO1xyXG4gICAgICAgIC8vIGlmIChtYWlsY29udGVudC55ID49IG1haWxjb250ZW50LmhlaWdodCAmJiB0aGlzLmVtYWlsVXBkYXRlICYmIG1haWxjb250ZW50LmhlaWdodCA+IDIyMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VbdGhpcy50eXBlXSsrO1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+35rGC6YKu5Lu25YiX6KGoXCIsIHRoaXMucGFnZVt0aGlzLnR5cGVdKVxyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5yZXFNYWlsTGlzdCh0aGlzLnBhZ2VbdGhpcy50eXBlXSwgdGhpcy5NYWlsTWF4LCB0aGlzLnR5cGUsdGhpcy5lbWFpbFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGN1dEZsb2F0KG51bSkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5nZXRGbG9hdChOdW1iZXIobnVtKS5kaXYoMTAwKSkpO1xyXG4gICAgfSxcclxuICAgIC8v5rWu54K55Z6L6L+Q566X5Y+W5L+p5L2NXHJcbiAgICBnZXRGbG9hdCh2YWx1ZSwgbnVtID0gMikge1xyXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcclxuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKH5+dmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5mbG9vcih2YWx1ZSAqIDEwMCkgLyAxMDApLnRvRml4ZWQobnVtKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/miKrlj5blsI/mlbDngrnlkI7kuKTkvY1cclxuICAgIGN1dERvd25OdW0odmFsdWUsIG51bSA9IDIpIHtcclxuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKH5+dmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5kaXYoMTAwKS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKS5kaXYoMTAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKHZhbHVlICogMTAwKSAvIDEwMCkudG9GaXhlZChudW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
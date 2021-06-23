"use strict";
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
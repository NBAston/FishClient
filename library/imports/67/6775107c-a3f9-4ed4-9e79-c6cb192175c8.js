"use strict";
cc._RF.push(module, '67751B8o/lO1J55xssZIXXI', 'userinfoBank');
// modules/plaza/script/prefab/userInfo/userinfoBank.js

"use strict";

glGame.baseclass.extend({
  properties: {
    lab_suncoin: cc.Label,
    lab_mycoin: cc.Label,
    lab_bankcoin: cc.Label,
    savegold: cc.EditBox,
    // 要提交的金币数额
    progress: cc.ProgressBar,
    lab_cutstate: cc.Label,
    pic_title: cc.Label,
    cutstate_node: [cc.Node],
    pic_confirm: [cc.Node],
    audio_safebox: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.curBankPattern = glGame.bank.DEPOSIT;
    this.curBankText = {
      0: '存入',
      1: '取出'
    };
    this.resetData();
    this.refreshUi();
    this.registerEvent();
    glGame.user.reqGetBankCoin();
  },
  start: function start() {},
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.updateUserData, this);
    glGame.emitter.on("updateBankCoin", this.showPanelInfo, this);
    glGame.emitter.on("updateBankSuccess", this.updateBankSuccess, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("updateBankCoin", this);
    glGame.emitter.off("updateBankSuccess", this);
  },
  // 刷新界面数据、UI
  updateUserData: function updateUserData() {
    this.resetData();
    this.showPanelInfo();
    this.refreshUi();
  },
  // 初始化界面数据
  resetData: function resetData() {
    this.gold = glGame.user.get("coin");
    this.bankgold = glGame.user.get("bank_coin");
  },
  // 显示界面信息
  showPanelInfo: function showPanelInfo() {
    this.lab_mycoin.string = this.getFixNumber(this.gold);
    this.lab_bankcoin.string = this.getFixNumber(this.bankgold);
    this.lab_suncoin.string = glGame.user.cutFloat(this.gold + this.bankgold);
    this.savegold.string = "";
    this.progress.progress = 0.01;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
  },
  refreshUi: function refreshUi() {
    this.pic_confirm[glGame.bank.DEPOSIT].active = false;
    this.pic_confirm[glGame.bank.WITHDRAW].active = false;
    this.cutstate_node[glGame.bank.WITHDRAW].active = false;
    this.cutstate_node[glGame.bank.DEPOSIT].active = false;

    if (this.isDeposit()) {
      this.lab_cutstate.string = this.curBankText[glGame.bank.WITHDRAW];
      this.pic_title.string = "".concat(this.curBankText[glGame.bank.DEPOSIT], "\u6BD4\u4F8B:");
      this.pic_confirm[glGame.bank.DEPOSIT].active = true;
      this.cutstate_node[glGame.bank.DEPOSIT].active = true;
    } else if (this.isWithdraw()) {
      this.lab_cutstate.string = this.curBankText[glGame.bank.DEPOSIT];
      this.pic_title.string = "".concat(this.curBankText[glGame.bank.WITHDRAW], "\u6BD4\u4F8B:");
      this.pic_confirm[glGame.bank.WITHDRAW].active = true;
      this.cutstate_node[glGame.bank.WITHDRAW].active = true;
    }
  },
  updateBankSuccess: function updateBankSuccess() {
    glGame.audio.playSoundEffect(this.audio_safebox, true);
    this.updateEditbox();
  },
  updateEditbox: function updateEditbox() {
    this.savegold.string = "";
    this.progress.progress = 0.01;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "confirm":
        this.click_confirm();
        break;

      case "btn_xgbxgmm_grzx":
        this.click_modifypsw();
        break;

      case "btn_deposit":
        this.click_Deposit();
        break;

      case "btn_withdrawn":
        this.click_Withdraw();
        break;

      case "btn_coinmax":
        this.click_coinMax();
        break;

      default:
        break;
    }
  },
  // 存款模式
  isDeposit: function isDeposit() {
    return this.curBankPattern === glGame.bank.DEPOSIT;
  },
  // 取出模式
  isWithdraw: function isWithdraw() {
    return this.curBankPattern === glGame.bank.WITHDRAW;
  },
  click_Deposit: function click_Deposit() {
    this.savegold.string = "";
    this.savegold.placeholder = glGame.tips.BANK.SAVEPLACEHOLDER;
    this.progress.progress = 0.01;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
    this.curBankPattern = glGame.bank.DEPOSIT;
    this.refreshUi();
  },
  click_Withdraw: function click_Withdraw() {
    this.savegold.string = "";
    this.savegold.placeholder = glGame.tips.BANK.TAKEPLACEHOLDER;
    this.progress.progress = 0.01;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
    this.curBankPattern = glGame.bank.WITHDRAW;
    this.refreshUi();
  },
  click_coinMax: function click_coinMax() {
    this.savegold.string = this.getFixNumber(this.isDeposit() ? this.gold : this.bankgold);
    this.progress.progress = 1;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 1;
  },
  onSliderProcess: function onSliderProcess(node, process) {
    var name = node.name;

    switch (name) {
      case "slider":
        this.progress.getComponent(cc.ProgressBar).progress = process == 0 ? 0.01 : process;

        if (this.isDeposit()) {
          this.savegold.string = this.getFixNumber(process * this.gold);
        } else {
          this.savegold.string = this.getFixNumber(process * this.bankgold);
        }

        break;

      default:
        break;
    }
  },
  onEditBox: function onEditBox(node) {
    var numGold = this.isDeposit() ? this.gold : this.bankgold;
    console.log("这是当前两个参数的大小", Number(this.savegold.string), numGold);

    if (Number(this.savegold.string) > 0 && numGold > 0) {
      var process = Number(this.savegold.string) / (numGold / 100);

      if (Number(this.savegold.string) * 100 >= numGold) {
        //this.isDeposit() ? this.click_DepositMax() : this.click_WithdrawMax();
        this.click_coinMax();
        process = 1;
      } else {
        this.progress.progress = process;
        this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = process;
      }

      if (this.savegold.string.substr(0, 1) === '0') this.savegold.string = Number(this.savegold.string).toString();
    } else {
      this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
      this.progress.progress = 0.01;
      this.savegold.string = '';
    }
  },
  getFixNumber: function getFixNumber(value) {
    var value1 = Number(value).div(10);
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else if (~~value1 === value1) {
      return value.toFixed(1);
    } else {
      return value.toFixed(2);
    }
  },
  click_modifypsw: function click_modifypsw() {
    glGame.panel.showPanelByName("bankmodifypsw");
  },
  // 提交银行操作到服务器
  click_confirm: function click_confirm() {
    if (this.savegold.string.length == 0) {
      return glGame.panel.showErrorTip(this.isDeposit() ? glGame.tips.BANK.SAVEZERO : glGame.tips.BANK.TAKEZERO);
    }

    if (!/^\d+(\.\d{0,2})?$/.test(this.savegold.string)) {
      return glGame.panel.showErrorTip(this.isDeposit() ? glGame.tips.BANK.SAVEERROR : glGame.tips.BANK.TAKEERROR);
    }

    var savegold = 0; // if (this.savegold.string.indexOf('.') != -1)
    //     savegold = Number(this.savegold.string.replace('.', ''));
    // else {
    //     savegold = Number(this.savegold.string).mul(100);
    // }

    savegold = Number(this.savegold.string).mul(100);
    if (savegold <= 0) return glGame.panel.showErrorTip(this.isDeposit() ? glGame.tips.BANK.SAVELITTLE : glGame.tips.BANK.TAKELITTLE);

    if (savegold > (this.isDeposit() ? this.gold : this.bankgold)) {
      return glGame.panel.showErrorTip(this.isDeposit() ? glGame.tips.BANK.SAVEMUCH : glGame.tips.BANK.TAKEMUCH);
    }

    if (this.isDeposit()) {
      glGame.user.reqBankSave(savegold);
    } else if (this.isWithdraw()) {
      glGame.panel.showPanelByName("bankpassword").then(function (panel) {
        var script = panel.getComponent(panel.name);
        script.setConfirmNext(function (password) {
          glGame.user.reqBankTakeOut(savegold, password);
        });
      });
    }
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
});

cc._RF.pop();
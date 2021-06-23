"use strict";
cc._RF.push(module, '80472Ti2EZOepBlJiIB+lr0', 'shopAgencyPanel');
// modules/public/script/shop/shopAgencyPanel.js

"use strict";

glGame.baseclass.extend({
  properties: {
    serviceContent: cc.Node,
    QQItem: cc.Node,
    WechatItem: cc.Node,
    complainPanel: cc.Prefab,
    mylogicID: cc.Label,
    labDescribe: cc.Label,
    lab_freepecent: cc.Label,
    lab_complain: cc.Label,
    lab_des_miaosu: cc.Node
  },
  onLoad: function onLoad() {},
  onClick: function onClick(name, node) {
    // for(let i = 0 ;i<this.payPageList.length;i++){
    //     let list = this.payPageList[i]
    //     for(let j = 0;j<list.data.length;j++){
    //         if(name == `btnContact${j}add${list.data[j].name}`){
    //             let type = list.data[j].contactType;
    //             let number = list.data[j].contactAccount
    //             let jump = glGame.user.get('url').service_url_jump
    //             let url = jump +'?'+`jump_type=${type}&jump_url=${number}`
    //             cc.sys.openURL(url)
    //             return
    //         }
    //         console.log('ddddddddddddddddddd=========',name,list.name)
    //         if(name == `btn_copy${j}add${list.name}`){
    //             this.btn_copyCB(list.data[j].contactAccount)
    //             return;
    //         }
    //     }
    // }
    for (var i = 0; i < this.pageData.data.length; i++) {
      var list = this.pageData.data[i];

      if (name == "btnContact".concat(i, "add").concat(this.pageData.id)) {
        var type = list.contactType;
        var number = list.contactAccount;
        var jump = glGame.user.get('url').service_url_jump;
        var url = ''; //contactType: 1:微信 2：qq

        if (type == 2) {
          //jump_type 1:跳QQ，2跳微信
          // url = jump +'?'+`jump_type=${2}&jump_url=${number}`
          glGame.platform.openURL("weixin://");
        } else if (type == 1) {
          //jump_type 1:跳QQ，2跳微信
          url = jump + '?' + "jump_type=".concat(1, "&jump_url=", number);
          glGame.platform.openURL(url);
        }

        return;
      }

      if (name == "btn_copy".concat(i, "add").concat(this.pageData.id)) {
        this.btn_copyCB(list.contactAccount);
        return;
      }
    }

    for (var _i = 0; _i < this.payPageList.length; _i++) {
      if (node.parent.name == "selectBtn".concat(_i)) {
        this.ReqPayType(this.payPageList[_i].id);
        return;
      }
    }

    switch (name) {
      case "btn_record":
        glGame.emitter.emit("showrechargeRecord");
        break;

      case "btn_service":
        this.btn_serviceCB();
        break;

      case "btn_copy":
        this.btn_copyMyId();
        break;

      case "close_eff":
        this.click_close();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  click_record: function click_record() {},
  ReqPayType: function ReqPayType(pageId) {
    var _this = this;

    //this.pageId = pageId
    var typeId = this.typeId;
    glGame.gameNet.send_msg('http.ReqPayPage', {
      pageId: pageId,
      typeId: typeId
    }, function (route, msg) {
      _this.setContent(msg.result);
    });
  },
  initUI: function initUI(data) {
    this.payPageList = data.payPageList;
    this.mylogicID.string = glGame.user.get("logicID");

    if (data.giveProportion == 0) {
      this.lab_freepecent.node.parent.active = false;
      this.lab_des_miaosu.active = true;
    } else {
      this.lab_freepecent.string = Number(data.giveProportion).div(100).toFixed(2) + "%";
    }

    if (data.complaint) this.lab_complain.string = "\u5956\u52B1".concat(Number(data.complaint.reward).div(100).toString(), "\u5143"); // for (let i = 0; i < data.payPageList.length; i++) {
    //     let RowItem = cc.instantiate(this.RowItem);   
    //     RowItem.parent = this.Rowcontent;
    //     RowItem.active = true;
    //     RowItem.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = data.payPageList[i].name;
    //     RowItem.getChildByName("checkmark").getChildByName("Label").getComponent(cc.Label).string = data.payPageList[i].name;
    //     RowItem.name = `selectBtn${i}`
    //   }

    this.typeId = data.id;
    this.setContent(data.payPageList[0]);
  },
  setContent: function setContent(data) {
    this.serviceContent.destroyAllChildren();
    this.serviceContent.removeAllChildren();

    if (data) {} else {
      return;
    }

    ;
    this.setDescribe(data.describe);
    this.pageData = data;

    for (var i = 0; i < data.data.length; i++) {
      var serviceItem = cc.instantiate(data.data[i].contactType == 1 ? this.QQItem : this.WechatItem);
      serviceItem.parent = this.serviceContent;
      serviceItem.active = true;
      serviceItem.getChildByName("name").getComponent(cc.Label).string = data.data[i].name;
      serviceItem.getChildByName("Level").getComponent(cc.Label).string = "好评" + data.data[i].comment;
      serviceItem.getChildByName("Level").active = false;
      serviceItem.getChildByName("strNum").getComponent(cc.Label).string = data.data[i].contactType == 1 ? "QQ:" + data.data[i].contactAccount : "微信:" + data.data[i].contactAccount;
      serviceItem.getChildByName("btn_lianjiblue").name = "btnContact".concat(i, "add").concat(data.id);
      var headUrl = glGame.user.get('url').resource_url + data.data[i].avatar;
      glGame.panel.showRemoteImage(serviceItem.getChildByName("headmask").getChildByName('head'), headUrl);
      var rechargeType = data.data[i].rechargeType;

      for (var j = 0; j < rechargeType.length; j++) {
        serviceItem.getChildByName("banksign").getChildByName("".concat(rechargeType[j])).active = true;
      }

      var startLevel = Number(data.data[i].star) * 56.2 - (Math.ceil(Number(data.data[i].star)) - 1) * 4;
      serviceItem.getChildByName("levelSpot").getComponent(cc.Layout).enabled = false;
      serviceItem.getChildByName("levelSpot").width = startLevel;
    }
  },
  setDescribe: function setDescribe(data) {
    this.labDescribe.string = data;

    this.labDescribe._forceUpdateRenderData();

    if (this.labDescribe.node.height > 250) {
      this.labDescribe.overflow = 1;
      this.labDescribe.node.height = 120;
      this.labDescribe.verticalAlign = 0;
    }
  },
  btn_serviceCB: function btn_serviceCB() {
    glGame.panel.showChildPanel(this.complainPanel, this.node.parent.parent);
  },
  btn_copyCB: function btn_copyCB(copyId) {
    glGame.platform.copyToClip(copyId);
  },
  btn_copyMyId: function btn_copyMyId() {
    glGame.platform.copyToClip(glGame.user.get("logicID"));
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
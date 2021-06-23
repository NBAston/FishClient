
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/popularize/pandect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6172crqhx5C4JlwyGXP8qBV', 'pandect');
// modules/plaza/script/prefab/popularize/pandect.js

"use strict";

glGame.baseclass.extend({
  properties: {
    scalecommission: cc.Prefab,
    activemember: cc.Prefab,
    //myinfo
    mylogicID: cc.Label,
    myName: cc.Label,
    myhead: cc.Node,
    myVipLevel: cc.Label,
    lb_daili: cc.Label,
    lb_rebate: cc.Label,
    //预计
    commission: cc.Label,
    pDirectCommission: cc.Label,
    pContributeSubCommission: cc.Label,
    directAchievement: cc.Label,
    teamAchievement: cc.Label,
    //昨日
    yesterdayCommission: cc.Label,
    yDirectCommission: cc.Label,
    yContributeSubCommission: cc.Label,
    yDirectAchievement: cc.Label,
    yTeamAchievement: cc.Label,
    //团队
    teamEffectiveNumber: cc.Label,
    directNumber: cc.Label,
    directNumberNow: cc.Label,
    subNumber: cc.Label,
    subNumberNow: cc.Label,
    effectiveNumber: cc.Label,
    //可领取佣金
    historyCommission: cc.Label,
    canReceiveExtension: cc.Label,
    //有效成员按钮
    btn_validaward: cc.Node,
    //二维码
    node_QRcode: cc.Node,
    save_QRcode: cc.Node,
    node_QRcodeScreenshot: cc.Node,
    QRcodeCamera: cc.Camera
  },
  onLoad: function onLoad() {
    var _this = this;

    glGame.emitter.on("activeRedclose", this.activeRedclose, this);
    this.isAftetrDraw = false;
    cc.director.once(cc.Director.EVENT_AFTER_DRAW, function () {
      _this.isAftetrDraw = true;
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_getbrokerage":
        this.getbrokerageCB();
        break;

      case "btn_brokerage":
        this.brokerage();
        break;

      case "btn_validaward":
        this.validaward();
        break;
      //二维码

      case "btn_sharefriend":
        this.sharefriend();
        break;

      case "btn_sharefriendscircle":
        this.sharefriendscircle();
        break;

      case "btn_copy":
        this.copyCB();
        break;

      case "btn_saveqrcode":
        this.saveqrcode();
        break;

      default:
        break;
    }
  },
  activeRedclose: function activeRedclose() {
    this.btn_validaward.getChildByName("redmark").active = false;
  },
  initUI: function initUI(pandectdata, ruleDetaildata) {
    this.pandectdata = pandectdata;
    this.ruleDetaildata = ruleDetaildata;
    this.mylogicID.string = glGame.user.get("logicID");
    this.myName.string = glGame.user.get("nickname");
    this.myVipLevel.string = glGame.user.get("vip_name");
    glGame.panel.showHeadImage(this.myhead, glGame.user.get("headURL"));
    this.btn_validaward.getChildByName("redmark").active = pandectdata.reward_red_dot == 1;

    if (this.pandectdata.data.achievement >= this.ruleDetaildata[0].exp) {
      if (this.pandectdata.data.achievement >= this.ruleDetaildata[this.ruleDetaildata.length - 1].exp) {
        this.lb_daili.string = this.ruleDetaildata[this.ruleDetaildata.length - 1].level;
        this.lb_rebate.string = "\u6BCF\u4E07\u8FD4\u4F63".concat(this.getFloat(this.ruleDetaildata[this.ruleDetaildata.length - 1].reward), "\u5143");
      } else {
        for (var i = 0; i < this.ruleDetaildata.length; i++) {
          if (this.pandectdata.data.achievement < this.ruleDetaildata[i].exp) {
            this.lb_daili.string = this.ruleDetaildata[i - 1].level;
            this.lb_rebate.string = "\u6BCF\u4E07\u8FD4\u4F63".concat(this.getFloat(this.ruleDetaildata[i - 1].reward), "\u5143");
            break;
          }
        }
      }
    } else {
      this.lb_daili.string = "\u672A\u8FBE\u5230\u6700\u4F4E\u6761\u4EF6";
      this.lb_rebate.string = "0";
    } //up
    //mid
    //今日佣金


    this.commission.string = this.getFloat(this.pandectdata.data.commission);
    this.pDirectCommission.string = this.getFloat(this.pandectdata.data.direct_commission);
    this.pContributeSubCommission.string = this.getFloat(this.pandectdata.data.sub_commission);
    this.directAchievement.string = this.getFloat(this.pandectdata.data.direct_achievement);
    this.teamAchievement.string = this.getFloat(this.pandectdata.data.achievement); //昨日佣金

    this.yesterdayCommission.string = this.getFloat(this.pandectdata.data.yesterday_commission);
    this.yDirectCommission.string = this.getFloat(this.pandectdata.data.yesterday_direct_commission);
    this.yContributeSubCommission.string = this.getFloat(this.pandectdata.data.yesterday_sub_commission);
    this.yDirectAchievement.string = this.getFloat(this.pandectdata.data.yesterday_direct_achievement);
    this.yTeamAchievement.string = this.getFloat(this.pandectdata.data.yesterday_achievement); //团队佣金`${this.pandectdata.data.effective_number}/${this.pandectdata.data.direct_effective_number}`

    this.teamEffectiveNumber.string = "".concat(this.pandectdata.data.effective_number);
    this.directNumber.string = "".concat(this.pandectdata.data.direct_number);
    this.directNumberNow.string = "(".concat(this.pandectdata.data.new_direct_number > 0 ? '+' : '').concat(this.pandectdata.data.new_direct_number, ")");
    this.subNumber.string = "".concat(this.pandectdata.data.sub_number);
    this.subNumberNow.string = "(".concat(this.pandectdata.data.new_sub_number > 0 ? '+' : '').concat(this.pandectdata.data.new_sub_number, ")");
    this.effectiveNumber.string = "".concat(this.pandectdata.data.direct_effective_number); //可领取佣金

    this.historyCommission.string = this.getFloat(this.pandectdata.data.history_commission);
    this.canReceiveExtension.string = this.getFloat(this.pandectdata.data.can_receive_extension); // 设置有效成员显示

    this.btn_validaward.active = this.pandectdata.reward_show == 1; //处理二维码

    this.initShareQRcodeUI();
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  ReqAccountsShare: function ReqAccountsShare() {
    glGame.gameNet.send_msg('http.ReqAccountsShare', {}, function (route, msg) {});
  },
  getbrokerageCB: function getbrokerageCB() {
    var _this2 = this;

    if (this.pandectdata.data.can_receive_extension < this.pandectdata.extract_limit) {
      glGame.panel.showMsgBox("消息", glGame.tips.POPULARIZE.MINLIMIT.format("".concat(this.getFloat(this.pandectdata.extract_limit))), function () {});
      return;
    }

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessApply', {}, function (route, msg) {
      if (_this2.pandectdata.mode == 1) {
        var strTitle = glGame.tips.POPULARIZE.CONGRATULATE;
        glGame.panel.showAwardBox(strTitle, [{
          type: glGame.awardtype.COIN,
          value: _this2.getFloat(_this2.pandectdata.data.can_receive_extension)
        }]);
      } else if (_this2.pandectdata.mode == 2) {
        glGame.panel.showMsgBox("", glGame.tips.POPULARIZE.APPLYSUCCESS.format("".concat(_this2.getFloat(_this2.pandectdata.data.can_receive_extension))));
      }

      glGame.user.ReqRedDot();
      glGame.user.reqGetCoin();
      glGame.emitter.emit("refreshPopularize");
    });
  },
  brokerage: function brokerage() {
    var scalecommission = glGame.panel.showChildPanel(this.scalecommission, this.node.parent.parent);
    var script = scalecommission.getComponent("scalecommission");
    script.initUI(this.ruleDetaildata, this.pandectdata.data.achievement);
  },
  validaward: function validaward() {
    var activemember = glGame.panel.showChildPanel(this.activemember, this.node.parent.parent);
    var script = activemember.getComponent("activemember");
    script.initUI(this.pandectdata);
  },
  initShareQRcodeUI: function initShareQRcodeUI() {
    this.initCode();
    if (!glGame.isEnableHotUpdate) this.initCodeScreenshot();
  },
  //截屏用的对象
  initCodeScreenshot: function initCodeScreenshot() {
    var qrcode = new QRCode(8, QRErrorCorrectLevel.H);
    qrcode.addData(this.pandectdata.data.promo_url);
    qrcode.make();
    var ctx = this.node_QRcodeScreenshot.getComponent(cc.Graphics);
    var tileW = this.node_QRcodeScreenshot.width / qrcode.getModuleCount();
    var tileH = this.node_QRcodeScreenshot.height / qrcode.getModuleCount(); // draw in the Graphics

    for (var row = 0; row < qrcode.getModuleCount(); row++) {
      for (var col = 0; col < qrcode.getModuleCount(); col++) {
        if (qrcode.isDark(row, col)) {
          ctx.fillColor = cc.Color.BLACK;
        } else {
          ctx.fillColor = cc.Color.WHITE;
        }

        var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
        var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
        ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        ctx.fill();
      }
    }
  },
  initCode: function initCode() {
    var qrcode = new QRCode(8, QRErrorCorrectLevel.H);
    qrcode.addData(this.pandectdata.data.promo_url);
    qrcode.make();
    var ctx = this.node_QRcode.getComponent(cc.Graphics);
    var tileW = this.node_QRcode.width / qrcode.getModuleCount();
    var tileH = this.node_QRcode.height / qrcode.getModuleCount(); // draw in the Graphics

    for (var row = 0; row < qrcode.getModuleCount(); row++) {
      for (var col = 0; col < qrcode.getModuleCount(); col++) {
        if (qrcode.isDark(row, col)) {
          ctx.fillColor = cc.Color.BLACK;
        } else {
          ctx.fillColor = cc.Color.WHITE;
        }

        var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
        var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
        ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        ctx.fill();
      }
    }
  },
  //分享微信好友
  sharefriend: function sharefriend() {
    //已安装微信
    if (cc.sys.isNative && glGame.isLoginSelect) {
      if (!this.checkWeChatApp()) return;
      var data = this.pandectdata.share_config;

      if (data.WX_SHARE_TYPE == 1) {
        glGame.platform.shareTotWX(data.WX_SHARE_TITLE, data.WX_SHARE_INFO, data.WX_SHARE_JUMP_URL, 0, data.WX_SHARE_IMG_URL);
      } else {
        glGame.platform.shareImage(data.WX_SHARE_IMG_URL, 0);
      }

      this.ReqAccountsShare();
    } else {
      glGame.servercfg.turnOtherApp(2);
    }
  },
  //分享微信朋友圈
  sharefriendscircle: function sharefriendscircle() {
    //已安装微信
    if (cc.sys.isNative && glGame.isLoginSelect) {
      if (!this.checkWeChatApp()) return;
      var data = this.pandectdata.share_config;

      if (data.WX_SHARE_TYPE == 1) {
        glGame.platform.shareTotWX(data.WX_SHARE_TITLE, data.WX_SHARE_INFO, data.WX_SHARE_JUMP_URL, 1, data.WX_SHARE_IMG_URL);
      } else {
        glGame.platform.shareImage(data.WX_SHARE_IMG_URL, 1);
      }

      this.ReqAccountsShare();
    } else {
      glGame.servercfg.turnOtherApp(2);
    }
  },
  copyCB: function copyCB() {
    glGame.platform.copyToClip(this.pandectdata.data.promo_url, glGame.tips.POPULARIZE.COPYLINKSUCCESS);
  },
  getQrCodePic: function getQrCodePic() {
    var _this3 = this;

    if (!this.isAftetrDraw) {
      console.error("Not yet rendered from get qrcode!");
      return;
    }

    var texture = new cc.RenderTexture();
    texture.initWithSize(270, 270);
    this.save_QRcode.active = true;
    this.QRcodeCamera.targetTexture = texture;
    this.QRcodeCamera.alignWithScreen = false;
    this.QRcodeCamera.orthoSize = 140;
    this.QRcodeCamera.render();
    var data = texture.readPixels();

    if (cc.sys.isNative) {
      //真机
      var fileName = "Image";
      var fileType = ".png";
      var filePath = jsb.fileUtils.getWritablePath() + fileName + fileType;
      jsb.saveImageData(data, 270, 270, filePath);
      glGame.platform.saveToLocal(filePath);
    } else {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var width = canvas.width = texture.width = 270;
      var height = canvas.height = texture.height = 270;
      canvas.width = texture.width;
      canvas.height = texture.height;
      var rowBytes = width * 4;

      for (var row = 0; row < height; row++) {
        var srow = height - 1 - row;
        var imageData = ctx.createImageData(width, 1);
        var start = srow * width * 4;

        for (var i = 0; i < rowBytes; i++) {
          imageData.data[i] = data[start + i];
        }

        ctx.putImageData(imageData, 0, row);
      }

      var str = canvas.toDataURL("image/png");
      var div = document.createElement("div");
      var img = new Image();

      img.onload = function () {
        var urlData = str;
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1] || "image/png";

        var bytes = _this3.dataURItoBlob(urlData);

        textFileAsBlob = new Blob([bytes], {
          type: mime
        });
        var downloadLink = document.createElement("a");
        downloadLink.download = "qrcode.png";
        downloadLink.innerHTML = "Download File";

        if (window.webkitURL != null) {
          downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
        }

        downloadLink.click();
      };

      div.style.position = 'absolute';
      div.setAttribute('z-index', '99');
      img.src = str;
      div.appendChild(img);
    }
  },
  saveqrcode: function saveqrcode() {
    this.getQrCodePic();
  },
  //是否有安装微信
  checkWeChatApp: function checkWeChatApp() {
    //判断 是否有安装微信
    if (!glGame.platform.isWxAppInstalled()) {
      glGame.panel.showMsgBox("提示", glGame.tips.POPULARIZE.CANTFINDWX);
      return false;
    }

    return true;
  },
  //base64 解码 图片 转为 二进制字节数组
  dataURItoBlob: function dataURItoBlob(base64Data) {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0) byteString = atob(base64Data.split(',')[1]); //base64 解码
    else {
        byteString = unescape(base64Data.split(',')[1]);
      }
    var ia = new Uint8Array(byteString.length); //创建视图

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return ia;
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("activeRedclose", this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxwb3B1bGFyaXplXFxwYW5kZWN0LmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJzY2FsZWNvbW1pc3Npb24iLCJjYyIsIlByZWZhYiIsImFjdGl2ZW1lbWJlciIsIm15bG9naWNJRCIsIkxhYmVsIiwibXlOYW1lIiwibXloZWFkIiwiTm9kZSIsIm15VmlwTGV2ZWwiLCJsYl9kYWlsaSIsImxiX3JlYmF0ZSIsImNvbW1pc3Npb24iLCJwRGlyZWN0Q29tbWlzc2lvbiIsInBDb250cmlidXRlU3ViQ29tbWlzc2lvbiIsImRpcmVjdEFjaGlldmVtZW50IiwidGVhbUFjaGlldmVtZW50IiwieWVzdGVyZGF5Q29tbWlzc2lvbiIsInlEaXJlY3RDb21taXNzaW9uIiwieUNvbnRyaWJ1dGVTdWJDb21taXNzaW9uIiwieURpcmVjdEFjaGlldmVtZW50IiwieVRlYW1BY2hpZXZlbWVudCIsInRlYW1FZmZlY3RpdmVOdW1iZXIiLCJkaXJlY3ROdW1iZXIiLCJkaXJlY3ROdW1iZXJOb3ciLCJzdWJOdW1iZXIiLCJzdWJOdW1iZXJOb3ciLCJlZmZlY3RpdmVOdW1iZXIiLCJoaXN0b3J5Q29tbWlzc2lvbiIsImNhblJlY2VpdmVFeHRlbnNpb24iLCJidG5fdmFsaWRhd2FyZCIsIm5vZGVfUVJjb2RlIiwic2F2ZV9RUmNvZGUiLCJub2RlX1FSY29kZVNjcmVlbnNob3QiLCJRUmNvZGVDYW1lcmEiLCJDYW1lcmEiLCJvbkxvYWQiLCJlbWl0dGVyIiwib24iLCJhY3RpdmVSZWRjbG9zZSIsImlzQWZ0ZXRyRHJhdyIsImRpcmVjdG9yIiwib25jZSIsIkRpcmVjdG9yIiwiRVZFTlRfQUZURVJfRFJBVyIsIm9uQ2xpY2siLCJuYW1lIiwibm9kZSIsImdldGJyb2tlcmFnZUNCIiwiYnJva2VyYWdlIiwidmFsaWRhd2FyZCIsInNoYXJlZnJpZW5kIiwic2hhcmVmcmllbmRzY2lyY2xlIiwiY29weUNCIiwic2F2ZXFyY29kZSIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwiaW5pdFVJIiwicGFuZGVjdGRhdGEiLCJydWxlRGV0YWlsZGF0YSIsInN0cmluZyIsInVzZXIiLCJnZXQiLCJwYW5lbCIsInNob3dIZWFkSW1hZ2UiLCJyZXdhcmRfcmVkX2RvdCIsImRhdGEiLCJhY2hpZXZlbWVudCIsImV4cCIsImxlbmd0aCIsImxldmVsIiwiZ2V0RmxvYXQiLCJyZXdhcmQiLCJpIiwiZGlyZWN0X2NvbW1pc3Npb24iLCJzdWJfY29tbWlzc2lvbiIsImRpcmVjdF9hY2hpZXZlbWVudCIsInllc3RlcmRheV9jb21taXNzaW9uIiwieWVzdGVyZGF5X2RpcmVjdF9jb21taXNzaW9uIiwieWVzdGVyZGF5X3N1Yl9jb21taXNzaW9uIiwieWVzdGVyZGF5X2RpcmVjdF9hY2hpZXZlbWVudCIsInllc3RlcmRheV9hY2hpZXZlbWVudCIsImVmZmVjdGl2ZV9udW1iZXIiLCJkaXJlY3RfbnVtYmVyIiwibmV3X2RpcmVjdF9udW1iZXIiLCJzdWJfbnVtYmVyIiwibmV3X3N1Yl9udW1iZXIiLCJkaXJlY3RfZWZmZWN0aXZlX251bWJlciIsImhpc3RvcnlfY29tbWlzc2lvbiIsImNhbl9yZWNlaXZlX2V4dGVuc2lvbiIsInJld2FyZF9zaG93IiwiaW5pdFNoYXJlUVJjb2RlVUkiLCJ2YWx1ZSIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwiUmVxQWNjb3VudHNTaGFyZSIsImdhbWVOZXQiLCJzZW5kX21zZyIsInJvdXRlIiwibXNnIiwiZXh0cmFjdF9saW1pdCIsInNob3dNc2dCb3giLCJ0aXBzIiwiUE9QVUxBUklaRSIsIk1JTkxJTUlUIiwiZm9ybWF0IiwibW9kZSIsInN0clRpdGxlIiwiQ09OR1JBVFVMQVRFIiwic2hvd0F3YXJkQm94IiwidHlwZSIsImF3YXJkdHlwZSIsIkNPSU4iLCJBUFBMWVNVQ0NFU1MiLCJSZXFSZWREb3QiLCJyZXFHZXRDb2luIiwiZW1pdCIsInNob3dDaGlsZFBhbmVsIiwicGFyZW50Iiwic2NyaXB0IiwiZ2V0Q29tcG9uZW50IiwiaW5pdENvZGUiLCJpc0VuYWJsZUhvdFVwZGF0ZSIsImluaXRDb2RlU2NyZWVuc2hvdCIsInFyY29kZSIsIlFSQ29kZSIsIlFSRXJyb3JDb3JyZWN0TGV2ZWwiLCJIIiwiYWRkRGF0YSIsInByb21vX3VybCIsIm1ha2UiLCJjdHgiLCJHcmFwaGljcyIsInRpbGVXIiwid2lkdGgiLCJnZXRNb2R1bGVDb3VudCIsInRpbGVIIiwiaGVpZ2h0Iiwicm93IiwiY29sIiwiaXNEYXJrIiwiZmlsbENvbG9yIiwiQ29sb3IiLCJCTEFDSyIsIldISVRFIiwidyIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJoIiwicmVjdCIsInJvdW5kIiwiZmlsbCIsInN5cyIsImlzTmF0aXZlIiwiaXNMb2dpblNlbGVjdCIsImNoZWNrV2VDaGF0QXBwIiwic2hhcmVfY29uZmlnIiwiV1hfU0hBUkVfVFlQRSIsInBsYXRmb3JtIiwic2hhcmVUb3RXWCIsIldYX1NIQVJFX1RJVExFIiwiV1hfU0hBUkVfSU5GTyIsIldYX1NIQVJFX0pVTVBfVVJMIiwiV1hfU0hBUkVfSU1HX1VSTCIsInNoYXJlSW1hZ2UiLCJzZXJ2ZXJjZmciLCJ0dXJuT3RoZXJBcHAiLCJjb3B5VG9DbGlwIiwiQ09QWUxJTktTVUNDRVNTIiwiZ2V0UXJDb2RlUGljIiwiY29uc29sZSIsImVycm9yIiwidGV4dHVyZSIsIlJlbmRlclRleHR1cmUiLCJpbml0V2l0aFNpemUiLCJ0YXJnZXRUZXh0dXJlIiwiYWxpZ25XaXRoU2NyZWVuIiwib3J0aG9TaXplIiwicmVuZGVyIiwicmVhZFBpeGVscyIsImZpbGVOYW1lIiwiZmlsZVR5cGUiLCJmaWxlUGF0aCIsImpzYiIsImZpbGVVdGlscyIsImdldFdyaXRhYmxlUGF0aCIsInNhdmVJbWFnZURhdGEiLCJzYXZlVG9Mb2NhbCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJyb3dCeXRlcyIsInNyb3ciLCJpbWFnZURhdGEiLCJjcmVhdGVJbWFnZURhdGEiLCJzdGFydCIsInB1dEltYWdlRGF0YSIsInN0ciIsInRvRGF0YVVSTCIsImltZyIsIkltYWdlIiwib25sb2FkIiwidXJsRGF0YSIsImFyciIsInNwbGl0IiwibWltZSIsIm1hdGNoIiwiYnl0ZXMiLCJkYXRhVVJJdG9CbG9iIiwidGV4dEZpbGVBc0Jsb2IiLCJCbG9iIiwiZG93bmxvYWRMaW5rIiwiZG93bmxvYWQiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJ3ZWJraXRVUkwiLCJocmVmIiwiY3JlYXRlT2JqZWN0VVJMIiwiVVJMIiwib25jbGljayIsImRlc3Ryb3lDbGlja2VkRWxlbWVudCIsInN0eWxlIiwiZGlzcGxheSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicG9zaXRpb24iLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpc1d4QXBwSW5zdGFsbGVkIiwiQ0FOVEZJTkRXWCIsImJhc2U2NERhdGEiLCJieXRlU3RyaW5nIiwiaW5kZXhPZiIsImF0b2IiLCJ1bmVzY2FwZSIsImlhIiwiVWludDhBcnJheSIsImNoYXJDb2RlQXQiLCJPbkRlc3Ryb3kiLCJvZmYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxlQUFlLEVBQUVDLEVBQUUsQ0FBQ0MsTUFEWjtBQUVSQyxJQUFBQSxZQUFZLEVBQUVGLEVBQUUsQ0FBQ0MsTUFGVDtBQUdSO0FBQ0FFLElBQUFBLFNBQVMsRUFBRUgsRUFBRSxDQUFDSSxLQUpOO0FBS1JDLElBQUFBLE1BQU0sRUFBRUwsRUFBRSxDQUFDSSxLQUxIO0FBTVJFLElBQUFBLE1BQU0sRUFBRU4sRUFBRSxDQUFDTyxJQU5IO0FBT1JDLElBQUFBLFVBQVUsRUFBRVIsRUFBRSxDQUFDSSxLQVBQO0FBUVJLLElBQUFBLFFBQVEsRUFBRVQsRUFBRSxDQUFDSSxLQVJMO0FBU1JN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QUlDLFVBQUosQ0FBZUwsVUFBVSxDQUFDdEssTUFBMUIsQ0FBVCxDQVBzQixDQU9xQjs7QUFDM0MsU0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHa0ssVUFBVSxDQUFDdEssTUFBL0IsRUFBdUNJLENBQUMsRUFBeEMsRUFBNEM7QUFDeENzSyxNQUFBQSxFQUFFLENBQUN0SyxDQUFELENBQUYsR0FBUWtLLFVBQVUsQ0FBQ00sVUFBWCxDQUFzQnhLLENBQXRCLENBQVI7QUFDSDs7QUFDRCxXQUFPc0ssRUFBUDtBQUNILEdBM1dtQjtBQTRXcEJHLEVBQUFBLFNBNVdvQix1QkE0V1I7QUFDUnRQLElBQUFBLE1BQU0sQ0FBQ3lDLE9BQVAsQ0FBZThNLEdBQWYsQ0FBbUIsZ0JBQW5CLEVBQXFDLElBQXJDO0FBQ0g7QUE5V21CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJnbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc2NhbGVjb21taXNzaW9uOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgYWN0aXZlbWVtYmVyOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgLy9teWluZm9cclxuICAgICAgICBteWxvZ2ljSUQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIG15TmFtZTogY2MuTGFiZWwsXHJcbiAgICAgICAgbXloZWFkOiBjYy5Ob2RlLFxyXG4gICAgICAgIG15VmlwTGV2ZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGxiX2RhaWxpOiBjYy5MYWJlbCxcclxuICAgICAgICBsYl9yZWJhdGU6IGNjLkxhYmVsLFxyXG5cclxuICAgICAgICAvL+mihOiuoVxyXG4gICAgICAgIGNvbW1pc3Npb246IGNjLkxhYmVsLFxyXG4gICAgICAgIHBEaXJlY3RDb21taXNzaW9uOiBjYy5MYWJlbCxcclxuICAgICAgICBwQ29udHJpYnV0ZVN1YkNvbW1pc3Npb246IGNjLkxhYmVsLFxyXG4gICAgICAgIGRpcmVjdEFjaGlldmVtZW50OiBjYy5MYWJlbCxcclxuICAgICAgICB0ZWFtQWNoaWV2ZW1lbnQ6IGNjLkxhYmVsLFxyXG5cclxuICAgICAgICAvL+aYqOaXpVxyXG4gICAgICAgIHllc3RlcmRheUNvbW1pc3Npb246IGNjLkxhYmVsLFxyXG4gICAgICAgIHlEaXJlY3RDb21taXNzaW9uOiBjYy5MYWJlbCxcclxuICAgICAgICB5Q29udHJpYnV0ZVN1YkNvbW1pc3Npb246IGNjLkxhYmVsLFxyXG4gICAgICAgIHlEaXJlY3RBY2hpZXZlbWVudDogY2MuTGFiZWwsXHJcbiAgICAgICAgeVRlYW1BY2hpZXZlbWVudDogY2MuTGFiZWwsXHJcblxyXG4gICAgICAgIC8v5Zui6ZifXHJcbiAgICAgICAgdGVhbUVmZmVjdGl2ZU51bWJlcjogY2MuTGFiZWwsXHJcbiAgICAgICAgZGlyZWN0TnVtYmVyOiBjYy5MYWJlbCxcclxuICAgICAgICBkaXJlY3ROdW1iZXJOb3c6IGNjLkxhYmVsLFxyXG4gICAgICAgIHN1Yk51bWJlcjogY2MuTGFiZWwsXHJcbiAgICAgICAgc3ViTnVtYmVyTm93OiBjYy5MYWJlbCxcclxuICAgICAgICBlZmZlY3RpdmVOdW1iZXI6IGNjLkxhYmVsLFxyXG5cclxuICAgICAgICAvL+WPr+mihuWPluS9o+mHkVxyXG4gICAgICAgIGhpc3RvcnlDb21taXNzaW9uOiBjYy5MYWJlbCxcclxuICAgICAgICBjYW5SZWNlaXZlRXh0ZW5zaW9uOiBjYy5MYWJlbCxcclxuXHJcbiAgICAgICAgLy/mnInmlYjmiJDlkZjmjInpkq5cclxuICAgICAgICBidG5fdmFsaWRhd2FyZDogY2MuTm9kZSxcclxuXHJcbiAgICAgICAgLy/kuoznu7TnoIFcclxuICAgICAgICBub2RlX1FSY29kZTogY2MuTm9kZSxcclxuICAgICAgICBcclxuICAgICAgICBzYXZlX1FSY29kZTogY2MuTm9kZSxcclxuICAgICAgICBub2RlX1FSY29kZVNjcmVlbnNob3Q6IGNjLk5vZGUsXHJcbiAgICAgICAgUVJjb2RlQ2FtZXJhOiBjYy5DYW1lcmEsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwiYWN0aXZlUmVkY2xvc2VcIiwgdGhpcy5hY3RpdmVSZWRjbG9zZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5pc0FmdGV0ckRyYXcgPSBmYWxzZTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5vbmNlKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX0RSQVcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0FmdGV0ckRyYXcgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9nZXRicm9rZXJhZ2VcIjogdGhpcy5nZXRicm9rZXJhZ2VDQigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9icm9rZXJhZ2VcIjogdGhpcy5icm9rZXJhZ2UoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fdmFsaWRhd2FyZFwiOiB0aGlzLnZhbGlkYXdhcmQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v5LqM57u056CBXHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fc2hhcmVmcmllbmRcIjogdGhpcy5zaGFyZWZyaWVuZCgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9zaGFyZWZyaWVuZHNjaXJjbGVcIjogdGhpcy5zaGFyZWZyaWVuZHNjaXJjbGUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY29weVwiOiB0aGlzLmNvcHlDQigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9zYXZlcXJjb2RlXCI6IHRoaXMuc2F2ZXFyY29kZSgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFjdGl2ZVJlZGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuYnRuX3ZhbGlkYXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRtYXJrXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRVSShwYW5kZWN0ZGF0YSwgcnVsZURldGFpbGRhdGEpIHtcclxuICAgICAgICB0aGlzLnBhbmRlY3RkYXRhID0gcGFuZGVjdGRhdGE7XHJcbiAgICAgICAgdGhpcy5ydWxlRGV0YWlsZGF0YSA9IHJ1bGVEZXRhaWxkYXRhO1xyXG5cclxuICAgICAgICB0aGlzLm15bG9naWNJRC5zdHJpbmcgPSBnbEdhbWUudXNlci5nZXQoXCJsb2dpY0lEXCIpO1xyXG4gICAgICAgIHRoaXMubXlOYW1lLnN0cmluZyA9IGdsR2FtZS51c2VyLmdldChcIm5pY2tuYW1lXCIpO1xyXG4gICAgICAgIHRoaXMubXlWaXBMZXZlbC5zdHJpbmcgPSBnbEdhbWUudXNlci5nZXQoXCJ2aXBfbmFtZVwiKTtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0hlYWRJbWFnZSh0aGlzLm15aGVhZCwgZ2xHYW1lLnVzZXIuZ2V0KFwiaGVhZFVSTFwiKSk7XHJcblxyXG4gICAgICAgIHRoaXMuYnRuX3ZhbGlkYXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRtYXJrXCIpLmFjdGl2ZSA9IHBhbmRlY3RkYXRhLnJld2FyZF9yZWRfZG90ID09IDFcclxuICAgICAgICBpZiAodGhpcy5wYW5kZWN0ZGF0YS5kYXRhLmFjaGlldmVtZW50ID49IHRoaXMucnVsZURldGFpbGRhdGFbMF0uZXhwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbmRlY3RkYXRhLmRhdGEuYWNoaWV2ZW1lbnQgPj0gdGhpcy5ydWxlRGV0YWlsZGF0YVt0aGlzLnJ1bGVEZXRhaWxkYXRhLmxlbmd0aCAtIDFdLmV4cCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYl9kYWlsaS5zdHJpbmcgPSB0aGlzLnJ1bGVEZXRhaWxkYXRhW3RoaXMucnVsZURldGFpbGRhdGEubGVuZ3RoIC0gMV0ubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxiX3JlYmF0ZS5zdHJpbmcgPSBg5q+P5LiH6L+U5L2jJHt0aGlzLmdldEZsb2F0KHRoaXMucnVsZURldGFpbGRhdGFbdGhpcy5ydWxlRGV0YWlsZGF0YS5sZW5ndGggLSAxXS5yZXdhcmQpfeWFg2A7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucnVsZURldGFpbGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYW5kZWN0ZGF0YS5kYXRhLmFjaGlldmVtZW50IDwgdGhpcy5ydWxlRGV0YWlsZGF0YVtpXS5leHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYl9kYWlsaS5zdHJpbmcgPSB0aGlzLnJ1bGVEZXRhaWxkYXRhW2kgLSAxXS5sZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYl9yZWJhdGUuc3RyaW5nID0gYOavj+S4h+i/lOS9oyR7dGhpcy5nZXRGbG9hdCh0aGlzLnJ1bGVEZXRhaWxkYXRhW2kgLSAxXS5yZXdhcmQpfeWFg2A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJfZGFpbGkuc3RyaW5nID0gYOacqui+vuWIsOacgOS9juadoeS7tmA7XHJcbiAgICAgICAgICAgIHRoaXMubGJfcmViYXRlLnN0cmluZyA9IGAwYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdXBcclxuXHJcblxyXG4gICAgICAgIC8vbWlkXHJcbiAgICAgICAgLy/ku4rml6XkvaPph5FcclxuICAgICAgICB0aGlzLmNvbW1pc3Npb24uc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLnBhbmRlY3RkYXRhLmRhdGEuY29tbWlzc2lvbik7XHJcbiAgICAgICAgdGhpcy5wRGlyZWN0Q29tbWlzc2lvbi5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMucGFuZGVjdGRhdGEuZGF0YS5kaXJlY3RfY29tbWlzc2lvbik7XHJcbiAgICAgICAgdGhpcy5wQ29udHJpYnV0ZVN1YkNvbW1pc3Npb24uc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLnBhbmRlY3RkYXRhLmRhdGEuc3ViX2NvbW1pc3Npb24pO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0QWNoaWV2ZW1lbnQuc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLnBhbmRlY3RkYXRhLmRhdGEuZGlyZWN0X2FjaGlldmVtZW50KTtcclxuICAgICAgICB0aGlzLnRlYW1BY2hpZXZlbWVudC5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMucGFuZGVjdGRhdGEuZGF0YS5hY2hpZXZlbWVudCk7XHJcblxyXG5cclxuICAgICAgICAvL+aYqOaXpeS9o+mHkVxyXG4gICAgICAgIHRoaXMueWVzdGVyZGF5Q29tbWlzc2lvbi5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMucGFuZGVjdGRhdGEuZGF0YS55ZXN0ZXJkYXlfY29tbWlzc2lvbik7XHJcbiAgICAgICAgdGhpcy55RGlyZWN0Q29tbWlzc2lvbi5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMucGFuZGVjdGRhdGEuZGF0YS55ZXN0ZXJkYXlfZGlyZWN0X2NvbW1pc3Npb24pO1xyXG4gICAgICAgIHRoaXMueUNvbnRyaWJ1dGVTdWJDb21taXNzaW9uLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy5wYW5kZWN0ZGF0YS5kYXRhLnllc3RlcmRheV9zdWJfY29tbWlzc2lvbik7XHJcbiAgICAgICAgdGhpcy55RGlyZWN0QWNoaWV2ZW1lbnQuc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLnBhbmRlY3RkYXRhLmRhdGEueWVzdGVyZGF5X2RpcmVjdF9hY2hpZXZlbWVudCk7XHJcbiAgICAgICAgdGhpcy55VGVhbUFjaGlldmVtZW50LnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy5wYW5kZWN0ZGF0YS5kYXRhLnllc3RlcmRheV9hY2hpZXZlbWVudCk7XHJcblxyXG5cclxuICAgICAgICAvL+WboumYn+S9o+mHkWAke3RoaXMucGFuZGVjdGRhdGEuZGF0YS5lZmZlY3RpdmVfbnVtYmVyfS8ke3RoaXMucGFuZGVjdGRhdGEuZGF0YS5kaXJlY3RfZWZmZWN0aXZlX251bWJlcn1gXHJcbiAgICAgICAgdGhpcy50ZWFtRWZmZWN0aXZlTnVtYmVyLnN0cmluZyA9IGAke3RoaXMucGFuZGVjdGRhdGEuZGF0YS5lZmZlY3RpdmVfbnVtYmVyfWBcclxuXHJcbiAgICAgICAgdGhpcy5kaXJlY3ROdW1iZXIuc3RyaW5nID0gYCR7dGhpcy5wYW5kZWN0ZGF0YS5kYXRhLmRpcmVjdF9udW1iZXJ9YDtcclxuICAgICAgICB0aGlzLmRpcmVjdE51bWJlck5vdy5zdHJpbmcgPSBgKCR7dGhpcy5wYW5kZWN0ZGF0YS5kYXRhLm5ld19kaXJlY3RfbnVtYmVyID4gMCA/ICcrJyA6ICcnfSR7dGhpcy5wYW5kZWN0ZGF0YS5kYXRhLm5ld19kaXJlY3RfbnVtYmVyfSlgXHJcblxyXG4gICAgICAgIHRoaXMuc3ViTnVtYmVyLnN0cmluZyA9IGAke3RoaXMucGFuZGVjdGRhdGEuZGF0YS5zdWJfbnVtYmVyfWA7XHJcbiAgICAgICAgdGhpcy5zdWJOdW1iZXJOb3cuc3RyaW5nID0gYCgke3RoaXMucGFuZGVjdGRhdGEuZGF0YS5uZXdfc3ViX251bWJlciA+IDAgPyAnKycgOiAnJ30ke3RoaXMucGFuZGVjdGRhdGEuZGF0YS5uZXdfc3ViX251bWJlcn0pYFxyXG5cclxuICAgICAgICB0aGlzLmVmZmVjdGl2ZU51bWJlci5zdHJpbmcgPSBgJHt0aGlzLnBhbmRlY3RkYXRhLmRhdGEuZGlyZWN0X2VmZmVjdGl2ZV9udW1iZXJ9YFxyXG5cclxuICAgICAgICAvL+WPr+mihuWPluS9o+mHkVxyXG4gICAgICAgIHRoaXMuaGlzdG9yeUNvbW1pc3Npb24uc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLnBhbmRlY3RkYXRhLmRhdGEuaGlzdG9yeV9jb21taXNzaW9uKTtcclxuICAgICAgICB0aGlzLmNhblJlY2VpdmVFeHRlbnNpb24uc3RyaW5nID0gdGhpcy5nZXRGbG9hdCh0aGlzLnBhbmRlY3RkYXRhLmRhdGEuY2FuX3JlY2VpdmVfZXh0ZW5zaW9uKTtcclxuXHJcbiAgICAgICAgLy8g6K6+572u5pyJ5pWI5oiQ5ZGY5pi+56S6XHJcbiAgICAgICAgdGhpcy5idG5fdmFsaWRhd2FyZC5hY3RpdmUgPSB0aGlzLnBhbmRlY3RkYXRhLnJld2FyZF9zaG93ID09IDE7XHJcblxyXG4gICAgICAgIC8v5aSE55CG5LqM57u056CBXHJcbiAgICAgICAgdGhpcy5pbml0U2hhcmVRUmNvZGVVSSgpO1xyXG4gICAgfSxcclxuICAgIGdldEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuICAgIFJlcUFjY291bnRzU2hhcmUoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coJ2h0dHAuUmVxQWNjb3VudHNTaGFyZScsIHt9LCAocm91dGUsIG1zZykgPT4geyB9KVxyXG4gICAgfSxcclxuICAgIGdldGJyb2tlcmFnZUNCKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhbmRlY3RkYXRhLmRhdGEuY2FuX3JlY2VpdmVfZXh0ZW5zaW9uIDwgdGhpcy5wYW5kZWN0ZGF0YS5leHRyYWN0X2xpbWl0KSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93TXNnQm94KFwi5raI5oGvXCIsIGdsR2FtZS50aXBzLlBPUFVMQVJJWkUuTUlOTElNSVQuZm9ybWF0KGAke3RoaXMuZ2V0RmxvYXQodGhpcy5wYW5kZWN0ZGF0YS5leHRyYWN0X2xpbWl0KX1gKSwgKCkgPT4geyB9KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc0FwcGx5Jywge30sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbmRlY3RkYXRhLm1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0clRpdGxlID0gZ2xHYW1lLnRpcHMuUE9QVUxBUklaRS5DT05HUkFUVUxBVEU7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0F3YXJkQm94KHN0clRpdGxlLCBbeyB0eXBlOiBnbEdhbWUuYXdhcmR0eXBlLkNPSU4sIHZhbHVlOiB0aGlzLmdldEZsb2F0KHRoaXMucGFuZGVjdGRhdGEuZGF0YS5jYW5fcmVjZWl2ZV9leHRlbnNpb24pIH1dKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhbmRlY3RkYXRhLm1vZGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dNc2dCb3goXCJcIiwgZ2xHYW1lLnRpcHMuUE9QVUxBUklaRS5BUFBMWVNVQ0NFU1MuZm9ybWF0KGAke3RoaXMuZ2V0RmxvYXQodGhpcy5wYW5kZWN0ZGF0YS5kYXRhLmNhbl9yZWNlaXZlX2V4dGVuc2lvbil9YCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnbEdhbWUudXNlci5SZXFSZWREb3QoKTtcclxuICAgICAgICAgICAgZ2xHYW1lLnVzZXIucmVxR2V0Q29pbigpO1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KFwicmVmcmVzaFBvcHVsYXJpemVcIik7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBicm9rZXJhZ2UoKSB7XHJcbiAgICAgICAgbGV0IHNjYWxlY29tbWlzc2lvbiA9IGdsR2FtZS5wYW5lbC5zaG93Q2hpbGRQYW5lbCh0aGlzLnNjYWxlY29tbWlzc2lvbiwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQpO1xyXG4gICAgICAgIGxldCBzY3JpcHQgPSBzY2FsZWNvbW1pc3Npb24uZ2V0Q29tcG9uZW50KFwic2NhbGVjb21taXNzaW9uXCIpO1xyXG4gICAgICAgIHNjcmlwdC5pbml0VUkodGhpcy5ydWxlRGV0YWlsZGF0YSwgdGhpcy5wYW5kZWN0ZGF0YS5kYXRhLmFjaGlldmVtZW50KVxyXG4gICAgfSxcclxuICAgIHZhbGlkYXdhcmQoKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZW1lbWJlciA9IGdsR2FtZS5wYW5lbC5zaG93Q2hpbGRQYW5lbCh0aGlzLmFjdGl2ZW1lbWJlciwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQpO1xyXG4gICAgICAgIGxldCBzY3JpcHQgPSBhY3RpdmVtZW1iZXIuZ2V0Q29tcG9uZW50KFwiYWN0aXZlbWVtYmVyXCIpO1xyXG4gICAgICAgIHNjcmlwdC5pbml0VUkodGhpcy5wYW5kZWN0ZGF0YSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdFNoYXJlUVJjb2RlVUkoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0Q29kZSgpO1xyXG4gICAgICAgIGlmICghZ2xHYW1lLmlzRW5hYmxlSG90VXBkYXRlKSB0aGlzLmluaXRDb2RlU2NyZWVuc2hvdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+aIquWxj+eUqOeahOWvueixoVxyXG4gICAgaW5pdENvZGVTY3JlZW5zaG90KCkge1xyXG4gICAgICAgIHZhciBxcmNvZGUgPSBuZXcgUVJDb2RlKDgsIFFSRXJyb3JDb3JyZWN0TGV2ZWwuSCk7XHJcbiAgICAgICAgcXJjb2RlLmFkZERhdGEodGhpcy5wYW5kZWN0ZGF0YS5kYXRhLnByb21vX3VybCk7XHJcbiAgICAgICAgcXJjb2RlLm1ha2UoKTtcclxuXHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMubm9kZV9RUmNvZGVTY3JlZW5zaG90LmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblxyXG4gICAgICAgIHZhciB0aWxlVyA9IHRoaXMubm9kZV9RUmNvZGVTY3JlZW5zaG90LndpZHRoIC8gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XHJcbiAgICAgICAgdmFyIHRpbGVIID0gdGhpcy5ub2RlX1FSY29kZVNjcmVlbnNob3QuaGVpZ2h0IC8gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XHJcblxyXG4gICAgICAgIC8vIGRyYXcgaW4gdGhlIEdyYXBoaWNzXHJcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7IHJvdysrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IHFyY29kZS5nZXRNb2R1bGVDb3VudCgpOyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHFyY29kZS5pc0Rhcmsocm93LCBjb2wpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxDb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbENvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdyA9IChNYXRoLmNlaWwoKGNvbCArIDEpICogdGlsZVcpIC0gTWF0aC5mbG9vcihjb2wgKiB0aWxlVykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGggPSAoTWF0aC5jZWlsKChyb3cgKyAxKSAqIHRpbGVXKSAtIE1hdGguZmxvb3Iocm93ICogdGlsZVcpKTtcclxuICAgICAgICAgICAgICAgIGN0eC5yZWN0KE1hdGgucm91bmQoY29sICogdGlsZVcpLCBNYXRoLnJvdW5kKHJvdyAqIHRpbGVIKSwgdywgaCk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0Q29kZSgpIHtcclxuICAgICAgICB2YXIgcXJjb2RlID0gbmV3IFFSQ29kZSg4LCBRUkVycm9yQ29ycmVjdExldmVsLkgpO1xyXG4gICAgICAgIHFyY29kZS5hZGREYXRhKHRoaXMucGFuZGVjdGRhdGEuZGF0YS5wcm9tb191cmwpO1xyXG4gICAgICAgIHFyY29kZS5tYWtlKCk7XHJcblxyXG4gICAgICAgIHZhciBjdHggPSB0aGlzLm5vZGVfUVJjb2RlLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblxyXG4gICAgICAgIHZhciB0aWxlVyA9IHRoaXMubm9kZV9RUmNvZGUud2lkdGggLyBxcmNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcclxuICAgICAgICB2YXIgdGlsZUggPSB0aGlzLm5vZGVfUVJjb2RlLmhlaWdodCAvIHFyY29kZS5nZXRNb2R1bGVDb3VudCgpO1xyXG5cclxuICAgICAgICAvLyBkcmF3IGluIHRoZSBHcmFwaGljc1xyXG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHFyY29kZS5nZXRNb2R1bGVDb3VudCgpOyByb3crKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBxcmNvZGUuZ2V0TW9kdWxlQ291bnQoKTsgY29sKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChxcmNvZGUuaXNEYXJrKHJvdywgY29sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsQ29sb3IgPSBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxDb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHcgPSAoTWF0aC5jZWlsKChjb2wgKyAxKSAqIHRpbGVXKSAtIE1hdGguZmxvb3IoY29sICogdGlsZVcpKTtcclxuICAgICAgICAgICAgICAgIHZhciBoID0gKE1hdGguY2VpbCgocm93ICsgMSkgKiB0aWxlVykgLSBNYXRoLmZsb29yKHJvdyAqIHRpbGVXKSk7XHJcbiAgICAgICAgICAgICAgICBjdHgucmVjdChNYXRoLnJvdW5kKGNvbCAqIHRpbGVXKSwgTWF0aC5yb3VuZChyb3cgKiB0aWxlSCksIHcsIGgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/liIbkuqvlvq7kv6Hlpb3lj4tcclxuICAgIHNoYXJlZnJpZW5kKCkge1xyXG4gICAgICAgIC8v5bey5a6J6KOF5b6u5L+hXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiBnbEdhbWUuaXNMb2dpblNlbGVjdCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tXZUNoYXRBcHAoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMucGFuZGVjdGRhdGEuc2hhcmVfY29uZmlnO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5XWF9TSEFSRV9UWVBFID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wbGF0Zm9ybS5zaGFyZVRvdFdYKGRhdGEuV1hfU0hBUkVfVElUTEUsIGRhdGEuV1hfU0hBUkVfSU5GTywgZGF0YS5XWF9TSEFSRV9KVU1QX1VSTCwgMCwgZGF0YS5XWF9TSEFSRV9JTUdfVVJMKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wbGF0Zm9ybS5zaGFyZUltYWdlKGRhdGEuV1hfU0hBUkVfSU1HX1VSTCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5SZXFBY2NvdW50c1NoYXJlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnNlcnZlcmNmZy50dXJuT3RoZXJBcHAoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5YiG5Lqr5b6u5L+h5pyL5Y+L5ZyIXHJcbiAgICBzaGFyZWZyaWVuZHNjaXJjbGUoKSB7XHJcbiAgICAgICAgLy/lt7Llronoo4Xlvq7kv6FcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlICYmIGdsR2FtZS5pc0xvZ2luU2VsZWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1dlQ2hhdEFwcCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5wYW5kZWN0ZGF0YS5zaGFyZV9jb25maWc7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLldYX1NIQVJFX1RZUEUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBsYXRmb3JtLnNoYXJlVG90V1goZGF0YS5XWF9TSEFSRV9USVRMRSwgZGF0YS5XWF9TSEFSRV9JTkZPLCBkYXRhLldYX1NIQVJFX0pVTVBfVVJMLCAxLCBkYXRhLldYX1NIQVJFX0lNR19VUkwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBsYXRmb3JtLnNoYXJlSW1hZ2UoZGF0YS5XWF9TSEFSRV9JTUdfVVJMLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlJlcUFjY291bnRzU2hhcmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuc2VydmVyY2ZnLnR1cm5PdGhlckFwcCgyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvcHlDQigpIHtcclxuICAgICAgICBnbEdhbWUucGxhdGZvcm0uY29weVRvQ2xpcCh0aGlzLnBhbmRlY3RkYXRhLmRhdGEucHJvbW9fdXJsLCBnbEdhbWUudGlwcy5QT1BVTEFSSVpFLkNPUFlMSU5LU1VDQ0VTUyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFFyQ29kZVBpYygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNBZnRldHJEcmF3KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJOb3QgeWV0IHJlbmRlcmVkIGZyb20gZ2V0IHFyY29kZSFcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUoMjcwLCAyNzApO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9RUmNvZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlFSY29kZUNhbWVyYS50YXJnZXRUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICB0aGlzLlFSY29kZUNhbWVyYS5hbGlnbldpdGhTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlFSY29kZUNhbWVyYS5vcnRob1NpemUgPSAxNDA7XHJcbiAgICAgICAgdGhpcy5RUmNvZGVDYW1lcmEucmVuZGVyKCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0ZXh0dXJlLnJlYWRQaXhlbHMoKTtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7Ly/nnJ/mnLpcclxuICAgICAgICAgICAgbGV0IGZpbGVOYW1lID0gXCJJbWFnZVwiO1xyXG4gICAgICAgICAgICBsZXQgZmlsZVR5cGUgPSBcIi5wbmdcIjtcclxuICAgICAgICAgICAgbGV0IGZpbGVQYXRoID0ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKSArIGZpbGVOYW1lICsgZmlsZVR5cGU7XHJcbiAgICAgICAgICAgIGpzYi5zYXZlSW1hZ2VEYXRhKGRhdGEsIDI3MCwgMjcwLCBmaWxlUGF0aClcclxuICAgICAgICAgICAgZ2xHYW1lLnBsYXRmb3JtLnNhdmVUb0xvY2FsKGZpbGVQYXRoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY2FudmFzLndpZHRoID0gdGV4dHVyZS53aWR0aCA9IDI3MDtcclxuICAgICAgICAgICAgbGV0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQgPSB0ZXh0dXJlLmhlaWdodCA9IDI3MDtcclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gdGV4dHVyZS53aWR0aDtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHRleHR1cmUuaGVpZ2h0O1xyXG4gICAgICAgICAgICBsZXQgcm93Qnl0ZXMgPSB3aWR0aCAqIDQ7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGhlaWdodDsgcm93KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcm93ID0gaGVpZ2h0IC0gMSAtIHJvdztcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZURhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCAxKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHNyb3cgKiB3aWR0aCAqIDQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd0J5dGVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpXSA9IGRhdGFbc3RhcnQgKyBpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCByb3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybERhdGEgPSBzdHI7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gdXJsRGF0YS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbWUgPSBhcnJbMF0ubWF0Y2goLzooLio/KTsvKVsxXSB8fCBcImltYWdlL3BuZ1wiO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ5dGVzID0gdGhpcy5kYXRhVVJJdG9CbG9iKHVybERhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dEZpbGVBc0Jsb2IgPSBuZXcgQmxvYihbYnl0ZXNdLCB7IHR5cGU6IG1pbWUgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZExpbmsuZG93bmxvYWQgPSBcInFyY29kZS5wbmdcIjtcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkTGluay5pbm5lckhUTUwgPSBcIkRvd25sb2FkIEZpbGVcIjtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cud2Via2l0VVJMICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb3dubG9hZExpbmsuaHJlZiA9IHdpbmRvdy53ZWJraXRVUkwuY3JlYXRlT2JqZWN0VVJMKHRleHRGaWxlQXNCbG9iKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRMaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCh0ZXh0RmlsZUFzQmxvYik7XHJcbiAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRMaW5rLm9uY2xpY2sgPSBkZXN0cm95Q2xpY2tlZEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRMaW5rLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvd25sb2FkTGluayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZExpbmsuY2xpY2soKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnei1pbmRleCcsICc5OScpO1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gc3RyO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNhdmVxcmNvZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRRckNvZGVQaWMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mmK/lkKbmnInlronoo4Xlvq7kv6FcclxuICAgIGNoZWNrV2VDaGF0QXBwKCkge1xyXG4gICAgICAgIC8v5Yik5patIOaYr+WQpuacieWuieijheW+ruS/oVxyXG4gICAgICAgIGlmICghZ2xHYW1lLnBsYXRmb3JtLmlzV3hBcHBJbnN0YWxsZWQoKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd01zZ0JveChcIuaPkOekulwiLCBnbEdhbWUudGlwcy5QT1BVTEFSSVpFLkNBTlRGSU5EV1gpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8vYmFzZTY0IOino+eggSDlm77niYcg6L2s5Li6IOS6jOi/m+WItuWtl+iKguaVsOe7hFxyXG4gICAgZGF0YVVSSXRvQmxvYihiYXNlNjREYXRhKSB7XHJcbiAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XHJcbiAgICAgICAgaWYgKGJhc2U2NERhdGEuc3BsaXQoJywnKVswXS5pbmRleE9mKCdiYXNlNjQnKSA+PSAwKVxyXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gYXRvYihiYXNlNjREYXRhLnNwbGl0KCcsJylbMV0pOy8vYmFzZTY0IOino+eggVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoYmFzZTY0RGF0YS5zcGxpdCgnLCcpWzFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpOy8v5Yib5bu66KeG5Zu+XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaWE7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihcImFjdGl2ZVJlZGNsb3NlXCIsIHRoaXMpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
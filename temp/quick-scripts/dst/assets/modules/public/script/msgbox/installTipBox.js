
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/msgbox/installTipBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd6bcehS3TRNOowZAxzbiXFt', 'installTipBox');
// modules/public/script/msgbox/installTipBox.js

"use strict";

glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.node.zIndex = 1000;
  },
  OnDestroy: function OnDestroy() {},
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.close();
        break;

      case "confirm":
        this.confirm();
        break;

      case "repairgame":
        this.repairgame();
        break;

      case "btn_remind":
        this.btn_remind(node);
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  close: function close() {
    glGame.panel.showFirstEnterPanel();
    this.remove();
  },
  setTips: function setTips(bool) {
    this.node.getChildByName("remind_tip").active = bool;
    this.node.getChildByName("btn_remind").active = bool;

    if (!bool) {
      this.node.getChildByName("confirm").y -= 50;
      this.node.getChildByName("repairgame").y -= 50;
    }
  },
  confirm: function confirm() {
    cc.sys.openURL(glGame.user.get("url").repair);
    console.log("click 马上安装");
    var isShowSetupPanel = glGame.storage.getItem('isShowSetupPanel');
    isShowSetupPanel.isSetup = true;
    glGame.storage.setItem('isShowSetupPanel', isShowSetupPanel);
  },
  repairgame: function repairgame() {
    this.remove();
    glGame.panel.showDialog('提示', '修复将会清除缓存重新下载游戏', function () {
      clearGame();
      console.log("清空游戏缓存");
    }, function () {}, "取消", "确定");
  },
  btn_remind: function btn_remind(node) {
    if (node.children[0].active) {
      node.children[0].active = false;
    } else {
      node.children[0].active = true;
    }

    var isShowSetupPanel = glGame.storage.getItem('isShowSetupPanel');
    isShowSetupPanel.isSetup = !node.children[0].active;
    glGame.storage.setItem('isShowSetupPanel', isShowSetupPanel);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG1zZ2JveFxcaW5zdGFsbFRpcEJveC5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsInpJbmRleCIsIk9uRGVzdHJveSIsIm9uQ2xpY2siLCJuYW1lIiwiY2xvc2UiLCJjb25maXJtIiwicmVwYWlyZ2FtZSIsImJ0bl9yZW1pbmQiLCJjb25zb2xlIiwiZXJyb3IiLCJwYW5lbCIsInNob3dGaXJzdEVudGVyUGFuZWwiLCJyZW1vdmUiLCJzZXRUaXBzIiwiYm9vbCIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwieSIsImNjIiwic3lzIiwib3BlblVSTCIsInVzZXIiLCJnZXQiLCJyZXBhaXIiLCJsb2ciLCJpc1Nob3dTZXR1cFBhbmVsIiwic3RvcmFnZSIsImdldEl0ZW0iLCJpc1NldHVwIiwic2V0SXRlbSIsInNob3dEaWFsb2ciLCJjbGVhckdhbWUiLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFLEVBRFE7QUFHcEJDLEVBQUFBLE1BSG9CLG9CQUdYO0FBQ0wsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0gsR0FMbUI7QUFNcEJDLEVBQUFBLFNBTm9CLHVCQU1SLENBQ1gsQ0FQbUI7QUFTcEJDLEVBQUFBLE9BVG9CLG1CQVNaQyxJQVRZLEVBU05KLElBVE0sRUFTQTtBQUNoQixZQUFRSSxJQUFSO0FBQ0ksV0FBSyxPQUFMO0FBQWMsYUFBS0MsS0FBTDtBQUFjOztBQUM1QixXQUFLLFNBQUw7QUFBZ0IsYUFBS0MsT0FBTDtBQUFnQjs7QUFDaEMsV0FBSyxZQUFMO0FBQW1CLGFBQUtDLFVBQUw7QUFBbUI7O0FBQ3RDLFdBQUssWUFBTDtBQUFtQixhQUFLQyxVQUFMLENBQWdCUixJQUFoQjtBQUF1Qjs7QUFDMUM7QUFBU1MsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsMkJBQWQsRUFBMkNOLElBQTNDO0FBTGI7QUFPSCxHQWpCbUI7QUFtQnBCQyxFQUFBQSxLQW5Cb0IsbUJBbUJaO0FBQ0pWLElBQUFBLE1BQU0sQ0FBQ2dCLEtBQVAsQ0FBYUMsbUJBQWI7QUFDQSxTQUFLQyxNQUFMO0FBQ0gsR0F0Qm1CO0FBdUJwQkMsRUFBQUEsT0F2Qm9CLG1CQXVCWkMsSUF2QlksRUF1Qk47QUFDVixTQUFLZixJQUFMLENBQVVnQixjQUFWLENBQXlCLFlBQXpCLEVBQXVDQyxNQUF2QyxHQUFnREYsSUFBaEQ7QUFDQSxTQUFLZixJQUFMLENBQVVnQixjQUFWLENBQXlCLFlBQXpCLEVBQXVDQyxNQUF2QyxHQUFnREYsSUFBaEQ7O0FBQ0EsUUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDUCxXQUFLZixJQUFMLENBQVVnQixjQUFWLENBQXlCLFNBQXpCLEVBQW9DRSxDQUFwQyxJQUF5QyxFQUF6QztBQUNBLFdBQUtsQixJQUFMLENBQVVnQixjQUFWLENBQXlCLFlBQXpCLEVBQXVDRSxDQUF2QyxJQUE0QyxFQUE1QztBQUNIO0FBQ0osR0E5Qm1CO0FBK0JwQlosRUFBQUEsT0EvQm9CLHFCQStCVjtBQUNOYSxJQUFBQSxFQUFFLENBQUNDLEdBQUgsQ0FBT0MsT0FBUCxDQUFlMUIsTUFBTSxDQUFDMkIsSUFBUCxDQUFZQyxHQUFaLENBQWdCLEtBQWhCLEVBQXVCQyxNQUF0QztBQUNBZixJQUFBQSxPQUFPLENBQUNnQixHQUFSLENBQVksWUFBWjtBQUNBLFFBQUlDLGdCQUFnQixHQUFHL0IsTUFBTSxDQUFDZ0MsT0FBUCxDQUFlQyxPQUFmLENBQXVCLGtCQUF2QixDQUF2QjtBQUNBRixJQUFBQSxnQkFBZ0IsQ0FBQ0csT0FBakIsR0FBMkIsSUFBM0I7QUFDQWxDLElBQUFBLE1BQU0sQ0FBQ2dDLE9BQVAsQ0FBZUcsT0FBZixDQUF1QixrQkFBdkIsRUFBMkNKLGdCQUEzQztBQUNILEdBckNtQjtBQXVDcEJuQixFQUFBQSxVQXZDb0Isd0JBdUNQO0FBQ1QsU0FBS00sTUFBTDtBQUNBbEIsSUFBQUEsTUFBTSxDQUFDZ0IsS0FBUCxDQUFhb0IsVUFBYixDQUF3QixJQUF4QixFQUE4QixnQkFBOUIsRUFBZ0QsWUFBTTtBQUFFQyxNQUFBQSxTQUFTO0FBQUl2QixNQUFBQSxPQUFPLENBQUNnQixHQUFSLENBQVksUUFBWjtBQUF1QixLQUE1RixFQUE4RixZQUFNLENBQUcsQ0FBdkcsRUFBeUcsSUFBekcsRUFBK0csSUFBL0c7QUFDSCxHQTFDbUI7QUE0Q3BCakIsRUFBQUEsVUE1Q29CLHNCQTRDVFIsSUE1Q1MsRUE0Q0g7QUFDYixRQUFJQSxJQUFJLENBQUNpQyxRQUFMLENBQWMsQ0FBZCxFQUFpQmhCLE1BQXJCLEVBQTZCO0FBQ3pCakIsTUFBQUEsSUFBSSxDQUFDaUMsUUFBTCxDQUFjLENBQWQsRUFBaUJoQixNQUFqQixHQUEwQixLQUExQjtBQUNILEtBRkQsTUFFTztBQUNIakIsTUFBQUEsSUFBSSxDQUFDaUMsUUFBTCxDQUFjLENBQWQsRUFBaUJoQixNQUFqQixHQUEwQixJQUExQjtBQUNIOztBQUNELFFBQUlTLGdCQUFnQixHQUFHL0IsTUFBTSxDQUFDZ0MsT0FBUCxDQUFlQyxPQUFmLENBQXVCLGtCQUF2QixDQUF2QjtBQUNBRixJQUFBQSxnQkFBZ0IsQ0FBQ0csT0FBakIsR0FBMkIsQ0FBQzdCLElBQUksQ0FBQ2lDLFFBQUwsQ0FBYyxDQUFkLEVBQWlCaEIsTUFBN0M7QUFDQXRCLElBQUFBLE1BQU0sQ0FBQ2dDLE9BQVAsQ0FBZUcsT0FBZixDQUF1QixrQkFBdkIsRUFBMkNKLGdCQUEzQztBQUNIO0FBckRtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTAwMDtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbG9zZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNvbmZpcm1cIjogdGhpcy5jb25maXJtKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicmVwYWlyZ2FtZVwiOiB0aGlzLnJlcGFpcmdhbWUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcmVtaW5kXCI6IHRoaXMuYnRuX3JlbWluZChub2RlKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dGaXJzdEVudGVyUGFuZWwoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuICAgIHNldFRpcHMoYm9vbCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlbWluZF90aXBcIikuYWN0aXZlID0gYm9vbDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcmVtaW5kXCIpLmFjdGl2ZSA9IGJvb2w7XHJcbiAgICAgICAgaWYgKCFib29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbmZpcm1cIikueSAtPSA1MFxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZXBhaXJnYW1lXCIpLnkgLT0gNTBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29uZmlybSgpIHtcclxuICAgICAgICBjYy5zeXMub3BlblVSTChnbEdhbWUudXNlci5nZXQoXCJ1cmxcIikucmVwYWlyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrIOmprOS4iuWuieijhVwiKVxyXG4gICAgICAgIGxldCBpc1Nob3dTZXR1cFBhbmVsID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbSgnaXNTaG93U2V0dXBQYW5lbCcpO1xyXG4gICAgICAgIGlzU2hvd1NldHVwUGFuZWwuaXNTZXR1cCA9IHRydWU7XHJcbiAgICAgICAgZ2xHYW1lLnN0b3JhZ2Uuc2V0SXRlbSgnaXNTaG93U2V0dXBQYW5lbCcsIGlzU2hvd1NldHVwUGFuZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXBhaXJnYW1lKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coJ+aPkOekuicsICfkv67lpI3lsIbkvJrmuIXpmaTnvJPlrZjph43mlrDkuIvovb3muLjmiI8nLCAoKSA9PiB7IGNsZWFyR2FtZSgpOyBjb25zb2xlLmxvZyhcIua4heepuua4uOaIj+e8k+WtmFwiKSB9LCAoKSA9PiB7IH0sIFwi5Y+W5raIXCIsIFwi56Gu5a6aXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBidG5fcmVtaW5kKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlblswXS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc1Nob3dTZXR1cFBhbmVsID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbSgnaXNTaG93U2V0dXBQYW5lbCcpO1xyXG4gICAgICAgIGlzU2hvd1NldHVwUGFuZWwuaXNTZXR1cCA9ICFub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZTtcclxuICAgICAgICBnbEdhbWUuc3RvcmFnZS5zZXRJdGVtKCdpc1Nob3dTZXR1cFBhbmVsJywgaXNTaG93U2V0dXBQYW5lbCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=
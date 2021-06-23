
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/setting/settingRepair.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47fd97iTYhJGpoVuHgV/vD3', 'settingRepair');
// modules/plaza/script/prefab/setting/settingRepair.js

"use strict";

/**
 * 设置
 */
glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    this.initUI();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_ok":
        this.onOkClick();
        break;

      case "btn_repair":
        this.onRepairClick();
        break;

      case "btn_install":
        this.onInstallClick();
        break;
    }
  },
  initUI: function initUI() {
    if (cc.sys.os === cc.sys.OS_ANDROID) {
      this.node.getChildByName("android").active = true;
    } else if (cc.sys.os === cc.sys.OS_IOS) {
      this.node.getChildByName("ios").active = true;
    }
  },
  onOkClick: function onOkClick() {
    glGame.panel.showDialog('提示', '修复将会清除缓存重新下载游戏', function () {
      clearGame();
      console.log("清空游戏缓存");
    }, function () {}, "取消", "确定");
  },
  onRepairClick: function onRepairClick() {
    glGame.panel.showDialog('提示', '修复将会清除缓存重新下载游戏', function () {
      clearGame();
      console.log("清空游戏缓存");
    }, function () {}, "取消", "确定");
  },
  onInstallClick: function onInstallClick() {
    cc.sys.openURL(glGame.user.get("url").repair);
    var isShowSetupPanel = glGame.storage.getItem('isShowSetupPanel');
    isShowSetupPanel.isSetup = true;
    glGame.storage.setItem('isShowSetupPanel', isShowSetupPanel);
  },
  // 注册界面监听事件
  registerEvent: function registerEvent() {},
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {},
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxzZXR0aW5nXFxzZXR0aW5nUmVwYWlyLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJpbml0VUkiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJvbk9rQ2xpY2siLCJvblJlcGFpckNsaWNrIiwib25JbnN0YWxsQ2xpY2siLCJjYyIsInN5cyIsIm9zIiwiT1NfQU5EUk9JRCIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwiT1NfSU9TIiwicGFuZWwiLCJzaG93RGlhbG9nIiwiY2xlYXJHYW1lIiwiY29uc29sZSIsImxvZyIsIm9wZW5VUkwiLCJ1c2VyIiwiZ2V0IiwicmVwYWlyIiwiaXNTaG93U2V0dXBQYW5lbCIsInN0b3JhZ2UiLCJnZXRJdGVtIiwiaXNTZXR1cCIsInNldEl0ZW0iLCJyZWdpc3RlckV2ZW50IiwidW5SZWdpc3RlckV2ZW50IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFJQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFLEVBRFE7QUFLcEJDLEVBQUFBLE1BTG9CLG9CQUtYO0FBQ0wsU0FBS0MsTUFBTDtBQUNILEdBUG1CO0FBU3BCQyxFQUFBQSxPQVRvQixtQkFTWkMsSUFUWSxFQVNOQyxJQVRNLEVBU0E7QUFDaEIsWUFBUUQsSUFBUjtBQUNJLFdBQUssUUFBTDtBQUNJLGFBQUtFLFNBQUw7QUFDQTs7QUFDSixXQUFLLFlBQUw7QUFDSSxhQUFLQyxhQUFMO0FBQ0E7O0FBQ0osV0FBSyxhQUFMO0FBQ0ksYUFBS0MsY0FBTDtBQUNBO0FBVFI7QUFXSCxHQXJCbUI7QUF1QnBCTixFQUFBQSxNQXZCb0Isb0JBdUJYO0FBQ0wsUUFBSU8sRUFBRSxDQUFDQyxHQUFILENBQU9DLEVBQVAsS0FBY0YsRUFBRSxDQUFDQyxHQUFILENBQU9FLFVBQXpCLEVBQXFDO0FBQ2pDLFdBQUtQLElBQUwsQ0FBVVEsY0FBVixDQUF5QixTQUF6QixFQUFvQ0MsTUFBcEMsR0FBNkMsSUFBN0M7QUFDSCxLQUZELE1BRU8sSUFBSUwsRUFBRSxDQUFDQyxHQUFILENBQU9DLEVBQVAsS0FBY0YsRUFBRSxDQUFDQyxHQUFILENBQU9LLE1BQXpCLEVBQWlDO0FBQ3BDLFdBQUtWLElBQUwsQ0FBVVEsY0FBVixDQUF5QixLQUF6QixFQUFnQ0MsTUFBaEMsR0FBeUMsSUFBekM7QUFDSDtBQUNKLEdBN0JtQjtBQStCcEJSLEVBQUFBLFNBL0JvQix1QkErQlI7QUFDUlQsSUFBQUEsTUFBTSxDQUFDbUIsS0FBUCxDQUFhQyxVQUFiLENBQXdCLElBQXhCLEVBQThCLGdCQUE5QixFQUFnRCxZQUFNO0FBQUVDLE1BQUFBLFNBQVM7QUFBSUMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWjtBQUF1QixLQUE1RixFQUE4RixZQUFNLENBQUcsQ0FBdkcsRUFBeUcsSUFBekcsRUFBK0csSUFBL0c7QUFDSCxHQWpDbUI7QUFtQ3BCYixFQUFBQSxhQW5Db0IsMkJBbUNKO0FBQ1pWLElBQUFBLE1BQU0sQ0FBQ21CLEtBQVAsQ0FBYUMsVUFBYixDQUF3QixJQUF4QixFQUE4QixnQkFBOUIsRUFBZ0QsWUFBTTtBQUFFQyxNQUFBQSxTQUFTO0FBQUlDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVo7QUFBdUIsS0FBNUYsRUFBOEYsWUFBTSxDQUFHLENBQXZHLEVBQXlHLElBQXpHLEVBQStHLElBQS9HO0FBQ0gsR0FyQ21CO0FBdUNwQlosRUFBQUEsY0F2Q29CLDRCQXVDSDtBQUNiQyxJQUFBQSxFQUFFLENBQUNDLEdBQUgsQ0FBT1csT0FBUCxDQUFleEIsTUFBTSxDQUFDeUIsSUFBUCxDQUFZQyxHQUFaLENBQWdCLEtBQWhCLEVBQXVCQyxNQUF0QztBQUNBLFFBQUlDLGdCQUFnQixHQUFHNUIsTUFBTSxDQUFDNkIsT0FBUCxDQUFlQyxPQUFmLENBQXVCLGtCQUF2QixDQUF2QjtBQUNBRixJQUFBQSxnQkFBZ0IsQ0FBQ0csT0FBakIsR0FBMkIsSUFBM0I7QUFDQS9CLElBQUFBLE1BQU0sQ0FBQzZCLE9BQVAsQ0FBZUcsT0FBZixDQUF1QixrQkFBdkIsRUFBMkNKLGdCQUEzQztBQUNILEdBNUNtQjtBQThDcEI7QUFDQUssRUFBQUEsYUEvQ29CLDJCQStDSixDQUVmLENBakRtQjtBQW1EcEI7QUFDQUMsRUFBQUEsZUFwRG9CLDZCQW9ERixDQUVqQixDQXREbUI7QUF3RHBCQyxFQUFBQSxTQXhEb0IsdUJBd0RSO0FBQ1IsU0FBS0QsZUFBTDtBQUNIO0FBMURtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOiuvue9rlxyXG4gKi9cclxuXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fb2tcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMub25Pa0NsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9yZXBhaXJcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMub25SZXBhaXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5faW5zdGFsbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkluc3RhbGxDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYW5kcm9pZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImlvc1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Pa0NsaWNrKCkge1xyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKCfmj5DnpLonLCAn5L+u5aSN5bCG5Lya5riF6Zmk57yT5a2Y6YeN5paw5LiL6L295ri45oiPJywgKCkgPT4geyBjbGVhckdhbWUoKTsgY29uc29sZS5sb2coXCLmuIXnqbrmuLjmiI/nvJPlrZhcIikgfSwgKCkgPT4geyB9LCBcIuWPlua2iFwiLCBcIuehruWumlwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25SZXBhaXJDbGljaygpIHtcclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZygn5o+Q56S6JywgJ+S/ruWkjeWwhuS8mua4hemZpOe8k+WtmOmHjeaWsOS4i+i9vea4uOaIjycsICgpID0+IHsgY2xlYXJHYW1lKCk7IGNvbnNvbGUubG9nKFwi5riF56m65ri45oiP57yT5a2YXCIpIH0sICgpID0+IHsgfSwgXCLlj5bmtohcIiwgXCLnoa7lrppcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uSW5zdGFsbENsaWNrKCkge1xyXG4gICAgICAgIGNjLnN5cy5vcGVuVVJMKGdsR2FtZS51c2VyLmdldChcInVybFwiKS5yZXBhaXIpO1xyXG4gICAgICAgIGxldCBpc1Nob3dTZXR1cFBhbmVsID0gZ2xHYW1lLnN0b3JhZ2UuZ2V0SXRlbSgnaXNTaG93U2V0dXBQYW5lbCcpO1xyXG4gICAgICAgIGlzU2hvd1NldHVwUGFuZWwuaXNTZXR1cCA9IHRydWU7XHJcbiAgICAgICAgZ2xHYW1lLnN0b3JhZ2Uuc2V0SXRlbSgnaXNTaG93U2V0dXBQYW5lbCcsIGlzU2hvd1NldHVwUGFuZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDms6jlhoznlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOmUgOavgeeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgdW5SZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
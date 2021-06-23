
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/smallComp/urgentnotice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92db5EpweRL3rWECEeL7aWh', 'urgentnotice');
// modules/plaza/script/prefab/smallComp/urgentnotice.js

"use strict";

glGame.baseclass.extend({
  properties: {
    urgentnotice: cc.Node,
    content: cc.Label,
    tip_ctr: cc.Toggle,
    close_node: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // this.reqEmergentNotice();
    this.initEmergent();
    glGame.emitter.on("newrotice", this.newrotice, this);
  },
  onClick: function onClick(name, node) {
    console.log("这是当前按键的按钮名字", name);

    switch (name) {
      case "Background":
        // this.reqIgnoreEmergentNotice();
        break;

      case "close":
        if (this.tip_ctr.isChecked) {
          this.reqIgnoreEmergentNotice();
        }

        glGame.panel.showFirstEnterPanel();
        glGame.isfirstEnterPlaza = false;
        this.urgentnotice.active = false;
        break;

      case "Tip_ctr":
        this.tip_ctr.node.getChildByName("Background").active = !this.tip_ctr.isChecked;
        break;
    }
  },
  newrotice: function newrotice() {
    this.reqEmergentNotice();
  },
  initEmergent: function initEmergent() {
    if (glGame.user.get('emergentNotice')) {
      if (glGame.user.get('emergentNotice').content) {
        this.urgentnotice.active = true;
        this.content.string = "".concat(glGame.user.get('emergentNotice').content);
      } else {
        this.urgentnotice.active = false;
        glGame.panel.showFirstEnterPanel();
        glGame.isfirstEnterPlaza = false;
      }
    }
  },
  //紧急公告请求
  reqEmergentNotice: function reqEmergentNotice() {
    var _this = this;

    glGame.gameNet.send_msg("http.reqEmergentNotice", {}, function (route, msg) {
      console.log("这是当前紧急公告的消息", msg);

      if (msg.result.content) {
        _this.urgentnotice.active = true;
        _this.content.string = "".concat(msg.result.content);
      } else {
        _this.urgentnotice.active = false;
        glGame.panel.showFirstEnterPanel();
        glGame.isfirstEnterPlaza = false;
      }
    });
  },
  setTipCtr: function setTipCtr(bol) {
    this.tip_ctr.node.active = bol;
  },
  setClose: function setClose(bol) {
    this.close_node.active = bol;
  },
  //不显示紧急公告
  reqIgnoreEmergentNotice: function reqIgnoreEmergentNotice() {
    glGame.gameNet.send_msg("http.reqIgnoreEmergentNotice", {}, function (route, msg) {
      console.log("不再显示紧急公告请求成功");
    });
  },
  OnDestroy: function OnDestroy() {
    glGame.emitter.off("newrotice", this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxzbWFsbENvbXBcXHVyZ2VudG5vdGljZS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwidXJnZW50bm90aWNlIiwiY2MiLCJOb2RlIiwiY29udGVudCIsIkxhYmVsIiwidGlwX2N0ciIsIlRvZ2dsZSIsImNsb3NlX25vZGUiLCJvbkxvYWQiLCJpbml0RW1lcmdlbnQiLCJlbWl0dGVyIiwib24iLCJuZXdyb3RpY2UiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJjb25zb2xlIiwibG9nIiwiaXNDaGVja2VkIiwicmVxSWdub3JlRW1lcmdlbnROb3RpY2UiLCJwYW5lbCIsInNob3dGaXJzdEVudGVyUGFuZWwiLCJpc2ZpcnN0RW50ZXJQbGF6YSIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwicmVxRW1lcmdlbnROb3RpY2UiLCJ1c2VyIiwiZ2V0Iiwic3RyaW5nIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwicm91dGUiLCJtc2ciLCJyZXN1bHQiLCJzZXRUaXBDdHIiLCJib2wiLCJzZXRDbG9zZSIsIk9uRGVzdHJveSIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFlBQVksRUFBRUMsRUFBRSxDQUFDQyxJQURUO0FBRVJDLElBQUFBLE9BQU8sRUFBRUYsRUFBRSxDQUFDRyxLQUZKO0FBR1JDLElBQUFBLE9BQU8sRUFBRUosRUFBRSxDQUFDSyxNQUhKO0FBSVJDLElBQUFBLFVBQVUsRUFBRU4sRUFBRSxDQUFDQztBQUpQLEdBRlE7QUFTcEI7QUFFQU0sRUFBQUEsTUFYb0Isb0JBV1g7QUFDTDtBQUNBLFNBQUtDLFlBQUw7QUFDQWIsSUFBQUEsTUFBTSxDQUFDYyxPQUFQLENBQWVD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LE1BQWhCLEdBQXlCWSxHQUF6QjtBQUNILEdBeEVtQjtBQTBFcEI7QUFDQWhCLEVBQUFBLHVCQTNFb0IscUNBMkVNO0FBQ3RCdkIsSUFBQUEsTUFBTSxDQUFDaUMsT0FBUCxDQUFlQyxRQUFmLENBQXdCLDhCQUF4QixFQUF3RCxFQUF4RCxFQUE0RCxVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDeEVoQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0gsS0FGRDtBQUdILEdBL0VtQjtBQWdGcEJvQixFQUFBQSxTQWhGb0IsdUJBZ0ZSO0FBQ1J6QyxJQUFBQSxNQUFNLENBQUNjLE9BQVAsQ0FBZTRCLEdBQWYsQ0FBbUIsV0FBbkIsRUFBZ0MsSUFBaEM7QUFDSDtBQWxGbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdXJnZW50bm90aWNlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNvbnRlbnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIHRpcF9jdHI6IGNjLlRvZ2dsZSxcclxuICAgICAgICBjbG9zZV9ub2RlOiBjYy5Ob2RlXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyB0aGlzLnJlcUVtZXJnZW50Tm90aWNlKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RW1lcmdlbnQoKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcIm5ld3JvdGljZVwiLCB0aGlzLm5ld3JvdGljZSwgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3mjInplK7nmoTmjInpkq7lkI3lrZdcIiwgbmFtZSlcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkJhY2tncm91bmRcIjpcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVxSWdub3JlRW1lcmdlbnROb3RpY2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpcF9jdHIuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXFJZ25vcmVFbWVyZ2VudE5vdGljZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93Rmlyc3RFbnRlclBhbmVsKCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuaXNmaXJzdEVudGVyUGxhemEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXJnZW50bm90aWNlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUaXBfY3RyXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcF9jdHIubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuYWN0aXZlID0gIXRoaXMudGlwX2N0ci5pc0NoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbmV3cm90aWNlKCkge1xyXG4gICAgICAgIHRoaXMucmVxRW1lcmdlbnROb3RpY2UoKTtcclxuICAgIH0sXHJcbiAgICBpbml0RW1lcmdlbnQoKSB7XHJcbiAgICAgICAgaWYgKGdsR2FtZS51c2VyLmdldCgnZW1lcmdlbnROb3RpY2UnKSkge1xyXG4gICAgICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuZ2V0KCdlbWVyZ2VudE5vdGljZScpLmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXJnZW50bm90aWNlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3RyaW5nID0gYCR7Z2xHYW1lLnVzZXIuZ2V0KCdlbWVyZ2VudE5vdGljZScpLmNvbnRlbnR9YFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cmdlbnRub3RpY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0ZpcnN0RW50ZXJQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLmlzZmlyc3RFbnRlclBsYXphID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ntKfmgKXlhazlkYror7fmsYJcclxuICAgIHJlcUVtZXJnZW50Tm90aWNlKCkge1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFFbWVyZ2VudE5vdGljZVwiLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3ntKfmgKXlhazlkYrnmoTmtojmga9cIiwgbXNnKVxyXG4gICAgICAgICAgICBpZiAobXNnLnJlc3VsdC5jb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVyZ2VudG5vdGljZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0cmluZyA9IGAke21zZy5yZXN1bHQuY29udGVudH1gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVyZ2VudG5vdGljZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93Rmlyc3RFbnRlclBhbmVsKCk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuaXNmaXJzdEVudGVyUGxhemEgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRpcEN0cihib2wpIHtcclxuICAgICAgICB0aGlzLnRpcF9jdHIubm9kZS5hY3RpdmUgPSBib2w7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldENsb3NlKGJvbCl7XHJcbiAgICAgICAgdGhpcy5jbG9zZV9ub2RlLmFjdGl2ZSA9IGJvbDtcclxuICAgIH0sXHJcblxyXG4gICAgLy/kuI3mmL7npLrntKfmgKXlhazlkYpcclxuICAgIHJlcUlnbm9yZUVtZXJnZW50Tm90aWNlKCkge1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5yZXFJZ25vcmVFbWVyZ2VudE5vdGljZVwiLCB7fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuI3lho3mmL7npLrntKfmgKXlhazlkYror7fmsYLmiJDlip9cIilcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJuZXdyb3RpY2VcIiwgdGhpcyk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=
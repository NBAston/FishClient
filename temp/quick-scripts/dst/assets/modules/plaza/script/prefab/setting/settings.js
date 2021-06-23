
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/setting/settings.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60173DWEhlPJJbKT6VRuVAQ', 'settings');
// modules/plaza/script/prefab/setting/settings.js

"use strict";

/**
 * 设置
 */
glGame.baseclass.extend({
  properties: {
    mainPanel: cc.Node,
    toggleRepair: cc.Node,
    toggleModify: cc.Node
  },
  onLoad: function onLoad() {
    this.registerEvent();

    if (!cc.sys.isNative) {
      this.toggleRepair.active = false;
    }

    if (glGame.user.isTourist()) {
      this.toggleModify.active = false;
    }

    if (cc.sys.isNative) {
      var frame = this.node.getChildByName("bg");
      frame.getChildByName("version").getComponent(cc.Label).string = "\u5F53\u524D\u7248\u672C: ".concat(glGame.version);
    }

    this.showPanel("volume");
    glGame.panel.showEffectPariticle(this.node);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "volume":
      case "sound":
      case "repair":
      case "about":
      case "modifypsd":
        this.showPanel(name);
        break;

      case "head":
        this.changeHead_cb();
        break;

      case 'btn_grzl':
        this.userEdit_cb();
        break;

      case 'btn_phoneEdit':
        this.phoneEdit_cb();
        break;

      case 'btn_nicknameEdit':
        this.nicknameEdit_cb();
        break;

      case "close":
        this.remove();
        break;
    }
  },
  //显示某个界面。按名字来显示
  showPanel: function showPanel(panelName) {
    var _this = this;

    this.hideAllPanel();
    var panellist = {};
    panellist["volume"] = "settingVolume";
    panellist["sound"] = "settingSelectMusic";
    panellist["repair"] = "settingRepair";
    panellist["about"] = "settingAbout";
    panellist["modifypsd"] = "settingModifypsd";

    for (var name in panellist) {
      var index = 0;
      if (panelName == name) index = 1;
    }

    if (this.mainPanel.getChildByName(panellist[panelName])) {
      this.mainPanel.getChildByName(panellist[panelName]).active = true;
      return;
    }

    glGame.panel.getPanelByName(panellist[panelName]).then(function (panelData) {
      panelData.setPosition(cc.v2(0, 0));
      panelData.parent = _this.mainPanel;
    });
  },
  //隐藏所有界面
  hideAllPanel: function hideAllPanel() {
    if (!this.mainPanel.childrenCount) return;

    for (var i = 0; i < this.mainPanel.childrenCount; i++) {
      this.mainPanel.children[i].active = false;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxzZXR0aW5nXFxzZXR0aW5ncy5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwibWFpblBhbmVsIiwiY2MiLCJOb2RlIiwidG9nZ2xlUmVwYWlyIiwidG9nZ2xlTW9kaWZ5Iiwib25Mb2FkIiwicmVnaXN0ZXJFdmVudCIsInN5cyIsImlzTmF0aXZlIiwiYWN0aXZlIiwidXNlciIsImlzVG91cmlzdCIsImZyYW1lIiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJ2ZXJzaW9uIiwic2hvd1BhbmVsIiwicGFuZWwiLCJzaG93RWZmZWN0UGFyaXRpY2xlIiwib25DbGljayIsIm5hbWUiLCJjaGFuZ2VIZWFkX2NiIiwidXNlckVkaXRfY2IiLCJwaG9uZUVkaXRfY2IiLCJuaWNrbmFtZUVkaXRfY2IiLCJyZW1vdmUiLCJwYW5lbE5hbWUiLCJoaWRlQWxsUGFuZWwiLCJwYW5lbGxpc3QiLCJpbmRleCIsImdldFBhbmVsQnlOYW1lIiwidGhlbiIsInBhbmVsRGF0YSIsInNldFBvc2l0aW9uIiwidjIiLCJwYXJlbnQiLCJjaGlsZHJlbkNvdW50IiwiaSIsImNoaWxkcmVuIiwidW5SZWdpc3RlckV2ZW50IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFJQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUMsRUFBRSxDQUFDQyxJQUROO0FBRVJDLElBQUFBLFlBQVksRUFBRUYsRUFBRSxDQUFDQyxJQUZUO0FBR1JFLElBQUFBLFlBQVksRUFBRUgsRUFBRSxDQUFDQztBQUhULEdBRFE7QUFPcEJHLEVBQUFBLE1BUG9CLG9CQU9YO0FBQ0wsU0FBS0Ms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Q0E4QixFQUFBQSxZQXpFb0IsMEJBeUVMO0FBQ1gsUUFBSSxDQUFDLEtBQUs5QixTQUFMLENBQWV1QyxhQUFwQixFQUFtQzs7QUFDbkMsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt4QyxTQUFMLENBQWV1QyxhQUFuQyxFQUFrREMsQ0FBQyxFQUFuRCxFQUF1RDtBQUNuRCxXQUFLeEMsU0FBTCxDQUFleUMsUUFBZixDQUF3QkQsQ0FBeEIsRUFBMkIvQixNQUEzQixHQUFvQyxLQUFwQztBQUNIO0FBQ0osR0E5RW1CO0FBZ0ZwQjtBQUNBSCxFQUFBQSxhQWpGb0IsMkJBaUZKLENBRWYsQ0FuRm1CO0FBcUZwQjtBQUNBb0MsRUFBQUEsZUF0Rm9CLDZCQXNGRixDQUVqQixDQXhGbUI7QUEwRnBCQyxFQUFBQSxTQTFGb0IsdUJBMEZSO0FBQ1IsU0FBS0QsZUFBTDtBQUNIO0FBNUZtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOiuvue9rlxyXG4gKi9cclxuXHJcbmdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtYWluUGFuZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgdG9nZ2xlUmVwYWlyOiBjYy5Ob2RlLFxyXG4gICAgICAgIHRvZ2dsZU1vZGlmeTogY2MuTm9kZSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIGlmKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVSZXBhaXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVNb2RpZnkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIik7XHJcbiAgICAgICAgICAgIGZyYW1lLmdldENoaWxkQnlOYW1lKFwidmVyc2lvblwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDlvZPliY3niYjmnKw6ICR7Z2xHYW1lLnZlcnNpb259YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1BhbmVsKFwidm9sdW1lXCIpO1xyXG5cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdFBhcml0aWNsZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInZvbHVtZVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic291bmRcIjpcclxuICAgICAgICAgICAgY2FzZSBcInJlcGFpclwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiYWJvdXRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIm1vZGlmeXBzZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFuZWwobmFtZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZFwiOiB0aGlzLmNoYW5nZUhlYWRfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9ncnpsJzogdGhpcy51c2VyRWRpdF9jYigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYnRuX3Bob25lRWRpdCc6IHRoaXMucGhvbmVFZGl0X2NiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdidG5fbmlja25hbWVFZGl0JzogdGhpcy5uaWNrbmFtZUVkaXRfY2IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+aYvuekuuafkOS4queVjOmdouOAguaMieWQjeWtl+adpeaYvuekulxyXG4gICAgc2hvd1BhbmVsKHBhbmVsTmFtZSkge1xyXG4gICAgICAgIHRoaXMuaGlkZUFsbFBhbmVsKCk7XHJcbiAgICAgICAgbGV0IHBhbmVsbGlzdCA9IHt9O1xyXG4gICAgICAgIHBhbmVsbGlzdFtcInZvbHVtZVwiXSA9IFwic2V0dGluZ1ZvbHVtZVwiO1xyXG4gICAgICAgIHBhbmVsbGlzdFtcInNvdW5kXCJdID0gXCJzZXR0aW5nU2VsZWN0TXVzaWNcIjtcclxuICAgICAgICBwYW5lbGxpc3RbXCJyZXBhaXJcIl0gPSBcInNldHRpbmdSZXBhaXJcIjtcclxuICAgICAgICBwYW5lbGxpc3RbXCJhYm91dFwiXSA9IFwic2V0dGluZ0Fib3V0XCI7XHJcbiAgICAgICAgcGFuZWxsaXN0W1wibW9kaWZ5cHNkXCJdID0gXCJzZXR0aW5nTW9kaWZ5cHNkXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBwYW5lbGxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgaWYgKHBhbmVsTmFtZSA9PSBuYW1lKSBpbmRleCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tYWluUGFuZWwuZ2V0Q2hpbGRCeU5hbWUocGFuZWxsaXN0W3BhbmVsTmFtZV0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblBhbmVsLmdldENoaWxkQnlOYW1lKHBhbmVsbGlzdFtwYW5lbE5hbWVdKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbEdhbWUucGFuZWwuZ2V0UGFuZWxCeU5hbWUocGFuZWxsaXN0W3BhbmVsTmFtZV0pLnRoZW4ocGFuZWxEYXRhID0+IHtcclxuICAgICAgICAgICAgcGFuZWxEYXRhLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcclxuICAgICAgICAgICAgcGFuZWxEYXRhLnBhcmVudCA9IHRoaXMubWFpblBhbmVsO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+makOiXj+aJgOacieeVjOmdolxyXG4gICAgaGlkZUFsbFBhbmVsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5tYWluUGFuZWwuY2hpbGRyZW5Db3VudCkgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYWluUGFuZWwuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblBhbmVsLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5rOo5YaM55WM6Z2i55uR5ZCs5LqL5Lu2XHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDplIDmr4HnlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
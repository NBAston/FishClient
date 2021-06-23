
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/popularize/scalecommission.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '46bc2EXSHFHp6ovDq96wS0o', 'scalecommission');
// modules/plaza/script/prefab/popularize/scalecommission.js

"use strict";

glGame.baseclass.extend({
  properties: {
    achievementStr: cc.Label,
    nextStr: cc.Label,
    rebaterate: cc.Node,
    rebate_item: cc.Node
  },
  onLoad: function onLoad() {
    this.ruleDetaildata = null;
    this.index = 0;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;
    }
  },
  initUI: function initUI(data, achievement) {
    this.ruleDetaildata = data;
    this.achievementStr.string = this.getFloat(achievement);
    var count = this.ruleDetaildata.length;

    if (achievement >= this.ruleDetaildata[count - 1].exp) {
      this.nextStr.string = 0;
      this.index = count - 1;
    } else {
      for (var i = 0; i < count; i++) {
        if (this.ruleDetaildata[i].exp > achievement) {
          this.nextStr.string = this.getFloat(this.ruleDetaildata[i].exp - achievement);
          this.index = i - 1;
          break;
        }
      }
    }

    for (var _i = 0; _i < this.ruleDetaildata.length; _i++) {
      var rebateItem = cc.instantiate(this.rebate_item);
      rebateItem.parent = this.rebaterate;
      rebateItem.active = false;
      rebateItem.getChildByName("bg").active = _i % 2 == 1;

      if (this.index == _i) {
        rebateItem.getChildByName("bg").active = false;
        rebateItem.getChildByName("img_picxz").active = true;
      }

      rebateItem.getChildByName("level").getComponent(cc.Label).string = this.ruleDetaildata[_i].level;
      var strText = "";

      if (this.ruleDetaildata[_i + 1]) {
        strText = "<color=#f4c404>".concat(this.getExpNumber(this.ruleDetaildata[_i].exp), "</color>").concat(this.getExpText(this.ruleDetaildata[_i].exp), " - <color=#f4c404>").concat(this.getExpNumber(this.ruleDetaildata[_i + 1].exp), "</color>").concat(this.getExpText(this.ruleDetaildata[_i + 1].exp));
      } else {
        strText = "<color=#f4c404>".concat(this.getExpNumber(this.ruleDetaildata[_i].exp), "</color>").concat(this.getExpText(this.ruleDetaildata[_i].exp), "\u4EE5\u4E0A");
      }

      rebateItem.getChildByName("money").getComponent(cc.RichText).string = strText;
      rebateItem.getChildByName("rete").getComponent(cc.RichText).string = "\u6BCF\u4E07\u8FD4\u4F63<color=#f4c404>".concat(this.getFloat(this.ruleDetaildata[_i].reward), "</color>\u5143");
    }

    glGame.panel.showEffectNode(this, this.rebaterate, 0.02, true);
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  getExpNumber: function getExpNumber(num) {
    return num >= 1000000 ? "".concat(Number(num).div(1000000)) : "".concat(Number(num).div(100));
  },
  getExpText: function getExpText(num) {
    return num >= 1000000 ? "\u4E07" : "";
  },
  OnDestroy: function OnDestroy() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxwb3B1bGFyaXplXFxzY2FsZWNvbW1pc3Npb24uanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsImFjaGlldmVtZW50U3RyIiwiY2MiLCJMYWJlbCIsIm5leHRTdHIiLCJyZWJhdGVyYXRlIiwiTm9kZSIsInJlYmF0ZV9pdGVtIiwib25Mb2FkIiwicnVsZURldGFpbGRhdGEiLCJpbmRleCIsIm9uQ2xpY2siLCJuYW1lIiwibm9kZSIsInJlbW92ZSIsImluaXRVSSIsImRhdGEiLCJhY2hpZXZlbWVudCIsInN0cmluZyIsImdldEZsb2F0IiwiY291bnQiLCJsZW5ndGgiLCJleHAiLCJpIiwicmViYXRlSXRlbSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiYWN0aXZlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJsZXZlbCIsInN0clRleHQiLCJnZXRFeHBOdW1iZXIiLCJnZXRFeHBUZXh0IiwiUmljaFRleHQiLCJyZXdhcmQiLCJwYW5lbCIsInNob3dFZmZlY3ROb2RlIiwidmFsdWUiLCJOdW1iZXIiLCJkaXYiLCJ0b1N0cmluZyIsIm51bSIsIk9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGNBQWMsRUFBRUMsRUFBRSxDQUFDQyxLQURYO0FBRVJDLElBQUFBLE9BQU8sRUFBRUYsRUFBRSxDQUFDQyxLQUZKO0FBR1JFLElBQUFBLFVBQVUsRUFBRUgsRUFBRSxDQUFDSSxJQUhQO0FBSVJDLElBQUFBLFdBQVcsRUFBRUwsRUFBRSxDQUFDSTtBQUpSLEdBRFE7QUFPcEJFLEVBQUFBLE1BUG9CLG9CQU9YO0FBQ0wsU0FBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNB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RyxHQUFELENBQU4sQ0FBWUYsR0FBWixDQUFnQixHQUFoQixDQUFwRCxDQUFQO0FBQ0gsR0E3RG1CO0FBOERwQlAsRUFBQUEsVUE5RG9CLHNCQThEVFMsR0E5RFMsRUE4REo7QUFDWixXQUFPQSxHQUFHLElBQUksT0FBUCxnQkFBUDtBQUNILEdBaEVtQjtBQWlFcEJDLEVBQUFBLFNBakVvQix1QkFpRVIsQ0FFWDtBQW5FbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBhY2hpZXZlbWVudFN0cjogY2MuTGFiZWwsXHJcbiAgICAgICAgbmV4dFN0cjogY2MuTGFiZWwsXHJcbiAgICAgICAgcmViYXRlcmF0ZTogY2MuTm9kZSxcclxuICAgICAgICByZWJhdGVfaXRlbTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlRGV0YWlsZGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICB9LFxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2xvc2VcIjogdGhpcy5yZW1vdmUoKTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluaXRVSShkYXRhLCBhY2hpZXZlbWVudCkge1xyXG4gICAgICAgIHRoaXMucnVsZURldGFpbGRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuYWNoaWV2ZW1lbnRTdHIuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChhY2hpZXZlbWVudCk7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5ydWxlRGV0YWlsZGF0YS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChhY2hpZXZlbWVudCA+PSB0aGlzLnJ1bGVEZXRhaWxkYXRhW2NvdW50IC0gMV0uZXhwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFN0ci5zdHJpbmcgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gY291bnQgLSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bGVEZXRhaWxkYXRhW2ldLmV4cCA+IGFjaGlldmVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0U3RyLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy5ydWxlRGV0YWlsZGF0YVtpXS5leHAgLSBhY2hpZXZlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGkgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJ1bGVEZXRhaWxkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByZWJhdGVJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5yZWJhdGVfaXRlbSk7XHJcbiAgICAgICAgICAgIHJlYmF0ZUl0ZW0ucGFyZW50ID0gdGhpcy5yZWJhdGVyYXRlO1xyXG4gICAgICAgICAgICByZWJhdGVJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZWJhdGVJdGVtLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gaSAlIDIgPT0gMTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgcmViYXRlSXRlbS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmViYXRlSXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ19waWN4elwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlYmF0ZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucnVsZURldGFpbGRhdGFbaV0ubGV2ZWw7XHJcbiAgICAgICAgICAgIGxldCBzdHJUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMucnVsZURldGFpbGRhdGFbaSArIDFdKSB7XHJcbiAgICAgICAgICAgICAgICBzdHJUZXh0ID0gYDxjb2xvcj0jZjRjNDA0PiR7dGhpcy5nZXRFeHBOdW1iZXIodGhpcy5ydWxlRGV0YWlsZGF0YVtpXS5leHApfTwvY29sb3I+JHt0aGlzLmdldEV4cFRleHQodGhpcy5ydWxlRGV0YWlsZGF0YVtpXS5leHApfSAtIDxjb2xvcj0jZjRjNDA0PiR7dGhpcy5nZXRFeHBOdW1iZXIodGhpcy5ydWxlRGV0YWlsZGF0YVtpICsgMV0uZXhwKX08L2NvbG9yPiR7dGhpcy5nZXRFeHBUZXh0KHRoaXMucnVsZURldGFpbGRhdGFbaSArIDFdLmV4cCl9YDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0clRleHQgPSBgPGNvbG9yPSNmNGM0MDQ+JHt0aGlzLmdldEV4cE51bWJlcih0aGlzLnJ1bGVEZXRhaWxkYXRhW2ldLmV4cCl9PC9jb2xvcj4ke3RoaXMuZ2V0RXhwVGV4dCh0aGlzLnJ1bGVEZXRhaWxkYXRhW2ldLmV4cCl95Lul5LiKYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlYmF0ZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJtb25leVwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IHN0clRleHQ7XHJcbiAgICAgICAgICAgIHJlYmF0ZUl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJyZXRlXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYOavj+S4h+i/lOS9ozxjb2xvcj0jZjRjNDA0PiR7dGhpcy5nZXRGbG9hdCh0aGlzLnJ1bGVEZXRhaWxkYXRhW2ldLnJld2FyZCl9PC9jb2xvcj7lhYNgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcyx0aGlzLnJlYmF0ZXJhdGUsMC4wMix0cnVlKTtcclxuICAgIH0sXHJcbiAgICBnZXRGbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKS5kaXYoMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgICBnZXRFeHBOdW1iZXIobnVtKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bSA+PSAxMDAwMDAwID8gYCR7TnVtYmVyKG51bSkuZGl2KDEwMDAwMDApfWAgOiBgJHtOdW1iZXIobnVtKS5kaXYoMTAwKX1gO1xyXG4gICAgfSxcclxuICAgIGdldEV4cFRleHQobnVtKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bSA+PSAxMDAwMDAwID8gYOS4h2AgOiBgYDtcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcblxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
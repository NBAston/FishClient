
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/withdrawal/exchangerecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3f3bpqUsZOp6lEeeGwOK0Q', 'exchangerecord');
// modules/plaza/script/prefab/withdrawal/exchangerecord.js

"use strict";

glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    exchangeitem: cc.Node,
    curPage: cc.Label,
    totalPage: cc.Label
  },
  onLoad: function onLoad() {
    this.resetData();
    this.page = 1;
    this.record = {};
    this.reqWithdrawLog();
  },
  resetData: function resetData() {
    this.exchangeState = ["处理中", "成功", "退回", "失败"];
    this.exchangeColor = [cc.color(102, 144, 204), cc.color(0, 255, 24), cc.color(244, 20, 36), cc.color(244, 20, 36)];
  },
  reqWithdrawLog: function reqWithdrawLog() {
    var _this = this;

    if (this.record[this.page]) {
      this.curPage.string = this.page;
      this.updateItem(this.record[this.page]);
      return;
    }

    glGame.gameNet.send_msg("http.reqWithdrawLog", {
      type: 0,
      page: this.page,
      pageSize: 7
    }, function (route, data) {
      _this.totalPage.string = data.result.pageTotal;
      _this.curPage.string = _this.page;
      _this.record[_this.page] = data;

      _this.updateItem(data);
    });
  },
  //浮点型运算取俩位
  getFloat: function getFloat(value) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else {
      return (Math.floor(value * 100) / 100).toFixed(num).toString();
    }
  },
  updateItem: function updateItem(msg) {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    var exchangeInfo = msg.result.data;
    var count = exchangeInfo.length;
    this.node.getChildByName("img_wujilu").active = count == 0;
    this.node.getChildByName("pageLayout").active = count > 0;
    this.node.getChildByName("btn_upPage").active = count > 0;
    this.node.getChildByName("btn_downPage").active = count > 0;
    this.node.getChildByName("panel").getChildByName("tip").active = count > 0;

    for (var i = 0; i < count; i++) {
      var info = exchangeInfo[i];
      var panel = cc.instantiate(this.exchangeitem);
      panel.parent = this.content;
      panel.active = false;
      var bg = panel.getChildByName("bg");
      var coin = panel.getChildByName("coin").getComponent(cc.Label);
      var acc = panel.getChildByName("acc").getComponent(cc.Label);
      var time = panel.getChildByName("time").getComponent(cc.Label);
      var state = panel.getChildByName("state").getComponent(cc.Label);
      var type = panel.getChildByName("type").getComponent(cc.Label);
      bg.active = i % 2 == 0;
      type.string = info.payeeMethod == 1 ? "支付宝" : "银行卡";
      var accNum = info.accountName;
      acc.string = info.payeeMethod == 1 ? accNum.replace(accNum.substring(3, 7), "****") : accNum.replace(accNum.substring(4, 13), "*********");
      coin.string = "".concat(this.getFloat(info.money), "\u5143");
      glGame.panel.settingTableLabelColor(panel.getChildByName("coin"));
      state.string = info.state;
      var timeStamp = new Date(exchangeInfo[i].rechargeTimeStamp * 1000);
      var strTime = "".concat(timeStamp.getFullYear(), "/").concat(timeStamp.getMonth() + 1 >= 10 ? timeStamp.getMonth() + 1 : "0" + (timeStamp.getMonth() + 1), "/").concat(timeStamp.getDate() >= 10 ? timeStamp.getDate() : '0' + timeStamp.getDate());
      strTime += "\uFF08".concat(glGame.tips.WEEKNAME[timeStamp.getDay()], "\uFF09");
      strTime += "".concat(timeStamp.getHours() >= 10 ? timeStamp.getHours() : "0" + timeStamp.getHours(), ":");
      strTime += "".concat(timeStamp.getMinutes() >= 10 ? timeStamp.getMinutes() : "0" + timeStamp.getMinutes(), ":");
      strTime += "".concat(timeStamp.getSeconds() >= 10 ? timeStamp.getSeconds() : "0" + timeStamp.getSeconds());
      time.string = strTime;

      for (var x = 0; x < this.exchangeState.length; x++) {
        if (info.state == this.exchangeState[x]) {
          state.node.color = this.exchangeColor[x];
        }
      }

      console.log("兑换记录", exchangeInfo[i]);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.click_close();
        break;

      case "btn_upPage":
        this.upPage();
        break;

      case "btn_downPage":
        this.downPage();
        break;

      default:
        console.error("no find button name -> %s", name);
    }
  },
  upPage: function upPage() {
    if (this.page - 1 < 1) {
      return;
    }

    this.page--;
    this.reqWithdrawLog();
  },
  downPage: function downPage() {
    if (this.page + 1 > Number(this.totalPage.string)) {
      return;
    }

    this.page++;
    this.reqWithdrawLog();
  },
  click_close: function click_close() {
    this.remove();
  },
  set: function set(key, value) {
    this[key] = value;
  },
  get: function get(key) {
    return this[key];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx3aXRoZHJhd2FsXFxleGNoYW5nZXJlY29yZC5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiY29udGVudCIsImNjIiwiTm9kZSIsImV4Y2hhbmdlaXRlbSIsImN1clBhZ2UiLCJMYWJlbCIsInRvdGFsUGFnZSIsIm9uTG9hZCIsInJlc2V0RGF0YSIsInBhZ2UiLCJyZWNvcmQiLCJyZXFXaXRoZHJhd0xvZyIsImV4Y2hhbmdlU3RhdGUiLCJleGNoYW5nZUNvbG9yIiwiY29sb3IiLCJzdHJpbmciLCJ1cGRhdGVJdGVtIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwidHlwZSIsInBhZ2VTaXplIiwicm91dGUiLCJkYXRhIiwicmVzdWx0IiwicGFnZVRvdGFsIiwiZ2V0RmxvYXQiLCJ2YWx1ZSIsIm51bSIsIk51bWJlciIsImRpdiIsImlzTmFOIiwidG9TdHJpbmciLCJNYXRoIiwiZmxvb3IiLCJ0b0ZpeGVkIiwibXNnIiwiZGVzdHJveUFsbENoaWxkcmVuIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJleGNoYW5nZUluZm8iLCJjb3VudCIsImxlbmd0aCIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsImkiLCJpbmZvIiwicGFuZWwiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImJnIiwiY29pbiIsImdldENvbXBvbmVudCIsImFjYyIsInRpbWUiLCJzdGF0ZSIsInBheWVlTWV0aG9kIiwiYWNjTnVtIiwiYWNjb3VudE5hbWUiLCJyZXBsYWNlIiwic3Vic3RyaW5nIiwibW9uZXkiLCJzZXR0aW5nVGFibGVMYWJlbENvbG9yIiwidGltZVN0YW1wIiwiRGF0ZSIsInJlY2hhcmdlVGltZVN0YW1wIiwic3RyVGltZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwidGlwcyIsIldFRUtOQU1FIiwiZ2V0RGF5IiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsIngiLCJjb25zb2xlIiwibG9nIiwic2hvd0VmZmVjdE5vZGUiLCJvbkNsaWNrIiwibmFtZSIsImNsaWNrX2Nsb3NlIiwidXBQYWdlIiwiZG93blBhZ2UiLCJlcnJvciIsInJlbW92ZSIsInNldCIsImtleSIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRUMsRUFBRSxDQUFDQyxJQURKO0FBRVJDLElBQUFBLFlBQVksRUFBRUYsRUFBRSxDQUFDQyxJQUZUO0FBR1JFLElBQUFBLE9BQU8sRUFBRUgsRUFBRSxDQUFDSSxLQUhKO0FBSVJDLElBQUFBLFNBQVMsRUFBRUwsRUFBRSxDQUFDSTtBQUpOLEdBRFE7QUFPcEJFLEVBQUFBLE1BUG9CLG9CQU9YO0FBQ0wsU0FBS0MsU0FBTDtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxjQUFMO0FBQ0gsR0FabUI7QUFhcEJILEVBQUFBLFNBYm9CLHVCQWFSO0FBQ1IsU0FBS0ksYUFBTCxHQUFxQixDQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWMsSUFBZCxFQUFvQixJQUFwQixDQUFyQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsQ0FBQ1osRUFBRSxDQUFDYSxLQUFILENBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsR0FBbkIsQ0FBRCxFQUEwQmIsRUFBRSxDQUFDYSxLQUFILENBQVMsQ0FBVCxFQUFZLEdBQVosRUFBaUIsRUFBakIsQ0FBMUIsRUFBZ0RiLEVBQUUsQ0FBQ2EsS0FBSCxDQUFTLEdBQVQsRUFBYyxFQUFkLEVBQWtCLEVBQWxCLENBQWhELEVBQXVFYixFQUFFLENBQUNhLEtBQUgsQ0FBUyxHQUFULEVBQWMsRUFBZCxFQUFrQixFQUFsQixDQUF2RSxDQUFyQjtBQUNI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TDtBQUFvQjs7QUFDbEMsV0FBSyxZQUFMO0FBQW1CLGFBQUtDLE1BQUw7QUFBZTs7QUFDbEMsV0FBSyxjQUFMO0FBQXFCLGFBQUtDLFFBQUw7QUFBaUI7O0FBQ3RDO0FBQVNQLFFBQUFBLE9BQU8sQ0FBQ1EsS0FBUixDQUFjLDJCQUFkLEVBQTJDSixJQUEzQztBQUpiO0FBTUgsR0E1Rm1CO0FBNkZwQkUsRUFBQUEsTUE3Rm9CLG9CQTZGWDtBQUNMLFFBQUksS0FBS3pFLElBQUwsR0FBWSxDQUFaLEdBQWdCLENBQXBCLEVBQXVCO0FBQ25CO0FBQ0g7O0FBQ0QsU0FBS0EsSUFBTDtBQUNBLFNBQUtFLGNBQUw7QUFDSCxHQW5HbUI7QUFvR3BCd0UsRUFBQUEsUUFwR29CLHNCQW9HVDtBQUNQLFFBQUksS0FBSzFFLElBQUwsR0FBWSxDQUFaLEdBQWdCbUIsTUFBTSxDQUFDLEtBQUt0QixTQUFMLENBQWVTLE1BQWhCLENBQTFCLEVBQW1EO0FBQy9DO0FBQ0g7O0FBQ0QsU0FBS04sSUFBTDtBQUNBLFNBQUtFLGNBQUw7QUFDSCxHQTFHbUI7QUEyR3BCc0UsRUFBQUEsV0EzR29CLHlCQTJHTjtBQUNWLFNBQUtJLE1BQUw7QUFDSCxHQTdHbUI7QUE4R3BCQyxFQUFBQSxHQTlHb0IsZUE4R2hCQyxHQTlHZ0IsRUE4R1g3RCxLQTlHVyxFQThHSjtBQUNaLFNBQUs2RCxHQUFMLElBQVk3RCxLQUFaO0FBQ0gsR0FoSG1CO0FBaUhwQjhELEVBQUFBLEdBakhvQixlQWlIaEJELEdBakhnQixFQWlIWDtBQUNMLFdBQU8sS0FBS0EsR0FBTCxDQUFQO0FBQ0g7QUFuSG1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJnbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBleGNoYW5nZWl0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgY3VyUGFnZTogY2MuTGFiZWwsXHJcbiAgICAgICAgdG90YWxQYWdlOiBjYy5MYWJlbCxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKTtcclxuICAgICAgICB0aGlzLnBhZ2UgPSAxXHJcbiAgICAgICAgdGhpcy5yZWNvcmQgPSB7fTtcclxuICAgICAgICB0aGlzLnJlcVdpdGhkcmF3TG9nKCk7XHJcbiAgICB9LFxyXG4gICAgcmVzZXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuZXhjaGFuZ2VTdGF0ZSA9IFtcIuWkhOeQhuS4rVwiLCBcIuaIkOWKn1wiLCBcIumAgOWbnlwiLCBcIuWksei0pVwiXTtcclxuICAgICAgICB0aGlzLmV4Y2hhbmdlQ29sb3IgPSBbY2MuY29sb3IoMTAyLCAxNDQsIDIwNCksIGNjLmNvbG9yKDAsIDI1NSwgMjQpLCBjYy5jb2xvcigyNDQsIDIwLCAzNiksIGNjLmNvbG9yKDI0NCwgMjAsIDM2KV07XHJcbiAgICB9LFxyXG4gICAgcmVxV2l0aGRyYXdMb2coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkW3RoaXMucGFnZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJQYWdlLnN0cmluZyA9IHRoaXMucGFnZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtKHRoaXMucmVjb3JkW3RoaXMucGFnZV0pO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLmdhbWVOZXQuc2VuZF9tc2coXCJodHRwLnJlcVdpdGhkcmF3TG9nXCIsIHsgdHlwZTogMCwgcGFnZTogdGhpcy5wYWdlLCBwYWdlU2l6ZTogNyB9LCAocm91dGUsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b3RhbFBhZ2Uuc3RyaW5nID0gZGF0YS5yZXN1bHQucGFnZVRvdGFsO1xyXG4gICAgICAgICAgICB0aGlzLmN1clBhZ2Uuc3RyaW5nID0gdGhpcy5wYWdlO1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZFt0aGlzLnBhZ2VdID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5rWu54K55Z6L6L+Q566X5Y+W5L+p5L2NXHJcbiAgICBnZXRGbG9hdCh2YWx1ZSwgbnVtID0gMikge1xyXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKS5kaXYoMTAwKTtcclxuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKH5+dmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5mbG9vcih2YWx1ZSAqIDEwMCkgLyAxMDApLnRvRml4ZWQobnVtKS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1cGRhdGVJdGVtKG1zZykge1xyXG4gICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgZXhjaGFuZ2VJbmZvID0gbXNnLnJlc3VsdC5kYXRhO1xyXG4gICAgICAgIGxldCBjb3VudCA9IGV4Y2hhbmdlSW5mby5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3d1amlsdVwiKS5hY3RpdmUgPSBjb3VudCA9PSAwO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBhZ2VMYXlvdXRcIikuYWN0aXZlID0gY291bnQgPiAwO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl91cFBhZ2VcIikuYWN0aXZlID0gY291bnQgPiAwO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9kb3duUGFnZVwiKS5hY3RpdmUgPSBjb3VudCA+IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFuZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuYWN0aXZlID0gY291bnQgPiAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IGV4Y2hhbmdlSW5mb1tpXTtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5leGNoYW5nZWl0ZW0pO1xyXG4gICAgICAgICAgICBwYW5lbC5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgYmcgPSBwYW5lbC5nZXRDaGlsZEJ5TmFtZShcImJnXCIpXHJcbiAgICAgICAgICAgIGxldCBjb2luID0gcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBhY2MgPSBwYW5lbC5nZXRDaGlsZEJ5TmFtZShcImFjY1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgdGltZSA9IHBhbmVsLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBwYW5lbC5nZXRDaGlsZEJ5TmFtZShcInN0YXRlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJ0eXBlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGJnLmFjdGl2ZSA9IGkgJSAyID09IDA7XHJcbiAgICAgICAgICAgIHR5cGUuc3RyaW5nID0gaW5mby5wYXllZU1ldGhvZCA9PSAxID8gXCLmlK/ku5jlrp1cIiA6IFwi6ZO26KGM5Y2hXCJcclxuICAgICAgICAgICAgbGV0IGFjY051bSA9IGluZm8uYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgYWNjLnN0cmluZyA9IGluZm8ucGF5ZWVNZXRob2QgPT0gMSA/IGFjY051bS5yZXBsYWNlKGFjY051bS5zdWJzdHJpbmcoMywgNyksIFwiKioqKlwiKSA6IGFjY051bS5yZXBsYWNlKGFjY051bS5zdWJzdHJpbmcoNCwgMTMpLCBcIioqKioqKioqKlwiKVxyXG4gICAgICAgICAgICBjb2luLnN0cmluZyA9IGAke3RoaXMuZ2V0RmxvYXQoaW5mby5tb25leSl95YWDYDtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNldHRpbmdUYWJsZUxhYmVsQ29sb3IocGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luXCIpKTtcclxuICAgICAgICAgICAgc3RhdGUuc3RyaW5nID0gaW5mby5zdGF0ZVxyXG4gICAgICAgICAgICBsZXQgdGltZVN0YW1wID0gbmV3IERhdGUoZXhjaGFuZ2VJbmZvW2ldLnJlY2hhcmdlVGltZVN0YW1wICogMTAwMCk7XHJcbiAgICAgICAgICAgIGxldCBzdHJUaW1lID0gYCR7dGltZVN0YW1wLmdldEZ1bGxZZWFyKCl9LyR7dGltZVN0YW1wLmdldE1vbnRoKCkgKyAxID49IDEwID8gdGltZVN0YW1wLmdldE1vbnRoKCkgKyAxIDogXCIwXCIgKyAodGltZVN0YW1wLmdldE1vbnRoKCkgKyAxKX0vJHt0aW1lU3RhbXAuZ2V0RGF0ZSgpID49IDEwID8gdGltZVN0YW1wLmdldERhdGUoKSA6ICcwJyArIHRpbWVTdGFtcC5nZXREYXRlKCl9YFxyXG4gICAgICAgICAgICBzdHJUaW1lICs9IGDvvIgke2dsR2FtZS50aXBzLldFRUtOQU1FW3RpbWVTdGFtcC5nZXREYXkoKV1977yJYFxyXG4gICAgICAgICAgICBzdHJUaW1lICs9IGAke3RpbWVTdGFtcC5nZXRIb3VycygpID49IDEwID90aW1lU3RhbXAuZ2V0SG91cnMoKTogXCIwXCIgKyB0aW1lU3RhbXAuZ2V0SG91cnMoKX06YFxyXG4gICAgICAgICAgICBzdHJUaW1lICs9IGAke3RpbWVTdGFtcC5nZXRNaW51dGVzKCkgPj0gMTAgP3RpbWVTdGFtcC5nZXRNaW51dGVzKCk6IFwiMFwiICsgdGltZVN0YW1wLmdldE1pbnV0ZXMoKX06YFxyXG4gICAgICAgICAgICBzdHJUaW1lICs9IGAke3RpbWVTdGFtcC5nZXRTZWNvbmRzKCkgPj0gMTAgP3RpbWVTdGFtcC5nZXRTZWNvbmRzKCk6IFwiMFwiICsgdGltZVN0YW1wLmdldFNlY29uZHMoKX1gXHJcbiAgICAgICAgICAgIHRpbWUuc3RyaW5nID0gc3RyVGltZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmV4Y2hhbmdlU3RhdGUubGVuZ3RoOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLnN0YXRlID09IHRoaXMuZXhjaGFuZ2VTdGF0ZVt4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm5vZGUuY29sb3IgPSB0aGlzLmV4Y2hhbmdlQ29sb3JbeF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWFkeaNouiusOW9lVwiLCBleGNoYW5nZUluZm9baV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0VmZmVjdE5vZGUodGhpcyx0aGlzLmNvbnRlbnQsMC4wMix0cnVlKTtcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xpY2tfY2xvc2UoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fdXBQYWdlXCI6IHRoaXMudXBQYWdlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Rvd25QYWdlXCI6IHRoaXMuZG93blBhZ2UoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1cFBhZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZSAtIDEgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2UtLTtcclxuICAgICAgICB0aGlzLnJlcVdpdGhkcmF3TG9nKCk7XHJcbiAgICB9LFxyXG4gICAgZG93blBhZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZSArIDEgPiBOdW1iZXIodGhpcy50b3RhbFBhZ2Uuc3RyaW5nKSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlKys7XHJcbiAgICAgICAgdGhpcy5yZXFXaXRoZHJhd0xvZygpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrX2Nsb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
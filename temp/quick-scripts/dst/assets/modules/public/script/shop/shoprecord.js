
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/shop/shoprecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5c07dADCYpLmJ17FUuZ7ovo', 'shoprecord');
// modules/public/script/shop/shoprecord.js

"use strict";

var rechargeType = {
  1: "代理充值",
  2: "专享闪付",
  3: "快捷支付",
  4: "支付宝充值",
  5: "微信充值",
  6: "银行卡充值",
  7: "云闪付支付",
  100: "其他"
};
var rechargestate = {
  2: "处理中",
  3: "处理中",
  4: "充值成功",
  6: "充值失败",
  7: "充值成功",
  10: "充值成功"
};
glGame.baseclass.extend({
  properties: {
    content: cc.Node,
    Item: cc.Node,
    curPage: cc.Label,
    totalPage: cc.Label
  },
  onLoad: function onLoad() {
    this.page = 1;
    this.record = {};
    this.color = {
      2: cc.color(49, 214, 255),
      3: cc.color(49, 214, 255),
      4: cc.color(70, 255, 0),
      6: cc.color(255, 0, 0),
      7: cc.color(70, 255, 0)
    };
    this.ReqPayOrderList();
  },
  ReqPayOrderList: function ReqPayOrderList() {
    var _this = this;

    if (this.record[this.page]) {
      this.curPage.string = this.page;
      this.setTable(this.record[this.page]);
      return;
    }

    console.log("请求当前的页数", this.page);
    glGame.gameNet.send_msg('http.ReqPayOrderList', {
      page: this.page,
      pageSize: 8
    }, function (route, msg) {
      _this.record[_this.page] = msg.result.data;
      _this.curPage.string = _this.page;
      _this.totalPage.string = msg.result.pageTotal;

      _this.setTable(msg.result.data);

      console.log("这是创建订单的记录", msg);
    });
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.btn_closeCb();
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
  setTable: function setTable(data) {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    this.node.getChildByName("img_wujilu").active = data.length == 0;
    this.node.getChildByName("pageLayout").active = data.length > 0;
    this.node.getChildByName("btn_upPage").active = data.length > 0;
    this.node.getChildByName("btn_downPage").active = data.length > 0;
    this.node.getChildByName("bg").getChildByName("tip").active = data.length > 0;

    for (var i = 0; i < data.length; i++) {
      var Item = cc.instantiate(this.Item);
      Item.parent = this.content;
      Item.active = false;
      Item.getChildByName("number").getComponent(cc.Label).string = data[i].orderSn;
      Item.getChildByName("coin").getComponent(cc.Label).string = "".concat(this.getFloat(data[i].rechargeMoney), "\u5143");
      glGame.panel.settingTableLabelColor(Item.getChildByName("coin"));
      Item.getChildByName("time").getComponent(cc.Label).string = data[i].rechargeTime;
      Item.getChildByName("type").getComponent(cc.Label).string = rechargeType[data[i].rechargeType] ? rechargeType[data[i].rechargeType] : '其他';
      Item.getChildByName("state").getComponent(cc.Label).string = rechargestate[data[i].rechargeState];
      Item.getChildByName("state").color = this.color[data[i].rechargeState];
      Item.getChildByName("bg").active = i % 2 != 0;
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  upPage: function upPage() {
    if (this.page - 1 < 1) {
      return;
    }

    this.page--;
    this.ReqPayOrderList();
  },
  downPage: function downPage() {
    if (this.page + 1 > Number(this.totalPage.string)) {
      return;
    }

    this.page++;
    this.ReqPayOrderList();
  },
  btn_closeCb: function btn_closeCb() {
    this.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXHNob3BcXHNob3ByZWNvcmQuanMiXSwibmFtZXMiOlsicmVjaGFyZ2VUeXBlIiwicmVjaGFyZ2VzdGF0ZSIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJjb250ZW50IiwiY2MiLCJOb2RlIiwiSXRlbSIsImN1clBhZ2UiLCJMYWJlbCIsInRvdGFsUGFnZSIsIm9uTG9hZCIsInBhZ2UiLCJyZWNvcmQiLCJjb2xvciIsIlJlcVBheU9yZGVyTGlzdCIsInN0cmluZyIsInNldFRhYmxlIiwiY29uc29sZSIsImxvZyIsImdhbWVOZXQiLCJzZW5kX21zZyIsInBhZ2VTaXplIiwicm91dGUiLCJtc2ciLCJyZXN1bHQiLCJkYXRhIiwicGFnZVRvdGFsIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwiYnRuX2Nsb3NlQ2IiLCJ1cFBhZ2UiLCJkb3duUGFnZSIsImVycm9yIiwiZGVzdHJveUFsbENoaWxkcmVuIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsImxlbmd0aCIsImkiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImdldENvbXBvbmVudCIsIm9yZGVyU24iLCJnZXRGbG9hdCIsInJlY2hhcmdlTW9uZXkiLCJwYW5lbCIsInNldHRpbmdUYWJsZUxhYmVsQ29sb3IiLCJyZWNoYXJnZVRpbWUiLCJyZWNoYXJnZVN0YXRlIiwic2hvd0VmZmVjdE5vZGUiLCJ2YWx1ZSIsIk51bWJlciIsImRpdiIsInRvU3RyaW5nIiwicmVtb3ZlIiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFlBQVksR0FBRztBQUNqQixLQUFFLE1BRGU7QUFFakIsS0FBRSxNQUZlO0FBR2pCLEtBQUUsTUFIZTtBQUlqQixLQUFFLE9BSmU7QUFLakIsS0FBRSxNQUxlO0FBTWpCLEtBQUUsT0FOZTtBQU9qQixLQUFFLE9B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QUwsQ0FBV1ksSUFBSSxDQUFDYyxDQUFELENBQUosQ0FBUVUsYUFBbkIsQ0FBckM7QUFDQTNDLE1BQUFBLElBQUksQ0FBQzhCLGNBQUwsQ0FBb0IsSUFBcEIsRUFBMEJDLE1BQTFCLEdBQW1DRSxDQUFDLEdBQUMsQ0FBRixJQUFPLENBQTFDO0FBQ0g7O0FBQ0R4QyxJQUFBQSxNQUFNLENBQUMrQyxLQUFQLENBQWFJLGNBQWIsQ0FBNEIsSUFBNUIsRUFBaUMsS0FBSy9DLE9BQXRDLEVBQThDLElBQTlDLEVBQW1ELElBQW5EO0FBQ0gsR0FoRW1CO0FBaUVwQnlDLEVBQUFBLFFBakVvQixvQkFpRVhPLEtBakVXLEVBaUVKO0FBQ1osV0FBUUMsTUFBTSxDQUFDRCxLQUFELENBQU4sQ0FBY0UsR0FBZCxDQUFrQixHQUFsQixDQUFELENBQXlCQyxRQUF6QixFQUFQO0FBQ0gsR0FuRW1CO0FBb0VwQnZCLEVBQUFBLE1BcEVvQixvQkFvRVg7QUFDTCxRQUFJLEtBQUtwQixJQUFMLEdBQVksQ0FBWixHQUFnQixDQUFwQixFQUF1QjtBQUNuQjtBQUNIOztBQUNELFNBQUtBLElBQUw7QUFDQSxTQUFLRyxlQUFMO0FBQ0gsR0ExRW1CO0FBMkVwQmtCLEVBQUFBLFFBM0VvQixzQkEyRVQ7QUFDUCxRQUFJLEtBQUtyQixJQUFMLEdBQVksQ0FBWixHQUFnQnlDLE1BQU0sQ0FBQyxLQUFLM0MsU0FBTCxDQUFlTSxNQUFoQixDQUExQixFQUFtRDtBQUMvQztBQUNIOztBQUNELFNBQUtKLElBQUw7QUFDQSxTQUFLRyxlQUFMO0FBQ0gsR0FqRm1CO0FBa0ZwQmdCLEVBQUFBLFdBbEZvQix5QkFrRk47QUFDVixTQUFLeUIsTUFBTDtBQUNILEdBcEZtQjtBQXFGcEJDLEVBQUFBLFNBckZvQix1QkFxRlIsQ0FFWDtBQXZGbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJlY2hhcmdlVHlwZSA9IHtcclxuICAgIDE6XCLku6PnkIblhYXlgLxcIixcclxuICAgIDI6XCLkuJPkuqvpl6rku5hcIixcclxuICAgIDM6XCLlv6vmjbfmlK/ku5hcIixcclxuICAgIDQ6XCLmlK/ku5jlrp3lhYXlgLxcIixcclxuICAgIDU6XCLlvq7kv6HlhYXlgLxcIixcclxuICAgIDY6XCLpk7booYzljaHlhYXlgLxcIixcclxuICAgIDc6XCLkupHpl6rku5jmlK/ku5hcIixcclxuICAgIDEwMDpcIuWFtuS7llwiXHJcbn1cclxuY29uc3QgcmVjaGFyZ2VzdGF0ZSA9IHtcclxuICAgIDI6XCLlpITnkIbkuK1cIixcclxuICAgIDM6XCLlpITnkIbkuK1cIixcclxuICAgIDQ6XCLlhYXlgLzmiJDlip9cIixcclxuICAgIDY6XCLlhYXlgLzlpLHotKVcIixcclxuICAgIDc6XCLlhYXlgLzmiJDlip9cIixcclxuICAgIDEwOlwi5YWF5YC85oiQ5YqfXCIsXHJcbn1cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNvbnRlbnQ6Y2MuTm9kZSxcclxuICAgICAgICBJdGVtOmNjLk5vZGUsXHJcbiAgICAgICAgY3VyUGFnZTpjYy5MYWJlbCxcclxuICAgICAgICB0b3RhbFBhZ2U6Y2MuTGFiZWxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gMVxyXG4gICAgICAgIHRoaXMucmVjb3JkID0ge307XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IHtcclxuICAgICAgICAgICAgMjpjYy5jb2xvcig0OSwyMTQsMjU1KSxcclxuICAgICAgICAgICAgMzpjYy5jb2xvcig0OSwyMTQsMjU1KSxcclxuICAgICAgICAgICAgNDpjYy5jb2xvcig3MCwyNTUsMCksXHJcbiAgICAgICAgICAgIDY6Y2MuY29sb3IoMjU1LDAsMCksXHJcbiAgICAgICAgICAgIDc6Y2MuY29sb3IoNzAsMjU1LDApLFxyXG4gICAgICAgIH1cclxuICAgICAgIHRoaXMuUmVxUGF5T3JkZXJMaXN0KCk7XHJcbiAgICB9LFxyXG4gICAgUmVxUGF5T3JkZXJMaXN0KCl7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkW3RoaXMucGFnZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJQYWdlLnN0cmluZyA9IHRoaXMucGFnZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJsZSh0aGlzLnJlY29yZFt0aGlzLnBhZ2VdKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6K+35rGC5b2T5YmN55qE6aG15pWwXCIsdGhpcy5wYWdlKVxyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBheU9yZGVyTGlzdCcsIHtwYWdlOiB0aGlzLnBhZ2UsIHBhZ2VTaXplOiA4fSwgKHJvdXRlLCBtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRbdGhpcy5wYWdlXSA9IG1zZy5yZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5jdXJQYWdlLnN0cmluZyA9IHRoaXMucGFnZTtcclxuICAgICAgICAgICAgdGhpcy50b3RhbFBhZ2Uuc3RyaW5nID0gbXNnLnJlc3VsdC5wYWdlVG90YWxcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJsZShtc2cucmVzdWx0LmRhdGEpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5Yib5bu66K6i5Y2V55qE6K6w5b2VXCIsIG1zZyk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9jbG9zZVwiOiB0aGlzLmJ0bl9jbG9zZUNiKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3VwUGFnZVwiOiB0aGlzLnVwUGFnZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9kb3duUGFnZVwiOiB0aGlzLmRvd25QYWdlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0VGFibGUoZGF0YSl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ193dWppbHVcIikuYWN0aXZlID0gZGF0YS5sZW5ndGggPT0gMDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwYWdlTGF5b3V0XCIpLmFjdGl2ZSA9IGRhdGEubGVuZ3RoID4gMDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdXBQYWdlXCIpLmFjdGl2ZSA9IGRhdGEubGVuZ3RoID4gMDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZG93blBhZ2VcIikuYWN0aXZlID0gZGF0YS5sZW5ndGggPiAwO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmdldENoaWxkQnlOYW1lKFwidGlwXCIpLmFjdGl2ZSA9IGRhdGEubGVuZ3RoID4gMDtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5JdGVtKTtcclxuICAgICAgICAgICAgSXRlbS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIEl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJudW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLm9yZGVyU247XHJcbiAgICAgICAgICAgIEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjb2luXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7dGhpcy5nZXRGbG9hdChkYXRhW2ldLnJlY2hhcmdlTW9uZXkpfeWFg2A7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zZXR0aW5nVGFibGVMYWJlbENvbG9yKEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjb2luXCIpKTtcclxuICAgICAgICAgICAgSXRlbS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLnJlY2hhcmdlVGltZTtcclxuICAgICAgICAgICAgSXRlbS5nZXRDaGlsZEJ5TmFtZShcInR5cGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZWNoYXJnZVR5cGVbZGF0YVtpXS5yZWNoYXJnZVR5cGVdP3JlY2hhcmdlVHlwZVtkYXRhW2ldLnJlY2hhcmdlVHlwZV06J+WFtuS7lic7XHJcbiAgICAgICAgICAgIEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJzdGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlY2hhcmdlc3RhdGVbZGF0YVtpXS5yZWNoYXJnZVN0YXRlXTtcclxuICAgICAgICAgICAgSXRlbS5nZXRDaGlsZEJ5TmFtZShcInN0YXRlXCIpLmNvbG9yID0gdGhpcy5jb2xvcltkYXRhW2ldLnJlY2hhcmdlU3RhdGVdO1xyXG4gICAgICAgICAgICBJdGVtLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gaSUyICE9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dFZmZlY3ROb2RlKHRoaXMsdGhpcy5jb250ZW50LDAuMDIsdHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG4gICAgdXBQYWdlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UgLSAxIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlLS07XHJcbiAgICAgICAgdGhpcy5SZXFQYXlPcmRlckxpc3QoKTtcclxuICAgIH0sXHJcbiAgICBkb3duUGFnZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlICsgMSA+IE51bWJlcih0aGlzLnRvdGFsUGFnZS5zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2UrKztcclxuICAgICAgICB0aGlzLlJlcVBheU9yZGVyTGlzdCgpO1xyXG4gICAgfSxcclxuICAgIGJ0bl9jbG9zZUNiKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG5cclxuICAgIH1cclxufSk7Il19
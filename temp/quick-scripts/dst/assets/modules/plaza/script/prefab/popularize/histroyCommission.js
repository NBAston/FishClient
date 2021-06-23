
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/popularize/histroyCommission.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '28f614VKQpKnIVAsmHBPjnq', 'histroyCommission');
// modules/plaza/script/prefab/popularize/histroyCommission.js

"use strict";

glGame.baseclass.extend({
  properties: {
    Lab_time: cc.Label,
    infoItem: cc.Node,
    content: cc.Node,
    Lab_CurPage: cc.Label,
    Lab_totalPage: cc.Label
  },
  onLoad: function onLoad() {
    this.CurPage = 1;
    this.Lab_CurPage.string = this.CurPage;
    this.recordData = {};
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_pageup":
        this.pageup_CB();
        break;

      case "btn_pagedown":
        this.pagedown_CB();
        break;
    }
  },
  ReqPlayerExtensionCountlessRecordDetail: function ReqPlayerExtensionCountlessRecordDetail() {
    var _this = this;

    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var date = this.curdate;
    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRecordDetail', {
      page: page,
      date: date,
      page_size: 8
    }, function (route, msg) {
      console.log("这是当前数据", msg);
      _this.recordData[_this.CurPage] = msg;

      _this.setTable(_this.recordData[_this.CurPage].list);
    });
  },
  initUI: function initUI(data, date) {
    this.curdate = date;
    this.recordData[this.CurPage] = data;
    this.Lab_time.string = this.curdate;
    this.Lab_totalPage.string = data.page_total;
    this.setTable(data.list);
    console.log("这是历史佣金明细的消息", data);
  },
  setTable: function setTable(data) {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();

    for (var i = 0; i < data.length; i++) {
      var infoItem = cc.instantiate(this.infoItem);
      infoItem.parent = this.content;
      infoItem.active = true;
      infoItem.getChildByName("bg").active = i % 2;
      infoItem.getChildByName("member").getComponent(cc.Label).string = data[i].logicid;
      infoItem.getChildByName("name").getComponent(cc.Label).string = data[i].nickname;
      infoItem.getChildByName("achievement").getComponent(cc.Label).string = this.getFloat(data[i].bet); //打码量

      var achievecontribu = infoItem.getChildByName("achievecontribu");
      achievecontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_bet_commission); //直推佣金

      glGame.panel.settingTableLabelColor(achievecontribu);
      infoItem.getChildByName("teamcontribu").getComponent(cc.Label).string = this.getFloat(data[i].achievement); //团队业绩

      var rankcontribu = infoItem.getChildByName("rankcontribu");
      rankcontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_sub_commission); //级差佣金贡献

      glGame.panel.settingTableLabelColor(rankcontribu);
      var totalcontribu = infoItem.getChildByName("totalcontribu");
      totalcontribu.getComponent(cc.Label).string = this.getFloat(data[i].contribute_bet_commission + data[i].contribute_sub_commission); //总贡献佣金

      glGame.panel.settingTableLabelColor(totalcontribu);
    }
  },
  pageup_CB: function pageup_CB() {
    this.CurPage--;

    if (this.CurPage < 1) {
      this.CurPage = 1;
      return;
    }

    this.Lab_CurPage.string = this.CurPage;
    this.ReqPlayerExtensionCountlessRecordDetail(this.CurPage);
  },
  pagedown_CB: function pagedown_CB() {
    this.CurPage++;

    if (this.CurPage > Number(this.Lab_totalPage.string)) {
      this.CurPage = Number(this.Lab_totalPage.string);
      return;
    }

    this.Lab_CurPage.string = this.CurPage;
    this.ReqPlayerExtensionCountlessRecordDetail(this.CurPage);
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxwb3B1bGFyaXplXFxoaXN0cm95Q29tbWlzc2lvbi5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwiTGFiX3RpbWUiLCJjYyIsIkxhYmVsIiwiaW5mb0l0ZW0iLCJOb2RlIiwiY29udGVudCIsIkxhYl9DdXJQYWdlIiwiTGFiX3RvdGFsUGFnZSIsIm9uTG9hZCIsIkN1clBhZ2UiLCJzdHJpbmciLCJyZWNvcmREYXRhIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwicmVtb3ZlIiwicGFnZXVwX0NCIiwicGFnZWRvd25fQ0IiLCJSZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZWNvcmREZXRhaWwiLCJwYWdlIiwiZGF0ZSIsImN1cmRhdGUiLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJwYWdlX3NpemUiLCJyb3V0ZSIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzZXRUYWJsZSIsImxpc3QiLCJpbml0VUkiLCJkYXRhIiwicGFnZV90b3RhbCIsImRlc3Ryb3lBbGxDaGlsZHJlbiIsInJlbW92ZUFsbENoaWxkcmVuIiwiaSIsImxlbmd0aCIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiYWN0aXZlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJsb2dpY2lkIiwibmlja25hbWUiLCJnZXRGbG9hdCIsImJldCIsImFjaGlldmVjb250cmlidSIsImNvbnRyaWJ1dGVfYmV0X2NvbW1pc3Npb24iLCJwYW5lbCIsInNldHRpbmdUYWJsZUxhYmVsQ29sb3IiLCJhY2hpZXZlbWVudCIsInJhbmtjb250cmlidSIsImNvbnRyaWJ1dGVfc3ViX2NvbW1pc3Npb24iLCJ0b3RhbGNvbnRyaWJ1IiwiTnVtYmVyIiwidmFsdWUiLCJkaXYiLCJ0b1N0cmluZyIsIk9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEs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aEQsYUFBTCxDQUFtQkcsTUFBcEIsQ0FBekIsRUFBc0Q7QUFDbEQsV0FBS0QsT0FBTCxHQUFlOEMsTUFBTSxDQUFDLEtBQUtoRCxhQUFMLENBQW1CRyxNQUFwQixDQUFyQjtBQUNBO0FBQ0g7O0FBQ0QsU0FBS0osV0FBTCxDQUFpQkksTUFBakIsR0FBMEIsS0FBS0QsT0FBL0I7QUFDQSxTQUFLUyx1Q0FBTCxDQUE2QyxLQUFLVCxPQUFsRDtBQUNILEdBaEZtQjtBQWlGcEJvQyxFQUFBQSxRQWpGb0Isb0JBaUZYVyxLQWpGVyxFQWlGSjtBQUNaLFdBQVFELE1BQU0sQ0FBQ0MsS0FBRCxDQUFOLENBQWNDLEdBQWQsQ0FBa0IsR0FBbEIsQ0FBRCxDQUF5QkMsUUFBekIsRUFBUDtBQUNILEdBbkZtQjtBQW9GcEJDLEVBQUFBLFNBcEZvQix1QkFvRlIsQ0FFWDtBQXRGbUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBMYWJfdGltZTogY2MuTGFiZWwsXHJcbiAgICAgICAgaW5mb0l0ZW06IGNjLk5vZGUsXHJcbiAgICAgICAgY29udGVudDogY2MuTm9kZSxcclxuICAgICAgICBMYWJfQ3VyUGFnZTogY2MuTGFiZWwsXHJcbiAgICAgICAgTGFiX3RvdGFsUGFnZTogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuQ3VyUGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5MYWJfQ3VyUGFnZS5zdHJpbmcgPSB0aGlzLkN1clBhZ2U7XHJcbiAgICAgICAgdGhpcy5yZWNvcmREYXRhID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nsb3NlXCI6IHRoaXMucmVtb3ZlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3BhZ2V1cFwiOiB0aGlzLnBhZ2V1cF9DQigpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9wYWdlZG93blwiOiB0aGlzLnBhZ2Vkb3duX0NCKCk7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBSZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZWNvcmREZXRhaWwocGFnZSA9IDEpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IHRoaXMuY3VyZGF0ZTtcclxuICAgICAgICBnbEdhbWUuZ2FtZU5ldC5zZW5kX21zZygnaHR0cC5SZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZWNvcmREZXRhaWwnLCB7IHBhZ2U6IHBhZ2UsIGRhdGU6IGRhdGUsIHBhZ2Vfc2l6ZTogOCB9LCAocm91dGUsIG1zZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeaVsOaNrlwiLG1zZylcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmREYXRhW3RoaXMuQ3VyUGFnZV0gPSBtc2dcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGFibGUodGhpcy5yZWNvcmREYXRhW3RoaXMuQ3VyUGFnZV0ubGlzdClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGluaXRVSShkYXRhLCBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJkYXRlID0gZGF0ZTtcclxuICAgICAgICB0aGlzLnJlY29yZERhdGFbdGhpcy5DdXJQYWdlXSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5MYWJfdGltZS5zdHJpbmcgPSB0aGlzLmN1cmRhdGU7XHJcbiAgICAgICAgdGhpcy5MYWJfdG90YWxQYWdlLnN0cmluZyA9IGRhdGEucGFnZV90b3RhbDtcclxuICAgICAgICB0aGlzLnNldFRhYmxlKGRhdGEubGlzdClcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/meaYr+WOhuWPsuS9o+mHkeaYjue7hueahOa2iOaBr1wiLCBkYXRhKVxyXG4gICAgfSxcclxuICAgIHNldFRhYmxlKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaW5mb0l0ZW0pO1xyXG4gICAgICAgICAgICBpbmZvSXRlbS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGluZm9JdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGluZm9JdGVtLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gaSUyO1xyXG4gICAgICAgICAgICBpbmZvSXRlbS5nZXRDaGlsZEJ5TmFtZShcIm1lbWJlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFbaV0ubG9naWNpZDtcclxuICAgICAgICAgICAgaW5mb0l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YVtpXS5uaWNrbmFtZTtcclxuICAgICAgICAgICAgaW5mb0l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJhY2hpZXZlbWVudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQoZGF0YVtpXS5iZXQpOyAgLy/miZPnoIHph49cclxuICAgICAgICAgICAgbGV0IGFjaGlldmVjb250cmlidSA9IGluZm9JdGVtLmdldENoaWxkQnlOYW1lKFwiYWNoaWV2ZWNvbnRyaWJ1XCIpXHJcbiAgICAgICAgICAgIGFjaGlldmVjb250cmlidS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQoZGF0YVtpXS5jb250cmlidXRlX2JldF9jb21taXNzaW9uKTsgICAgLy/nm7TmjqjkvaPph5FcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNldHRpbmdUYWJsZUxhYmVsQ29sb3IoYWNoaWV2ZWNvbnRyaWJ1KTtcclxuICAgICAgICAgICAgaW5mb0l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0ZWFtY29udHJpYnVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KGRhdGFbaV0uYWNoaWV2ZW1lbnQpOyAgICAgICAgICAgICAgICAgICAgIC8v5Zui6Zif5Lia57upXHJcbiAgICAgICAgICAgIGxldCByYW5rY29udHJpYnUgPSBpbmZvSXRlbS5nZXRDaGlsZEJ5TmFtZShcInJhbmtjb250cmlidVwiKVxyXG4gICAgICAgICAgICByYW5rY29udHJpYnUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KGRhdGFbaV0uY29udHJpYnV0ZV9zdWJfY29tbWlzc2lvbik7ICAgICAgIC8v57qn5beu5L2j6YeR6LSh54yuXHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zZXR0aW5nVGFibGVMYWJlbENvbG9yKHJhbmtjb250cmlidSk7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbGNvbnRyaWJ1ID0gaW5mb0l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0b3RhbGNvbnRyaWJ1XCIpXHJcbiAgICAgICAgICAgIHRvdGFsY29udHJpYnUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KGRhdGFbaV0uY29udHJpYnV0ZV9iZXRfY29tbWlzc2lvbiArIGRhdGFbaV0uY29udHJpYnV0ZV9zdWJfY29tbWlzc2lvbik7Ly/mgLvotKHnjK7kvaPph5FcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNldHRpbmdUYWJsZUxhYmVsQ29sb3IodG90YWxjb250cmlidSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhZ2V1cF9DQigpIHtcclxuICAgICAgICB0aGlzLkN1clBhZ2UtLVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLkN1clBhZ2UgPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VyUGFnZSA9IDFcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuTGFiX0N1clBhZ2Uuc3RyaW5nID0gdGhpcy5DdXJQYWdlO1xyXG4gICAgICAgIHRoaXMuUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzUmVjb3JkRGV0YWlsKHRoaXMuQ3VyUGFnZSlcclxuICAgIH0sXHJcbiAgICBwYWdlZG93bl9DQigpIHtcclxuICAgICAgICB0aGlzLkN1clBhZ2UrK1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLkN1clBhZ2UgPiBOdW1iZXIodGhpcy5MYWJfdG90YWxQYWdlLnN0cmluZykpIHtcclxuICAgICAgICAgICAgdGhpcy5DdXJQYWdlID0gTnVtYmVyKHRoaXMuTGFiX3RvdGFsUGFnZS5zdHJpbmcpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkxhYl9DdXJQYWdlLnN0cmluZyA9IHRoaXMuQ3VyUGFnZTtcclxuICAgICAgICB0aGlzLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc1JlY29yZERldGFpbCh0aGlzLkN1clBhZ2UpXHJcbiAgICB9LFxyXG4gICAgZ2V0RmxvYXQodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkuZGl2KDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICB9LFxyXG4gICAgT25EZXN0cm95KCkge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
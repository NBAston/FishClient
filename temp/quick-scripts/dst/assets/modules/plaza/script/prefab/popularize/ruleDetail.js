
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/popularize/ruleDetail.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7fb92VBt5EBpy/07lrH3I3', 'ruleDetail');
// modules/plaza/script/prefab/popularize/ruleDetail.js

"use strict";

glGame.baseclass.extend({
  properties: {
    scalecommission: cc.Prefab
  },
  onLoad: function onLoad() {
    this.pandectdata = null;
    this.ruleDetaildata = null;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_brokerage":
        this.brokerage();
        break;

      default:
        break;
    }
  },
  initUI: function initUI(pandectdata, ruleDetaildata) {
    this.pandectdata = pandectdata;
    this.ruleDetaildata = ruleDetaildata;
  },
  brokerage: function brokerage() {
    var scalecommission = glGame.panel.showChildPanel(this.scalecommission, this.node.parent.parent);
    var script = scalecommission.getComponent("scalecommission");
    script.initUI(this.ruleDetaildata, this.pandectdata.data.achievement);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxwb3B1bGFyaXplXFxydWxlRGV0YWlsLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJzY2FsZWNvbW1pc3Npb24iLCJjYyIsIlByZWZhYiIsIm9uTG9hZCIsInBhbmRlY3RkYXRhIiwicnVsZURldGFpbGRhdGEiLCJvbkNsaWNrIiwibmFtZSIsIm5vZGUiLCJicm9rZXJhZ2UiLCJpbml0VUkiLCJwYW5lbCIsInNob3dDaGlsZFBhbmVsIiwicGFyZW50Iiwic2NyaXB0IiwiZ2V0Q29tcG9uZW50IiwiZGF0YSIsImFjaGlldmVtZW50IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZUFBZSxFQUFFQyxFQUFFLENBQUNDO0FBRFosR0FEUTtBQUlwQkMsRUFBQUEsTUFKb0Isb0JBSVg7QUFDTCxTQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNILEdBUG1CO0FBVXBCQyxFQUFBQSxPQVZvQixtQkFVWkMsSUFWWSxFQVVOQyxJQVZNLEVBVUE7QUFDaEIsWUFBUUQsSUFBUjtBQUNJLFdBQUssZUFBTDtBQUFzQixhQUFLRSxTQUFMO0FBQWtCOztBQUN4QztBQUFTO0FBRmI7QUFJSCxHQWZtQjtBQWlCcEJDLEVBQUFBLE1BakJvQixrQkFpQmJOLFdBakJhLEVBaUJBQyxjQWpCQSxFQWlCZ0I7QUFDaEMsU0FBS0QsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNILEdBcEJtQjtBQXNCcEJJLEVBQUFBLFNBdEJvQix1QkFzQlI7QUFDUixRQUFJVCxlQUFlLEdBQUdKLE1BQU0sQ0FBQ2UsS0FBUCxDQUFhQyxjQUFiLENBQTRCLEtBQUtaLGVBQWpDLEVBQWtELEtBQUtRLElBQUwsQ0FBVUssTUFBVixDQUFpQkEsTUFBbkUsQ0FBdEI7QUFDQSxRQUFJQyxNQUFNLEdBQUdkLGVBQWUsQ0FBQ2UsWUFBaEIsQ0FBNkIsaUJBQTdCLENBQWI7QUFDQUQsSUFBQUEsTUFBTSxDQUFDSixNQUFQLENBQWMsS0FBS0wsY0FBbkIsRUFBbUMsS0FBS0QsV0FBTCxDQUFpQlksSUFBakIsQ0FBc0JDLFdBQXpEO0FBQ0gsR0ExQm1CO0FBNEJwQkMsRUFBQUEsU0E1Qm9CLHVCQTRCUixDQUVYO0FBOUJtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNjYWxlY29tbWlzc2lvbjogY2MuUHJlZmFiXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGFuZGVjdGRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucnVsZURldGFpbGRhdGEgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYnJva2VyYWdlXCI6IHRoaXMuYnJva2VyYWdlKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRVSShwYW5kZWN0ZGF0YSwgcnVsZURldGFpbGRhdGEpIHtcclxuICAgICAgICB0aGlzLnBhbmRlY3RkYXRhID0gcGFuZGVjdGRhdGE7XHJcbiAgICAgICAgdGhpcy5ydWxlRGV0YWlsZGF0YSA9IHJ1bGVEZXRhaWxkYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICBicm9rZXJhZ2UoKSB7XHJcbiAgICAgICAgbGV0IHNjYWxlY29tbWlzc2lvbiA9IGdsR2FtZS5wYW5lbC5zaG93Q2hpbGRQYW5lbCh0aGlzLnNjYWxlY29tbWlzc2lvbiwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQpO1xyXG4gICAgICAgIGxldCBzY3JpcHQgPSBzY2FsZWNvbW1pc3Npb24uZ2V0Q29tcG9uZW50KFwic2NhbGVjb21taXNzaW9uXCIpO1xyXG4gICAgICAgIHNjcmlwdC5pbml0VUkodGhpcy5ydWxlRGV0YWlsZGF0YSwgdGhpcy5wYW5kZWN0ZGF0YS5kYXRhLmFjaGlldmVtZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
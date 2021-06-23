
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/room/joinRoom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '912f9+rHrdHEL8BDjM2R6Zf', 'joinRoom');
// modules/plaza/script/prefab/room/joinRoom.js

"use strict";

glGame.baseclass.extend({
  properties: {
    lab_roomid: [cc.Label],
    labDiamonds: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.registerEvent();
    this.index = 0;
    this.indexMax = 5;
    this.indexMin = 0;
    this.updataInfo();
  },
  start: function start() {},
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.updataInfo, this);
    glGame.emitter.on("getGameIdByRoomNum", this.getGameIdByRoomNum, this);
    glGame.emitter.on("roomgameupdateend", this.roomgameupdateend, this);
    glGame.emitter.on(MESSAGE.UI.REFRESH_ROOM_NUM, this.click_numclose, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("getGameIdByRoomNum", this);
    glGame.emitter.off("roomgameupdateend", this);
    glGame.emitter.off(MESSAGE.UI.REFRESH_ROOM_NUM, this);
  },
  //刷新钻石数量
  updataInfo: function updataInfo() {
    this.labDiamonds.string = this.getFixNumber(glGame.user.get("diamond"));
  },
  getGameIdByRoomNum: function getGameIdByRoomNum(msg) {
    var _this = this;

    this.gameId = msg.gameId; // 检查当前游戏是否已经在更新队列

    if (glGame.assetsManager.isUpdateQueue(this.gameId)) return; // 检查游戏是否需要更新

    glGame.gamelistcfg.isNeedUpdate(this.gameId).then(function (bol) {
      if (bol) {
        // 开始更新【%s(游戏名称)】，请耐心等待...
        glGame.panel.showTip("\u5F00\u59CB\u66F4\u65B0\u3010".concat(glGame.room.getGameDictById(_this.gameId), "\u3011\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85..."));
        var gameName = glGame.scene.getSceneNameByID(_this.gameId);
        glGame.gamelistcfg.setGameUpdate(gameName, false);
        glGame.assetsManager.gameUpdata({
          gameID: _this.gameId,
          manifestUrl: null
        });

        _this.remove();
      } else {
        glGame.room.EnterRoomCheck();
      }
    });
  },
  roomgameupdateend: function roomgameupdateend() {
    glGame.room.EnterRoomCheck();
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "btn_close":
        this.remove();
        break;

      case "btn_numclose":
        this.click_numclose();
        break;

      case "btn_numreturn":
        this.click_numreturn();
        break;

      case "btn_add":
        glGame.panel.showPanelByName("exchangeDiamond");
        break;

      default:
        if (name.indexOf("btn_num") > -1) return this.click_number(name);
        break;
    }
  },
  click_number: function click_number(event, type) {
    glGame.audio.playLoadSoundEffectByPath("click");
    if (this.index > this.indexMax) return;
    var name = event.target.name;
    var text = name.substring(7);
    this.lab_roomid[this.index++].string = text;

    if (this.index > this.indexMax) {
      // TODO 进入游戏
      var numStr = "";

      for (var key in this.lab_roomid) {
        numStr += this.lab_roomid[key].string;
      }

      glGame.room.getGameIdByRoomNum({
        roomNum: numStr
      });
    }

    ;
  },
  click_numclose: function click_numclose() {
    glGame.audio.playLoadSoundEffectByPath("click");
    if (this.index <= this.indexMin) return;
    this.index = this.indexMin;

    for (var key in this.lab_roomid) {
      this.lab_roomid[key].string = "";
    }
  },
  click_numreturn: function click_numreturn() {
    glGame.audio.playLoadSoundEffectByPath("click");
    this.index = Math.min(this.index, this.indexMax);
    if (this.lab_roomid[this.index].string == "") this.index = Math.max(this.index - 1, this.indexMin);
    this.lab_roomid[this.index].string = "";
  },
  getFixNumber: function getFixNumber(value) {
    var value1 = Number(value).div(10);
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else if (~~value1 === value1) {
      return value.toFixed(1);
    } else {
      return value.toFixed(2);
    }
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxyb29tXFxqb2luUm9vbS5qcyJdLCJuYW1lcyI6WyJnbEdhbWUiLCJiYXNlY2xhc3MiLCJleHRlbmQiLCJwcm9wZXJ0aWVzIiwibGFiX3Jvb21pZCIsImNjIiwiTGFiZWwiLCJsYWJEaWFtb25kcyIsIm9uTG9hZCIsInJlZ2lzdGVyRXZlbnQiLCJpbmRleCIsImluZGV4TWF4IiwiaW5kZXhNaW4iLCJ1cGRhdGFJbmZvIiwic3RhcnQiLCJlbWl0dGVyIiwib24iLCJnZXRHYW1lSWRCeVJvb21OdW0iLCJyb29tZ2FtZXVwZGF0ZWVuZCIsIk1FU1NBR0UiLCJVSSIsIlJFRlJFU0hfUk9PTV9OVU0iLCJjbGlja19udW1jbG9zZSIsInVuUmVnaXN0ZXJFdmVudCIsIm9mZiIsInN0cmluZyIsImdldEZpeE51bWJlciIsInVzZXIiLCJnZXQiLCJtc2ciLCJnYW1lSWQiLCJhc3NldHNNYW5hZ2VyIiwiaXNVcGRhdGVRdWV1ZSIsImdhbWVsaXN0Y2ZnIiwiaXNOZWVkVXBkYXRlIiwidGhlbiIsImJvbCIsInBhbmVsIiwic2hvd1RpcCIsInJvb20iLCJnZXRHYW1lRGljdEJ5SWQiLCJnYW1lTmFtZSIsInNjZW5lIiwiZ2V0U2NlbmVOYW1lQnlJRCIsInNldEdhbWVVcGRhdGUiLCJnYW1lVXBkYXRhIiwiZ2FtZUlEIiwibWFuaWZlc3RVcmwiLCJyZW1vdmUiLCJFbnRlclJvb21DaGVjayIsIm9uQ2xpY2siLCJuYW1lIiwibm9kZSIsImNsaWNrX251bXJldHVybiIsInNob3dQYW5lbEJ5TmFtZSIsImluZGV4T2YiLCJjbGlja19udW1iZXIiLCJldmVudCIsInR5cGUiLCJhdWRpbyIsInBsYXlMb2FkU291bmRFZmZlY3RCeVBhdGgiLCJ0YXJnZXQiLCJ0ZXh0Iiwic3Vic3RyaW5nIiwibnVtU3RyIiwia2V5Iiwicm9vbU51bSIsIk1hdGgiLCJtaW4iLCJtYXgiLCJ2YWx1ZSIsInZhbHVlMSIsIk51bWJl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QUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUsxRCxLQUFkLEVBQXFCLEtBQUtDLFFBQTFCLENBQWI7QUFDQSxRQUFJLEtBQUtQLFVBQUwsQ0FBZ0IsS0FBS00sS0FBckIsRUFBNEJlLE1BQTVCLElBQXNDLEVBQTFDLEVBQThDLEtBQUtmLEtBQUwsR0FBYXlELElBQUksQ0FBQ0UsR0FBTCxDQUFTLEtBQUszRCxLQUFMLEdBQWEsQ0FBdEIsRUFBeUIsS0FBS0UsUUFBOUIsQ0FBYjtBQUM5QyxTQUFLUixVQUFMLENBQWdCLEtBQUtNLEtBQXJCLEVBQTRCZSxNQUE1QixHQUFxQyxFQUFyQztBQUNILEdBeEdtQjtBQTBHcEJDLEVBQUFBLFlBMUdvQix3QkEwR1A0QyxLQTFHTyxFQTBHQTtBQUNoQixRQUFJQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0YsS0FBRCxDQUFOLENBQWNHLEdBQWQsQ0FBa0IsRUFBbEIsQ0FBYjtBQUNBSCxJQUFBQSxLQUFLLEdBQUdFLE1BQU0sQ0FBQ0YsS0FBRCxDQUFOLENBQWNHLEdBQWQsQ0FBa0IsR0FBbEIsQ0FBUjtBQUNBLFFBQUlDLEtBQUssQ0FBQ0osS0FBRCxDQUFULEVBQWtCOztBQUNsQixRQUFJLENBQUMsQ0FBQ0EsS0FBRixLQUFZQSxLQUFoQixFQUF1QjtBQUNuQixhQUFPQSxLQUFLLENBQUNLLFFBQU4sRUFBUDtBQUNILEtBRkQsTUFFTyxJQUFJLENBQUMsQ0FBQ0osTUFBRixLQUFhQSxNQUFqQixFQUF5QjtBQUM1QixhQUFPRCxLQUFLLENBQUNNLE9BQU4sQ0FBYyxDQUFkLENBQVA7QUFDSCxLQUZNLE1BRUE7QUFDSCxhQUFPTixLQUFLLENBQUNNLE9BQU4sQ0FBYyxDQUFkLENBQVA7QUFDSDtBQUNKLEdBckhtQjtBQXdIcEJDLEVBQUFBLFNBeEhvQix1QkF3SFI7QUFDUixTQUFLdEQsZUFBTDtBQUNIO0FBMUhtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBsYWJfcm9vbWlkOiBbY2MuTGFiZWxdLFxyXG4gICAgICAgIGxhYkRpYW1vbmRzOiBjYy5MYWJlbCxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pbmRleE1heCA9IDU7XHJcbiAgICAgICAgdGhpcy5pbmRleE1pbiA9IDA7XHJcbiAgICAgICAgdGhpcy51cGRhdGFJbmZvKCk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOazqOWGjOeVjOmdouebkeWQrOS6i+S7tlxyXG4gICAgcmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInVwZGF0ZVVzZXJEYXRhXCIsIHRoaXMudXBkYXRhSW5mbywgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJnZXRHYW1lSWRCeVJvb21OdW1cIiwgdGhpcy5nZXRHYW1lSWRCeVJvb21OdW0sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwicm9vbWdhbWV1cGRhdGVlbmRcIiwgdGhpcy5yb29tZ2FtZXVwZGF0ZWVuZCwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oTUVTU0FHRS5VSS5SRUZSRVNIX1JPT01fTlVNLCB0aGlzLmNsaWNrX251bWNsb3NlLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvLyDplIDmr4HnlYzpnaLnm5HlkKzkuovku7ZcclxuICAgIHVuUmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJ1cGRhdGVVc2VyRGF0YVwiLCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vZmYoXCJnZXRHYW1lSWRCeVJvb21OdW1cIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwicm9vbWdhbWV1cGRhdGVlbmRcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuVUkuUkVGUkVTSF9ST09NX05VTSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yi35paw6ZK755+z5pWw6YePXHJcbiAgICB1cGRhdGFJbmZvKCkge1xyXG4gICAgICAgIHRoaXMubGFiRGlhbW9uZHMuc3RyaW5nID0gdGhpcy5nZXRGaXhOdW1iZXIoZ2xHYW1lLnVzZXIuZ2V0KFwiZGlhbW9uZFwiKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEdhbWVJZEJ5Um9vbU51bShtc2cpIHtcclxuICAgICAgICB0aGlzLmdhbWVJZCA9IG1zZy5nYW1lSWQ7XHJcbiAgICAgICAgLy8g5qOA5p+l5b2T5YmN5ri45oiP5piv5ZCm5bey57uP5Zyo5pu05paw6Zif5YiXXHJcbiAgICAgICAgaWYgKGdsR2FtZS5hc3NldHNNYW5hZ2VyLmlzVXBkYXRlUXVldWUodGhpcy5nYW1lSWQpKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIOajgOafpea4uOaIj+aYr+WQpumcgOimgeabtOaWsFxyXG4gICAgICAgIGdsR2FtZS5nYW1lbGlzdGNmZy5pc05lZWRVcGRhdGUodGhpcy5nYW1lSWQpLnRoZW4oYm9sID0+IHtcclxuICAgICAgICAgICAgaWYgKGJvbCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5byA5aeL5pu05paw44CQJXMo5ri45oiP5ZCN56ewKeOAke+8jOivt+iAkOW/g+etieW+hS4uLlxyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dUaXAoYOW8gOWni+abtOaWsOOAkCR7Z2xHYW1lLnJvb20uZ2V0R2FtZURpY3RCeUlkKHRoaXMuZ2FtZUlkKX3jgJHvvIzor7fogJDlv4PnrYnlvoUuLi5gKTtcclxuICAgICAgICAgICAgICAgIGxldCBnYW1lTmFtZSA9IGdsR2FtZS5zY2VuZS5nZXRTY2VuZU5hbWVCeUlEKHRoaXMuZ2FtZUlkKTtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5nYW1lbGlzdGNmZy5zZXRHYW1lVXBkYXRlKGdhbWVOYW1lLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUuYXNzZXRzTWFuYWdlci5nYW1lVXBkYXRhKHtnYW1lSUQ6IHRoaXMuZ2FtZUlkLCBtYW5pZmVzdFVybDogbnVsbH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5yb29tLkVudGVyUm9vbUNoZWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9vbWdhbWV1cGRhdGVlbmQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLnJvb20uRW50ZXJSb29tQ2hlY2soKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2xvc2VcIjogdGhpcy5yZW1vdmUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fbnVtY2xvc2VcIjogdGhpcy5jbGlja19udW1jbG9zZSgpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9udW1yZXR1cm5cIjogdGhpcy5jbGlja19udW1yZXR1cm4oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYWRkXCI6IGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJleGNoYW5nZURpYW1vbmRcIik7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZihcImJ0bl9udW1cIikgPiAtMSkgcmV0dXJuIHRoaXMuY2xpY2tfbnVtYmVyKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19udW1iZXIoZXZlbnQsIHR5cGUpIHtcclxuICAgICAgICBnbEdhbWUuYXVkaW8ucGxheUxvYWRTb3VuZEVmZmVjdEJ5UGF0aChcImNsaWNrXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmluZGV4ID4gdGhpcy5pbmRleE1heCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gbmFtZS5zdWJzdHJpbmcoNyk7XHJcbiAgICAgICAgdGhpcy5sYWJfcm9vbWlkW3RoaXMuaW5kZXgrK10uc3RyaW5nID0gdGV4dDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPiB0aGlzLmluZGV4TWF4KSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8g6L+b5YWl5ri45oiPXHJcbiAgICAgICAgICAgIGxldCBudW1TdHIgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5sYWJfcm9vbWlkKSBudW1TdHIgKz0gdGhpcy5sYWJfcm9vbWlkW2tleV0uc3RyaW5nO1xyXG4gICAgICAgICAgICBnbEdhbWUucm9vbS5nZXRHYW1lSWRCeVJvb21OdW0oeyByb29tTnVtOiBudW1TdHIgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfbnVtY2xvc2UoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmF1ZGlvLnBsYXlMb2FkU291bmRFZmZlY3RCeVBhdGgoXCJjbGlja1wiKTtcclxuICAgICAgICBpZiAodGhpcy5pbmRleCA8PSB0aGlzLmluZGV4TWluKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuaW5kZXhNaW47XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMubGFiX3Jvb21pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYl9yb29taWRba2V5XS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfbnVtcmV0dXJuKCkge1xyXG4gICAgICAgIGdsR2FtZS5hdWRpby5wbGF5TG9hZFNvdW5kRWZmZWN0QnlQYXRoKFwiY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IE1hdGgubWluKHRoaXMuaW5kZXgsIHRoaXMuaW5kZXhNYXgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxhYl9yb29taWRbdGhpcy5pbmRleF0uc3RyaW5nID09IFwiXCIpIHRoaXMuaW5kZXggPSBNYXRoLm1heCh0aGlzLmluZGV4IC0gMSwgdGhpcy5pbmRleE1pbik7XHJcbiAgICAgICAgdGhpcy5sYWJfcm9vbWlkW3RoaXMuaW5kZXhdLnN0cmluZyA9IFwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpeE51bWJlcih2YWx1ZSkge1xyXG4gICAgICAgIGxldCB2YWx1ZTEgPSBOdW1iZXIodmFsdWUpLmRpdigxMCk7XHJcbiAgICAgICAgdmFsdWUgPSBOdW1iZXIodmFsdWUpLmRpdigxMDApO1xyXG4gICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHJldHVybjtcclxuICAgICAgICBpZiAofn52YWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh+fnZhbHVlMSA9PT0gdmFsdWUxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcbn0pIl19
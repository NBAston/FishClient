
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/debug/debugpanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e08b8lLen1NB6EpbnBfU4D2', 'debugpanel');
// modules/public/script/debug/debugpanel.js

"use strict";

glGame.baseclass.extend({
  properties: {
    gameGainFee: cc.EditBox,
    gameHiddenFee: cc.EditBox,
    gameProfit: cc.EditBox,
    userLoseMoney: cc.EditBox,
    userGainFee: cc.EditBox,
    userHiddenFee: cc.EditBox
  },
  onLoad: function onLoad() {
    this.node.zIndex = 1000;

    if (cc.director.getScene().name == "plaza") {
      this.node.getChildByName("userinfo").active = false;
      this.node.getChildByName("tip").active = true;
    }
  },
  init: function init(data) {
    this.gameGainFee.placeholder = data.game_gain_fee;
    this.gameHiddenFee.placeholder = data.game_hidden_fee;
    this.gameProfit.placeholder = data.game_profit;
    this.userLoseMoney.placeholder = data.user_lose_money;
    this.userGainFee.placeholder = data.user_gain_fee;
    this.userHiddenFee.placeholder = data.user_hidden_fee;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "changeBtn":
        this.changeBtnCB();
        break;

      case "close":
        this.click_close();
        break;
    }
  },
  changeBtnCB: function changeBtnCB() {
    var game_id = glGame.room.get("curEnterGameID"),
        rank_index = glGame.room.get("curEnterGameRank");

    if (cc.director.getScene().name == "laba") {
      game_id = 31;
      rank_index = 1;
    }

    var msg = {
      game_id: game_id,
      rank: rank_index,
      game_gain_fee: parseFloat(this.gameGainFee.string || this.gameGainFee.placeholder),
      game_hidden_fee: parseFloat(this.gameHiddenFee.string || this.gameHiddenFee.placeholder),
      game_profit: parseFloat(this.gameProfit.string || this.gameProfit.placeholder),
      user_gain_fee: parseFloat(this.userGainFee.string || this.userGainFee.placeholder),
      user_hidden_fee: parseFloat(this.userHiddenFee.string || this.userHiddenFee.placeholder),
      user_lose_money: parseFloat(this.userLoseMoney.string || this.userLoseMoney.placeholder)
    };
    glGame.gameNet.send_msg("http.ReqEditGameProfit", msg);
  },
  click_close: function click_close() {
    glGame.user.reqMyInfo();
    this.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXGRlYnVnXFxkZWJ1Z3BhbmVsLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJnYW1lR2FpbkZlZSIsImNjIiwiRWRpdEJveCIsImdhbWVIaWRkZW5GZWUiLCJnYW1lUHJvZml0IiwidXNlckxvc2VNb25leSIsInVzZXJHYWluRmVlIiwidXNlckhpZGRlbkZlZSIsIm9uTG9hZCIsIm5vZGUiLCJ6SW5kZXgiLCJkaXJlY3RvciIsImdldFNjZW5lIiwibmFtZSIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwiaW5pdCIsImRhdGEiLCJwbGFjZWhvbGRlciIsImdhbWVfZ2Fpbl9mZWUiLCJnYW1lX2hpZGRlbl9mZWUiLCJnYW1lX3Byb2ZpdCIsInVzZXJfbG9zZV9tb25leSIsInVzZXJfZ2Fpbl9mZWUiLCJ1c2VyX2hpZGRlbl9mZWUiLCJvbkNsaWNrIiwiY2hhbmdlQnRuQ0IiLCJjbGlja19jbG9zZSIsImdhbWVfaWQiLCJyb29tIiwiZ2V0IiwicmFua19pbmRleCIsIm1zZyIsInJhbmsiLCJwYXJzZUZsb2F0Iiwic3RyaW5nIiwiZ2FtZU5ldCIsInNlbmRfbXNnIiwidXNlciIsInJlcU15SW5mbyIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUMsRUFBRSxDQUFDQyxPQURSO0FBRVJDLElBQUFBLGFBQWEsRUFBRUYsRUFBRSxDQUFDQyxPQUZWO0FBR1JFLElBQUFBLFVBQVUsRUFBRUgsRUFBRSxDQUFDQyxPQUhQO0FBSVJHLElBQUFBLGFBQWEsRUFBRUosRUFBRSxDQUFDQyxPQUpWO0FBS1JJLElBQUFBLFdBQVcsRUFBRUwsRUFBRSxDQUFDQyxPQUxSO0FBTVJLLElB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LFdBQWpEO0FBUnJCLEtBQVY7QUFVQXRCLElBQUFBLE1BQU0sQ0FBQ3dDLE9BQVAsQ0FBZUMsUUFBZixDQUF3Qix3QkFBeEIsRUFBa0RMLEdBQWxEO0FBQ0gsR0FwRG1CO0FBc0RwQkwsRUFBQUEsV0F0RG9CLHlCQXNETjtBQUNWL0IsSUFBQUEsTUFBTSxDQUFDMEMsSUFBUCxDQUFZQyxTQUFaO0FBQ0EsU0FBS0MsTUFBTDtBQUNIO0FBekRtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdhbWVHYWluRmVlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIGdhbWVIaWRkZW5GZWU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgZ2FtZVByb2ZpdDogY2MuRWRpdEJveCxcclxuICAgICAgICB1c2VyTG9zZU1vbmV5OiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIHVzZXJHYWluRmVlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIHVzZXJIaWRkZW5GZWU6IGNjLkVkaXRCb3hcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDAwO1xyXG4gICAgICAgIGlmIChjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWUgPT0gXCJwbGF6YVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVzZXJpbmZvXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUdhaW5GZWUucGxhY2Vob2xkZXIgPSBkYXRhLmdhbWVfZ2Fpbl9mZWU7XHJcbiAgICAgICAgdGhpcy5nYW1lSGlkZGVuRmVlLnBsYWNlaG9sZGVyID0gZGF0YS5nYW1lX2hpZGRlbl9mZWU7XHJcbiAgICAgICAgdGhpcy5nYW1lUHJvZml0LnBsYWNlaG9sZGVyID0gZGF0YS5nYW1lX3Byb2ZpdDtcclxuICAgICAgICB0aGlzLnVzZXJMb3NlTW9uZXkucGxhY2Vob2xkZXIgPSBkYXRhLnVzZXJfbG9zZV9tb25leTtcclxuICAgICAgICB0aGlzLnVzZXJHYWluRmVlLnBsYWNlaG9sZGVyID0gZGF0YS51c2VyX2dhaW5fZmVlO1xyXG4gICAgICAgIHRoaXMudXNlckhpZGRlbkZlZS5wbGFjZWhvbGRlciA9IGRhdGEudXNlcl9oaWRkZW5fZmVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNoYW5nZUJ0blwiOiB0aGlzLmNoYW5nZUJ0bkNCKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5jbGlja19jbG9zZSgpOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZUJ0bkNCKCkge1xyXG4gICAgICAgIGxldCBnYW1lX2lkID0gZ2xHYW1lLnJvb20uZ2V0KFwiY3VyRW50ZXJHYW1lSURcIiksXHJcbiAgICAgICAgICAgIHJhbmtfaW5kZXggPSBnbEdhbWUucm9vbS5nZXQoXCJjdXJFbnRlckdhbWVSYW5rXCIpO1xyXG4gICAgICAgICAgICBpZihjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWUgPT0gXCJsYWJhXCIpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZV9pZCA9IDMxO1xyXG4gICAgICAgICAgICAgICAgcmFua19pbmRleCA9IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGxldCBtc2cgPSB7XHJcbiAgICAgICAgICAgIGdhbWVfaWQ6IGdhbWVfaWQsXHJcbiAgICAgICAgICAgIHJhbms6IHJhbmtfaW5kZXgsXHJcbiAgICAgICAgICAgIGdhbWVfZ2Fpbl9mZWU6IHBhcnNlRmxvYXQodGhpcy5nYW1lR2FpbkZlZS5zdHJpbmcgfHwgdGhpcy5nYW1lR2FpbkZlZS5wbGFjZWhvbGRlciksXHJcbiAgICAgICAgICAgIGdhbWVfaGlkZGVuX2ZlZTogcGFyc2VGbG9hdCh0aGlzLmdhbWVIaWRkZW5GZWUuc3RyaW5nIHx8IHRoaXMuZ2FtZUhpZGRlbkZlZS5wbGFjZWhvbGRlciksXHJcbiAgICAgICAgICAgIGdhbWVfcHJvZml0OiBwYXJzZUZsb2F0KHRoaXMuZ2FtZVByb2ZpdC5zdHJpbmcgfHwgdGhpcy5nYW1lUHJvZml0LnBsYWNlaG9sZGVyKSxcclxuICAgICAgICAgICAgdXNlcl9nYWluX2ZlZTogcGFyc2VGbG9hdCh0aGlzLnVzZXJHYWluRmVlLnN0cmluZyB8fCB0aGlzLnVzZXJHYWluRmVlLnBsYWNlaG9sZGVyKSxcclxuICAgICAgICAgICAgdXNlcl9oaWRkZW5fZmVlOiBwYXJzZUZsb2F0KHRoaXMudXNlckhpZGRlbkZlZS5zdHJpbmcgfHwgdGhpcy51c2VySGlkZGVuRmVlLnBsYWNlaG9sZGVyKSxcclxuICAgICAgICAgICAgdXNlcl9sb3NlX21vbmV5OiBwYXJzZUZsb2F0KHRoaXMudXNlckxvc2VNb25leS5zdHJpbmcgfHwgdGhpcy51c2VyTG9zZU1vbmV5LnBsYWNlaG9sZGVyKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKFwiaHR0cC5SZXFFZGl0R2FtZVByb2ZpdFwiLCBtc2cpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja19jbG9zZSgpIHtcclxuICAgICAgICBnbEdhbWUudXNlci5yZXFNeUluZm8oKTtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59KTtcclxuIl19
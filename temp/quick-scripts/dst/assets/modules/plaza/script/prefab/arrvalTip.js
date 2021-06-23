
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/arrvalTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '869583tJERK55AK/Rtlf8hC', 'arrvalTip');
// modules/plaza/script/prefab/arrvalTip.js

"use strict";

//暂时-留存 -- 即将移除该类与相关预制
glGame.baseclass.extend({
  properties: {
    node_god: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //glGame.emitter.on(MESSAGE.UI.SCENE, this.refreshUi, this);
    // glGame.emitter.on("onCoinChanged", this.showArrvalTip, this);
    this.node.active = false;
  },
  start: function start() {},
  showArrvalTip: function showArrvalTip(msg) {// //抛弃保险柜的取和存的消息，已在原有回包中做自增自减
    // if (msg.type == "bankSave" || msg.type == "bankOut") return;
    // if (msg.type == 'bindPhoneReceive'){
    //     glGame.user.set('is_receive_register_phone_coin',1);
    //     glGame.emitter.emit("updatePlazaSwitch");
    // }
    // glGame.user.reqGetCoin()
    // let arrvalCoin = glGame.user.GoldTemp(msg.offset)
    // if (msg.type == "recharge") {
    //     //充值之后将首冲设为状态取消设置为1；
    //     glGame.user.set("userRecharge", {
    //         discount: glGame.user.get("userRecharge").discount,
    //         discount_max: glGame.user.get("userRecharge").discount_max,
    //         exists: 1
    //     })
    //     // glGame.panel.showGodOfWealth(this.node_god, arrvalCoin)
    //     glGame.emitter.emit(glGame.showGodOfWealth,{pos:3,coin:arrvalCoin});
    // }
  },
  OnDestroy: function OnDestroy() {// glGame.emitter.off("onCoinChanged", this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxhcnJ2YWxUaXAuanMiXSwibmFtZXMiOlsiZ2xHYW1lIiwiYmFzZWNsYXNzIiwiZXh0ZW5kIiwicHJvcGVydGllcyIsIm5vZGVfZ29kIiwiY2MiLCJOb2RlIiwib25Mb2FkIiwibm9kZSIsImFjdGl2ZSIsInN0YXJ0Iiwic2hvd0FycnZhbFRpcCIsIm1zZyIsIk9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBRXBCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFQyxFQUFFLENBQUNDO0FBREwsR0FGUTtBQU1wQjtBQUNBQyxFQUFBQSxNQVBvQixvQkFPWDtBQUNMO0FBQ0E7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsS0FBbkI7QUFDSCxHQVhtQjtBQVlwQkMsRUFBQUEsS0Fab0IsbUJBWVosQ0FFUCxDQWRtQjtBQWVwQkMsRUFBQUEsYUFmb0IseUJBZU5DLEdBZk0sRUFlRCxDQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEdBbENtQjtBQW9DcEJDLEVBQUFBLFNBcENvQix1QkFvQ1IsQ0FDUjtBQUNIO0FBdENtQixDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/mmoLml7Yt55WZ5a2YIC0tIOWNs+Wwhuenu+mZpOivpeexu+S4juebuOWFs+mihOWItlxyXG5nbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5vZGVfZ29kOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvL2dsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuVUkuU0NFTkUsIHRoaXMucmVmcmVzaFVpLCB0aGlzKTtcclxuICAgICAgICAvLyBnbEdhbWUuZW1pdHRlci5vbihcIm9uQ29pbkNoYW5nZWRcIiwgdGhpcy5zaG93QXJydmFsVGlwLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHNob3dBcnJ2YWxUaXAobXNnKSB7XHJcbiAgICAgICAgLy8gLy/mipvlvIPkv53pmanmn5znmoTlj5blkozlrZjnmoTmtojmga/vvIzlt7LlnKjljp/mnInlm57ljIXkuK3lgZroh6rlop7oh6rlh49cclxuICAgICAgICAvLyBpZiAobXNnLnR5cGUgPT0gXCJiYW5rU2F2ZVwiIHx8IG1zZy50eXBlID09IFwiYmFua091dFwiKSByZXR1cm47XHJcbiAgICAgICAgLy8gaWYgKG1zZy50eXBlID09ICdiaW5kUGhvbmVSZWNlaXZlJyl7XHJcbiAgICAgICAgLy8gICAgIGdsR2FtZS51c2VyLnNldCgnaXNfcmVjZWl2ZV9yZWdpc3Rlcl9waG9uZV9jb2luJywxKTtcclxuICAgICAgICAvLyAgICAgZ2xHYW1lLmVtaXR0ZXIuZW1pdChcInVwZGF0ZVBsYXphU3dpdGNoXCIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBnbEdhbWUudXNlci5yZXFHZXRDb2luKClcclxuICAgICAgICAvLyBsZXQgYXJydmFsQ29pbiA9IGdsR2FtZS51c2VyLkdvbGRUZW1wKG1zZy5vZmZzZXQpXHJcbiAgICAgICAgLy8gaWYgKG1zZy50eXBlID09IFwicmVjaGFyZ2VcIikge1xyXG4gICAgICAgIC8vICAgICAvL+WFheWAvOS5i+WQjuWwhummluWGsuiuvuS4uueKtuaAgeWPlua2iOiuvue9ruS4ujHvvJtcclxuICAgICAgICAvLyAgICAgZ2xHYW1lLnVzZXIuc2V0KFwidXNlclJlY2hhcmdlXCIsIHtcclxuICAgICAgICAvLyAgICAgICAgIGRpc2NvdW50OiBnbEdhbWUudXNlci5nZXQoXCJ1c2VyUmVjaGFyZ2VcIikuZGlzY291bnQsXHJcbiAgICAgICAgLy8gICAgICAgICBkaXNjb3VudF9tYXg6IGdsR2FtZS51c2VyLmdldChcInVzZXJSZWNoYXJnZVwiKS5kaXNjb3VudF9tYXgsXHJcbiAgICAgICAgLy8gICAgICAgICBleGlzdHM6IDFcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyAgICAgLy8gZ2xHYW1lLnBhbmVsLnNob3dHb2RPZldlYWx0aCh0aGlzLm5vZGVfZ29kLCBhcnJ2YWxDb2luKVxyXG4gICAgICAgIC8vICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KGdsR2FtZS5zaG93R29kT2ZXZWFsdGgse3BvczozLGNvaW46YXJydmFsQ29pbn0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIC8vIGdsR2FtZS5lbWl0dGVyLm9mZihcIm9uQ29pbkNoYW5nZWRcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxufSkiXX0=
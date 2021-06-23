"use strict";
cc._RF.push(module, '3682fnhIThBvI4AEBLORSZq', 'debug');
// modules/public/script/debug/debug.js

"use strict";

glGame.baseclass.extend({
  properties: {},
  onLoad: function onLoad() {
    var _this = this;

    this.node.zIndex = 1000; // 设置为常驻节点

    cc.game.addPersistRootNode(this.node);
    this.node.on("touchmove", function (event) {
      var pos = cc.director.getScene().convertToWorldSpace(event.getLocation());

      _this.node.setPosition(pos);
    }, this);
  },
  onClick: function onClick() {
    var scene = cc.director.getScene();
    if (scene.name === "start" || scene.name === "login") return;
    if (scene.name === "plaza") return glGame.panel.showDebugPanel();
    console.log("这是debug的信息", glGame.room.get("curEnterGameID"), glGame.room.get("curEnterGameRank"));

    if (scene.name === "laba") {
      glGame.gameNet.send_msg("http.ReqGetGameProfit", {
        game_id: 31,
        rank: 1
      }, function (route, data) {
        var debugPanel = glGame.panel.showDebugPanel();
        debugPanel.getComponent("debugpanel").init(data);
      });
      return;
    }

    glGame.gameNet.send_msg("http.ReqGetGameProfit", {
      game_id: glGame.room.get("curEnterGameID"),
      rank: glGame.room.get("curEnterGameRank")
    }, function (route, data) {
      var debugPanel = glGame.panel.showDebugPanel();
      debugPanel.getComponent("debugpanel").init(data);
    });
  }
});

cc._RF.pop();
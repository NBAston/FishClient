"use strict";
cc._RF.push(module, '47272yUq4tKmJzP7sUf3NHi', 'exitRoom');
// modules/public/script/exitRoom/exitRoom.js

"use strict";

glGame.baseclass.extend({
  properties: {
    hundred: cc.Node,
    coin: cc.Node
  },
  onLoad: function onLoad() {
    this.node.scale = glGame.systemclass.convertInterface();
  },
  showType: function showType(_type) {
    this[_type].active = true;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case 'btn_confirm':
        glGame.room.exitRoom();
        break;

      case 'btn_cancle':
        this.node.destroy();
        break;
    }
  }
});

cc._RF.pop();
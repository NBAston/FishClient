"use strict";
cc._RF.push(module, '7a58dvi4ldAPoZw2SA8j/MF', 'collider');
// modules/plaza/script/prefab/luckDraw/collider.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    var manager = cc.director.getCollisionManager();
    manager.enabled = true;
  },
  onCollisionEnter: function onCollisionEnter(other, self) {
    var rigidbody = this.node.getComponent(cc.RigidBody);
    rigidbody.applyLinearImpulse(cc.v2(300, 0), cc.v2(0, 0));
  } // update (dt) {},

});

cc._RF.pop();
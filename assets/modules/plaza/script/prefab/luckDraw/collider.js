cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    onCollisionEnter(other, self) {
        let rigidbody = this.node.getComponent(cc.RigidBody)
        rigidbody.applyLinearImpulse(cc.v2(300,0), cc.v2(0,0));
    },
    // update (dt) {},
});

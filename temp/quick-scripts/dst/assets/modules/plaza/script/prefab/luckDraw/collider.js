
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/luckDraw/collider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxsdWNrRHJhd1xcY29sbGlkZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJkaXJlY3RvciIsImdldFBoeXNpY3NNYW5hZ2VyIiwiZW5hYmxlZCIsIm1hbmFnZXIiLCJnZXRDb2xsaXNpb25NYW5hZ2VyIiwib25Db2xsaXNpb25FbnRlciIsIm90aGVyIiwic2VsZiIsInJpZ2lkYm9keSIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJSaWdpZEJvZHkiLCJhcHBseUxpbmVhckltcHVsc2UiLCJ2MiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBQyxFQUFBQSxNQVRLLG9CQVNLO0FBQ05KLElBQUFBLEVBQUUsQ0FBQ0ssUUFBSCxDQUFZQyxpQkFBWixHQUFnQ0MsT0FBaEMsR0FBMEMsSUFBMUM7QUFDQSxRQUFJQyxPQUFPLEdBQUdSLEVBQUUsQ0FBQ0ssUUFBSCxDQUFZSSxtQkFBWixFQUFkO0FBQ0FELElBQUFBLE9BQU8sQ0FBQ0QsT0FBUixHQUFrQixJQUFsQjtBQUNILEdBYkk7QUFjTEcsRUFBQUEsZ0JBZEssNEJBY1lDLEtBZFosRUFjbUJDLElBZG5CLEVBY3lCO0FBQzFCLFFBQUlDLFNBQVMsR0FBRyxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJmLEVBQUUsQ0FBQ2dCLFNBQTFCLENBQWhCO0FBQ0FILElBQUFBLFNBQVMsQ0FBQ0ksa0JBQVYsQ0FBNkJqQixFQUFFLENBQUNrQixFQUFILENBQU0sR0FBTixFQUFVLENBQVYsQ0FBN0IsRUFBMkNsQixFQUFFLENBQUNrQixFQUFILENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBM0M7QUFDSCxHQWpCSSxDQWtCTDs7QUFsQkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdmFyIG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XHJcbiAgICAgICAgbGV0IHJpZ2lkYm9keSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KVxyXG4gICAgICAgIHJpZ2lkYm9keS5hcHBseUxpbmVhckltcHVsc2UoY2MudjIoMzAwLDApLCBjYy52MigwLDApKTtcclxuICAgIH0sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
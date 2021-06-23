
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/util/number.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '99ac3WAvEtOdpgKSdPn0BkZ', 'number');
// frames/util/number.js

"use strict";

var Decimal = require("decimal");

Number.prototype.add = function (num) {
  return new Decimal(this.valueOf()).add(new Decimal(num)).toNumber();
};

Number.prototype.sub = function (num) {
  return new Decimal(this.valueOf()).sub(new Decimal(num)).toNumber();
};

Number.prototype.mul = function (num) {
  return new Decimal(this.valueOf()).mul(new Decimal(num)).toNumber();
};

Number.prototype.div = function (num) {
  return new Decimal(this.valueOf()).div(new Decimal(num)).toNumber();
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFx1dGlsXFxudW1iZXIuanMiXSwibmFtZXMiOlsiRGVjaW1hbCIsInJlcXVpcmUiLCJOdW1iZXIiLCJwcm90b3R5cGUiLCJhZGQiLCJudW0iLCJ2YWx1ZU9mIiwidG9OdW1iZXIiLCJzdWIiLCJtdWwiLCJkaXYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFFQUMsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxHQUFqQixHQUF1QixVQUFVQyxHQUFWLEVBQWU7QUFDbEMsU0FBTyxJQUFJTCxPQUFKLENBQVksS0FBS00sT0FBTCxFQUFaLEVBQTRCRixHQUE1QixDQUFnQyxJQUFJSixPQUFKLENBQVlLLEdBQVosQ0FBaEMsRUFBa0RFLFFBQWxELEVBQVA7QUFDSCxDQUZEOztBQUdBTCxNQUFNLENBQUNDLFNBQVAsQ0FBaUJLLEdBQWpCLEdBQXVCLFVBQVVILEdBQVYsRUFBZTtBQUNsQyxTQUFPLElBQUlMLE9BQUosQ0FBWSxLQUFLTSxPQUFMLEVBQVosRUFBNEJFLEdBQTVCLENBQWdDLElBQUlSLE9BQUosQ0FBWUssR0FBWixDQUFoQyxFQUFrREUsUUFBbEQsRUFBUDtBQUNILENBRkQ7O0FBR0FMLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQk0sR0FBakIsR0FBdUIsVUFBVUosR0FBVixFQUFlO0FBQ2xDLFNBQU8sSUFBSUwsT0FBSixDQUFZLEtBQUtNLE9BQUwsRUFBWixFQUE0QkcsR0FBNUIsQ0FBZ0MsSUFBSVQsT0FBSixDQUFZSyxHQUFaLENBQWhDLEVBQWtERSxRQUFsRCxFQUFQO0FBQ0gsQ0FGRDs7QUFHQUwsTUFBTSxDQUFDQyxTQUFQLENBQWlCTyxHQUFqQixHQUF1QixVQUFVTCxHQUFWLEVBQWU7QUFDbEMsU0FBTyxJQUFJTCxPQUFKLENBQVksS0FBS00sT0FBTCxFQUFaLEVBQTRCSSxHQUE1QixDQUFnQyxJQUFJVixPQUFKLENBQVlLLEdBQVosQ0FBaEMsRUFBa0RFLFFBQWxELEVBQVA7QUFDSCxDQUZEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgRGVjaW1hbCA9IHJlcXVpcmUoXCJkZWNpbWFsXCIpO1xyXG5cclxuTnVtYmVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICByZXR1cm4gbmV3IERlY2ltYWwodGhpcy52YWx1ZU9mKCkpLmFkZChuZXcgRGVjaW1hbChudW0pKS50b051bWJlcigpO1xyXG59XHJcbk51bWJlci5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gKG51bSkge1xyXG4gICAgcmV0dXJuIG5ldyBEZWNpbWFsKHRoaXMudmFsdWVPZigpKS5zdWIobmV3IERlY2ltYWwobnVtKSkudG9OdW1iZXIoKTtcclxufVxyXG5OdW1iZXIucHJvdG90eXBlLm11bCA9IGZ1bmN0aW9uIChudW0pIHtcclxuICAgIHJldHVybiBuZXcgRGVjaW1hbCh0aGlzLnZhbHVlT2YoKSkubXVsKG5ldyBEZWNpbWFsKG51bSkpLnRvTnVtYmVyKCk7XHJcbn1cclxuTnVtYmVyLnByb3RvdHlwZS5kaXYgPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICByZXR1cm4gbmV3IERlY2ltYWwodGhpcy52YWx1ZU9mKCkpLmRpdihuZXcgRGVjaW1hbChudW0pKS50b051bWJlcigpO1xyXG59Il19
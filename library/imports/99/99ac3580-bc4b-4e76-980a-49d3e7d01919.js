"use strict";
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
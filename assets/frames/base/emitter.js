
/**
 * Module dependencies.
 */
var indexOf = [].indexOf;
var index = function (arr, obj) {
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i].obj === obj) return i;
  }
  return -1;
};

/**
 * Expose `Emitter`.
 */
let g_instance = null;
let bEmitter = false;
module.exports = function () {
  if (!g_instance) {
    g_instance = new Emitter();
  }
  return g_instance;
};

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
  * Prints to `stdout` with newline.
  */

Emitter.prototype.emitterlog = function (message, ...optionalParams) {
  if (!bEmitter) return;
  console.log(message, ...optionalParams);
};

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @param {Object} obj
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = function (event, fn, obj) {
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || []);
  this._push(event, { func: fn, obj: obj });
  this.emitterlog("注册了事件监听", event, this._callbacks[event].length);
  return this;
};

/**
 * Avoid repeated additions
 * @param {String} event 
 * @param {any} pushData 
 */
Emitter.prototype._push = function (event, pushData) {
  for (let data of this._callbacks[event]){
    if (data.obj === pushData.obj)return ;
  }
  this._callbacks[event].push(pushData);
}

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @param {Object} obj
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn, obj) {
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    this.emitterlog("触发了一次性事件", event)
    self.off(event, on);
    fn.apply(obj, arguments);
  }

  fn._off = on;
  this.on(event, on, obj);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} obj
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners = function (event, obj) {
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this.emitterlog("清空所有事件回调")
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks[event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      this.emitterlog("清空事件回调", event)
      delete this._callbacks[event];
      return this;
    }

    // remove specific handler
    var i = index(callbacks, obj);
    if (~i) {
      this.emitterlog("销毁了事件", event, i);
      callbacks.splice(i, 1);
    }
    return this;
  };

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    this.emitterlog("发送了事件", event, args)
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      let obj = callbacks[i].obj
      callbacks[i].func.apply(obj, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

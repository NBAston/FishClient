
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/base/emitter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'abb10KVXDBNjL9FVznIoLT7', 'emitter');
// frames/base/emitter.js

"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Module dependencies.
 */
var indexOf = [].indexOf;

var index = function index(arr, obj) {
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i].obj === obj) return i;
  }

  return -1;
};
/**
 * Expose `Emitter`.
 */


var g_instance = null;
var bEmitter = false;

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
}

;
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


Emitter.prototype.emitterlog = function (message) {
  var _console;

  if (!bEmitter) return;

  for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    optionalParams[_key - 1] = arguments[_key];
  }

  (_console = console).log.apply(_console, [message].concat(optionalParams));
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
  this._callbacks[event] = this._callbacks[event] || [];

  this._push(event, {
    func: fn,
    obj: obj
  });

  this.emitterlog("注册了事件监听", event, this._callbacks[event].length);
  return this;
};
/**
 * Avoid repeated additions
 * @param {String} event 
 * @param {any} pushData 
 */


Emitter.prototype._push = function (event, pushData) {
  var _iterator = _createForOfIteratorHelper(this._callbacks[event]),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var data = _step.value;
      if (data.obj === pushData.obj) return;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  this._callbacks[event].push(pushData);
};
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
    this.emitterlog("触发了一次性事件", event);
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


Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = function (event, obj) {
  this._callbacks = this._callbacks || {}; // all

  if (0 == arguments.length) {
    this.emitterlog("清空所有事件回调");
    this._callbacks = {};
    return this;
  } // specific event


  var callbacks = this._callbacks[event];
  if (!callbacks) return this; // remove all handlers

  if (1 == arguments.length) {
    this.emitterlog("清空事件回调", event);
    delete this._callbacks[event];
    return this;
  } // remove specific handler


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
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks[event];

  if (callbacks) {
    this.emitterlog("发送了事件", event, args);
    callbacks = callbacks.slice(0);

    for (var i = 0, len = callbacks.length; i < len; ++i) {
      var obj = callbacks[i].obj;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVzXFxiYXNlXFxlbWl0dGVyLmpzIl0sIm5hbWVzIjpbImluZGV4T2YiLCJpbmRleCIsImFyciIsIm9iaiIsImkiLCJsZW5ndGgiLCJnX2luc3RhbmNlIiwiYkVtaXR0ZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiRW1pdHRlciIsIm1peGluIiwia2V5IiwicHJvdG90eXBlIiwiZW1pdHRlcmxvZyIsIm1lc3NhZ2UiLCJvcHRpb25hbFBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJvbiIsImV2ZW50IiwiZm4iLCJfY2FsbGJhY2tzIiwiX3B1c2giLCJmdW5jIiwicHVzaERhdGEiLCJkYXRhIiwicHVzaCIsIm9uY2UiLCJzZWxmIiwib2ZmIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfb2ZmIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJjYWxsYmFja3MiLCJzcGxpY2UiLCJlbWl0IiwiYXJncyIsInNsaWNlIiwiY2FsbCIsImxlbiIsImxpc3RlbmVycyIsImhhc0xpc3RlbmVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7O0FBR0EsSUFBSUEsT0FBTyxHQUFHLEdBQUdBLE9BQWpCOztBQUNBLElBQUlDLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQVVDLEdBQVYsRUFBZUMsR0FBZixFQUFvQjtBQUM5QixPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLEdBQUcsQ0FBQ0csTUFBeEIsRUFBZ0MsRUFBRUQsQ0FBbEMsRUFBcUM7QUFDbkMsUUFBSUYsR0FBRyxDQUFDRSxDQUFELENBQUgsQ0FBT0QsR0FBUCxLQUFlQSxHQUFuQixFQUF3QixPQUFPQyxDQUFQO0FBQ3pCOztBQUNELFNBQU8sQ0FBQyxDQUFSO0FBQ0QsQ0FMRDtBQU9BOzs7OztBQUdBLElBQUlFLFVBQVUsR0FBRyxJQUFqQjtBQUNBLElBQUlDLFFBQVEsR0FBRyxLQUFmOztBQUNBQyxNQUFNLENB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eEIsS0FBVixFQUFpQjtBQUNoRCxTQUFPLENBQUMsQ0FBQyxLQUFLdUIsU0FBTCxDQUFldkIsS0FBZixFQUFzQmYsTUFBL0I7QUFDRCxDQUZEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL1xyXG52YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XHJcbnZhciBpbmRleCA9IGZ1bmN0aW9uIChhcnIsIG9iaikge1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XHJcbiAgICBpZiAoYXJyW2ldLm9iaiA9PT0gb2JqKSByZXR1cm4gaTtcclxuICB9XHJcbiAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL1xyXG5sZXQgZ19pbnN0YW5jZSA9IG51bGw7XHJcbmxldCBiRW1pdHRlciA9IGZhbHNlO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAoIWdfaW5zdGFuY2UpIHtcclxuICAgIGdfaW5zdGFuY2UgPSBuZXcgRW1pdHRlcigpO1xyXG4gIH1cclxuICByZXR1cm4gZ19pbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAgKiBQcmludHMgdG8gYHN0ZG91dGAgd2l0aCBuZXdsaW5lLlxyXG4gICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0dGVybG9nID0gZnVuY3Rpb24gKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKSB7XHJcbiAgaWYgKCFiRW1pdHRlcikgcmV0dXJuO1xyXG4gIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBmbiwgb2JqKSB7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSk7XHJcbiAgdGhpcy5fcHVzaChldmVudCwgeyBmdW5jOiBmbiwgb2JqOiBvYmogfSk7XHJcbiAgdGhpcy5lbWl0dGVybG9nKFwi5rOo5YaM5LqG5LqL5Lu255uR5ZCsXCIsIGV2ZW50LCB0aGlzLl9jYWxsYmFja3NbZXZlbnRdLmxlbmd0aCk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQXZvaWQgcmVwZWF0ZWQgYWRkaXRpb25zXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBcclxuICogQHBhcmFtIHthbnl9IHB1c2hEYXRhIFxyXG4gKi9cclxuRW1pdHRlci5wcm90b3R5cGUuX3B1c2ggPSBmdW5jdGlvbiAoZXZlbnQsIHB1c2hEYXRhKSB7XHJcbiAgZm9yIChsZXQgZGF0YSBvZiB0aGlzLl9jYWxsYmFja3NbZXZlbnRdKXtcclxuICAgIGlmIChkYXRhLm9iaiA9PT0gcHVzaERhdGEub2JqKXJldHVybiA7XHJcbiAgfVxyXG4gIHRoaXMuX2NhbGxiYWNrc1tldmVudF0ucHVzaChwdXNoRGF0YSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBmbiwgb2JqKSB7XHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLmVtaXR0ZXJsb2coXCLop6blj5HkuobkuIDmrKHmgKfkuovku7ZcIiwgZXZlbnQpXHJcbiAgICBzZWxmLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkob2JqLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgZm4uX29mZiA9IG9uO1xyXG4gIHRoaXMub24oZXZlbnQsIG9uLCBvYmopO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb2JqXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cclxuICBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbiAgRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgICAvLyBhbGxcclxuICAgIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5lbWl0dGVybG9nKFwi5riF56m65omA5pyJ5LqL5Lu25Zue6LCDXCIpXHJcbiAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBzcGVjaWZpYyBldmVudFxyXG4gICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XHJcbiAgICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gICAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmVtaXR0ZXJsb2coXCLmuIXnqbrkuovku7blm57osINcIiwgZXZlbnQpXHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gICAgdmFyIGkgPSBpbmRleChjYWxsYmFja3MsIG9iaik7XHJcbiAgICBpZiAofmkpIHtcclxuICAgICAgdGhpcy5lbWl0dGVybG9nKFwi6ZSA5q+B5LqG5LqL5Lu2XCIsIGV2ZW50LCBpKTtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4vKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIHRoaXMuZW1pdHRlcmxvZyhcIuWPkemAgeS6huS6i+S7tlwiLCBldmVudCwgYXJncylcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgbGV0IG9iaiA9IGNhbGxiYWNrc1tpXS5vYmpcclxuICAgICAgY2FsbGJhY2tzW2ldLmZ1bmMuYXBwbHkob2JqLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICByZXR1cm4gISF0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG4iXX0=
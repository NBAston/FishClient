
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frames/net/pomelo/protocol.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}(function (Buffer){
"use strict";
cc._RF.push(module, '33a92JJsX1FX7opbirwgfli', 'protocol');
// frames/net/pomelo/protocol.js

"use strict";

(function (exports, ByteArray, global) {
  var Protocol = exports;
  var PKG_HEAD_BYTES = 4;
  var MSG_FLAG_BYTES = 1;
  var MSG_ROUTE_CODE_BYTES = 2;
  var MSG_ID_MAX_BYTES = 5;
  var MSG_ROUTE_LEN_BYTES = 1;
  var MSG_ROUTE_CODE_MAX = 0xffff;
  var MSG_COMPRESS_ROUTE_MASK = 0x1;
  var MSG_TYPE_MASK = 0x7;
  var Package = Protocol.Package = {};
  var Message = Protocol.Message = {};
  Package.TYPE_HANDSHAKE = 1;
  Package.TYPE_HANDSHAKE_ACK = 2;
  Package.TYPE_HEARTBEAT = 3;
  Package.TYPE_DATA = 4;
  Package.TYPE_KICK = 5;
  Message.TYPE_REQUEST = 0;
  Message.TYPE_NOTIFY = 1;
  Message.TYPE_RESPONSE = 2;
  Message.TYPE_PUSH = 3;
  /**
   * pomele client encode
   * id message id;
   * route message route
   * msg message body
   * socketio current support string
   */

  Protocol.strencode = function (str) {
    var byteArray = new ByteArray(str.length * 3);
    var offset = 0;

    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      var codes = null;

      if (charCode <= 0x7f) {
        codes = [charCode];
      } else if (charCode <= 0x7ff) {
        codes = [0xc0 | charCode >> 6, 0x80 | charCode & 0x3f];
      } else {
        codes = [0xe0 | charCode >> 12, 0x80 | (charCode & 0xfc0) >> 6, 0x80 | charCode & 0x3f];
      }

      for (var j = 0; j < codes.length; j++) {
        byteArray[offset] = codes[j];
        ++offset;
      }
    }

    var _buffer = new ByteArray(offset);

    copyArray(_buffer, 0, byteArray, 0, offset);
    return _buffer;
  };
  /**
   * client decode
   * msg String data
   * return Message Object
   */


  Protocol.strdecode = function (buffer) {
    var bytes = new ByteArray(buffer);
    var array = [];
    var offset = 0;
    var charCode = 0;
    var end = bytes.length;

    while (offset < end) {
      if (bytes[offset] < 128) {
        charCode = bytes[offset];
        offset += 1;
      } else if (bytes[offset] < 224) {
        charCode = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
        offset += 2;
      } else {
        charCode = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
        offset += 3;
      }

      array.push(charCode);
    }

    return String.fromCharCode.apply(null, array);
  };
  /**
   * Package protocol encode.
   *
   * Pomelo package format:
   * +------+-------------+------------------+
   * | type | body length |       body       |
   * +------+-------------+------------------+
   *
   * Head: 4bytes
   *   0: package type,
   *      1 - handshake,
   *      2 - handshake ack,
   *      3 - heartbeat,
   *      4 - data
   *      5 - kick
   *   1 - 3: big-endian body length
   * Body: body length bytes
   *
   * @param  {Number}    type   package type
   * @param  {ByteArray} body   body content in bytes
   * @return {ByteArray}        new byte array that contains encode result
   */


  Package.encode = function (type, body) {
    var length = body ? body.length : 0;
    var buffer = new ByteArray(PKG_HEAD_BYTES + length);
    var index = 0;
    buffer[index++] = type & 0xff;
    buffer[index++] = length >> 16 & 0xff;
    buffer[index++] = length >> 8 & 0xff;
    buffer[index++] = length & 0xff;

    if (body) {
      copyArray(buffer, index, body, 0, length);
    }

    return buffer;
  };
  /**
   * Package protocol decode.
   * See encode for package format.
   *
   * @param  {ByteArray} buffer byte array containing package content
   * @return {Object}           {type: package type, buffer: body byte array}
   */


  Package.decode = function (buffer) {
    var offset = 0;
    var bytes = new ByteArray(buffer);
    var length = 0;
    var rs = [];

    while (offset < bytes.length) {
      var type = bytes[offset++];
      length = (bytes[offset++] << 16 | bytes[offset++] << 8 | bytes[offset++]) >>> 0;
      var body = length ? new ByteArray(length) : null;
      copyArray(body, 0, bytes, offset, length);
      offset += length;
      rs.push({
        'type': type,
        'body': body
      });
    }

    return rs.length === 1 ? rs[0] : rs;
  };
  /**
   * Message protocol encode.
   *
   * @param  {Number} id            message id
   * @param  {Number} type          message type
   * @param  {Number} compressRoute whether compress route
   * @param  {Number|String} route  route code or route string
   * @param  {Buffer} msg           message body bytes
   * @return {Buffer}               encode result
   */


  Message.encode = function (id, type, compressRoute, route, msg) {
    // caculate message max length
    var idBytes = msgHasId(type) ? caculateMsgIdBytes(id) : 0;
    var msgLen = MSG_FLAG_BYTES + idBytes;

    if (msgHasRoute(type)) {
      if (compressRoute) {
        if (typeof route !== 'number') {
          throw new Error('error flag for number route!');
        }

        msgLen += MSG_ROUTE_CODE_BYTES;
      } else {
        msgLen += MSG_ROUTE_LEN_BYTES;

        if (route) {
          route = Protocol.strencode(route);

          if (route.length > 255) {
            throw new Error('route maxlength is overflow');
          }

          msgLen += route.length;
        }
      }
    }

    if (msg) {
      msgLen += msg.length;
    }

    var buffer = new ByteArray(msgLen);
    var offset = 0; // add flag

    offset = encodeMsgFlag(type, compressRoute, buffer, offset); // add message id

    if (msgHasId(type)) {
      offset = encodeMsgId(id, buffer, offset);
    } // add route


    if (msgHasRoute(type)) {
      offset = encodeMsgRoute(compressRoute, route, buffer, offset);
    } // add body


    if (msg) {
      offset = encodeMsgBody(msg, buffer, offset);
    }

    return buffer;
  };
  /**
   * Message protocol decode.
   *
   * @param  {Buffer|Uint8Array} buffer message bytes
   * @return {Object}            message object
   */


  Message.decode = function (buffer) {
    var bytes = new ByteArray(buffer);
    var bytesLen = bytes.length || bytes.byteLength;
    var offset = 0;
    var id = 0;
    var route = null; // parse flag

    var flag = bytes[offset++];
    var compressRoute = flag & MSG_COMPRESS_ROUTE_MASK;
    var type = flag >> 1 & MSG_TYPE_MASK; // parse id

    if (msgHasId(type)) {
      var m = parseInt(bytes[offset]);
      var i = 0;

      do {
        var m = parseInt(bytes[offset]);
        id = id + (m & 0x7f) * Math.pow(2, 7 * i);
        offset++;
        i++;
      } while (m >= 128);
    } // parse route


    if (msgHasRoute(type)) {
      if (compressRoute) {
        route = bytes[offset++] << 8 | bytes[offset++];
      } else {
        var routeLen = bytes[offset++];

        if (routeLen) {
          route = new ByteArray(routeLen);
          copyArray(route, 0, bytes, offset, routeLen);
          route = Protocol.strdecode(route);
        } else {
          route = '';
        }

        offset += routeLen;
      }
    } // parse body


    var bodyLen = bytesLen - offset;
    var body = new ByteArray(bodyLen);
    copyArray(body, 0, bytes, offset, bodyLen);
    return {
      'id': id,
      'type': type,
      'compressRoute': compressRoute,
      'route': route,
      'body': body
    };
  };

  var copyArray = function copyArray(dest, doffset, src, soffset, length) {
    if ('function' === typeof src.copy) {
      // Buffer
      src.copy(dest, doffset, soffset, soffset + length);
    } else {
      // Uint8Array
      for (var index = 0; index < length; index++) {
        dest[doffset++] = src[soffset++];
      }
    }
  };

  var msgHasId = function msgHasId(type) {
    return type === Message.TYPE_REQUEST || type === Message.TYPE_RESPONSE;
  };

  var msgHasRoute = function msgHasRoute(type) {
    return type === Message.TYPE_REQUEST || type === Message.TYPE_NOTIFY || type === Message.TYPE_PUSH;
  };

  var caculateMsgIdBytes = function caculateMsgIdBytes(id) {
    var len = 0;

    do {
      len += 1;
      id >>= 7;
    } while (id > 0);

    return len;
  };

  var encodeMsgFlag = function encodeMsgFlag(type, compressRoute, buffer, offset) {
    if (type !== Message.TYPE_REQUEST && type !== Message.TYPE_NOTIFY && type !== Message.TYPE_RESPONSE && type !== Message.TYPE_PUSH) {
      throw new Error('unkonw message type: ' + type);
    }

    buffer[offset] = type << 1 | (compressRoute ? 1 : 0);
    return offset + MSG_FLAG_BYTES;
  };

  var encodeMsgId = function encodeMsgId(id, buffer, offset) {
    do {
      var tmp = id % 128;
      var next = Math.floor(id / 128);

      if (next !== 0) {
        tmp = tmp + 128;
      }

      buffer[offset++] = tmp;
      id = next;
    } while (id !== 0);

    return offset;
  };

  var encodeMsgRoute = function encodeMsgRoute(compressRoute, route, buffer, offset) {
    if (compressRoute) {
      if (route > MSG_ROUTE_CODE_MAX) {
        throw new Error('route number is overflow');
      }

      buffer[offset++] = route >> 8 & 0xff;
      buffer[offset++] = route & 0xff;
    } else {
      if (route) {
        buffer[offset++] = route.length & 0xff;
        copyArray(buffer, offset, route, 0, route.length);
        offset += route.length;
      } else {
        buffer[offset++] = 0;
      }
    }

    return offset;
  };

  var encodeMsgBody = function encodeMsgBody(msg, buffer, offset) {
    copyArray(buffer, offset, msg, 0, msg.length);
    return offset + msg.length;
  };

  module.exports = Protocol;

  if (typeof window != "undefined") {
    window.Protocol = Protocol;
  }
})(typeof window == "undefined" ? module.exports : {}, typeof window == "undefined" ? Buffer : Uint8Array, void 0);

cc._RF.pop();

}).call(this,require("buffer").Buffer)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hc3NldHNcXGZyYW1lc1xcbmV0XFxwb21lbG9cXHByb3RvY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLENBQUMsVUFBVSxPQUFWLEVBQW1CLFNBQW5CLEVBQThCLE1BQTlCLEVBQXNDO0FBQ3JDLE1BQUksUUFBUSxHQUFHLE9BQWY7QUFFQSxNQUFJLGNBQWMsR0FBRyxDQUFyQjtBQUNBLE1BQUksY0FBYyxHQUFHLENBQXJCO0FBQ0EsTUFBSSxvQkFBb0IsR0FBRyxDQUEzQjtBQUNBLE1BQUksZ0JBQWdCLEdBQUcsQ0FBdkI7QUFDQSxNQUFJLG1CQUFtQixHQUFHLENBQTFCO0FBRUEsTUFBSSxrQkFBa0IsR0FBRyxNQUF6QjtBQUVBLE1BQUksdUJBQXVCLEdBQUcsR0FBOUI7QUFDQSxNQUFJLGFBQWEsR0FBRyxHQUFwQjtBQUVBLE1BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFULEdBQW1CLEVBQWpDO0FBQ0EsTUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQVQsR0FBbUIsRUFBakM7QUFFQSxFQUFBLE9BQU8sQ0FBQyxjQUFSLEdBQXlCLENBQXpCO0FBQ0EsRUFBQSxPQUFPLENBQUMsa0JBQVIsR0FBNkIsQ0FBN0I7QUFDQSxFQUFBLE9BQU8sQ0FBQyxjQUFSLEdBQXlCLENBQXpCO0FBQ0EsRUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixDQUFwQjtBQUNBLEVBQUEsT0FBTyxDQUFDLFNBQVIsR0FBb0IsQ0FBcEI7QUFFQSxFQUFBLE9BQU8sQ0FBQyxZQUFSLEdBQXVCLENBQXZCO0FBQ0EsRUFBQSxPQUFPLENBQUMsV0FBUixHQUFzQixDQUF0QjtBQUNBLEVBQUEsT0FBTyxDQUFDLGFBQVIsR0FBd0IsQ0FBeEI7QUFDQSxFQUFBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLENBQXBCO0FBRUE7Ozs7Ozs7O0FBT0EsRUFBQSxRQUFRLENBQUMsU0FBVCxHQUFxQixVQUFTLEdBQVQsRUFBYztBQUNqQyxRQUFJ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LE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBaEI7QUFDRCxPQUpELE1BSU87QUFDTCxRQUFBLE1BQU0sQ0FBQyxNQUFNLEVBQVAsQ0FBTixHQUFtQixDQUFuQjtBQUNEO0FBQ0Y7O0FBRUQsV0FBTyxNQUFQO0FBQ0QsR0FuQkQ7O0FBcUJBLE1BQUksYUFBYSxHQUFHLFNBQWhCLGFBQWdCLENBQVMsR0FBVCxFQUFjLE1BQWQsRUFBc0IsTUFBdEIsRUFBOEI7QUFDaEQsSUFBQSxTQUFTLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsR0FBakIsRUFBc0IsQ0FBdEIsRUFBeUIsR0FBRyxDQUFDLE1BQTdCLENBQVQ7QUFDQSxXQUFPLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBcEI7QUFDRCxHQUhEOztBQUtBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsUUFBakI7O0FBQ0EsTUFBRyxPQUFPLE1BQVAsSUFBa0IsV0FBckIsRUFBa0M7QUFDaEMsSUFBQSxNQUFNLENBQUMsUUFBUCxHQUFrQixRQUFsQjtBQUNEO0FBQ0YsQ0E3VkQsRUE2VkcsT0FBTyxNQUFQLElBQWdCLFdBQWhCLEdBQThCLE1BQU0sQ0FBQyxPQUFyQyxHQUErQyxFQTdWbEQsRUE2VnNELE9BQU8sTUFBUCxJQUFnQixXQUFoQixHQUE4QixNQUE5QixHQUF1QyxVQTdWN0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbbnVsbF19
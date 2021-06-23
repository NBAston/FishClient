
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/notice/html-text-parser.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03103tp86BJiKZvbSFKnGMR', 'html-text-parser');
// modules/public/script/notice/html-text-parser.js

"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var eventRegx = /^(click)(\s)*=|(param)(\s)*=/;
var imageAttrReg = /(\s)*src(\s)*=|(\s)*height(\s)*=|(\s)*width(\s)*=|(\s)*align(\s)*=|(\s)*offset(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;
/**
 * A utils class for parsing HTML texts. The parsed results will be an object array.
 */

var HtmlTextParser = function HtmlTextParser() {
  this._parsedObject = {};
  this._specialSymbolArray = [];

  this._specialSymbolArray.push([/&lt;/g, '<']);

  this._specialSymbolArray.push([/&gt;/g, '>']);

  this._specialSymbolArray.push([/&amp;/g, '&']);

  this._specialSymbolArray.push([/&quot;/g, '"']);

  this._specialSymbolArray.push([/&apos;/g, '\'']);

  this._specialSymbolArray.push([/&nbsp;/g, ' ']);
};

HtmlTextParser.prototype = {
  constructor: HtmlTextParser,
  parse: function parse(htmlString) {
    this._resultObjectArray = [];
    this._stack = [];
    var startIndex = 0;
    var length = htmlString.length;

    while (startIndex < length) {
      var tagEndIndex = htmlString.indexOf('>', startIndex);
      var tagBeginIndex = -1;

      if (tagEndIndex >= 0) {
        tagBeginIndex = htmlString.lastIndexOf('<', tagEndIndex);
        var noTagBegin = tagBeginIndex < startIndex - 1;

        if (noTagBegin) {
          tagBeginIndex = htmlString.indexOf('<', tagEndIndex + 1);
          tagEndIndex = htmlString.indexOf('>', tagBeginIndex + 1);
        }
      }

      if (tagBeginIndex < 0) {
        this._stack.pop();

        this._processResult(htmlString.substring(startIndex));

        startIndex = length;
      } else {
        var newStr = htmlString.substring(startIndex, tagBeginIndex);
        var tagStr = htmlString.substring(tagBeginIndex + 1, tagEndIndex);
        if (tagStr === "") newStr = htmlString.substring(startIndex, tagEndIndex + 1);

        this._processResult(newStr);

        if (tagEndIndex === -1) {
          // cc.error('The HTML tag is invalid!');
          tagEndIndex = tagBeginIndex;
        } else if (htmlString.charAt(tagBeginIndex + 1) === '\/') {
          this._stack.pop();
        } else {
          this._addToStack(tagStr);
        }

        startIndex = tagEndIndex + 1;
      }
    }

    return this._resultObjectArray;
  },
  _attributeToObject: function _attributeToObject(attribute) {
    attribute = attribute.trim();
    var obj = {};
    var header = attribute.match(/^(color|size)(\s)*=/);
    var tagName;
    var nextSpace;
    var eventObj;
    var eventHanlderString;

    if (header) {
      tagName = header[0];
      attribute = attribute.substring(tagName.length).trim();
      if (attribute === "") return obj; //parse color

      nextSpace = attribute.indexOf(' ');

      switch (tagName[0]) {
        case 'c':
          if (nextSpace > -1) {
            obj.color = attribute.substring(0, nextSpace).trim();
          } else {
            obj.color = attribute;
          }

          break;

        case 's':
          obj.size = parseInt(attribute);
          break;
      } //tag has event arguments


      if (nextSpace > -1) {
        eventHanlderString = attribute.substring(nextSpace + 1).trim();
        eventObj = this._processEventHandler(eventHanlderString);
        obj.event = eventObj;
      }

      return obj;
    }

    header = attribute.match(/^(br(\s)*\/)/);

    if (header && header[0].length > 0) {
      tagName = header[0].trim();

      if (tagName.startsWith("br") && tagName[tagName.length - 1] === "/") {
        obj.isNewLine = true;

        this._resultObjectArray.push({
          text: "",
          style: {
            newline: true
          }
        });

        return obj;
      }
    }

    header = attribute.match(/^(img(\s)*src(\s)*=[^>]+\/)/);

    if (header && header[0].length > 0) {
      tagName = header[0].trim();

      if (tagName.startsWith("img") && tagName[tagName.length - 1] === "/") {
        header = attribute.match(imageAttrReg);
        var tagValue;
        var remainingArgument;
        var isValidImageTag = false;

        while (header) {
          //skip the invalid tags at first
          attribute = attribute.substring(attribute.indexOf(header[0]));
          tagName = attribute.substr(0, header[0].length); //remove space and = character

          remainingArgument = attribute.substring(tagName.length).trim();
          nextSpace = remainingArgument.indexOf(' ');
          tagValue = nextSpace > -1 ? remainingArgument.substr(0, nextSpace) : remainingArgument;
          tagName = tagName.replace(/[^a-zA-Z]/g, "").trim();
          tagName = tagName.toLocaleLowerCase();
          attribute = remainingArgument.substring(nextSpace).trim();
          if (tagValue.endsWith('\/')) tagValue = tagValue.slice(0, -1);

          if (tagName === "src") {
            switch (tagValue.charCodeAt(0)) {
              case 34: // "

              case 39:
                // '
                isValidImageTag = true;
                tagValue = tagValue.slice(1, -1);
                break;
            }

            obj.isImage = true;
            obj.src = tagValue;
          } else if (tagName === "height") {
            obj.imageHeight = parseInt(tagValue);
          } else if (tagName === "width") {
            obj.imageWidth = parseInt(tagValue);
          } else if (tagName === "align") {
            switch (tagValue.charCodeAt(0)) {
              case 34: // "

              case 39:
                // '
                tagValue = tagValue.slice(1, -1);
                break;
            }

            obj.imageAlign = tagValue.toLocaleLowerCase();
          } else if (tagName === "offset") {
            obj.imageOffset = tagValue;
          } else if (tagName === "click") {
            obj.event = this._processEventHandler(tagName + "=" + tagValue);
          }

          if (obj.event && tagName === 'param') {
            obj.event.param = tagValue.replace(/^\"|\"$/g, '');
          }

          header = attribute.match(imageAttrReg);
        }

        if (isValidImageTag && obj.isImage) {
          this._resultObjectArray.push({
            text: "",
            style: obj
          });
        }

        return {};
      }
    }

    header = attribute.match(/^(outline(\s)*[^>]*)/);

    if (header) {
      attribute = header[0].substring("outline".length).trim();
      var defaultOutlineObject = {
        color: "#ffffff",
        width: 1
      };

      if (attribute) {
        var outlineAttrReg = /(\s)*color(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;
        header = attribute.match(outlineAttrReg);
        var tagValue;

        while (header) {
          //skip the invalid tags at first
          attribute = attribute.substring(attribute.indexOf(header[0]));
          tagName = attribute.substr(0, header[0].length); //remove space and = character

          remainingArgument = attribute.substring(tagName.length).trim();
          nextSpace = remainingArgument.indexOf(' ');

          if (nextSpace > -1) {
            tagValue = remainingArgument.substr(0, nextSpace);
          } else {
            tagValue = remainingArgument;
          }

          tagName = tagName.replace(/[^a-zA-Z]/g, "").trim();
          tagName = tagName.toLocaleLowerCase();
          attribute = remainingArgument.substring(nextSpace).trim();

          if (tagName === "click") {
            obj.event = this._processEventHandler(tagName + "=" + tagValue);
          } else if (tagName === "color") {
            defaultOutlineObject.color = tagValue;
          } else if (tagName === "width") {
            defaultOutlineObject.width = parseInt(tagValue);
          }

          if (obj.event && tagName === 'param') {
            obj.event.param = tagValue.replace(/^\"|\"$/g, '');
          }

          header = attribute.match(outlineAttrReg);
        }
      }

      obj.outline = defaultOutlineObject;
    }

    header = attribute.match(/^(on|u|b|i)(\s)*/);

    if (header && header[0].length > 0) {
      tagName = header[0];
      attribute = attribute.substring(tagName.length).trim();

      switch (tagName[0]) {
        case 'u':
          obj.underline = true;
          break;

        case 'i':
          obj.italic = true;
          break;

        case 'b':
          obj.bold = true;
          break;
      }

      if (attribute === "") {
        return obj;
      }

      eventObj = this._processEventHandler(attribute);
      obj.event = eventObj;
    }

    return obj;
  },
  _processEventHandler: function _processEventHandler(eventString) {
    var index = 0;
    var obj = {};
    var eventNames = eventString.match(eventRegx);
    var isValidTag = false;

    while (eventNames) {
      var eventName = eventNames[0];
      var eventValue = "";
      isValidTag = false;
      eventString = eventString.substring(eventName.length).trim();

      if (eventString.charAt(0) === "\"") {
        index = eventString.indexOf("\"", 1);

        if (index > -1) {
          eventValue = eventString.substring(1, index).trim();
          isValidTag = true;
        }

        index++;
      } else if (eventString.charAt(0) === "\'") {
        index = eventString.indexOf('\'', 1);

        if (index > -1) {
          eventValue = eventString.substring(1, index).trim();
          isValidTag = true;
        }

        index++;
      } else {
        //skip the invalid attribute value
        var match = eventString.match(/(\S)+/);

        if (match) {
          eventValue = match[0];
        } else {
          eventValue = "";
        }

        index = eventValue.length;
      }

      if (isValidTag) {
        eventName = eventName.substring(0, eventName.length - 1).trim();
        obj[eventName] = eventValue;
      }

      eventString = eventString.substring(index).trim();
      eventNames = eventString.match(eventRegx);
    }

    return obj;
  },
  _addToStack: function _addToStack(attribute) {
    var obj = this._attributeToObject(attribute);

    if (this._stack.length === 0) {
      this._stack.push(obj);
    } else {
      if (obj.isNewLine || obj.isImage) {
        return;
      } //for nested tags


      var previousTagObj = this._stack[this._stack.length - 1];

      for (var key in previousTagObj) {
        if (!obj[key]) {
          obj[key] = previousTagObj[key];
        }
      }

      this._stack.push(obj);
    }
  },
  _processResult: function _processResult(value) {
    if (value === "") {
      return;
    }

    value = this._escapeSpecialSymbol(value);

    if (this._stack.length > 0) {
      this._resultObjectArray.push({
        text: value,
        style: this._stack[this._stack.length - 1]
      });
    } else {
      this._resultObjectArray.push({
        text: value
      });
    }
  },
  _escapeSpecialSymbol: function _escapeSpecialSymbol(str) {
    for (var i = 0; i < this._specialSymbolArray.length; ++i) {
      var key = this._specialSymbolArray[i][0];
      var value = this._specialSymbolArray[i][1];
      str = str.replace(key, value);
    }

    return str;
  }
};

if (CC_TEST) {
  cc._Test.HtmlTextParser = HtmlTextParser;
}

module.exports = HtmlTextParser;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG5vdGljZVxcaHRtbC10ZXh0LXBhcnNlci5qcyJdLCJuYW1lcyI6WyJldmVudFJlZ3giLCJpbWFnZUF0dHJSZWciLCJIdG1sVGV4dFBhcnNlciIsIl9wYXJzZWRPYmplY3QiLCJfc3BlY2lhbFN5bWJvbEFycmF5IiwicHVzaCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwicGFyc2UiLCJodG1sU3RyaW5nIiwiX3Jlc3VsdE9iamVjdEFycmF5IiwiX3N0YWNrIiwic3RhcnRJbmRleCIsImxlbmd0aCIsInRhZ0VuZEluZGV4IiwiaW5kZXhPZiIsInRhZ0JlZ2luSW5kZXgiLCJsYXN0SW5kZXhPZiIsIm5vVGFnQmVnaW4iLCJwb3AiLCJfcHJvY2Vzc1Jlc3VsdCIsInN1YnN0cmluZyIsIm5ld1N0ciIsInRhZ1N0ciIsImNoYXJBdCIsIl9hZGRUb1N0YWNrIiwiX2F0dHJpYnV0ZVRvT2JqZWN0IiwiYXR0cmlidXRlIiwidHJpbSIsIm9iaiIsImhlYWRlciIsIm1hdGNoIiwidGFnTmFtZSIsIm5leHRTcGFjZSIsImV2ZW50T2JqIiwiZXZlbnRIYW5sZGVyU3RyaW5nIiwiY29sb3IiLCJzaXplIiwicGFyc2VJbnQiLCJfcHJvY2Vzc0V2ZW50SGFuZGxlciIsImV2ZW50Iiwic3RhcnRzV2l0aCIsImlzTmV3TGluZSIsInRleHQiLCJzdHlsZSIsIm5ld2xpbmUiLCJ0YWdWYWx1ZSIsInJlbWFpbmluZ0FyZ3VtZW50IiwiaXNWYWxpZEltYWdlVGFnIiwic3Vic3RyIiwicmVwbGFjZSIsInRvTG9jYWxlTG93ZXJDYXNlIiwiZW5kc1dpdGgiLCJzbGljZSIsImNoYXJDb2RlQXQiLCJpc0ltYWdlIiwic3JjIiwiaW1hZ2VIZWlnaHQiLCJpbWFnZVdpZHRoIiwiaW1hZ2VBbGlnbiIsImltYWdlT2Zmc2V0IiwicGFyYW0iLCJkZWZhdWx0T3V0bGluZU9iamVjdCIsIndpZHRoIiwib3V0bGluZUF0dHJSZWciLCJvdXRsaW5lIiwidW5kZXJsaW5lIiwiaXRhbGljIiwiYm9sZCIsImV2ZW50U3RyaW5nIiwiaW5kZXgiLCJldmVudE5hbWVzIiwiaXNWYWxpZFRhZyIsImV2ZW50TmFtZSIsImV2ZW50VmFsdWUiLCJwcmV2aW91c1RhZ09iaiIsImtleSIsInZhbHVlIiwiX2VzY2FwZVNwZWNpYWxTeW1ib2wiLCJzdHIiLCJpIiwiQ0NfVEVTVCIsImNjIiwiX1Rlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLFNBQVMsR0FBRyw4QkFBaEI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsd0hBQW5CO0FBQ0E7Ozs7QUFHQSxJQUFJQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQVc7QUFDNUIsT0FBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNBLE9BQUtDLG1CQUFMLEdBQTJCLEVBQTNCOztBQUNBLE9BQUtBLG1CQUFMLENBQXlCQyxJQUF6QixDQUE4QixDQUFDLE9BQUQsRUFBVSxHQUFWLENBQTlCOztBQUNBLE9BQUtELG1CQUFMLENBQXlCQyxJQUF6QixDQUE4QixDQUFDLE9BQUQsRUFBVSxHQUFWLENBQTlCOztBQUNBLE9BQUtELG1CQUFMLENBQXlCQyxJQUF6QixDQUE4QixDQUFDLFFBQUQsRUFBVyxHQUFYLENBQTlCOztBQUNBLE9BQUtELG1CQUFMLENBQXlCQyxJQUF6QixDQUE4QixDQUFDLFNBQUQsRUFBWSxHQUFaLENBQTlCOztBQUNBLE9BQUtELG1CQUFMLENBQXlCQyxJQUF6QixDQUE4QixDQUFDLFNBQUQsRUFBWSxJQUFaLENBQTlCOztBQUNBLE9BQUtELG1CQUFMLENBQXlCQyxJQUF6QixDQUE4QixDQUFDLFNBQUQsRUFBWSxHQUFaLENBQTlCO0FBQ0gsQ0FURDs7QUFXQUgsY0FBYyxDQUFDSSxTQUFmLEdBQTJCO0FBQ3ZCQyxFQUFBQSxXQUFXLEVBQUVMLGNBRFU7QUFFdkJNLEVBQUFBLEtBQUss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QUF5RDtBQUNyRCxVQUFJSixHQUFHLEdBQUcsS0FBS3hFLG1CQUFMLENBQXlCNEUsQ0FBekIsRUFBNEIsQ0FBNUIsQ0FBVjtBQUNBLFVBQUlILEtBQUssR0FBRyxLQUFLekUsbUJBQUwsQ0FBeUI0RSxDQUF6QixFQUE0QixDQUE1QixDQUFaO0FBRUFELE1BQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDN0IsT0FBSixDQUFZMEIsR0FBWixFQUFpQkMsS0FBakIsQ0FBTjtBQUNIOztBQUNELFdBQU9FLEdBQVA7QUFDSDtBQTFUc0IsQ0FBM0I7O0FBNlRBLElBQUlFLE9BQUosRUFBYTtBQUNUQyxFQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBU2pGLGNBQVQsR0FBMEJBLGNBQTFCO0FBQ0g7O0FBRURrRixNQUFNLENBQUNDLE9BQVAsR0FBaUJuRixjQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgZXZlbnRSZWd4ID0gL14oY2xpY2spKFxccykqPXwocGFyYW0pKFxccykqPS87XHJcbnZhciBpbWFnZUF0dHJSZWcgPSAvKFxccykqc3JjKFxccykqPXwoXFxzKSpoZWlnaHQoXFxzKSo9fChcXHMpKndpZHRoKFxccykqPXwoXFxzKSphbGlnbihcXHMpKj18KFxccykqb2Zmc2V0KFxccykqPXwoXFxzKSpjbGljayhcXHMpKj18KFxccykqcGFyYW0oXFxzKSo9LztcclxuLyoqXHJcbiAqIEEgdXRpbHMgY2xhc3MgZm9yIHBhcnNpbmcgSFRNTCB0ZXh0cy4gVGhlIHBhcnNlZCByZXN1bHRzIHdpbGwgYmUgYW4gb2JqZWN0IGFycmF5LlxyXG4gKi9cclxudmFyIEh0bWxUZXh0UGFyc2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9wYXJzZWRPYmplY3QgPSB7fTtcclxuICAgIHRoaXMuX3NwZWNpYWxTeW1ib2xBcnJheSA9IFtdO1xyXG4gICAgdGhpcy5fc3BlY2lhbFN5bWJvbEFycmF5LnB1c2goWy8mbHQ7L2csICc8J10pO1xyXG4gICAgdGhpcy5fc3BlY2lhbFN5bWJvbEFycmF5LnB1c2goWy8mZ3Q7L2csICc+J10pO1xyXG4gICAgdGhpcy5fc3BlY2lhbFN5bWJvbEFycmF5LnB1c2goWy8mYW1wOy9nLCAnJiddKTtcclxuICAgIHRoaXMuX3NwZWNpYWxTeW1ib2xBcnJheS5wdXNoKFsvJnF1b3Q7L2csICdcIiddKTtcclxuICAgIHRoaXMuX3NwZWNpYWxTeW1ib2xBcnJheS5wdXNoKFsvJmFwb3M7L2csICdcXCcnXSk7XHJcbiAgICB0aGlzLl9zcGVjaWFsU3ltYm9sQXJyYXkucHVzaChbLyZuYnNwOy9nLCAnICddKTtcclxufTtcclxuXHJcbkh0bWxUZXh0UGFyc2VyLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBIdG1sVGV4dFBhcnNlcixcclxuICAgIHBhcnNlOiBmdW5jdGlvbihodG1sU3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzdWx0T2JqZWN0QXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9zdGFjayA9IFtdO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRJbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IGh0bWxTdHJpbmcubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChzdGFydEluZGV4IDwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciB0YWdFbmRJbmRleCA9IGh0bWxTdHJpbmcuaW5kZXhPZignPicsIHN0YXJ0SW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgdGFnQmVnaW5JbmRleCA9IC0xO1xyXG4gICAgICAgICAgICBpZiAodGFnRW5kSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGFnQmVnaW5JbmRleCA9IGh0bWxTdHJpbmcubGFzdEluZGV4T2YoJzwnLCB0YWdFbmRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9UYWdCZWdpbiA9IHRhZ0JlZ2luSW5kZXggPCAoc3RhcnRJbmRleCAtIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub1RhZ0JlZ2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnQmVnaW5JbmRleCA9IGh0bWxTdHJpbmcuaW5kZXhPZignPCcsIHRhZ0VuZEluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnRW5kSW5kZXggPSBodG1sU3RyaW5nLmluZGV4T2YoJz4nLCB0YWdCZWdpbkluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0YWdCZWdpbkluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzUmVzdWx0KGh0bWxTdHJpbmcuc3Vic3RyaW5nKHN0YXJ0SW5kZXgpKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3U3RyID0gaHRtbFN0cmluZy5zdWJzdHJpbmcoc3RhcnRJbmRleCwgdGFnQmVnaW5JbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnU3RyID0gaHRtbFN0cmluZy5zdWJzdHJpbmcodGFnQmVnaW5JbmRleCArIDEsIHRhZ0VuZEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICh0YWdTdHIgPT09IFwiXCIpIG5ld1N0ciA9IGh0bWxTdHJpbmcuc3Vic3RyaW5nKHN0YXJ0SW5kZXgsIHRhZ0VuZEluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzUmVzdWx0KG5ld1N0cik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFnRW5kSW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoJ1RoZSBIVE1MIHRhZyBpcyBpbnZhbGlkIScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZ0VuZEluZGV4ID0gdGFnQmVnaW5JbmRleDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaHRtbFN0cmluZy5jaGFyQXQodGFnQmVnaW5JbmRleCArIDEpID09PSAnXFwvJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvU3RhY2sodGFnU3RyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSB0YWdFbmRJbmRleCArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0T2JqZWN0QXJyYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9hdHRyaWJ1dGVUb09iamVjdDogZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZS50cmltKCk7XHJcblxyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICB2YXIgaGVhZGVyID0gYXR0cmlidXRlLm1hdGNoKC9eKGNvbG9yfHNpemUpKFxccykqPS8pO1xyXG4gICAgICAgIHZhciB0YWdOYW1lO1xyXG4gICAgICAgIHZhciBuZXh0U3BhY2U7XHJcbiAgICAgICAgdmFyIGV2ZW50T2JqO1xyXG4gICAgICAgIHZhciBldmVudEhhbmxkZXJTdHJpbmc7XHJcbiAgICAgICAgaWYgKGhlYWRlcikge1xyXG4gICAgICAgICAgICB0YWdOYW1lID0gaGVhZGVyWzBdO1xyXG4gICAgICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGUuc3Vic3RyaW5nKHRhZ05hbWUubGVuZ3RoKS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmKGF0dHJpYnV0ZSA9PT0gXCJcIikgcmV0dXJuIG9iajtcclxuXHJcbiAgICAgICAgICAgIC8vcGFyc2UgY29sb3JcclxuICAgICAgICAgICAgbmV4dFNwYWNlID0gYXR0cmlidXRlLmluZGV4T2YoJyAnKTtcclxuICAgICAgICAgICAgc3dpdGNoKHRhZ05hbWVbMF0pe1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2MnOlxyXG4gICAgICAgICAgICAgICAgICBpZiAobmV4dFNwYWNlID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG9iai5jb2xvciA9IGF0dHJpYnV0ZS5zdWJzdHJpbmcoMCwgbmV4dFNwYWNlKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBvYmouY29sb3IgPSBhdHRyaWJ1dGU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAncyc6XHJcbiAgICAgICAgICAgICAgICAgIG9iai5zaXplID0gcGFyc2VJbnQoYXR0cmlidXRlKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vdGFnIGhhcyBldmVudCBhcmd1bWVudHNcclxuICAgICAgICAgICAgaWYobmV4dFNwYWNlID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50SGFubGRlclN0cmluZyA9IGF0dHJpYnV0ZS5zdWJzdHJpbmcobmV4dFNwYWNlKzEpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50T2JqID0gdGhpcy5fcHJvY2Vzc0V2ZW50SGFuZGxlcihldmVudEhhbmxkZXJTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgb2JqLmV2ZW50ID0gZXZlbnRPYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhlYWRlciA9IGF0dHJpYnV0ZS5tYXRjaCgvXihicihcXHMpKlxcLykvKTtcclxuICAgICAgICBpZihoZWFkZXIgJiYgaGVhZGVyWzBdLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGFnTmFtZSA9IGhlYWRlclswXS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmKHRhZ05hbWUuc3RhcnRzV2l0aChcImJyXCIpICYmIHRhZ05hbWVbdGFnTmFtZS5sZW5ndGgtMV0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouaXNOZXdMaW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdE9iamVjdEFycmF5LnB1c2goe3RleHQ6IFwiXCIsIHN0eWxlOiB7bmV3bGluZTogdHJ1ZX19KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhlYWRlciA9IGF0dHJpYnV0ZS5tYXRjaCgvXihpbWcoXFxzKSpzcmMoXFxzKSo9W14+XStcXC8pLyk7XHJcbiAgICAgICAgaWYoaGVhZGVyICYmIGhlYWRlclswXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRhZ05hbWUgPSBoZWFkZXJbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICBpZih0YWdOYW1lLnN0YXJ0c1dpdGgoXCJpbWdcIikgJiYgdGFnTmFtZVt0YWdOYW1lLmxlbmd0aC0xXSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlciA9IGF0dHJpYnV0ZS5tYXRjaChpbWFnZUF0dHJSZWcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZ1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlbWFpbmluZ0FyZ3VtZW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzVmFsaWRJbWFnZVRhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGhlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2tpcCB0aGUgaW52YWxpZCB0YWdzIGF0IGZpcnN0XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlLnN1YnN0cmluZyhhdHRyaWJ1dGUuaW5kZXhPZihoZWFkZXJbMF0pKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWdOYW1lID0gYXR0cmlidXRlLnN1YnN0cigwLCBoZWFkZXJbMF0ubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBzcGFjZSBhbmQgPSBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmdBcmd1bWVudCA9IGF0dHJpYnV0ZS5zdWJzdHJpbmcodGFnTmFtZS5sZW5ndGgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0U3BhY2UgPSByZW1haW5pbmdBcmd1bWVudC5pbmRleE9mKCcgJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhZ1ZhbHVlID0gKG5leHRTcGFjZSA+IC0xKSA/IHJlbWFpbmluZ0FyZ3VtZW50LnN1YnN0cigwLCBuZXh0U3BhY2UpIDogcmVtYWluaW5nQXJndW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnTmFtZSA9IHRhZ05hbWUucmVwbGFjZSgvW15hLXpBLVpdL2csIFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWdOYW1lID0gdGFnTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgPSByZW1haW5pbmdBcmd1bWVudC5zdWJzdHJpbmcobmV4dFNwYWNlKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0YWdWYWx1ZS5lbmRzV2l0aCggJ1xcLycgKSApIHRhZ1ZhbHVlID0gdGFnVmFsdWUuc2xpY2UoIDAsIC0xICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ05hbWUgPT09IFwic3JjXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0YWdWYWx1ZS5jaGFyQ29kZUF0KDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM0OiAvLyBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTogLy8gJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWRJbWFnZVRhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsdWUgPSB0YWdWYWx1ZS5zbGljZSgxLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmlzSW1hZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc3JjID0gdGFnVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSBcImhlaWdodFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbWFnZUhlaWdodCA9IHBhcnNlSW50KHRhZ1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwid2lkdGhcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW1hZ2VXaWR0aCA9IHBhcnNlSW50KHRhZ1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwiYWxpZ25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZ1ZhbHVlLmNoYXJDb2RlQXQoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzQ6IC8vIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OiAvLyAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsdWUgPSB0YWdWYWx1ZS5zbGljZSgxLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmltYWdlQWxpZ24gPSB0YWdWYWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gXCJvZmZzZXRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW1hZ2VPZmZzZXQgPSB0YWdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwiY2xpY2tcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZXZlbnQgPSB0aGlzLl9wcm9jZXNzRXZlbnRIYW5kbGVyKHRhZ05hbWUgKyBcIj1cIiArIHRhZ1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouZXZlbnQgJiYgdGFnTmFtZSA9PT0gJ3BhcmFtJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZXZlbnQucGFyYW0gPSB0YWdWYWx1ZS5yZXBsYWNlKC9eXFxcInxcXFwiJC9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSBhdHRyaWJ1dGUubWF0Y2goaW1hZ2VBdHRyUmVnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiggaXNWYWxpZEltYWdlVGFnICYmIG9iai5pc0ltYWdlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdE9iamVjdEFycmF5LnB1c2goe3RleHQ6IFwiXCIsIHN0eWxlOiBvYmp9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhlYWRlciA9IGF0dHJpYnV0ZS5tYXRjaCgvXihvdXRsaW5lKFxccykqW14+XSopLyk7XHJcbiAgICAgICAgaWYgKGhlYWRlcikge1xyXG4gICAgICAgICAgICBhdHRyaWJ1dGUgPSBoZWFkZXJbMF0uc3Vic3RyaW5nKFwib3V0bGluZVwiLmxlbmd0aCkudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdE91dGxpbmVPYmplY3QgPSB7Y29sb3I6IFwiI2ZmZmZmZlwiLCB3aWR0aDogMX07XHJcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvdXRsaW5lQXR0clJlZyA9IC8oXFxzKSpjb2xvcihcXHMpKj18KFxccykqd2lkdGgoXFxzKSo9fChcXHMpKmNsaWNrKFxccykqPXwoXFxzKSpwYXJhbShcXHMpKj0vO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyID0gYXR0cmlidXRlLm1hdGNoKG91dGxpbmVBdHRyUmVnKTtcclxuICAgICAgICAgICAgICAgIHZhciB0YWdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChoZWFkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3NraXAgdGhlIGludmFsaWQgdGFncyBhdCBmaXJzdFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZS5zdWJzdHJpbmcoYXR0cmlidXRlLmluZGV4T2YoaGVhZGVyWzBdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnTmFtZSA9IGF0dHJpYnV0ZS5zdWJzdHIoMCwgaGVhZGVyWzBdLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgc3BhY2UgYW5kID0gY2hhcmFjdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nQXJndW1lbnQgPSBhdHRyaWJ1dGUuc3Vic3RyaW5nKHRhZ05hbWUubGVuZ3RoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNwYWNlID0gcmVtYWluaW5nQXJndW1lbnQuaW5kZXhPZignICcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U3BhY2UgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWx1ZSA9IHJlbWFpbmluZ0FyZ3VtZW50LnN1YnN0cigwLCBuZXh0U3BhY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbHVlID0gcmVtYWluaW5nQXJndW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnJlcGxhY2UoL1teYS16QS1aXS9nLCBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlID0gcmVtYWluaW5nQXJndW1lbnQuc3Vic3RyaW5nKG5leHRTcGFjZSkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSBcImNsaWNrXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmV2ZW50ID0gdGhpcy5fcHJvY2Vzc0V2ZW50SGFuZGxlcih0YWdOYW1lICsgXCI9XCIgKyB0YWdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSBcImNvbG9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE91dGxpbmVPYmplY3QuY29sb3IgPSB0YWdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwid2lkdGhcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0T3V0bGluZU9iamVjdC53aWR0aCA9IHBhcnNlSW50KHRhZ1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouZXZlbnQgJiYgdGFnTmFtZSA9PT0gJ3BhcmFtJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZXZlbnQucGFyYW0gPSB0YWdWYWx1ZS5yZXBsYWNlKC9eXFxcInxcXFwiJC9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSBhdHRyaWJ1dGUubWF0Y2gob3V0bGluZUF0dHJSZWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5vdXRsaW5lID0gZGVmYXVsdE91dGxpbmVPYmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoZWFkZXIgPSBhdHRyaWJ1dGUubWF0Y2goL14ob258dXxifGkpKFxccykqLyk7XHJcbiAgICAgICAgaWYoaGVhZGVyICYmIGhlYWRlclswXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRhZ05hbWUgPSBoZWFkZXJbMF07XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZS5zdWJzdHJpbmcodGFnTmFtZS5sZW5ndGgpLnRyaW0oKTtcclxuICAgICAgICAgICAgc3dpdGNoKHRhZ05hbWVbMF0pe1xyXG4gICAgICAgICAgICAgIGNhc2UgJ3UnOlxyXG4gICAgICAgICAgICAgICAgICBvYmoudW5kZXJsaW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnaSc6XHJcbiAgICAgICAgICAgICAgICAgIG9iai5pdGFsaWMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdiJzpcclxuICAgICAgICAgICAgICAgICAgb2JqLmJvbGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihhdHRyaWJ1dGUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnRPYmogPSB0aGlzLl9wcm9jZXNzRXZlbnRIYW5kbGVyKGF0dHJpYnV0ZSk7XHJcbiAgICAgICAgICAgIG9iai5ldmVudCA9IGV2ZW50T2JqO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0sXHJcblxyXG4gICAgX3Byb2Nlc3NFdmVudEhhbmRsZXI6IGZ1bmN0aW9uIChldmVudFN0cmluZykge1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgICAgIHZhciBldmVudE5hbWVzID0gZXZlbnRTdHJpbmcubWF0Y2goZXZlbnRSZWd4KTtcclxuICAgICAgICB2YXIgaXNWYWxpZFRhZyA9IGZhbHNlO1xyXG4gICAgICAgIHdoaWxlKGV2ZW50TmFtZXMpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50TmFtZXNbMF07XHJcbiAgICAgICAgICAgIHZhciBldmVudFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgaXNWYWxpZFRhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBldmVudFN0cmluZyA9IGV2ZW50U3RyaW5nLnN1YnN0cmluZyhldmVudE5hbWUubGVuZ3RoKS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50U3RyaW5nLmNoYXJBdCgwKSA9PT0gXCJcXFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZXZlbnRTdHJpbmcuaW5kZXhPZihcIlxcXCJcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VmFsdWUgPSBldmVudFN0cmluZy5zdWJzdHJpbmcoMSwgaW5kZXgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkVGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihldmVudFN0cmluZy5jaGFyQXQoMCkgPT09IFwiXFwnXCIpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZXZlbnRTdHJpbmcuaW5kZXhPZignXFwnJywgMSk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRWYWx1ZSA9IGV2ZW50U3RyaW5nLnN1YnN0cmluZygxLCBpbmRleCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWRUYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vc2tpcCB0aGUgaW52YWxpZCBhdHRyaWJ1dGUgdmFsdWVcclxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGV2ZW50U3RyaW5nLm1hdGNoKC8oXFxTKSsvKTtcclxuICAgICAgICAgICAgICAgIGlmKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRWYWx1ZSA9IG1hdGNoWzBdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZXZlbnRWYWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGlzVmFsaWRUYWcpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS5zdWJzdHJpbmcoMCwgZXZlbnROYW1lLmxlbmd0aC0xKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBvYmpbZXZlbnROYW1lXSA9IGV2ZW50VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV2ZW50U3RyaW5nID0gZXZlbnRTdHJpbmcuc3Vic3RyaW5nKGluZGV4KS50cmltKCk7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBldmVudFN0cmluZy5tYXRjaChldmVudFJlZ3gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZFRvU3RhY2s6IGZ1bmN0aW9uKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHZhciBvYmogPSB0aGlzLl9hdHRyaWJ1dGVUb09iamVjdChhdHRyaWJ1dGUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc3RhY2subGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fc3RhY2sucHVzaChvYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKG9iai5pc05ld0xpbmUgfHwgb2JqLmlzSW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2ZvciBuZXN0ZWQgdGFnc1xyXG4gICAgICAgICAgICB2YXIgcHJldmlvdXNUYWdPYmogPSB0aGlzLl9zdGFja1t0aGlzLl9zdGFjay5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHByZXZpb3VzVGFnT2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIShvYmpba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHByZXZpb3VzVGFnT2JqW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3RhY2sucHVzaChvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3Byb2Nlc3NSZXN1bHQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhbHVlID0gdGhpcy5fZXNjYXBlU3BlY2lhbFN5bWJvbCh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzdWx0T2JqZWN0QXJyYXkucHVzaCh7dGV4dDogdmFsdWUsIHN0eWxlOiB0aGlzLl9zdGFja1t0aGlzLl9zdGFjay5sZW5ndGggLSAxXX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc3VsdE9iamVjdEFycmF5LnB1c2goe3RleHQ6IHZhbHVlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfZXNjYXBlU3BlY2lhbFN5bWJvbDogZnVuY3Rpb24oc3RyKSB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuX3NwZWNpYWxTeW1ib2xBcnJheS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fc3BlY2lhbFN5bWJvbEFycmF5W2ldWzBdO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLl9zcGVjaWFsU3ltYm9sQXJyYXlbaV1bMV07XHJcblxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxufTtcclxuXHJcbmlmIChDQ19URVNUKSB7XHJcbiAgICBjYy5fVGVzdC5IdG1sVGV4dFBhcnNlciA9IEh0bWxUZXh0UGFyc2VyO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxUZXh0UGFyc2VyO1xyXG4iXX0=

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/public/script/notice/rollnotice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fa978eEx9FOL6gmIAzVqdRP', 'rollnotice');
// modules/public/script/notice/rollnotice.js

"use strict";

var NOTICE_PLAZA = 0; //大厅跑马

var NOTICE_PUBLIC = 1; //普通跑马

var NOTICE_PUBLIC2 = 2; //普通跑马2

var NOTICE_HORIZONTAL = 1; //垂直滚动

var NOTICE_VERTICAL = 2; //特殊跑马

var HtmlTextParser = require('./html-text-parser');

var _htmlTextParser = new HtmlTextParser();

glGame.baseclass.extend({
  properties: {
    node_bottom: cc.Node,
    node_icon: cc.Node,
    node_spine: cc.Node,
    node_mask: cc.Widget,
    content: cc.Node,
    contentTemp: cc.Node,
    frame_di: [cc.SpriteFrame],
    frame_laba: [cc.SpriteFrame]
  },
  onLoad: function onLoad() {
    this._mutipleLineText = [];
    this._labelSegmentsCache = [];
    this.bactive = false;
    this.node.active = false;
    this.speed = 60;
    this.noticeType = NOTICE_PUBLIC;
    this.registerEvent();
    this.actionStart();
    this._originSize = this.node.getContentSize();
    this.actionType = 2; //初始化默认为普通跑马特效

    this.scene_names = ["wqznn", "zhajinhua", "ebg", "ddz"]; //普通跑马灯2列表

    var sceneName = glGame.scene.getSceneName();

    if (sceneName === "plaza") {
      this.setApperance(NOTICE_PLAZA);
    } else if (this.scene_names.indexOf(sceneName) != -1) {
      this.setApperance(NOTICE_PUBLIC2);
    } else {
      this.setApperance(NOTICE_PUBLIC);
    }
  },
  onEnable: function onEnable() {
    this.onCanvasResize();
  },
  registerEvent: function registerEvent() {
    glGame.emitter.on(MESSAGE.NOTICE.BASE, this.basestart, this);
    glGame.emitter.on(MESSAGE.NOTICE.PLAZA, this.plazastart, this);
    glGame.emitter.on("resize", this.onCanvasResize, this);
  },
  unregisterEvent: function unregisterEvent() {
    glGame.emitter.off(MESSAGE.NOTICE.BASE, this);
    glGame.emitter.off(MESSAGE.NOTICE.PLAZA, this);
    glGame.emitter.off("resize", this);
  },
  basestart: function basestart() {
    this.actionStart();
  },
  plazastart: function plazastart() {
    this.actionStart();
  },

  /**
   * 设置跑马灯外观
   * @param type number 
   */
  setApperance: function setApperance(type) {
    this.node_bottom.getComponent(cc.Sprite).spriteFrame = this.frame_di[type];
    this.node_icon.getComponent(cc.Sprite).spriteFrame = this.frame_laba[type];
    var rect = this.frame_di[type].getRect();
    this.node.setContentSize(cc.size(rect.width, rect.height));
    this._originSize = this.node.getContentSize();
  },

  /**
   * 设置结束的速率
   * @param speed number 长度/秒速  每秒位移像素
   */
  setSpeed: function setSpeed(speed) {
    this.speed = speed;
  },

  /**
   * 设置跑马大小
   * @param size cc.size 长宽
   */
  setContentSize: function setContentSize(size) {
    this._size = size;
    var new_pos = this.node.getContentSize(),
        pos_h = size.height / new_pos.height;
    this.node.setContentSize(size); //设置图片

    this.node_icon.setScale(pos_h); //设置遮罩

    this.node_mask.left = this.node_icon.getContentSize().width * pos_h + 30;
    this.node_mask.updateAlignment(); //设置字体大小

    var fsize = size.height / 2 + 3;
    this.content.getComponent(cc.RichText).fontSize = fsize;
    this.contentTemp.getComponent(cc.RichText).fontSize = fsize; //设置特效

    var initSize = cc.size(1201, 68);

    if (size.width != initSize.width || size.height != initSize.height) {
      this.node_spine.scaleX = size.width / initSize.width * 1.02;
      this.node_spine.scaleY = size.height / initSize.height;
      this.node_spine.x = this.node_spine.x * (size.width / initSize.width);
      this.node_spine.getComponent(sp.Skeleton).setAnimation(0, this.actionType, true);
    }

    this.node_bottom.getComponent(cc.Widget).updateAlignment();
    this.node_icon.getComponent(cc.Widget).updateAlignment();
  },

  /**
   * 设置跑马位置
   * @param pos cc.v2 x,y
   */
  setPosition: function setPosition(pos) {
    this._pos = pos;
    this.node.setPosition(pos);
  },

  /**
   * 设置是否自动做显示隐藏
   * @param bol bool 开关
   */
  setActive: function setActive(bol) {
    this.bactive = bol;
    if (!this.node.active && this.bactive) this.node.active = bol;
  },

  /**
   * 设置底图的开关
   * @param bol bool 开关
   */
  setBottom: function setBottom(bol) {
    this.node_bottom.active = bol;
  },

  /**
   * 设置跑马的层级
   * @param zIndex bool 开关
   */
  setZIndex: function setZIndex(zIndex) {
    if (zIndex != 0) this.node.zIndex = zIndex;
  },

  /**
   * 获取数据层里面的数据
   */
  getContent: function getContent() {
    var _this = this;

    var contentData = "",
        taskData = glGame.notice.getPlazaContent();
    this.noticeType = NOTICE_PUBLIC;

    if (taskData && glGame.scene.getSceneName() === "plaza") {
      this.noticeType = NOTICE_PLAZA;
      contentData = taskData.content;
      this.mode = taskData.mode;
      this.actionType = taskData.level;

      if (this.actionType == 2) {
        this.node_spine.active = true;
        this.node_spine.getComponent(sp.Skeleton).setAnimation(0, "1", false);
        this.node_spine.getComponent(sp.Skeleton).setCompleteListener(function (trackEntry, loopCount) {
          _this.node_spine.active = false;
        });
      } else {
        this.node_spine.active = true;
        this.node_spine.getComponent(sp.Skeleton).setAnimation(0, "1", false);
        this.node_spine.getComponent(sp.Skeleton).setCompleteListener(function (trackEntry, loopCount) {
          _this.node_spine.getComponent(sp.Skeleton).setAnimation(0, "2", true);
        });
      }

      if (taskData.speed) this.setSpeed(taskData.speed);
    } else {
      contentData = glGame.notice.getContent();
    }

    return contentData;
  },

  /**
   * 动画启动
   */
  actionStart: function actionStart() {
    if (this.content.getNumberOfRunningActions()) return;
    if (this.contentTemp && this.contentTemp.getNumberOfRunningActions()) return;
    if (!this.bactive) this.node.active = true;

    this._action();
  },

  /**
   * 动画流程
   */
  _action: function _action() {
    var _this2 = this;

    this.content.position = cc.v2(0, 0);
    this.contentTemp.position = cc.v2(0, -68);
    this.content_data = this.getContent();

    if (this.mode == NOTICE_VERTICAL && this.noticeType == NOTICE_PLAZA) {
      return this.CowRoll();
    }

    if (!this.content_data) {
      if (!this.bactive) this.node.active = false;
      return;
    }

    var label_content = this.content.getComponent(cc.RichText);
    label_content.string = this.content_data;
    var movex = this.node.width / 2 + this.content.width / 2 + 20;
    this.content.x = movex;
    var textSpeed = this.speed * this.content.getComponent(cc.RichText).fontSize;
    var move_act = cc.moveTo(movex / textSpeed, -movex, 0);
    var call = cc.callFunc(function () {
      if (_this2.noticeType === NOTICE_PLAZA) glGame.notice.removePlazaContent();else glGame.notice.removeContent();

      _this2._action();
    });
    this.content.runAction(cc.sequence(move_act, call));
  },
  callRun: function callRun(content, speed) {
    var _this3 = this;

    if (this.record == this._mutipleLineText.length) {
      content.stopAllActions();
      var actionArr = [];
      actionArr.push(cc.delayTime(speed));
      actionArr.push(cc.callFunc(function () {
        if (_this3.noticeType === NOTICE_PLAZA) glGame.notice.removePlazaContent();else glGame.notice.removeContent();

        _this3.CowRoll();
      }));
      content.runAction(cc.sequence(actionArr));
    } else {
      if (this.content.y > this.contentTemp.y) {
        this.content.y = -this.content.height;
        this.getStrContent(this.content);
      } else {
        this.contentTemp.y = -this.contentTemp.height;
        this.getStrContent(this.contentTemp);
      }

      this.actRun(this.content, this.speed);
      this.actRun2(this.contentTemp, this.speed);
    }
  },
  delayCallback: function delayCallback() {
    this.getStrContent(this.contentTemp);
    this.contentTemp.runAction(cc.moveBy(0.5, 0, this.contentTemp.height));
    this.content.runAction(cc.sequence(cc.moveBy(0.5, 0, this.content.height), cc.callFunc(this.callRun.bind(this, this.content, this.speed))));
  },
  actRun2: function actRun2(content, speed) {
    content.stopAllActions();
    content.runAction(cc.sequence(cc.delayTime(speed), cc.moveBy(0.5, 0, content.height)));
  },
  actRun: function actRun(content, speed) {
    content.stopAllActions();
    content.runAction(cc.sequence(cc.delayTime(speed), cc.moveBy(0.5, 0, content.height), cc.callFunc(this.callRun.bind(this, content, speed))));
  },
  //垂直滚动
  CowRoll: function CowRoll() {
    this.content_data = this.getContent();
    this.initCowData();

    if (this.mode == NOTICE_HORIZONTAL && this.noticeType == NOTICE_PLAZA) {
      return this._action();
    }

    if (!this.content_data) {
      if (!this.bactive) {
        this.node.active = false;
        this.content.stopAllActions();
        this.contentTemp.stopAllActions();
        this.contentTemp.getComponent(cc.RichText).string = "";
        this.content.getComponent(cc.RichText).string = "";
      }

      return;
    }

    if (this.isRollOne) {
      var self = this;
      this.content.stopAllActions();
      this.content.runAction(cc.sequence(cc.delayTime(this.speed), cc.callFunc(function () {
        if (self.noticeType === NOTICE_PLAZA) glGame.notice.removePlazaContent();else glGame.notice.removeContent();
        self.CowRoll();
      })));
      return;
    }

    this.content.runAction(cc.sequence(cc.delayTime(this.speed), cc.callFunc(this.delayCallback.bind(this))));
  },
  //初始化滚动数据
  initCowData: function initCowData() {
    this.content.position = cc.v2(0, 0);
    this.contentTemp.position = cc.v2(0, -68);
    this.contentTemp.getComponent(cc.RichText).string = "";
    this.content.getComponent(cc.RichText).string = "";
    this.content.stopAllActions();
    this.contentTemp.stopAllActions();
    this.record = 0;

    if (this.mode != NOTICE_VERTICAL) {
      return;
    }

    if (this.content_data.length > 0) this.preHandleContent();
    this.getStrContent(this.content);

    if (this.record == this._mutipleLineText.length) {
      this.isRollOne = true;
      return;
    } else {
      this.isRollOne = false;
    }
  },
  preHandleContent: function preHandleContent() {
    var richText = this.content.getComponent(cc.RichText);
    this.richText = richText;
    richText.string = "";
    this.maxWidth = this.node.width - 120;
    this._mutipleLineText = [];
    var lastEmptyLine = false;
    this._lineOffsetX = 0;

    var textArray = _htmlTextParser.parse(this.content_data);

    this._textArray = textArray;

    for (var i = 0; i < textArray.length; i++) {
      var richTextElement = this._textArray[i];
      var text = richTextElement.text;
      var multilineTexts = text.split("\n");

      for (var j = 0; j < multilineTexts.length; ++j) {
        var labelString = multilineTexts[j];

        if (labelString === "") {
          if (richText._isLastComponentCR(text) && j === multilineTexts.length - 1) {
            continue;
          }

          this._mutipleLineText.push("");

          this._lineOffsetX = 0;
          lastEmptyLine = true;
          continue;
        }

        lastEmptyLine = false;

        var labelWidth = richText._measureText(i, labelString);

        this._updateRichTextWithMaxWidth(labelString, labelWidth, i, richText);

        if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
          this._mutipleLineText.push("");
        }
      }
    }
  },
  //获取当前的字数
  getStrContent: function getStrContent(node) {
    node.getComponent(cc.RichText).string = this._mutipleLineText[this.record++];
  },
  _updateRichTextWithMaxWidth: function _updateRichTextWithMaxWidth(labelString, labelWidth, styleIndex, richText) {
    var fragmentWidth = labelWidth;

    if (this._lineOffsetX > 0 && fragmentWidth + this._lineOffsetX > this.maxWidth) {
      //concat previous line
      var checkStartIndex = 0;

      while (this._lineOffsetX <= this.maxWidth) {
        var checkEndIndex = richText._getFirstWordLen(labelString, checkStartIndex, labelString.length);

        var checkString = labelString.substr(checkStartIndex, checkEndIndex);

        var checkStringWidth = richText._measureText(styleIndex, checkString);

        if (this._lineOffsetX + checkStringWidth <= this.maxWidth) {
          this._lineOffsetX += checkStringWidth;
          checkStartIndex += checkEndIndex;
        } else {
          if (checkStartIndex > 0) {
            var remainingString = labelString.substr(0, checkStartIndex);

            this._mutipleLineText.push(remainingString);

            labelString = labelString.substr(checkStartIndex, labelString.length);
            fragmentWidth = richText._measureText(styleIndex, labelString, richText);
          }

          this._mutipleLineText.push("");

          break;
        }
      }
    }

    if (fragmentWidth > this.maxWidth) {
      var fragments = cc.textUtils.fragmentText(labelString, fragmentWidth, this.maxWidth, richText._measureText(styleIndex));

      for (var i = 0; i < fragments.length; i++) {
        this._mutipleLineText.push(fragments[i]);
      }
    } else {
      this._lineOffsetX += fragmentWidth;

      this._mutipleLineText.push(labelString);
    }
  },
  onCanvasResize: function onCanvasResize() {
    var _this4 = this;

    this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function () {
      var plaza = cc.director.getScene().getChildByName("plaza");

      if (plaza) {
        var height = 68;
        var showsize = cc.size(plaza.width * 0.65, height);

        _this4.setContentSize(showsize);

        _this4.setPosition(cc.v2(plaza.width / 2 + 439 / 2, plaza.height - 185));
      }
    })));
  },
  OnDestroy: function OnDestroy() {
    this.unregisterEvent();
    glGame.notice.resetData();
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccHVibGljXFxzY3JpcHRcXG5vdGljZVxccm9sbG5vdGljZS5qcyJdLCJuYW1lcyI6WyJOT1RJQ0VfUExBWkEiLCJOT1RJQ0VfUFVCTElDIiwiTk9USUNFX1BVQkxJQzIiLCJOT1RJQ0VfSE9SSVpPTlRBTCIsIk5PVElDRV9WRVJUSUNBTCIsIkh0bWxUZXh0UGFyc2VyIiwicmVxdWlyZSIsIl9odG1sVGV4dFBhcnNlciIsImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJub2RlX2JvdHRvbSIsImNjIiwiTm9kZSIsIm5vZGVfaWNvbiIsIm5vZGVfc3BpbmUiLCJub2RlX21hc2siLCJXaWRnZXQiLCJjb250ZW50IiwiY29udGVudFRlbXAiLCJmcmFtZV9kaSIsIlNwcml0ZUZyYW1lIiwiZnJhbWVfbGFiYSIsIm9uTG9hZCIsIl9tdXRpcGxlTGluZVRleHQiLCJfbGFiZWxTZWdtZW50c0NhY2hlIiwiYmFjdGl2ZSIsIm5vZGUiLCJhY3RpdmUiLCJzcGVlZCIsIm5vdGljZVR5cGUiLCJyZWdpc3RlckV2ZW50IiwiYWN0aW9uU3RhcnQiLCJfb3JpZ2luU2l6ZSIsImdldENvbnRlbnRTaXplIiwiYWN0aW9uVHlwZSIsInNjZW5lX25hbWVzIiwic2NlbmVOYW1lIiwic2NlbmUiLCJnZXRTY2VuZU5hbWUiLCJzZXRBcHBlcmFuY2UiLCJpbmRleE9mIiwib25FbmFibGUiLCJvbkNhbnZhc1Jlc2l6ZSIsImVtaXR0ZXIiLCJvbiIsIk1FU1NBR0UiLCJOT1RJQ0UiLCJCQVNFIiwiYmFzZXN0YXJ0IiwiUExBWkEiLCJwbGF6YXN0YXJ0IiwidW5yZWdpc3RlckV2ZW50Iiwib2ZmIiwidHlwZSIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicmVjdCIsImdldFJlY3QiLCJzZXRDb250ZW50U2l6ZSIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsInNldFNwZWVkIiwiX3NpemUiLCJuZXdfcG9zIiwicG9zX2giLCJzZXRTY2FsZSIsImxlZnQiLCJ1cGRhdGVBbGlnbm1lbnQiLCJmc2l6ZSIsIlJpY2hUZXh0IiwiZm9udFNpemUiLCJpbml0U2l6ZSIsInNjYWxlWCIsInNjYWxlWSIsIngiLCJzcCIsIlNrZWxldG9uIiwic2V0QW5pbWF0aW9uIiwic2V0UG9zaXRpb24iLCJwb3MiLCJfcG9zIiwic2V0QWN0aXZlIiwiYm9sIiwic2V0Qm90dG9tIiwic2V0WkluZGV4IiwiekluZGV4IiwiZ2V0Q29udGVudCIsImNvbnRlbnREYXRhIiwidGFza0RhdGEiLCJub3RpY2UiLCJnZXRQbGF6YUNvbnRlbnQiLCJtb2RlIiwibGV2ZWwiLCJzZXRDb21wbGV0ZUxpc3RlbmVyIiwidHJhY2tFbnRyeSIsImxvb3BDb3VudCIsImdldE51bWJlck9mUnVubmluZ0FjdGlvbnMiLCJfYWN0aW9uIiwicG9zaXRpb24iLCJ2MiIsImNvbnRlbnRfZGF0YSIsIkNvd1JvbGwiLCJsYWJlbF9jb250ZW50Iiwic3RyaW5nIiwibW92ZXgiLCJ0ZXh0U3BlZWQiLCJtb3ZlX2FjdCIsIm1vdmVUbyIsImNhbGwiLCJjYWxsRnVuYyIsInJlbW92ZVBsYXphQ29udGVudCIsInJlbW92ZUNvbnRlbnQiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImNhbGxSdW4iLCJyZWNvcmQiLCJsZW5ndGgiLCJzdG9wQWxsQWN0aW9ucyIsImFjdGlvbkFyciIsInB1c2giLCJkZWxheVRpbWUiLCJ5IiwiZ2V0U3RyQ29udGVudCIsImFjdFJ1biIsImFjdFJ1bjIiLCJkZWxheUNhbGxiYWNrIiwibW92ZUJ5IiwiYmluZCIsImluaXRDb3dEYXRhIiwiaXNSb2xsT25lIiwic2VsZiIsInByZUhhbmRsZUNvbnRlbnQiLCJyaWNoVGV4dCIsIm1heFdpZHRoIiwibGFzdEVtcHR5TGluZSIsIl9saW5lT2Zmc2V0WCIsInRleHRBcnJheSIsInBhcnNlIiwiX3RleHRBcnJheSIsImkiLCJyaWNoVGV4dEVsZW1lbnQiLCJ0ZXh0IiwibXVsdGlsaW5lVGV4dHMiLCJzcGxpdCIsImoiLCJsYWJlbFN0cmluZyIsIl9pc0xhc3RDb21wb25lbnRDUiIsImxhYmVsV2lkdGgiLCJfbWVhc3VyZVRleHQiLCJfdXBkYXRlUmljaFRleHRXaXRoTWF4V2lkdGgiLCJzdHlsZUluZGV4IiwiZnJhZ21lbnRXaWR0aCIsImNoZWNrU3RhcnRJbmRleCIsImNoZWNrRW5kSW5kZXgiLCJfZ2V0Rmlyc3RXb3JkTGVuIiwiY2hlY2tTdHJpbmciLCJzdWJzdHIiLCJjaGVja1N0cmluZ1dpZHRoIiwicmVtYWluaW5nU3RyaW5nIiwiZnJhZ21lbnRzIiwidGV4dFV0aWxzIiwiZnJhZ21lbnRUZXh0IiwicGxhemEiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJzaG93c2l6ZSIsIk9uRGVzdHJveSIsInJlc2V0RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxZQUFZLEdBQUcsQ0FBckIsRUFBNEI7O0FBQzVCLElBQU1DLGFBQWEsR0FBRyxDQUF0QixFQUE0Qjs7QUFDNUIsSUFBTUMsY0FBYyxHQUFHLENBQXZCLEVBQTRCOztBQUU1QixJQUFNQyxpQkFBaUIsR0FBRyxDQUExQixFQUFvQzs7QUFDcEMsSUFBTUMsZUFBZSxHQUFHLENBQXhCLEVBQW9DOztBQUVwQyxJQUFNQyxjQUFjLEdBQUdDLE9BQU8sQ0FBQyxvQkFBRCxDQUE5Qjs7QUFDQSxJQUFNQyxlQUFlLEdBQUcsSUFBSUYsY0FBSixFQUF4Qjs7QUFFQUcsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUVwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUMsRUFBRSxDQUFDQyxJQURSO0FBRVJDLElBQUFBLFNBQVMsRUFBRUYsRUFBRSxDQUFDQyxJQUZOO0FBR1JFLElBQUFBLFVBQVUsRUFBRUgsRUFBRSxDQUFDQyxJQUhQO0FBSVJHLElBQUFBLFNBQVMsRUFBRUosRUFBRSxDQUFDSyxNQUpOO0FBS1JDLElBQUFBLE9BQU8sRUFBRU4sRUFBRSxDQUFDQyxJQUxKO0FBTVJNLElBQUFBLFdBQVcsRUFBRVAsRUFBRSxDQUFDQyxJQU5SO0FBT1JPLElBQUFBLFFBQVEsRUFBRSxDQUFDUixFQUFFLENBQUNTLFdBQUosQ0FQRjtBQVFSQyxJQUFBQSxVQUFVLEVBQUUsQ0FBQ1YsRUFBRSxDQUFDUyxXQUFKO0FBUkosR0FGUTtBQWFwQkUsRUFBQUEsTUFib0Isb0JBYVg7QUFDTCxTQUFLQyxnQkFBTCxHQUF3QixFQUF4QjtBQUNBLFNBQUtDLG1CQUFMLEdBQTJCLEVBQTNCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsS0FBbkI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLFVBQUwsR0FBa0I5QixhQUFsQjtBQUNBLFNBQUsrQixhQUFMO0FBQ0EsU0FBS0MsV0FBTDtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsS0FBS04sSUFBTCxDQUFVTyxjQUFWLEVBQW5CO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQixDQVZLLENBVXVDOztBQUM1QyxTQUFLQyxXQUFMLEdBQW1CLENBQUMsT0FBRCxFQUFVLFdBQVYsRUFBdUIsS0FBdkIsRUFBOEIsS0FBOUIsQ0FBbkIsQ0FYSyxDQVd3RDs7QUFFN0QsUUFBSUMsU0FBUyxHQUFHOUIsTUFBTSxDQUFDK0IsS0FBUCxDQUFhQyxZQUFiLEVBQWhCOztBQUNBLFFBQUdGLFNBQVMsS0FBSyxPQUFqQixFQUEwQjtBQUN0QixXQUFLRyxZQUFMLENBQWtCekMsWUFBbEI7QUFDSCxLQUZELE1BRU8sSUFBRyxLQUFLcUMsV0FBTCxDQUFpQkssT0FBakIsQ0FBeUJKLFNBQXpCLEtBQXVDLENBQUMsQ0FBM0MsRUFBOEM7QUFDakQsV0FBS0csWUFBTCxDQUFrQnZDLGNBQWxCO0FBQ0gsS0FGTSxNQUVBO0FBQ0gsV0FBS3VDLFlBQUwsQ0FBa0J4QyxhQUFsQjtBQUNIO0FBQ0osR0FsQ21CO0FBb0NwQjBDLEVBQUFBLFFBcENvQixzQkFvQ1Q7QUFDUCxTQUFLQyxjQUFMO0FBQ0gsR0F0Q21CO0FBd0NwQlosRUFBQUEsYUF4Q29CLDJCQXdDSjtBQUNaeEIsSUFBQUEsTUFBTSxDQUFDcUMsT0FBUCxDQUFlQyxFQUFmLENBQWtCQyxPQUFPLENBQUNDLE1BQVIsQ0FBZUMsSUFBakMsRUFBdUMsS0FBS0MsU0FBNUMsRUFBdUQsSUFBdkQ7QUFDQTFDLElBQUFBLE1BQU0sQ0FBQ3FDLE9BQVAsQ0FBZUMsRUFBZixDQUFrQkMsT0FBTyxDQUFDQyxNQUFSLENBQWVHLEtBQWpDLEVBQXdDLEtBQUtDLFVBQTdDLEVBQXlELElBQXpEO0FBQ0E1QyxJQUFBQSxNQUFNLENBQUNxQyxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsUUFBbEIsRUFBNEIsS0FBS0YsY0FBakMsRUFBaUQsSUFBakQ7QUFDSCxHQTVDbUI7QUE2Q3BCUyxFQUFBQSxlQTdDb0IsNkJBNkNGO0FBQ2Q3QyxJQUFBQSxNQUFNLENBQUNxQyxPQUFQLENBQWVTLEdBQWYsQ0FBbUJQLE9BQU8sQ0FBQ0MsTUFBUixDQUFlQyxJQUFsQyxFQUF3QyxJQUF4QztBQUNBekMsSUFBQUEsTUFBTSxDQUFDcUMsT0FBUCxDQUFlUyxHQUFmLENBQW1CUCxPQUFPLENBQUNDLE1BQVIsQ0FBZUcsS0FBbEMsRUFBeUMsSUFBekM7QUFDQTNDLElBQUFBLE1BQU0sQ0FBQ3FDLE9BQVAsQ0FBZVMsR0FBZixDQUFtQixRQUFuQixFQUE2QixJQUE3QjtBQUNILEdBakRtQjtBQWtEcEJKLEVBQUFBLFNBbERvQix1QkFrRFI7QUFDUixTQUFLakIsV0FBTDtBQUNILEdBcERtQjtBQXFEcEJtQixFQUFBQSxVQXJEb0Isd0JBcURQO0FBQ1QsU0FBS25CLFdBQUw7QUFDSCxHQXZEbUI7O0FBeURwQjs7OztBQUlBUSxFQUFBQSxZQTdEb0Isd0JBNkRQYyxJQTdETyxFQTZERDtBQUNmLFNBQUszQyxXQUFMLENBQWlCNEMsWUFBakIsQ0FBOEIzQyxFQUFFLENBQUM0QyxNQUFqQyxFQUF5Q0MsV0FBekMsR0FBdUQsS0FBS3JDLFFBQUwsQ0FBY2tDLElBQWQsQ0FBdkQ7QUFDQSxTQUFLeEMsU0FBTCxDQUFleUMsWUFBZixDQUE0QjNDLEVBQUUsQ0FBQzRDLE1BQS9CLEVBQXVDQyxXQUF2QyxHQUFxRCxLQUFLbkMsVUFBTCxDQUFnQmdDLElBQWhCLENBQXJEO0FBRUEsUUFBSUksSUFBSSxHQUFHLEtBQUt0QyxRQUFMLENBQWNrQyxJQUFkLEVBQW9CSyxPQUFwQixFQUFYO0FBQ0EsU0FBS2hDLElBQUwsQ0FBVWlDLGNBQVYsQ0FBeUJoRCxFQUFFLENBQUNpRCxJQUFILENBQVFILElBQUksQ0FBQ0ksS0FBYixFQUFvQkosSUFBSSxDQUFDSyxNQUF6QixDQUF6QjtBQUNBLFNBQUs5QixXQUFMLEdBQW1CLEtBQUtOLElBQUwsQ0FBVU8sY0FBVixFQUFuQjtBQUNILEdBcEVtQjs7QUFzRXBCOzs7O0FBSUE4QixFQUFBQSxRQTFFb0Isb0JBMEVYbkMsS0ExRVcsRUEwRUo7QUFDWixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSCxHQTVFbUI7O0FBOEVwQjs7OztBQUlBK0IsRUFBQUEsY0FsRm9CLDBCQWtGTEMsSUFsRkssRUFrRkM7QUFDakIsU0FBS0ksS0FBTCxHQUFhSixJQUFiO0FBQ0EsUUFBSUssT0FBTyxHQUFHLEtBQUt2QyxJQUFMLENBQVVPLGNBQVYsRUFBZDtBQUFBLFFBQ0lpQyxLQUFLLEdBQUdOLElBQUksQ0FBQ0UsTUFBTCxHQUFjRyxPQUFPLENBQUNILE1BRGxDO0FBRUEsU0FBS3BDLElBQUwsQ0FBVWlDLGNBQVYsQ0FBeUJDLElBQXpCLEVBSmlCLENBTWpCOztBQUNBLFNBQUsvQyxTQUFMLENBQWVzRCxRQUFmLENBQXdCRCxLQUF4QixFQVBpQixDQVNqQjs7QUFDQSxTQUFLbkQsU0FBTCxDQUFlcUQsSUFBZixHQUFzQixLQUFLdkQsU0FBTCxDQUFlb0IsY0FBZixHQUFnQzRCLEtBQWhDLEdBQXdDSyxLQUF4QyxHQUFnRCxFQUF0RTtBQUNBLFNBQUtuRCxTQUFMLENBQWVzRCxlQUFmLEdBWGlCLENBYWpCOztBQUNBLFFBQUlDLEtBQUssR0FBR1YsSUFBSSxDQUFDRSxNQUFMLEdBQWMsQ0FBZCxHQUFrQixDQUE5QjtBQUNBLFNBQUs3QyxPQUFMLENBQWFxQyxZQUFiLENBQTBCM0MsRUFBRSxDQUFDNEQsUUFBN0IsRUFBdUNDLFFBQXZDLEdBQWtERixLQUFsRDtBQUNBLFNBQUtwRCxXQUFMLENBQWlCb0MsWUFBakIsQ0FBOEIzQyxFQUFFLENBQUM0RCxRQUFqQyxFQUEyQ0MsUUFBM0MsR0FBc0RGLEtBQXRELENBaEJpQixDQWlCakI7O0FBQ0EsUUFBSUcsUUFBUSxHQUFHOUQsRUFBRSxDQUFDaUQsSUFBSCxDQUFRLElBQVIsRUFBYyxFQUFkLENBQWY7O0FBQ0EsUUFBSUEsSUFBSSxDQUFDQyxLQUFMLElBQWNZLFFBQVEsQ0FBQ1osS0FBdkIsSUFBZ0NELElBQUksQ0FBQ0UsTUFBTCxJQUFlVyxRQUFRLENBQUNYLE1BQTVELEVBQW9FO0FBQ2hFLFdBQUtoRCxVQUFMLENBQWdCNEQsTUFBaEIsR0FBeUJkLElBQUksQ0FBQ0MsS0FBTCxHQUFhWSxRQUFRLENBQUNaLEtBQXRCLEdBQThCLElBQXZEO0FBQ0EsV0FBSy9DLFVBQUwsQ0FBZ0I2RCxNQUFoQixHQUF5QmYsSUFBSSxDQUFDRSxNQUFMLEdBQWNXLFFBQVEsQ0FBQ1gsTUFBaEQ7QUFDQSxXQUFLaEQsVUFBTCxDQUFnQjhELENBQWhCLEdBQW9CLEtBQUs5RCxVQUFMLENBQWdCOEQsQ0FBaEIsSUFBcUJoQixJQUFJLENBQUNDLEtBQUwsR0FBYVksUUFBUSxDQUFDWixLQUEzQyxDQUFwQjtBQUNBLFdBQUsvQyxVQUFMLENBQWdCd0MsWUFBaEIsQ0FBNkJ1QixFQUFFLENBQUNDLFFBQWhDLEVBQTBDQyxZQUExQyxDQUF1RCxDQUF2RCxFQUEwRCxLQUFLN0MsVUFBL0QsRUFBMkUsSUFBM0U7QUFDSDs7QUFFRCxTQUFLeEIsV0FBTCxDQUFpQjRDLFlBQWpCLENBQThCM0MsRUFBRSxDQUFDSyxNQUFqQyxFQUF5Q3FELGVBQXpDO0FBQ0EsU0FBS3hELFNBQUwsQ0FBZXlDLFlBQWYsQ0FBNEIzQyxFQUFFLENBQUNLLE1BQS9CLEVBQXVDcUQsZUFBdkM7QUFFSCxHQS9HbUI7O0FBZ0hwQjs7OztBQUlBVyxFQUFBQSxXQXBIb0IsdUJBb0hSQyxHQXBIUSxFQW9ISDtBQUNiLFNBQUtDLElBQUwsR0FBWUQsR0FBWjtBQUNBLFNBQUt2RCxJQUFMLENBQVVzRCxXQUFWLENBQXNCQyxHQUF0QjtBQUNILEdBdkhtQjs7QUF3SHBCOzs7O0FBSUFFLEVBQUFBLFNBNUhvQixxQkE0SFZDLEdBNUhVLEVBNEhMO0FBQ1gsU0FBSzNELE9BQUwsR0FBZTJELEdBQWY7QUFDQSxRQUFJLENBQUMsS0FBSzFELElBQUwsQ0FBVUMsTUFBWCxJQUFxQixLQUFLRixPQUE5QixFQUF1QyxLQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUJ5RCxHQUFuQjtBQUMxQyxHQS9IbUI7O0FBZ0lwQjs7OztBQUlBQyxFQUFBQSxTQXBJb0IscUJBb0lWRCxHQXBJVSxFQW9JTDtBQUNYLFNBQUsxRSxXQUFMLENBQWlCaUIsTUFBakIsR0FBMEJ5RCxHQUExQjtBQUNILEdBdEltQjs7QUF3SXBCOzs7O0FBSUFFLEVBQUFBLFNBNUlvQixxQkE0SVZDLE1BNUlVLEVBNElGO0FBQ2QsUUFBSUEsTUFBTSxJQUFJLENBQWQsRUFBaUIsS0FBSzdELElBQUwsQ0FBVTZELE1BQVYsR0FBbUJBLE1BQW5CO0FBQ3BCLEdBOUltQjs7QUFnSnBCOzs7QUFHQUMsRUFBQUEsVUFuSm9CLHdCQW1KUDtBQUFBOztBQUNULFFBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUFBLFFBQ0lDLFFBQVEsR0FBR3BGLE1BQU0sQ0FBQ3FGLE1BQVAsQ0FBY0MsZUFBZCxFQURmO0FBRUEsU0FBSy9ELFVBQUwsR0FBa0I5QixhQUFsQjs7QUFDQSxRQUFJMkYsUUFBUSxJQUFJcEYsTUFBTSxDQUFDK0IsS0FBUCxDQUFhQyxZQUFiLE9BQWdDLE9BQWhELEVBQXlEO0FBQ3JELFdBQUtULFVBQUwsR0FBa0IvQixZQUFsQjtBQUNBMkYsTUFBQUEsV0FBVyxHQUFHQyxRQUFRLENBQUN6RSxPQUF2QjtBQUNBLFdBQUs0RSxJQUFMLEdBQVlILFFBQVEsQ0FBQ0csSUFBckI7QUFDQSxXQUFLM0QsVUFBTCxHQUFrQndELFFBQVEsQ0FBQ0ksS0FBM0I7O0FBRUEsVUFBRyxLQUFLNUQsVUFBTCxJQUFtQixDQUF0QixFQUF5QjtBQUNyQixhQUFLcEIsVUFBTCxDQUFnQmEsTUFBaEIsR0FBeUIsSUFBekI7QUFDQSxhQUFLYixVQUFMLENBQWdCd0MsWUFBaEIsQ0FBNkJ1QixFQUFFLENBQUNDLFFBQWhDLEVBQTBDQyxZQUExQyxDQUF1RCxDQUF2RCxFQUEwRCxHQUExRCxFQUErRCxLQUEvRDtBQUNBLGFBQUtqRSxVQUFMLENBQWdCd0MsWUFBaEIsQ0FBNkJ1QixFQUFFLENBQUNDLFFBQWhDLEVBQTBDaUIsbUJBQTFDLENBQThELFVBQUNDLFVBQUQsRUFBYUMsU0FBYixFQUEyQjtBQUNyRixVQUFBLEtBQUksQ0FBQ25GLFVBQUwsQ0FBZ0JhLE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0gsU0FGRDtBQUlILE9BUEQsTUFPTztBQUNILGFBQUtiLFVBQUwsQ0FBZ0JhLE1BQWhCLEdBQXlCLElBQXpCO0FBQ0EsYUFBS2IsVUFBTCxDQUFnQndDLFlBQWhCLENBQTZCdUIsRUFBRSxDQUFDQyxRQUFoQyxFQUEwQ0MsWUFBMUMsQ0FBdUQsQ0FBdkQsRUFBMEQsR0FBMUQsRUFBK0QsS0FBL0Q7QUFDQSxhQUFLakUsVUFBTCxDQUFnQndDLFlBQWhCLENBQTZCdUIsRUFBRSxDQUFDQyxRQUFoQyxFQUEwQ2lCLG1CQUExQyxDQUE4RCxVQUFDQyxVQUFELEVBQWFDLFNBQWIsRUFBMkI7QUFDckYsVUFBQSxLQUFJLENBQUNuRixVQUFMLENBQWdCd0MsWUFBaEIsQ0FBNkJ1QixFQUFFLENBQUNDLFFBQWhDLEVBQTBDQyxZQUExQyxDQUF1RCxDQUF2RCxFQUEwRCxHQUExRCxFQUErRCxJQUEvRDtBQUNILFNBRkQ7QUFHSDs7QUFFRCxVQUFJVyxRQUFRLENBQUM5RCxLQUFiLEVBQW9CLEtBQUttQyxRQUFMLENBQWMyQixRQUFRLENBQUM5RCxLQUF2QjtBQUN2QixLQXRCRCxNQXNCTztBQUNINkQsTUFBQUEsV0FBVyxHQUFHbkYsTUFBTSxDQUFDcUYsTUFBUCxDQUFjSCxVQUFkLEVBQWQ7QUFDSDs7QUFDRCxXQUFPQyxXQUFQO0FBQ0gsR0FqTG1COztBQW1McEI7OztBQUdBMUQsRUFBQUEsV0F0TG9CLHlCQXNMTjtBQUNWLFFBQUksS0FBS2QsT0FBTCxDQUFhaUYseUJBQWIsRUFBSixFQUE4QztBQUM5QyxRQUFJLEtBQUtoRixXQUFMLElBQW9CLEtBQUtBLFdBQUwsQ0FBaUJnRix5QkFBakIsRUFBeEIsRUFBc0U7QUFDdEUsUUFBSSxDQUFDLEtBQUt6RSxPQUFWLEVBQW1CLEtBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjs7QUFDbkIsU0FBS3dFLE9BQUw7QUFDSCxHQTNMbUI7O0FBNExwQjs7O0FBR0FBLEVBQUFBLE9BL0xvQixxQkErTFY7QUFBQTs7QUFDTixTQUFLbEYsT0FBTCxDQUFhbUYsUUFBYixHQUF3QnpGLEVBQUUsQ0FBQzBGLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxDQUF4QjtBQUNBLFNBQUtuRixXQUFMLENBQWlCa0YsUUFBakIsR0FBNEJ6RixFQUFFLENBQUMwRixFQUFILENBQU0sQ0FBTixFQUFTLENBQUMsRUFBVixDQUE1QjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBS2QsVUFBTCxFQUFwQjs7QUFDQSxRQUFJLEtBQUtLLElBQUwsSUFBYTNGLGVBQWIsSUFBZ0MsS0FBSzJCLFVBQUwsSUFBbUIvQixZQUF2RCxFQUFxRTtBQUNqRSxhQUFPLEtBQUt5RyxPQUFMLEVBQVA7QUFDSDs7QUFDRCxRQUFJLENBQUMsS0FBS0QsWUFBVixFQUF3QjtBQUNwQixVQUFJLENBQUMsS0FBSzdFLE9BQVYsRUFBbUIsS0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEtBQW5CO0FBQ25CO0FBQ0g7O0FBQ0QsUUFBSTZFLGFBQWEsR0FBRyxLQUFLdkYsT0FBTCxDQUFhcUMsWUFBYixDQUEwQjNDLEVBQUUsQ0FBQzRELFFBQTdCLENBQXBCO0FBQ0FpQyxJQUFBQSxhQUFhLENBQUNDLE1BQWQsR0FBdUIsS0FBS0gsWUFBNUI7QUFDQSxRQUFJSSxLQUFLLEdBQUcsS0FBS2hGLElBQUwsQ0FBVW1DLEtBQVYsR0FBa0IsQ0FBbEIsR0FBc0IsS0FBSzVDLE9BQUwsQ0FBYTRDLEtBQWIsR0FBcUIsQ0FBM0MsR0FBK0MsRUFBM0Q7QUFDQSxTQUFLNUMsT0FBTCxDQUFhMkQsQ0FBYixHQUFpQjhCLEtBQWpCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLEtBQUsvRSxLQUFMLEdBQWEsS0FBS1gsT0FBTCxDQUFhcUMsWUFBYixDQUEwQjNDLEVBQUUsQ0FBQzRELFFBQTdCLEVBQXVDQyxRQUFwRTtBQUNBLFFBQUlvQyxRQUFRLEdBQUdqRyxFQUFFLENBQUNrRyxNQUFILENBQVVILEtBQUssR0FBR0MsU0FBbEIsRUFBNkIsQ0FBQ0QsS0FBOUIsRUFBcUMsQ0FBckMsQ0FBZjtBQUNBLFFBQUlJLElBQUksR0FBR25HLEVBQUUsQ0FBQ29HLFFBQUgsQ0FBWSxZQUFNO0FBQ3pCLFVBQUcsTUFBSSxDQUFDbEYsVUFBTCxLQUFvQi9CLFlBQXZCLEVBQXFDUSxNQUFNLENBQUNxRixNQUFQLENBQWNxQixrQkFBZCxHQUFyQyxLQUNLMUcsTUFBTSxDQUFDcUYsTUFBUCxDQUFjc0IsYUFBZDs7QUFDTCxNQUFBLE1BQUksQ0FBQ2QsT0FBTDtBQUNILEtBSlUsQ0FBWDtBQUtBLFNBQUtsRixPQUFMLENBQWFpRyxTQUFiLENBQXVCdkcsRUFBRSxDQUFDd0csUUFBSCxDQUFZUCxRQUFaLEVBQXNCRSxJQUF0QixDQUF2QjtBQUNILEdBdE5tQjtBQXdOcEJNLEVBQUFBLE9BeE5vQixtQkF3TlpuRyxPQXhOWSxFQXdOSFcsS0F4TkcsRUF3Tkk7QUFBQTs7QUFDcEIsUUFBRyxLQUFLeUYsTUFBTCxJQUFlLEtBQUs5RixnQkFBTCxDQUFzQitGLE1BQXhDLEVBQWdEO0FBQzVDckcsTUFBQUEsT0FBTyxDQUFDc0csY0FBUjtBQUNBLFVBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBQSxNQUFBQSxTQUFTLENBQUNDLElBQVYsQ0FBZTlHLEVBQUUsQ0FBQytHLFNBQUgsQ0FBYTlGLEtBQWIsQ0FBZjtBQUNBNEYsTUFBQUEsU0FBUyxDQUFDQyxJQUFWLENBQWU5RyxFQUFFLENBQUNvRyxRQUFILENBQVksWUFBTTtBQUM3QixZQUFHLE1BQUksQ0FBQ2xGLFVBQUwsS0FBb0IvQixZQUF2QixFQUFxQ1EsTUFBTSxDQUFDcUYsTUFBUCxDQUFjcUIsa0JBQWQsR0FBckMsS0FDSzFHLE1BQU0sQ0FBQ3FGLE1BQVAsQ0FBY3NCLGFBQWQ7O0FBQ0wsUUFBQSxNQUFJLENBQUNWLE9BQUw7QUFDSCxPQUpjLENBQWY7QUFLQXRGLE1BQUFBLE9BQU8sQ0FBQ2lHLFNBQVIsQ0FBa0J2RyxFQUFFLENBQUN3RyxRQUFILENBQVlLLFNBQVosQ0FBbEI7QUFDSCxLQVZELE1BVU87QUFDSCxVQUFHLEtBQUt2RyxPQUFMLENBQWEwRyxDQUFiLEdBQWlCLEtBQUt6RyxXQUFMLENBQWlCeUcsQ0FBckMsRUFBd0M7QUFDcEMsYUFBSzFHLE9BQUwsQ0FBYTBHLENBQWIsR0FBaUIsQ0FBQyxLQUFLMUcsT0FBTCxDQUFhNkMsTUFBL0I7QUFDQSxhQUFLOEQsYUFBTCxDQUFtQixLQUFLM0csT0FBeEI7QUFDSCxPQUhELE1BR087QUFDSCxhQUFLQyxXQUFMLENBQWlCeUcsQ0FBakIsR0FBcUIsQ0FBQyxLQUFLekcsV0FBTCxDQUFpQjRDLE1BQXZDO0FBQ0EsYUFBSzhELGFBQUwsQ0FBbUIsS0FBSzFHLFdBQXhCO0FBQ0g7O0FBRUQsV0FBSzJHLE1BQUwsQ0FBWSxLQUFLNUcsT0FBakIsRUFBMEIsS0FBS1csS0FBL0I7QUFDQSxXQUFLa0csT0FBTCxDQUFhLEtBQUs1RyxXQUFsQixFQUErQixLQUFLVSxLQUFwQztBQUNIO0FBQ0osR0EvT21CO0FBaVBwQm1HLEVBQUFBLGFBalBvQiwyQkFpUEo7QUFDWixTQUFLSCxhQUFMLENBQW1CLEtBQUsxRyxXQUF4QjtBQUNBLFNBQUtBLFdBQUwsQ0FBaUJnRyxTQUFqQixDQUEyQnZHLEVBQUUsQ0FBQ3FILE1BQUgsQ0FBVSxHQUFWLEVBQWUsQ0FBZixFQUFrQixLQUFLOUcsV0FBTCxDQUFpQjRDLE1BQW5DLENBQTNCO0FBRUEsU0FBSzdDLE9BQUwsQ0FBYWlHLFNBQWIsQ0FBdUJ2RyxFQUFFLENBQUN3RyxRQUFILENBQ25CeEcsRUFBRSxDQUFDcUgsTUFBSCxDQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCLEtBQUsvRyxPQUFMLENBQWE2QyxNQUEvQixDQURtQixFQUVuQm5ELEVBQUUsQ0FBQ29HLFFBQUgsQ0FBWSxLQUFLSyxPQUFMLENBQWFhLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBS2hILE9BQTdCLEVBQXNDLEtBQUtXLEtBQTNDLENBQVosQ0FGbUIsQ0FBdkI7QUFJSCxHQXpQbUI7QUEyUHBCa0csRUFBQUEsT0EzUG9CLG1CQTJQWjdHLE9BM1BZLEVBMlBIVyxLQTNQRyxFQTJQSTtBQUNwQlgsSUFBQUEsT0FBTyxDQUFDc0csY0FBUjtBQUNBdEcsSUFBQUEsT0FBTyxDQUFDaUcsU0FBUixDQUFrQnZHLEVBQUUsQ0FBQ3dHLFFBQUgsQ0FDZHhHLEVBQUUsQ0FBQytHLFNBQUgsQ0FBYTlGLEtBQWIsQ0FEYyxFQUVkakIsRUFBRSxDQUFDcUgsTUFBSCxDQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCL0csT0FBTyxDQUFDNkMsTUFBMUIsQ0FGYyxDQUFsQjtBQUlILEdBalFtQjtBQW1RcEIrRCxFQUFBQSxNQW5Rb0Isa0JBbVFiNUcsT0FuUWEsRUFtUUpXLEtBblFJLEVBbVFHO0FBQ25CWCxJQUFBQSxPQUFPLENBQUNzRyxjQUFSO0FBQ0F0RyxJQUFBQSxPQUFPLENBQUNpRyxTQUFSLENBQWtCdkcsRUFBRSxDQUFDd0csUUFBSCxDQUNkeEcsRUFBRSxDQUFDK0csU0FBSCxDQUFhOUYsS0FBYixDQURjLEVBRWRqQixFQUFFLENBQUNxSCxNQUFILENBQVUsR0FBVixFQUFlLENBQWYsRUFBa0IvRyxPQUFPLENBQUM2QyxNQUExQixDQUZjLEVBR2RuRCxFQUFFLENBQUNvRyxRQUFILENBQVksS0FBS0ssT0FBTCxDQUFhYSxJQUFiLENBQWtCLElBQWxCLEVBQXdCaEgsT0FBeEIsRUFBaUNXLEtBQWpDLENBQVosQ0FIYyxDQUFsQjtBQUtILEdBMVFtQjtBQTRRcEI7QUFDQTJFLEVBQUFBLE9BN1FvQixxQkE2UVY7QUFDTixTQUFLRCxZQUFMLEdBQW9CLEtBQUtkLFVBQUwsRUFBcEI7QUFDQSxTQUFLMEMsV0FBTDs7QUFDQSxRQUFJLEtBQUtyQyxJQUFMLElBQWE1RixpQkFBYixJQUFrQyxLQUFLNEIsVUFBTCxJQUFtQi9CLFlBQXpELEVBQXVFO0FBQ25FLGFBQU8sS0FBS3FHLE9BQUwsRUFBUDtBQUNIOztBQUVELFFBQUksQ0FBQyxLQUFLRyxZQUFWLEVBQXdCO0FBQ3BCLFVBQUksQ0FBQyxLQUFLN0UsT0FBVixFQUFtQjtBQUNmLGFBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixLQUFuQjtBQUNBLGFBQUtWLE9BQUwsQ0FBYXNHLGNBQWI7QUFDQSxhQUFLckcsV0FBTCxDQUFpQnFHLGNBQWpCO0FBQ0EsYUFBS3JHLFdBQUwsQ0FBaUJvQyxZQUFqQixDQUE4QjNDLEVBQUUsQ0FBQzRELFFBQWpDLEVBQTJDa0MsTUFBM0MsR0FBb0QsRUFBcEQ7QUFDQSxhQUFLeEYsT0FBTCxDQUFhcUMsWUFBYixDQUEwQjNDLEVBQUUsQ0FBQzRELFFBQTdCLEVBQXVDa0MsTUFBdkMsR0FBZ0QsRUFBaEQ7QUFDSDs7QUFDRDtBQUNIOztBQUVELFFBQUksS0FBSzBCLFNBQVQsRUFBb0I7QUFDaEIsVUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQSxXQUFLbkgsT0FBTCxDQUFhc0csY0FBYjtBQUNBLFdBQUt0RyxPQUFMLENBQWFpRyxTQUFiLENBQXVCdkcsRUFBRSxDQUFDd0csUUFBSCxDQUNuQnhHLEVBQUUsQ0FBQytHLFNBQUgsQ0FBYSxLQUFLOUYsS0FBbEIsQ0FEbUIsRUFFbkJqQixFQUFFLENBQUNvRyxRQUFILENBQVksWUFBTTtBQUNkLFlBQUdxQixJQUFJLENBQUN2RyxVQUFMLEtBQW9CL0IsWUFBdkIsRUFBcUNRLE1BQU0sQ0FBQ3FGLE1BQVAsQ0FBY3FCLGtCQUFkLEdBQXJDLEtBQ0sxRyxNQUFNLENBQUNxRixNQUFQLENBQWNzQixhQUFkO0FBQ0xtQixRQUFBQSxJQUFJLENBQUM3QixPQUFMO0FBQ0gsT0FKRCxDQUZtQixDQUF2QjtBQVFBO0FBQ0g7O0FBRUQsU0FBS3RGLE9BQUwsQ0FBYWlHLFNBQWIsQ0FBdUJ2RyxFQUFFLENBQUN3RyxRQUFILENBQVl4RyxFQUFFLENBQUMrRyxTQUFILENBQWEsS0FBSzlGLEtBQWxCLENBQVosRUFBc0NqQixFQUFFLENBQUNvRyxRQUFILENBQVksS0FBS2dCLGFBQUwsQ0FBbUJFLElBQW5CLENBQXdCLElBQXhCLENBQVosQ0FBdEMsQ0FBdkI7QUFDSCxHQTlTbUI7QUErU3BCO0FBQ0FDLEVBQUFBLFdBaFRvQix5QkFnVE47QUFDVixTQUFLakgsT0FBTCxDQUFhbUYsUUFBYixHQUF3QnpGLEVBQUUsQ0FBQzBGLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxDQUF4QjtBQUNBLFNBQUtuRixXQUFMLENBQWlCa0YsUUFBakIsR0FBNEJ6RixFQUFFLENBQUMwRixFQUFILENBQU0sQ0FBTixFQUFTLENBQUMsRUFBVixDQUE1QjtBQUNBLFNBQUtuRixXQUFMLENBQWlCb0MsWUFBakIsQ0FBOEIzQyxFQUFFLENBQUM0RCxRQUFqQyxFQUEyQ2tDLE1BQTNDLEdBQW9ELEVBQXBEO0FBQ0EsU0FBS3hGLE9BQUwsQ0FBYXFDLFlBQWIsQ0FBMEIzQyxFQUFFLENBQUM0RCxRQUE3QixFQUF1Q2tDLE1BQXZDLEdBQWdELEVBQWhEO0FBQ0EsU0FBS3hGLE9BQUwsQ0FBYXNHLGNBQWI7QUFDQSxTQUFLckcsV0FBTCxDQUFpQnFHLGNBQWpCO0FBQ0EsU0FBS0YsTUFBTCxHQUFjLENBQWQ7O0FBRUEsUUFBRyxLQUFLeEIsSUFBTCxJQUFhM0YsZUFBaEIsRUFBaUM7QUFDN0I7QUFDSDs7QUFFRCxRQUFHLEtBQUtvRyxZQUFMLENBQWtCZ0IsTUFBbEIsR0FBMkIsQ0FBOUIsRUFDSSxLQUFLZSxnQkFBTDtBQUNKLFNBQUtULGFBQUwsQ0FBbUIsS0FBSzNHLE9BQXhCOztBQUNBLFFBQUksS0FBS29HLE1BQUwsSUFBZSxLQUFLOUYsZ0JBQUwsQ0FBc0IrRixNQUF6QyxFQUFpRDtBQUM3QyxXQUFLYSxTQUFMLEdBQWlCLElBQWpCO0FBQ0E7QUFDSCxLQUhELE1BR087QUFDSCxXQUFLQSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7QUFDSixHQXRVbUI7QUF3VXBCRSxFQUFBQSxnQkF4VW9CLDhCQXdVRDtBQUNmLFFBQUlDLFFBQVEsR0FBRyxLQUFLckgsT0FBTCxDQUFhcUMsWUFBYixDQUEwQjNDLEVBQUUsQ0FBQzRELFFBQTdCLENBQWY7QUFDQSxTQUFLK0QsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQUEsSUFBQUEsUUFBUSxDQUFDN0IsTUFBVCxHQUFrQixFQUFsQjtBQUNBLFNBQUs4QixRQUFMLEdBQWdCLEtBQUs3RyxJQUFMLENBQVVtQyxLQUFWLEdBQWtCLEdBQWxDO0FBQ0EsU0FBS3RDLGdCQUFMLEdBQXdCLEVBQXhCO0FBRUEsUUFBSWlILGFBQWEsR0FBRyxLQUFwQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7O0FBRUEsUUFBSUMsU0FBUyxHQUFHckksZUFBZSxDQUFDc0ksS0FBaEIsQ0FBc0IsS0FBS3JDLFlBQTNCLENBQWhCOztBQUNBLFNBQUtzQyxVQUFMLEdBQWtCRixTQUFsQjs7QUFDQSxTQUFJLElBQUlHLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR0gsU0FBUyxDQUFDcEIsTUFBN0IsRUFBcUN1QixDQUFDLEVBQXRDLEVBQTBDO0FBQ3RDLFVBQUlDLGVBQWUsR0FBRyxLQUFLRixVQUFMLENBQWdCQyxDQUFoQixDQUF0QjtBQUNBLFVBQUlFLElBQUksR0FBR0QsZUFBZSxDQUFDQyxJQUEzQjtBQUNBLFVBQUlDLGNBQWMsR0FBR0QsSUFBSSxDQUFDRSxLQUFMLENBQVcsSUFBWCxDQUFyQjs7QUFFQSxXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLGNBQWMsQ0FBQzFCLE1BQW5DLEVBQTJDLEVBQUU0QixDQUE3QyxFQUFnRDtBQUM1QyxZQUFJQyxXQUFXLEdBQUdILGNBQWMsQ0FBQ0UsQ0FBRCxDQUFoQzs7QUFDQSxZQUFJQyxXQUFXLEtBQUssRUFBcEIsRUFBd0I7QUFDcEIsY0FBSWIsUUFBUSxDQUFDYyxrQkFBVCxDQUE0QkwsSUFBNUIsS0FDR0csQ0FBQyxLQUFLRixjQUFjLENBQUMxQixNQUFmLEdBQXdCLENBRHJDLEVBQ3dDO0FBQ3BDO0FBQ0g7O0FBQ0QsZUFBSy9GLGdCQUFMLENBQXNCa0csSUFBdEIsQ0FBMkIsRUFBM0I7O0FBQ0EsZUFBS2dCLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQUQsVUFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0E7QUFDSDs7QUFDREEsUUFBQUEsYUFBYSxHQUFHLEtBQWhCOztBQUVBLFlBQUlhLFVBQVUsR0FBR2YsUUFBUSxDQUFDZ0IsWUFBVCxDQUFzQlQsQ0FBdEIsRUFBeUJNLFdBQXpCLENBQWpCOztBQUNBLGFBQUtJLDJCQUFMLENBQWlDSixXQUFqQyxFQUE4Q0UsVUFBOUMsRUFBMERSLENBQTFELEVBQTZEUCxRQUE3RDs7QUFFQSxZQUFJVSxjQUFjLENBQUMxQixNQUFmLEdBQXdCLENBQXhCLElBQTZCNEIsQ0FBQyxHQUFHRixjQUFjLENBQUMxQixNQUFmLEdBQXdCLENBQTdELEVBQWdFO0FBQzVELGVBQUsvRixnQkFBTCxDQUFzQmtHLElBQXRCLENBQTJCLEVBQTNCO0FBQ0g7QUFDSjtBQUNKO0FBQ0osR0EvV21CO0FBaVhwQjtBQUNBRyxFQUFBQSxhQWxYb0IseUJBa1hObEcsSUFsWE0sRUFrWEE7QUFDaEJBLElBQUFBLElBQUksQ0FBQzRCLFlBQUwsQ0FBa0IzQyxFQUFFLENBQUM0RCxRQUFyQixFQUErQmtDLE1BQS9CLEdBQXdDLEtBQUtsRixnQkFBTCxDQUFzQixLQUFLOEYsTUFBTCxFQUF0QixDQUF4QztBQUNILEdBcFhtQjtBQXNYcEJrQyxFQUFBQSwyQkF0WG9CLHVDQXNYU0osV0F0WFQsRUFzWHNCRSxVQXRYdEIsRUFzWGtDRyxVQXRYbEMsRUFzWDhDbEIsUUF0WDlDLEVBc1h3RDtBQUN4RSxRQUFJbUIsYUFBYSxHQUFHSixVQUFwQjs7QUFDQSxRQUFJLEtBQUtaLFlBQUwsR0FBb0IsQ0FBcEIsSUFBeUJnQixhQUFhLEdBQUcsS0FBS2hCLFlBQXJCLEdBQW9DLEtBQUtGLFFBQXRFLEVBQWdGO0FBQzVFO0FBQ0EsVUFBSW1CLGVBQWUsR0FBRyxDQUF0Qjs7QUFDQSxhQUFPLEtBQUtqQixZQUFMLElBQXFCLEtBQUtGLFFBQWpDLEVBQTJDO0FBQ3ZDLFlBQUlvQixhQUFhLEdBQUdyQixRQUFRLENBQUNzQixnQkFBVCxDQUEwQlQsV0FBMUIsRUFDaEJPLGVBRGdCLEVBRWhCUCxXQUFXLENBQUM3QixNQUZJLENBQXBCOztBQUdBLFlBQUl1QyxXQUFXLEdBQUdWLFdBQVcsQ0FBQ1csTUFBWixDQUFtQkosZUFBbkIsRUFBb0NDLGFBQXBDLENBQWxCOztBQUNBLFlBQUlJLGdCQUFnQixHQUFHekIsUUFBUSxDQUFDZ0IsWUFBVCxDQUFzQkUsVUFBdEIsRUFBa0NLLFdBQWxDLENBQXZCOztBQUVBLFlBQUksS0FBS3BCLFlBQUwsR0FBb0JzQixnQkFBcEIsSUFBd0MsS0FBS3hCLFFBQWpELEVBQTJEO0FBQ3ZELGVBQUtFLFlBQUwsSUFBcUJzQixnQkFBckI7QUFDQUwsVUFBQUEsZUFBZSxJQUFJQyxhQUFuQjtBQUNILFNBSEQsTUFJSztBQUVELGNBQUlELGVBQWUsR0FBRyxDQUF0QixFQUF5QjtBQUNyQixnQkFBSU0sZUFBZSxHQUFHYixXQUFXLENBQUNXLE1BQVosQ0FBbUIsQ0FBbkIsRUFBc0JKLGVBQXRCLENBQXRCOztBQUNBLGlCQUFLbkksZ0JBQUwsQ0FBc0JrRyxJQUF0QixDQUEyQnVDLGVBQTNCOztBQUNBYixZQUFBQSxXQUFXLEdBQUdBLFdBQVcsQ0FBQ1csTUFBWixDQUFtQkosZUFBbkIsRUFBb0NQLFdBQVcsQ0FBQzdCLE1BQWhELENBQWQ7QUFDQW1DLFlBQUFBLGFBQWEsR0FBR25CLFFBQVEsQ0FBQ2dCLFlBQVQsQ0FBc0JFLFVBQXRCLEVBQWtDTCxXQUFsQyxFQUErQ2IsUUFBL0MsQ0FBaEI7QUFDSDs7QUFDRCxlQUFLL0csZ0JBQUwsQ0FBc0JrRyxJQUF0QixDQUEyQixFQUEzQjs7QUFDQTtBQUNIO0FBQ0o7QUFDSjs7QUFDRCxRQUFJZ0MsYUFBYSxHQUFHLEtBQUtsQixRQUF6QixFQUFtQztBQUMvQixVQUFJMEIsU0FBUyxHQUFHdEosRUFBRSxDQUFDdUosU0FBSCxDQUFhQyxZQUFiLENBQTBCaEIsV0FBMUIsRUFDWk0sYUFEWSxFQUVaLEtBQUtsQixRQUZPLEVBR1pELFFBQVEsQ0FBQ2dCLFlBQVQsQ0FBc0JFLFVBQXRCLENBSFksQ0FBaEI7O0FBSUEsV0FBSSxJQUFJWCxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdvQixTQUFTLENBQUMzQyxNQUE3QixFQUFxQ3VCLENBQUMsRUFBdEMsRUFBMEM7QUFDdEMsYUFBS3RILGdCQUFMLENBQXNCa0csSUFBdEIsQ0FBMkJ3QyxTQUFTLENBQUNwQixDQUFELENBQXBDO0FBQ0g7QUFDSixLQVJELE1BU0s7QUFDRCxXQUFLSixZQUFMLElBQXFCZ0IsYUFBckI7O0FBQ0EsV0FBS2xJLGdCQUFMLENBQXNCa0csSUFBdEIsQ0FBMkIwQixXQUEzQjtBQUNIO0FBQ0osR0FoYW1CO0FBa2FwQnpHLEVBQUFBLGNBbGFvQiw0QkFrYUg7QUFBQTs7QUFDYixTQUFLaEIsSUFBTCxDQUFVd0YsU0FBVixDQUFvQnZHLEVBQUUsQ0FBQ3dHLFFBQUgsQ0FBWXhHLEVBQUUsQ0FBQytHLFNBQUgsQ0FBYSxJQUFiLENBQVosRUFBZ0MvRyxFQUFFLENBQUNvRyxRQUFILENBQVksWUFBSztBQUNqRSxVQUFJcUQsS0FBSyxHQUFHekosRUFBRSxDQUFDMEosUUFBSCxDQUFZQyxRQUFaLEdBQXVCQyxjQUF2QixDQUFzQyxPQUF0QyxDQUFaOztBQUNBLFVBQUdILEtBQUgsRUFBVTtBQUNOLFlBQUl0RyxNQUFNLEdBQUcsRUFBYjtBQUNBLFlBQUkwRyxRQUFRLEdBQUc3SixFQUFFLENBQUNpRCxJQUFILENBQVF3RyxLQUFLLENBQUN2RyxLQUFOLEdBQWMsSUFBdEIsRUFBNEJDLE1BQTVCLENBQWY7O0FBQ0EsUUFBQSxNQUFJLENBQUNILGNBQUwsQ0FBb0I2RyxRQUFwQjs7QUFDQSxRQUFBLE1BQUksQ0FBQ3hGLFdBQUwsQ0FBaUJyRSxFQUFFLENBQUMwRixFQUFILENBQU0rRCxLQUFLLENBQUN2RyxLQUFOLEdBQWMsQ0FBZCxHQUFrQixNQUFNLENBQTlCLEVBQWlDdUcsS0FBSyxDQUFDdEcsTUFBTixHQUFlLEdBQWhELENBQWpCO0FBQ0g7QUFFSixLQVRtRCxDQUFoQyxDQUFwQjtBQVVILEdBN2FtQjtBQSthcEIyRyxFQUFBQSxTQS9hb0IsdUJBK2FSO0FBQ1IsU0FBS3RILGVBQUw7QUFDQTdDLElBQUFBLE1BQU0sQ0FBQ3FGLE1BQVAsQ0FBYytFLFNBQWQ7QUFDSDtBQWxibUIsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE5PVElDRV9QTEFaQSA9IDAgICAgICAvL+Wkp+WOhei3kemprFxyXG5jb25zdCBOT1RJQ0VfUFVCTElDID0gMSAgICAgLy/mma7pgJrot5HpqaxcclxuY29uc3QgTk9USUNFX1BVQkxJQzIgPSAyICAgIC8v5pmu6YCa6LeR6amsMlxyXG5cclxuY29uc3QgTk9USUNFX0hPUklaT05UQUwgPSAxICAgICAgICAgLy/lnoLnm7Tmu5rliqhcclxuY29uc3QgTk9USUNFX1ZFUlRJQ0FMID0gMiAgICAgICAgICAgLy/nibnmrorot5HpqaxcclxuXHJcbmNvbnN0IEh0bWxUZXh0UGFyc2VyID0gcmVxdWlyZSgnLi9odG1sLXRleHQtcGFyc2VyJyk7XHJcbmNvbnN0IF9odG1sVGV4dFBhcnNlciA9IG5ldyBIdG1sVGV4dFBhcnNlcigpO1xyXG5cclxuZ2xHYW1lLmJhc2VjbGFzcy5leHRlbmQoe1xyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBub2RlX2JvdHRvbTogY2MuTm9kZSxcclxuICAgICAgICBub2RlX2ljb246IGNjLk5vZGUsXHJcbiAgICAgICAgbm9kZV9zcGluZTogY2MuTm9kZSxcclxuICAgICAgICBub2RlX21hc2s6IGNjLldpZGdldCxcclxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIGNvbnRlbnRUZW1wOiBjYy5Ob2RlLFxyXG4gICAgICAgIGZyYW1lX2RpOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIGZyYW1lX2xhYmE6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9tdXRpcGxlTGluZVRleHQgPSBbXTtcclxuICAgICAgICB0aGlzLl9sYWJlbFNlZ21lbnRzQ2FjaGUgPSBbXTtcclxuICAgICAgICB0aGlzLmJhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDYwO1xyXG4gICAgICAgIHRoaXMubm90aWNlVHlwZSA9IE5PVElDRV9QVUJMSUM7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25TdGFydCgpO1xyXG4gICAgICAgIHRoaXMuX29yaWdpblNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICB0aGlzLmFjdGlvblR5cGUgPSAyOyAgICAgICAgICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW6buY6K6k5Li65pmu6YCa6LeR6ams54m55pWIXHJcbiAgICAgICAgdGhpcy5zY2VuZV9uYW1lcyA9IFtcIndxem5uXCIsIFwiemhhamluaHVhXCIsIFwiZWJnXCIsIFwiZGR6XCJdOyAgICAgLy/mma7pgJrot5Hpqaznga8y5YiX6KGoXHJcblxyXG4gICAgICAgIGxldCBzY2VuZU5hbWUgPSBnbEdhbWUuc2NlbmUuZ2V0U2NlbmVOYW1lKCk7XHJcbiAgICAgICAgaWYoc2NlbmVOYW1lID09PSBcInBsYXphXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRBcHBlcmFuY2UoTk9USUNFX1BMQVpBKTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5zY2VuZV9uYW1lcy5pbmRleE9mKHNjZW5lTmFtZSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRBcHBlcmFuY2UoTk9USUNFX1BVQkxJQzIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QXBwZXJhbmNlKE5PVElDRV9QVUJMSUMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5vbkNhbnZhc1Jlc2l6ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKE1FU1NBR0UuTk9USUNFLkJBU0UsIHRoaXMuYmFzZXN0YXJ0LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihNRVNTQUdFLk5PVElDRS5QTEFaQSwgdGhpcy5wbGF6YXN0YXJ0LCB0aGlzKTtcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5vbihcInJlc2l6ZVwiLCB0aGlzLm9uQ2FudmFzUmVzaXplLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICB1bnJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKE1FU1NBR0UuTk9USUNFLkJBU0UsIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9mZihNRVNTQUdFLk5PVElDRS5QTEFaQSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwicmVzaXplXCIsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIGJhc2VzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmFjdGlvblN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgcGxhemFzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmFjdGlvblN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6LeR6ams54Gv5aSW6KeCXHJcbiAgICAgKiBAcGFyYW0gdHlwZSBudW1iZXIgXHJcbiAgICAgKi9cclxuICAgIHNldEFwcGVyYW5jZSh0eXBlKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlX2JvdHRvbS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZnJhbWVfZGlbdHlwZV07XHJcbiAgICAgICAgdGhpcy5ub2RlX2ljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lX2xhYmFbdHlwZV07XHJcblxyXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5mcmFtZV9kaVt0eXBlXS5nZXRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGNjLnNpemUocmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpKTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5TaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u57uT5p2f55qE6YCf546HXHJcbiAgICAgKiBAcGFyYW0gc3BlZWQgbnVtYmVyIOmVv+W6pi/np5LpgJ8gIOavj+enkuS9jeenu+WDj+e0oFxyXG4gICAgICovXHJcbiAgICBzZXRTcGVlZChzcGVlZCkge1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ot5HpqazlpKflsI9cclxuICAgICAqIEBwYXJhbSBzaXplIGNjLnNpemUg6ZW/5a69XHJcbiAgICAgKi9cclxuICAgIHNldENvbnRlbnRTaXplKHNpemUpIHtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcclxuICAgICAgICBsZXQgbmV3X3BvcyA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLFxyXG4gICAgICAgICAgICBwb3NfaCA9IHNpemUuaGVpZ2h0IC8gbmV3X3Bvcy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHNpemUpO1xyXG5cclxuICAgICAgICAvL+iuvue9ruWbvueJh1xyXG4gICAgICAgIHRoaXMubm9kZV9pY29uLnNldFNjYWxlKHBvc19oKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+iuvue9rumBrue9qVxyXG4gICAgICAgIHRoaXMubm9kZV9tYXNrLmxlZnQgPSB0aGlzLm5vZGVfaWNvbi5nZXRDb250ZW50U2l6ZSgpLndpZHRoICogcG9zX2ggKyAzMDtcclxuICAgICAgICB0aGlzLm5vZGVfbWFzay51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+iuvue9ruWtl+S9k+Wkp+Wwj1xyXG4gICAgICAgIGxldCBmc2l6ZSA9IHNpemUuaGVpZ2h0IC8gMiArIDM7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuZm9udFNpemUgPSBmc2l6ZTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRUZW1wLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuZm9udFNpemUgPSBmc2l6ZTtcclxuICAgICAgICAvL+iuvue9rueJueaViFxyXG4gICAgICAgIGxldCBpbml0U2l6ZSA9IGNjLnNpemUoMTIwMSwgNjgpO1xyXG4gICAgICAgIGlmIChzaXplLndpZHRoICE9IGluaXRTaXplLndpZHRoIHx8IHNpemUuaGVpZ2h0ICE9IGluaXRTaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfc3BpbmUuc2NhbGVYID0gc2l6ZS53aWR0aCAvIGluaXRTaXplLndpZHRoICogMS4wMjtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX3NwaW5lLnNjYWxlWSA9IHNpemUuaGVpZ2h0IC8gaW5pdFNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfc3BpbmUueCA9IHRoaXMubm9kZV9zcGluZS54ICogKHNpemUud2lkdGggLyBpbml0U2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zcGluZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCB0aGlzLmFjdGlvblR5cGUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlX2JvdHRvbS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICB0aGlzLm5vZGVfaWNvbi5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ot5HpqazkvY3nva5cclxuICAgICAqIEBwYXJhbSBwb3MgY2MudjIgeCx5XHJcbiAgICAgKi9cclxuICAgIHNldFBvc2l0aW9uKHBvcykge1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IHBvcztcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaYr+WQpuiHquWKqOWBmuaYvuekuumakOiXj1xyXG4gICAgICogQHBhcmFtIGJvbCBib29sIOW8gOWFs1xyXG4gICAgICovXHJcbiAgICBzZXRBY3RpdmUoYm9sKSB7XHJcbiAgICAgICAgdGhpcy5iYWN0aXZlID0gYm9sO1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlLmFjdGl2ZSAmJiB0aGlzLmJhY3RpdmUpIHRoaXMubm9kZS5hY3RpdmUgPSBib2w7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lupXlm77nmoTlvIDlhbNcclxuICAgICAqIEBwYXJhbSBib2wgYm9vbCDlvIDlhbNcclxuICAgICAqL1xyXG4gICAgc2V0Qm90dG9tKGJvbCkge1xyXG4gICAgICAgIHRoaXMubm9kZV9ib3R0b20uYWN0aXZlID0gYm9sO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rui3kemprOeahOWxgue6p1xyXG4gICAgICogQHBhcmFtIHpJbmRleCBib29sIOW8gOWFs1xyXG4gICAgICovXHJcbiAgICBzZXRaSW5kZXgoekluZGV4KSB7XHJcbiAgICAgICAgaWYgKHpJbmRleCAhPSAwKSB0aGlzLm5vZGUuekluZGV4ID0gekluZGV4O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaVsOaNruWxgumHjOmdoueahOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBnZXRDb250ZW50KCkge1xyXG4gICAgICAgIGxldCBjb250ZW50RGF0YSA9IFwiXCIsXHJcbiAgICAgICAgICAgIHRhc2tEYXRhID0gZ2xHYW1lLm5vdGljZS5nZXRQbGF6YUNvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLm5vdGljZVR5cGUgPSBOT1RJQ0VfUFVCTElDO1xyXG4gICAgICAgIGlmICh0YXNrRGF0YSAmJiBnbEdhbWUuc2NlbmUuZ2V0U2NlbmVOYW1lKCkgPT09IFwicGxhemFcIikge1xyXG4gICAgICAgICAgICB0aGlzLm5vdGljZVR5cGUgPSBOT1RJQ0VfUExBWkE7XHJcbiAgICAgICAgICAgIGNvbnRlbnREYXRhID0gdGFza0RhdGEuY29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5tb2RlID0gdGFza0RhdGEubW9kZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25UeXBlID0gdGFza0RhdGEubGV2ZWw7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmFjdGlvblR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlX3NwaW5lLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVfc3BpbmUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCIxXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZV9zcGluZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldENvbXBsZXRlTGlzdGVuZXIoKHRyYWNrRW50cnksIGxvb3BDb3VudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZV9zcGluZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZV9zcGluZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlX3NwaW5lLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiMVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVfc3BpbmUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGVfc3BpbmUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCIyXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0YXNrRGF0YS5zcGVlZCkgdGhpcy5zZXRTcGVlZCh0YXNrRGF0YS5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudERhdGEgPSBnbEdhbWUubm90aWNlLmdldENvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnREYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKqOeUu+WQr+WKqFxyXG4gICAgICovXHJcbiAgICBhY3Rpb25TdGFydCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250ZW50LmdldE51bWJlck9mUnVubmluZ0FjdGlvbnMoKSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRUZW1wICYmIHRoaXMuY29udGVudFRlbXAuZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9ucygpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLmJhY3RpdmUpIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2FjdGlvbigpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5Yqo55S75rWB56iLXHJcbiAgICAgKi9cclxuICAgIF9hY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnBvc2l0aW9uID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VGVtcC5wb3NpdGlvbiA9IGNjLnYyKDAsIC02OCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50X2RhdGEgPSB0aGlzLmdldENvbnRlbnQoKTtcclxuICAgICAgICBpZiAodGhpcy5tb2RlID09IE5PVElDRV9WRVJUSUNBTCAmJiB0aGlzLm5vdGljZVR5cGUgPT0gTk9USUNFX1BMQVpBKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkNvd1JvbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnRfZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYmFjdGl2ZSkgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYWJlbF9jb250ZW50ID0gdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgbGFiZWxfY29udGVudC5zdHJpbmcgPSB0aGlzLmNvbnRlbnRfZGF0YTtcclxuICAgICAgICBsZXQgbW92ZXggPSB0aGlzLm5vZGUud2lkdGggLyAyICsgdGhpcy5jb250ZW50LndpZHRoIC8gMiArIDIwO1xyXG4gICAgICAgIHRoaXMuY29udGVudC54ID0gbW92ZXg7XHJcbiAgICAgICAgbGV0IHRleHRTcGVlZCA9IHRoaXMuc3BlZWQgKiB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5mb250U2l6ZTtcclxuICAgICAgICBsZXQgbW92ZV9hY3QgPSBjYy5tb3ZlVG8obW92ZXggLyB0ZXh0U3BlZWQsIC1tb3ZleCwgMCk7XHJcbiAgICAgICAgbGV0IGNhbGwgPSBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm90aWNlVHlwZSA9PT0gTk9USUNFX1BMQVpBKSBnbEdhbWUubm90aWNlLnJlbW92ZVBsYXphQ29udGVudCgpO1xyXG4gICAgICAgICAgICBlbHNlIGdsR2FtZS5ub3RpY2UucmVtb3ZlQ29udGVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuY29udGVudC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UobW92ZV9hY3QsIGNhbGwpKVxyXG4gICAgfSxcclxuXHJcbiAgICBjYWxsUnVuKGNvbnRlbnQsIHNwZWVkKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZWNvcmQgPT0gdGhpcy5fbXV0aXBsZUxpbmVUZXh0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGxldCBhY3Rpb25BcnIgPSBbXTtcclxuICAgICAgICAgICAgYWN0aW9uQXJyLnB1c2goY2MuZGVsYXlUaW1lKHNwZWVkKSk7XHJcbiAgICAgICAgICAgIGFjdGlvbkFyci5wdXNoKGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm90aWNlVHlwZSA9PT0gTk9USUNFX1BMQVpBKSBnbEdhbWUubm90aWNlLnJlbW92ZVBsYXphQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBnbEdhbWUubm90aWNlLnJlbW92ZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ293Um9sbCgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGFjdGlvbkFycikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udGVudC55ID4gdGhpcy5jb250ZW50VGVtcC55KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueSA9IC10aGlzLmNvbnRlbnQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdHJDb250ZW50KHRoaXMuY29udGVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wLnkgPSAtdGhpcy5jb250ZW50VGVtcC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN0ckNvbnRlbnQodGhpcy5jb250ZW50VGVtcCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0UnVuKHRoaXMuY29udGVudCwgdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0UnVuMih0aGlzLmNvbnRlbnRUZW1wLCB0aGlzLnNwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGF5Q2FsbGJhY2soKSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdHJDb250ZW50KHRoaXMuY29udGVudFRlbXApO1xyXG4gICAgICAgIHRoaXMuY29udGVudFRlbXAucnVuQWN0aW9uKGNjLm1vdmVCeSgwLjUsIDAsIHRoaXMuY29udGVudFRlbXAuaGVpZ2h0KSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGVudC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgwLjUsIDAsIHRoaXMuY29udGVudC5oZWlnaHQpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyh0aGlzLmNhbGxSdW4uYmluZCh0aGlzLCB0aGlzLmNvbnRlbnQsIHRoaXMuc3BlZWQpKVxyXG4gICAgICAgICkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhY3RSdW4yKGNvbnRlbnQsIHNwZWVkKSB7XHJcbiAgICAgICAgY29udGVudC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGNvbnRlbnQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoc3BlZWQpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC41LCAwLCBjb250ZW50LmhlaWdodClcclxuICAgICAgICApKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWN0UnVuKGNvbnRlbnQsIHNwZWVkKSB7XHJcbiAgICAgICAgY29udGVudC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGNvbnRlbnQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoc3BlZWQpLFxyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC41LCAwLCBjb250ZW50LmhlaWdodCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKHRoaXMuY2FsbFJ1bi5iaW5kKHRoaXMsIGNvbnRlbnQsIHNwZWVkKSlcclxuICAgICAgICApKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/lnoLnm7Tmu5rliqhcclxuICAgIENvd1JvbGwoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50X2RhdGEgPSB0aGlzLmdldENvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLmluaXRDb3dEYXRhKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PSBOT1RJQ0VfSE9SSVpPTlRBTCAmJiB0aGlzLm5vdGljZVR5cGUgPT0gTk9USUNFX1BMQVpBKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnRfZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNSb2xsT25lKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUodGhpcy5zcGVlZCksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5ub3RpY2VUeXBlID09PSBOT1RJQ0VfUExBWkEpIGdsR2FtZS5ub3RpY2UucmVtb3ZlUGxhemFDb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBnbEdhbWUubm90aWNlLnJlbW92ZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkNvd1JvbGwoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGVudC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKHRoaXMuc3BlZWQpLCBjYy5jYWxsRnVuYyh0aGlzLmRlbGF5Q2FsbGJhY2suYmluZCh0aGlzKSkpKTtcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMlua7muWKqOaVsOaNrlxyXG4gICAgaW5pdENvd0RhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnBvc2l0aW9uID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VGVtcC5wb3NpdGlvbiA9IGNjLnYyKDAsIC02OCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VGVtcC5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRUZW1wLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5yZWNvcmQgPSAwO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1vZGUgIT0gTk9USUNFX1ZFUlRJQ0FMKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29udGVudF9kYXRhLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHRoaXMucHJlSGFuZGxlQ29udGVudCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0U3RyQ29udGVudCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZCA9PSB0aGlzLl9tdXRpcGxlTGluZVRleHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSb2xsT25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1JvbGxPbmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHByZUhhbmRsZUNvbnRlbnQoKSB7XHJcbiAgICAgICAgbGV0IHJpY2hUZXh0ID0gdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgdGhpcy5yaWNoVGV4dCA9IHJpY2hUZXh0O1xyXG4gICAgICAgIHJpY2hUZXh0LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tYXhXaWR0aCA9IHRoaXMubm9kZS53aWR0aCAtIDEyMDtcclxuICAgICAgICB0aGlzLl9tdXRpcGxlTGluZVRleHQgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGxhc3RFbXB0eUxpbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCA9IDA7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0QXJyYXkgPSBfaHRtbFRleHRQYXJzZXIucGFyc2UodGhpcy5jb250ZW50X2RhdGEpO1xyXG4gICAgICAgIHRoaXMuX3RleHRBcnJheSA9IHRleHRBcnJheTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGV4dEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByaWNoVGV4dEVsZW1lbnQgPSB0aGlzLl90ZXh0QXJyYXlbaV07XHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gcmljaFRleHRFbGVtZW50LnRleHQ7XHJcbiAgICAgICAgICAgIGxldCBtdWx0aWxpbmVUZXh0cyA9IHRleHQuc3BsaXQoXCJcXG5cIik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG11bHRpbGluZVRleHRzLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxTdHJpbmcgPSBtdWx0aWxpbmVUZXh0c1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChsYWJlbFN0cmluZyA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyaWNoVGV4dC5faXNMYXN0Q29tcG9uZW50Q1IodGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgaiA9PT0gbXVsdGlsaW5lVGV4dHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXV0aXBsZUxpbmVUZXh0LnB1c2goXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGluZU9mZnNldFggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RFbXB0eUxpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdEVtcHR5TGluZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsYWJlbFdpZHRoID0gcmljaFRleHQuX21lYXN1cmVUZXh0KGksIGxhYmVsU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0V2l0aE1heFdpZHRoKGxhYmVsU3RyaW5nLCBsYWJlbFdpZHRoLCBpLCByaWNoVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG11bHRpbGluZVRleHRzLmxlbmd0aCA+IDEgJiYgaiA8IG11bHRpbGluZVRleHRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdXRpcGxlTGluZVRleHQucHVzaChcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/ojrflj5blvZPliY3nmoTlrZfmlbBcclxuICAgIGdldFN0ckNvbnRlbnQobm9kZSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSB0aGlzLl9tdXRpcGxlTGluZVRleHRbdGhpcy5yZWNvcmQrK107XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVSaWNoVGV4dFdpdGhNYXhXaWR0aCAobGFiZWxTdHJpbmcsIGxhYmVsV2lkdGgsIHN0eWxlSW5kZXgsIHJpY2hUZXh0KSB7XHJcbiAgICAgICAgbGV0IGZyYWdtZW50V2lkdGggPSBsYWJlbFdpZHRoO1xyXG4gICAgICAgIGlmICh0aGlzLl9saW5lT2Zmc2V0WCA+IDAgJiYgZnJhZ21lbnRXaWR0aCArIHRoaXMuX2xpbmVPZmZzZXRYID4gdGhpcy5tYXhXaWR0aCkge1xyXG4gICAgICAgICAgICAvL2NvbmNhdCBwcmV2aW91cyBsaW5lXHJcbiAgICAgICAgICAgIGxldCBjaGVja1N0YXJ0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5fbGluZU9mZnNldFggPD0gdGhpcy5tYXhXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRW5kSW5kZXggPSByaWNoVGV4dC5fZ2V0Rmlyc3RXb3JkTGVuKGxhYmVsU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU3RhcnRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbFN0cmluZy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrU3RyaW5nID0gbGFiZWxTdHJpbmcuc3Vic3RyKGNoZWNrU3RhcnRJbmRleCwgY2hlY2tFbmRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tTdHJpbmdXaWR0aCA9IHJpY2hUZXh0Ll9tZWFzdXJlVGV4dChzdHlsZUluZGV4LCBjaGVja1N0cmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVPZmZzZXRYICsgY2hlY2tTdHJpbmdXaWR0aCA8PSB0aGlzLm1heFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGluZU9mZnNldFggKz0gY2hlY2tTdHJpbmdXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja1N0YXJ0SW5kZXggKz0gY2hlY2tFbmRJbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tTdGFydEluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nU3RyaW5nID0gbGFiZWxTdHJpbmcuc3Vic3RyKDAsIGNoZWNrU3RhcnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX211dGlwbGVMaW5lVGV4dC5wdXNoKHJlbWFpbmluZ1N0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsU3RyaW5nID0gbGFiZWxTdHJpbmcuc3Vic3RyKGNoZWNrU3RhcnRJbmRleCwgbGFiZWxTdHJpbmcubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRXaWR0aCA9IHJpY2hUZXh0Ll9tZWFzdXJlVGV4dChzdHlsZUluZGV4LCBsYWJlbFN0cmluZywgcmljaFRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdXRpcGxlTGluZVRleHQucHVzaChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZnJhZ21lbnRXaWR0aCA+IHRoaXMubWF4V2lkdGgpIHtcclxuICAgICAgICAgICAgbGV0IGZyYWdtZW50cyA9IGNjLnRleHRVdGlscy5mcmFnbWVudFRleHQobGFiZWxTdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhXaWR0aCxcclxuICAgICAgICAgICAgICAgIHJpY2hUZXh0Ll9tZWFzdXJlVGV4dChzdHlsZUluZGV4KSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmcmFnbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX211dGlwbGVMaW5lVGV4dC5wdXNoKGZyYWdtZW50c1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpbmVPZmZzZXRYICs9IGZyYWdtZW50V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX211dGlwbGVMaW5lVGV4dC5wdXNoKGxhYmVsU3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2FudmFzUmVzaXplKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuMDEpLCBjYy5jYWxsRnVuYygoKT0+IHtcclxuICAgICAgICAgICAgbGV0IHBsYXphID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcInBsYXphXCIpO1xyXG4gICAgICAgICAgICBpZihwbGF6YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodCA9IDY4O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNob3dzaXplID0gY2Muc2l6ZShwbGF6YS53aWR0aCAqIDAuNjUsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvbnRlbnRTaXplKHNob3dzaXplKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24oY2MudjIocGxhemEud2lkdGggLyAyICsgNDM5IC8gMiwgcGxhemEuaGVpZ2h0IC0gMTg1KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSkpKVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICBnbEdhbWUubm90aWNlLnJlc2V0RGF0YSgpO1xyXG4gICAgfSxcclxufSk7Il19
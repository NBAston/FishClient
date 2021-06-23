
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/games/nfish/script/prefab/nfish_MovieClip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a8c5dqz1nlPsaao5CRf5dTH', 'nfish_MovieClip');
// modules/games/nfish/script/prefab/nfish_MovieClip.js

"use strict";

/***
 *  捕鱼：动画播放器
 * **/
var CONST = require("nfishConst");

glGame.movieClip = glGame.baseclass.extend({
  properties: {
    movieClipType: {
      "default": 1,
      displayName: "类型",
      tooltip: "动画类型 1 鱼 、 2特效",
      type: cc.Integer
    }
  },
  //初始化图集 atlas
  initAtlas: function initAtlas(atlas) {
    this.fish_Atlas = atlas;
  },
  //帧动画播放 atlas 图集 payName前缀 min最小 max最大 loop是否循环 isHaveZero连接符是否带0 callBack 播放完成回调 mathPly 是否随机播放 w 固定宽度 h 固定高度 showTime 多久才开始显示播放
  initEffect: function initEffect(atlas, payName, min, max, loop, isHaveZero, speed, isDestroy) {
    var callBack = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
    var mathPly = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var w = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
    var h = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : null;
    var showTime = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    this.atlas = atlas;
    this.payName = payName;
    this.effectIndex = min;
    this.min = min;
    this.max = max;
    this.loop = loop;
    this.playEffectTime = 0;
    this.playEffectSpeed = speed;
    this.isHaveZero = isHaveZero;
    this.isDestroy = isDestroy;
    this.callBack = callBack;
    this.customW = w;
    this.customH = h;
    this.showTime = showTime;

    if (this.customW != null) {
      this.node.width = this.customW;
      var spr = this.node.getComponent(cc.Sprite);
      spr.type = cc.Sprite.Type.SIMPLE;
      spr.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    }

    if (this.customH != null) {
      this.node.height = this.customH;
    }

    if (mathPly > 0) {
      this.effectIndex = Math.ceil(Math.random() * max);
    }

    if (this.showTime == 0) {
      this.node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(this.getSprName());
    }

    this.isPlayEffect = true;
  },
  //动画播放2　：获取图集名字
  getSprName: function getSprName() {
    var sprName;

    if (this.isHaveZero) {
      var MaxLength = 10;

      if (this.effectIndex < MaxLength) {
        sprName = this.payName + "0" + this.effectIndex;
      } else {
        sprName = this.payName + "" + this.effectIndex;
      }
    } else {
      sprName = this.payName + "" + this.effectIndex;
    }

    return sprName;
  },
  //缩放动画播放 atlas 图集 payName前缀 scaleToTime 缩放时长 scalex 缩放最终值x scaley 缩放最终值y delayTime 缩放延迟时间 isDestroy 播放完成是否销毁 cb 播放完成回调  showTime 多久才开始显示播放
  initEffectScaleTo: function initEffectScaleTo(atlas, payName, scaleToTime, scaleX, scaleY) {
    var _this = this;

    var delayTime = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.3;
    var isDestroy = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var cb = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    var showTime = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0.01;
    this.scheduleOnce(function () {
      _this.atlas = atlas;
      _this.payName = payName;
      _this.node.getComponent(cc.Sprite).spriteFrame = _this.atlas.getSpriteFrame(_this.payName);
      _this.node.scale = 0;

      _this.node.stopAllActions();

      var MaxZindex = 200;
      var zIndex = CONST.nodeZIndex.zIndexPartBoom + Math.ceil(Math.random() * MaxZindex);
      _this.node.zIndex = zIndex > cc.macro.MAX_ZINDEX ? cc.macro.MAX_ZINDEX - 1 : zIndex;

      _this.node.runAction(cc.sequence(cc.scaleTo(scaleToTime, scaleX, scaleX), cc.delayTime(delayTime), cc.callFunc(function () {
        if (isDestroy) {
          if (cb) cb();

          _this.node.destroy();
        } else {
          if (cb) cb();
          _this.node.active = false;
        }
      })));
    }, showTime);
  },
  //缩放+旋转动画播放 atlas 图集 payName前缀 rotateTime 旋转360时间 scaleToTime 缩放时间 scaleX x缩放值 scaleY y缩放值 isDestroy播放完成是否销毁 cb 播放完成的回调
  initEffectScaleAndRotateTo: function initEffectScaleAndRotateTo(atlas, payName, rotateTime, scaleToTime, scaleX, scaleY) {
    var _this2 = this;

    var isDestroy = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var cb = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    this.atlas = atlas;
    this.payName = payName;
    this.node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(this.payName);
    this.node.scaleX = scaleX;
    this.node.scaleY = scaleY;
    this.node.stopAllActions();
    var MaxZindex = 200;
    var zIndex = CONST.nodeZIndex.zIndexPartBoom + Math.ceil(Math.random() * MaxZindex);
    var MAX_ZINDEX = 1;
    this.node.zIndex = zIndex > cc.macro.MAX_ZINDEX ? cc.macro.MAX_ZINDEX - MAX_ZINDEX : zIndex;
    var act = cc.spawn(cc.repeat(cc.rotateBy(rotateTime, 360), 2), cc.scaleTo(scaleToTime, 0.01, 0.01));
    this.node.runAction(cc.sequence(act, cc.callFunc(function () {
      if (isDestroy) {
        if (cb) cb();

        _this2.node.destroy();
      } else {
        if (cb) cb();
        _this2.node.active = false;
      }
    })));
  },
  update: function update(dt) {
    this.playFishMovieClip(dt);

    if (this.showTime > 0) {
      this.showTime -= dt;
    }

    if (this.isPlayEffect != undefined && this.isPlayEffect == true && this.showTime <= 0) {
      if (this.loop == 0 || this.loop > 0) {
        this.playEffectTime += dt;

        if (this.playEffectTime > this.playEffectSpeed) {
          this.playEffectTime = 0;
          this.node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(this.getSprName());

          if (this.customW != null) {
            this.node.width = this.customW;
          }

          if (this.customH != null) {
            this.node.height = this.customH;
          }

          this.effectIndex++;

          if (this.effectIndex >= this.max) {
            if (this.loop != 0) {
              this.loop--;

              if (this.loop <= 0) {
                this.loop = -1;
                this.isPlayEffect = false;
                this.node.active = false;
              } else {
                this.effectIndex = this.min;
              }
            } else if (this.loop == 0) {
              if (this.effectIndex > this.max) {
                this.effectIndex = this.min;
              }
            }
          }
        }

        if (this.loop == -1) {
          if (this.callBack != null) {
            this.callBack();
          }

          if (this.isDestroy) {
            this.node.destroy();
          }
        }
      } else {
        if (this.callBack != null) {
          this.callBack();
        }

        if (this.isDestroy) {
          this.node.destroy();
        } else {
          this.loop = -1;
          this.isPlayEffect = false;
          this.node.active = false;
        }
      }
    }
  },
  //初始化动画播放器
  initFishMovieClip: function initFishMovieClip() {
    this.runfrequency = 10; //动画计时器

    this.fishMoveTimeId = 0; //动画计时器

    this.runSpeed = 0.013 * this.runfrequency; //每帧大概速度是 0.0166

    this.isStart = false; //是否开始播放

    this.lastIndex = -1; //上一次的播放第几个图

    this.index = 0; //当前播放第几个图

    this.MaxIndex = 0; //最多几个图

    this.mcBaseName = null; //基础名称

    this.currAtl = null; //当前选用的图集

    this.tideCorrect = null; //是否是鱼潮，如果是鱼潮就要做矫正播放

    this.First = 1; //首次 首帧
  },
  //动画帧频
  updateFrequency: function updateFrequency(frequency) {
    this.runSpeed = frequency;
  },
  //设置信息
  startFishRuning: function startFishRuning() {
    var resGroupId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (this.resGroupId == undefined) {
      this.resGroupId = resGroupId;

      if (this.resGroupId == undefined) {
        console.error("找不到资源！无法实例该鱼");
        return;
      }
    }

    if (this.fishData != null) {
      this.tide_fishTypeId = Number(this.fishData.fishTypeId + "");
    }

    if (this.fishData != null && this.fishData.isTide != null) {
      //开始播放矫正
      if (this.logic.tidePlayCorrect[this.tide_fishTypeId] == null) {
        this.tideCorrect = 1;
        this.index = 1;
        this.logic.tidePlayCorrect[this.tide_fishTypeId] = 1; //队长
      } else {
        //赋值别的鱼的修正index
        this.index = this.logic.tidePlayCorrect[this.tide_fishTypeId]; //跟随着
      }
    } else {
      //自然出现
      this.index = 1;
    }

    this.mcBaseName = "fish" + this.resGroupId + "_move";
    var spriteFrame = this.getImg();
    this.initSpr(spriteFrame);
    this.isStart = true;
  },
  //播放
  playFishMovieClip: function playFishMovieClip(dt) {
    if (this.isStart) {
      this.fishMoveTimeId += dt;

      if (this.fishMoveTimeId > this.runSpeed) {
        var spriteFrame = this.getImg();

        if (!spriteFrame) {
          if (this.MaxIndex === 0) {
            this.MaxIndex = this.index;
          }

          this.index = this.First;
          spriteFrame = this.getImg();
        }

        this.initSpr(spriteFrame);

        if (this.fishData != null && this.fishData.isTide != null && this.tide_fishTypeId != undefined) {
          //正时皮带 帧率矫正同步
          if (this.tideCorrect != null) {
            //队长 逻辑
            this.index++;

            if (this.MaxIndex !== 0 && this.index >= this.MaxIndex) {
              this.index = this.First;
            }

            this.logic.tidePlayCorrect[this.tide_fishTypeId] = this.index; //写入当前帧数
          } else if (this.logic.tidePlayCorrect[this.tide_fishTypeId] != null) {
            //跟随着 逻辑
            if (this.lastIndex == this.index) {
              //和上一帧一样 就不再跟随 自行
              this.index++;

              if (this.MaxIndex !== 0 && this.index >= this.MaxIndex) {
                this.lastIndex = Number(this.index + "");
                this.index = this.First;
              }
            } else {
              this.lastIndex = Number(this.index + ""); //记录上一次的记录，用来保存是否跟随失败

              this.index = this.logic.tidePlayCorrect[this.tide_fishTypeId]; //读取当前帧数

              if (this.lastIndex == this.index) {
                if (this.tideCorrect != null && this.tide_fishTypeId != undefined) {
                  var logic = require("nfishlogic").getInstance();

                  logic.tidePlayCorrect[this.tide_fishTypeId] = null;
                }

                this.tide_fishTypeId = null;
              }
            }
          } else {
            this.index++;

            if (this.MaxIndex !== 0 && this.index >= this.MaxIndex) {
              this.index = this.First;
            }
          }
        } else {
          //独自 计算，不跟随
          this.index++;

          if (this.MaxIndex !== 0 && this.index >= this.MaxIndex) {
            this.index = this.First;
          }
        }

        this.fishMoveTimeId = 0;
      }
    }
  },
  //设置帧动画
  getImg: function getImg() {
    var First = 1;
    var NormalDefault = "fish1_move";
    var spriteFrame = this.getSpriteAtlas(this.mcBaseName + this.index);

    if (spriteFrame == null && this.index == First) {
      this.mcBaseName = NormalDefault;
      this.index = First;
      return spriteFrame = this.getSpriteAtlas(this.mcBaseName + this.index);
    }

    return spriteFrame;
  },
  //初始化图片
  initSpr: function initSpr(spriteFrame) {
    this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
  },
  //从图集获取图片
  getSpriteAtlas: function getSpriteAtlas(frameName) {
    if (this.currAtl && this.fish_Atlas[this.currAtl].getSpriteFrame(frameName) != null) {
      return this.fish_Atlas[this.currAtl].getSpriteFrame(frameName);
    }

    var length = this.fish_Atlas.length;
    var sprFrame;

    for (var i = 0; i < length; i++) {
      sprFrame = this.fish_Atlas[i].getSpriteFrame(frameName);

      if (sprFrame) {
        this.currAtl = i;
        return sprFrame;
      }
    }
  },
  getRandomNum: function getRandomNum(Min, Max) {
    var Range = Number(Max) - Number(Min);
    var Rand = Math.random();
    return Min + Math.round(Rand * Range);
  },
  //清理
  clearTideCorrect: function clearTideCorrect() {
    this.OnDestroy();
  },
  OnDestroy: function OnDestroy() {
    this.fishMoveTimeId = 0;
    this.runSpeed = 0;
    this.isStart = false;
    this.index = 0;
    this.mcBaseName = null;
    this.currAtl = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xcZ2FtZXNcXG5maXNoXFxzY3JpcHRcXHByZWZhYlxcbmZpc2hfTW92aWVDbGlwLmpzIl0sIm5hbWVzIjpbIkNPTlNUIiwicmVxdWlyZSIsImdsR2FtZSIsIm1vdmllQ2xpcCIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJtb3ZpZUNsaXBUeXBlIiwiZGlzcGxheU5hbWUiLCJ0b29sdGlwIiwidHlwZSIsImNjIiwiSW50ZWdlciIsImluaXRBdGxhcyIsImF0bGFzIiwiZmlzaF9BdGxhcyIsImluaXRFZmZlY3QiLCJwYXlOYW1lIiwibWluIiwibWF4IiwibG9vcCIsImlzSGF2ZVplcm8iLCJzcGVlZCIsImlzRGVzdHJveSIsImNhbGxCYWNrIiwibWF0aFBseSIsInciLCJoIiwic2hvd1RpbWUiLCJlZmZlY3RJbmRleCIsInBsYXlFZmZlY3RUaW1lIiwicGxheUVmZmVjdFNwZWVkIiwiY3VzdG9tVyIsImN1c3RvbUgiLCJub2RlIiwid2lkdGgiLCJzcHIiLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJUeXBlIiwiU0lNUExFIiwic2l6ZU1vZGUiLCJTaXplTW9kZSIsIkNVU1RPTSIsImhlaWdodCIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwic3ByaXRlRnJhbWUiLCJnZXRTcHJpdGVGcmFtZSIsImdldFNwck5hbWUiLCJpc1BsYXlFZmZlY3QiLCJzcHJOYW1lIiwiTWF4TGVuZ3RoIiwiaW5pdEVmZmVjdFNjYWxlVG8iLCJzY2FsZVRvVGltZSIsInNjYWxlWCIsInNjYWxlWSIsImRlbGF5VGltZSIsImNiIiwic2NoZWR1bGVPbmNlIiwic2NhbGUiLCJzdG9wQWxsQWN0aW9ucyIsIk1heFppbmRleCIsInpJbmRleCIsIm5vZGVaSW5kZXgiLCJ6SW5kZXhQYXJ0Qm9vbSIsIm1hY3JvIiwiTUFYX1pJTkRFWCIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwic2NhbGVUbyIsImNhbGxGdW5jIiwiZGVzdHJveSIsImFjdGl2ZSIsImluaXRFZmZlY3RTY2FsZUFuZFJvdGF0ZVRvIiwicm90YXRlVGltZSIsImFjdCIsInNwYXduIiwicmVwZWF0Iiwicm90YXRlQnkiLCJ1cGRhdGUiLCJkdCIsInBsYXlGaXNoTW92aWVDbGlwIiwidW5kZWZpbmVkIiwiaW5pdEZpc2hNb3ZpZUNsaXAiLCJydW5mcmVxdWVuY3kiLCJmaXNoTW92ZVRpbWVJZCIsInJ1blNwZWVkIiwiaXNTdGFydCIsImxhc3RJbmRleCIsImluZGV4IiwiTWF4SW5kZXgiLCJtY0Jhc2VOYW1lIiwiY3VyckF0bCIsInRpZGVDb3JyZWN0IiwiRmlyc3QiLCJ1cGRhdGVGcmVxdWVuY3kiLCJmcmVxdWVuY3kiLCJzdGFydEZpc2hSdW5pbmciLCJyZXNHcm91cElkIiwiY29uc29sZSIsImVycm9yIiwiZmlzaERhdGEiLCJ0aWRlX2Zpc2hUeXBlSWQiLCJOdW1iZXIiLCJmaXNoVHlwZUlkIiwiaXNUaWRlIiwibG9naWMiLCJ0aWRlUGxheUNvcnJlY3QiLCJnZXRJbWciLCJpbml0U3ByIiwiZ2V0SW5zdGFuY2UiLCJOb3JtYWxEZWZhdWx0IiwiZ2V0U3ByaXRlQXRsYXMiLCJmcmFtZU5hbWUiLCJsZW5ndGgiLCJzcHJGcmFtZSIsImkiLCJnZXRSYW5kb21OdW0iLCJNaW4iLCJNYXgiLCJSYW5nZSIsIlJhbmQiLCJyb3VuZCIsImNsZWFyVGlkZUNvcnJlY3QiLCJPbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztBQUdBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBbkI7O0FBQ0FDLE1BQU0sQ0FBQ0MsU0FBUCxHQUFtQkQsTUFBTSxDQUFDRSxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUN2Q0MsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFTLENBREU7QUFFWEMsTUFBQUEsV0FBVyxFQUFFLElBRkY7QUFHWEMsTUFBQUEsT0FBTyxFQUFFLGdCQUhFO0FBSVhDLE1BQUFBLElBQUks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QUNBLGVBQU9ELFFBQVA7QUFDSDtBQUNKO0FBQ0osR0E3U3NDO0FBK1N2Q0UsRUFBQUEsWUEvU3VDLHdCQStTMUJDLEdBL1MwQixFQStTdEJDLEdBL1NzQixFQStTbEI7QUFDakIsUUFBSUMsS0FBSyxHQUFHakIsTUFBTSxDQUFDZ0IsR0FBRCxDQUFOLEdBQWNoQixNQUFNLENBQUNlLEdBQUQsQ0FBaEM7QUFDQSxRQUFJRyxJQUFJLEdBQUc5RSxJQUFJLENBQUNFLE1BQUwsRUFBWDtBQUNBLFdBQVF5RSxHQUFHLEdBQUczRSxJQUFJLENBQUMrRSxLQUFMLENBQVdELElBQUksR0FBR0QsS0FBbEIsQ0FBZDtBQUNILEdBblRzQztBQW9UdkM7QUFDQUcsRUFBQUEsZ0JBclR1Qyw4QkFxVHJCO0FBQ2QsU0FBS0MsU0FBTDtBQUNILEdBdlRzQztBQXlUdkNBLEVBQUFBLFNBelR1Qyx1QkF5VDNCO0FBQ1IsU0FBS3ZDLGNBQUwsR0FBc0IsQ0FBdEI7QUFDQSxTQUFLQyxRQUFMLEdBQXNCLENBQXRCO0FBQ0EsU0FBS0MsT0FBTCxHQUFzQixLQUF0QjtBQUNBLFNBQUtFLEtBQUwsR0FBc0IsQ0FBdEI7QUFDQSxTQUFLRSxVQUFMLEdBQXNCLElBQXRCO0FBQ0EsU0FBS0MsT0FBTCxHQUFzQixJQUF0QjtBQUNIO0FBaFVzQyxDQUF4QixDQUFuQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxyXG4gKiAg5o2V6bG877ya5Yqo55S75pKt5pS+5ZmoXHJcbiAqICoqL1xyXG5sZXQgQ09OU1QgPSByZXF1aXJlKFwibmZpc2hDb25zdFwiKTtcclxuZ2xHYW1lLm1vdmllQ2xpcCA9IGdsR2FtZS5iYXNlY2xhc3MuZXh0ZW5kKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtb3ZpZUNsaXBUeXBlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDEsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIuexu+Wei1wiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuWKqOeUu+exu+WeiyAxIOmxvCDjgIEgMueJueaViFwiLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluWbvumbhiBhdGxhc1xyXG4gICAgaW5pdEF0bGFzKGF0bGFzKXtcclxuICAgICAgICB0aGlzLmZpc2hfQXRsYXMgPSBhdGxhcztcclxuICAgIH0sXHJcbiAgICAvL+W4p+WKqOeUu+aSreaUviBhdGxhcyDlm77pm4YgcGF5TmFtZeWJjee8gCBtaW7mnIDlsI8gbWF45pyA5aSnIGxvb3DmmK/lkKblvqrnjq8gaXNIYXZlWmVyb+i/nuaOpeespuaYr+WQpuW4pjAgY2FsbEJhY2sg5pKt5pS+5a6M5oiQ5Zue6LCDIG1hdGhQbHkg5piv5ZCm6ZqP5py65pKt5pS+IHcg5Zu65a6a5a695bqmIGgg5Zu65a6a6auY5bqmIHNob3dUaW1lIOWkmuS5heaJjeW8gOWni+aYvuekuuaSreaUvlxyXG4gICAgaW5pdEVmZmVjdChhdGxhcyxwYXlOYW1lLG1pbixtYXgsbG9vcCxpc0hhdmVaZXJvLHNwZWVkLGlzRGVzdHJveSxjYWxsQmFjayA9IG51bGwsbWF0aFBseSA9IDAsdz1udWxsLGg9bnVsbCxzaG93VGltZSA9IDApe1xyXG4gICAgICAgIHRoaXMuYXRsYXMgICAgICAgICAgICA9IGF0bGFzO1xyXG4gICAgICAgIHRoaXMucGF5TmFtZSAgICAgICAgICA9IHBheU5hbWU7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RJbmRleCAgICAgID0gbWluO1xyXG4gICAgICAgIHRoaXMubWluICAgICAgICAgICAgICA9IG1pbjtcclxuICAgICAgICB0aGlzLm1heCAgICAgICAgICAgICAgPSBtYXg7XHJcbiAgICAgICAgdGhpcy5sb29wICAgICAgICAgICAgID0gbG9vcDtcclxuICAgICAgICB0aGlzLnBsYXlFZmZlY3RUaW1lICAgPSAwO1xyXG4gICAgICAgIHRoaXMucGxheUVmZmVjdFNwZWVkICA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMuaXNIYXZlWmVybyAgICAgICA9IGlzSGF2ZVplcm87XHJcbiAgICAgICAgdGhpcy5pc0Rlc3Ryb3kgICAgICAgID0gaXNEZXN0cm95O1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2sgICAgICAgICA9IGNhbGxCYWNrO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tVyAgICAgICAgICA9IHc7XHJcbiAgICAgICAgdGhpcy5jdXN0b21IICAgICAgICAgID0gaDtcclxuICAgICAgICB0aGlzLnNob3dUaW1lICAgICAgICAgPSBzaG93VGltZTtcclxuICAgICAgICBpZih0aGlzLmN1c3RvbVcgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IHRoaXMuY3VzdG9tVztcclxuICAgICAgICAgICAgbGV0IHNwciA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICBzcHIudHlwZSAgICA9IGNjLlNwcml0ZS5UeXBlLlNJTVBMRTtcclxuICAgICAgICAgICAgc3ByLnNpemVNb2RlPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmN1c3RvbUggIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSB0aGlzLmN1c3RvbUg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1hdGhQbHkgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RJbmRleCAgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc2hvd1RpbWUgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5nZXRTcHJOYW1lKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUGxheUVmZmVjdCAgICAgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8v5Yqo55S75pKt5pS+MuOAgO+8muiOt+WPluWbvumbhuWQjeWtl1xyXG4gICAgZ2V0U3ByTmFtZSgpe1xyXG4gICAgICAgIGxldCBzcHJOYW1lO1xyXG4gICAgICAgIGlmKHRoaXMuaXNIYXZlWmVybyl7XHJcbiAgICAgICAgICAgIGNvbnN0IE1heExlbmd0aCA9IDEwO1xyXG4gICAgICAgICAgICBpZih0aGlzLmVmZmVjdEluZGV4IDwgTWF4TGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHNwck5hbWUgPSB0aGlzLnBheU5hbWUrXCIwXCIrdGhpcy5lZmZlY3RJbmRleDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzcHJOYW1lID0gdGhpcy5wYXlOYW1lK1wiXCIrdGhpcy5lZmZlY3RJbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzcHJOYW1lID0gdGhpcy5wYXlOYW1lK1wiXCIrdGhpcy5lZmZlY3RJbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwck5hbWU7XHJcbiAgICB9LFxyXG4gICAgLy/nvKnmlL7liqjnlLvmkq3mlL4gYXRsYXMg5Zu+6ZuGIHBheU5hbWXliY3nvIAgc2NhbGVUb1RpbWUg57yp5pS+5pe26ZW/IHNjYWxleCDnvKnmlL7mnIDnu4jlgLx4IHNjYWxleSDnvKnmlL7mnIDnu4jlgLx5IGRlbGF5VGltZSDnvKnmlL7lu7bov5/ml7bpl7QgaXNEZXN0cm95IOaSreaUvuWujOaIkOaYr+WQpumUgOavgSBjYiDmkq3mlL7lrozmiJDlm57osIMgIHNob3dUaW1lIOWkmuS5heaJjeW8gOWni+aYvuekuuaSreaUvlxyXG4gICAgaW5pdEVmZmVjdFNjYWxlVG8oYXRsYXMscGF5TmFtZSxzY2FsZVRvVGltZSxzY2FsZVgsc2NhbGVZLGRlbGF5VGltZSA9IDAuMyxpc0Rlc3Ryb3kgPSB0cnVlLGNiID0gbnVsbCxzaG93VGltZSA9IDAuMDEpe1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYXRsYXMgICAgICA9IGF0bGFzO1xyXG4gICAgICAgICAgICB0aGlzLnBheU5hbWUgICAgPSBwYXlOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMucGF5TmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBjb25zdCBNYXhaaW5kZXggPSAyMDA7XHJcbiAgICAgICAgICAgIGxldCB6SW5kZXggICAgICA9IENPTlNULm5vZGVaSW5kZXguekluZGV4UGFydEJvb20gKyBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIE1heFppbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXg9IHpJbmRleCA+IGNjLm1hY3JvLk1BWF9aSU5ERVggPyBjYy5tYWNyby5NQVhfWklOREVYIC0xIDogekluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oc2NhbGVUb1RpbWUsc2NhbGVYLHNjYWxlWCksY2MuZGVsYXlUaW1lKGRlbGF5VGltZSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKGlzRGVzdHJveSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2IpY2IoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2IpY2IoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgfSxzaG93VGltZSlcclxuICAgIH0sXHJcbiAgICAvL+e8qeaUvivml4vovazliqjnlLvmkq3mlL4gYXRsYXMg5Zu+6ZuGIHBheU5hbWXliY3nvIAgcm90YXRlVGltZSDml4vovawzNjDml7bpl7Qgc2NhbGVUb1RpbWUg57yp5pS+5pe26Ze0IHNjYWxlWCB457yp5pS+5YC8IHNjYWxlWSB557yp5pS+5YC8IGlzRGVzdHJveeaSreaUvuWujOaIkOaYr+WQpumUgOavgSBjYiDmkq3mlL7lrozmiJDnmoTlm57osINcclxuICAgIGluaXRFZmZlY3RTY2FsZUFuZFJvdGF0ZVRvKGF0bGFzLHBheU5hbWUscm90YXRlVGltZSxzY2FsZVRvVGltZSxzY2FsZVgsc2NhbGVZLGlzRGVzdHJveSA9IHRydWUsY2IgPSBudWxsKXtcclxuICAgICAgICB0aGlzLmF0bGFzICAgICAgPSBhdGxhcztcclxuICAgICAgICB0aGlzLnBheU5hbWUgICAgPSBwYXlOYW1lO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYXRsYXMuZ2V0U3ByaXRlRnJhbWUodGhpcy5wYXlOYW1lKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gc2NhbGVYO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVkgPSBzY2FsZVk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgY29uc3QgTWF4WmluZGV4ID0gMjAwO1xyXG4gICAgICAgIGxldCB6SW5kZXggICAgICA9IENPTlNULm5vZGVaSW5kZXguekluZGV4UGFydEJvb20gKyBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIE1heFppbmRleCk7XHJcbiAgICAgICAgbGV0IE1BWF9aSU5ERVggID0gMTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PSB6SW5kZXggPiBjYy5tYWNyby5NQVhfWklOREVYID8gY2MubWFjcm8uTUFYX1pJTkRFWCAtIE1BWF9aSU5ERVggOiB6SW5kZXg7XHJcbiAgICAgICAgbGV0IGFjdCA9IGNjLnNwYXduKFxyXG4gICAgICAgICAgICBjYy5yZXBlYXQoY2Mucm90YXRlQnkocm90YXRlVGltZSwzNjApLDIpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKHNjYWxlVG9UaW1lLDAuMDEsMC4wMSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYWN0LGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIGlmKGlzRGVzdHJveSl7XHJcbiAgICAgICAgICAgICAgICBpZihjYiljYigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihjYiljYigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGUoZHQpe1xyXG4gICAgICAgIHRoaXMucGxheUZpc2hNb3ZpZUNsaXAoZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuc2hvd1RpbWUgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGltZSAtPSBkdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pc1BsYXlFZmZlY3QgIT0gdW5kZWZpbmVkICYmIHRoaXMuaXNQbGF5RWZmZWN0ID09IHRydWUgJiYgdGhpcy5zaG93VGltZSA8PSAwKXtcclxuICAgICAgICAgICAgaWYodGhpcy5sb29wID09IDAgfHwgdGhpcy5sb29wID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3RUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5wbGF5RWZmZWN0VGltZSA+IHRoaXMucGxheUVmZmVjdFNwZWVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3RUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmF0bGFzLmdldFNwcml0ZUZyYW1lKHRoaXMuZ2V0U3ByTmFtZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmN1c3RvbVcgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IHRoaXMuY3VzdG9tVztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jdXN0b21IICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gdGhpcy5jdXN0b21IO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEluZGV4ICsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZWZmZWN0SW5kZXggPj0gdGhpcy5tYXgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvb3AgIT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb3AgLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvb3AgPD0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29wID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BsYXlFZmZlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RJbmRleCA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmxvb3AgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmVmZmVjdEluZGV4ID50aGlzLm1heCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RJbmRleCA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sb29wID09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNhbGxCYWNrICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzRGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNhbGxCYWNrICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbEJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNEZXN0cm95KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29wID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BsYXlFZmZlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJbliqjnlLvmkq3mlL7lmahcclxuICAgIGluaXRGaXNoTW92aWVDbGlwICgpIHtcclxuICAgICAgICB0aGlzLnJ1bmZyZXF1ZW5jeSAgID0gMTA7ICAgLy/liqjnlLvorqHml7blmahcclxuICAgICAgICB0aGlzLmZpc2hNb3ZlVGltZUlkID0gMDsgICAgLy/liqjnlLvorqHml7blmahcclxuICAgICAgICB0aGlzLnJ1blNwZWVkICAgICAgID0gMC4wMTMgKiB0aGlzLnJ1bmZyZXF1ZW5jeTsgLy/mr4/luKflpKfmpoLpgJ/luqbmmK8gMC4wMTY2XHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ICAgICAgICA9IGZhbHNlOy8v5piv5ZCm5byA5aeL5pKt5pS+XHJcbiAgICAgICAgdGhpcy5sYXN0SW5kZXggICAgICA9IC0xOyAgICAvL+S4iuS4gOasoeeahOaSreaUvuesrOWHoOS4quWbvlxyXG4gICAgICAgIHRoaXMuaW5kZXggICAgICAgICAgPSAwOyAgICAvL+W9k+WJjeaSreaUvuesrOWHoOS4quWbvlxyXG4gICAgICAgIHRoaXMuTWF4SW5kZXggICAgICAgPSAwOyAgICAvL+acgOWkmuWHoOS4quWbvlxyXG4gICAgICAgIHRoaXMubWNCYXNlTmFtZSAgICAgPSBudWxsOyAvL+WfuuehgOWQjeensFxyXG4gICAgICAgIHRoaXMuY3VyckF0bCAgICAgICAgPSBudWxsOyAvL+W9k+WJjemAieeUqOeahOWbvumbhlxyXG4gICAgICAgIHRoaXMudGlkZUNvcnJlY3QgICAgPSBudWxsOyAvL+aYr+WQpuaYr+mxvOa9ru+8jOWmguaenOaYr+mxvOa9ruWwseimgeWBmuefq+ato+aSreaUvlxyXG4gICAgICAgIHRoaXMuRmlyc3QgICAgICAgICAgPSAxOyAgICAvL+mmluasoSDpppbluKdcclxuICAgIH0sXHJcbiAgICAvL+WKqOeUu+W4p+mikVxyXG4gICAgdXBkYXRlRnJlcXVlbmN5IChmcmVxdWVuY3kpIHtcclxuICAgICAgICB0aGlzLnJ1blNwZWVkID0gZnJlcXVlbmN5O1xyXG4gICAgfSxcclxuICAgIC8v6K6+572u5L+h5oGvXHJcbiAgICBzdGFydEZpc2hSdW5pbmcocmVzR3JvdXBJZCA9IG51bGwpe1xyXG4gICAgICAgIGlmKHRoaXMucmVzR3JvdXBJZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnJlc0dyb3VwSWQgPSByZXNHcm91cElkO1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlc0dyb3VwSWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmib7kuI3liLDotYTmupDvvIHml6Dms5Xlrp7kvovor6XpsbxcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5maXNoRGF0YSAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy50aWRlX2Zpc2hUeXBlSWQgPSBOdW1iZXIodGhpcy5maXNoRGF0YS5maXNoVHlwZUlkK1wiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmZpc2hEYXRhICE9IG51bGwgJiYgdGhpcy5maXNoRGF0YS5pc1RpZGUgIT0gbnVsbCl7Ly/lvIDlp4vmkq3mlL7nn6vmraNcclxuICAgICAgICAgICAgaWYodGhpcy5sb2dpYy50aWRlUGxheUNvcnJlY3RbdGhpcy50aWRlX2Zpc2hUeXBlSWRdID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWRlQ29ycmVjdCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICAgICAgID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naWMudGlkZVBsYXlDb3JyZWN0W3RoaXMudGlkZV9maXNoVHlwZUlkXSA9IDE7Ly/pmJ/plb9cclxuICAgICAgICAgICAgfWVsc2V7Ly/otYvlgLzliKvnmoTpsbznmoTkv67mraNpbmRleFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMubG9naWMudGlkZVBsYXlDb3JyZWN0W3RoaXMudGlkZV9maXNoVHlwZUlkXTsvL+i3n+maj+edgFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7Ly/oh6rnhLblh7rnjrBcclxuICAgICAgICAgICAgdGhpcy5pbmRleCAgICAgID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tY0Jhc2VOYW1lID1cImZpc2hcIit0aGlzLnJlc0dyb3VwSWQrXCJfbW92ZVwiO1xyXG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuZ2V0SW1nKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFNwcihzcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ICAgID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvL+aSreaUvlxyXG4gICAgcGxheUZpc2hNb3ZpZUNsaXAoZHQpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNTdGFydCl7XHJcbiAgICAgICAgICAgIHRoaXMuZmlzaE1vdmVUaW1lSWQgKz0gZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmlzaE1vdmVUaW1lSWQgPiB0aGlzLnJ1blNwZWVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuZ2V0SW1nKCk7XHJcbiAgICAgICAgICAgICAgICBpZighc3ByaXRlRnJhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuTWF4SW5kZXggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1heEluZGV4ID0gdGhpcy5pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuRmlyc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlRnJhbWUgPSB0aGlzLmdldEltZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0U3ByKHNwcml0ZUZyYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZpc2hEYXRhICE9IG51bGwgJiYgdGhpcy5maXNoRGF0YS5pc1RpZGUgIT0gbnVsbCAmJiB0aGlzLnRpZGVfZmlzaFR5cGVJZCAhPSB1bmRlZmluZWQpey8v5q2j5pe255qu5bimIOW4p+eOh+efq+ato+WQjOatpVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudGlkZUNvcnJlY3QgIT0gbnVsbCl7Ly/pmJ/plb8g6YC76L6RXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuTWF4SW5kZXggIT09IDAgJiYgdGhpcy5pbmRleCA+PSB0aGlzLk1heEluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLkZpcnN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naWMudGlkZVBsYXlDb3JyZWN0W3RoaXMudGlkZV9maXNoVHlwZUlkXSA9IHRoaXMuaW5kZXg7Ly/lhpnlhaXlvZPliY3luKfmlbBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmxvZ2ljLnRpZGVQbGF5Q29ycmVjdFt0aGlzLnRpZGVfZmlzaFR5cGVJZF0gIT0gbnVsbCl7Ly/ot5/pmo/nnYAg6YC76L6RXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubGFzdEluZGV4ID09IHRoaXMuaW5kZXgpey8v5ZKM5LiK5LiA5bin5LiA5qC3IOWwseS4jeWGjei3n+majyDoh6rooYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLk1heEluZGV4ICE9PSAwICYmIHRoaXMuaW5kZXggPj0gdGhpcy5NYXhJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW5kZXggPSBOdW1iZXIodGhpcy5pbmRleCtcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5GaXJzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbmRleCA9IE51bWJlcih0aGlzLmluZGV4K1wiXCIpOy8v6K6w5b2V5LiK5LiA5qyh55qE6K6w5b2V77yM55So5p2l5L+d5a2Y5piv5ZCm6Lef6ZqP5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5sb2dpYy50aWRlUGxheUNvcnJlY3RbdGhpcy50aWRlX2Zpc2hUeXBlSWRdOy8v6K+75Y+W5b2T5YmN5bin5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxhc3RJbmRleCA9PSB0aGlzLmluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnRpZGVDb3JyZWN0ICE9IG51bGwgJiYgdGhpcy50aWRlX2Zpc2hUeXBlSWQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvZ2ljID0gcmVxdWlyZShcIm5maXNobG9naWNcIikuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9naWMudGlkZVBsYXlDb3JyZWN0W3RoaXMudGlkZV9maXNoVHlwZUlkXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGlkZV9maXNoVHlwZUlkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLk1heEluZGV4ICE9PSAwICYmIHRoaXMuaW5kZXggPj0gdGhpcy5NYXhJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5GaXJzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNley8v54us6IeqIOiuoeeul++8jOS4jei3n+maj1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5NYXhJbmRleCAhPT0gMCAmJiB0aGlzLmluZGV4ID49IHRoaXMuTWF4SW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5GaXJzdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpc2hNb3ZlVGltZUlkID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iuvue9ruW4p+WKqOeUu1xyXG4gICAgZ2V0SW1nKCl7XHJcbiAgICAgICAgY29uc3QgRmlyc3QgID0gMTtcclxuICAgICAgICBjb25zdCBOb3JtYWxEZWZhdWx0ID0gXCJmaXNoMV9tb3ZlXCI7XHJcbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gdGhpcy5nZXRTcHJpdGVBdGxhcyh0aGlzLm1jQmFzZU5hbWUgKyB0aGlzLmluZGV4KTtcclxuICAgICAgICBpZihzcHJpdGVGcmFtZSA9PSBudWxsICYmIHRoaXMuaW5kZXggPT0gRmlyc3Qpe1xyXG4gICAgICAgICAgICB0aGlzLm1jQmFzZU5hbWUgPSBOb3JtYWxEZWZhdWx0O1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gRmlyc3Q7XHJcbiAgICAgICAgICAgIHJldHVybiBzcHJpdGVGcmFtZSA9IHRoaXMuZ2V0U3ByaXRlQXRsYXModGhpcy5tY0Jhc2VOYW1lICsgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcHJpdGVGcmFtZTtcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluWbvueJh1xyXG4gICAgaW5pdFNwcihzcHJpdGVGcmFtZSl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICB9LFxyXG4gICAgLy/ku47lm77pm4bojrflj5blm77niYdcclxuICAgIGdldFNwcml0ZUF0bGFzKGZyYW1lTmFtZSl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyQXRsICYmIHRoaXMuZmlzaF9BdGxhc1t0aGlzLmN1cnJBdGxdLmdldFNwcml0ZUZyYW1lKGZyYW1lTmFtZSkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpc2hfQXRsYXNbdGhpcy5jdXJyQXRsXS5nZXRTcHJpdGVGcmFtZShmcmFtZU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5maXNoX0F0bGFzLmxlbmd0aDtcclxuICAgICAgICBsZXQgc3ByRnJhbWU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7aTxsZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgc3ByRnJhbWUgPSB0aGlzLmZpc2hfQXRsYXNbaV0uZ2V0U3ByaXRlRnJhbWUoZnJhbWVOYW1lKTtcclxuICAgICAgICAgICAgaWYoc3ByRnJhbWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyQXRsID0gaTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcHJGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tTnVtKE1pbixNYXgpe1xyXG4gICAgICAgIGxldCBSYW5nZSA9IE51bWJlcihNYXgpIC0gTnVtYmVyKE1pbik7XHJcbiAgICAgICAgbGV0IFJhbmQgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIHJldHVybiAoTWluICsgTWF0aC5yb3VuZChSYW5kICogUmFuZ2UpKTtcclxuICAgIH0sXHJcbiAgICAvL+a4heeQhlxyXG4gICAgY2xlYXJUaWRlQ29ycmVjdCgpe1xyXG4gICAgICAgIHRoaXMuT25EZXN0cm95KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmZpc2hNb3ZlVGltZUlkID0gMDtcclxuICAgICAgICB0aGlzLnJ1blNwZWVkICAgICAgID0gMDtcclxuICAgICAgICB0aGlzLmlzU3RhcnQgICAgICAgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbmRleCAgICAgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5tY0Jhc2VOYW1lICAgICA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJyQXRsICAgICAgICA9IG51bGw7XHJcbiAgICB9LFxyXG59KTsiXX0=
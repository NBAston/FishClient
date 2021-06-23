"use strict";
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
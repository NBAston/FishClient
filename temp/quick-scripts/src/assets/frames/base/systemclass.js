"use strict";
cc._RF.push(module, 'c7248/GDd9FQZN+T/z0Dodo', 'systemclass');
// frames/base/systemclass.js

"use strict";

/**
 * 修改适配游戏的机制
 */
var SystemClass = function SystemClass() {},
    systemClass = SystemClass.prototype,
    g_instance = null; //前后台切换事件


systemClass.enterFrontandback = function () {
  cc.game.on(cc.game.EVENT_HIDE, function () {
    if (window.isShow) {
      glGame.emitter.emit("EnterBackground");
      window.isShow = false;
    }
  });
  cc.game.on(cc.game.EVENT_SHOW, function () {
    if (!window.isShow) {
      glGame.emitter.emit("EnterForeground");
      window.isShow = true;
    }
  });
};

var iponeXFit = function iponeXFit() {
  var osVer = cc.sys.osVersion;
  osVer = Number(osVer.substr(0, 2));

  if (isNaN(osVer) || osVer <= 12) {
    return;
  }

  var radion = window.devicePixelRatio || 1;
  var screen = {
    width: window.screen.width * radion,
    height: window.screen.height * radion
  };

  if (cc.sys.os == cc.sys.OS_IOS) {
    if ((window.orientation == 90 || window.orientation == -90) && (cc.sys.browserType == cc.sys.BROWSER_TYPE_SAFARI || cc.sys.browserType == cc.sys.BROWSER_TYPE_FIREFOX)) {
      if (screen.height % 896 == 0) //如果横屏之后的宽度除以896 能除尽， 那么就需要设置width 896 +1 主要是 一款XR 和 XS Max
        document.querySelector('meta[name=viewport]').content = 'width=897,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1,viewport-fit=cover';else if (screen.height % 812 == 0) //如果横屏之后的宽度除以812 能除尽， 那么就需要设置width 812 +1 主要是 x 和 XS 以及 一款 XR？
        document.querySelector('meta[name=viewport]').content = 'width=813,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1,viewport-fit=cover';else if (screen.height % 736 == 0) // 7 plus 8 plus
        document.querySelector('meta[name=viewport]').content = 'width=737,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1,viewport-fit=cover';else if (screen.height % 667 == 0) // 7 和 8 6s
        document.querySelector('meta[name=viewport]').content = 'width=668,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1,viewport-fit=cover';else //低于6s
        document.querySelector('meta[name=viewport]').content = 'width=device-width,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1,viewport-fit=cover';
    } else document.querySelector('meta[name=viewport]').content = 'width=device-width,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1,viewport-fit=cover';
  }
}; //web子游戏旋转后适配


systemClass.webGameChange = function () {
  var evt = "onorientationchange" in window ? "orientationchange" : "resize";
  window.addEventListener(evt, function () {
    console.log("onorientationchange", window.orientation); // glGame.emitter.emit("onorientationchange");

    if (cc.sys.isBrowser) {
      return;
    } //glGame.panel.showMsgBox("", cc.director.getScene().name+window.orientation)


    if (cc.director.getScene().name == "plaza" || cc.director.getScene().name == "login") {
      //通过深入 Document 内部对 body 进行检测，获取窗口大小
      if (window.orientation == 0 || window.orientation == 180) {
        glGame.scene.enterNowScene();
        glGame.readyroom.reqExitArea();
      } else if (window.orientation == 90 || window.orientation == -90) {
        glGame.scene.enterNowScene();
        glGame.readyroom.reqExitArea();
      }
    }
  }, false);
  window.addEventListener('resize', function () {
    glGame.emitter.emit("resize");
  });
  var _widgetManager = cc._widgetManager;
  var widgetInitFunc = _widgetManager.init;

  _widgetManager.init = function (director) {
    widgetInitFunc.call(this, director);
    var thisOnResized = this.onResized.bind(this);
    cc.view.on("canvas-resize", thisOnResized); //这里在手机横竖的时候  widget 不会  重新resize
    //加一个判断

    window.addEventListener("orientationchange", thisOnResized);
  };
}; // 获取转屏的设定(暂时废弃)


systemClass.webChange = function () {
  if (!cc.sys.isNative) {
    var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt, function () {
      console.log("onorientationchange", window.orientation); //通过深入 Document 内部对 body 进行检测，获取窗口大小

      var ratio = cc.view.getDevicePixelRatio(),
          cutSize = cc.view.getFrameSize(),
          winWidth = cutSize.width * ratio,
          //cc.view.getFrameSize().width,
      winHeight = cutSize.height * ratio / 1.154700538379252; //cc.view.getFrameSize().height;

      if (window.orientation == 0 || window.orientation == 180) {} else {}

      cc.view.resizeWithBrowserSize(true);
    }, false);
  } //ip x 适配


  var size = cc.view.getFrameSize();

  if (cc.sys.isNative && (size.width == 2436 && size.height == 1125 || size.width == 1125 && size.height == 2436)) {
    cc.view.setFrameSize(size.width - 250, size.height);
    cc.view.resizeWithBrowserSize(true);
  }
}; // 强制热更判定


systemClass.updateBag = function () {
  var version = "2.0.0"; //需要更换底包修改时修改（默认的底包为版本 1.0.0）

  glGame.version = version;
}; //版本校验


systemClass.comparisonVersion = function (newVer) {
  if (!newVer) return true; //校验远程端传值为空，默认不升级 

  var ver_list = glGame.version.split(".");
  var new_ver = newVer.split(".");
  var count = ver_list.length;

  for (var i = 0; i < count; i++) {
    if (ver_list[i] == null || !new_ver[i] == null) break; //版本对比失败，默认不升级

    if (Number(ver_list[i]) >= Number(new_ver[i])) continue; //版本号校验
    else return false; //与本地版本号校验，本地版本比远程版本较高
  }

  return true;
}; // 适配iPhonex


systemClass.iphonex = function () {
  if (cc.sys.isBrowser) {
    return;
  }

  var size = cc.view.getFrameSize(); //console.log("设备 size", size);

  if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE && (size.width == 2436 && size.height == 1125 || size.width == 1125 && size.height == 2436) //size.width == 812 && size.height == 375
  ) {// let cvs = cc.director.getScene()._children[0].getComponent(cc.Canvas);
      // cvs.fitHeight = true;
      // cvs.fitWidth = true;
      // glGame.emitter.emit(MESSAGE.UI.SCENE);
      //适配的机型为 960x640(1.5)  2560x1600(1.6)  
    } else if (size.width / size.height <= 1.6) {
    var cvs = cc.director.getScene()._children[0].getComponent(cc.Canvas);

    cvs.fitHeight = true;
    cvs.fitWidth = true;
    glGame.emitter.emit(MESSAGE.UI.SCENE);
  }
}; // 1920 x 1080 尺寸转换缩放比例（子游戏尺寸适配）

/**
 * @param {cc.size} size 页面尺寸强制处理
 */


systemClass.convertInterface = function (size) {
  var designSize = size || cc.size(1920, 1080); //修改设置尺寸，服务底尺寸的设计分辨率

  var cvs = cc.director.getScene()._children[0].getComponent(cc.Canvas);

  var nowSize = cvs.designResolution;
  var widthRate = nowSize.width / designSize.width;
  var heightRate = nowSize.height / designSize.height;
  return widthRate > heightRate ? heightRate : widthRate;
}; //android: 返回键监听注册到全局


systemClass.androidOn = function () {
  cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
    switch (event.keyCode) {
      case cc.macro.KEY.back:
        //2.12版本的传入参数有所不同
        // glGame.emitter.emit("backPressed");
        if (glGame.isAndroidExit || !glGame.isSystemRota) return;

        if (glGame.isHaveWebView) {
          glGame.chargeWebView.remove();
          glGame.chargeWebView = null;
          return;
        }

        glGame.isAndroidExit = true;
        glGame.panel.showDialog("提示", "是否立即关闭游戏?", function () {
          glGame.isAndroidExit = false;
          cc.game.end();
        }, function () {
          glGame.isAndroidExit = false;
        });
        break;

      default:
        console.error("啥瘠薄key, 不处理");
    }
  }, window);
}; //真机旋转刷新排版布局函数


systemClass.changeOrientation = function (bolOrientation) {
  if (glGame.isSystemRota) return;

  if (!bolOrientation) {
    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
    cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_WIDTH);
  } else {
    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_HEIGHT);
  } //手动调用触发 Wdiget 组件重新布局


  if (window.jsb) window.dispatchEvent(new cc.Event.EventCustom('resize', true));
}; //恢复排版布局函数


systemClass.recoverOrientation = function () {
  if (glGame.isSystemRota) return;
  var frameSize = cc.view.getFrameSize();
  cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE); //if (frameSize.height > frameSize.width) cc.view.setFrameSize(frameSize.height, frameSize.width);

  console.log("iphonex else scene", frameSize.width, frameSize.height);
  cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_HEIGHT);
  glGame.emitter.emit(MESSAGE.UI.SCENE); //手动调用触发 Wdiget 组件重新布局

  if (window.jsb) window.dispatchEvent(new cc.Event.EventCustom('resize', true));
}; //关闭web并重置布局排版


systemClass.closeWebView = function () {
  this.changeOrientation(true);
  glGame.isSystemRota = true; //重置固定旋转设置

  glGame.emitter.emit(MESSAGE.UI.WEBVIEW_OFF);
}; //多点触控的函数


systemClass.nodeRewrite = function () {
  cc.Node.maxTouchNum = 1;
  cc.Node.touchNum = 0;
  var __dispatchEvent__ = cc.Node.prototype.dispatchEvent;

  cc.Node.prototype.dispatchEvent = function (event) {
    switch (event.type) {
      case 'touchstart':
        if (cc.Node.touchNum < cc.Node.maxTouchNum) {
          cc.Node.touchNum++;
          cc.Node.touchNum = cc.Node.touchNum > 1 ? 1 : cc.Node.touchNum;
          this._canTouch = true;

          __dispatchEvent__.call(this, event);

          glGame.emitter.emit(MESSAGE.SYSTEM.TOUCH_BEGIN, event.touch._point);
        }

        break;

      case 'touchmove':
        if (!this._canTouch && cc.Node.touchNum < cc.Node.maxTouchNum) {
          this._canTouch = true;
          cc.Node.touchNum++;
          cc.Node.touchNum = cc.Node.touchNum > 1 ? 1 : cc.Node.touchNum;
        }

        if (this._canTouch) {
          __dispatchEvent__.call(this, event);
        }

        glGame.emitter.emit(MESSAGE.SYSTEM.TOUCH_MOVE, event.touch._point);
        break;

      case 'touchend':
        if (this._canTouch) {
          this._canTouch = false;
          cc.Node.touchNum--;
          cc.Node.touchNum = cc.Node.touchNum < 0 ? 0 : cc.Node.touchNum;

          __dispatchEvent__.call(this, event);
        }

        break;

      case 'touchcancel':
        if (this._canTouch) {
          this._canTouch = true;
          cc.Node.touchNum--;
          cc.Node.touchNum = cc.Node.touchNum < 0 ? 0 : cc.Node.touchNum;

          __dispatchEvent__.call(this, event);
        }

        break;

      default:
        __dispatchEvent__.call(this, event);

    }
  };

  var onPostActivated = cc.Node.prototype._onPostActivated;

  cc.Node.prototype._onPostActivated = function (active) {
    if (!active && this._canTouch) {
      this._canTouch = false;
      cc.Node.touchNum--;
      cc.Node.touchNum = cc.Node.touchNum < 0 ? 0 : cc.Node.touchNum;
    }

    onPostActivated.call(this, active);
  };

  var __onPreDestroy__ = cc.Node.prototype._onPreDestroy;

  cc.Node.prototype._onPreDestroy = function () {
    if (this._canTouch) {
      this._canTouch = false;
      cc.Node.touchNum--;
      cc.Node.touchNum = cc.Node.touchNum < 0 ? 0 : cc.Node.touchNum;
    }

    __onPreDestroy__.call(this);
  };
};
/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with the v2.1.0 ～ 2.2.1 version.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 ~ 2.2.1 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */


if (cc.Toggle) {
  // Whether to trigger 'toggle' and 'checkEvents' events when modifying 'toggle.isChecked' in the code
  // 在代码中修改 'toggle.isChecked' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_isChecked = true;
}

module.exports = function () {
  if (!g_instance) {
    g_instance = new SystemClass();
  }

  return g_instance;
};

cc._RF.pop();
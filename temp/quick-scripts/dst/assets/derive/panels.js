
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/derive/panels.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7c00eFKiD1AUbOXlL7eHDC8', 'panels');
// derive/panels.js

"use strict";

//继承类
module.exports = function () {
  var panel = glGame.panel;
  /**
   * @param title 标题
   * @param content 内容
   * @param next 确定后的回调
   */
  // glGame.panel.showMsgBox("示例标题", "示例内容", ()=>{console.log("确定");})

  panel.showMsgBox = function (title, content, next) {
    var _this = this;

    var center = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (glGame.room.getGameShowMsgBox()) {
      glGame.emitter.emit(MESSAGE.UI.GAME_SON_MSGBOX, {
        content: content,
        single: true,
        next: next,
        center: center
      });
    } else {
      glGame.fileutil.readPrefab(this.getLoinPrefab("confirmbox")).then(function (prefab) {
        var panel = _this.showPanel(prefab);

        panel.getComponent(panel.name).showMsg(content, true, next, false, false, false, center);
        panel.zIndex = 9999;
      });
    }
  }; // glGame.panel.showDialog("示例标题", "示例内容...", ()=>{console.log("确定")}, ()=>{console.log("取消")})


  panel.showDialog = function (title, content, next, cancel, cancel_label, confirm_label) {
    var _this2 = this;

    var zIndex = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var center = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    if (glGame.room.getGameShowMsgBox()) {
      glGame.emitter.emit(MESSAGE.UI.GAME_SON_MSGBOX, {
        content: content,
        single: false,
        next: next,
        cancel: cancel,
        center: center
      });
    } else {
      glGame.fileutil.readPrefab(this.getLoinPrefab("confirmbox")).then(function (prefab) {
        var panel = _this2.showPanel(prefab);

        panel.getComponent(panel.name).showMsg(content, false, next, cancel, cancel_label, confirm_label, center);
        panel.zIndex = 9999; //if (zIndex != null) panel.zIndex = zIndex;
      });
    }
  }; //安装修复软件的弹窗


  panel.showInstallTipBox = function () {
    var _this3 = this;

    var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    glGame.fileutil.readPrefab(this.getLoinPrefab("installTipBox")).then(function (prefab) {
      var InstallTipBox = _this3.showPanel(prefab);

      InstallTipBox.getComponent("installTipBox").setTips(bool);
    });
  };
  /**
   * 可疑账号判断
   */


  panel.showSuspicious = function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (glGame.user.get("is_demo_player") == 1) {
      var demo_player = glGame.user.get("demo_player");

      if (demo_player[name] == 2) {
        glGame.panel.showDialog("账号异常", glGame.tips.COMMON.ACCOUNTEXCEPTION, function () {
          glGame.panel.showService();
        }, function () {}, "我知道了", "联系客服");
        return true;
      }
    }

    if (glGame.logon.get("firstlogin") && glGame.user.get("suspicious") == 1) {
      glGame.panel.showDialog("账号异常", "您账号所绑定的机器码重复，请及时联系客服处理，否则游戏中部分功能将无法使用！", function () {
        glGame.panel.showService();
      }, function () {
        glGame.panel.showPanelByName("urgentnotice");
      }, "我知道了", "联系客服");
      glGame.logon.set("firstlogin", false);
      return true;
    }

    if (!glGame.user.get(name)) {
      return false;
    }

    if (name == "game" && glGame.user.get("is_".concat(name)) == 2) {
      glGame.panel.showDialog("账号异常", glGame.tips.COMMON.ACCOUNTEXCEPTION, function () {
        glGame.panel.showService();
      }, function () {}, "我知道了", "联系客服");
      return true;
    }

    if (glGame.user.get("suspicious") == 2) {
      return false;
    }

    if (glGame.user.get("suspicious") == 1 && glGame.user.get(name) == 1) {
      return false;
    }

    glGame.panel.showDialog("账号异常", glGame.tips.COMMON.ACCOUNTEXCEPTION, function () {
      glGame.panel.showService();
    }, function () {}, "我知道了", "联系客服");
    return true;
  };
  /**
   * 维护公告提示框
   * @param {} blTipctr /
   */


  panel.showMaintainNotice = function () {
    var _this4 = this;

    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    glGame.fileutil.readPrefab(this.getCommonPrefab("maintainnotice")).then(function (prefab) {
      var panel = _this4.showPanel(prefab);

      panel.getComponent(panel.name).setContent(content);
    });
  };
  /**
   * 紧急提示框
   * @param {} blTipctr /
   */


  panel.showUrgentNotice = function () {
    var _this5 = this;

    glGame.fileutil.readPrefab(this.getPlazaPrefab("urgentnotice")).then(function (prefab) {
      _this5.showPanel(prefab);
    });
  };
  /**
   * @param content 提示内容
   */


  panel.showTip = function (content) {
    var _this6 = this;

    var showtype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var _time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    glGame.fileutil.readPrefab(this.getCommonPrefab("labeltip")).then(function (prefab) {
      var panel = _this6.showPanel(prefab);

      panel.zIndex = 100;
      panel.getComponent(panel.name).showTip(content, showtype, _time);
    });
  };

  panel.showErrorTip = function (content, next) {
    var _this7 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("labeltip")).then(function (prefab) {
      var panel = _this7.showPanel(prefab);

      panel.zIndex = 100;
      panel.getComponent(panel.name).showErrorTip(content, next);
    });
  };
  /**
   * @param title     奖励内容
   * @param awarddata     奖励类型列表（详见glGame.awardtype）金币，夺宝积分，任务活跃，钻石  [{type, value}, {type,value}]
   * @param next      回调函数
   */
  // glGame.awardtype.COIN = 1;                  //金币
  // glGame.awardtype.SCORE = 2;                 //夺宝积分
  // glGame.awardtype.VITALITY = 3;              //任务活跃
  // glGame.awardtype.DIAMOND = 4;               //钻石


  panel.showAwardBox = function (title, awarddata, next) {
    var _this8 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("awardBox")).then(function (prefab) {
      var panel = _this8.showPanel(prefab);

      panel.getComponent(panel.name).showMsg(title, awarddata, next);
    });
  };
  /**
   * @param content   内容
   * @param next      确定后的回调
   * @param center    水平对齐
   */
  // glGame.panel.showServiceBox("示例内容", ()=>{console.log("确定"), center})


  panel.showServiceBox = function (content, next) {
    var _this9 = this;

    var center = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    glGame.fileutil.readPrefab(this.getLoinPrefab("servicebox")).then(function (prefab) {
      var panel = _this9.showPanel(prefab);

      panel.getComponent(panel.name).showMsg(content, next, center);
    });
  }; //显示充值到账财神


  panel.showGodOfWealth = function (parent, money) {
    //这是新的 pos范围 1-4
    glGame.emitter.emit(glGame.showGodOfWealth, {
      pos: 3,
      coin: money
    }); //老的暂停使用
    // glGame.fileutil.readPrefab(this.getCommonPrefab("coinArrvalTip")).then(prefab => {
    //     let panel = this.showPanel(prefab)
    //     panel.getComponent(panel.name).showGodOfWealth(parent, money)
    // })
  }; //显示生日


  panel.showBirthday = function () {
    var _this10 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("editBirthday")).then(function (prefab) {
      _this10.showPanel(prefab);
    });
  };
  /**
   * 显示设置界面
   * @param bool
   */


  panel.showSetting = function (zIndex) {
    var _this11 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("setting")).then(function (prefab) {
      var panel = _this11.showPanel(prefab);

      if (zIndex) {
        panel.zIndex = zIndex;
      }
    });
  };
  /**
   * 压入第一次进入大厅弹窗
  */


  panel.pushPlazaShowPanel = function (value) {
    this.plazaShowPanel.push(value);
  };
  /**
  * 显示第一次进入大厅界面弹窗
  * @param bool
  */


  panel.showFirstEnterPanel = function () {
    var name;

    if (this.plazaShowPanel && this.plazaShowPanel.length != 0) {
      name = this.plazaShowPanel.splice(0, 1);
    } else {
      return;
    }

    switch (name[0]) {
      case "setupRepairTool":
        this.showInstallTipBox();
        break;

      case "urgentnotice":
        this.showUrgentNotice();
        break;

      case "touristtip":
        this.showRegisteredGift(true);
        break;

      case "signin":
        this.showPanelByName('signin');
        break;

      case "announcement":
        this.showPanelByName('announcement');
        break;

      default:
        break;
    }
  };
  /**
   * 显示注册有礼界面
   * bool 是否播放音效
   */


  panel.showRegisteredGift = function (bool) {
    var _this12 = this;

    glGame.fileutil.readPrefab(this.getPlazaPrefab("touristtip")).then(function (prefab) {
      _this12.showPanel(prefab);
    });
  };
  /**
   * 显示debug入口
   */


  panel.showDebug = function () {
    var _this13 = this;

    var scene = cc.director.getScene();
    if (scene.getChildByName("debug")) return scene.getChildByName("debug");
    glGame.fileutil.readPrefab(this.getCommonPrefab("debug")).then(function (prefab) {
      _this13.showPanel(prefab);
    });
  };
  /**
   * 显示注册界面
   */


  panel.showRegistration = function () {
    var _this14 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("registration")).then(function (prefab) {
      var panel = _this14.showPanel(prefab);

      panel.zIndex = 30;
      panel.getComponent(panel.name).setLeftUIRegisGap();
    });
  };
  /**
   * 显示登录界面
   */


  panel.showRegister = function () {
    var _this15 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("register")).then(function (prefab) {
      var panel = _this15.showPanel(prefab);

      panel.zIndex = 30;
    });
  };
  /**
   * 显示联系客服界面
   */


  panel.showContactus = function (blOff, content, next, cancel) {
    var _this16 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("contactus")).then(function (prefab) {
      var panel = _this16.showPanel(prefab);

      panel.getComponent(panel.name).showMsg(blOff, content, next, cancel);
    });
  };
  /**
   * 显示客服界面
   */


  panel.showService = function (bSwithKefu) {
    var _this17 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("service")).then(function (prefab) {
      var panel = _this17.showPanel(prefab, true);

      panel.zIndex = 30;

      if (bSwithKefu) {
        panel.getComponent("service").setShowKefu(true);
      }

      return panel;
    });
  };
  /**
   * 显示debug面板
   */


  panel.showDebugPanel = function () {
    var _this18 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("debugpanel")).then(function (prefab) {
      var panel = _this18.showPanel(prefab);

      return panel;
    });
  };
  /**
   * 显示换桌
   */


  panel.showChangeTablePanel = function () {
    var _this19 = this;

    glGame.fileutil.readPrefab(this.getLoinPrefab("changetable")).then(function (prefab) {
      var panel = _this19.showPanel(prefab);

      panel.scale = glGame.systemclass.convertInterface();
    });
  };
  /**
   * 显示退房弹窗
   */


  panel.showExitRoomPanel = function (_type, _zIndex) {
    var _this20 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("exitRoom")).then(function (prefab) {
      var panel = _this20.showPanel(prefab);

      panel.getComponent(panel.name).showType(_type);
      if (_zIndex) panel.zIndex = _zIndex;
    });
  };
  /**
   * 显示滚动公告界面
   * @param pos       这是跑马位置
   * @param size      这只跑马大小
   * @param bPersist  跑马是否设置常驻（子游戏内必须使用常驻，换桌时保证跑马能正常播报）
   * @param zIndex    设置跑马在当前父节点的层级
   * @return {Promise}
   */


  panel.showRollNotice = function () {
    var _this21 = this;

    var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cc.v2(700, 500);
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cc.size(600, 50);
    var bPersist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var zIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    //  * @param second    设置跑马每秒位移像素
    //  * @param bActive   设置跑马是否一直显示
    //  * @param bBottome  设置跑马底图是否显示
    var speed = 3,
        bActive = false,
        bBottome = true;
    var noticeNode = cc.find("rollnotice");

    if (noticeNode) {
      // if ("plaza" != cc.director.getScene().name && zIndex == 0) {
      //     noticeNode.zIndex = noticeNode.parent.childrenCount;
      // } else 
      if (zIndex != 0) {
        noticeNode.zIndex = zIndex;
      }

      return;
    }

    if (this.rollnoticePanel) {
      var _panel = this.showPanel(this.rollnoticePanel);

      this.changeRollNoticeState(bPersist);

      _panel.getComponent(_panel.name).setPosition(pos);

      _panel.getComponent(_panel.name).setContentSize(size);

      _panel.getComponent(_panel.name).setSpeed(speed);

      _panel.getComponent(_panel.name).setActive(bActive);

      _panel.getComponent(_panel.name).setBottom(bBottome);

      _panel.getComponent(_panel.name).setZIndex(zIndex);
    } else {
      glGame.fileutil.readPrefab(this.getCommonPrefab("rollnotice")).then(function (prefab) {
        var panel = _this21.showPanel(prefab);

        panel.getComponent(panel.name).setPosition(pos);
        panel.getComponent(panel.name).setContentSize(size);
        panel.getComponent(panel.name).setSpeed(speed);
        panel.getComponent(panel.name).setActive(bActive);
        panel.getComponent(panel.name).setBottom(bBottome);
        panel.getComponent(panel.name).setZIndex(zIndex);

        _this21.changeRollNoticeState(bPersist);
      });
    }
  };

  panel.changeRollNoticeState = function (bPersist) {
    var noticeNode = cc.find("rollnotice");
    if (!noticeNode) return;

    if (bPersist) {
      cc.game.addPersistRootNode(noticeNode);
      return;
    }

    cc.game.removePersistRootNode(noticeNode);
  };

  panel.firstShowShop = function (_zIndex) {
    var _this22 = this;

    glGame.fileutil.readPrefab(this.getCommonPrefab("shop")).then(function (prefab) {
      var panel = _this22.showPanel(prefab);

      if (_zIndex) {
        panel.zIndex = _zIndex;
      }
    });
  };

  panel.showShop = function (_zIndex) {
    var _this23 = this;

    this.userRecharge = glGame.user.get("userRecharge");

    if (glGame.user.isTourist()) {
      this.showRegisteredGift(true);
      return;
    }

    if (this.showSuspicious("recharge")) {
      return;
    }

    if (this.userRecharge.exists == 0) {
      //首冲
      if (glGame.user.userRecharge.discount == 0 || glGame.user.userRecharge.discount_max == 0) {
        glGame.fileutil.readPrefab(this.getCommonPrefab("shop")).then(function (prefab) {
          var panel = _this23.showPanel(prefab);

          if (_zIndex) {
            panel.zIndex = _zIndex;
          }
        });
      } else {
        glGame.fileutil.readPrefab(this.getCommonPrefab("shop")).then(function (prefab) {
          var panel = _this23.showPanel(prefab);

          if (_zIndex) {
            panel.zIndex = _zIndex;
          }

          glGame.fileutil.readPrefab(_this23.getCommonPrefab("firstRecharge")).then(function (prefab) {
            var panel = _this23.showPanel(prefab);

            if (_zIndex) {
              panel.zIndex = _zIndex;
            }
          });
        });
      }
    } else {
      glGame.fileutil.readPrefab(this.getCommonPrefab("shop")).then(function (prefab) {
        var panel = _this23.showPanel(prefab);

        if (_zIndex) {
          panel.zIndex = _zIndex;
        }
      });
    }
  }; //显示图片头像


  panel._showcion = function (node, pathUrl, call) {
    var _this24 = this;

    if (this.iconList[pathUrl] != null) {
      node.getComponent(cc.Sprite).spriteFrame = this.iconList[pathUrl];
      node.getComponent(cc.Sprite).type = cc.Sprite.Type.SIMPLE;
      node.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.CUSTOM;
      if (call) call();
      return;
    }

    glGame.loader.remoteLoad(pathUrl).then(function (data) {
      _this24.iconList[pathUrl] = data;
      node.getComponent(cc.Sprite).spriteFrame = data;
      node.getComponent(cc.Sprite).type = cc.Sprite.Type.SIMPLE;
      node.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.CUSTOM;
      if (call) call();
    });
  };
  /**
   * 获取远程图片展示，发现回包有误，继续获取
   */


  panel.loaderImageIcon = function (node, url, count, call) {
    if (count > 5) return;
    glGame.loader.loadUrlpic(url).then(function (path) {
      glGame.panel._showcion(node, path, call);
    })["catch"](function () {
      var nextCount = ++count;
      glGame.panel.loaderImageIcon(node, url, nextCount, call);
    });
  };
  /**
   * 加载远程图片
   */


  panel.showRemoteImage = function (node, url) {
    return new Promise(function (resolve, reject) {
      if (!node) return reject();
      if (!node.children) return reject();

      if (cc.sys.isNative) {
        glGame.panel.loaderImageIcon(node, url, 0, resolve);
      } else {
        glGame.panel._showcion(node, url, resolve);
      }
    });
  };
  /**
   * 加载头像图片
   */


  panel.showHeadImage = function (node, url) {
    if (!node) return;
    if (!node.children) return;
    var headUrl = glGame.user.get("url").resource_url + url;
    console.log("头像地址", headUrl);

    if (cc.sys.isNative) {
      this.loaderImageIcon(node, headUrl, 0);
    } else {
      this._showcion(node, headUrl);
    }
  };
  /**
   * 创建选场菊花屏蔽层
   * 注意：需要手动释放
   */


  panel.showFieldSelectionJuHua = function () {
    var _this25 = this;

    var scene = cc.director.getScene();
    if (!scene) return;
    var panel = scene.getChildByName("xc_juhua"); // 重置菊花状态

    if (panel) {
      var script = panel.getComponent("juhua");
      script.CountTime();
      return panel;
    }

    if (this.juhuaPanel) {
      var xc_juhua = this.showPanel(this.juhuaPanel);
      xc_juhua.setName("xc_juhua");
      return xc_juhua;
    } else {
      glGame.fileutil.readPrefab(this.getLoinPrefab("juhua")).then(function (prefab) {
        var xc_juhua = _this25.showPanel(prefab);

        xc_juhua.setName("xc_juhua");
        return xc_juhua;
      });
    }
  };
  /**
   * 隐藏选场菊花屏蔽层
   */


  panel.hideFieldSelectionJuHua = function () {
    var scene = cc.director.getScene();
    if (!scene) return;
    var panel = scene.getChildByName("xc_juhua");

    if (panel) {
      var script = panel.getComponent("juhua");
      script.hidepic();
    }
  };
  /**
   * 销毁选场菊花屏蔽层
   * 注意：需要手动释放
   */


  panel.closeFieldSelectionJuHua = function () {
    var scene = cc.director.getScene();
    if (!scene) return;
    var panel = scene.getChildByName("xc_juhua");
    console.log("BRNN_TEST ===> 销毁选场菊花屏蔽层");
    if (panel) panel.destroy();
  };
  /**
   * 显示房间菊花屏蔽层
   */


  panel.showRoomJuHua = function () {
    var _this26 = this;

    var scene = cc.director.getScene();
    if (!scene) return;
    var panel = scene.getChildByName("room_juhua"); // 重置菊花状态

    if (panel) {
      var script = panel.getComponent("juhua");
      script.CountTime();
      return panel;
    }

    if (this.juhuaPanel) {
      var juhua = this.showPanel(this.juhuaPanel);
      juhua.setName("room_juhua");
      return juhua;
    } else {
      glGame.fileutil.readPrefab(this.getLoinPrefab("juhua")).then(function (prefab) {
        var juhua = _this26.showPanel(prefab);

        juhua.setName("room_juhua");
        return juhua;
      });
    }
  };

  panel.hideRoomjuhua = function () {
    var scene = cc.director.getScene();
    if (!scene) return;
    var panel = scene.getChildByName("room_juhua");

    if (panel) {
      var script = panel.getComponent(panel.name);
      script.hidepic();
    }
  };
  /**
   * 关闭房间菊花屏蔽层
   */


  panel.closeRoomJuHua = function () {
    var scene = cc.director.getScene();
    if (!scene) return;
    var panel = scene.getChildByName("room_juhua");
    if (panel) panel.destroy();
  };
  /**
   * 显示菊花屏蔽层
   */


  panel.showJuHua = function () {
    var _this27 = this;

    var scene = cc.director.getScene();
    if (!scene) return;
    if (scene.getChildByName("loginjuhua")) return;
    var panel = scene.getChildByName("juhua"); // 重置菊花状态

    if (panel) {
      var script = panel.getComponent("juhua");
      script.CountTime();
      return panel;
    }

    var sceneName = scene.name; // 菊花只有在登陆或则大厅才能出现, 不能在游戏内出现

    if (sceneName !== "login" && sceneName !== "plaza") return null;

    if (this.juhuaPanel) {
      return this.showPanel(this.juhuaPanel);
    } else {
      glGame.fileutil.readPrefab(this.getLoinPrefab("juhua")).then(function (prefab) {
        return _this27.showPanel(prefab);
      });
    }
  };

  panel.hidejuhua = function () {
    var scene = cc.director.getScene();
    if (!scene) return;
    var panel = scene.getChildByName("juhua");

    if (panel) {
      var script = panel.getComponent(panel.name);
      script.hidepic();
    }
  };
  /**
   * 关闭菊花屏蔽层
   */


  panel.closeJuHua = function () {
    var panel = cc.director.getScene().getChildByName("juhua");
    if (panel) panel.destroy();
  };
  /**
   * 限制按钮点击菊花层
   */


  panel.showlimitJuhua = function () {
    var _this28 = this;

    if (this.juhuaPanel) {
      var juhua = this.showPanel(this.juhuaPanel);
      juhua.setName("loginjuhua");
      var script = juhua.getComponent("juhua");
      script.setdisplay();
    } else {
      glGame.fileutil.readPrefab(this.getLoinPrefab("juhua")).then(function (prefab) {
        var juhua = _this28.showPanel(prefab);

        juhua.setName("loginjuhua");
        var script = juhua.getComponent("juhua");
        script.setdisplay();
      });
    }
  };

  panel.closelimitJuhua = function () {
    var panel = cc.director.getScene().getChildByName("loginjuhua");
    if (panel) panel.destroy();
  };
  /**
   * 显示加载进度条
   */


  panel.showLoading = function () {
    var _this29 = this;

    var entry = this.getEntryPanel();

    if (entry) {
      var entryScript = entry.getComponent(entry.name);

      if (entryScript.LOADING) {
        var loadingObj = this.showPanel(entryScript.LOADING);
        loadingObj.zIndex = cc.macro.MAX_ZINDEX;
        return;
      }
    }

    return new Promise(function (resolve, reject) {
      glGame.fileutil.readPrefab(_this29.getLoinPrefab("loading")).then(function (prefab) {
        resolve(_this29.showPanel(prefab));
      });
    });
  };
  /**
   * 显示加载进度条(进入房间后的loading遮罩)
   */


  panel.showRoomLoading = function () {// if (!glGame.room.get('changeTableState')) {
    //     if (this.publicPanelDict.hasOwnProperty("loading")) {
    //         let panel = this.showPanel(this.publicPanelDict["loading"]);
    //         panel.getComponent(panel.name).setloadingTipsSprite();
    //         return panel;
    //     }
    // }
  };
  /**
   * 关闭加载
   */


  panel.closeLoading = function () {// let loading = cc.director.getScene().getChildByName("loading");
    // if (!loading) return;
    // loading.destroy();
  };
  /**
   * 按照时间去渲染
   * @param {self} self 通常为 this ， 生命主体
   * @param {content} content 需要操作的节点父类
   * @param {number} time 时长，10个内建议使用 0.02 ，数量过大的请根据视觉情况而定（需要大量测试）
   * @param {boolean} isOpenFelTo 是否打开渐变显示
   * @param {number} fadeTime 渐变时长
   * @param {Function} callBack 播放到最后一个回调
   * @example  渐变时长案例 glGame.panel.showEffectNode(this,this.recordview,0.02,true,()=>{  });
   */


  panel.showEffectNode = function (self, content) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.02;
    var isOpenFelTo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var fadeTime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.1;
    var callBack = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    if (content && content.childrenCount < 1) return;
    var len = content.childrenCount - 1;
    var i = -1;
    self.schedule(function () {
      i++;

      if (content && content.children && content.children[i] && content.children[i].active == false) {
        if (isOpenFelTo) {
          content.children[i].active = true;
          content.children[i].opacity = 0;
          content.children[i].runAction(cc.fadeTo(fadeTime, 255));
        } else {
          content.children[i].active = true;
        }
      }

      if (i == len && callBack) {
        callBack();
      }
    }, time, len);
  }; //专为 表单 列表 Label 设置颜色


  panel.settingTableLabelColor = function (lab) {
    if (lab && lab.getComponent(cc.Label).string != null && lab.getComponent(cc.Label).string != "") {
      if (!isNaN(lab.getComponent(cc.Label).string)) {
        if (Number(lab.getComponent(cc.Label).string) >= 0) {
          lab.color = glGame.plazaColor.gain;
        } else {
          lab.color = glGame.plazaColor.loss;
        }
      } else {
        var newStr = glGame.panel.removeChinese(lab.getComponent(cc.Label).string);

        if (!isNaN(newStr)) {
          if (Number(newStr) >= 0) {
            lab.color = glGame.plazaColor.gain;
          } else {
            lab.color = glGame.plazaColor.loss;
          }
        } else {
          console.warn(">> 出了问题了 剔除中文后仍然没有数字，无法确定是大是小 string : ", lab.getComponent(cc.Label).string);
        }
      }
    }
  }; //去掉汉字


  panel.removeChinese = function (strValue) {
    if (strValue != null && strValue != "") {
      var reg = /[\u4e00-\u9fa5]/g;
      return strValue.replace(reg, "");
    } else return "";
  }; //只提取汉字


  panel.getChinese = function (strValue) {
    if (strValue != null && strValue != "") {
      var reg = /[\u4e00-\u9fa5]/g;
      return strValue.match(reg).join("");
    } else return "";
  }; //按钮粒子发射器 启动/关闭 全局开关 功能实现


  panel.showEffectPariticle = function (rootNode) {
    panel.findChildNode(rootNode);
  };

  panel.setPariticle = function (rootNode) {
    var pariticle = rootNode.getChildByName("Pariticle");

    if (pariticle != null) {
      var particleComp = pariticle.getComponent(cc.ParticleSystem);

      if (particleComp != null) {
        if (glGame.isPariticle && !pariticle.active) {
          pariticle.active = true;
        } else if (pariticle.active) {
          pariticle.active = false;
        }
      }
    }
  };

  panel.findChildNode = function (rootNode) {
    var nodeLen = rootNode.childrenCount;

    for (var i = 0; i < nodeLen; i++) {
      var childNode = rootNode.children[i];

      if (childNode.name == "publicButtonPariticle") {
        panel.setPariticle(childNode);
      }

      if (childNode.childrenCount > 0) {
        panel.findChildNode(childNode);
      }
    }
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGVyaXZlXFxwYW5lbHMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInBhbmVsIiwiZ2xHYW1lIiwic2hvd01zZ0JveCIsInRpdGxlIiwiY29udGVudCIsIm5leHQiLCJjZW50ZXIiLCJyb29tIiwiZ2V0R2FtZVNob3dNc2dCb3giLCJlbWl0dGVyIiwiZW1pdCIsIk1FU1NBR0UiLCJVSSIsIkdBTUVfU09OX01TR0JPWCIsInNpbmdsZSIsImZpbGV1dGlsIiwicmVhZFByZWZhYiIsImdldExvaW5QcmVmYWIiLCJ0aGVuIiwicHJlZmFiIiwic2hvd1BhbmVsIiwiZ2V0Q29tcG9uZW50IiwibmFtZSIsInNob3dNc2ciLCJ6SW5kZXgiLCJzaG93RGlhbG9nIiwiY2FuY2VsIiwiY2FuY2VsX2xhYmVsIiwiY29uZmlybV9sYWJlbCIsInNob3dJbnN0YWxsVGlwQm94IiwiYm9vbCIsIkluc3RhbGxUaXBCb3giLCJzZXRUaXBzIiwic2hvd1N1c3BpY2lvdXMiLCJ1c2VyIiwiZ2V0IiwiZGVtb19wbGF5ZXIiLCJ0aXBzIiwiQ09NTU9OIiwiQUNDT1VOVEVYQ0VQVElPTiIsInNob3dTZXJ2aWNlIiwibG9nb24iLCJzaG93UGFuZWxCeU5hbWUiLCJzZXQiLCJzaG93TWFpbnRhaW5Ob3RpY2UiLCJnZXRDb21tb25QcmVmYWIiLCJzZXRDb250ZW50Iiwic2hvd1VyZ2VudE5vdGljZSIsImdldFBsYXphUHJlZmFiIiwic2hvd1RpcCIsInNob3d0eXBlIiwiX3RpbWUiLCJzaG93RXJyb3JUaXAiLCJzaG93QXdhcmRCb3giLCJhd2FyZGRhdGEiLCJzaG93U2VydmljZUJveCIsInNob3dHb2RPZldlYWx0aCIsInBhcmVudCIsIm1vbmV5IiwicG9zIiwiY29pbiIsInNob3dCaXJ0aGRheSIsInNob3dTZXR0aW5nIiwicHVzaFBsYXphU2hvd1BhbmVsIiwidmFsdWUiLCJwbGF6YVNob3dQYW5lbCIsInB1c2giLCJzaG93Rmlyc3RFbnRlclBhbmVsIiwibGVuZ3RoIiwic3BsaWNlIiwic2hvd1JlZ2lzdGVyZWRHaWZ0Iiwic2hvd0RlYnVnIiwic2NlbmUiLCJjYyIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJnZXRDaGlsZEJ5TmFtZSIsInNob3dSZWdpc3RyYXRpb24iLCJzZXRMZWZ0VUlSZWdpc0dhcCIsInNob3dSZWdpc3RlciIsInNob3dDb250YWN0dXMiLCJibE9mZiIsImJTd2l0aEtlZnUiLCJzZXRTaG93S2VmdSIsInNob3dEZWJ1Z1BhbmVsIiwic2hvd0NoYW5nZVRhYmxlUGFuZWwiLCJzY2FsZSIsInN5c3RlbWNsYXNzIiwiY29udmVydEludGVyZmFjZSIsInNob3dFeGl0Um9vbVBhbmVsIiwiX3R5cGUiLCJfekluZGV4Iiwic2hvd1R5cGUiLCJzaG93Um9sbE5vdGljZSIsInYyIiwic2l6ZSIsImJQZXJzaXN0Iiwic3BlZWQiLCJiQWN0aXZlIiwiYkJvdHRvbWUiLCJub3RpY2VOb2RlIiwiZmluZCIsInJvbGxub3RpY2VQYW5lbCIsImNoYW5nZVJvbGxOb3RpY2VTdGF0ZSIsInNldFBvc2l0aW9uIiwic2V0Q29udGVudFNpemUiLCJzZXRTcGVlZCIsInNldEFjdGl2ZSIsInNldEJvdHRvbSIsInNldFpJbmRleCIsImdhbWUiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJmaXJzdFNob3dTaG9wIiwic2hvd1Nob3AiLCJ1c2VyUmVjaGFyZ2UiLCJpc1RvdXJpc3QiLCJleGlzdHMiLCJkaXNjb3VudCIsImRpc2NvdW50X21heCIsIl9zaG93Y2lvbiIsIm5vZGUiLCJwYXRoVXJsIiwiY2FsbCIsImljb25MaXN0IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJ0eXBlIiwiVHlwZSIsIlNJTVBMRSIsInNpemVNb2RlIiwiU2l6ZU1vZGUiLCJDVVNUT00iLCJsb2FkZXIiLCJyZW1vdGVMb2FkIiwiZGF0YSIsImxvYWRlckltYWdlSWNvbiIsInVybCIsImNvdW50IiwibG9hZFVybHBpYyIsInBhdGgiLCJuZXh0Q291bnQiLCJzaG93UmVtb3RlSW1hZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoaWxkcmVuIiwic3lzIiwiaXNOYXRpdmUiLCJzaG93SGVhZEltYWdlIiwiaGVhZFVybCIsInJlc291cmNlX3VybCIsImNvbnNvbGUiLCJsb2ciLCJzaG93RmllbGRTZWxlY3Rpb25KdUh1YSIsInNjcmlwdCIsIkNvdW50VGltZSIsImp1aHVhUGFuZWwiLCJ4Y19qdWh1YSIsInNldE5hbWUiLCJoaWRlRmllbGRTZWxlY3Rpb25KdUh1YSIsImhpZGVwaWMiLCJjbG9zZUZpZWxkU2VsZWN0aW9uSnVIdWEiLCJkZXN0cm95Iiwic2hvd1Jvb21KdUh1YSIsImp1aHVhIiwiaGlkZVJvb21qdWh1YSIsImNsb3NlUm9vbUp1SHVhIiwic2hvd0p1SHVhIiwic2NlbmVOYW1lIiwiaGlkZWp1aHVhIiwiY2xvc2VKdUh1YSIsInNob3dsaW1pdEp1aHVhIiwic2V0ZGlzcGxheSIsImNsb3NlbGltaXRKdWh1YSIsInNob3dMb2FkaW5nIiwiZW50cnkiLCJnZXRFbnRyeVBhbmVsIiwiZW50cnlTY3JpcHQiLCJMT0FESU5HIiwibG9hZGluZ09iaiIsIm1hY3JvIiwiTUFYX1pJTkRFWCIsInNob3dSb29tTG9hZGluZyIsImNsb3NlTG9hZGluZyIsInNob3dFZmZlY3ROb2RlIiwic2VsZiIsInRpbWUiLCJpc09wZW5GZWxUbyIsImZhZGVUaW1lIiwiY2FsbEJhY2siLCJjaGlsZHJlbkNvdW50IiwibGVuIiwiaSIsInNjaGVkdWxlIiwiYWN0aXZlIiwib3BhY2l0eSIsInJ1bkFjdGlvbiIsImZhZGVUbyIsInNldHRpbmdUYWJsZUxhYmVsQ29sb3IiLCJsYWIiLCJMYWJlbCIsInN0cmluZyIsImlzTmFOIiwiTnVtYmVyIiwiY29sb3IiLCJwbGF6YUNvbG9yIiwiZ2FpbiIsImxvc3MiLCJuZXdTdHIiLCJyZW1vdmVDaGluZXNlIiwid2FybiIsInN0clZhbHVlIiwicmVnIiwicmVwbGFjZSIsImdldENoaW5lc2UiLCJtYXRjaCIsImpvaW4iLCJzaG93RWZmZWN0UGFyaXRpY2xlIiwicm9vdE5vZGUiLCJmaW5kQ2hpbGROb2RlIiwic2V0UGFyaXRpY2xlIiwicGFyaXRpY2xlIiwicGFydGljbGVDb21wIiwiUGFydGljbGVTeXN0ZW0iLCJpc1Bhcml0aWNsZSIsIm5vZGVMZW4iLCJjaGlsZE5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVk7QUFDekIsTUFBSUMsS0FBSyxHQUFHQyxNQUFNLENBQUNELEtBQW5CO0FBQ0E7Ozs7O0FBS0E7O0FBQ0FBLEVBQUFBLEtBQUssQ0FBQ0UsVUFBTixHQUFtQixVQUFVQyxLQUFWLEVBQWlCQyxPQUFqQixFQUEwQkMsSUFBMUIsRUFBZ0Q7QUFBQTs7QUFBQSxRQUFoQkMsTUFBZ0IsdUVBQVAsS0FBTzs7QUFDL0QsUUFBSUwsTUFBTSxDQUFDTSxJQUFQLENBQVlDLGlCQUFaLEVBQUosRUFBcUM7QUFDakNQLE1BQUFBLE1BQU0sQ0FBQ1EsT0FBUCxDQUFlQyxJQUFmLENBQW9CQyxPQUFPLENBQUNDLEVBQVIsQ0FBV0MsZUFBL0IsRUFBZ0Q7QUFBRVQsUUFBQUEsT0FBTyxFQUFFQSxPQUFYO0FBQW9CVSxRQUFBQSxNQUFNLEVBQUUsSUFBNUI7QUFBa0NULFFBQUFBLElBQUksRUFBRUEsSUFBeEM7QUFBOENDLFFBQUFBLE1BQU0sRUFBRUE7QUFBdEQsT0FBaEQ7QUFDSCxLQUZELE1BRU87QUFDSEwsTUFBQUEsTUFBTSxDQUFDYyxRQUFQLENBQWdCQyxVQUFoQixDQUEyQixLQUFLQyxhQUFMLENBQW1CLFlBQW5CLENBQTNCLEVBQTZEQyxJQUE3RCxDQUFrRSxVQUFBQyxNQUFNLEVBQUk7QUFDeEUsWUFBSW5CLEtBQUssR0FBRyxLQUFJLENBQUNvQixTQUFMLENBQWVELE1BQWYsQ0FBWjs7QUFDQW5CLFFBQUFBLEtBQUssQ0FBQ3FCLFlBQU4sQ0FBbUJyQixLQUFLLENBQUNzQixJQUF6QixFQUErQkMsT0FBL0IsQ0FBdUNuQixP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QUN1SixjQUExQixDQUFuQjs7QUFDQSxVQUFJRCxZQUFZLElBQUksSUFBcEIsRUFBMEI7QUFDdEIsWUFBSTlOLE1BQU0sQ0FBQ2dPLFdBQVAsSUFBc0IsQ0FBQ0gsU0FBUyxDQUFDM0IsTUFBckMsRUFBNkM7QUFDekMyQixVQUFBQSxTQUFTLENBQUMzQixNQUFWLEdBQW1CLElBQW5CO0FBQ0gsU0FGRCxNQUVPLElBQUkyQixTQUFTLENBQUMzQixNQUFkLEVBQXNCO0FBQ3pCMkIsVUFBQUEsU0FBUyxDQUFDM0IsTUFBVixHQUFtQixLQUFuQjtBQUNIO0FBQ0o7QUFDSjtBQUNKLEdBWkQ7O0FBY0FuTSxFQUFBQSxLQUFLLENBQUM0TixhQUFOLEdBQXNCLFVBQVVELFFBQVYsRUFBb0I7QUFDdEMsUUFBSU8sT0FBTyxHQUFHUCxRQUFRLENBQUM1QixhQUF2Qjs7QUFDQSxTQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdpQyxPQUFwQixFQUE2QmpDLENBQUMsRUFBOUIsRUFBa0M7QUFDOUIsVUFBSWtDLFNBQVMsR0FBR1IsUUFBUSxDQUFDekUsUUFBVCxDQUFrQitDLENBQWxCLENBQWhCOztBQUNBLFVBQUlrQyxTQUFTLENBQUM3TSxJQUFWLElBQWtCLHVCQUF0QixFQUErQztBQUMzQ3RCLFFBQUFBLEtBQUssQ0FBQzZOLFlBQU4sQ0FBbUJNLFNBQW5CO0FBQ0g7O0FBQ0QsVUFBSUEsU0FBUyxDQUFDcEMsYUFBVixHQUEwQixDQUE5QixFQUFpQztBQUM3Qi9MLFFBQUFBLEtBQUssQ0FBQzROLGFBQU4sQ0FBb0JPLFNBQXBCO0FBQ0g7QUFDSjtBQUNKLEdBWEQ7QUFZSCxDQXh3QkQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vL+e7p+aJv+exu1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBwYW5lbCA9IGdsR2FtZS5wYW5lbDtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHRpdGxlIOagh+mimFxyXG4gICAgICogQHBhcmFtIGNvbnRlbnQg5YaF5a65XHJcbiAgICAgKiBAcGFyYW0gbmV4dCDnoa7lrprlkI7nmoTlm57osINcclxuICAgICAqL1xyXG4gICAgLy8gZ2xHYW1lLnBhbmVsLnNob3dNc2dCb3goXCLnpLrkvovmoIfpophcIiwgXCLnpLrkvovlhoXlrrlcIiwgKCk9Pntjb25zb2xlLmxvZyhcIuehruWumlwiKTt9KVxyXG4gICAgcGFuZWwuc2hvd01zZ0JveCA9IGZ1bmN0aW9uICh0aXRsZSwgY29udGVudCwgbmV4dCwgY2VudGVyID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoZ2xHYW1lLnJvb20uZ2V0R2FtZVNob3dNc2dCb3goKSkge1xyXG4gICAgICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KE1FU1NBR0UuVUkuR0FNRV9TT05fTVNHQk9YLCB7IGNvbnRlbnQ6IGNvbnRlbnQsIHNpbmdsZTogdHJ1ZSwgbmV4dDogbmV4dCwgY2VudGVyOiBjZW50ZXIgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRMb2luUHJlZmFiKFwiY29uZmlybWJveFwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVsID0gdGhpcy5zaG93UGFuZWwocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKS5zaG93TXNnKGNvbnRlbnQsIHRydWUsIG5leHQsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwi56S65L6L5qCH6aKYXCIsIFwi56S65L6L5YaF5a65Li4uXCIsICgpPT57Y29uc29sZS5sb2coXCLnoa7lrppcIil9LCAoKT0+e2NvbnNvbGUubG9nKFwi5Y+W5raIXCIpfSlcclxuICAgIHBhbmVsLnNob3dEaWFsb2cgPSBmdW5jdGlvbiAodGl0bGUsIGNvbnRlbnQsIG5leHQsIGNhbmNlbCwgY2FuY2VsX2xhYmVsLCBjb25maXJtX2xhYmVsLCB6SW5kZXggPSBudWxsLCBjZW50ZXIgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChnbEdhbWUucm9vbS5nZXRHYW1lU2hvd01zZ0JveCgpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5lbWl0dGVyLmVtaXQoTUVTU0FHRS5VSS5HQU1FX1NPTl9NU0dCT1gsIHsgY29udGVudDogY29udGVudCwgc2luZ2xlOiBmYWxzZSwgbmV4dDogbmV4dCwgY2FuY2VsOiBjYW5jZWwsIGNlbnRlcjogY2VudGVyIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5maWxldXRpbC5yZWFkUHJlZmFiKHRoaXMuZ2V0TG9pblByZWZhYihcImNvbmZpcm1ib3hcIikpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2hvd01zZyhjb250ZW50LCBmYWxzZSwgbmV4dCwgY2FuY2VsLCBjYW5jZWxfbGFiZWwsIGNvbmZpcm1fbGFiZWwsIGNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoekluZGV4ICE9IG51bGwpIHBhbmVsLnpJbmRleCA9IHpJbmRleDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL+WuieijheS/ruWkjei9r+S7tueahOW8ueeql1xyXG4gICAgcGFuZWwuc2hvd0luc3RhbGxUaXBCb3ggPSBmdW5jdGlvbiAoYm9vbCA9IHRydWUpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldExvaW5QcmVmYWIoXCJpbnN0YWxsVGlwQm94XCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBJbnN0YWxsVGlwQm94ID0gdGhpcy5zaG93UGFuZWwocHJlZmFiKTtcclxuICAgICAgICAgICAgSW5zdGFsbFRpcEJveC5nZXRDb21wb25lbnQoXCJpbnN0YWxsVGlwQm94XCIpLnNldFRpcHMoYm9vbClcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOWPr+eWkei0puWPt+WIpOaWrVxyXG4gICAgICovXHJcbiAgICBwYW5lbC5zaG93U3VzcGljaW91cyA9IGZ1bmN0aW9uIChuYW1lID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5nZXQoXCJpc19kZW1vX3BsYXllclwiKSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBkZW1vX3BsYXllciA9IGdsR2FtZS51c2VyLmdldChcImRlbW9fcGxheWVyXCIpXHJcbiAgICAgICAgICAgIGlmIChkZW1vX3BsYXllcltuYW1lXSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBnbEdhbWUucGFuZWwuc2hvd0RpYWxvZyhcIui0puWPt+W8guW4uFwiLCBnbEdhbWUudGlwcy5DT01NT04uQUNDT1VOVEVYQ0VQVElPTixcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpIH0sICgpID0+IHsgfSwgXCLmiJHnn6XpgZPkuoZcIiwgXCLogZTns7vlrqLmnI1cIilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnbEdhbWUubG9nb24uZ2V0KFwiZmlyc3Rsb2dpblwiKSAmJiBnbEdhbWUudXNlci5nZXQoXCJzdXNwaWNpb3VzXCIpID09IDEpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coXCLotKblj7flvILluLhcIiwgXCLmgqjotKblj7fmiYDnu5HlrprnmoTmnLrlmajnoIHph43lpI3vvIzor7flj4rml7bogZTns7vlrqLmnI3lpITnkIbvvIzlkKbliJnmuLjmiI/kuK3pg6jliIblip/og73lsIbml6Dms5Xkvb/nlKjvvIFcIixcclxuICAgICAgICAgICAgICAgICgpID0+IHsgZ2xHYW1lLnBhbmVsLnNob3dTZXJ2aWNlKCkgfSwgKCkgPT4geyBnbEdhbWUucGFuZWwuc2hvd1BhbmVsQnlOYW1lKFwidXJnZW50bm90aWNlXCIpIH0sIFwi5oiR55+l6YGT5LqGXCIsIFwi6IGU57O75a6i5pyNXCIpXHJcbiAgICAgICAgICAgIGdsR2FtZS5sb2dvbi5zZXQoXCJmaXJzdGxvZ2luXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWdsR2FtZS51c2VyLmdldChuYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09IFwiZ2FtZVwiICYmIGdsR2FtZS51c2VyLmdldChgaXNfJHtuYW1lfWApID09IDIpIHtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dEaWFsb2coXCLotKblj7flvILluLhcIiwgZ2xHYW1lLnRpcHMuQ09NTU9OLkFDQ09VTlRFWENFUFRJT04sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpIH0sICgpID0+IHsgfSwgXCLmiJHnn6XpgZPkuoZcIiwgXCLogZTns7vlrqLmnI1cIilcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5nZXQoXCJzdXNwaWNpb3VzXCIpID09IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnbEdhbWUudXNlci5nZXQoXCJzdXNwaWNpb3VzXCIpID09IDEgJiYgZ2xHYW1lLnVzZXIuZ2V0KG5hbWUpID09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RGlhbG9nKFwi6LSm5Y+35byC5bi4XCIsIGdsR2FtZS50aXBzLkNPTU1PTi5BQ0NPVU5URVhDRVBUSU9OLFxyXG4gICAgICAgICAgICAoKSA9PiB7IGdsR2FtZS5wYW5lbC5zaG93U2VydmljZSgpIH0sICgpID0+IHsgfSwgXCLmiJHnn6XpgZPkuoZcIiwgXCLogZTns7vlrqLmnI1cIilcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOe7tOaKpOWFrOWRiuaPkOekuuahhlxyXG4gICAgICogQHBhcmFtIHt9IGJsVGlwY3RyIC9cclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd01haW50YWluTm90aWNlID0gZnVuY3Rpb24gKGNvbnRlbnQgPSBcIlwiKSB7XHJcbiAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRDb21tb25QcmVmYWIoXCJtYWludGFpbm5vdGljZVwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2V0Q29udGVudChjb250ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOe0p+aApeaPkOekuuahhlxyXG4gICAgICogQHBhcmFtIHt9IGJsVGlwY3RyIC9cclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd1VyZ2VudE5vdGljZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldFBsYXphUHJlZmFiKFwidXJnZW50bm90aWNlXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCDmj5DnpLrlhoXlrrlcclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd1RpcCA9IGZ1bmN0aW9uIChjb250ZW50LCBzaG93dHlwZSA9IDEsIF90aW1lID0gMSkge1xyXG4gICAgICAgIGdsR2FtZS5maWxldXRpbC5yZWFkUHJlZmFiKHRoaXMuZ2V0Q29tbW9uUHJlZmFiKFwibGFiZWx0aXBcIikpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gdGhpcy5zaG93UGFuZWwocHJlZmFiKTtcclxuICAgICAgICAgICAgcGFuZWwuekluZGV4ID0gMTAwO1xyXG4gICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2hvd1RpcChjb250ZW50LCBzaG93dHlwZSwgX3RpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwYW5lbC5zaG93RXJyb3JUaXAgPSBmdW5jdGlvbiAoY29udGVudCwgbmV4dCkge1xyXG4gICAgICAgIGdsR2FtZS5maWxldXRpbC5yZWFkUHJlZmFiKHRoaXMuZ2V0Q29tbW9uUHJlZmFiKFwibGFiZWx0aXBcIikpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gdGhpcy5zaG93UGFuZWwocHJlZmFiKTtcclxuICAgICAgICAgICAgcGFuZWwuekluZGV4ID0gMTAwO1xyXG4gICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2hvd0Vycm9yVGlwKGNvbnRlbnQsIG5leHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB0aXRsZSAgICAg5aWW5Yqx5YaF5a65XHJcbiAgICAgKiBAcGFyYW0gYXdhcmRkYXRhICAgICDlpZblirHnsbvlnovliJfooajvvIjor6bop4FnbEdhbWUuYXdhcmR0eXBl77yJ6YeR5biB77yM5aS65a6d56ev5YiG77yM5Lu75Yqh5rS76LeD77yM6ZK755+zICBbe3R5cGUsIHZhbHVlfSwge3R5cGUsdmFsdWV9XVxyXG4gICAgICogQHBhcmFtIG5leHQgICAgICDlm57osIPlh73mlbBcclxuICAgICAqL1xyXG4gICAgLy8gZ2xHYW1lLmF3YXJkdHlwZS5DT0lOID0gMTsgICAgICAgICAgICAgICAgICAvL+mHkeW4gVxyXG4gICAgLy8gZ2xHYW1lLmF3YXJkdHlwZS5TQ09SRSA9IDI7ICAgICAgICAgICAgICAgICAvL+WkuuWuneenr+WIhlxyXG4gICAgLy8gZ2xHYW1lLmF3YXJkdHlwZS5WSVRBTElUWSA9IDM7ICAgICAgICAgICAgICAvL+S7u+WKoea0u+i3g1xyXG4gICAgLy8gZ2xHYW1lLmF3YXJkdHlwZS5ESUFNT05EID0gNDsgICAgICAgICAgICAgICAvL+mSu+efs1xyXG4gICAgcGFuZWwuc2hvd0F3YXJkQm94ID0gZnVuY3Rpb24gKHRpdGxlLCBhd2FyZGRhdGEsIG5leHQpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldENvbW1vblByZWZhYihcImF3YXJkQm94XCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKS5zaG93TXNnKHRpdGxlLCBhd2FyZGRhdGEsIG5leHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGNvbnRlbnQgICDlhoXlrrlcclxuICAgICAqIEBwYXJhbSBuZXh0ICAgICAg56Gu5a6a5ZCO55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyICAgIOawtOW5s+Wvuem9kFxyXG4gICAgICovXHJcbiAgICAvLyBnbEdhbWUucGFuZWwuc2hvd1NlcnZpY2VCb3goXCLnpLrkvovlhoXlrrlcIiwgKCk9Pntjb25zb2xlLmxvZyhcIuehruWumlwiKSwgY2VudGVyfSlcclxuICAgIHBhbmVsLnNob3dTZXJ2aWNlQm94ID0gZnVuY3Rpb24gKGNvbnRlbnQsIG5leHQsIGNlbnRlciA9IGZhbHNlKSB7XHJcbiAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRMb2luUHJlZmFiKFwic2VydmljZWJveFwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2hvd01zZyhjb250ZW50LCBuZXh0LCBjZW50ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8v5pi+56S65YWF5YC85Yiw6LSm6LSi56WeXHJcbiAgICBwYW5lbC5zaG93R29kT2ZXZWFsdGggPSBmdW5jdGlvbiAocGFyZW50LCBtb25leSkge1xyXG4gICAgICAgIC8v6L+Z5piv5paw55qEIHBvc+iMg+WbtCAxLTRcclxuICAgICAgICBnbEdhbWUuZW1pdHRlci5lbWl0KGdsR2FtZS5zaG93R29kT2ZXZWFsdGgsIHsgcG9zOiAzLCBjb2luOiBtb25leSB9KTtcclxuICAgICAgICAvL+iAgeeahOaaguWBnOS9v+eUqFxyXG4gICAgICAgIC8vIGdsR2FtZS5maWxldXRpbC5yZWFkUHJlZmFiKHRoaXMuZ2V0Q29tbW9uUHJlZmFiKFwiY29pbkFycnZhbFRpcFwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgIC8vICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIpXHJcbiAgICAgICAgLy8gICAgIHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKS5zaG93R29kT2ZXZWFsdGgocGFyZW50LCBtb25leSlcclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG4gICAgLy/mmL7npLrnlJ/ml6VcclxuICAgIHBhbmVsLnNob3dCaXJ0aGRheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldENvbW1vblByZWZhYihcImVkaXRCaXJ0aGRheVwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuiuvue9rueVjOmdolxyXG4gICAgICogQHBhcmFtIGJvb2xcclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd1NldHRpbmcgPSBmdW5jdGlvbiAoekluZGV4KSB7XHJcbiAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRDb21tb25QcmVmYWIoXCJzZXR0aW5nXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgIGlmICh6SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHBhbmVsLnpJbmRleCA9IHpJbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOi+WFpeesrOS4gOasoei/m+WFpeWkp+WOheW8ueeql1xyXG4gICAgKi9cclxuICAgIHBhbmVsLnB1c2hQbGF6YVNob3dQYW5lbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucGxhemFTaG93UGFuZWwucHVzaCh2YWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5pi+56S656ys5LiA5qyh6L+b5YWl5aSn5Y6F55WM6Z2i5by556qXXHJcbiAgICAqIEBwYXJhbSBib29sXHJcbiAgICAqL1xyXG4gICAgcGFuZWwuc2hvd0ZpcnN0RW50ZXJQYW5lbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbmFtZTtcclxuICAgICAgICBpZiAodGhpcy5wbGF6YVNob3dQYW5lbCAmJiB0aGlzLnBsYXphU2hvd1BhbmVsLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSB0aGlzLnBsYXphU2hvd1BhbmVsLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChuYW1lWzBdKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZXR1cFJlcGFpclRvb2xcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0luc3RhbGxUaXBCb3goKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidXJnZW50bm90aWNlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dVcmdlbnROb3RpY2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidG91cmlzdHRpcFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVnaXN0ZXJlZEdpZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNpZ25pblwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFuZWxCeU5hbWUoJ3NpZ25pbicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhbm5vdW5jZW1lbnRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhbmVsQnlOYW1lKCdhbm5vdW5jZW1lbnQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuazqOWGjOacieekvOeVjOmdolxyXG4gICAgICogYm9vbCDmmK/lkKbmkq3mlL7pn7PmlYhcclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd1JlZ2lzdGVyZWRHaWZ0ID0gZnVuY3Rpb24gKGJvb2wpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldFBsYXphUHJlZmFiKFwidG91cmlzdHRpcFwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekumRlYnVn5YWl5Y+jXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLnNob3dEZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgIGlmIChzY2VuZS5nZXRDaGlsZEJ5TmFtZShcImRlYnVnXCIpKSByZXR1cm4gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJkZWJ1Z1wiKTtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldENvbW1vblByZWZhYihcImRlYnVnXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65rOo5YaM55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLnNob3dSZWdpc3RyYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRDb21tb25QcmVmYWIoXCJyZWdpc3RyYXRpb25cIikpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gdGhpcy5zaG93UGFuZWwocHJlZmFiKTtcclxuICAgICAgICAgICAgcGFuZWwuekluZGV4ID0gMzBcclxuICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsLm5hbWUpLnNldExlZnRVSVJlZ2lzR2FwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S655m75b2V55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLnNob3dSZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldENvbW1vblByZWZhYihcInJlZ2lzdGVyXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgIHBhbmVsLnpJbmRleCA9IDMwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuiBlOezu+WuouacjeeVjOmdolxyXG4gICAgICovXHJcbiAgICBwYW5lbC5zaG93Q29udGFjdHVzID0gZnVuY3Rpb24gKGJsT2ZmLCBjb250ZW50LCBuZXh0LCBjYW5jZWwpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldENvbW1vblByZWZhYihcImNvbnRhY3R1c1wiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2hvd01zZyhibE9mZiwgY29udGVudCwgbmV4dCwgY2FuY2VsKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrlrqLmnI3nlYzpnaJcclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd1NlcnZpY2UgPSBmdW5jdGlvbiAoYlN3aXRoS2VmdSkge1xyXG4gICAgICAgIGdsR2FtZS5maWxldXRpbC5yZWFkUHJlZmFiKHRoaXMuZ2V0Q29tbW9uUHJlZmFiKFwic2VydmljZVwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIsIHRydWUpO1xyXG4gICAgICAgICAgICBwYW5lbC56SW5kZXggPSAzMDtcclxuICAgICAgICAgICAgaWYgKGJTd2l0aEtlZnUpIHtcclxuICAgICAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChcInNlcnZpY2VcIikuc2V0U2hvd0tlZnUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S6ZGVidWfpnaLmnb9cclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd0RlYnVnUGFuZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRDb21tb25QcmVmYWIoXCJkZWJ1Z3BhbmVsXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgIHJldHVybiBwYW5lbDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaNouahjFxyXG4gICAgICovXHJcbiAgICBwYW5lbC5zaG93Q2hhbmdlVGFibGVQYW5lbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldExvaW5QcmVmYWIoXCJjaGFuZ2V0YWJsZVwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgICAgICBwYW5lbC5zY2FsZSA9IGdsR2FtZS5zeXN0ZW1jbGFzcy5jb252ZXJ0SW50ZXJmYWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S66YCA5oi/5by556qXXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLnNob3dFeGl0Um9vbVBhbmVsID0gZnVuY3Rpb24gKF90eXBlLCBfekluZGV4KSB7XHJcbiAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRDb21tb25QcmVmYWIoXCJleGl0Um9vbVwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2hvd1R5cGUoX3R5cGUpO1xyXG4gICAgICAgICAgICBpZiAoX3pJbmRleCkgcGFuZWwuekluZGV4ID0gX3pJbmRleDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmu5rliqjlhazlkYrnlYzpnaJcclxuICAgICAqIEBwYXJhbSBwb3MgICAgICAg6L+Z5piv6LeR6ams5L2N572uXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSAgICAgIOi/meWPqui3kemprOWkp+Wwj1xyXG4gICAgICogQHBhcmFtIGJQZXJzaXN0ICDot5HpqazmmK/lkKborr7nva7luLjpqbvvvIjlrZDmuLjmiI/lhoXlv4Xpobvkvb/nlKjluLjpqbvvvIzmjaLmoYzml7bkv53or4Hot5Hpqazog73mraPluLjmkq3miqXvvIlcclxuICAgICAqIEBwYXJhbSB6SW5kZXggICAg6K6+572u6LeR6ams5Zyo5b2T5YmN54i26IqC54K555qE5bGC57qnXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBwYW5lbC5zaG93Um9sbE5vdGljZSA9IGZ1bmN0aW9uIChwb3MgPSBjYy52Mig3MDAsIDUwMCksIHNpemUgPSBjYy5zaXplKDYwMCwgNTApLCBiUGVyc2lzdCA9IHRydWUsIHpJbmRleCA9IDApIHtcclxuICAgICAgICAvLyAgKiBAcGFyYW0gc2Vjb25kICAgIOiuvue9rui3kemprOavj+enkuS9jeenu+WDj+e0oFxyXG4gICAgICAgIC8vICAqIEBwYXJhbSBiQWN0aXZlICAg6K6+572u6LeR6ams5piv5ZCm5LiA55u05pi+56S6XHJcbiAgICAgICAgLy8gICogQHBhcmFtIGJCb3R0b21lICDorr7nva7ot5HpqazlupXlm77mmK/lkKbmmL7npLpcclxuICAgICAgICBsZXQgc3BlZWQgPSAzLCBiQWN0aXZlID0gZmFsc2UsIGJCb3R0b21lID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbm90aWNlTm9kZSA9IGNjLmZpbmQoXCJyb2xsbm90aWNlXCIpO1xyXG4gICAgICAgIGlmIChub3RpY2VOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIChcInBsYXphXCIgIT0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5uYW1lICYmIHpJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBub3RpY2VOb2RlLnpJbmRleCA9IG5vdGljZU5vZGUucGFyZW50LmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSBcclxuICAgICAgICAgICAgaWYgKHpJbmRleCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBub3RpY2VOb2RlLnpJbmRleCA9IHpJbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJvbGxub3RpY2VQYW5lbCkge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbCh0aGlzLnJvbGxub3RpY2VQYW5lbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUm9sbE5vdGljZVN0YXRlKGJQZXJzaXN0KTtcclxuICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsLm5hbWUpLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKS5zZXRDb250ZW50U2l6ZShzaXplKTtcclxuICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsLm5hbWUpLnNldFNwZWVkKHNwZWVkKTtcclxuICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsLm5hbWUpLnNldEFjdGl2ZShiQWN0aXZlKTtcclxuICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsLm5hbWUpLnNldEJvdHRvbShiQm90dG9tZSk7XHJcbiAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKS5zZXRaSW5kZXgoekluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldENvbW1vblByZWZhYihcInJvbGxub3RpY2VcIikpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKS5zZXRDb250ZW50U2l6ZShzaXplKTtcclxuICAgICAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKS5zZXRTcGVlZChzcGVlZCk7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2V0QWN0aXZlKGJBY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsLm5hbWUpLnNldEJvdHRvbShiQm90dG9tZSk7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSkuc2V0WkluZGV4KHpJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVJvbGxOb3RpY2VTdGF0ZShiUGVyc2lzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcGFuZWwuY2hhbmdlUm9sbE5vdGljZVN0YXRlID0gZnVuY3Rpb24gKGJQZXJzaXN0KSB7XHJcbiAgICAgICAgbGV0IG5vdGljZU5vZGUgPSBjYy5maW5kKFwicm9sbG5vdGljZVwiKTtcclxuICAgICAgICBpZiAoIW5vdGljZU5vZGUpIHJldHVybjtcclxuICAgICAgICBpZiAoYlBlcnNpc3QpIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUobm90aWNlTm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUobm90aWNlTm9kZSlcclxuICAgIH07XHJcblxyXG4gICAgcGFuZWwuZmlyc3RTaG93U2hvcCA9IGZ1bmN0aW9uIChfekluZGV4KSB7XHJcbiAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRDb21tb25QcmVmYWIoXCJzaG9wXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgIGlmIChfekluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBwYW5lbC56SW5kZXggPSBfekluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHBhbmVsLnNob3dTaG9wID0gZnVuY3Rpb24gKF96SW5kZXgpIHtcclxuICAgICAgICB0aGlzLnVzZXJSZWNoYXJnZSA9IGdsR2FtZS51c2VyLmdldChcInVzZXJSZWNoYXJnZVwiKTtcclxuICAgICAgICBpZiAoZ2xHYW1lLnVzZXIuaXNUb3VyaXN0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVnaXN0ZXJlZEdpZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1N1c3BpY2lvdXMoXCJyZWNoYXJnZVwiKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVzZXJSZWNoYXJnZS5leGlzdHMgPT0gMCkgey8v6aaW5YayXHJcbiAgICAgICAgICAgIGlmIChnbEdhbWUudXNlci51c2VyUmVjaGFyZ2UuZGlzY291bnQgPT0gMCB8fCBnbEdhbWUudXNlci51c2VyUmVjaGFyZ2UuZGlzY291bnRfbWF4ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5maWxldXRpbC5yZWFkUHJlZmFiKHRoaXMuZ2V0Q29tbW9uUHJlZmFiKFwic2hvcFwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF96SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuekluZGV4ID0gX3pJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdsR2FtZS5maWxldXRpbC5yZWFkUHJlZmFiKHRoaXMuZ2V0Q29tbW9uUHJlZmFiKFwic2hvcFwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF96SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuekluZGV4ID0gX3pJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRDb21tb25QcmVmYWIoXCJmaXJzdFJlY2hhcmdlXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbCA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfekluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYW5lbC56SW5kZXggPSBfekluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRDb21tb25QcmVmYWIoXCJzaG9wXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFuZWwgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF96SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbC56SW5kZXggPSBfekluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5pi+56S65Zu+54mH5aS05YOPXHJcbiAgICBwYW5lbC5fc2hvd2Npb24gPSBmdW5jdGlvbiAobm9kZSwgcGF0aFVybCwgY2FsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLmljb25MaXN0W3BhdGhVcmxdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbkxpc3RbcGF0aFVybF07XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNJTVBMRTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XHJcbiAgICAgICAgICAgIGlmIChjYWxsKSBjYWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2xHYW1lLmxvYWRlci5yZW1vdGVMb2FkKHBhdGhVcmwpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvbkxpc3RbcGF0aFVybF0gPSBkYXRhO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gZGF0YTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0lNUExFO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcclxuICAgICAgICAgICAgaWYgKGNhbGwpIGNhbGwoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6L+c56iL5Zu+54mH5bGV56S677yM5Y+R546w5Zue5YyF5pyJ6K+v77yM57un57ut6I635Y+WXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLmxvYWRlckltYWdlSWNvbiA9IGZ1bmN0aW9uIChub2RlLCB1cmwsIGNvdW50LCBjYWxsKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ID4gNSkgcmV0dXJuO1xyXG4gICAgICAgIGdsR2FtZS5sb2FkZXIubG9hZFVybHBpYyh1cmwpLnRoZW4ocGF0aCA9PiB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5fc2hvd2Npb24obm9kZSwgcGF0aCwgY2FsbCk7XHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmV4dENvdW50ID0gKytjb3VudDtcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLmxvYWRlckltYWdlSWNvbihub2RlLCB1cmwsIG5leHRDb3VudCwgY2FsbClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3ov5znqIvlm77niYdcclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd1JlbW90ZUltYWdlID0gZnVuY3Rpb24gKG5vZGUsIHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghbm9kZSkgcmV0dXJuIHJlamVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4pIHJldHVybiByZWplY3QoKTtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLmxvYWRlckltYWdlSWNvbihub2RlLCB1cmwsIDAsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLl9zaG93Y2lvbihub2RlLCB1cmwsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWktOWDj+WbvueJh1xyXG4gICAgICovXHJcbiAgICBwYW5lbC5zaG93SGVhZEltYWdlID0gZnVuY3Rpb24gKG5vZGUsIHVybCkge1xyXG4gICAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICghbm9kZS5jaGlsZHJlbikgcmV0dXJuO1xyXG4gICAgICAgIGxldCBoZWFkVXJsID0gZ2xHYW1lLnVzZXIuZ2V0KFwidXJsXCIpLnJlc291cmNlX3VybCArIHVybDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWktOWDj+WcsOWdgFwiLCBoZWFkVXJsKTtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVySW1hZ2VJY29uKG5vZGUsIGhlYWRVcmwsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3djaW9uKG5vZGUsIGhlYWRVcmwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rpgInlnLroj4roirHlsY/olL3lsYJcclxuICAgICAqIOazqOaEj++8mumcgOimgeaJi+WKqOmHiuaUvlxyXG4gICAgICovXHJcbiAgICBwYW5lbC5zaG93RmllbGRTZWxlY3Rpb25KdUh1YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgIGlmICghc2NlbmUpIHJldHVybjtcclxuICAgICAgICBsZXQgcGFuZWwgPSBzY2VuZS5nZXRDaGlsZEJ5TmFtZShcInhjX2p1aHVhXCIpO1xyXG4gICAgICAgIC8vIOmHjee9ruiPiuiKseeKtuaAgVxyXG4gICAgICAgIGlmIChwYW5lbCkge1xyXG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gcGFuZWwuZ2V0Q29tcG9uZW50KFwianVodWFcIik7XHJcbiAgICAgICAgICAgIHNjcmlwdC5Db3VudFRpbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5qdWh1YVBhbmVsKSB7XHJcbiAgICAgICAgICAgIGxldCB4Y19qdWh1YSA9IHRoaXMuc2hvd1BhbmVsKHRoaXMuanVodWFQYW5lbCk7XHJcbiAgICAgICAgICAgIHhjX2p1aHVhLnNldE5hbWUoXCJ4Y19qdWh1YVwiKVxyXG4gICAgICAgICAgICByZXR1cm4geGNfanVodWE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRMb2luUHJlZmFiKFwianVodWFcIikpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB4Y19qdWh1YSA9IHRoaXMuc2hvd1BhbmVsKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB4Y19qdWh1YS5zZXROYW1lKFwieGNfanVodWFcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiB4Y19qdWh1YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/pgInlnLroj4roirHlsY/olL3lsYJcclxuICAgICAqL1xyXG4gICAgcGFuZWwuaGlkZUZpZWxkU2VsZWN0aW9uSnVIdWEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICBpZiAoIXNjZW5lKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBhbmVsID0gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJ4Y19qdWh1YVwiKTtcclxuICAgICAgICBpZiAocGFuZWwpIHtcclxuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IHBhbmVsLmdldENvbXBvbmVudChcImp1aHVhXCIpO1xyXG4gICAgICAgICAgICBzY3JpcHQuaGlkZXBpYygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgemAieWcuuiPiuiKseWxj+iUveWxglxyXG4gICAgICog5rOo5oSP77ya6ZyA6KaB5omL5Yqo6YeK5pS+XHJcbiAgICAgKi9cclxuICAgIHBhbmVsLmNsb3NlRmllbGRTZWxlY3Rpb25KdUh1YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgIGlmICghc2NlbmUpIHJldHVybjtcclxuICAgICAgICBsZXQgcGFuZWwgPSBzY2VuZS5nZXRDaGlsZEJ5TmFtZShcInhjX2p1aHVhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQlJOTl9URVNUID09PT4g6ZSA5q+B6YCJ5Zy66I+K6Iqx5bGP6JS95bGCXCIpO1xyXG4gICAgICAgIGlmIChwYW5lbCkgcGFuZWwuZGVzdHJveSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65oi/6Ze06I+K6Iqx5bGP6JS95bGCXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLnNob3dSb29tSnVIdWEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICBpZiAoIXNjZW5lKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBhbmVsID0gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJyb29tX2p1aHVhXCIpO1xyXG4gICAgICAgIC8vIOmHjee9ruiPiuiKseeKtuaAgVxyXG4gICAgICAgIGlmIChwYW5lbCkge1xyXG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gcGFuZWwuZ2V0Q29tcG9uZW50KFwianVodWFcIik7XHJcbiAgICAgICAgICAgIHNjcmlwdC5Db3VudFRpbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5qdWh1YVBhbmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBqdWh1YSA9IHRoaXMuc2hvd1BhbmVsKHRoaXMuanVodWFQYW5lbCk7XHJcbiAgICAgICAgICAgIGp1aHVhLnNldE5hbWUoXCJyb29tX2p1aHVhXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBqdWh1YTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbEdhbWUuZmlsZXV0aWwucmVhZFByZWZhYih0aGlzLmdldExvaW5QcmVmYWIoXCJqdWh1YVwiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGp1aHVhID0gdGhpcy5zaG93UGFuZWwocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIGp1aHVhLnNldE5hbWUoXCJyb29tX2p1aHVhXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganVodWE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBwYW5lbC5oaWRlUm9vbWp1aHVhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICAgICAgaWYgKCFzY2VuZSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwYW5lbCA9IHNjZW5lLmdldENoaWxkQnlOYW1lKFwicm9vbV9qdWh1YVwiKTtcclxuICAgICAgICBpZiAocGFuZWwpIHtcclxuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKTtcclxuICAgICAgICAgICAgc2NyaXB0LmhpZGVwaWMoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63miL/pl7Toj4roirHlsY/olL3lsYJcclxuICAgICAqL1xyXG4gICAgcGFuZWwuY2xvc2VSb29tSnVIdWEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICBpZiAoIXNjZW5lKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBhbmVsID0gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJyb29tX2p1aHVhXCIpO1xyXG4gICAgICAgIGlmIChwYW5lbCkgcGFuZWwuZGVzdHJveSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5pi+56S66I+K6Iqx5bGP6JS95bGCXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLnNob3dKdUh1YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgIGlmICghc2NlbmUpIHJldHVybjtcclxuICAgICAgICBpZiAoc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2dpbmp1aHVhXCIpKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBhbmVsID0gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJqdWh1YVwiKTtcclxuICAgICAgICAvLyDph43nva7oj4roirHnirbmgIFcclxuICAgICAgICBpZiAocGFuZWwpIHtcclxuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IHBhbmVsLmdldENvbXBvbmVudChcImp1aHVhXCIpO1xyXG4gICAgICAgICAgICBzY3JpcHQuQ291bnRUaW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYW5lbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjZW5lTmFtZSA9IHNjZW5lLm5hbWU7XHJcbiAgICAgICAgLy8g6I+K6Iqx5Y+q5pyJ5Zyo55m76ZmG5oiW5YiZ5aSn5Y6F5omN6IO95Ye6546wLCDkuI3og73lnKjmuLjmiI/lhoXlh7rnjrBcclxuICAgICAgICBpZiAoc2NlbmVOYW1lICE9PSBcImxvZ2luXCIgJiYgc2NlbmVOYW1lICE9PSBcInBsYXphXCIpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmp1aHVhUGFuZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1BhbmVsKHRoaXMuanVodWFQYW5lbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRMb2luUHJlZmFiKFwianVodWFcIikpLnRoZW4ocHJlZmFiID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcGFuZWwuaGlkZWp1aHVhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICAgICAgaWYgKCFzY2VuZSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwYW5lbCA9IHNjZW5lLmdldENoaWxkQnlOYW1lKFwianVodWFcIik7XHJcbiAgICAgICAgaWYgKHBhbmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSBwYW5lbC5nZXRDb21wb25lbnQocGFuZWwubmFtZSk7XHJcbiAgICAgICAgICAgIHNjcmlwdC5oaWRlcGljKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet6I+K6Iqx5bGP6JS95bGCXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLmNsb3NlSnVIdWEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHBhbmVsID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcImp1aHVhXCIpO1xyXG4gICAgICAgIGlmIChwYW5lbCkgcGFuZWwuZGVzdHJveSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog6ZmQ5Yi25oyJ6ZKu54K55Ye76I+K6Iqx5bGCXHJcbiAgICAgKi9cclxuICAgIHBhbmVsLnNob3dsaW1pdEp1aHVhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmp1aHVhUGFuZWwpIHtcclxuICAgICAgICAgICAgbGV0IGp1aHVhID0gdGhpcy5zaG93UGFuZWwodGhpcy5qdWh1YVBhbmVsKTtcclxuICAgICAgICAgICAganVodWEuc2V0TmFtZShcImxvZ2luanVodWFcIilcclxuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGp1aHVhLmdldENvbXBvbmVudChcImp1aHVhXCIpO1xyXG4gICAgICAgICAgICBzY3JpcHQuc2V0ZGlzcGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5maWxldXRpbC5yZWFkUHJlZmFiKHRoaXMuZ2V0TG9pblByZWZhYihcImp1aHVhXCIpKS50aGVuKHByZWZhYiA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQganVodWEgPSB0aGlzLnNob3dQYW5lbChwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAganVodWEuc2V0TmFtZShcImxvZ2luanVodWFcIilcclxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSBqdWh1YS5nZXRDb21wb25lbnQoXCJqdWh1YVwiKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5zZXRkaXNwbGF5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBhbmVsLmNsb3NlbGltaXRKdWh1YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcGFuZWwgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwibG9naW5qdWh1YVwiKTtcclxuICAgICAgICBpZiAocGFuZWwpIHBhbmVsLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuWKoOi9vei/m+W6puadoVxyXG4gICAgICovXHJcbiAgICBwYW5lbC5zaG93TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZW50cnkgPSB0aGlzLmdldEVudHJ5UGFuZWwoKTtcclxuICAgICAgICBpZiAoZW50cnkpIHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5U2NyaXB0ID0gZW50cnkuZ2V0Q29tcG9uZW50KGVudHJ5Lm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZW50cnlTY3JpcHQuTE9BRElORykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdPYmogPSB0aGlzLnNob3dQYW5lbChlbnRyeVNjcmlwdC5MT0FESU5HKTtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdPYmouekluZGV4ID0gY2MubWFjcm8uTUFYX1pJTkRFWDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgZ2xHYW1lLmZpbGV1dGlsLnJlYWRQcmVmYWIodGhpcy5nZXRMb2luUHJlZmFiKFwibG9hZGluZ1wiKSkudGhlbihwcmVmYWIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnNob3dQYW5lbChwcmVmYWIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrliqDovb3ov5vluqbmnaEo6L+b5YWl5oi/6Ze05ZCO55qEbG9hZGluZ+mBrue9qSlcclxuICAgICAqL1xyXG4gICAgcGFuZWwuc2hvd1Jvb21Mb2FkaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIGlmICghZ2xHYW1lLnJvb20uZ2V0KCdjaGFuZ2VUYWJsZVN0YXRlJykpIHtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMucHVibGljUGFuZWxEaWN0Lmhhc093blByb3BlcnR5KFwibG9hZGluZ1wiKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHBhbmVsID0gdGhpcy5zaG93UGFuZWwodGhpcy5wdWJsaWNQYW5lbERpY3RbXCJsb2FkaW5nXCJdKTtcclxuICAgICAgICAvLyAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChwYW5lbC5uYW1lKS5zZXRsb2FkaW5nVGlwc1Nwcml0ZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5Yqg6L29XHJcbiAgICAgKi9cclxuICAgIHBhbmVsLmNsb3NlTG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBsZXQgbG9hZGluZyA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIC8vIGlmICghbG9hZGluZykgcmV0dXJuO1xyXG4gICAgICAgIC8vIGxvYWRpbmcuZGVzdHJveSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaMieeFp+aXtumXtOWOu+a4suafk1xyXG4gICAgICogQHBhcmFtIHtzZWxmfSBzZWxmIOmAmuW4uOS4uiB0aGlzIO+8jCDnlJ/lkb3kuLvkvZNcclxuICAgICAqIEBwYXJhbSB7Y29udGVudH0gY29udGVudCDpnIDopoHmk43kvZznmoToioLngrnniLbnsbtcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIOaXtumVv++8jDEw5Liq5YaF5bu66K6u5L2/55SoIDAuMDIg77yM5pWw6YeP6L+H5aSn55qE6K+35qC55o2u6KeG6KeJ5oOF5Ya16ICM5a6a77yI6ZyA6KaB5aSn6YeP5rWL6K+V77yJXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT3BlbkZlbFRvIOaYr+WQpuaJk+W8gOa4kOWPmOaYvuekulxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZhZGVUaW1lIOa4kOWPmOaXtumVv1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbEJhY2sg5pKt5pS+5Yiw5pyA5ZCO5LiA5Liq5Zue6LCDXHJcbiAgICAgKiBAZXhhbXBsZSAg5riQ5Y+Y5pe26ZW/5qGI5L6LIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLHRoaXMucmVjb3JkdmlldywwLjAyLHRydWUsKCk9PnsgIH0pO1xyXG4gICAgICovXHJcbiAgICBwYW5lbC5zaG93RWZmZWN0Tm9kZSA9IGZ1bmN0aW9uIChzZWxmLCBjb250ZW50LCB0aW1lID0gMC4wMiwgaXNPcGVuRmVsVG8gPSBmYWxzZSwgZmFkZVRpbWUgPSAwLjEsIGNhbGxCYWNrID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChjb250ZW50ICYmIGNvbnRlbnQuY2hpbGRyZW5Db3VudCA8IDEpIHJldHVybjtcclxuICAgICAgICBsZXQgbGVuID0gY29udGVudC5jaGlsZHJlbkNvdW50IC0gMTtcclxuICAgICAgICBsZXQgaSA9IC0xO1xyXG4gICAgICAgIHNlbGYuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQgJiYgY29udGVudC5jaGlsZHJlbiAmJiBjb250ZW50LmNoaWxkcmVuW2ldICYmIGNvbnRlbnQuY2hpbGRyZW5baV0uYWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNPcGVuRmVsVG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jaGlsZHJlbltpXS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNoaWxkcmVuW2ldLnJ1bkFjdGlvbihjYy5mYWRlVG8oZmFkZVRpbWUsIDI1NSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT0gbGVuICYmIGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGltZSwgbGVuKVxyXG4gICAgfTtcclxuICAgIC8v5LiT5Li6IOihqOWNlSDliJfooaggTGFiZWwg6K6+572u6aKc6ImyXHJcbiAgICBwYW5lbC5zZXR0aW5nVGFibGVMYWJlbENvbG9yID0gZnVuY3Rpb24gKGxhYikge1xyXG4gICAgICAgIGlmIChsYWIgJiYgbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nICE9IG51bGwgJiYgbGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgaWYgKCFpc05hTihsYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKGxhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYi5jb2xvciA9IGdsR2FtZS5wbGF6YUNvbG9yLmdhaW47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYi5jb2xvciA9IGdsR2FtZS5wbGF6YUNvbG9yLmxvc3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3RyID0gZ2xHYW1lLnBhbmVsLnJlbW92ZUNoaW5lc2UobGFiLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obmV3U3RyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIobmV3U3RyKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYi5jb2xvciA9IGdsR2FtZS5wbGF6YUNvbG9yLmdhaW47XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiLmNvbG9yID0gZ2xHYW1lLnBsYXphQ29sb3IubG9zcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIj4+IOWHuuS6humXrumimOS6hiDliZTpmaTkuK3mloflkI7ku43nhLbmsqHmnInmlbDlrZfvvIzml6Dms5Xnoa7lrprmmK/lpKfmmK/lsI8gc3RyaW5nIDogXCIsIGxhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL+WOu+aOieaxieWtl1xyXG4gICAgcGFuZWwucmVtb3ZlQ2hpbmVzZSA9IGZ1bmN0aW9uIChzdHJWYWx1ZSkge1xyXG4gICAgICAgIGlmIChzdHJWYWx1ZSAhPSBudWxsICYmIHN0clZhbHVlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgdmFyIHJlZyA9IC9bXFx1NGUwMC1cXHU5ZmE1XS9nO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyVmFsdWUucmVwbGFjZShyZWcsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfTtcclxuICAgIC8v5Y+q5o+Q5Y+W5rGJ5a2XXHJcbiAgICBwYW5lbC5nZXRDaGluZXNlID0gZnVuY3Rpb24gKHN0clZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHN0clZhbHVlICE9IG51bGwgJiYgc3RyVmFsdWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICB2YXIgcmVnID0gL1tcXHU0ZTAwLVxcdTlmYTVdL2c7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJWYWx1ZS5tYXRjaChyZWcpLmpvaW4oXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mjInpkq7nspLlrZDlj5HlsITlmagg5ZCv5YqoL+WFs+mXrSDlhajlsYDlvIDlhbMg5Yqf6IO95a6e546wXHJcbiAgICBwYW5lbC5zaG93RWZmZWN0UGFyaXRpY2xlID0gZnVuY3Rpb24gKHJvb3ROb2RlKSB7XHJcbiAgICAgICAgcGFuZWwuZmluZENoaWxkTm9kZShyb290Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFuZWwuc2V0UGFyaXRpY2xlID0gZnVuY3Rpb24gKHJvb3ROb2RlKSB7XHJcbiAgICAgICAgbGV0IHBhcml0aWNsZSA9IHJvb3ROb2RlLmdldENoaWxkQnlOYW1lKFwiUGFyaXRpY2xlXCIpO1xyXG4gICAgICAgIGlmIChwYXJpdGljbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGVDb21wID0gcGFyaXRpY2xlLmdldENvbXBvbmVudChjYy5QYXJ0aWNsZVN5c3RlbSk7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZUNvbXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsR2FtZS5pc1Bhcml0aWNsZSAmJiAhcGFyaXRpY2xlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcml0aWNsZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJpdGljbGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyaXRpY2xlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhbmVsLmZpbmRDaGlsZE5vZGUgPSBmdW5jdGlvbiAocm9vdE5vZGUpIHtcclxuICAgICAgICBsZXQgbm9kZUxlbiA9IHJvb3ROb2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkTm9kZSA9IHJvb3ROb2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGROb2RlLm5hbWUgPT0gXCJwdWJsaWNCdXR0b25QYXJpdGljbGVcIikge1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuc2V0UGFyaXRpY2xlKGNoaWxkTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5jaGlsZHJlbkNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuZmluZENoaWxkTm9kZShjaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyJdfQ==
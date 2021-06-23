"use strict";
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
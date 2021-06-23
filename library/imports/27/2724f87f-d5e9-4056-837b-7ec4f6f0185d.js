"use strict";
cc._RF.push(module, '2724fh/1elAVoN7fsT28Bhd', 'messages');
// frames/model/messages.js

"use strict";

//通用消息归类
window.MESSAGE = {
  //登录相关消息
  LOGIN: {
    TOURIST_SUCCESS: "loginTouristSuccess",
    //游客
    ACCOUNT_SUCCESS: "loginAccountSuccess",
    //账号登入成功
    PHONE_VERIFI_CD: "logonVerifiUpdateCD" //登录手机验证码

  },
  //通讯相关消息
  NETWORK: {
    PODOT_ON: "pomelo_dot_on" //校验是否连接pomelo显示（view消息）

  },
  //热更处理消息
  DOWNLOAD: {
    OPEN_PATH: "openDownload",
    //打开强制热更地址
    STOP: "downloadStop",
    BAG: "login.updatebag",
    END: "login.updateend"
  },
  //用户消息处理
  USER: {
    PHONE_VERIFICATION: "updatePhoneSendVerification",
    //刷新手机验证码状态
    REGISTER_CFG: "RegisterConfig" //获取注册配置列表

  },
  // 跑马灯消息
  NOTICE: {
    BASE: "rnotice.basestart",
    PLAZA: "rnotice.plazastart"
  },
  //ui刷新
  UI: {
    SCENE: "gl.sceneUi",
    //scene ui刷新
    ACTION_END: "ActionEnd",
    //动画结算后通知相关界面
    PLAZA_OPEN: "plazaOpen",
    //控制plaza开关
    WEBVIEW_ON: "plazawebviewon",
    //webview开启    
    WEBVIEW_OFF: "plazawebviewoff",
    //webview关闭      
    PLAZA_LOADING: "plazaloading",
    //大厅loading 进度通知
    HIDE_CLEANUP: "hideCleanupCache",
    //隐藏登录按钮
    ROOM_ENTER_SHOW: "RootNodeShow",
    //房间入口在切换场景后显示
    ROOM_ENTER_HIDE: "RootNodeHide",
    //房间入口在切换场景后显示
    GAME_SON_MSGBOX: "songamemsgbox",
    //子游戏监听消息弹窗
    REFRESH_ROOM_NUM: "refreshroomnumber",
    //刷新房间输入号码
    EXIT_CREATE_ROOM: "exitcreateroom",
    //退出创建房间界面
    CHANGE_SCENE_COMPLE: "change_scene_comple",
    //切换场景完成
    SHOW_YUEBAO_LOWEST: "show_yuebao_lowest",
    //余额宝错误码
    FORBIDDEN_BACKWATER: "forbidden_backwater",
    //禁用返水
    FORBIDDEN_SIGN: "forbidden_sign" //禁用签到

  },
  //全局性，系统消息
  SYSTEM: {
    TOUCH_BEGIN: "touch.begin",
    TOUCH_MOVE: "touch.move",
    TOUCH_STATE: "touch.state"
  },
  //非分类消息集合
  UPDATE_SERVER_CFG: "updateServerCfg" //更新服务配置

};

cc._RF.pop();
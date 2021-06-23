"use strict";
cc._RF.push(module, '165a1hdMzFFr4D+dsmj7heH', 'tips');
// frames/model/tips.js

"use strict";

module.exports = {
  // 通用
  COMMON: {
    ACCOUNTEXCEPTION: "您好，您的账号存在异常，请及时联系客服！",
    ACCOUNTEXCEPTIONEX: "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！",
    SAVEQRCODE: "二维码保存成功！",
    SAVETOPHOTO: "二维码已保存到相册!",
    COPYSUCCESS: "复制成功！",
    SAVESUCCESS: "保存成功",
    CODE_NULL: "请输入验证码！"
  },
  // 银行
  BANK: {
    SAVE: "成功将%s金币存入保险箱",
    TAKE: "成功将%s金币从保险箱取出",
    NONUMBER: "您输入的金额有误，只允许不多于两位小数的数字，请重新输入！",
    SAVELITTLE: "存入失败，存入金额必须大于0！",
    TAKELITTLE: "取出失败，取出金额必须大于0！",
    SAVEERROR: "存入失败，存入金额填写错误",
    TAKEERROR: "取出失败，取出金额填写错误",
    SAVEZERO: "存入失败，请填写存入金额！",
    TAKEZERO: "取出失败, 请填写取出金额!",
    SAVEMUCH: "您身上没有这么多钱存入哦！",
    TAKEMUCH: "您的保险柜中没有这么多钱取出哦！",
    SAVEPLACEHOLDER: "请输入存入金额",
    TAKEPLACEHOLDER: "请输入取出金额"
  },
  // 绑定银行卡或者支付宝
  BIND: {
    INVALIDCARDNAME: "绑定失败，银行卡持有人姓名填写错误，请重新输入！",
    NOINVALIDCARDNAME: "绑定失败，请填写持卡人姓名！",
    INVALIDCARD: "绑定失败，银行卡号填写错误，请重新输入！",
    NOINVALIDCARD: "绑定失败，请填写银行卡卡号！",
    INVALIDCARDBANKNAME: "绑定失败，请填写银行卡所属银行！",
    INVALIDZFBNAME: "绑定失败，支付宝姓名填写错误，请重新输入！",
    INVALIDZFB: "绑定失败，支付宝账户填写错误，请重新输入！",
    LOCKZFBNAME: "支付宝姓名必须与个人资料中的真实姓名一致！",
    LOCKCARDNAME: "持卡人姓名必须与个人资料中的真实姓名一致！",
    EMPTYZFBNAME: "绑定失败，请输入支付宝姓名！",
    EMPTYZFB: "绑定失败，请输入支付宝账号！"
  },
  // 兑换
  EXCHANGE: {
    LOCK: "您的打码量未达到提现要求，请点击[打码量要求]打开界面进行查询，如有疑问请联系客服！",
    NONUMBER: "您输入的提现金额有误，提现金额必须为数字，请重新输入！",
    EXCLITTLE: "您输入的提现金额有误，提现金额必须大于0，请重新输入！",
    MINGOLD: "兑换后剩余金币少于%s,无法兑换",
    OUT_OF_RANGE: "您输入的金额超出了单次提现限额范围，请重新输入！",
    MUST_INTEGER: "提现金额必须为%s的整数倍，请重新输入！",
    EMPTY_INPUT: "提现失败，请填写提现金额！",
    MONEY_NOT_ENOUGH: "提现失败，您身上携带的金币不足！",
    BIND_ZFB: "您还未绑定支付宝，需绑定后才可提现！",
    BIND_BANK: "您还未绑定银行卡，需绑定后才可提现！",
    OUT_OF_LIMIT: "金额已超出取现限额",
    FREE_OF_SERVICE: "免手续费",
    INTEGER_FREE_SERVICE: "只支持%s的倍数,免手续费",
    INTERERMUL: "只支持%s的倍数",
    PSWLENGTH: "提现密码只允许4-12位英文或数字"
  },
  // 玩家
  USER: {
    PASSWORD: {
      ACC: "修改密码成功！",
      ALP: "修改密码成功！",
      UNCHANGE: "如需修改密码,请联系客服！",
      SERVICE: "为了您的账号安全，如需修改登录密码，请联系客服！"
    },
    VERIFYCODE: {
      SENDFAILED: "验证码发送失败！",
      SENDTOOBUSY: "发送验证码间隔过短！"
    },
    BIND: {
      PHONE: "手机号码绑定成功！",
      UNTIED: "手机号解绑成功！",
      ALP: "支付宝绑定成功！",
      BANK: "银行卡绑定成功",
      CONGRATULATE: "获得绑定手机奖励！",
      INVALIDPHONE: "请填写正确的手机号码"
    },
    CHANGEHEAD: {
      SUCCESS: "更换头像成功",
      FAIL: "没有选择新头像"
    },
    GOLDLACK: {
      TITLE: "金币不足",
      CONTENT: "金币不足,是否前往充值?"
    },
    EDITINFO: {
      NICKNAME: "修改昵称成功",
      BASEINFO: "修改个人资料成功",
      UNCODE: "请输入验证码",
      MODIFYNAME: "无法修改真实姓名，如需修改，请联系客服！",
      MODIFYBIRTH: "无法修改生日，如需修改，请联系客服!",
      INVALIDEMAIL: "邮箱格式错误！",
      INVALIDQQ: "QQ格式错误！",
      INVALIDWX: "微信格式错误！",
      NAMELIMIT: "姓名字符长度为2~20！",
      INVALIDNAME: "姓名格式错误！",
      LENTHLIMIT: "修改失败，昵称长度限制2~12个字符！",
      NICKNAMEERROR: "修改失败，昵称中含有非法字符！",
      INVALIDNICK: "昵称只能输入中文、英文和数字！",
      EMPTYNICK: "昵称不能为空"
    }
  },
  // 输入框检查
  EDITBOX: {
    PSWNULL: "请输入旧密码！",
    PSWWRONGFUL: "密码包含特殊符号, 请重新输入！",
    PSWCOFAIL: "两次输入的密码不一致, 请重新输入！",
    NEWPSWNULL: "请输入新密码！",
    NEWPSWWRONGFUL: "新密码包含特殊符号, 请重新输入！",
    CONFIRMPSWNULL: "两次输入的密码不一致, 请重新输入！",
    CONFIRMPSWWRONGFUL: "两次输入的密码不一致, 请重新输入！",
    OLDNEWPSWEQUALS: "新旧密码一致, 修改失败！",
    BANKPSWNULL: "请输入保险箱密码！",
    OLDPSW: "请输入旧密码",
    CONFIRMNEWPSW: "请输入确认密码",
    NUMBERIC6: "密码必须为6位的纯数字"
  },
  // 错误提示
  ERRORTIP: {
    OPERATETOOBUSY: "操作太过频繁,请等待%s秒再试",
    NETERROR: "网络连接异常，请重新创建房间。",
    BEKICKED: "\u60A8\u88AB\u623F\u4E3B\u8E22\u51FA\u623F\u95F4\uFF0C%s\u79D2\u5185\u65E0\u6CD5\u518D\u6B21\u8FDB\u5165\u8BE5\u623F\u95F4\uFF01",
    VOTEBUSY: "%s秒内无法再次投票退出房间！",
    GAMETOOHOT: "当前游戏太火爆，请稍后再试！",
    MOBILELIMIT: "您的手机已被限制，如有疑问请联系客服",
    BINDFAILED: "该取现账户已经被其他会员绑定，绑定失败，如有疑问，请联系客服",
    RESELECTROOM: "请重新选择房间",
    CANNOTEXIT: "您正在游戏中，不能退出",
    ACCOUNTEXCEPTION: "系统检测到您的账号存在异常，已被临时封停，如有疑问请联系客服",
    GAMESERVICE: "游戏维护中，无法继续进行游戏！",
    GAMECLOSED: "游戏已关闭，无法继续进行游戏！",
    REQUESTTIMEOUT: "请求超时将为您重启游戏"
  },
  REGISTRATION: {
    BIRTHDAY: "请输入出生日期",
    VERIFICA: '验证码输入错误，请重新输入！',
    VERIFICAEMPTY: '请输入您手机号上收到的验证码！',
    WITHDRAWALPSW: "请输入您要设置的取款密码！",
    WITHDRAWALPSWLENGTH: "取款码请输入4~6位数字！",
    PROXY: "请输入代理推荐码！",
    PHONENULL: "请输入手机号码！",
    PHONETYPE: "请输入11位数字手机号！",
    VERIFINULL: "请输入验证码！",
    ACCNULL: "请输入账号！",
    ACCLENGTH: '账号只允许输入4~15个字符！',
    ACCTYPE: '账号只可以由数字和英文组成！',
    QQNULL: "QQ号不能为空！",
    QQTYPE: "请输入正确格式的QQ号码！",
    WECHATNULL: "微信号不能为空！",
    WECHATTYPE: "请输入正确格式的微信号码！",
    NAMENULL: "姓名不能为空！",
    NAMELENGTH: "姓名只允许输入4~12个字符！",
    NAMETYPE: "姓名只能输入中文和英文！",
    NICKNAMENULL: "昵称不能为空！",
    NICKNAMELENGTH: "昵称只允许输入4~12个字符！",
    NICKNAMETYPE: "昵称只能输入中文和英文！",
    EMAILNULL: "邮箱不能为空！",
    EMAILTYPE: "请输入正确的邮箱！",
    LOGPSWNULL: "请输入密码!",
    PSWNULL: "请输入您要设置的密码！",
    PSWWRONGFUL: "密码包含特殊符号, 请重新输入！",
    PSWLENGTH: "密码只允许输入6~15个字符",
    PSWCOFAIL: "两次输入的密码不一致, 请重新输入！",
    PROTOCOL: "请您仔细阅读并勾选同意游戏用户协议!"
  },
  WEEKNAME: {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六'
  },
  // VIP奖励
  VIPAWARD: {
    UPAWARD: "成功领取了VIP晋级礼金！",
    WEEKAWARD: "成功领取了VIP每周礼金！",
    MONTHAWARD: "成功领取了VIP每月礼金！",
    WEEKTIPS: "每周一0点刷新",
    MONTHTIPS: "每月1日0点刷新",
    LVCANGETTIPS: "当前等级可领取",
    LVGETCONDITION: "达到VIP%s可领取",
    CANGETTIPS: "当前可领取",
    CANNOTGETTIPS: "领取条件不足",
    MONTHBET: "本月打码量",
    MONTHRECHARGE: "本月充值量",
    GETSTATE: ["已领取", "未领取", "未达成"]
  },
  // 任务
  TASK: {
    STATE_COMPLETE: "已完成",
    STATE_GETREWARD: "已领取奖励",
    AWARD_TITTLE: "该活跃度宝箱可开出以下奖励",
    AWARD_TIPS: "获得任务奖励"
  },
  // 邮件
  EMAIL: {
    DELETEALL: "是否删除所有已读消息？",
    DELETEONE: "是否删除该消息？"
  },
  // 活动
  ANNOUNCE: {
    AWARD_TIPS: "获得活动奖励",
    REVIEW_TIPS: "您有%s个活动奖励已经提交审核，系统审核通过后发放到您的账户中，请耐心等待!",
    AWARD_REVIEW_TIPS: "获得奖励，并且有%s个活动奖励提交审核",
    REVIEW_WAIT_TIPS: "您申请的奖励已提交审核，系统审核通过后发放到您的账户中，请耐心等待!"
  },
  // 余额宝
  YUBAO: {
    MINPROFIT: "提取失败，当前可提收益至少需达到%s金币才可提取！",
    CONGRATULATE: "成功提取了余额宝收益！",
    NOTICETIPS: "您提取%s余额宝收益的申请已经提交审核，系统审核通过后将会自动发放到您的账户中，请耐心等待！",
    NOREWARD: "您当前没有余额宝收益可提取哦~"
  },
  // 签到
  SIGNIN: {
    CONGRATULATE: "获得签到奖励！",
    COMETOMORROW: "今日已签到，请明日再来~",
    UNREADY: '还未达到该连续签到天数，无法领取！',
    HASCHECKED: "您已经领取过该签到奖励了哦~"
  },
  // 充值
  SHOP: {
    COPYBANKCARD: "复制卡号成功！",
    COPYUSERNAME: "复制收款人名字成功！",
    COPYBANKNAME: "复制收款行成功！",
    COINNULL: "请输入充值金额！",
    COINNULL2: "请选择充值金额！",
    SELECTCOIN: "充值金额错误，请重新输入！",
    LIMIT: "该通道单次充值限额为%s~%s元，您输入的金额超出范围，无法充值！",
    MINLIMIT: "该通道单次最低充值金额为%s元，您输入的金额有误，无法充值！",
    TOOBUSY: "操作过于频繁，请稍后再试！",
    USERNAMENULL: "请输入转账人姓名！",
    CARDTAILNULL: "请输入卡号后五位！",
    ORDERTAILNULL: "请输入转账订单号后五位！",
    INVALIDCARDTAIL: "请输入正确卡号后五位！",
    INVALIDORDERTAIL: "请输入正确转账订单号后五位！",
    INVALIDUSERNAME: "请输入正确的转账人姓名！",
    INVALIDCONTENT: "输入信息有误！"
  },
  // 返水
  BACKWATER: {
    MINLIMIT: "可提取返水金额至少需达到%s才可提取！",
    GIVENOTICE: "<color=#cee0fe>尊敬的贵宾您好，您申请的</color><color=#00ff00>%s</color><color=#cee0fe>返水已经发送至您的账户中，请及时查收！</color>",
    APPLYSUCCESS: "<color=#cee0fe>尊敬的贵宾您好，您已申请领取</color><color=#00ff00>%s</color><color=#cee0fe>返水金额，系统审核通过后将会自动发放到您的账户中，请耐心等待！</color>"
  },
  // 夺宝
  LUCKDRAW: {
    CONGRATULATE: "中奖了！",
    SCORENOTENOUGH: "您的积分不足，无法抽奖！"
  },
  // 推广
  POPULARIZE: {
    CONGRATULATE: "成功领取了全民推广佣金！",
    MINLIMIT: "领取佣金失败，可领取佣金至少需达%s金币才可领取！",
    APPLYSUCCESS: "您已申请领取%s佣金，系统审核通过后将会自动发放到您的账户中，请耐心等待！",
    GETMEMBERPRIZE: "成功领取了有效成员奖励！",
    CANTFINDWX: "在您的手机中未检测到微信，无法分享！",
    COPYLINKSUCCESS: "下载链接复制成功！"
  },
  //第三方入口提示
  WEBGAME: {
    ENTER_ERROR: "您的账户余额不足%s金币，充点小钱再来大赢特赢吧！"
  },
  // 大厅
  PLAZA: {
    CONGRATULATE: "注册成功，获得注册礼金！"
  },
  // 房间场
  ROOM: {
    GOLDNOTENOUGH: "您的金币不够兑换该钻石，如需兑换请前往商城充值！",
    EXCHANGEFAIL: "当前兑换失败，请联系客服！",
    SERVICESTOP: "服务器正在维护中，无法继续游戏！",
    GAMECLOSE: "游戏已关闭，无法继续进行游戏！",
    ACCOUNTEXCEPTION: "您的账号数据异常，暂时禁止进入游戏，如有疑问，请联系客服！",
    PLAYING: "您当前正在游戏中，无法接受邀请!",
    ASKFORJOIN: "刚刚一起玩的<color=#54842e>%s</c>创建了一个相同规则的房间，是否加入？",
    STILLINGAME: "您在%s的游戏还未结束，无法开始新游戏！"
  },
  // 更新
  UPDATE: {
    UPDATING: "【%s】正在更新中，请耐心等待...",
    INUPDATEQUEUE: "【%s】已在热更队列中，请耐心等待...",
    COMPLETED: "【%s】下载完成",
    STARTUPATE: "开始更新【%s】，请耐心等待...",
    CHECKFAILED: "校验热更文件失败，请检查您的网络环境！"
  },
  // 登陆
  LOGON: {
    NETERROR: "网络连接异常，请重新登录！",
    LOGINREPEAT: "您的账号在别处登录，如果不是您在操作，可能已经被盗号，请及时联系客服！"
  }
};

cc._RF.pop();
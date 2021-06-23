"use strict";
cc._RF.push(module, '77b21R8+MBGJY4FKQ/iDQy6', 'NetCode');
// frames/net/NetCode.js

"use strict";

var _errorcodes;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//错误处理
var errorcodes = (_errorcodes = {
  1001001: '微信登录正在维护中，请使用其他登录方式！',
  10000000: '游戏正在维护中,如有给您带来不便，敬请谅解.',
  //游戏已经紧急维护了
  10000001: '返回数据格式错误',
  10010001: '路由错误',
  10020002: '用户账户不存在',
  10020003: '您输入的账号或密码错误，请重新输入！',
  10020004: 'token错误',
  10020005: '您输入的账号已存在，请直接登录！',
  10020006: '注册失败，请重试或联系客服！',
  10020007: '登录失败，请重试或联系客服！',
  10020049: '玩家修改的性别参数错误',
  10020050: '缺少参数',
  10020058: '手机号格式错误，请输入11位数字手机号码！',
  10020059: '验证码发送失败，请稍后重试！',
  10020060: '您输入的验证码错误，请重新输入！',
  10020063: '实名认证含有敏感词',
  10020065: '密码修改失败，请重试或联系客服！',
  10020066: '您输入的旧密码输入错误，修改密码失败！',
  100201066: '为了您的账号安全，如需修改密码,请联系客服！',
  100201067: '为了您的账号安全，如需修改手机号码，请联系客服！',
  10020068: '您输入的短信验证码错误，请重新输入！',
  10020069: '两次输入的密码不一致，请重新输入！',
  10020070: '该头像不存在，请选择其他头像！',
  10020071: '您输入的验证码错误或者验证码已过期，请重试！',
  10020072: '重置密码类型错误',
  10020073: '该手机号和您绑定的手机号不一致！',
  10020074: '您输入的手机号已被绑定，无法重复绑定！',
  10020075: '您输入的保险箱密码错误，请重新输入！',
  10020076: '您已经绑定过银行卡，无需重复绑定！',
  10020077: '您输入的银行不存在或者不支持！',
  10020078: '绑定失败',
  10020079: '您已经绑定过支付宝，无需重复绑定！',
  10020080: '提现失败，提现金额必须为指定金额的整数倍，您输入的金额有误，请重新输入！',
  10020081: '提现失败',
  10020082: '您还未绑定银行卡，无法提现！',
  10020083: '您还未绑定支付宝，无法提现！',
  10020087: '该手机号已被注册',
  10020090: '玩家分组不存在',
  10020091: '取现单位不合法',
  10020093: '取现下限不合法',
  10020094: '取现额度小于手续费',
  10020095: '请选择提现到哪里',
  10020098: '昵称修改失败',
  10020099: '提现金额超出当前可提现余额，提现失败！',
  10020100: '取现上限不合法',
  10020101: '修改失败，昵称长度限制2~12个字符！',
  10020102: '提现密码错误，无法提现！',
  10020103: '您的打码量未达到提现要求，请点击[打码量要求]打开界面进行查询，如有疑问请联系客服！',
  10020107: '不能绑定自己',
  10020108: '您输入的账号已经存在，请重新输入！',
  10020109: '姓名太短或太长',
  10020110: '生日不合法',
  10020111: '邮箱不合法',
  10020112: 'QQ不合法',
  10020113: '用户修改失败',
  10030012: '您的金币已发生变化，请重新输入金额！',
  10030020: '你有牌局未恢复',
  10030046: '游戏不存在',
  10030048: '网络异常，请重新购买',
  10030049: '钻石售价已更改，请重新打开兑换页面',
  10030060: '取出失败，您的保险箱金币不足！',
  10030061: '保险箱金币达到上限',
  10030063: '您购买钻石出现异常,请联系客服！',
  10030064: '存入失败，请填写存入金额！',
  10050001: '获取消息的类型参数错误',
  10050002: '一键阅读消息失败',
  10050003: '一键领取消息附件失败',
  10050004: '消息不存在',
  10050005: '领取消息详情中附件失败',
  10170001: '该功能暂未开启！',
  10170002: '暂无洗码金额',
  10170003: '洗码申请失败',
  10170004: '洗码领取失败',
  10170006: '当前返水金额低于最小领取金额',
  10180001: '已领取过该奖励',
  10180005: '您现在不满足签到条件',
  //您现在不满足签到条件
  10180006: '还需要充值0才能签到',
  //有服务端反馈msg内容显示
  10190001: '推广绑定失败',
  10190002: '推广奖励领取失败',
  10190003: '推广奖励领取失败',
  10190004: '没有可以领取的推广奖励',
  10210003: '充值区间错误',
  10210004: '充值操作频率过高，请稍等再试',
  10220001: '活动不存在',
  10220002: '非上架时间',
  10220003: '该活动已经下架',
  10220004: '会员分组不合法',
  10220005: '会员VIP分组不合法',
  10220006: '奖励发放失败',
  10220007: '禁止领取优惠活动',
  10220008: '已达到可领取奖励最大值',
  10210001: '渠道不存在',
  10210002: '充值失败'
}, _defineProperty(_errorcodes, "10210003", '充值区间错误'), _defineProperty(_errorcodes, "10210004", '您刚才提交的订单处理中，请等待处理'), _defineProperty(_errorcodes, 10010007, '账号被封停'), _defineProperty(_errorcodes, 10010008, '您的IP已被限制，如有疑问请联系客服'), _defineProperty(_errorcodes, 10010009, '手机被限制'), _defineProperty(_errorcodes, 10010010, '系统检测到您的账号存在异常，暂时无法取现，如有疑问请联系客服'), _defineProperty(_errorcodes, 20040020, '系统检测到您的账号存在异常，暂时无法进入牌局，如有疑问请联系客服！'), _defineProperty(_errorcodes, 10020086, '代理推荐码不存在'), _defineProperty(_errorcodes, 100201022, '未绑定手机号，无法发送短信'), _defineProperty(_errorcodes, 10230001, '佣金金额不足领取'), _defineProperty(_errorcodes, 10230002, '佣金提取失败'), _defineProperty(_errorcodes, 10230003, '可疑会员无法领取'), _defineProperty(_errorcodes, 10230004, '试玩会员无法领取'), _defineProperty(_errorcodes, 10250001, 'VIP不存在'), _defineProperty(_errorcodes, 10250002, 'VIP奖励领取失败'), _defineProperty(_errorcodes, 10250003, 'VIP奖励类型错误'), _defineProperty(_errorcodes, 10240003, '余额宝领取未达到最低限额'), _defineProperty(_errorcodes, 10240004, '您无法领取余额宝奖励，如有疑问请联系客服'), _defineProperty(_errorcodes, 10180004, '该功能暂未开放, 敬请期待'), _defineProperty(_errorcodes, 10080006, '禁止充值'), _defineProperty(_errorcodes, 10080007, '您的姓名输入有误，请重新输入'), _defineProperty(_errorcodes, 10170005, '禁止领取洗码'), _defineProperty(_errorcodes, 10190006, '禁止领取推广奖励'), _defineProperty(_errorcodes, 10200002, '夺宝积分不足'), _defineProperty(_errorcodes, 10200003, '抽奖异常，请稍后再试'), _defineProperty(_errorcodes, 10200004, '该功能暂未开放'), _defineProperty(_errorcodes, 10200005, '该功能暂未开放'), _defineProperty(_errorcodes, "10220007", '禁止领取优惠活动'), _defineProperty(_errorcodes, 10020115, '禁止进入游戏'), _defineProperty(_errorcodes, 100201017, '用户姓名不合法'), _defineProperty(_errorcodes, 100201018, '微信不合法'), _defineProperty(_errorcodes, 100201019, '该手机号未绑定任何账号！'), _defineProperty(_errorcodes, 100201020, '用戶支付宝账号绑定失败'), _defineProperty(_errorcodes, 100201021, '游戏中不可存款或提现'), _defineProperty(_errorcodes, 100201023, '解绑失败'), _defineProperty(_errorcodes, 100201024, '不允许修改账号'), _defineProperty(_errorcodes, 100201025, '生成分享失败'), _defineProperty(_errorcodes, 10150001, '保险柜取出失败'), _defineProperty(_errorcodes, 10240001, '余额宝领取失败'), _defineProperty(_errorcodes, 10180003, '奖品异常'), _defineProperty(_errorcodes, 100201068, "您的银行卡号不是有效的卡号"), _defineProperty(_errorcodes, 100201069, "您的银行卡号与银行卡不匹配"), _defineProperty(_errorcodes, 100201070, "您的银行卡必须是储蓄卡"), _defineProperty(_errorcodes, 20100013, "禁止进入房间"), _defineProperty(_errorcodes, 20040017, "您的账号已被封禁，如有疑问，请联系客服。"), _defineProperty(_errorcodes, 99999999, "请求失败"), _defineProperty(_errorcodes, 10260001, "领取的奖励不存在"), _defineProperty(_errorcodes, 10260002, "已经领取过该奖励"), _defineProperty(_errorcodes, 10260003, "没有可领取的奖励"), _defineProperty(_errorcodes, 10260004, '您无法领取当前任务奖励，如有疑问请联系客服'), _defineProperty(_errorcodes, 10260005, '当前活跃度未达到领取条件'), _defineProperty(_errorcodes, 100201073, "手机号码不允许绑定和发送验证码，如有疑问，请联系客服"), _defineProperty(_errorcodes, 100201074, "24小时内只能提现一笔，请明日再试"), _defineProperty(_errorcodes, 100201075, "支付宝账号不合法"), _defineProperty(_errorcodes, 100201076, "已确认的生日无法修改，如有疑问，请联系客服"), _defineProperty(_errorcodes, 100201077, "当前取现方式未开放，请使用其他取现方式"), _defineProperty(_errorcodes, 100201078, "您的账户余额不足%s金币，充点小钱再来大赢特赢吧！"), _defineProperty(_errorcodes, 100201080, "提现失败，请填写提现金额！"), _defineProperty(_errorcodes, 100201081, "绑定失败，请输入支付宝账号！"), _defineProperty(_errorcodes, 100201082, "绑定失败，请输入支付宝姓名！"), _defineProperty(_errorcodes, 100201083, "绑定失败，请填写银行卡卡号！"), _defineProperty(_errorcodes, 100201084, "绑定失败，请填写银行卡所属银行！"), _defineProperty(_errorcodes, 100201085, "绑定失败，请填写持卡人姓名！"), _defineProperty(_errorcodes, 100201086, "注册未填写验证码时 - 请输入您手机号上收到的验证码！"), _defineProperty(_errorcodes, 10190007, "网络连接异常，请重新打开推广界面。"), _defineProperty(_errorcodes, 10190008, "网络连接异常，请重新打开推广界面。"), _defineProperty(_errorcodes, 10190009, "您已经领取过该奖励了哦~"), _defineProperty(_errorcodes, 10190010, "您还未达到有效直属下级人数条件，无法领取该奖励！"), _defineProperty(_errorcodes, 10190011, "网络连接异常，领取失败，请稍后再试！"), _defineProperty(_errorcodes, 10190012, "您已被禁止领取该奖励，如有疑问，请联系客服！"), _defineProperty(_errorcodes, 20010001, '网络断开连接，请重新登录！'), _defineProperty(_errorcodes, 20010002, '服务器维护中'), _defineProperty(_errorcodes, 20010004, '重复登录'), _defineProperty(_errorcodes, 20100003, '游戏已经结束'), _defineProperty(_errorcodes, 20100005, '已经退出房间'), _defineProperty(_errorcodes, 20100006, '未查询到该房间，请您重新尝试'), _defineProperty(_errorcodes, 20100007, '还在游戏中'), _defineProperty(_errorcodes, 20100009, '您还有游戏未结束，无法开始新游戏'), _defineProperty(_errorcodes, 20100011, '当前网络连接异常，请重新登录！'), _defineProperty(_errorcodes, 20100012, '当前网络连接缓慢，请稍后再试！'), _defineProperty(_errorcodes, 20030018, '游戏连接错误，请重新进入游戏'), _defineProperty(_errorcodes, 20040001, '非房主不能手动开局'), _defineProperty(_errorcodes, 20040002, '非手动开局游戏的房间不可手动开局'), _defineProperty(_errorcodes, 20040003, '此游戏不支持手动开局'), _defineProperty(_errorcodes, 20040004, '至少要两个人才能开局'), _defineProperty(_errorcodes, 20040005, '要全部准备才能开局'), _defineProperty(_errorcodes, 20040006, '其他人已经发起了解散申请了'), _defineProperty(_errorcodes, 20040007, '操作过于频繁'), _defineProperty(_errorcodes, 20040008, '您当前钻石不足，请前往兑换界面'), _defineProperty(_errorcodes, 20040009, '未找到该房间或房间已解散'), _defineProperty(_errorcodes, 20040010, '旁观者无法申请解散房间'), _defineProperty(_errorcodes, 20040011, '重复操作'), _defineProperty(_errorcodes, 20040012, '房间人数已满'), _defineProperty(_errorcodes, 20040013, '百人房间未初始化完成'), _defineProperty(_errorcodes, 20040015, '金币不足无法进入房间'), _defineProperty(_errorcodes, 20040016, '获取玩家数据有误，请重新进入游戏'), _defineProperty(_errorcodes, 20040023, "下注超过上限"), _defineProperty(_errorcodes, 20100017, '无效的阶段'), _defineProperty(_errorcodes, 20100018, '无效的参数'), _defineProperty(_errorcodes, 20100019, '当前游戏房间内禁止中途加入'), _defineProperty(_errorcodes, 20100020, '房主已拒绝您加入'), _defineProperty(_errorcodes, 20100021, '您操作太过频繁，请稍后再试'), _defineProperty(_errorcodes, 20100022, '当前游戏不允许中途退出'), _defineProperty(_errorcodes, 10000006, '房间人数已满'), _defineProperty(_errorcodes, 10000007, '房间类型错误'), _defineProperty(_errorcodes, 10000010, '金币不足'), _defineProperty(_errorcodes, 10000012, '未进入房间'), _errorcodes),
    err_finishwaterfall = 1999,
    NetCode = function NetCode() {},
    netCode = NetCode.prototype,
    g_instance = null;

netCode.check = function (code) {
  if (!code || code == err_finishwaterfall) return null; //中断waterfall不算错误

  var errstr = errorcodes[code];
  var msgstr = '错误码=' + code;

  if (code == 500 || code == 21000500) {
    msgstr = '服务器异常！';
  }

  if (errstr) msgstr = errstr;
  if (code == 3) return null; //德州的这条code不给玩家做提示

  return msgstr;
};

module.exports = function () {
  if (!g_instance) {
    g_instance = new NetCode();
  }

  return g_instance;
}();

cc._RF.pop();
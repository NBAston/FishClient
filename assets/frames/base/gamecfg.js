
const BANK_MODEL = {
    CLICK_SELECT: 1,//点击选择
    INPUT_SELECT: 2 //关键字选择
}
const GAME_NAME = "某某棋牌"

const PROXY_OFF = 0;
const PROXY_ON = 1;

const LOGIN_SWITCH_1 = 0;

exports.paths = {
    bankModel: BANK_MODEL.INPUT_SELECT,     //银行名字选择模式
    gameProxy: PROXY_OFF,                   //入口是否使用加密方式处理
    loginSwitch: LOGIN_SWITCH_1,            //login界面分类选取
    serviceUrl: "https://dictum.tucocoon.com/chat/chatClient/chatbox.jsp?companyID=80001056&configID=57", //这个参数为默认的客服地址
    TERMSOFSERVICES:`1、在注册后进行一次有效充值，恭喜您成为【${GAME_NAME}】有效会员！\n\n2、【${GAME_NAME}】严禁会员有重复申请账号行为，每位玩家、每一手机号码、每一微信号、每一QQ号、每一邮箱，及手机或其他登陆设备只能拥有一个帐户数据。\n\n3、【${GAME_NAME}】是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在【${GAME_NAME}】注册、下注，为会员个人行为，【${GAME_NAME}】不负责、承担任何相关责任。\n\n4、无论是个人或是团体，如有任何威胁、滥用【${GAME_NAME}】名义的行为，【${GAME_NAME}】保留权利取消、收回玩家账号。\n\n5、玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，【${GAME_NAME}】保留权利要求客户向我们提供充足有效的档案，并以各种方式辨别客户是否符合资格享有我们的任何优惠。`
};
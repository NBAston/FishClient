package com.game.kaixinqp.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;


import com.game.kaixinqp.R;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXTextObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.cocos2dx.javascript.AppActivity;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler{
    public static WXEntryActivity wxApp;
    // APP_ID 替换为你的应用从官方网站申请到的合法appID
    private static final String APP_ID = "wx11fd786c9041303d";
    // SECRET 替换为你的应用从官方网站申请到的合法secret
    private static final String SECRET = "5cf9944e058fe899965e683ce4fe845e";
    // IWXAPI 是第三方app和微信通信的openApi接口
    private static IWXAPI api = null;
    // 用户换取access_token的code, 仅在ErrCode为0时有效
    private static String CODE = "";
    // 接口调用凭证
    private static String access_token = "";
    // access_token接口调用凭证超时时间, 单位(秒)
    private static String expires_in = "";
    // 用户刷新access_token
    private static String refresh_token = "";
    // 授权用户唯一标识
    private static String openid = "";
    // 用户授权的作用域, 使用逗号(,)分隔
    private static String scope = "";
    // 当且仅当该移动应用已获得该用户的 userinfo 授权时, 才会出现该字段
    private static String unionid = "";
    // 微信用户信息
    private static JSONObject userInfo = null;

    // 自定义回调接口
    public interface callBack {
        public void next(JSONObject obj);
    }
    // 发送 http 请求
    private void httpGet (final String remoteURL, final callBack cb) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection connection = null;
                try {
                    URL url = new URL(remoteURL);
                    connection = (HttpURLConnection) url.openConnection();
                    // 设置3秒的响应超时
                    connection.setConnectTimeout(3000);
                    // 设置请求方法，默认是GET
                    connection.setRequestMethod("GET");
                    // 设置字符集
                    connection.setRequestProperty("Charset", "UTF-8");
                    // 设置文件类型
                    connection.setRequestProperty("Content-Type", "text/xml; charset=UTF-8");
                    int resCode = connection.getResponseCode();
                    if (resCode == 200) {
                        // getInputStream 获取服务端返回的数据流。
                        InputStream inputStream = connection.getInputStream();
                        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
                        StringBuilder response = new StringBuilder();
                        String line;
                        while((line = reader.readLine())!=null){
                            response.append(line);
                        }
                        try {
                            cb.next(new JSONObject(response.toString()));
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    if(connection != null){
                        connection.disconnect();
                    }
                }
            }
        }).start();
    }

    private void resetData (JSONObject obj) {
        try {
            access_token  = obj.has("access_token")  ? obj.getString("access_token")  : access_token;
            expires_in    = obj.has("expires_in")    ? obj.getString("expires_in")    : expires_in;
            refresh_token = obj.has("refresh_token") ? obj.getString("refresh_token") : refresh_token;
            openid        = obj.has("openid")        ? obj.getString("openid")        : openid;
            scope         = obj.has("scope")         ? obj.getString("scope")         : scope;
            unionid       = obj.has("unionid")       ? obj.getString("unionid")       : unionid;
            Log.d("WXEntryActivity", "参数重置 ..."+obj.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void initWeChatApi () {
        api = WXAPIFactory.createWXAPI(AppActivity.app, APP_ID, true);
        api.registerApp(APP_ID);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        wxApp = this;
        Log.d("WXEntryActivity", "WXEntryActivity 初始化 ...");
        try {
            api.handleIntent(getIntent(), this);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        setIntent(intent);
        api.handleIntent(intent, this);
    }

    // 微信发送请求到第三方应用时, 会回调到该方法
    @Override
    public void onReq(BaseReq req) {
        switch (req.getType()) {
            case ConstantsAPI.COMMAND_GETMESSAGE_FROM_WX:
                break;
            case ConstantsAPI.COMMAND_SHOWMESSAGE_FROM_WX:
                break;
            default:
                break;
        }
    }

    // 第三方应用发送到微信的请求处理后的响应结果, 会回调到该方法
    @Override
    public void onResp(BaseResp resp) {
        String result = "未知错误";
        Log.d("xixixi", "xixixi: "+resp.errCode + BaseResp.ErrCode.ERR_OK + resp.getType() + ConstantsAPI.COMMAND_SENDAUTH + ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX);

        switch (resp.errCode) {
            // 授权成功
            case BaseResp.ErrCode.ERR_OK:
                switch(resp.getType()){
                    case ConstantsAPI.COMMAND_SENDAUTH:
                        result = "授权成功";
                        this.authorizedSuccess(resp);
                        break;
                    case ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX:
                        result = "分享成功";
                        break;
                }
                break;
            default:
                Toast.makeText(this, "授权失败", Toast.LENGTH_LONG).show();
                switch (resp.errCode) {
                    // 用户取消
                    case BaseResp.ErrCode.ERR_USER_CANCEL:
                        result = "用户取消";
                        break;
                    // 授权失败
                    case BaseResp.ErrCode.ERR_SENT_FAILED:
                        result = "授权失败";
                        break;
                    // 用户拒绝
                    case BaseResp.ErrCode.ERR_AUTH_DENIED:
                        result = "用户拒绝";
                        break;
                    // 不支持微信
                    case BaseResp.ErrCode.ERR_UNSUPPORT:
                        result = "不支持微信";
                        break;
                    // 签名错误
                    case BaseResp.ErrCode.ERR_BAN:
                        result = "签名错误";
                        break;
                    default:
                        result += resp.errCode;
                }
        }
        Log.d("WXEntryActivity", "用户操作: "+result);
        // 关闭当前面板
        finish();
    }
    // 授权成功
    private void authorizedSuccess (BaseResp resp) {
        Toast.makeText(this, "授权成功", Toast.LENGTH_LONG).show();
        Log.d("WXEntryActivity", "BaseResp.getType = " + resp.getType());
        // BaseResp.getType 1:第三方授权, 2:分享
        switch (resp.getType()) {
            case 1:
                Log.d("WXEntryActivity", "授权成功");
                CODE = ((SendAuth.Resp) resp).code;
                getAccessToken(new callBack() {
                    @Override
                    public void next(JSONObject obj) {
                        getWeChatUserInfo(notifyWeChatLoginSuccess());
                    }
                });
                break;
            case 2:
                Log.d("WXEntryActivity", "分享成功");
                break;
            default:
                Log.e("WXEntryActivity", "未知的操作类型: "+ resp.getType());
        }
    }
    // 通过code获取access_token
    private void getAccessToken (final callBack cb) {
        String URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="
                + APP_ID + "&secret=" + SECRET + "&code=" + CODE + "&grant_type=authorization_code";
        httpGet(URL, new callBack() {
            @Override
            public void next(JSONObject obj) {
                try {
                    if (obj.has("errcode")) {
                        Log.d("WXEntryActivity", "获取 access_token 失败: errCode" + obj.getInt("errcode") + ", errMsg: " + obj.getString("errmsg"));
                        return;
                    }
                    resetData(obj);
                    cb.next(obj);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
    // 获取微信用户信息
    private void getWeChatUserInfo (final callBack cb) {
        String URL = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid;
        httpGet(URL, new callBack() {
            @Override
            public void next(JSONObject obj) {
                try {
                    if (obj.has("errcode")) {
                        Log.d("WXEntryActivity", "获取玩家信息失败: errCode" + obj.getInt("errcode")+ ", errMsg: " + obj.getString("errmsg"));
                        return;
                    }
                    cb.next(obj);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
    // 通知 js 微信登陆完成
    private callBack notifyWeChatLoginSuccess () {
        return new callBack() {
            @Override
            public void next(JSONObject obj) {
                userInfo = obj;
                AppActivity.evalString("glGame.platform.loginCallBack("+userInfo.toString()+")");
            }
        };
    }

    // 微信登陆
    public static void login () {
        Log.d("WXEntryActivity", "开始微信登录 ...");
        if (!api.isWXAppInstalled()) {
            Log.d("WXEntryActivity", "没有安装微信 ...");
            return;
        }
        final SendAuth.Req req = new SendAuth.Req();
        req.scope = "snsapi_userinfo";
        req.state = "wechat_sdk_demo_test";
        api.sendReq(req);
    }
//    // 刷新或续期 access_token 使用
//    public void refreshToken () {
//        String URL = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid="
//                + APP_ID + "&grant_type=refresh_token&refresh_token=" + refresh_token;
//        httpGet(URL, new callBack() {
//            @Override
//            public void next(JSONObject obj) {
//                try {
//                    if (obj.getInt("errcode") == 40030) {
//                        Log.d("WXEntryActivity", "刷新或续期 access_token 失败: "+obj.getString("errmsg"));
//                        return;
//                    }
//                    resetData(obj);
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        });
//    }
//    // 检验授权凭证（access_token）是否有效
//    public void accessToken () {
//        String URL = "https://api.weixin.qq.com/sns/auth?access_token=" + access_token + "&openid=" + openid;
//        httpGet(URL, new callBack() {
//            @Override
//            public void next(JSONObject obj) {
//                try {
//                    if (obj.getInt("errcode") == 40003) {
//                        Log.d("WXEntryActivity", "检验授权凭证失败: invalid openid ...");
//                        return;
//                    }
//                    if (obj.getString("errmsg").equals("ok")) {
//                        Log.d("WXEntryActivity", "检验授权凭证成功 ..."+obj.toString());
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        });
//    }

    //跳转微信
    public static void openWeiXin(){
        Uri uri = Uri.parse("weixin://");
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_VIEW);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(uri);
        wxApp.startActivity(intent);
    }

    //文字类型分享type:1 好友 2 朋友圈
    @SuppressWarnings("ResourceType")
    public static boolean share(String title,String content,String url,String image, int scene)
    {
        if (!api.isWXAppInstalled()) {
            Log.d("WXEntryActivity", "没有安装微信 ...");
            return false;
        }
        WXWebpageObject webpage = new WXWebpageObject();
        webpage.webpageUrl = url;
        WXMediaMessage msg = new WXMediaMessage(webpage);
        msg.title = title;
        msg.description = content;
        Bitmap bitmap = returnBitmap(image);
        msg.thumbData = bmpToByteArray(bitmap, true);
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = "Share_Linke_Type" + scene;
        req.message = msg;
        if (scene == 1)
        {
            req.scene = SendMessageToWX.Req.WXSceneSession;
        }else
        {
            req.scene = SendMessageToWX.Req.WXSceneTimeline;
        }
        return api.sendReq(req);
    }

    //文字类型分享type:0 好友 1 朋友圈 2收藏
    @SuppressWarnings("ResourceType")
    public static boolean shareImage(String image, int scene)
    {
        WXImageObject imgObj = new WXImageObject(returnBitmap(image));
        WXMediaMessage msg = new WXMediaMessage();
        msg.mediaObject = imgObj;

        //设置缩略图
        Bitmap bitmap = returnBitmap(image);
        msg.thumbData = bmpToByteArray(bitmap, true);

        //构造一个Req
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.message = msg;
        req.scene = scene;
        //调用api接口，发送数据到微信
        return api.sendReq(req);
    }

    public static byte[] bmpToByteArray(final Bitmap bmp, final boolean needRecycle) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.PNG, 100, output);
        int options = 100;
        while (output.toByteArray().length > 32 && options != 10) {
            output.reset();
            bmp.compress(Bitmap.CompressFormat.JPEG, options, output);
            options -= 10;
        }
        return output.toByteArray();
    }

    /**
     * 根据图片的url路径获得Bitmap对象
     * @param url
     * @return
     */
    public static Bitmap returnBitmap(String url) {
        Bitmap bitmap= null;//用网络流获取图片
        try {
            bitmap = BitmapFactory.decodeStream(new URL(url).openStream());
        } catch (IOException e) {
        }
        return bitmap;
    }
}

//
//  WXController.mm
//

#import "WXController.h"
#import "cocos/scripting/js-bindings/jswrapper/SeApi.h"
//#import "SDKWrapper.h"

// APP_ID 替换为你的应用从官方网站申请到的合法appID
NSString* APP_ID = @"wx11fd786c9041303d";
// SECRET 替换为你的应用从官方网站申请到的合法secret
NSString* SECRET = @"5cf9944e058fe899965e683ce4fe845e";
// 用户换取access_token的code
NSString* CODE = @"";
// 接口调用凭证
NSString* access_token = @"";
// access_token接口调用凭证超时时间, 单位(秒)
NSString* expires_in = @"";
// 用户刷新access_token
NSString* refresh_token = @"";
// 授权用户唯一标识
NSString* openid = @"";
// 用户授权的作用域, 使用逗号(,)分隔
NSString* scope = @"";
// 当且仅当该移动应用已获得该用户的 userinfo 授权时, 才会出现该字段
NSString* unionid = @"";
// 微信用户信息
NSDictionary* userInfo = nullptr;

@implementation WXController
- (void) resetData: (NSDictionary *)data {
    if ([data.allKeys containsObject:@"access_token"] && [data objectForKey:@"access_token"]) {
        access_token = [data objectForKey:@"access_token"];
    }
    if ([data.allKeys containsObject:@"expires_in"] && [data objectForKey:@"expires_in"]) {
        expires_in = [data objectForKey:@"expires_in"];
    }
    if ([data.allKeys containsObject:@"refresh_token"] && [data objectForKey:@"refresh_token"]) {
        refresh_token = [data objectForKey:@"refresh_token"];
    }
    if ([data.allKeys containsObject:@"openid"] && [data objectForKey:@"openid"]) {
        openid = [data objectForKey:@"openid"];
    }
    if ([data.allKeys containsObject:@"scope"] && [data objectForKey:@"scope"]) {
        scope = [data objectForKey:@"scope"];
    }
    if ([data.allKeys containsObject:@"unionid"] && [data objectForKey:@"unionid"]) {
        unionid = [data objectForKey:@"unionid"];
    }
}

- (void) httpGet: (NSString *) URL success:(void(^)(NSDictionary * nsd)) success{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSURL *zoneUrl = [NSURL URLWithString:URL];
        NSString *zoneStr = [NSString stringWithContentsOfURL:zoneUrl encoding:NSUTF8StringEncoding error:nil];
        NSData *data = [zoneStr dataUsingEncoding:NSUTF8StringEncoding];
        dispatch_async(dispatch_get_main_queue(), ^{
            if (data) {
                NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
                success(dic);
            }
        });
    });
}

+ (void) login {
    NSLog(@"weChatLogin ...");
//    [SDKWrapper getInstance].login_type = 0;
    if ([WXApi isWXAppInstalled] && [WXApi isWXAppSupportApi]) {
        //构造SendAuthReq结构体
        SendAuthReq* req =[[[SendAuthReq alloc]init]autorelease];
        req.scope = @"snsapi_userinfo";
        req.state = @"wechat_sdk_demo_test";
        //第三方向微信终端发送一个SendAuthReq消息结构
        [WXApi sendReq:req];
    } else {
        NSLog(@"请安装/升级微信客户端到最新版本");
    }
}

+(bool) isWechat {
    if ([WXApi isWXAppInstalled] && [WXApi isWXAppSupportApi]) {
        return true;
    } else {
        return false;
    }
}

- (id) init {
    if(self = [super init]){
        _scene = WXSceneSession;
    }
    return self;
}

- (void) initWeChatAPI {
    NSLog(@"注册应用到微信");
    [WXApi registerApp: @"wx11fd786c9041303d"];
}

- (void) onReq: (BaseReq *)req {
}

- (void) onResp:(BaseResp *)resp {
    NSString *result = @"未知错误";
    switch (resp.errCode) {
        case WXErrCode::WXSuccess:
            result = @"授权成功";
            [self authorizedSuccess: resp];
            break;
        default:
            switch (resp.errCode) {
                case WXErrCode::WXErrCodeCommon:
                    result = @"普通错误类型 -1";
                    break;
                case WXErrCode::WXErrCodeUserCancel:
                    result = @"用户点击取消并返回 -2";
                    break;
                case WXErrCode::WXErrCodeSentFail:
                    result = @"发送失败 -3";
                    break;
                case WXErrCode::WXErrCodeAuthDeny:
                    result = @"授权失败 -4";
                    break;
                case WXErrCode::WXErrCodeUnsupport:
                    result = @"微信不支持 -5";
                    break;
                default:
                    result = [NSString stringWithFormat:@"未知错误:%d", resp.errCode];
                    break;
            }
            break;
    }
    NSLog(result);
}

- (void) authorizedSuccess: (BaseResp *)resp {
    // 微信登陆授权
    if ([resp isKindOfClass:[SendAuthResp class]]) {
        NSLog(@"微信登陆授权");
        CODE = ((SendAuthResp*)resp).code;
        [self getAccessToken];
    }
    // 微信分享授权
    else if ([resp isKindOfClass:[SendMessageToWXResp class]]) {
        NSLog(@"微信分享授权");
    } else {
        NSLog(@"未知的操作类型");
    }
}

- (void) getAccessToken {
    NSString *url =[NSString stringWithFormat:
                    @"https://api.weixin.qq.com/sns/oauth2/access_token?appid=%@&secret=%@&code=%@&grant_type=authorization_code",
                    APP_ID,
                    SECRET,
                    CODE];
    [self httpGet:url success:^(NSDictionary *nsd) {
        [self resetData:nsd];
        [self getWeChatUserInfo];
    }];
}

- (void) getWeChatUserInfo {
    NSString *url =[NSString stringWithFormat:
                    @"https://api.weixin.qq.com/sns/userinfo?access_token=%@&openid=%@",
                    access_token,
                    openid];
    [self httpGet:url success:^(NSDictionary *nsd) {
        userInfo = nsd;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:userInfo options:0 error:0];
        NSString *str = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        str = [NSString stringWithFormat:@"glGame.platform.loginCallBack(%@)", str];
        se::ScriptEngine::getInstance()->evalString([str UTF8String]);
    }];
}

+(BOOL)shareImage:(NSString*)path
            Scene:(int)scene
{
    NSData * imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:path]];
    
    WXImageObject *imageObject = [WXImageObject object];
    imageObject.imageData = imageData;
    
    WXMediaMessage *message = [WXMediaMessage message];
    message.mediaObject = imageObject;
    
    SendMessageToWXReq *req = [[SendMessageToWXReq alloc] init];
    req.bText = NO;
    req.message = message;
    req.scene = scene;
    [WXApi sendReq:req];
}

+(BOOL)share:(NSString*)title
     Content:(NSString*)content
         Url:(NSString*)url
    ShareImg:(NSString*)shareImg
       Scene:(int)scene
{
    WXWebpageObject *ext = [WXWebpageObject object];
    ext.webpageUrl = url;
    NSData * data = [NSData dataWithContentsOfURL:[NSURL URLWithString:shareImg]];
    UIImage *thumbImage = [UIImage imageWithData:data];
    WXMediaMessage *message = [WXMediaMessage message];
    message.title = title;
    message.description = content;
    message.mediaObject = ext;
    message.messageExt = nil;
    message.messageAction = nil;
    message.mediaTagName = @"WECHAT_TAG_SHARELINK_CS";
    [message setThumbImage:thumbImage];
    SendMessageToWXReq *req = [[[SendMessageToWXReq alloc] init] autorelease];
    req.bText = false;
    req.scene = scene;
    req.message = message;
    return [WXApi sendReq:req];
}
@end

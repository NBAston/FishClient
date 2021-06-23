//
//  WXController.h
//
#import <UIKit/UIKit.h>
#import "wechatSdk/WXApi.h"
//#import "SDKWrapper.h"

@interface WXController : UIResponder<UIApplicationDelegate, WXApiDelegate> {
    enum WXScene _scene;
}
- (void) initWeChatAPI;
@property (strong, nonatomic) UIWindow *window;
@end

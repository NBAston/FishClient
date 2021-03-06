/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "AppController.h"

#import "JPUSHService.h"

#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

#import <AdSupport/AdSupport.h>

#import "OpenInstallSDK.h"
#import "cocos2d.h"
#import "AppDelegate.h"
#import "RootViewController.h"
#import "WXController.h"
#import "SDKWrapper.h"
#import "platform/ios/CCEAGLView-ios.h"
#import <sys/utsname.h>

using namespace cocos2d;
static NSString *const jPushAppID = @"09241fbaefc087077d3c3f85";
static NSString *const appChannel = @"boke v2.5";
NSString *jpushRegisterID = @"";

@interface AppController()<OpenInstallDelegate>
@end

@interface AppController()<JPUSHRegisterDelegate>
@end

@implementation AppController

Application* app = nullptr;
WXController* wxController = nullptr;
@synthesize window;

#pragma mark -
#pragma mark Application lifecycle

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[SDKWrapper getInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    //openinstall
    [OpenInstallSDK initWithDelegate:self];
    
    //Required
    //notice: 3.0.0 ??????????????????????????????????????????????????????????????????????????????
    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
    entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound|JPAuthorizationOptionProvidesAppNotificationSettings;
    if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
        // ????????????????????? categories
        // NSSet<UNNotificationCategory *> *categories for iOS10 or later
        // NSSet<UIUserNotificationCategory *> *categories for iOS8 and iOS9
    }
    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
    
    //??????advertsingid????????????
    NSString *advertisingId = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    //??????????????????
    [JPUSHService setupWithOption:launchOptions appKey:jPushAppID channel:appChannel apsForProduction:0 advertisingIdentifier:advertisingId];
    
    //2.1.9??????????????????registration id block?????????
    [JPUSHService registrationIDCompletionHandler:^(int resCode, NSString *registrationID) {
        if(resCode == 0)
        {
            // iOS10??????registrationID???????????????, ?????????????????????, ????????????????????????????????????
            jpushRegisterID = registrationID;
            NSLog(@"registrationID???????????????%@",registrationID);
            [[NSUserDefaults standardUserDefaults] setObject:registrationID forKey:@"registrationID"];
            [[NSUserDefaults standardUserDefaults] synchronize];
        }
        else
        {
            NSLog(@"registrationID???????????????code???%d",resCode);
        }
    }];
    
    // Add the view controller's view to the window and display.
    float scale = [[UIScreen mainScreen] scale];
    CGRect bounds = [[UIScreen mainScreen] bounds];
    window = [[UIWindow alloc] initWithFrame: bounds];
    
    // cocos2d application instance
    app = new AppDelegate(bounds.size.width * scale, bounds.size.height * scale);
    app->setMultitouch(true);
    
    // Use RootViewController to manage CCEAGLView
    _viewController = [[RootViewController alloc]init];
#ifdef NSFoundationVersionNumber_iOS_7_0
    _viewController.automaticallyAdjustsScrollViewInsets = NO;
    _viewController.extendedLayoutIncludesOpaqueBars = NO;
    _viewController.edgesForExtendedLayout = UIRectEdgeAll;
#else
    _viewController.wantsFullScreenLayout = YES;
#endif
    // Set RootViewController to window
    if ( [[UIDevice currentDevice].systemVersion floatValue] < 6.0)
    {
        // warning: addSubView doesn't work on iOS6
        [window addSubview: _viewController.view];
    }
    else
    {
        // use this method on ios6
        [window setRootViewController:_viewController];
    }
    
    [window makeKeyAndVisible];
    
    [[UIApplication sharedApplication] setStatusBarHidden:YES];
    [[UIApplication sharedApplication] setIdleTimerDisabled:YES];
    
    wxController = [WXController new];
    [wxController initWeChatAPI];
    
    //run the cocos2d-x game scene
    app->start();
    
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler{
    //??????????????????OpenInstall Universal Link ??????App
    if ([OpenInstallSDK continueUserActivity:userActivity]){//???????????????Universal link ??????????????????
        return YES;
    }
    //????????????????????????
    return YES;
}

-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{
    //??????????????????OpenInstall URL Scheme ??????App
    if  ([OpenInstallSDK handLinkURL:url]){//??????
        return YES;
    }
    //????????????????????????
    NSLog(@"11###[[SDKWrapper getInstance] login_type]:%d%@", 1, [url absoluteString]);
    //    if([SDKWrapper getInstance].login_type == 0){
    return [WXApi handleOpenURL:url delegate:wxController];
    //    }
    //    else{
    //        [QQApiInterface handleOpenURL:url delegate:(id<QQApiInterfaceDelegate>)[QQController class]];
    //        if (YES == [TencentOAuth CanHandleOpenURL:url])
    //        {
    //            return [TencentOAuth HandleOpenURL:url];
    //
    //        }
    //        return false;
    //    }
}

//iOS9?????????????????????????????????
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(nonnull NSDictionary *)options{
    //??????????????????OpenInstall URL Scheme ??????App
    if  ([OpenInstallSDK handLinkURL:url]){//??????
        return YES;
    }
    //????????????????????????
    return [WXApi handleOpenURL:url delegate:wxController];
    
}
//??????OpenInstall??????????????????App?????????????????????????????????????????????????????????App??????????????????????????????
-(void)getWakeUpParams:(OpeninstallData *)appData{
    if (appData.data) {//(??????????????????)
        //e.g.?????????????????????????????????????????????????????????????????????????????????????????????
    }
    if (appData.channelCode) {//(?????????????????????????????????????????????????????????)
        //e.g.????????????????????????????????????
    }
    //???????????????(?????????????????????????????????????????????)
    NSLog(@"OpenInstallSDK:\n???????????????%@;\n???????????????%@",appData.data,appData.channelCode);
    NSString *parameter = [NSString stringWithFormat:@"?????????????????????????????????????????????\n?????????????????????????????????????????????(????????????)?????????app\n\n???????????????\n%@\n???????????????%@",appData.data,appData.channelCode];
    UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"????????????" message:parameter delegate:nil cancelButtonTitle:@"??????" otherButtonTitles:nil, nil];
    [alert show];
}

#pragma mark *** ??????APNs???????????????DeviceToken ***
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    
    /// Required - ?????? DeviceToken
    [JPUSHService registerDeviceToken:deviceToken];
}

#pragma mark *** ????????????APNs???????????????????????? ***
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    //Optional
    NSLog(@"did Fail To Register For Remote Notifications With Error: %@", error);
}

#pragma mark- JPUSHRegisterDelegate

// iOS 12 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center openSettingsForNotification:(UNNotification *)notification{
    if (notification && [notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        //?????????????????????????????????
    }else{
        //?????????????????????????????????
    }
}

// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
    // Required
    NSDictionary * userInfo = notification.request.content.userInfo;
    if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
    }
    completionHandler(UNNotificationPresentationOptionAlert); // ????????????????????????????????????????????????????????? Badge???Sound???Alert ??????????????????????????????
}

// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
    // Required
    NSDictionary * userInfo = response.notification.request.content.userInfo;
    if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
    }
    completionHandler();  // ??????????????????????????????
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    
    // Required, iOS 7 Support
    [JPUSHService handleRemoteNotification:userInfo];
    completionHandler(UIBackgroundFetchResultNewData);
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    
    // Required, For systems with less than or equal to iOS 6
    [JPUSHService handleRemoteNotification:userInfo];
}

- (void)applicationWillResignActive:(UIApplication *)application {
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
    [[SDKWrapper getInstance] applicationWillResignActive:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
    [[SDKWrapper getInstance] applicationDidBecomeActive:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
     If your application supports background execution, called instead of applicationWillTerminate: when the user quits.
     */
    [[SDKWrapper getInstance] applicationDidEnterBackground:application];
    app->applicationDidEnterBackground();
    
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    /*
     Called as part of  transition from the background to the inactive state: here you can undo many of the changes made on entering the background.
     */
    [[SDKWrapper getInstance] applicationWillEnterForeground:application];
    app->applicationWillEnterForeground();
    
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    [[SDKWrapper getInstance] applicationWillTerminate:application];
    delete app;
    app = nil;
}


#pragma mark -
#pragma mark Memory management

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
    /*
     Free up as much memory as possible by purging cached data objects that can be recreated (or reloaded from disk) later.
     */
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url{
    NSLog(@"22###[[SDKWrapper getInstance] login_type]:%d%@", 2, [url absoluteString]);
    //    if([SDKWrapper getInstance].login_type == 0){
    return  [WXApi handleOpenURL:url delegate:wxController];
    //    }
    //    else{
    //        [QQApiInterface handleOpenURL:url delegate:(id<QQApiInterfaceDelegate>)[QQController class]];
    //        if (YES == [TencentOAuth CanHandleOpenURL:url])
    //        {
    //            return [TencentOAuth HandleOpenURL:url];
    //        }
    //        return false;
    //    }
}

+(NSString*)getRegisID {
    NSLog(@"jpushRegisterID???%@",jpushRegisterID);
    return jpushRegisterID;
}

+ (NSString *)getPhoneType{
    struct utsname systemInfo;
    uname(&systemInfo);
    
    NSString *deviceModel = [NSString stringWithCString:systemInfo.machine encoding:NSASCIIStringEncoding];
    
    
    if ([deviceModel isEqualToString:@"iPhone3,1"])    return @"iPhone 4";
    if ([deviceModel isEqualToString:@"iPhone3,2"])    return @"iPhone 4";
    if ([deviceModel isEqualToString:@"iPhone3,3"])    return @"iPhone 4";
    if ([deviceModel isEqualToString:@"iPhone4,1"])    return @"iPhone 4S";
    if ([deviceModel isEqualToString:@"iPhone5,1"])    return @"iPhone 5";
    if ([deviceModel isEqualToString:@"iPhone5,2"])    return @"iPhone 5 (GSM+CDMA)";
    if ([deviceModel isEqualToString:@"iPhone5,3"])    return @"iPhone 5c (GSM)";
    if ([deviceModel isEqualToString:@"iPhone5,4"])    return @"iPhone 5c (GSM+CDMA)";
    if ([deviceModel isEqualToString:@"iPhone6,1"])    return @"iPhone 5s (GSM)";
    if ([deviceModel isEqualToString:@"iPhone6,2"])    return @"iPhone 5s (GSM+CDMA)";
    if ([deviceModel isEqualToString:@"iPhone7,1"])    return @"iPhone 6 Plus";
    if ([deviceModel isEqualToString:@"iPhone7,2"])    return @"iPhone 6";
    if ([deviceModel isEqualToString:@"iPhone8,1"])    return @"iPhone 6s";
    if ([deviceModel isEqualToString:@"iPhone8,2"])    return @"iPhone 6s Plus";
    if ([deviceModel isEqualToString:@"iPhone8,4"])    return @"iPhone SE";
    if ([deviceModel isEqualToString:@"iPhone9,1"])    return @"iPhone 7";
    if ([deviceModel isEqualToString:@"iPhone9,2"])    return @"iPhone 7 Plus";
    if ([deviceModel isEqualToString:@"iPhone9,3"])    return @"iPhone 7";
    if ([deviceModel isEqualToString:@"iPhone9,4"])    return @"iPhone 7 Plus";
    if ([deviceModel isEqualToString:@"iPhone10,1"])   return @"iPhone_8";
    if ([deviceModel isEqualToString:@"iPhone10,4"])   return @"iPhone_8";
    if ([deviceModel isEqualToString:@"iPhone10,2"])   return @"iPhone_8_Plus";
    if ([deviceModel isEqualToString:@"iPhone10,5"])   return @"iPhone_8_Plus";
    if ([deviceModel isEqualToString:@"iPhone10,3"])   return @"iPhone X";
    if ([deviceModel isEqualToString:@"iPhone10,6"])   return @"iPhone X";
    if ([deviceModel isEqualToString:@"iPhone11,8"])   return @"iPhone XR";
    if ([deviceModel isEqualToString:@"iPhone11,2"])   return @"iPhone XS";
    if ([deviceModel isEqualToString:@"iPhone11,6"])   return @"iPhone XS Max";
    if ([deviceModel isEqualToString:@"iPhone11,4"])   return @"iPhone XS Max";
    if ([deviceModel isEqualToString:@"iPod1,1"])      return @"iPod Touch 1G";
    if ([deviceModel isEqualToString:@"iPod2,1"])      return @"iPod Touch 2G";
    if ([deviceModel isEqualToString:@"iPod3,1"])      return @"iPod Touch 3G";
    if ([deviceModel isEqualToString:@"iPod4,1"])      return @"iPod Touch 4G";
    if ([deviceModel isEqualToString:@"iPod5,1"])      return @"iPod Touch (5 Gen)";
    if ([deviceModel isEqualToString:@"iPad1,1"])      return @"iPad";
    if ([deviceModel isEqualToString:@"iPad1,2"])      return @"iPad 3G";
    if ([deviceModel isEqualToString:@"iPad2,1"])      return @"iPad 2 (WiFi)";
    if ([deviceModel isEqualToString:@"iPad2,2"])      return @"iPad 2";
    if ([deviceModel isEqualToString:@"iPad2,3"])      return @"iPad 2 (CDMA)";
    if ([deviceModel isEqualToString:@"iPad2,4"])      return @"iPad 2";
    if ([deviceModel isEqualToString:@"iPad2,5"])      return @"iPad Mini (WiFi)";
    if ([deviceModel isEqualToString:@"iPad2,6"])      return @"iPad Mini";
    if ([deviceModel isEqualToString:@"iPad2,7"])      return @"iPad Mini (GSM+CDMA)";
    if ([deviceModel isEqualToString:@"iPad3,1"])      return @"iPad 3 (WiFi)";
    if ([deviceModel isEqualToString:@"iPad3,2"])      return @"iPad 3 (GSM+CDMA)";
    if ([deviceModel isEqualToString:@"iPad3,3"])      return @"iPad 3";
    if ([deviceModel isEqualToString:@"iPad3,4"])      return @"iPad 4 (WiFi)";
    if ([deviceModel isEqualToString:@"iPad3,5"])      return @"iPad 4";
    if ([deviceModel isEqualToString:@"iPad3,6"])      return @"iPad 4 (GSM+CDMA)";
    if ([deviceModel isEqualToString:@"iPad4,1"])      return @"iPad Air (WiFi)";
    if ([deviceModel isEqualToString:@"iPad4,2"])      return @"iPad Air (Cellular)";
    if ([deviceModel isEqualToString:@"iPad4,4"])      return @"iPad Mini 2 (WiFi)";
    if ([deviceModel isEqualToString:@"iPad4,5"])      return @"iPad Mini 2 (Cellular)";
    if ([deviceModel isEqualToString:@"iPad4,6"])      return @"iPad Mini 2";
    if ([deviceModel isEqualToString:@"iPad4,7"])      return @"iPad Mini 3";
    if ([deviceModel isEqualToString:@"iPad4,8"])      return @"iPad Mini 3";
    if ([deviceModel isEqualToString:@"iPad4,9"])      return @"iPad Mini 3";
    if ([deviceModel isEqualToString:@"iPad5,1"])      return @"iPad Mini 4 (WiFi)";
    if ([deviceModel isEqualToString:@"iPad5,2"])      return @"iPad Mini 4 (LTE)";
    if ([deviceModel isEqualToString:@"iPad5,3"])      return @"iPad Air 2";
    if ([deviceModel isEqualToString:@"iPad5,4"])      return @"iPad Air 2";
    if ([deviceModel isEqualToString:@"iPad6,3"])      return @"iPad Pro 9.7";
    if ([deviceModel isEqualToString:@"iPad6,4"])      return @"iPad Pro 9.7";
    if ([deviceModel isEqualToString:@"iPad6,7"])      return @"iPad Pro 12.9";
    if ([deviceModel isEqualToString:@"iPad6,8"])      return @"iPad Pro 12.9";
    
    if ([deviceModel isEqualToString:@"AppleTV2,1"])      return @"Apple TV 2";
    if ([deviceModel isEqualToString:@"AppleTV3,1"])      return @"Apple TV 3";
    if ([deviceModel isEqualToString:@"AppleTV3,2"])      return @"Apple TV 3";
    if ([deviceModel isEqualToString:@"AppleTV5,3"])      return @"Apple TV 4";
    
    if ([deviceModel isEqualToString:@"i386"])         return @"Simulator";
    if ([deviceModel isEqualToString:@"x86_64"])       return @"Simulator";
    return deviceModel;
}
+ (void)saveToLocal:(NSString *)imageUrl {
    NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:imageUrl]];
    UIImage *img = [UIImage imageWithData:data];
    UIImageWriteToSavedPhotosAlbum(img, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
}

+ (void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo {
    NSString *msg = nil;
    if (error) {
        msg = @"??????????????????";
    } else {
        msg = @"??????????????????";
    }
}

/**
 * ??????????????????
 */
+(void)copyToClip:(NSString*)text {
    UIPasteboard * pastboard = [UIPasteboard generalPasteboard];
    pastboard.string = text;
}
/**
 * ?????????????????????
 */
+(NSString*)getToClip {
    UIPasteboard * pastboard = [UIPasteboard generalPasteboard];
    NSString* text = [[NSString alloc] initWithString:pastboard.string];
    pastboard.string = [[NSString alloc] initWithString:@""];
    return text;
}
/**
 * ???????????????
 */
+(NSString*)getMachineCode {
    UIDevice* device = [[UIDevice alloc] init];
    NSString* machineCode = device.identifierForVendor.UUIDString;
    return machineCode;
}

/**
 * ??????????????????app
 */
+(void)jumpToApp:(NSString*)url {
    NSURL * urlStr = [NSURL URLWithString:url];
    if ([[UIApplication sharedApplication] canOpenURL:urlStr])
    {
        [[UIApplication sharedApplication] openURL:urlStr];
    }else{
        NSLog(@"can not jump to app");
    }
    
}

@end

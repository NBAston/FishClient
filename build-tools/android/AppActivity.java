/****************************************************************************
Copyright (c) 2015 Chukong Technologies Inc.

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
package org.cocos2dx.javascript;

import com.game.kaixinqp.wxapi.WXEntryActivity;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import android.app.ActivityManager;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.os.Bundle;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import android.content.pm.PackageManager;

import android.content.Intent;
import android.content.res.Configuration;
import android.telephony.TelephonyManager;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;

import android.provider.MediaStore;

import android.util.Log;

import com.fm.openinstall.OpenInstall;
import cn.jpush.android.api.JPushInterface;

import io.openinstall.cocos2dx.OpenInstallActivity;
import io.openinstall.cocos2dx.OpenInstallHelper;

public class AppActivity extends Cocos2dxActivity {

    private static ClipboardManager cm;                 // 剪切板
	public static AppActivity app;
	private static Cocos2dxGLSurfaceView glSurfaceView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (!isTaskRoot()) {
            return;
        }
		app = this;
        // 从API11开始android推荐使用android.content.ClipboardManager
        cm = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
        Log.d("appactivity aaaaa", "is call openinstallhelper.getWakeup");
        OpenInstall.init(app);
        OpenInstallHelper.getWakeup(getIntent(), app);
		JPushInterface.setDebugMode(true);
        JPushInterface.init(this);
		WXEntryActivity.initWeChatApi();
    }

    public boolean isMainProcess(){
        int pid = android.os.Process.myPid();
        ActivityManager activityManager = (ActivityManager)
                getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningAppProcessInfo appProcess : activityManager.getRunningAppProcesses()) {
            if (appProcess.pid == pid) {
                return getApplicationInfo().packageName.equals(appProcess.processName);
            }
        }
        return false;
    }

    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        glSurfaceView = new Cocos2dxGLSurfaceView(this);
        this.hideSystemUI();
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        return glSurfaceView;
    }

    private void hideSystemUI()
    {
        // Set the IMMERSIVE flag.
        // Set the content to appear under the system bars so that the content
        // doesn't resize when the system bars hide and show.
        glSurfaceView.setSystemUiVisibility(
                Cocos2dxGLSurfaceView.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | Cocos2dxGLSurfaceView.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | Cocos2dxGLSurfaceView.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | Cocos2dxGLSurfaceView.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                        | Cocos2dxGLSurfaceView.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                        | Cocos2dxGLSurfaceView.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus)
    {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus)
        {
            this.hideSystemUI();
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        //
        OpenInstallHelper.getWakeup(intent, app);
    }

    public static void getInstall(int s) {
        OpenInstallHelper.getInstall(s, app);
    }

    public static void registerWakeup(){
        OpenInstallHelper.registerWakeupCallback(app);
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }



    // 复制文本到剪切板
    public static void copyToClip (String content) {
        // 将文本内容放到系统剪贴板里
        cm.setPrimaryClip(ClipData.newPlainText("label", content));
    }
    // 获取剪切板文本内容
    public static String getClipText () {
        String text;
        try {
            // 当剪切板无内容时候此处会触发异常引起应用闪退, try 住,并手动返回一个空串
            text = cm.getPrimaryClip().getItemAt(0).getText().toString();
        }catch (Exception e) {
            text = "";
        }
        cm.setPrimaryClip(ClipData.newPlainText("label", ""));
        return text;
    }
	// 获取机器码
	public static String getIMEI() {
		Context context = app.getApplicationContext();
		TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(context.TELEPHONY_SERVICE);
		String imei = telephonyManager.getDeviceId();

		return imei;
	}
	//1：横屏，2：竖屏，3根据用户朝向
	public static void setOrientation (int orientation) {
		if(orientation == 1 ) {
            app.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            app.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        }else if (orientation == 2 ){
            app.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            //app.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
        }else if (orientation == 3 ) {
            app.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_USER);
            app.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
        }
	}

    //动态获取内存存储权限
//    public static void verifyStoragePermissions() {
//        // Check if we have write permission
//        int permission = ActivityCompat.checkSelfPermission(app,
//                Manifest.permission.WRITE_EXTERNAL_STORAGE);
//
//        if (permission != PackageManager.PERMISSION_GRANTED) {
//            // We don't have permission so prompt the user
//            //ActivityCompat.requestPermissions(app, PERMISSIONS_STORAGR,REQUEST_EXTERNAL_STORAGE);
//        }
//    }

    // 获取 路径中的图片 保存到本地
    public static void saveTextureToLocal( String pngPath) {
        Log.d("图片地址",pngPath);
        //先调用上边的方法 获取一下权限  有的时候会说你没有权限
        //verifyStoragePermissions();
        //从路径中读取 照片
        Bitmap bmp = BitmapFactory.decodeFile(pngPath);

        // fileName ==textureName  尽量和JS保存的一致
        String fileName = "textureName";
        File file = new File(pngPath);
        try {
            FileOutputStream fos = new FileOutputStream(file);
            bmp.compress(Bitmap.CompressFormat.PNG, 100, fos);
            fos.flush();
            fos.close();
            Log.d("保存成功",pngPath );

        } catch (FileNotFoundException e) {
            Log.d("保存错误1",e.toString());

            e.printStackTrace();
        } catch (IOException e) {
            Log.d("保存错误2",e.toString());

            e.printStackTrace();
        }

        // 其次把文件插入到系统图库
        try {
            MediaStore.Images.Media.insertImage(AppActivity.getContext().getApplicationContext().getContentResolver(),
                    file.getAbsolutePath(), fileName, null);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        // 最后通知图库更新
        AppActivity.getContext().getApplicationContext().sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse(file.getAbsolutePath())));

    }

    
    public static void evalString (final String value) {
        app.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString(value);
            }
        });
    }
}

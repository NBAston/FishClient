## dianwan-client-master




# 捕鱼鱼线 编辑器 核心 https://github.com/NBAston/fishEditorCore  【cocos creator 2.3.4 版本】
## 导出web版本到 以下项目的 根目录 \web-mobile

# 捕鱼鱼线 编辑器 壳（打包exe、dmg）  https://github.com/NBAston/fishEditor 【electron@9.1.2 版本 文档： http://www.electronjs.org/docs 】
## npm i 初始化
## npm run s 运行/调试
## npm run packager2 打包 win安装包

# 捕鱼客户端资源所在目录 ： assets/modules/games/nfish 【大厅模式】

============ 打包流程============

一、配置
1、配置cocos creator sdk ndk 路径
2、安装并配置环境变量 python27、nodejs、java、gradle
3、初始化node modules 运行项目根目录 下的 npm-install.bat
4、配置Android 平台 build-native-config.json apk打包基础信息
5、配置Web 平台 build-web-config.json 打包基础信息
6、build-web-desktop-res.js、build-web-res.js cocos 打包工具路径 子项目 配置
7、version_generator.js 需要打包的项目以及地址 配置
8、配置热更地址hotupdateFileName.json
9、\assets\config\localsetting.json 配置 conf文件 里面的 "hotUrl": 热更地址

{
    "downLoadPage": "http://192.168.2.77/kxqp.ipa",
    "downVersion": "1.0.0",
    "gameSvrHost": "192.168.3.107/test",
    "gameSvrPort": "",
    "gameSvrTag": "dwc_kaixin",
    "hotUrl": "http://192.168.2.40/update",
    "payTest": 0,
    "platSvrHost": "http://192.168.3.101",
    "platSvrPort": 10010,
    "resUrl": "http://www.baidu.com"
}

二、打包
1.打包Android 平台 命令行: 
npm-install.bat
node build-native-res.js

拷贝热更资源到热更地址的http服务器

如果使用Android studio
2.拷贝\build-tools\jyqp 、 \build-tools\local.properties 到
\build\jsb-link\frameworks\runtime-src\proj.android-studio\app


三、调试
使用夜神模拟器打开可在软件目录 \Nox\bin\ 下运行:
./Nox_adb logcat














http://192.168.3.108/dw/sx/?producttag=customCard
http://192.168.3.107/customCard/


使用配牌器的客户端 链接后面加入：?producttag=customCard


=========================================== 项目流程

一、git拉取 dw-master 大厅到本地
二、在工程 \dw-master\assets\modules\ 下建立：
        games 文件夹
三、获取localsetting.json文件存储到 \dw-master\assets\config\下
       内容：{
             "cfgurl" : "http://192.168.3.108",
             "logenable" : true,
             "producttag" : "test"
          }
四、拉取大厅工程到
        \dw-master\assets\modules\plaza
四、拉取子游戏：
       \dw-master\assets\modules\games\honghei
       ...


------------------------------------------ git 脚本解析
git-clone-all.sh 创建仓库
git-pull-all.sh 抛弃当前修改 更新
git-pull-all1.sh 直接更新

 "producttag" : "test" //黑金，测试专用
 "producttag" : "dev"//内网测试

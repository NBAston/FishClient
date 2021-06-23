const fs = require('fs');
//读取文件，并且替换文件中指定的字符串
let replaceFile = function(filePath,sourceRegx,targetStr){
    fs.readFile(filePath,function(err,data){
        if(err){
            return err;
        }
        let str = data.toString();
        str = str.replace(sourceRegx,targetStr);
        fs.writeFile(filePath, str, function (err) {
            if (err) return err;
        });
    });
}
//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//遍历assets文件夹，找到global.js
fs.readdir('../assets',function(err,files){
    if(err){
        return err;
    }
    if(files.length !=0){
        files.forEach((item)=>{
            let path = '../assets/'+item;
			if(item == "global.js"){
             console.log("path："+path);
				//判断文件的状态，用于区分文件名/文件夹
				fs.stat(path,function(err,status){
					if(err){
						return err;
					}
					let isFile = status.isFile();//是文件
					let isDir = status.isDirectory();//是文件夹
					if(isFile){
						let currTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
						fs.readFile(path, 'utf8', function (err, data) {
							if(data.indexOf('nodejsbuildtime') != -1){
								data = data.replace(new RegExp('nodejsbuildtime','g'),currTime);
							}else{
								let reg=/(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
								data = data.replace(new RegExp(reg),currTime);
							}
							fs.writeFile(path, data, 'utf8', (err) => {
								if (err) throw err;
								console.log('success done');
							});
						});
					}
					if(isDir){
						console.log("文件夹："+item);
					}
				});
			}
        });
    }
});
 
 

/**
 * 自定义字符串格式化函数
 * 例子:
 *  let str = "替换字符串 %s";
 *  str.format("啊啊");
 *  console.log(str) => "替换字符串 啊啊"
 */
String.prototype.format = function () {
    //将arguments转化为数组（ES5中并非严格的数组）
    let args = Array.prototype.slice.call(arguments);
    let count=0;
    //通过正则替换%s
    return this.replace(/%s/g,function(s,i){
        return args[count++];
    });
};
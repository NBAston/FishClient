/*
    该脚本需要在当前路径下,查找特定字符串targetKey，替换成指定字符串exchangeKey
    @param {String} filePath: index.html (需要后缀)
    @param {String} targetKey 替换的目标字符
    @param {String} exchangeKey 替换的字符
    @param {Number} exchangeIndex 需要替换的个数
*/
var fs = require('fs');
var arguments = process.argv.splice(2);
var filePath = arguments[0];
var targetKey = arguments[1];
var exchangeKey = arguments[2];
var exchangeIndex = arguments[3]?arguments[3]:1;
var file = fs.readFileSync(filePath, "utf8");
console.log(file, typeof file);
for (let a=0; a<exchangeIndex; a++) {
    file = file.replace(new RegExp(targetKey), exchangeKey);
}
console.log("write end", file);
fs.writeFile(filePath, file, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("write success!!")
    }
});
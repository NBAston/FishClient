/**
 * 存储和读取用户本地缓存数据
 */
let
	LocalStorage = function () { },
	localStorage = LocalStorage.prototype,
	g_instance = null;

/**
 * 设置缓存数据
 * @param {String} key    数据唯一ID
 * @param {Object} value  需要缓存数据
 */
localStorage.setItem = function (key, value) {
	if (typeof key !== "string") return console.error("传入 key 类型错误");
	if (typeof value !== "object") return console.error("传入 value 类型错误");
	let data = JSON.stringify(value);
	console.log("存入数据", data);
	cc.sys.localStorage.setItem(key, data);
}
/**
 * 获取缓存数据
 * @param {String} key   数据唯一ID
 * @returns Object
 */
localStorage.getItem = function (key) {
	if (typeof key !== "string") return console.error("传入 key 类型错误");
	let data = cc.sys.localStorage.getItem(key);
	console.log("获取数据", data);
	return data ? JSON.parse(data) : data;
}
/**
 * 删除缓存值
 * @param {String} key   数据唯一ID
 */
localStorage.removeItemByKey = function (key) {
	if (typeof key !== "string") return console.error("传入 key 类型错误");
	console.log("删除数据", key)
	cc.sys.localStorage.removeItem(key);
}
module.exports = function () {
	if (!g_instance) {
		g_instance = new LocalStorage();
	}
	return g_instance;
};
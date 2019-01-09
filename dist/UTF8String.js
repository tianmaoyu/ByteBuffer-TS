"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UTF8String = /** @class */ (function () {
    function UTF8String() {
    }
    UTF8String.Write = function (str) {
        var buf = new ArrayBuffer(10);
        return buf;
    };
    UTF8String.Read = function (buf) {
        return "";
    };
    UTF8String.stringToUint8 = function (string) {
        var str = btoa(unescape(encodeURIComponent(string))), charList = str.split(''), uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint8Array(uintArray);
    };
    UTF8String.uint8ToString = function (uintArray) {
        var str = String.fromCharCode.apply(null, uintArray);
        str = decodeURIComponent(escape(atob(str)));
        return str;
    };
    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
    UTF8String.ab2str = function (buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    };
    // 字符串转为ArrayBuffer对象，参数为字符串
    UTF8String.str2ab = function (str) {
        var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };
    return UTF8String;
}());
exports.UTF8String = UTF8String;
//# sourceMappingURL=UTF8String.js.map
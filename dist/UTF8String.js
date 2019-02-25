"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UTF8String {
    static Write(str) {
        var buf = new ArrayBuffer(10);
        return buf;
    }
    static Read(buf) {
        return "";
    }
    /**
     * 后台 对应的写法
     * @param string   var bn= BitConverter.GetBytes('n');
            var b1 = BitConverter.GetBytes('你');
            var b2 = BitConverter.GetBytes('好');
     */
    static stringToUint8(string) {
        var str = btoa(unescape(encodeURIComponent(string))), charList = str.split(''), uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint8Array(uintArray);
    }
    static uint8ToString(uintArray) {
        var str = String.fromCharCode.apply(null, uintArray);
        str = decodeURIComponent(escape(atob(str)));
        return str;
    }
    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
    static ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    // 字符串转为ArrayBuffer对象，参数为字符串
    static str2ab(str) {
        var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
}
exports.UTF8String = UTF8String;
//# sourceMappingURL=UTF8String.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UTF8String {
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
}
exports.UTF8String = UTF8String;
//# sourceMappingURL=UTF8String.js.map
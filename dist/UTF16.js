"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UTF16 也称 Unicode,二个字节 代表一个字符
 */
class UTF16 {
    /**
     * 返回 字符串 UTF-16编码的长度
     * @param str 字符串
     */
    static getLength(str) {
        return str.length * 2; //
    }
    /**
     * 字符串写入 dataView,并返回写入的长度
     * @param str 字符串
     * @param buffer
     * @param offset 偏移量
     */
    static write(dataView, offset, str, littleEndian) {
        for (var i = 0; i < str.length; i++, offset += 2) {
            dataView.setUint16(offset, str.charCodeAt(i), littleEndian);
        }
        return str.length * 2;
    }
    static read(dataView, offset, length, littleEndian) {
        var chars = [];
        for (var i = 0; i < length / 2; i++, offset += 2) {
            chars.push(dataView.getUint16(offset, littleEndian));
        }
        var str = String.fromCharCode.apply(null, chars);
        return str;
    }
}
exports.UTF16 = UTF16;
//# sourceMappingURL=UTF16.js.map
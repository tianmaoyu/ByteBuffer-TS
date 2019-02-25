"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UTF8String_1 = require("./UTF8String");
class BufferWriteRead {
    static WriteReadTest(value) {
        var buf = new ArrayBuffer(32);
        console.info(buf.byteLength);
        var dv = new DataView(buf);
        var offset = 0;
        dv.setInt8(offset, 127);
        var int8 = dv.getInt8(offset);
        console.info(int8);
        offset += 1;
        dv.setInt16(offset, 5000);
        var int16 = dv.getInt16(offset);
        console.info(int16);
        offset += 2;
        dv.setFloat32(offset, 22.12);
        var float32 = dv.getFloat32(offset);
        console.info(float32);
        offset += 4;
        dv.setFloat64(offset, 22.100000000000002);
        var float64 = dv.getFloat64(offset);
        console.info(float64);
        offset += 8;
        //不能直接读写 buf
        for (var i = 0; i <= buf.byteLength; i++) {
            console.info(buf[i]);
        }
    }
    static ViewArrayTest() {
        var uint8Array = new Uint8Array(4);
        uint8Array[0] = 0;
        uint8Array[1] = 1;
        uint8Array[2] = 2;
        uint8Array[3] = 255;
        uint8Array.forEach(element => {
            console.info(element);
        });
        var find = uint8Array.indexOf(255);
        console.info(find);
    }
    static StringTest() {
        var buf = UTF8String_1.UTF8String.str2ab("n你好");
        console.info(buf.byteLength);
        var dv = new DataView(buf);
        for (var i = 0; i < dv.byteLength; i++) {
            console.info(dv.getUint8(i));
        }
        var str = UTF8String_1.UTF8String.ab2str(buf);
        console.info(str);
    }
    /**
    * arrayBuffer 转为为 string
    * @param buf
    */
    static ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    /**
     * string 转换为
     * unicode 编码:每个字符占用2个字节
     * @param str
     */
    static str2ab(str) {
        var buf = new ArrayBuffer(str.length * 2);
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
}
exports.BufferWriteRead = BufferWriteRead;
//# sourceMappingURL=BufferWriteRead.js.map
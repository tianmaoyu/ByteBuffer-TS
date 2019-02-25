"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reflect_1 = require("./Reflect");
class UserMessage {
    constructor() {
        this.MessageType = MessageType.msg1;
    }
    // public serialize(): ArrayBuffer {
    //     var length = 1 + 2 + this.Name.length * 2 + 1 + this.Address.length * 2 + 1;
    //     var buf = new ArrayBuffer(length);
    //     var offSet = 0;
    //     new Uint8Array(buf, offSet, 1)[0] = <number>this.MessageType;
    //     offSet += 1;
    //     new Int16Array(buf, offSet + 1, 2)[0] = this.Id;
    //     offSet += 2;
    //     new Int8Array(buf, offSet, 1)[0] = this.Bool ? 1 : 0;
    //     offSet += 1;
    //     var nameLength = StringUtils.writeString(buf, offSet, this.Name);
    //     offSet += nameLength;
    //     var addressLength = StringUtils.writeString(buf, offSet, this.Address);
    //     offSet += addressLength;
    //     return buf;
    // }
    static deserialize(buf) {
        var msg = new UserMessage();
        var offSet = 0;
        var dataView = new DataView(buf);
        msg.MessageType = dataView.getUint8(offSet);
        offSet++;
        msg.Id = dataView.getUint16(offSet);
        offSet += 2;
        msg.Bool = dataView.getUint8(offSet) == 1;
        offSet += 1;
        var lenStr = StringUtils.getString2(dataView, offSet);
        msg.Name = lenStr.text;
        offSet = lenStr.offset;
        var lenStr = StringUtils.getString2(dataView, offSet);
        msg.Address = lenStr.text;
        return msg;
    }
    serialize2() {
        var length = 1 + 2 + 1 + this.Name.length * 2 + 1 + this.Address.length * 2 + 1;
        var buf = new ArrayBuffer(length);
        var dataView = new DataView(buf);
        var offSet = 0;
        dataView.setUint8(0, this.MessageType);
        // new Uint8Array(buf, offSet, 1)[0] = <number>this.MessageType;
        offSet += 1;
        dataView.setUint16(offSet, this.Id);
        // new Int16Array(buf, offSet + 1, 2)[0] = this.Id;
        offSet += 2;
        dataView.setUint8(offSet, this.Bool ? 1 : 0);
        // new Int8Array(buf, offSet, 1)[0] = this.Bool ? 1 : 0;
        offSet += 1;
        var nameLength = StringUtils.writeString2(dataView, offSet, this.Name);
        offSet += nameLength;
        var addressLength = StringUtils.writeString2(dataView, offSet, this.Address);
        offSet += addressLength;
        return buf;
    }
}
__decorate([
    Reflect_1.format("1", 16),
    __metadata("design:type", String)
], UserMessage.prototype, "Address", void 0);
exports.UserMessage = UserMessage;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["msg1"] = 1] = "msg1";
    MessageType[MessageType["msg2"] = 2] = "msg2";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class MessageBase {
}
exports.MessageBase = MessageBase;
class StringUtils {
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
    /**
     * 从buf 中读取 string
     * @param buf
     * @param offset 开始
     * @param length 长度
     */
    static getString(buf, offset) {
        var length = new Uint8Array(buf, offset, 1)[0];
        offset += 1;
        var str = String.fromCharCode.apply(null, new Uint16Array(buf, offset, length));
        offset += length;
        return str;
    }
    /**
     * 把 string 写入到 buf 中 每个字符 2个byte ,第一位 存储 字符串的长度
     * @param buf
     * @param offset 开始位置
     * @param str 字符串
     */
    static writeString(buf, offset, str) {
        var length = str.length * 2; // 每个字符占用2个字节
        new Int8Array(buf, offset, 1)[0] = length; //name 长度
        offset += 1;
        var bufView = new Uint16Array(buf, offset, length);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return length + 1;
    }
    static writeString2(dataView, offset, str) {
        var length = str.length * 2; // 每个字符占用2个字节
        dataView.setUint8(offset, length);
        offset++;
        var charCodes = [];
        for (var i = 0; i < str.length; i++) {
            charCodes.push(str.charCodeAt(i));
        }
        for (var i = 0; i < str.length; i++, offset += 2) {
            dataView.setUint16(offset, charCodes[i]);
        }
        return length + 1;
    }
    /**
    * 从buf 中读取 string
    * @param buf
    * @param offset 开始
    * @param length 长度
    */
    static getString2(dataView, offset) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var chars = [];
        for (var i = 0; i < length / 2; i++, offset += 2) {
            chars.push(dataView.getUint16(offset));
        }
        var str = String.fromCharCode.apply(null, chars);
        var ls = new LengthString();
        ls.text = str;
        ls.offset = offset;
        return ls;
    }
}
exports.StringUtils = StringUtils;
class LengthString {
}
exports.LengthString = LengthString;
//# sourceMappingURL=Message.js.map
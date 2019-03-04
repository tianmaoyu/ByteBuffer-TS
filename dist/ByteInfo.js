"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Map1 = {};
const classPool = [];
class Buffer {
    //#region  read method
    /**
     * 从 buffer 中反射 出 一个 classType 实例
     * @param classType
     * @param buffer
     */
    static ReadObject(classType, buffer) {
        var offSet = 0;
        var object = new classType();
        var dataView = new DataView(buffer);
        for (var propertyKey in object) {
            var byteInfo = Reflect.getMetadata("ByteMember", object, propertyKey);
            if (byteInfo === undefined)
                continue;
            var propertyLength = this.readProperty(dataView, offSet, byteInfo, object, propertyKey);
            offSet += propertyLength;
        }
        return object;
    }
    static readProperty(dataView, offSet, byteInfo, object, propertyKey) {
        var type = byteInfo.Type;
        switch (type) {
            case ByteType.Uint8:
                object[propertyKey] = dataView.getUint8(offSet);
                return 1;
            case ByteType.Int8:
                object[propertyKey] = dataView.getInt8(offSet);
                return 1;
            case ByteType.Uint16:
                object[propertyKey] = dataView.getUint16(offSet);
                return 2;
            case ByteType.Int16:
                object[propertyKey] = dataView.getInt16(offSet);
                return 2;
            case ByteType.Int32:
                object[propertyKey] = dataView.getInt32(offSet);
                return 4;
            case ByteType.Float32:
                object[propertyKey] = dataView.getFloat32(offSet);
                return 4;
            case ByteType.Float64:
                object[propertyKey] = dataView.getFloat64(offSet);
                return 8;
            case ByteType.String:
                return Buffer.readString(dataView, offSet, object, propertyKey);
            case ByteType.Object:
                return Buffer.readInnerObject(dataView, offSet, object, propertyKey, byteInfo);
            //array
            case ByteType.UInt8Array:
                return Buffer.readUint8Array(dataView, offSet, object, propertyKey);
            case ByteType.Int8Array:
                return Buffer.readInt8Array(dataView, offSet, object, propertyKey);
            case ByteType.Uint16Array:
                return Buffer.readUint16Array(dataView, offSet, object, propertyKey);
            case ByteType.Int16Array:
                return Buffer.readInt16Array(dataView, offSet, object, propertyKey);
            case ByteType.Int32Array:
                return Buffer.readInt32Array(dataView, offSet, object, propertyKey);
            case ByteType.Float32Array:
                return Buffer.readFloat32Array(dataView, offSet, object, propertyKey);
            case ByteType.Float64Array:
                return Buffer.readFloat64Array(dataView, offSet, object, propertyKey);
            case ByteType.StringArray:
                return Buffer.readStringArray(dataView, offSet, object, propertyKey);
            case ByteType.ObjectArray:
                return Buffer.readInnerObjectArray(dataView, offSet, object, propertyKey, byteInfo);
        }
    }
    static readInnerObject(dataView, offset, object, propertyKey, byteInfo) {
        var length = dataView.getUint8(offset);
        offset += 1;
        if (length == 0) {
            object[propertyKey] = null;
            return length + 1;
        }
        let objectBuffer = dataView.buffer.slice(offset, length);
        object[propertyKey] = Buffer.ReadObject(byteInfo.Function, objectBuffer);
        return length + 1;
    }
    static readInnerObjectArray(dataView, offset, object, propertyKey, byteInfo) {
        var totalLength = 0;
        var arrayLength = dataView.getUint8(offset);
        offset += 1;
        var arrayObject = [];
        for (let i = 0; i < arrayLength; i++) {
            var length = dataView.getUint8(offset);
            offset += 1;
            totalLength += length + 1;
            if (length == 0) {
                arrayObject.push(null);
                continue;
            }
            let objectBuffer = dataView.buffer.slice(offset, length);
            var obj = Buffer.ReadObject(byteInfo.Function, objectBuffer);
            arrayObject.push(obj);
        }
        object[propertyKey] = arrayObject;
        return totalLength + 1;
    }
    static readUint8Array(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length; i++, offset++) {
            array.push(dataView.getUint8(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }
    static readInt8Array(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length; i++, offset++) {
            array.push(dataView.getInt8(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }
    static readUint16Array(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length / 2; i++, offset += 2) {
            array.push(dataView.getUint16(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }
    static readInt16Array(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length / 2; i++, offset += 2) {
            array.push(dataView.getInt16(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }
    static readInt32Array(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length / 4; i++, offset += 4) {
            array.push(dataView.getInt32(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }
    static readFloat32Array(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length / 4; i++, offset += 4) {
            array.push(dataView.getFloat32(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }
    static readFloat64Array(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length / 8; i++, offset += 8) {
            array.push(dataView.getFloat64(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }
    static readStringArray(dataView, offset, object, propertyKey) {
        var totalLength = 0; //数组所占的长度
        var arraryLength = dataView.getUint8(offset);
        offset += 1;
        var arrar = [];
        for (let j = 0; j < arraryLength; j++) {
            var length = dataView.getUint8(offset);
            offset += 1;
            var chars = [];
            for (var i = 0; i < length / 2; i++, offset += 2) {
                chars.push(dataView.getUint16(offset));
            }
            var str = String.fromCharCode.apply(null, chars);
            arrar.push(str);
            totalLength += length + 1;
        }
        object[propertyKey] = arrar;
        return totalLength + 1;
    }
    /**
      * 从buf 中读取 string
      * @param buf
      * @param offset 开始
      * @param length 长度
      */
    static readString(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var chars = [];
        for (var i = 0; i < length / 2; i++, offset += 2) {
            chars.push(dataView.getUint16(offset));
        }
        var str = String.fromCharCode.apply(null, chars);
        object[propertyKey] = str;
        return length + 1;
    }
    //#endregion
    //#region write method
    static WirteObject(obj) {
        var offSet = 0;
        var catheBuffer = new ArrayBuffer(128);
        var dataView = new DataView(catheBuffer);
        for (var key in obj) {
            var byteInfo = Reflect.getMetadata("ByteMember", obj, key);
            if (byteInfo === undefined)
                continue;
            var propertyLength = this.writeProperty(dataView, offSet, byteInfo.Type, obj[key]);
            offSet += propertyLength;
        }
        var buffer = catheBuffer.slice(0, offSet);
        return buffer;
    }
    /**
    * 把属性 Property 写入 二进制，并返回写入了的长度
    * @param type
    * @param value
    */
    static writeProperty(dataView, offSet, type, value) {
        switch (type) {
            case ByteType.Uint8:
                dataView.setUint8(offSet, value);
                return 1;
            case ByteType.Int8:
                dataView.setInt8(offSet, value);
                return 1;
            case ByteType.Uint16:
                dataView.setUint16(offSet, value);
                return 2;
            case ByteType.Int16:
                dataView.setInt16(offSet, value);
                return 2;
            case ByteType.Int32:
                dataView.setInt32(offSet, value);
                return 4;
            case ByteType.Float32:
                dataView.setFloat32(offSet, value);
                return 4;
            case ByteType.Float64:
                dataView.setFloat64(offSet, value);
                return 8;
            case ByteType.Object:
                return Buffer.wirteInnerObject(dataView, offSet, value);
            case ByteType.String:
                return Buffer.writeString(dataView, offSet, value);
            //数组
            case ByteType.UInt8Array:
                return 1 * value.length;
            case ByteType.Int8Array:
                return 1 * value.length;
            case ByteType.Uint16Array:
                return 2 * value.length;
            case ByteType.Int16Array:
                return 2 * value.length;
            case ByteType.Int32Array:
                return 4 * value.length;
            case ByteType.Float32Array:
                return 4 * value.length;
            case ByteType.Float64Array:
                return 8 * value.length;
            case ByteType.ObjectArray:
                return Buffer.wirteInnerObjectArray(dataView, offSet, value);
            case ByteType.StringArray:
                return Buffer.writeStringArray(dataView, offSet, value);
        }
    }
    static writeUint8Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setUint8(offset, array[i]);
            offset++;
        }
        return length + 1;
    }
    static writeInt8Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt8(offset, array[i]);
            offset++;
        }
        return length + 1;
    }
    static writeUint16Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setUint16(offset, array[i]);
            offset += 2;
        }
        return length * 2 + 1;
    }
    static writeInt16Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt16(offset, array[i]);
            offset += 2;
        }
        return length * 2 + 1;
    }
    static writeInt32Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt32(offset, array[i]);
            offset += 4;
        }
        return length * 4 + 1;
    }
    static writeFloat32Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setFloat32(offset, array[i]);
            offset += 4;
        }
        return length * 4 + 1;
    }
    static writeFloat64Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setFloat64(offset, array[i]);
            offset += 8;
        }
        return length * 8 + 1;
    }
    /**
     * 内部类
     * @param dataView
     * @param offSet
     * @param obj
     */
    static wirteInnerObject(dataView, offSet, obj) {
        var totalLength = Buffer.GetObjectLength(obj);
        dataView.setUint8(offSet, totalLength);
        offSet++;
        for (var key in obj) {
            var byteInfo = Reflect.getMetadata("ByteMember", obj, key);
            if (byteInfo === undefined)
                continue;
            var propertyLength = this.writeProperty(dataView, offSet, byteInfo.Type, obj[key]);
            offSet += propertyLength;
        }
        return totalLength + 1;
    }
    /**
     * 内部类 array
     * @param dataView
     * @param offSet
     * @param obj
     */
    static wirteInnerObjectArray(dataView, offSet, objArray) {
        var totalLength = 0;
        var arrayLength = objArray.length;
        dataView.setUint8(offSet, arrayLength);
        offSet++;
        for (let i = 0; i < arrayLength; i++) {
            let _obj = objArray[i];
            let _objLength = Buffer.wirteInnerObject(dataView, offSet, _obj);
            totalLength += _objLength;
        }
        return totalLength + 1;
    }
    /**
     * 把一个字符串 写入到 dv 中，并返回 长度 【2*length+1】
     * 每个字符占用2个字节
     * 第一个位 写入 字符串的长度
     * @param dataView
     * @param offset
     * @param str
     */
    static writeString(dataView, offset, str) {
        var length = str.length * 2; // 2个字节
        dataView.setUint8(offset, length); // 1 字节写入长度
        offset++;
        for (var i = 0; i < str.length; i++, offset += 2) {
            dataView.setUint16(offset, str.charCodeAt(i));
        }
        return length + 1;
    }
    /**
     * 写入字符串 数组
     */
    static writeStringArray(dataView, offset, strArray) {
        var totalLength = 0;
        var arrayLegth = strArray.length || 0;
        dataView.setUint8(offset, arrayLegth); // 1 字节写入长度
        offset++;
        for (let i = 0; i < arrayLegth; i++) {
            let str = strArray[i];
            let strLegth = Buffer.writeString(dataView, offset, str);
            totalLength += strLegth;
        }
        return totalLength + 1;
    }
    //#endregion
    //#region  length method  
    /**
     * 得到 object 对象 二进制 长度
     * @param obj
     */
    static GetObjectLength(obj) {
        var objectLength = 0;
        if (obj === null || obj === undefined) {
            return objectLength;
        }
        for (var key in obj) {
            var byteInfo = Reflect.getMetadata("ByteMember", obj, key);
            if (byteInfo === undefined)
                continue;
            var propertyLength = this.getPropertyLength(byteInfo.Type, obj[key]);
            objectLength += propertyLength;
        }
        return objectLength;
    }
    /**
     * 得到 属性 二进制 长度
     * @param type
     * @param value
     */
    static getPropertyLength(type, value) {
        switch (type) {
            case ByteType.Uint8:
                return 1;
            case ByteType.Int8:
                return 1;
            case ByteType.Uint16:
                return 2;
            case ByteType.Int16:
                return 2;
            case ByteType.Int32:
                return 4;
            case ByteType.Float32:
                return 4;
            case ByteType.Float64:
                return 8;
            case ByteType.Object:
                return Buffer.GetObjectLength(value);
            case ByteType.String:
                return Buffer.getStringLength(value);
            //数组  number 如果数组为空 则 需要一bit 做标志位 
            case ByteType.UInt8Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length;
                }
            case ByteType.Int8Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length;
                }
            case ByteType.Uint16Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 2;
                }
            case ByteType.Int16Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 2;
                }
            case ByteType.Int32Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 4;
                }
            case ByteType.Float32Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 4;
                }
            case ByteType.Float64Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 8;
                }
            case ByteType.ObjectArray:
                return Buffer.getObjectArrayLength(value);
            case ByteType.StringArray:
                return Buffer.getStringArrayLength(value);
        }
    }
    static getStringLength(str) {
        return str.length * 2 + 1; // 长度的 2 倍 ， 并用一位标识 长度
    }
    static getStringArrayLength(strArray) {
        var length = 0;
        for (var i = 0; i < strArray.length; i++) {
            length += Buffer.getStringLength(strArray[i]);
        }
        return length;
    }
    static getObjectArrayLength(objArray) {
        var length = 0;
        for (var i = 0; i < objArray.length; i++) {
            length += Buffer.GetObjectLength(objArray[i]);
        }
        return length;
    }
}
exports.Buffer = Buffer;
/**
 * ByteMember 属性修饰
 * @param order
 * @param type
 */
function ByteMember(order, type, fun = null) {
    return Reflect.metadata("ByteMember", new ByteInfo(order, type, fun));
}
exports.ByteMember = ByteMember;
/**
 * 类修饰
 * 需要序列化的类的 标识
 */
function BtyeContract(target) {
}
exports.BtyeContract = BtyeContract;
/**
 * 要写入的 byte 类型
 */
class ByteInfo {
    constructor(order, type, fun = null) {
        this.Order = order;
        this.Type = type;
        this.Function = fun;
    }
}
exports.ByteInfo = ByteInfo;
/**
 *Byte Type 枚举类型
 */
var ByteType;
(function (ByteType) {
    ByteType[ByteType["Int8"] = 1] = "Int8";
    ByteType[ByteType["Uint8"] = 2] = "Uint8";
    ByteType[ByteType["Int16"] = 3] = "Int16";
    ByteType[ByteType["Uint16"] = 4] = "Uint16";
    ByteType[ByteType["Int32"] = 5] = "Int32";
    ByteType[ByteType["Uint32"] = 6] = "Uint32";
    ByteType[ByteType["Float32"] = 7] = "Float32";
    ByteType[ByteType["Float64"] = 8] = "Float64";
    ByteType[ByteType["String"] = 9] = "String";
    ByteType[ByteType["Object"] = 10] = "Object";
    //数组
    ByteType[ByteType["Int8Array"] = 10] = "Int8Array";
    ByteType[ByteType["UInt8Array"] = 11] = "UInt8Array";
    ByteType[ByteType["Int16Array"] = 13] = "Int16Array";
    ByteType[ByteType["Uint16Array"] = 14] = "Uint16Array";
    ByteType[ByteType["Int32Array"] = 15] = "Int32Array";
    ByteType[ByteType["Uint32Array"] = 16] = "Uint32Array";
    ByteType[ByteType["Float32Array"] = 17] = "Float32Array";
    ByteType[ByteType["Float64Array"] = 18] = "Float64Array";
    ByteType[ByteType["StringArray"] = 19] = "StringArray";
    ByteType[ByteType["ObjectArray"] = 20] = "ObjectArray";
})(ByteType = exports.ByteType || (exports.ByteType = {}));
//# sourceMappingURL=ByteInfo.js.map
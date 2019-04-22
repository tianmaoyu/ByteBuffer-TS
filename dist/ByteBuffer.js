"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// /**
//  * 字符串编码类型
//  */
// enum CharacterEncodingType{
//     Unicode=1,// 一个字符 2个字节来存储
//     UTF8=2,// 一个字符 使用 1-3 个字节来存储  
// }
// /**
//  * 配置
//  */
// class Config{
//    /**
//     * 默认 1个字节 来存储 数组类型，和字符串类型，object 类型 的长度，一个字节存储 0-255
//     */
//    public static Array_Length_Max_Byte:number=1;
//    /**
//     * 默认 1个字节 来 存储 消息的 类别数，能存储 0-255个
//     */
//    public static Message_Type_Count_Max_Byte:number=1;
//    /**
//     * 默认 Unicode 字符的编码方式，目前只 实现了 Unicode，UTF8 
//     */
//    public static Character_Encoding_Type:CharacterEncodingType=CharacterEncodingType.Unicode;
// }
/**byte 类型
 * 要写入的
 */
class ByteInfo {
    constructor(propertyKey, order, type, fun = null) {
        this.PropertyKey = propertyKey;
        this.Order = order;
        this.Type = type;
        this.Function = fun;
    }
}
exports.ByteInfo = ByteInfo;
class Buffer {
    //#region read method
    /**
     * 从 buffer 中反射 出 一个 classType 实例
     * @param classType
     * @param buffer
     */
    static ReadObject(classType, buffer) {
        var offSet = 0;
        var object = new classType.prototype.constructor(); //也可以 new (<any>classType())
        var dataView = new DataView(buffer);
        var byteInfoArray = Buffer.ClassInfoMap.get(classType.name);
        for (let i = 0; i < byteInfoArray.length; i++) {
            let byteInfo = byteInfoArray[i];
            let byteLength = this.readProperty(dataView, offSet, byteInfo, object, byteInfo.PropertyKey);
            offSet += byteLength;
        }
        return object;
    }
    static readProperty(dataView, offSet, byteInfo, object, propertyKey) {
        var type = byteInfo.Type;
        switch (type) {
            case ByteType.Bool:
                object[propertyKey] = dataView.getInt8(offSet) == 1;
                return 1;
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
            case ByteType.BoolArray:
                return Buffer.readBoolArray(dataView, offSet, object, propertyKey);
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
        let objectBuffer = dataView.buffer.slice(offset, length + offset);
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
            let objectBuffer = dataView.buffer.slice(offset, length + offset);
            var obj = Buffer.ReadObject(byteInfo.Function, objectBuffer);
            arrayObject.push(obj);
            offset += length;
        }
        object[propertyKey] = arrayObject;
        return totalLength + 1;
    }
    //readBoolArray
    static readBoolArray(dataView, offset, object, propertyKey) {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length; i++, offset++) {
            array.push(dataView.getInt8(offset) == 1);
        }
        object[propertyKey] = array;
        return length + 1;
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
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++, offset += 2) {
            array.push(dataView.getUint16(offset));
        }
        object[propertyKey] = array;
        return lengthArray * 2 + 1;
    }
    static readInt16Array(dataView, offset, object, propertyKey) {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++, offset += 2) {
            array.push(dataView.getInt16(offset));
        }
        object[propertyKey] = array;
        return lengthArray * 2 + 1;
    }
    static readInt32Array(dataView, offset, object, propertyKey) {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++, offset += 4) {
            array.push(dataView.getInt32(offset));
        }
        object[propertyKey] = array;
        return lengthArray * 4 + 1;
    }
    static readFloat32Array(dataView, offset, object, propertyKey) {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++, offset += 4) {
            array.push(dataView.getFloat32(offset));
        }
        object[propertyKey] = array;
        return lengthArray * 4 + 1;
    }
    static readFloat64Array(dataView, offset, object, propertyKey) {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++, offset += 8) {
            array.push(dataView.getFloat64(offset));
        }
        object[propertyKey] = array;
        return lengthArray * 8 + 1;
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
        var byteInfoArray = Buffer.ClassInfoMap.get(obj.constructor.name);
        for (let i = 0; i < byteInfoArray.length; i++) {
            let byteInfo = byteInfoArray[i];
            let byteLength = this.writeProperty(dataView, offSet, byteInfo.Type, obj[byteInfo.PropertyKey]);
            offSet += byteLength;
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
            case ByteType.Bool:
                dataView.setInt8(offSet, value ? 1 : 0);
                return 1;
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
            case ByteType.BoolArray:
                return Buffer.writeBoolArray(dataView, offSet, value);
            case ByteType.UInt8Array:
                return Buffer.writeUint8Array(dataView, offSet, value);
            case ByteType.Int8Array:
                return Buffer.writeInt8Array(dataView, offSet, value);
            case ByteType.Uint16Array:
                return Buffer.writeUint16Array(dataView, offSet, value);
            case ByteType.Int16Array:
                return Buffer.writeInt16Array(dataView, offSet, value);
            case ByteType.Int32Array:
                return Buffer.writeInt32Array(dataView, offSet, value);
            case ByteType.Float32Array:
                return Buffer.writeFloat32Array(dataView, offSet, value);
            case ByteType.Float64Array:
                return Buffer.writeFloat64Array(dataView, offSet, value);
            case ByteType.ObjectArray:
                return Buffer.wirteInnerObjectArray(dataView, offSet, value);
            case ByteType.StringArray:
                return Buffer.writeStringArray(dataView, offSet, value);
        }
    }
    static writeBoolArray(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt8(offset, array[i] ? 1 : 0);
            offset++;
        }
        return arrayLength + 1;
    }
    static writeUint8Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setUint8(offset, array[i]);
            offset++;
        }
        return arrayLength + 1;
    }
    static writeInt8Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt8(offset, array[i]);
            offset++;
        }
        return arrayLength + 1;
    }
    static writeUint16Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setUint16(offset, array[i]);
            offset += 2;
        }
        return arrayLength * 2 + 1;
    }
    static writeInt16Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt16(offset, array[i]);
            offset += 2;
        }
        return arrayLength * 2 + 1;
    }
    static writeInt32Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt32(offset, array[i]);
            offset += 4;
        }
        return arrayLength * 4 + 1;
    }
    static writeFloat32Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setFloat32(offset, array[i]);
            offset += 4;
        }
        return arrayLength * 4 + 1;
    }
    static writeFloat64Array(dataView, offset, array = []) {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setFloat64(offset, array[i]);
            offset += 8;
        }
        return arrayLength * 8 + 1;
    }
    /**
     * 内部类
     * @param dataView
     * @param offSet
     * @param obj
     */
    static wirteInnerObject(dataView, offSet, obj) {
        var totalLength = Buffer.GetObjectByteLength(obj);
        dataView.setUint8(offSet, totalLength);
        offSet++;
        var byteInfoArray = Buffer.ClassInfoMap.get(obj.constructor.name);
        for (let i = 0; i < byteInfoArray.length; i++) {
            let byteInfo = byteInfoArray[i];
            let byteLength = Buffer.writeProperty(dataView, offSet, byteInfo.Type, obj[byteInfo.PropertyKey]);
            offSet += byteLength;
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
            offSet += _objLength;
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
    //#region length method
    /**
     * 得到 object 对象 二进制 长度
     * @param obj
     */
    static GetObjectByteLength(obj) {
        var objectLength = 0;
        if (obj === null || obj === undefined) {
            return objectLength;
        }
        var byteInfoArray = Buffer.ClassInfoMap.get(obj.constructor.name);
        for (let i = 0; i < byteInfoArray.length; i++) {
            let byteInfo = byteInfoArray[i];
            let byteLength = Buffer.getPropertyByteLength(byteInfo.Type, obj[byteInfo.PropertyKey]);
            objectLength += byteLength;
        }
        return objectLength;
    }
    /**
     * 得到 属性 二进制 长度
     * 如果是数组，
     * @param type
     * @param value
     */
    static getPropertyByteLength(type, value) {
        switch (type) {
            case ByteType.Bool:
                return 1;
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
                return Buffer.GetObjectByteLength(value);
            case ByteType.String:
                return Buffer.getStringByteLength(value);
            //数组  number 如果数组为空 则 需要一bit 做标志位 
            case ByteType.BoolArray:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length + 1;
                }
            case ByteType.UInt8Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length + 1;
                }
            case ByteType.Int8Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length + 1;
                }
            case ByteType.Uint16Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 2 + 1;
                }
            case ByteType.Int16Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 2 + 1;
                }
            case ByteType.Int32Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 4 + 1;
                }
            case ByteType.Float32Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 4 + 1;
                }
            case ByteType.Float64Array:
                {
                    if (value == null)
                        return 1;
                    let length = value.length;
                    return length == 0 ? 1 : length * 8 + 1;
                }
            case ByteType.ObjectArray:
                return Buffer.getObjectArrayByteLength(value);
            case ByteType.StringArray:
                return Buffer.getStringArrayByteLength(value);
        }
    }
    static getStringByteLength(str) {
        return str.length * 2 + 1; //
    }
    static getStringArrayByteLength(strArray) {
        var length = 0;
        for (var i = 0; i < strArray.length; i++) {
            length += Buffer.getStringByteLength(strArray[i]);
        }
        return length + 1;
    }
    static getObjectArrayByteLength(objArray) {
        var length = 0;
        for (var i = 0; i < objArray.length; i++) {
            length += Buffer.GetObjectByteLength(objArray[i]);
        }
        return length + 1;
    }
}
/**
 * 名称与构造器
 */
Buffer.ClassMap = new Map();
/**
 * 名称与属性
 */
Buffer.ClassInfoMap = new Map();
exports.Buffer = Buffer;
/**属性修饰
 * ByteMember
 * @param order
 * @param type
 */
function ByteMember(order, type, fun = null) {
    return function (target, propertyKey) {
        var byteInfo = new ByteInfo(propertyKey, order, type, fun);
        var byteInfoArray = Buffer.ClassInfoMap.get(target.constructor.name);
        if (!byteInfoArray) {
            byteInfoArray = Array();
            byteInfoArray.push(byteInfo);
            Buffer.ClassInfoMap.set(target.constructor.name, byteInfoArray);
        }
        else {
            byteInfoArray.push(byteInfo);
            byteInfoArray.sort((a, b) => a.Order - b.Order); //排序
        }
    };
}
exports.ByteMember = ByteMember;
/**类修饰
 * 需要序列化的类的 标识
 */
function BtyeContract(target) {
    Buffer.ClassMap.set(target.name, target);
}
exports.BtyeContract = BtyeContract;
/**枚举类型
 *Byte Type
 */
var ByteType;
(function (ByteType) {
    ByteType[ByteType["Bool"] = 0] = "Bool";
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
    ByteType[ByteType["BoolArray"] = 19] = "BoolArray";
    ByteType[ByteType["Int8Array"] = 20] = "Int8Array";
    ByteType[ByteType["UInt8Array"] = 21] = "UInt8Array";
    ByteType[ByteType["Int16Array"] = 23] = "Int16Array";
    ByteType[ByteType["Uint16Array"] = 24] = "Uint16Array";
    ByteType[ByteType["Int32Array"] = 25] = "Int32Array";
    ByteType[ByteType["Uint32Array"] = 26] = "Uint32Array";
    ByteType[ByteType["Float32Array"] = 27] = "Float32Array";
    ByteType[ByteType["Float64Array"] = 28] = "Float64Array";
    ByteType[ByteType["StringArray"] = 29] = "StringArray";
    ByteType[ByteType["ObjectArray"] = 30] = "ObjectArray";
})(ByteType = exports.ByteType || (exports.ByteType = {}));
//# sourceMappingURL=ByteBuffer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map = {};
var Buffer = /** @class */ (function () {
    function Buffer() {
    }
    // public static Wirte(object: Object, buffer: ArrayBuffer, offSet: number, length: number) {
    //     for (var key in object) {
    //         if (typeof key == "string" || typeof key == "number" || typeof key == "boolean") {
    //             var byteInfo = <ByteInfo>Reflect.getMetadata("ByteMember", object, key);
    //             return byteInfo;
    //             var dv = new DataView(buffer);
    //         }
    //     }
    //     return true;
    // }
    Buffer.Wirte = function (object, buffer, offSet, length) {
        if (object == null)
            return;
        for (var key in object) {
            if (typeof key == "string" || typeof key == "number" || typeof key == "boolean") {
                var byteInfo = Reflect.getMetadata("ByteMember", object, key);
                return byteInfo;
                var dv = new DataView(buffer);
            }
        }
        return true;
    };
    Buffer.Read = function (object, buffer, offSet, length) {
        for (var key in object) {
            if (typeof key == "string" || typeof key == "number" || typeof key == "boolean") {
                var byteInfo = Reflect.getMetadata("ByteMember", object, key);
            }
        }
        return true;
    };
    /**
     * 得到 object 对象 二进制 长度
     * @param obj
     */
    Buffer.GetObjectLength = function (obj) {
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
    };
    /**
     * 得到 属性 二进制 长度
     * @param type
     * @param value
     */
    Buffer.getPropertyLength = function (type, value) {
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
                return Buffer.getObjectArrayLength(value);
            case ByteType.StringArray:
                return Buffer.getStringArrayLength(value);
        }
    };
    Buffer.getStringLength = function (str) {
        return str.length * 2 + 1; // 长度的 2 倍 ， 并用一位标识 长度
    };
    Buffer.getStringArrayLength = function (strArray) {
        var length = 0;
        for (var i = 0; i < strArray.length; i++) {
            length += this.getStringLength(strArray[i]);
        }
        return length;
    };
    Buffer.getObjectArrayLength = function (objArray) {
        var length = 0;
        for (var i = 0; i < objArray.length; i++) {
            length += this.GetObjectLength(objArray[i]);
        }
        return length;
    };
    return Buffer;
}());
exports.Buffer = Buffer;
/**
 * ByteMember 装饰器
 * @param order
 * @param type
 */
function ByteMember(order, type) {
    return Reflect.metadata("ByteMember", new ByteInfo(order, type));
}
exports.ByteMember = ByteMember;
/**
 * 要写入的 byte 类型
 */
var ByteInfo = /** @class */ (function () {
    function ByteInfo(order, type) {
        this.Order = order;
        this.Type = type;
    }
    return ByteInfo;
}());
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
// export interface IByteOptions {
//     Order: number;
//     Type: ByteType;
// }
// export class ByteWrite {
//     public static Valid(object: Object) {
//         for (var key in object) {
//             if (typeof key == "string" || typeof key == "number" || typeof key == "boolean") {
//                 var validate = <Validation>Reflect.getMetadata("ByteMember", object, key);
//                 if (validate !== undefined) {
//                     if (validate.Validate(object[key]) == false)
//                         return false;
//                 }
//             }
//         }
//         return true;
//     }
// }
// export interface IByteOptions {
//     Order: number;
//     Type: ByteType;
//     Number?: INumberOptions;
//     String?: IStringOptions;
// }
// export interface IStringOptions {
//     MinLength?: number;
//     MaxLength?: number;
// }
// export interface INumberOptions {
//     Min?: number;
//     Max?: number;
// }
// export interface ITimeValidationOptions {
//     Format: string;
//     Locale?: string;
// }
// export class Validation {
//     private static _validationRules: any = {
//         Number: (value: number, options: INumberOptions) => {
//             if (typeof value !== "number")
//                 return false;
//             if (options.Max !== undefined && options.Min !== undefined)
//                 return value < options.Max && value > options.Min;
//             return (options.Max !== undefined && value < options.Max) ||
//                 (options.Min !== undefined && value > options.Min);
//         },
//         String: (value: string, options: IStringOptions) => {
//             if (typeof value !== "string")
//                 return false;
//             if (options.MaxLength !== undefined && options.MinLength !== undefined)
//                 return value.length < options.MaxLength && value.length > options.MinLength;
//             return (options.MaxLength !== undefined && value.length < options.MaxLength) ||
//                 (options.MinLength !== undefined && value.length > options.MinLength);
//         },
//     };
//     constructor(private _options: IByteOptions) {
//     }
//     Validate(value: any): boolean {
//         for (var key in this._options) {
//             if (Validation._validationRules[key](value, this._options[key]) === false) {
//                 return false;
//             }
//         }
//         return true;
//     }
// }
//# sourceMappingURL=ByteInfo.js.map
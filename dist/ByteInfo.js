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
    Buffer.GetObjectLength = function (obj) {
        var object_buffer_Length = 0;
        for (var key in obj) {
            var byteInfo = Reflect.getMetadata("ByteMember", obj, key);
            if (byteInfo === undefined)
                continue;
            var value_length = this.getLength(byteInfo.Type, obj[key]);
            object_buffer_Length += value_length;
        }
        return object_buffer_Length;
    };
    Buffer.getLength = function (type, value) {
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
        }
    };
    Buffer.getStringLength = function (str) {
        return str.length * 2 + 1;
    };
    return Buffer;
}());
exports.Buffer = Buffer;
function ByteMember(order, type) {
    return Reflect.metadata("ByteMember", new ByteInfo(order, type));
}
exports.ByteMember = ByteMember;
var ByteInfo = /** @class */ (function () {
    function ByteInfo(order, type) {
        this.Order = order;
        this.Type = type;
    }
    return ByteInfo;
}());
exports.ByteInfo = ByteInfo;
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
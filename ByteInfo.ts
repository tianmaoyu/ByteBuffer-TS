import { Msg } from "./Msg";


const Map: { [key: string]: number; } = {};

export class Buffer {

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
    public static Wirte(object: Object, buffer?: ArrayBuffer | null, offSet?: number | null, length?: number | null) {

        if (object == null) return;

        for (var key in object) {
            if (typeof key == "string" || typeof key == "number" || typeof key == "boolean") {
                var byteInfo = <ByteInfo>Reflect.getMetadata("ByteMember", object, key);
                return byteInfo;
                var dv = new DataView(buffer);

            }
        }
        return true;
    }

    public static Read(object: Object, buffer: ArrayBuffer, offSet: number, length: number) {
        for (var key in object) {
            if (typeof key == "string" || typeof key == "number" || typeof key == "boolean") {
                var byteInfo = <ByteInfo>Reflect.getMetadata("ByteMember", object, key);

            }
        }
        return true;
    }



    /**
     * 得到 object 对象 二进制 长度
     * @param obj 
     */
    public static GetObjectLength(obj: Object) {
        var objectLength = 0;
        if (obj === null || obj === undefined) {
            return objectLength;
        }
        for (var key in obj) {
            var byteInfo = <ByteInfo>Reflect.getMetadata("ByteMember", obj, key);
            if (byteInfo === undefined) continue;
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
    private static getPropertyLength(type: ByteType, value: string | object | []): number {
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
                return Buffer.GetObjectLength(value as object)
            case ByteType.String:
                return Buffer.getStringLength(value as string);

            //数组
            case ByteType.UInt8Array:
                return 1 * (value as Array<number>).length;
            case ByteType.Int8Array:
                return 1 * (value as Array<number>).length;
            case ByteType.Uint16Array:
                return 2 * (value as Array<number>).length;
            case ByteType.Int16Array:
                return 2 * (value as Array<number>).length;
            case ByteType.Int32Array:
                return 4 * (value as Array<number>).length;
            case ByteType.Float32Array:
                return 4 * (value as Array<number>).length;
            case ByteType.Float64Array:
                return 8 * (value as Array<number>).length;

            case ByteType.ObjectArray:
                return Buffer.getObjectArrayLength(value as Array<object>)
            case ByteType.StringArray:
                return Buffer.getStringArrayLength(value as Array<string>)
        }

    }

    private static getStringLength(str: string): number {
        return str.length * 2 + 1;// 长度的 2 倍 ， 并用一位标识 长度
    }

    private static getStringArrayLength(strArray: Array<string>): number {
        var length = 0
        for (var i = 0; i < strArray.length; i++) {
            length += this.getStringLength(strArray[i]);
        }
        return length;
    }

    private static getObjectArrayLength(objArray: Array<object>) {
        var length = 0;
        for (var i = 0; i < objArray.length; i++) {
            length += this.GetObjectLength(objArray[i]);
        }
        return length;
    }

}

/**
 * ByteMember 装饰器
 * @param order 
 * @param type 
 */
export function ByteMember(order: number, type: ByteType) {
    return Reflect.metadata("ByteMember", new ByteInfo(order, type));
}

/**
 * 要写入的 byte 类型
 */
export class ByteInfo {
    public Order: number;
    public Type: ByteType;
    constructor(order: number, type: ByteType) {
        this.Order = order;
        this.Type = type;
    }
}

/**
 *Byte Type 枚举类型
 */
export enum ByteType {
    Int8 = 1,
    Uint8 = 2,
    Int16 = 3,
    Uint16 = 4,
    Int32 = 5,
    Uint32 = 6,
    Float32 = 7,
    Float64 = 8,
    String = 9,
    Object = 10,

    //数组
    Int8Array = 10,
    UInt8Array = 11,
    Int16Array = 13,
    Uint16Array = 14,
    Int32Array = 15,
    Uint32Array = 16,
    Float32Array = 17,
    Float64Array = 18,
    StringArray = 19,
    ObjectArray = 20,
}


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
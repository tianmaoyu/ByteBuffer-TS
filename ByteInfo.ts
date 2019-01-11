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



    public static GetObjectLength(obj: Object) {
        var object_buffer_Length = 0;

        for (var key in obj) {
            var byteInfo = <ByteInfo>Reflect.getMetadata("ByteMember", obj, key);
            if (byteInfo === undefined) continue;
            var value_length = this.getLength(byteInfo.Type, obj[key]);
            object_buffer_Length += value_length;


        }
        return object_buffer_Length;
    }




    public static getLength(type: ByteType, value: string | object): number {
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
                return Buffer.getStringLength(value as string)

        }

    }
    public static getStringLength(str: string): number {
        return str.length * 2 + 1;
    }


}


export function ByteMember(order: number, type: ByteType) {
    return Reflect.metadata("ByteMember", new ByteInfo(order, type));
}

export class ByteInfo {
    public Order: number;
    public Type: ByteType;
    constructor(order: number, type: ByteType) {
        this.Order = order;
        this.Type = type;
    }
}

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
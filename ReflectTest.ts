

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
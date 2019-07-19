import "reflect-metadata";
import { Int24 } from "./Int24";
import { UInt24 } from "./UInt24";

/**
 * 字符串编码类型
 */
enum StringEncodingType {
    /**
     * 一个字符 2个字节来存储,
     * 也叫 Unicode, 
     */
    UTF16 = 1,
    /**
     * 一个字符 使用 1-4 个字节来存储  
     */
    UTF8 = 2,
}


/**
 * 配置
 */
export class BufferConfig {
    /**
     * 是否小端模式，java  默认大端，javascript 默认大端，c# ，c++默认小端
     */
    public static IsLittleEndian: boolean = true;
    /**
     * 默认 utf16(Unicode) 字符的编码方式，目前只 实现了utf16(Unicode)，UTF8 
     */
    public static StringEncodingType: StringEncodingType = StringEncodingType.UTF16;

}


/**byte 类型
 * 要写入的 
 */
export class ByteInfo {
    public Order: number;
    public Type: ByteType;
    public Function: Function;
    public PropertyKey: string;
    constructor(propertyKey: string, order: number, type: ByteType, fun: Function = null) {
        this.PropertyKey = propertyKey;
        this.Order = order;
        this.Type = type;
        this.Function = fun;
    }
}

export class Buffer {

    /**
     * 名称与构造器
     */
    public static ClassMap = new Map<string, Function>();

    /**
     * 名称与属性
     */
    public static ClassInfoMap = new Map<string, Array<ByteInfo>>();

    //#region read method
    /**
     * 从 buffer 中反射 出 一个 classType 实例
     * @param classType 
     * @param buffer 
     */
    public static ReadObject<T>(classType: Function, buffer: ArrayBuffer): T {
        var offSet = 0;
        var object = new classType.prototype.constructor();//也可以 new (<any>classType())
        var dataView = new DataView(buffer);
        var byteInfoArray = Buffer.ClassInfoMap.get(classType.name);
        for (let i = 0; i < byteInfoArray.length; i++) {
            let byteInfo = byteInfoArray[i];
            let byteLength = this.readProperty(dataView, offSet, byteInfo, object, byteInfo.PropertyKey);
            offSet += byteLength;
        }
        return object;
    }


    private static readProperty(dataView: DataView, offSet: number, byteInfo: ByteInfo, object: Object, propertyKey: string): number {
        var type = byteInfo.Type;
        switch (type) {
            case ByteType.Bool:
                object[propertyKey] = dataView.getInt8(offSet) == 1;
                return 1;
            case ByteType.UInt8:
                object[propertyKey] = dataView.getUint8(offSet);
                return 1;
            case ByteType.Int8:
                object[propertyKey] = dataView.getInt8(offSet);
                return 1;
            case ByteType.UInt16:
                object[propertyKey] = dataView.getUint16(offSet, true);
                return 2;
            case ByteType.Int16:
                object[propertyKey] = dataView.getInt16(offSet, true);
                return 2;
            case ByteType.Int32:
                object[propertyKey] = dataView.getInt32(offSet, true);
                return 4;
            case ByteType.Float32:
                object[propertyKey] = dataView.getFloat32(offSet, true);
                return 4;
            case ByteType.Float64:
                object[propertyKey] = dataView.getFloat64(offSet, true);
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
            case ByteType.UInt16Array:
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

            //新增的 int24
            case ByteType.Int24:
                object[propertyKey] = Int24.read(dataView, offSet, BufferConfig.IsLittleEndian);
                return 3;
            case ByteType.UInt24:
                object[propertyKey] = UInt24.read(dataView, offSet, BufferConfig.IsLittleEndian);
                return 3;
            case ByteType.Int24Array:
                return Buffer.readInt24Array(dataView, offSet, object, propertyKey);
            case ByteType.UInt24Array:
                return Buffer.readUInt24Array(dataView, offSet, object, propertyKey);
            default:
                throw new TypeError("没有这种类型")
        }

    }

    private static readInt24Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var arrayLength = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < arrayLength; i++ , offset += 3) {
            array.push(Int24.read(dataView, offset, BufferConfig.IsLittleEndian));
        }
        object[propertyKey] = array;
        return arrayLength * 3 + 1;
    }

    private static readUInt24Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var arrayLength = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < arrayLength; i++ , offset += 3) {
            array.push(UInt24.read(dataView, offset, BufferConfig.IsLittleEndian));
        }
        object[propertyKey] = array;
        return arrayLength * 3 + 1;
    }

    private static readInnerObject(dataView: DataView, offset: number, object: Object, propertyKey: string, byteInfo: ByteInfo): number {
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


    private static readInnerObjectArray(dataView: DataView, offset: number, object: Object, propertyKey: string, byteInfo: ByteInfo): number {
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
    private static readBoolArray(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length; i++ , offset++) {
            array.push(dataView.getInt8(offset) == 1);
        }
        object[propertyKey] = array;
        return length + 1;
    }
    private static readUint8Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length; i++ , offset++) {
            array.push(dataView.getUint8(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }

    private static readInt8Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var length = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < length; i++ , offset++) {
            array.push(dataView.getInt8(offset));
        }
        object[propertyKey] = array;
        return length + 1;
    }

    private static readUint16Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++ , offset += 2) {
            array.push(dataView.getUint16(offset, true));
        }
        object[propertyKey] = array;
        return lengthArray * 2 + 1;
    }

    private static readInt16Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++ , offset += 2) {
            array.push(dataView.getInt16(offset, true));
        }
        object[propertyKey] = array;
        return lengthArray * 2 + 1;
    }

    private static readInt32Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++ , offset += 4) {
            array.push(dataView.getInt32(offset, true));
        }
        object[propertyKey] = array;
        return lengthArray * 4 + 1;
    }

    private static readFloat32Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++ , offset += 4) {
            array.push(dataView.getFloat32(offset, true));
        }
        object[propertyKey] = array;
        return lengthArray * 4 + 1;
    }

    private static readFloat64Array(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var lengthArray = dataView.getUint8(offset);
        offset += 1;
        var array = [];
        for (var i = 0; i < lengthArray; i++ , offset += 8) {
            array.push(dataView.getFloat64(offset, true));
        }
        object[propertyKey] = array;
        return lengthArray * 8 + 1;
    }


    private static readStringArray(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var totalLength = 0;//数组所占的长度
        var arraryLength = dataView.getUint8(offset);
        offset += 1;
        var arrar = [];
        for (let j = 0; j < arraryLength; j++) {
            var length = dataView.getUint8(offset);
            offset += 1;
            var chars = [];
            for (var i = 0; i < length / 2; i++ , offset += 2) {
                chars.push(dataView.getUint16(offset, true));
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
    private static readString(dataView: DataView, offset: number, object: Object, propertyKey: string): number {
        var length = dataView.getUint8(offset);
        offset += 1;
        var chars = [];
        for (var i = 0; i < length / 2; i++ , offset += 2) {
            chars.push(dataView.getUint16(offset, true));
        }
        var str = String.fromCharCode.apply(null, chars);
        object[propertyKey] = str;
        return length + 1;
    }

    //#endregion

    //#region write method
    public static WirteObject(obj: Object) {
        var offSet = 0;
        var cacheBuffer = new ArrayBuffer(128);
        var dataView = new DataView(cacheBuffer);
        var byteInfoArray = Buffer.ClassInfoMap.get(obj.constructor.name);
        for (let i = 0; i < byteInfoArray.length; i++) {
            let byteInfo = byteInfoArray[i];
            let byteLength = this.writeProperty(dataView, offSet, byteInfo.Type, obj[byteInfo.PropertyKey]);
            offSet += byteLength;
        }
        var buffer = cacheBuffer.slice(0, offSet);
        return buffer;
    }


    /**
    * 把属性 Property 写入 二进制，并返回写入了的长度
    * @param type 
    * @param value 
    */
    private static writeProperty(dataView: DataView, offSet: number, type: ByteType, value: any): number {
        switch (type) {
            case ByteType.Bool:
                dataView.setInt8(offSet, (value as Boolean) ? 1 : 0)
                return 1;
            case ByteType.UInt8:
                dataView.setUint8(offSet, value as number)
                return 1;
            case ByteType.Int8:
                dataView.setInt8(offSet, value as number)
                return 1;
            case ByteType.UInt16:
                dataView.setUint16(offSet, value as number, true)
                return 2;
            case ByteType.Int16:
                dataView.setInt16(offSet, value as number, true)
                return 2;
            case ByteType.Int32:
                dataView.setInt32(offSet, value as number, true)
                return 4;
            case ByteType.Float32:
                dataView.setFloat32(offSet, value as number, true)
                return 4;
            case ByteType.Float64:
                dataView.setFloat64(offSet, value as number, true)
                return 8;
            case ByteType.Object:
                return Buffer.wirteInnerObject(dataView, offSet, value as object)
            case ByteType.String:
                return Buffer.writeString(dataView, offSet, value as string);

            //数组
            case ByteType.BoolArray:
                return Buffer.writeBoolArray(dataView, offSet, value as Array<Boolean>);
            case ByteType.UInt8Array:
                return Buffer.writeUint8Array(dataView, offSet, value as Array<number>);
            case ByteType.Int8Array:
                return Buffer.writeInt8Array(dataView, offSet, value as Array<number>);
            case ByteType.UInt16Array:
                return Buffer.writeUint16Array(dataView, offSet, value as Array<number>);
            case ByteType.Int16Array:
                return Buffer.writeInt16Array(dataView, offSet, value as Array<number>);
            case ByteType.Int32Array:
                return Buffer.writeInt32Array(dataView, offSet, value as Array<number>);
            case ByteType.Float32Array:
                return Buffer.writeFloat32Array(dataView, offSet, value as Array<number>);
            case ByteType.Float64Array:
                return Buffer.writeFloat64Array(dataView, offSet, value as Array<number>);
            case ByteType.ObjectArray:
                return Buffer.wirteInnerObjectArray(dataView, offSet, value as Array<object>);
            case ByteType.StringArray:
                return Buffer.writeStringArray(dataView, offSet, value as Array<string>);

            //新增的 int24
            case ByteType.Int24:
                Int24.write(dataView, offSet, value, BufferConfig.IsLittleEndian)
                return 3;
            case ByteType.UInt24:
                UInt24.write(dataView, offSet, value, BufferConfig.IsLittleEndian)
                return 3;
            case ByteType.Int24Array:
                return Buffer.writeInt24Array(dataView, offSet, value as Array<number>);
            case ByteType.UInt24Array:
                return Buffer.writeUInt24Array(dataView, offSet, value as Array<number>);
            default:
                throw new TypeError("没有这种类型")
        }

    }

    private static writeInt24Array(dataView: DataView, offSet: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offSet, arrayLength);
        offSet++;
        for (var i = 0; i < arrayLength; i++) {
            Int24.write(dataView, offSet, array[i], BufferConfig.IsLittleEndian)
            offSet += 3;
        }
        return arrayLength * 3 + 1;
    }

    private static writeUInt24Array(dataView: DataView, offSet: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offSet, arrayLength);
        offSet++;
        for (var i = 0; i < arrayLength; i++) {
            UInt24.write(dataView, offSet, array[i], BufferConfig.IsLittleEndian)
            offSet += 3;
        }
        return arrayLength * 3 + 1;
    }



    private static writeBoolArray(dataView: DataView, offset: number, array: Array<Boolean> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt8(offset, array[i] ? 1 : 0);
            offset++;
        }
        return arrayLength + 1;
    }

    private static writeUint8Array(dataView: DataView, offset: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setUint8(offset, array[i]);
            offset++;
        }
        return arrayLength + 1;
    }

    private static writeInt8Array(dataView: DataView, offset: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt8(offset, array[i]);
            offset++;
        }
        return arrayLength + 1;
    }

    private static writeUint16Array(dataView: DataView, offset: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setUint16(offset, array[i], true);
            offset += 2;
        }
        return arrayLength * 2 + 1;
    }

    private static writeInt16Array(dataView: DataView, offset: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt16(offset, array[i], true);
            offset += 2;
        }
        return arrayLength * 2 + 1;
    }

    private static writeInt32Array(dataView: DataView, offset: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setInt32(offset, array[i], true);
            offset += 4;
        }
        return arrayLength * 4 + 1;
    }

    private static writeFloat32Array(dataView: DataView, offset: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setFloat32(offset, array[i], true);
            offset += 4;
        }
        return arrayLength * 4 + 1;
    }

    private static writeFloat64Array(dataView: DataView, offset: number, array: Array<number> = []): number {
        var arrayLength = array.length;
        dataView.setUint8(offset, arrayLength);
        offset++;
        for (var i = 0; i < arrayLength; i++) {
            dataView.setFloat64(offset, array[i], true);
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
    private static wirteInnerObject(dataView: DataView, offSet: number, obj: Object): number {
        var totalLength = Buffer.GetObjectByteLength(obj);
        dataView.setUint8(offSet, totalLength)
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
    private static wirteInnerObjectArray(dataView: DataView, offSet: number, objArray: Object[]) {
        var totalLength = 0;
        var arrayLength = objArray.length;
        dataView.setUint8(offSet, arrayLength)
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
    private static writeString(dataView: DataView, offset: number, str: string): number {
        var length = str.length * 2;      // 2个字节
        dataView.setUint8(offset, length);// 1 字节写入长度
        offset++;
        for (var i = 0; i < str.length; i++ , offset += 2) {
            dataView.setUint16(offset, str.charCodeAt(i), true);
        }
        return length + 1;
    }

    /**
     * 写入字符串 数组
     */
    private static writeStringArray(dataView: DataView, offset: number, strArray: string[]): number {
        var totalLength = 0;
        var arrayLegth = strArray.length || 0;
        dataView.setUint8(offset, arrayLegth);// 1 字节写入长度
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
    public static GetObjectByteLength(obj: Object) {
        var objectLength = 0;
        if (obj === undefined || obj === null) {
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
     * 得到 属性 二进制 长度,基础类型是占多少长度就多少长度
     * 如果是数组，为空或者 长度为0 使用一个字节标识
     * @param type 
     * @param value 
     */
    private static getPropertyByteLength(type: ByteType, value: string | object | []): number {
        switch (type) {
            case ByteType.Bool:
                return 1;
            case ByteType.UInt8:
                return 1;
            case ByteType.Int8:
                return 1;
            case ByteType.UInt16:
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
                return Buffer.GetObjectByteLength(value as object)
            case ByteType.String:
                return Buffer.getStringByteLength(value as string);

            //数组  number 如果数组为空 则 需要一bit 做标志位 
            case ByteType.BoolArray:
                {
                    if (value == null) return 1;
                    let length = (value as Array<Boolean>).length;
                    return length + 1;
                }
            case ByteType.UInt8Array:
            case ByteType.Int8Array:
                {
                    if (value == null) return 1;
                    let length = (value as Array<number>).length;
                    return length + 1;
                }
            case ByteType.UInt16Array:
            case ByteType.Int16Array:
                {
                    if (value == null) return 1;
                    let length = (value as Array<number>).length;
                    return length * 2 + 1;
                }
            case ByteType.Int32Array:
            case ByteType.Float32Array:
                {
                    if (value == null) return 1;
                    let length = (value as Array<number>).length;
                    return length * 4 + 1;
                }
            case ByteType.Float64Array:
                {
                    if (value == null) return 1;
                    let length = (value as Array<number>).length;
                    return length * 8 + 1;
                }
            case ByteType.ObjectArray:
                return Buffer.getObjectArrayByteLength(value as Array<object>);
            case ByteType.StringArray:
                return Buffer.getStringArrayByteLength(value as Array<string>);
            //INT24
            case ByteType.Int24:
            case ByteType.UInt24:
                return 3;
            case ByteType.Int24Array:
            case ByteType.UInt24Array:
                {
                    if (value == null) return 1;
                    let length = (value as Array<number>).length;
                    return length * 3 + 1;
                }
            default:
                throw new TypeError("没有这种类型")
        }

    }

    private static getStringByteLength(str: string = ""): number {
        return str.length * 2 + 1;//
    }

    private static getStringArrayByteLength(strArray: Array<string> = []): number {
        var length = 0
        for (var i = 0; i < strArray.length; i++) {
            length += Buffer.getStringByteLength(strArray[i]);
        }
        return length + 1;
    }

    private static getObjectArrayByteLength(objArray: Array<object> = []) {
        var length = 0;
        for (var i = 0; i < objArray.length; i++) {
            length += Buffer.GetObjectByteLength(objArray[i]);
        }
        return length + 1;
    }
    //#endregion

}

/**属性修饰
 * ByteMember 
 * @param order 
 * @param type 
 */
export function ByteMember(order: number, type: ByteType, fun: Function = null) {
    return function (target: any, propertyKey: string) {
        var byteInfo = new ByteInfo(propertyKey, order, type, fun)
        var byteInfoArray = Buffer.ClassInfoMap.get(target.constructor.name);
        if (!byteInfoArray) {
            byteInfoArray = Array<ByteInfo>();
            byteInfoArray.push(byteInfo);
            Buffer.ClassInfoMap.set(target.constructor.name, byteInfoArray);
        } else {
            byteInfoArray.push(byteInfo);
            byteInfoArray.sort((a, b) => a.Order - b.Order)//排序
        }
    }

}

/**类修饰
 * 需要序列化的类的 标识
 */
export function BtyeContract(target: any) {
    Buffer.ClassMap.set(target.name, target);
}


/**枚举类型
 *Byte Type 
 */
export enum ByteType {
    Bool = 0,
    Int8 = 1,
    UInt8 = 2,
    Int16 = 3,
    UInt16 = 4,
    Int32 = 5,
    UInt32 = 6,
    Float32 = 7,
    Float64 = 8,
    String = 9,
    Object = 10,

    //数组
    BoolArray = 19,
    Int8Array = 20,
    UInt8Array = 21,
    Int16Array = 23,
    UInt16Array = 24,
    Int32Array = 25,
    UInt32Array = 26,
    Float32Array = 27,
    Float64Array = 28,
    StringArray = 29,
    ObjectArray = 30,

    //新增int24
    Int24 = 31,
    UInt24 = 32,
    Int24Array = 33,
    UInt24Array = 34,
}




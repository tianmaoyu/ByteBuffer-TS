(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// /**
//  * 瀛楃涓茬紪鐮佺被鍨?
//  */
// enum CharacterEncodingType{
//     Unicode=1,// 涓€涓瓧绗?2涓瓧鑺傛潵瀛樺偍
//     UTF8=2,// 涓€涓瓧绗?浣跨敤 1-3 涓瓧鑺傛潵瀛樺偍  
// }
// /**
//  * 閰嶇疆
//  */
// class Config{
//    /**
//     * 榛樿 1涓瓧鑺?鏉ュ瓨鍌?鏁扮粍绫诲瀷锛屽拰瀛楃涓茬被鍨嬶紝object 绫诲瀷 鐨勯暱搴︼紝涓€涓瓧鑺傚瓨鍌?0-255
//     */
//    public static Array_Length_Max_Byte:number=1;
//    /**
//     * 榛樿 1涓瓧鑺?鏉?瀛樺偍 娑堟伅鐨?绫诲埆鏁帮紝鑳藉瓨鍌?0-255涓?
//     */
//    public static Message_Type_Count_Max_Byte:number=1;
//    /**
//     * 榛樿 Unicode 瀛楃鐨勭紪鐮佹柟寮忥紝鐩墠鍙?瀹炵幇浜?Unicode锛孶TF8 
//     */
//    public static Character_Encoding_Type:CharacterEncodingType=CharacterEncodingType.Unicode;
// }
/**byte 绫诲瀷
 * 瑕佸啓鍏ョ殑
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
     * 浠?buffer 涓弽灏?鍑?涓€涓?classType 瀹炰緥
     * @param classType
     * @param buffer
     */
    static ReadObject(classType, buffer) {
        var offSet = 0;
        var object = new classType.prototype.constructor(); //涔熷彲浠?new (<any>classType())
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
        var totalLength = 0; //鏁扮粍鎵€鍗犵殑闀垮害
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
      * 浠巄uf 涓鍙?string
      * @param buf
      * @param offset 寮€濮?
      * @param length 闀垮害
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
    * 鎶婂睘鎬?Property 鍐欏叆 浜岃繘鍒讹紝骞惰繑鍥炲啓鍏ヤ簡鐨勯暱搴?
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
            //鏁扮粍
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
     * 鍐呴儴绫?
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
     * 鍐呴儴绫?array
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
     * 鎶婁竴涓瓧绗︿覆 鍐欏叆鍒?dv 涓紝骞惰繑鍥?闀垮害 銆?*length+1銆?
     * 姣忎釜瀛楃鍗犵敤2涓瓧鑺?
     * 绗竴涓綅 鍐欏叆 瀛楃涓茬殑闀垮害
     * @param dataView
     * @param offset
     * @param str
     */
    static writeString(dataView, offset, str) {
        var length = str.length * 2; // 2涓瓧鑺?
        dataView.setUint8(offset, length); // 1 瀛楄妭鍐欏叆闀垮害
        offset++;
        for (var i = 0; i < str.length; i++, offset += 2) {
            dataView.setUint16(offset, str.charCodeAt(i));
        }
        return length + 1;
    }
    /**
     * 鍐欏叆瀛楃涓?鏁扮粍
     */
    static writeStringArray(dataView, offset, strArray) {
        var totalLength = 0;
        var arrayLegth = strArray.length || 0;
        dataView.setUint8(offset, arrayLegth); // 1 瀛楄妭鍐欏叆闀垮害
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
     * 寰楀埌 object 瀵硅薄 浜岃繘鍒?闀垮害
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
     * 寰楀埌 灞炴€?浜岃繘鍒?闀垮害
     * 濡傛灉鏄暟缁勶紝
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
            //鏁扮粍  number 濡傛灉鏁扮粍涓虹┖ 鍒?闇€瑕佷竴bit 鍋氭爣蹇椾綅 
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
 * 鍚嶇О涓庢瀯閫犲櫒
 */
Buffer.ClassMap = new Map();
/**
 * 鍚嶇О涓庡睘鎬?
 */
Buffer.ClassInfoMap = new Map();
exports.Buffer = Buffer;
/**灞炴€т慨楗?
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
            byteInfoArray.sort((a, b) => a.Order - b.Order); //鎺掑簭
        }
    };
}
exports.ByteMember = ByteMember;
/**绫讳慨楗?
 * 闇€瑕佸簭鍒楀寲鐨勭被鐨?鏍囪瘑
 */
function BtyeContract(target) {
    Buffer.ClassMap.set(target.name, target);
}
exports.BtyeContract = BtyeContract;
/**鏋氫妇绫诲瀷
 *Byte Type
 */
var ByteType;
(function (ByteType) {
    ByteType[ByteType["Bool"] = 11] = "Bool";
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
    //鏁扮粍
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

},{"reflect-metadata":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Massage_1 = require("./Massage");
const ByteBuffer_1 = require("./ByteBuffer");
var msg = new Massage_1.Msg(); //sss
msg.MessageType = Massage_1.MessageType.join;
msg.Address = "田茂";
msg.Bool = false;
msg.Name = "eric";
msg.Id = 1000;
var user = new Massage_1.User();
user.Id = 1;
user.Name = "user";
user.IdList = [1, 2, 3, 4, 5];
msg.User = user;
var user2 = new Massage_1.User();
user2.Id = 2;
user2.Name = "use1";
msg.UserList = [];
msg.UserList.push(user2);
msg.UserList.push(user);
msg.BoolList = [true, false, true, false];
msg.IsVip = true;
msg.IdList = [1, 2, 3, 4];
msg.IdList2 = [1, 2, 3, 4];
var buffer = ByteBuffer_1.Buffer.WirteObject(msg);
console.info(buffer.byteLength);
console.info(JSON.stringify(msg).length);
var msg1 = ByteBuffer_1.Buffer.ReadObject(Massage_1.Msg, buffer);
console.info(msg1);
var time1_1 = new Date().getTime();
for (let i = 0; i < 100000; i++) {
    let jsonStr = JSON.stringify(msg);
    let obj = JSON.parse(jsonStr);
}
var time1_2 = new Date().getTime();
console.info("json 耗时" + (time1_2 - time1_1));
var time2_1 = new Date().getTime();
for (let i = 0; i < 100000; i++) {
    let bytes = ByteBuffer_1.Buffer.WirteObject(msg);
    let obj = ByteBuffer_1.Buffer.ReadObject(Massage_1.Msg, bytes);
}
var time2_2 = new Date().getTime();
console.info("byteBuffer 耗时" + (time2_2 - time2_1));
console.info("******* ***");

},{"./ByteBuffer":2,"./Massage":4}],4:[function(require,module,exports){
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
const ByteBuffer_1 = require("./ByteBuffer");
var MessageType;
(function (MessageType) {
    MessageType[MessageType["join"] = 1] = "join";
    MessageType[MessageType["move"] = 2] = "move";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
let User = class User {
};
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.Uint16),
    __metadata("design:type", Number)
], User.prototype, "Id", void 0);
__decorate([
    ByteBuffer_1.ByteMember(2, ByteBuffer_1.ByteType.String),
    __metadata("design:type", String)
], User.prototype, "Name", void 0);
__decorate([
    ByteBuffer_1.ByteMember(3, ByteBuffer_1.ByteType.Int32Array),
    __metadata("design:type", Array)
], User.prototype, "IdList", void 0);
User = __decorate([
    ByteBuffer_1.BtyeContract
], User);
exports.User = User;
/**娴嬭瘯 */
let Role = class Role {
};
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.Uint16),
    __metadata("design:type", Number)
], Role.prototype, "Id", void 0);
__decorate([
    ByteBuffer_1.ByteMember(2, ByteBuffer_1.ByteType.String),
    __metadata("design:type", String)
], Role.prototype, "Name", void 0);
Role = __decorate([
    ByteBuffer_1.BtyeContract
], Role);
exports.Role = Role;
let Msg = class Msg {
    constructor() {
        this.MessageType = MessageType.join;
        this.Id = 0;
    }
};
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.Uint8),
    __metadata("design:type", Number)
], Msg.prototype, "MessageType", void 0);
__decorate([
    ByteBuffer_1.ByteMember(2, ByteBuffer_1.ByteType.Uint16),
    __metadata("design:type", Number)
], Msg.prototype, "Id", void 0);
__decorate([
    ByteBuffer_1.ByteMember(3, ByteBuffer_1.ByteType.Uint8),
    __metadata("design:type", Boolean)
], Msg.prototype, "Bool", void 0);
__decorate([
    ByteBuffer_1.ByteMember(4, ByteBuffer_1.ByteType.String),
    __metadata("design:type", String)
], Msg.prototype, "Name", void 0);
__decorate([
    ByteBuffer_1.ByteMember(5, ByteBuffer_1.ByteType.String),
    __metadata("design:type", String)
], Msg.prototype, "Address", void 0);
__decorate([
    ByteBuffer_1.ByteMember(6, ByteBuffer_1.ByteType.Object, User),
    __metadata("design:type", User)
], Msg.prototype, "User", void 0);
__decorate([
    ByteBuffer_1.ByteMember(7, ByteBuffer_1.ByteType.UInt8Array),
    __metadata("design:type", Array)
], Msg.prototype, "IdList", void 0);
__decorate([
    ByteBuffer_1.ByteMember(8, ByteBuffer_1.ByteType.Int32Array),
    __metadata("design:type", Array)
], Msg.prototype, "IdList2", void 0);
__decorate([
    ByteBuffer_1.ByteMember(9, ByteBuffer_1.ByteType.ObjectArray, User),
    __metadata("design:type", Array)
], Msg.prototype, "UserList", void 0);
__decorate([
    ByteBuffer_1.ByteMember(10, ByteBuffer_1.ByteType.BoolArray),
    __metadata("design:type", Array)
], Msg.prototype, "BoolList", void 0);
__decorate([
    ByteBuffer_1.ByteMember(11, ByteBuffer_1.ByteType.Bool),
    __metadata("design:type", Boolean)
], Msg.prototype, "IsVip", void 0);
Msg = __decorate([
    ByteBuffer_1.BtyeContract
], Msg);
exports.Msg = Msg;

},{"./ByteBuffer":2}],5:[function(require,module,exports){
(function (process,global){
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 搂 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":1}]},{},[3]);

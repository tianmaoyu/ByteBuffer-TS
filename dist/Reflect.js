"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function format(formatString, len) {
    return Reflect.metadata("format", formatString);
}
exports.format = format;
function getFormat(target, propertyKey) {
    return Reflect.getMetadata("format", target, propertyKey);
}
exports.getFormat = getFormat;
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function sealed1(x) {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        //descriptor.enumerable = value;
    };
}
////装饰器参看 http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-ii
function log(target, key, value) {
    return {
        value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var a = args.map(function (a) { return JSON.stringify(a); }).join();
            var result = value.value.apply(this, args);
            var r = JSON.stringify(result);
            console.log("Call: " + key + "(" + a + ") => " + r);
            return result;
        }
    };
}
function logProperty(target, key) {
    // property value
    var _val = this[key];
    // property getter
    var getter = function () {
        console.log("Get: " + key + " => " + _val);
        return _val;
    };
    // property setter
    var setter = function (newVal) {
        console.log("Set: " + key + " => " + newVal);
        _val = newVal;
    };
    // Delete property.
    if (delete this[key]) {
        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
function logClass(target) {
    // save a reference to the original constructor
    var original = target;
    // a utility function to generate instances of a class
    function construct(constructor, args) {
        var c = function () {
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        return new c();
    }
    // the new constructor behaviour
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("New: " + original.name);
        return construct(original, args);
    };
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    // return new constructor (will override original)
    return f;
}
function logParameter(target, key, index) {
    var metadataKey = "log_" + key + "_parameters";
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    }
    else {
        target[metadataKey] = [index];
    }
}
// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
//# sourceMappingURL=Reflect.js.map
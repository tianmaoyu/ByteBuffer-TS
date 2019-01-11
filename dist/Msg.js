"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Message_1 = require("./Message");
var ByteInfo_1 = require("./ByteInfo");
var Msg = /** @class */ (function () {
    function Msg() {
        this.MessageType = Message_1.MessageType.msg1;
    }
    __decorate([
        ByteInfo_1.ByteMember(1, ByteInfo_1.ByteType.Uint8),
        __metadata("design:type", Number)
    ], Msg.prototype, "MessageType", void 0);
    __decorate([
        ByteInfo_1.ByteMember(2, ByteInfo_1.ByteType.Uint16),
        __metadata("design:type", Number)
    ], Msg.prototype, "Id", void 0);
    __decorate([
        ByteInfo_1.ByteMember(3, ByteInfo_1.ByteType.Uint8),
        __metadata("design:type", Boolean)
    ], Msg.prototype, "Bool", void 0);
    __decorate([
        ByteInfo_1.ByteMember(4, ByteInfo_1.ByteType.String),
        __metadata("design:type", String)
    ], Msg.prototype, "Name", void 0);
    __decorate([
        ByteInfo_1.ByteMember(5, ByteInfo_1.ByteType.String),
        __metadata("design:type", String)
    ], Msg.prototype, "Address", void 0);
    __decorate([
        ByteInfo_1.ByteMember(6, ByteInfo_1.ByteType.Object),
        __metadata("design:type", User)
    ], Msg.prototype, "User", void 0);
    return Msg;
}());
exports.Msg = Msg;
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        ByteInfo_1.ByteMember(1, ByteInfo_1.ByteType.Uint16),
        __metadata("design:type", Number)
    ], User.prototype, "Id", void 0);
    __decorate([
        ByteInfo_1.ByteMember(2, ByteInfo_1.ByteType.String),
        __metadata("design:type", String)
    ], User.prototype, "Name", void 0);
    return User;
}());
exports.User = User;
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return List;
}(Array));
exports.List = List;
var Int8 = /** @class */ (function (_super) {
    __extends(Int8, _super);
    function Int8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int8;
}(Number));
exports.Int8 = Int8;
var UInt8 = /** @class */ (function (_super) {
    __extends(UInt8, _super);
    function UInt8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UInt8;
}(Number));
exports.UInt8 = UInt8;
var Int16 = /** @class */ (function (_super) {
    __extends(Int16, _super);
    function Int16() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int16;
}(Number));
exports.Int16 = Int16;
var UInt16 = /** @class */ (function (_super) {
    __extends(UInt16, _super);
    function UInt16() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UInt16;
}(Number));
exports.UInt16 = UInt16;
//# sourceMappingURL=Msg.js.map
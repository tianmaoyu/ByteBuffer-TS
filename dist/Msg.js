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
var Message_1 = require("./Message");
var ByteInfo_1 = require("./ByteInfo");
/**
 * 实体需要一个初始值，反射使用
 */
var Msg = /** @class */ (function () {
    function Msg() {
        this.MessageType = Message_1.MessageType.msg1;
        this.Id = 0;
        this.Bool = false;
        this.Name = "";
        this.Address = "";
        // @ByteMember(6, ByteType.Object)
        // public User: User;
        // @ByteMember(7, ByteType.UInt8Array)
        // public IdList: number[] = [];
        // @ByteMember(6, ByteType.ObjectArray)
        // public UserList: User[];
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
//# sourceMappingURL=Msg.js.map
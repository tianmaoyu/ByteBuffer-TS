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
const ByteInfo_1 = require("./ByteInfo");
const Message_1 = require("./Message");
let User = class User {
    constructor() {
        this.Id = undefined;
        this.Name = undefined;
        this.IdList = [];
    }
};
__decorate([
    ByteInfo_1.ByteMember(1, ByteInfo_1.ByteType.Uint16),
    __metadata("design:type", Number)
], User.prototype, "Id", void 0);
__decorate([
    ByteInfo_1.ByteMember(2, ByteInfo_1.ByteType.String),
    __metadata("design:type", String)
], User.prototype, "Name", void 0);
__decorate([
    ByteInfo_1.ByteMember(3, ByteInfo_1.ByteType.Int32Array),
    __metadata("design:type", Array)
], User.prototype, "IdList", void 0);
User = __decorate([
    ByteInfo_1.BtyeContract
], User);
exports.User = User;
/**测试 */
let Role = class Role {
};
__decorate([
    ByteInfo_1.ByteMember(1, ByteInfo_1.ByteType.Uint16),
    __metadata("design:type", Number)
], Role.prototype, "Id", void 0);
__decorate([
    ByteInfo_1.ByteMember(2, ByteInfo_1.ByteType.String),
    __metadata("design:type", String)
], Role.prototype, "Name", void 0);
Role = __decorate([
    ByteInfo_1.BtyeContract
], Role);
exports.Role = Role;
/**
 * 实体需要一个初始值，反射使用
 */
let Msg = class Msg {
    /**
     * 实体需要一个初始值，反射使用
     */
    constructor() {
        this.MessageType = Message_1.MessageType.msg1;
        this.Id = 0;
        this.Bool = false;
        this.Name = "";
        this.Address = "";
        this.User = undefined;
        this.IdList = [];
        this.IdList2 = [];
        this.UserList = [];
    }
};
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
    ByteInfo_1.ByteMember(6, ByteInfo_1.ByteType.Object, User),
    __metadata("design:type", User)
], Msg.prototype, "User", void 0);
__decorate([
    ByteInfo_1.ByteMember(7, ByteInfo_1.ByteType.UInt8Array),
    __metadata("design:type", Array)
], Msg.prototype, "IdList", void 0);
__decorate([
    ByteInfo_1.ByteMember(8, ByteInfo_1.ByteType.Int32Array),
    __metadata("design:type", Array)
], Msg.prototype, "IdList2", void 0);
__decorate([
    ByteInfo_1.ByteMember(9, ByteInfo_1.ByteType.ObjectArray, User),
    __metadata("design:type", Array)
], Msg.prototype, "UserList", void 0);
Msg = __decorate([
    ByteInfo_1.BtyeContract
], Msg);
exports.Msg = Msg;
//# sourceMappingURL=Msg.js.map
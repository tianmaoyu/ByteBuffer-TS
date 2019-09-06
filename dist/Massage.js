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
var ServerMsgType;
(function (ServerMsgType) {
    ServerMsgType[ServerMsgType["join"] = 1] = "join";
    ServerMsgType[ServerMsgType["move"] = 2] = "move";
})(ServerMsgType = exports.ServerMsgType || (exports.ServerMsgType = {}));
var ClientMsgType;
(function (ClientMsgType) {
    ClientMsgType[ClientMsgType["join"] = 1] = "join";
    ClientMsgType[ClientMsgType["move"] = 2] = "move";
})(ClientMsgType = exports.ClientMsgType || (exports.ClientMsgType = {}));
/**测试 */
let Role = class Role {
};
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.UInt16, null, "Role"),
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
let User = class User {
};
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.UInt16, null, "User"),
    __metadata("design:type", Number)
], User.prototype, "Id", void 0);
__decorate([
    ByteBuffer_1.ByteMember(2, ByteBuffer_1.ByteType.String),
    __metadata("design:type", String)
], User.prototype, "Name", void 0);
__decorate([
    ByteBuffer_1.ByteMember(3, ByteBuffer_1.ByteType.ObjectArray, Role),
    __metadata("design:type", Array)
], User.prototype, "RoleList", void 0);
User = __decorate([
    ByteBuffer_1.BtyeContract
], User);
exports.User = User;
let ComplexMsg = class ComplexMsg {
    constructor() {
        this.MessageType = ServerMsgType.join;
        this.Id = 0;
    }
};
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.UInt8, null, "ComplexMsg"),
    __metadata("design:type", Number)
], ComplexMsg.prototype, "MessageType", void 0);
__decorate([
    ByteBuffer_1.ByteMember(2, ByteBuffer_1.ByteType.UInt16),
    __metadata("design:type", Number)
], ComplexMsg.prototype, "Id", void 0);
__decorate([
    ByteBuffer_1.ByteMember(3, ByteBuffer_1.ByteType.UInt8),
    __metadata("design:type", Boolean)
], ComplexMsg.prototype, "Bool", void 0);
__decorate([
    ByteBuffer_1.ByteMember(4, ByteBuffer_1.ByteType.String),
    __metadata("design:type", String)
], ComplexMsg.prototype, "Name", void 0);
__decorate([
    ByteBuffer_1.ByteMember(5, ByteBuffer_1.ByteType.String),
    __metadata("design:type", String)
], ComplexMsg.prototype, "Address", void 0);
__decorate([
    ByteBuffer_1.ByteMember(6, ByteBuffer_1.ByteType.Object, User),
    __metadata("design:type", User)
], ComplexMsg.prototype, "User", void 0);
__decorate([
    ByteBuffer_1.ByteMember(7, ByteBuffer_1.ByteType.UInt8Array),
    __metadata("design:type", Array)
], ComplexMsg.prototype, "IdList", void 0);
__decorate([
    ByteBuffer_1.ByteMember(8, ByteBuffer_1.ByteType.Int32Array),
    __metadata("design:type", Array)
], ComplexMsg.prototype, "IdList2", void 0);
__decorate([
    ByteBuffer_1.ByteMember(9, ByteBuffer_1.ByteType.ObjectArray, User),
    __metadata("design:type", Array)
], ComplexMsg.prototype, "UserList", void 0);
__decorate([
    ByteBuffer_1.ByteMember(10, ByteBuffer_1.ByteType.BoolArray),
    __metadata("design:type", Array)
], ComplexMsg.prototype, "BoolList", void 0);
__decorate([
    ByteBuffer_1.ByteMember(11, ByteBuffer_1.ByteType.Bool),
    __metadata("design:type", Boolean)
], ComplexMsg.prototype, "IsVip", void 0);
ComplexMsg = __decorate([
    ByteBuffer_1.BtyeContract
], ComplexMsg);
exports.ComplexMsg = ComplexMsg;
let Number24Msg = class Number24Msg {
};
__decorate([
    ByteBuffer_1.ByteMember(7, ByteBuffer_1.ByteType.Int24, null, "Number24Msg"),
    __metadata("design:type", Number)
], Number24Msg.prototype, "Id", void 0);
__decorate([
    ByteBuffer_1.ByteMember(8, ByteBuffer_1.ByteType.Int24Array),
    __metadata("design:type", Array)
], Number24Msg.prototype, "Int24Array", void 0);
__decorate([
    ByteBuffer_1.ByteMember(9, ByteBuffer_1.ByteType.UInt24),
    __metadata("design:type", Number)
], Number24Msg.prototype, "UInt24", void 0);
__decorate([
    ByteBuffer_1.ByteMember(10, ByteBuffer_1.ByteType.UInt24Array),
    __metadata("design:type", Array)
], Number24Msg.prototype, "UInt24Array", void 0);
Number24Msg = __decorate([
    ByteBuffer_1.BtyeContract
], Number24Msg);
exports.Number24Msg = Number24Msg;
let NumberMsg = class NumberMsg {
};
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.Bool, null, "NumberMsg"),
    __metadata("design:type", Boolean)
], NumberMsg.prototype, "Bool", void 0);
__decorate([
    ByteBuffer_1.ByteMember(2, ByteBuffer_1.ByteType.BoolArray),
    __metadata("design:type", Array)
], NumberMsg.prototype, "BoolArray", void 0);
__decorate([
    ByteBuffer_1.ByteMember(3, ByteBuffer_1.ByteType.UInt8),
    __metadata("design:type", Number)
], NumberMsg.prototype, "UInt8", void 0);
__decorate([
    ByteBuffer_1.ByteMember(4, ByteBuffer_1.ByteType.UInt8Array),
    __metadata("design:type", Array)
], NumberMsg.prototype, "UInt8Array", void 0);
__decorate([
    ByteBuffer_1.ByteMember(5, ByteBuffer_1.ByteType.UInt16),
    __metadata("design:type", Number)
], NumberMsg.prototype, "UInt16", void 0);
__decorate([
    ByteBuffer_1.ByteMember(6, ByteBuffer_1.ByteType.UInt16Array),
    __metadata("design:type", Array)
], NumberMsg.prototype, "UInt16Array", void 0);
__decorate([
    ByteBuffer_1.ByteMember(7, ByteBuffer_1.ByteType.Int24),
    __metadata("design:type", Number)
], NumberMsg.prototype, "Int24", void 0);
__decorate([
    ByteBuffer_1.ByteMember(8, ByteBuffer_1.ByteType.Int24Array),
    __metadata("design:type", Array)
], NumberMsg.prototype, "Int24Array", void 0);
__decorate([
    ByteBuffer_1.ByteMember(9, ByteBuffer_1.ByteType.UInt24),
    __metadata("design:type", Number)
], NumberMsg.prototype, "UInt24", void 0);
__decorate([
    ByteBuffer_1.ByteMember(10, ByteBuffer_1.ByteType.UInt24Array),
    __metadata("design:type", Array)
], NumberMsg.prototype, "UInt24Array", void 0);
NumberMsg = __decorate([
    ByteBuffer_1.BtyeContract
], NumberMsg);
exports.NumberMsg = NumberMsg;
let StringMsg = class StringMsg {
};
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.String, null, "StringMsg"),
    __metadata("design:type", String)
], StringMsg.prototype, "String", void 0);
__decorate([
    ByteBuffer_1.ByteMember(2, ByteBuffer_1.ByteType.StringArray),
    __metadata("design:type", String)
], StringMsg.prototype, "StringArray", void 0);
StringMsg = __decorate([
    ByteBuffer_1.BtyeContract
], StringMsg);
exports.StringMsg = StringMsg;
let ObjectMsg = class ObjectMsg {
};
__decorate([
    ByteBuffer_1.ByteMember(0, ByteBuffer_1.ByteType.Object, User, "ObjectMsg"),
    __metadata("design:type", User)
], ObjectMsg.prototype, "Object", void 0);
__decorate([
    ByteBuffer_1.ByteMember(1, ByteBuffer_1.ByteType.ObjectArray, User),
    __metadata("design:type", Array)
], ObjectMsg.prototype, "ObjectArray", void 0);
ObjectMsg = __decorate([
    ByteBuffer_1.BtyeContract
], ObjectMsg);
exports.ObjectMsg = ObjectMsg;
//# sourceMappingURL=Massage.js.map
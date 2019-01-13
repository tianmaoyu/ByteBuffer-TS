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
var Reflect_1 = require("./Reflect");
var Msg_1 = require("./Msg");
var ByteInfo_1 = require("./ByteInfo");
var MsgPool = {};
var ClassPool = {};
ClassPool["Msg"] = Msg_1.Msg;
var _obj = new ClassPool["Msg"]();
var msg = new Msg_1.Msg();
msg.MessageType = Message_1.MessageType.msg1;
msg.Address = "深圳";
msg.Bool = false;
msg.Name = "eric";
msg.Id = 1000;
var buffer = ByteInfo_1.Buffer.WirteObject(msg);
console.info(buffer.byteLength);
var msg1 = ByteInfo_1.Buffer.ReadObject(Msg_1.Msg, buffer);
console.info(msg1);
//反射
var Team = /** @class */ (function () {
    function Team(name, age) {
        this.name = name;
        this.age = age;
    }
    Team_1 = Team;
    var Team_1;
    Team = Team_1 = __decorate([
        Reflect.metadata("ClassType", Team_1),
        __metadata("design:paramtypes", [String, Number])
    ], Team);
    return Team;
}());
function create(constructor) {
    var parms = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        parms[_i - 1] = arguments[_i];
    }
    return new (constructor.bind.apply(constructor, [void 0].concat(parms)))();
}
console.info(Team);
var classType = [];
classType.push(Team);
console.info(classType[0]);
var t1 = create(Team, "eric", 18);
var t2 = new Team();
for (var p in t2) {
    console.info(p);
}
var _t2 = t2.constructor;
var classType1 = Reflect.getMetadata("ClassType", Team);
var _class = new classType1();
// console.info(t2)
// console.info(t1);
// t2.constructor
// var list = [];
// list.push(new Msg());
// list.push(new Msg());
// var listype = list instanceof Array;
// console.info(list);
// var item = list[0] instanceof Msg;
// console.info(item);
// var msg1 = new Msg();
// msg1.MessageType = MessageType.msg1;
// msg1.Address = "深圳";
// msg1.Bool = false;
// msg1.Name = "eric";
// msg1.Id = 1000;
// var user = new User();
// user.Id = 2;
// user.Name = "张三"
// msg1.User = user;
// var listUser = [new User(), new User()];
// msg1.UserList = listUser;
// var idList = [1, 2, 3, 4, 5];
// msg1.IdList = idList;
var bufferLength = ByteInfo_1.Buffer.GetObjectLength(msg1);
// Buffer.Wirte(msg1)
// console.info(bufferLength);
var buf1 = new ArrayBuffer(10);
var buf2 = new ArrayBuffer(10);
//BufferWriteRead.StringTest();
var msg2 = new Message_1.UserMessage();
msg2.MessageType = Message_1.MessageType.msg1;
msg2.Address = "深圳大发好啊%￥……&*（";
msg2.Bool = true;
msg2.Id = 20000;
msg2.Name = "稍等哈的身份sdjfhsjdf实得分e";
var buf = msg2.serialize2();
var dv = new Int8Array(buf);
dv.forEach(function (i) { return console.info(i); });
console.info(buf.byteLength);
var _msg = Message_1.UserMessage.deserialize(buf);
console.info(_msg);
var addressFormate = Reflect_1.getFormat(msg, "Address");
// export class Startup {
//   public static main(): number {
//     console.log("Hello World");
//     return 0;
//   }
// }
// Startup.main();
// console.info("编译成功！");
//# sourceMappingURL=HelloWorld.js.map
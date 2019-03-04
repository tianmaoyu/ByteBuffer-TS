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
var Team_1;
const Message_1 = require("./Message");
const Msg_1 = require("./Msg");
const ByteInfo_1 = require("./ByteInfo");
var role = new Msg_1.Role();
const MsgPool = {};
const ClassPool = {};
ClassPool["Msg"] = Msg_1.Msg;
var _obj = new ClassPool["Msg"]();
var msg = new Msg_1.Msg(); //sss
msg.MessageType = Message_1.MessageType.msg1;
// msg.Address = "深圳";
// msg.Bool = false;
// msg.Name = "eric";
// msg.Id = 1000;
// var role=new Role();
// role.Id=1;
// role.Name="admin";
var user = new Msg_1.User();
user.Id = 1;
user.Name = "user";
msg.User = user;
var user2 = new Msg_1.User();
user2.Id = 2;
user2.Name = "use1";
msg.UserList = [];
msg.UserList.push(user2);
var buffer = ByteInfo_1.Buffer.WirteObject(msg);
console.info(buffer.byteLength);
var msg1 = ByteInfo_1.Buffer.ReadObject(Msg_1.Msg, buffer);
console.info(msg1);
//反射
let Team = Team_1 = class Team {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
Team = Team_1 = __decorate([
    Reflect.metadata("ClassType", Team_1),
    __metadata("design:paramtypes", [String, Number])
], Team);
function create(constructor, ...parms) {
    return new constructor(...parms);
}
console.info(Team);
var classType = [];
console.info(classType);
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
// var msg2 = new UserMessage();
// msg2.MessageType = MessageType.msg1;
// msg2.Address = "深圳大发好啊%￥……&*（";
// msg2.Bool = true;
// msg2.Id = 20000;
// msg2.Name = "稍等哈的身份sdjfhsjdf实得分e";
// var buf = msg2.serialize2();
// var dv = new Int8Array(buf);
// dv.forEach(i => console.info(i));
// console.info(buf.byteLength);
// var _msg = UserMessage.deserialize(buf);
// console.info(_msg);
// var addressFormate = getFormat(msg, "Address")
// export class Startup {
//   public static main(): number {
//     console.log("Hello World");
//     return 0;
//   }
// }
// Startup.main();
// console.info("编译成功！");
//# sourceMappingURL=HelloWorld.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("./Message");
var Reflect_1 = require("./Reflect");
var Msg_1 = require("./Msg");
var ByteInfo_1 = require("./ByteInfo");
// var list = [];
// list.push(new Msg());
// list.push(new Msg());
// var listype = list instanceof Array;
// console.info(list);
// var item = list[0] instanceof Msg;
// console.info(item);
var msg1 = new Msg_1.Msg();
msg1.MessageType = Message_1.MessageType.msg1;
msg1.Address = "深圳";
msg1.Bool = false;
msg1.Name = "eric";
msg1.Id = 1000;
var user = new Msg_1.User();
user.Id = 2;
user.Name = "张三";
msg1.User = user;
var listUser = [new Msg_1.User(), new Msg_1.User()];
msg1.UserList = listUser;
var idList = [1, 2, 3, 4, 5];
msg1.IdList = idList;
var bufferLength = ByteInfo_1.Buffer.GetObjectLength(msg1);
ByteInfo_1.Buffer.Wirte(msg1);
console.info(bufferLength);
//BufferWriteRead.StringTest();
var msg = new Message_1.UserMessage();
msg.MessageType = Message_1.MessageType.msg1;
msg.Address = "深圳大发好啊%￥……&*（";
msg.Bool = true;
msg.Id = 20000;
msg.Name = "稍等哈的身份sdjfhsjdf实得分e";
var buf = msg.serialize2();
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
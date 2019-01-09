"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("./Message");
//BufferWriteRead.StringTest();
var msg = new Message_1.UserMessage();
msg.MessageType = Message_1.MessageType.msg1;
msg.Address = "深";
msg.Bool = true;
msg.Id = 20000;
msg.Name = "e";
var buf = msg.serialize2();
var dv = new Int8Array(buf);
dv.forEach(function (i) { return console.info(i); });
console.info(buf.byteLength);
var _msg = Message_1.UserMessage.deserialize(buf);
console.info(_msg);
// export class Startup {
//   public static main(): number {
//     console.log("Hello World");
//     return 0;
//   }
// }
// Startup.main();
// console.info("编译成功！");
//# sourceMappingURL=HelloWorld.js.map
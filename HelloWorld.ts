import { BufferWriteRead } from "./BufferWriteRead";
import { UserMessage, MessageType } from "./Message";


//BufferWriteRead.StringTest();
var msg = new UserMessage();
msg.MessageType = MessageType.msg1;
msg.Address = "深";
msg.Bool = true;
msg.Id = 20000;
msg.Name = "e";
var buf = msg.serialize2();

var dv = new Int8Array(buf);
dv.forEach(i => console.info(i));

console.info(buf.byteLength);
var _msg = UserMessage.deserialize(buf);
console.info(_msg);

// export class Startup {
//   public static main(): number {
//     console.log("Hello World");
//     return 0;
//   }
// }

// Startup.main();

// console.info("编译成功！");

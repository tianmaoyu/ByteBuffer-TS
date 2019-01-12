import { BufferWriteRead } from "./BufferWriteRead";
import { UserMessage, MessageType } from "./Message";
import { getFormat } from "./Reflect";
import { Msg, User } from './Msg';
import { Buffer } from './ByteInfo';



// var list = [];
// list.push(new Msg());
// list.push(new Msg());
// var listype = list instanceof Array;
// console.info(list);
// var item = list[0] instanceof Msg;
// console.info(item);
var msg1 = new Msg();
msg1.MessageType = MessageType.msg1;
msg1.Address = "深圳";
msg1.Bool = false;
msg1.Name = "eric";
msg1.Id = 1000;
var user = new User();
user.Id = 2;
user.Name = "张三"
msg1.User = user;
var listUser = [new User(), new User()];
msg1.UserList = listUser;
var idList = [1, 2, 3, 4, 5];

msg1.IdList = idList;

var bufferLength = Buffer.GetObjectLength(msg1);


Buffer.Wirte(msg1)
console.info(bufferLength);



















//BufferWriteRead.StringTest();
var msg = new UserMessage();
msg.MessageType = MessageType.msg1;
msg.Address = "深圳大发好啊%￥……&*（";
msg.Bool = true;
msg.Id = 20000;
msg.Name = "稍等哈的身份sdjfhsjdf实得分e";
var buf = msg.serialize2();

var dv = new Int8Array(buf);
dv.forEach(i => console.info(i));

console.info(buf.byteLength);
var _msg = UserMessage.deserialize(buf);
console.info(_msg);
var addressFormate = getFormat(msg, "Address")
// export class Startup {
//   public static main(): number {
//     console.log("Hello World");
//     return 0;
//   }
// }

// Startup.main();

// console.info("编译成功！");

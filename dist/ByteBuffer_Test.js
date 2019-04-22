"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Massage_1 = require("./Massage");
const ByteBuffer_1 = require("./ByteBuffer");
var msg = new Massage_1.Msg(); //sss
msg.MessageType = Massage_1.MessageType.move;
msg.Address = "深圳";
msg.Bool = false;
msg.Name = "eric";
msg.Id = 1000;
var user = new Massage_1.User();
user.Id = 1;
user.Name = "user";
user.IdList = [1, 2, 3, 4, 5];
msg.User = user;
var user2 = new Massage_1.User();
user2.Id = 2;
user2.Name = "use1";
msg.UserList = [];
msg.UserList.push(user2);
msg.UserList.push(user);
msg.BoolList = [true, false, true, false];
msg.IsVip = true;
msg.IdList = [1, 2, 3, 4];
msg.IdList2 = [1, 2, 3, 4];
var buffer = ByteBuffer_1.Buffer.WirteObject(msg);
console.info(buffer.byteLength);
console.info(JSON.stringify(msg).length);
var msg1 = ByteBuffer_1.Buffer.ReadObject(Massage_1.Msg, buffer);
console.info(msg1);
var time1_1 = new Date().getTime();
for (let i = 0; i < 100000; i++) {
    let jsonStr = JSON.stringify(msg);
    let obj = JSON.parse(jsonStr);
}
var time1_2 = new Date().getTime();
console.info("json 耗时间：" + (time1_2 - time1_1));
var time2_1 = new Date().getTime();
for (let i = 0; i < 100000; i++) {
    let bytes = ByteBuffer_1.Buffer.WirteObject(msg);
    let obj = ByteBuffer_1.Buffer.ReadObject(Massage_1.Msg, bytes);
}
var time2_2 = new Date().getTime();
console.info("byteBuffer 耗时间：" + (time2_2 - time2_1));
console.info("******* ***");
//# sourceMappingURL=ByteBuffer_test.js.map
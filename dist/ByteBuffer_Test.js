"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Massage_1 = require("./Massage");
const ByteBuffer_1 = require("./ByteBuffer");
//#region  number 类型
var number24Msg = new Massage_1.Number24Msg();
number24Msg.Id = 0x7fffff;
number24Msg.Int24Array = [0x7fffff, 100, -0x800000];
number24Msg.UInt24 = 0xffffff,
    number24Msg.UInt24Array = [0xffffff, 123345, 0];
var buffer = ByteBuffer_1.Buffer.WirteObject(number24Msg);
var _number24Msg = ByteBuffer_1.Buffer.ReadObject(Massage_1.Number24Msg, buffer);
console.info("msg:" + JSON.stringify(_number24Msg));
console.info("msg:" + JSON.stringify(number24Msg));
console.info("length:" + buffer.byteLength);
console.info("json length:" + JSON.stringify(number24Msg).length);
//#endregion
//#region 嵌套类
var admin = new Massage_1.Role();
admin.Id = 0;
admin.Name = "Administrator/管理员";
var guest = new Massage_1.Role();
guest.Id = 1;
guest.Name = "guest/游客";
var user = new Massage_1.User();
user.Id = 200;
user.Name = "5156村长";
user.RoleList = new Array();
user.RoleList.push(admin);
user.RoleList.push(guest);
var arrayBuffer = ByteBuffer_1.Buffer.WirteObject(user);
var _user = ByteBuffer_1.Buffer.ReadObject(Massage_1.User, arrayBuffer);
console.info(JSON.stringify(_user));
console.info("byteBuffer:" + arrayBuffer.byteLength);
console.info("json:" + JSON.stringify(user).length);
//#endregion 
//#region 时间测试
var msg = new Massage_1.ComplexMsg();
msg.MessageType = Massage_1.ServerMsgType.move;
msg.Address = "深圳";
msg.Bool = false;
msg.Name = "eric";
msg.Id = 1000;
var user = new Massage_1.User();
user.Id = 1;
user.Name = "user";
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
var timeStart1 = Date.now();
for (let i = 0; i < 100000; i++) {
    let jsonStr = JSON.stringify(msg);
    let obj = JSON.parse(jsonStr);
}
console.info("json 耗时间：" + (Date.now() - timeStart1));
var timeStart2 = Date.now();
for (let i = 0; i < 100000; i++) {
    let bytes = ByteBuffer_1.Buffer.WirteObject(msg);
    let obj = ByteBuffer_1.Buffer.ReadObject(Massage_1.ComplexMsg, bytes);
}
console.info("byteBuffer 耗时间：" + (Date.now() - timeStart2));
//#endregion
//# sourceMappingURL=ByteBuffer_test.js.map
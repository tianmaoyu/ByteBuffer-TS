
import { ComplexMsg, User, Role, ServerMsgType, Number24Msg } from './Massage';
import { Buffer } from './ByteBuffer';
import { Int24 } from './Int24';
import { UInt24 } from './UInt24';




//#region  INT24
var dataView=new DataView(new ArrayBuffer(32));
dataView.setInt16(0,100,true);
console.info(dataView.getInt16(0,true))
Int24.write(dataView,2,Int24.MaxVlaue,true);
console.info(Int24.read(dataView,2,true)) 

UInt24.write(dataView,2,Int24.MaxVlaue,true);
console.info(UInt24.read(dataView,2,true)) 
//#endregion



//#region  number 类型

var number24Msg=new Number24Msg();
number24Msg.Id=Int24.MaxVlaue;
number24Msg.Int24Array=[0x7fffff,100,-0x80000]
number24Msg.UInt24=0xffffff,
number24Msg.UInt24Array=[0xffffff,123345,0];

var buffer=Buffer.WirteObject(number24Msg);
console.info(UInt24.read(new DataView(buffer),0,true));
var _number24Msg= Buffer.ReadObject(Number24Msg,buffer);
console.info("msg:"+ JSON.stringify(_number24Msg))
console.info("msg:"+ JSON.stringify(number24Msg))
console.info("length:"+ buffer.byteLength)
console.info("json length:"+ JSON.stringify(number24Msg))
//#endregion


//#region 嵌套类
var admin=new Role();
admin.Id=0;
admin.Name="Administrator/管理员";

var guest=new Role();
guest.Id=1;
guest.Name="guest/游客"

var user=new User();
user.Id=200;
user.Name="5156村长";
user.RoleList=new Array<Role>();
user.RoleList.push(admin);
user.RoleList.push(guest);

var arrayBuffer= Buffer.WirteObject(user);
var _user=Buffer.ReadObject<User>(User,arrayBuffer);
console.info("byteBuffer:"+arrayBuffer.byteLength);
console.info(JSON.stringify(_user))

console.info("json:"+JSON.stringify(user).length);
console.info(JSON.stringify(_user));
//#endregion 

//#region 时间测试

var msg = new ComplexMsg();
msg.MessageType = ServerMsgType.move;
msg.Address = "深圳";
msg.Bool = false;
msg.Name = "eric";
msg.Id = 1000;

var user=new User();
user.Id=1;
user.Name="user"
msg.User=user;

var user2=new User();
user2.Id=2;
user2.Name="use1";

msg.UserList=[];
msg.UserList.push(user2);
msg.UserList.push(user);
msg.BoolList=[true,false,true,false];
msg.IsVip=true;
msg.IdList=[1,2,3,4];
msg.IdList2=[1,2,3,4];


var timeStart1=Date.now();
for(let i=0;i<100000;i++){
   let jsonStr= JSON.stringify(msg);
   let obj= JSON.parse(jsonStr);
}
console.info("json 耗时间："+ (Date.now()-timeStart1));

var timeStart2=Date.now();
for(let i=0;i<100000;i++){
    let bytes = Buffer.WirteObject(msg);
    let obj= Buffer.ReadObject(ComplexMsg,bytes);
}
console.info("byteBuffer 耗时间："+ (Date.now()-timeStart2));

//#endregion

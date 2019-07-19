
import { ComplexMsg, User, Role, ServerMsgType } from './Massage';
import { Buffer } from './ByteBuffer';
import { UTF8 } from './UTF8';
import { Int24 } from './Int24';
import { UInt24 } from './UInt24';
import { DataView2 } from './DataView2';
import { UTF16 } from './UTF16';



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
console.info(JSON.stringify(_user));

console.info("json:"+JSON.stringify(user).length);
console.info(JSON.stringify(_user));




var buffer02=new ArrayBuffer(100);
var str1="werksdfksl2356789!@$%^&*()sdfhjkj";
var utf8Length1= UTF8.getLength(str1);
var utf16Length1= UTF16.getLength(str1);
UTF8.write(buffer02,0,str1);
var str=UTF8.read(buffer02,0,33)
var dataView=new DataView(buffer02);
UTF16.write(dataView,0,str1);
var str= UTF16.read(dataView,0,66)

var str2="#通过配置端口指向部署外包烧烤摊的项目";
var utf8Length2= UTF8.getLength(str2);
var utf16Length2= UTF16.getLength(str2);
UTF8.write(buffer0,0,str2);
 var str=UTF8.read(buffer0,0,55)
 UTF16.write(dataView,0,str2);
var str= UTF16.read(dataView,0,38)


Int24.write(buffer0,0,12,true);
var number= Int24.read(buffer0,0,true);
Int24.write(buffer0,0,Int24.MaxVlaue+1,true);
var number= Int24.read(buffer0,0,true);
Int24.write(buffer0,0,Int24.MiniValue-1,true);
var number= Int24.read(buffer0,0,true);

UInt24.write(buffer0,0,100)
var number= UInt24.read(buffer0,0);
UInt24.write(buffer0,0,UInt24.MaxVlaue)
var number= UInt24.read(buffer0,0);
UInt24.write(buffer0,0,UInt24.MiniValue)
var number= UInt24.read(buffer0,0);

var dataView2=new DataView2(buffer0);

dataView2.getUTF8String


var msg = new ComplexMsg();//sss
msg.MessageType = ServerMsgType.move;
msg.Address = "深圳";
msg.Bool = false;
msg.Name = "eric";
msg.Id = 1000;
var user=new User();
user.Id=1;
user.Name="user"
// user.IdList=[1,2,3,4,5];
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

var buffer0 = Buffer.WirteObject(msg);
console.info(buffer0.byteLength);

console.info(JSON.stringify(msg).length) ;
var msg1 = Buffer.ReadObject(ComplexMsg, buffer0);

console.info(msg1);

var time1_1=new Date().getTime();
for(let i=0;i<100000;i++){
   let jsonStr= JSON.stringify(msg);
   let obj= JSON.parse(jsonStr);
}
var time1_2=new Date().getTime();
console.info("json 耗时间："+ (time1_2-time1_1));

var time2_1=new Date().getTime();
for(let i=0;i<100000;i++){
    let bytes = Buffer.WirteObject(msg);
    let obj= Buffer.ReadObject(ComplexMsg,bytes);
}
var time2_2=new Date().getTime();
console.info("byteBuffer 耗时间："+ (time2_2-time2_1));

console.info("******* ***")
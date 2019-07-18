
import { Msg, User, Role, MessageType } from './Massage';
import { Buffer } from './ByteBuffer';
import { UTF8 } from './UTF8';
import { Int24 } from './Int24';
import { UInt24 } from './UInt24';
import { DataView2 } from './DataView2';
import { UTF16 } from './UTF16';

var buffer=new ArrayBuffer(100);
var str1="werksdfksl2356789!@$%^&*()sdfhjkj";
var utf8Length1= UTF8.getLength(str1);
var utf16Length1= UTF16.getLength(str1);
UTF8.write(buffer,0,str1);
var str=UTF8.read(buffer,0,33)
var dataView=new DataView(buffer);
UTF16.write(dataView,0,str1);
var str= UTF16.read(dataView,0,66)



var str2="#通过配置端口指向部署外包烧烤摊的项目";
var utf8Length2= UTF8.getLength(str2);
var utf16Length2= UTF16.getLength(str2);
UTF8.write(buffer,0,str2);
 var str=UTF8.read(buffer,0,55)

 UTF16.write(dataView,0,str2);
var str= UTF16.read(dataView,0,38)


Int24.write(buffer,0,12,true);
var number= Int24.read(buffer,0,true);
Int24.write(buffer,0,Int24.MaxVlaue+1,true);
var number= Int24.read(buffer,0,true);
Int24.write(buffer,0,Int24.MiniValue-1,true);
var number= Int24.read(buffer,0,true);

UInt24.write(buffer,0,100)
var number= UInt24.read(buffer,0);
UInt24.write(buffer,0,UInt24.MaxVlaue)
var number= UInt24.read(buffer,0);
UInt24.write(buffer,0,UInt24.MiniValue)
var number= UInt24.read(buffer,0);

var dataView2=new DataView2(buffer);

dataView2.getUTF8String


var msg = new Msg();//sss
msg.MessageType = MessageType.move;
msg.Address = "深圳";
msg.Bool = false;
msg.Name = "eric";
msg.Id = 1000;
var user=new User();
user.Id=1;
user.Name="user"
user.IdList=[1,2,3,4,5];
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

var buffer = Buffer.WirteObject(msg);
console.info(buffer.byteLength);

console.info(JSON.stringify(msg).length) ;
var msg1 = Buffer.ReadObject(Msg, buffer);

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
    let obj= Buffer.ReadObject(Msg,bytes);
}
var time2_2=new Date().getTime();
console.info("byteBuffer 耗时间："+ (time2_2-time2_1));

console.info("******* ***")
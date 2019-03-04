
import { Msg, User, Role } from './Msg';
import { Buffer } from './ByteInfo';

var msg = new Msg();//sss
// msg.MessageType = MessageType.msg1;
// msg.Address = "深圳";
// msg.Bool = false;
// msg.Name = "eric";
// msg.Id = 1000;
// var role=new Role();
// role.Id=1;
// role.Name="admin";
var user=new User();
user.Id=1;
user.Name="user"
user.IdList=[1,2,3,4,5];
msg.User=user;
var user2=new User();
user2.Id=2;
user2.Name="use1";
// msg.UserList=[];
// msg.UserList.push(user2);
// msg.UserList.push(user);

// msg.IdList=[1,2,3,4];
// msg.IdList2=[1,2,3,4];
var buffer = Buffer.WirteObject(msg);
console.info(buffer.byteLength);

var msg1 = Buffer.ReadObject(Msg, buffer);
console.info(msg1);



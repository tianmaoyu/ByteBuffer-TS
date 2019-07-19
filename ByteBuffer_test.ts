
import { ComplexMsg, User, Role, ServerMsgType } from './Massage';
import { Buffer } from './ByteBuffer';



//#region  number 类型



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

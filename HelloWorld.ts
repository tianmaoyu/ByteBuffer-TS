import { BufferWriteRead } from "./BufferWriteRead";
import { UserMessage, MessageType } from "./Message";
import { getFormat, format } from "./Reflect";
import { Msg, User, Role } from './Msg';
import { Buffer } from './ByteInfo';



var role=new Role();


const MsgPool: { [key: number]: any; } = {};

const ClassPool: { [key: string]: any; } = {};

ClassPool["Msg"] = Msg;
var _obj =new ClassPool["Msg"]();

var msg = new Msg();//sss
msg.MessageType = MessageType.msg1;
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
msg.User=user;
var user2=new User();
user2.Id=2;
user2.Name="use1";
msg.UserList=[];
msg.UserList.push(user2);

var buffer = Buffer.WirteObject(msg);
console.info(buffer.byteLength);

var msg1 = Buffer.ReadObject(Msg, buffer);
console.info(msg1);
//反射
@Reflect.metadata("ClassType",Team)
class Team {
    constructor(public  name?:string,public age?:number){

    }
    // constructor(name: string, age: number) {
    //     this.name = name;
    //     this.age = age;
    // }
    // public name: string = "1 team";
    // public age: number;
}

function create<T>(constructor: any, ...parms: any): T {
    return new constructor(...parms);
}
console.info(Team);
var classType: Function[] = [];
console.info(classType)
classType.push(Team);
console.info(classType[0]);

var t1 = create(Team, "eric", 18);
var t2 = new Team();
for(var p in t2){
    console.info(p)
}

var _t2= t2.constructor;
var classType1=Reflect.getMetadata("ClassType",Team);
var _class=new classType1();

// console.info(t2)
// console.info(t1);
// t2.constructor

// var list = [];
// list.push(new Msg());
// list.push(new Msg());
// var listype = list instanceof Array;
// console.info(list);
// var item = list[0] instanceof Msg;
// console.info(item);




// var msg1 = new Msg();
// msg1.MessageType = MessageType.msg1;
// msg1.Address = "深圳";
// msg1.Bool = false;
// msg1.Name = "eric";
// msg1.Id = 1000;
// var user = new User();
// user.Id = 2;
// user.Name = "张三"
// msg1.User = user;
// var listUser = [new User(), new User()];
// msg1.UserList = listUser;
// var idList = [1, 2, 3, 4, 5];

// msg1.IdList = idList;

var bufferLength = Buffer.GetObjectLength(msg1);


// Buffer.Wirte(msg1)
// console.info(bufferLength);



var buf1 = new ArrayBuffer(10);
var buf2 = new ArrayBuffer(10);












//BufferWriteRead.StringTest();
// var msg2 = new UserMessage();
// msg2.MessageType = MessageType.msg1;
// msg2.Address = "深圳大发好啊%￥……&*（";
// msg2.Bool = true;
// msg2.Id = 20000;
// msg2.Name = "稍等哈的身份sdjfhsjdf实得分e";
// var buf = msg2.serialize2();

// var dv = new Int8Array(buf);
// dv.forEach(i => console.info(i));

// console.info(buf.byteLength);
// var _msg = UserMessage.deserialize(buf);
// console.info(_msg);
// var addressFormate = getFormat(msg, "Address")
// export class Startup {
//   public static main(): number {
//     console.log("Hello World");
//     return 0;
//   }
// }

// Startup.main();

// console.info("编译成功！");

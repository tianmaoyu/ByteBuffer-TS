# ByteBuffer
  bytebuffer 是一个自定义的数据虚拟化，反序列化工具

## vs code 源码使用
1. tsc-w :对 ts 源码进行编译，编译到对应的 dist 目录中
2. index.html 再浏览器中预览 

## 如何使用

```TypeScript
import { Buffer } from './ByteBuffer';

/* 定义两个 类*/
@BtyeContract
export class Role {
    @ByteMember(1, ByteType.UInt16)
    public Id: number;
    @ByteMember(2, ByteType.String)
    public Name: string;
}

@BtyeContract
export class User {
    @ByteMember(1, ByteType.UInt16)
    public Id: number ;
    @ByteMember(2, ByteType.String)
    public Name: String ;
    @ByteMember(3, ByteType.ObjectArray,Role)
    public RoleList: Array<Role>;
}

//虚拟化，反序列化

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

```
 output

  ``` 
 byteBuffer:72
{"Id":200,"Name":"5156Cunzhang","RoleList":[{"Id":0,"Name":"Administrator"},{"Id":1,"Name":"guest"}]}
 ```
## 

## Int24 类型的支持
```Typescript
//#region  number 类型
var number24Msg=new Number24Msg();
number24Msg.Id=0x7fffff;
number24Msg.Int24Array=[0x7fffff,100,-0x800000]
number24Msg.UInt24=0xffffff,
number24Msg.UInt24Array=[0xffffff,123345,0];

var buffer=Buffer.WirteObject(number24Msg);
var _number24Msg= Buffer.ReadObject(Number24Msg,buffer);
console.info("msg:"+ JSON.stringify(_number24Msg))
console.info("msg:"+ JSON.stringify(number24Msg))
console.info("length:"+ buffer.byteLength)
console.info("json length:"+ JSON.stringify(number24Msg).length)
//#endregion
```
>output
```
msg:{"Id":8388607,"Int24Array":[8388607,100,-8388608],"UInt24":16777215,"UInt24Array":[16777215,123345,0]}
msg:{"Id":8388607,"Int24Array":[8388607,100,-8388608],"UInt24":16777215,"UInt24Array":[16777215,123345,0]}
length:26
json length:102
```

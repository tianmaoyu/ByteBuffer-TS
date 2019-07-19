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


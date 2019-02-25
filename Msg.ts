import { MessageType} from './Message';
import { ByteMember, ByteType, BtyeContract } from './ByteInfo';


@BtyeContract
export class User {
    @ByteMember(1, ByteType.Uint16)
    public Id: number;
    @ByteMember(2, ByteType.String)
    public Name: String;
}

/**测试 */
@BtyeContract
export class Role {
    @ByteMember(1, ByteType.Uint16)
    public Id: number;
    @ByteMember(2, ByteType.String)
    public Name: string;
}

/**
 * 实体需要一个初始值，反射使用
 */
@BtyeContract
export class Msg {

    @ByteMember(1, ByteType.Uint8)
    public MessageType: MessageType = MessageType.msg1;

    // @ByteMember(2, ByteType.Uint16)
    // public Id: number = 0;

    // @ByteMember(3, ByteType.Uint8)
    // public Bool: boolean = false;

    // @ByteMember(4, ByteType.String)
    // public Name: string = "";

    // @ByteMember(5, ByteType.String)
    // public Address: string = "";

    @ByteMember(6, ByteType.Object,User)
    public User: User=undefined;

    // @ByteMember(7, ByteType.UInt8Array)
    // public IdList: number[] = [];

    @ByteMember(6, ByteType.ObjectArray,User)
    public UserList: User[]=undefined;

}


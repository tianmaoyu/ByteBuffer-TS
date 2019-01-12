import { MessageType, StringUtils, UserMessage } from './Message';
import { ByteMember, ByteType } from './ByteInfo';

export class Msg {
    @ByteMember(1, ByteType.Uint8)
    public MessageType: MessageType = MessageType.msg1;

    @ByteMember(2, ByteType.Uint16)
    public Id: number;

    @ByteMember(3, ByteType.Uint8)
    public Bool: boolean;

    @ByteMember(4, ByteType.String)
    public Name: string;

    @ByteMember(5, ByteType.String)
    public Address: string;

    @ByteMember(6, ByteType.Object)
    public User: User;

    @ByteMember(7, ByteType.UInt8Array)
    public IdList: number[] = [];

    @ByteMember(6, ByteType.ObjectArray)
    public UserList: User[];

}


export class User {
    @ByteMember(1, ByteType.Uint16)
    public Id: number;
    @ByteMember(2, ByteType.String)
    public Name: String;
}




import { ByteMember, ByteType, BtyeContract } from './ByteBuffer';

export enum ServerMsgType {
    join = 1,
    move = 2,
}

export enum ClientMsgType {
    join = 1,
    move = 2,
}

export interface Entity{
    Id:number;
}
export interface ServerMsg{
    MessageType: ServerMsgType;
}

export interface ClientMsg{
    MessageType:ServerMsgType;
}

/**测试 */
@BtyeContract
export class Role {
    @ByteMember(1, ByteType.UInt16,null,"Role")
    public Id: number;
    @ByteMember(2, ByteType.String)
    public Name: string;
}


@BtyeContract
export class User {
    @ByteMember(1, ByteType.UInt16,null,"User")
    public Id: number ;
    @ByteMember(2, ByteType.String)
    public Name: String ;
    @ByteMember(3, ByteType.ObjectArray,Role)
    public RoleList: Array<Role>;
}


@BtyeContract
export class ComplexMsg implements ServerMsg {

    @ByteMember(1, ByteType.UInt8,null,"ComplexMsg")
    public MessageType: ServerMsgType = ServerMsgType.join;

    @ByteMember(2, ByteType.UInt16)
    public Id: number = 0;

    @ByteMember(3, ByteType.UInt8)
    public Bool: boolean;

    @ByteMember(4, ByteType.String)
    public Name: string;

    @ByteMember(5, ByteType.String)
    public Address: string ;

    @ByteMember(6, ByteType.Object, User)
    public User: User ;

    @ByteMember(7, ByteType.UInt8Array)
    public IdList: number[];
   
    @ByteMember(8, ByteType.Int32Array)
    public IdList2: number[];

    @ByteMember(9, ByteType.ObjectArray, User)
    public UserList:Array<User>;
    @ByteMember(10, ByteType.BoolArray)
    public BoolList:Array<boolean>;

    @ByteMember(11, ByteType.Bool)
    public IsVip:boolean;
}

@BtyeContract
export class Number24Msg {

    @ByteMember(7, ByteType.Int24,null,"Number24Msg")
    public Id: number;
    @ByteMember(8, ByteType.Int24Array)
    public Int24Array: Array<number>;

    @ByteMember(9, ByteType.UInt24)
    public UInt24: number;
    @ByteMember(10, ByteType.UInt24Array)
    public UInt24Array: Array<number>;
}

@BtyeContract
export class NumberMsg {

    @ByteMember(1, ByteType.Bool,null,"NumberMsg")
    public Bool: boolean;
    @ByteMember(2, ByteType.BoolArray)
    public BoolArray: boolean[];

    @ByteMember(3, ByteType.UInt8)
    public UInt8: number;
    @ByteMember(4, ByteType.UInt8Array)
    public UInt8Array: Array<number>;

    @ByteMember(5, ByteType.UInt16)
    public UInt16: number;
    @ByteMember(6, ByteType.UInt16Array)
    public UInt16Array: Array<number>;
   
    @ByteMember(7, ByteType.Int24)
    public Int24: number;
    @ByteMember(8, ByteType.Int24Array)
    public Int24Array: Array<number>;

    @ByteMember(9, ByteType.UInt24)
    public UInt24: number;
    @ByteMember(10, ByteType.UInt24Array)
    public UInt24Array: Array<number>;
}


@BtyeContract
export class StringMsg {

    @ByteMember(1, ByteType.String,null,"StringMsg")
    public String: string;
    @ByteMember(2, ByteType.StringArray)
    public StringArray: string ;

}


@BtyeContract
export class ObjectMsg {

    @ByteMember(0, ByteType.Object, User,"ObjectMsg")
    public Object: User ;
    @ByteMember(1, ByteType.ObjectArray, User)
    public ObjectArray:Array<User>;
    
}
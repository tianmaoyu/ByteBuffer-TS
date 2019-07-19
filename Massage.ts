

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


@BtyeContract
export class User {
    @ByteMember(1, ByteType.UInt16)
    public Id: number ;
    @ByteMember(2, ByteType.String)
    public Name: String ;
    @ByteMember(3, ByteType.Int32Array)
    public IdList: number[];
}

/**测试 */
@BtyeContract
export class Role {
    @ByteMember(1, ByteType.UInt16)
    public Id: number;
    @ByteMember(2, ByteType.String)
    public Name: string;
}




@BtyeContract
export class Msg implements ServerMsg {

    @ByteMember(1, ByteType.UInt8)
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
export class Massage {

    @ByteMember(1, ByteType.Bool)
    public Bool: boolean;
    @ByteMember(2, ByteType.BoolArray)
    public BoolArray: boolean[];

    @ByteMember(3, ByteType.UInt8)
    public UInt8: number;
    @ByteMember(4, ByteType.UInt8Array)
    public UInt8Array: Array<number>;



   

    @ByteMember(2, ByteType.UInt16)
    public Id: number = 0;
    @ByteMember(2, ByteType.UInt16Array)
    public IdList: Array<number>;



   
    @ByteMember(3, ByteType)
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

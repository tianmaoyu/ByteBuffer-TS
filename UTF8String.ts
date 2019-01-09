export class UTF8String {

    public static Write(str: string): ArrayBuffer {
        var buf = new ArrayBuffer(10);
        return buf
    }

    public static Read(buf: ArrayBuffer): string {
        return ""
    }


    /**
     * 后台 对应的写法
     * @param string   var bn= BitConverter.GetBytes('n');
            var b1 = BitConverter.GetBytes('你');
            var b2 = BitConverter.GetBytes('好');
     */
    public static stringToUint8(string: string): Uint8Array {
        var str = btoa(unescape(encodeURIComponent(string))),
            charList = str.split(''),
            uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint8Array(uintArray);
    }

    public static uint8ToString(uintArray: Uint8Array): string {
        var str = String.fromCharCode.apply(null, uintArray)
        str = decodeURIComponent(escape(atob(str)))
        return str;
    }



    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
    public static ab2str(buf: ArrayBuffer): string {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    // 字符串转为ArrayBuffer对象，参数为字符串
    public static str2ab(str: string): ArrayBuffer {
        var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

}
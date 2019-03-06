export class UTF8String {

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

}
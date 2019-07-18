
export class UTF8 {

    /**
     * 返回 字符串 utf-8编码的长度
     * @param str 字符串
     */
    public static getLength(str: string): number {
        let length = 0, char = 0;
        for (let i = 0; i < str.length; ++i) {
            char = str.charCodeAt(i);
            if (char < 128)
                length += 1;
            else if (char < 2048)
                length += 2;
            else if ((char & 0xFC00) === 0xD800 && (str.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
                ++i;
                length += 4;
            } else
                length += 3;
        }
        return length;
    }

    /**
     * 字符串写入 buffer,并返回写入的长度
     * @param str 字符串
     * @param buffer 
     * @param offset 偏移量
     */
    public static write(buffer: ArrayBuffer, offset: number,str: string): number {
        var start = offset,
            char1, // character 1
            char2; // character 2

        for (var i = 0; i < str.length; ++i) {
            char1 = str.charCodeAt(i);
            if (char1 < 128) {
                buffer[offset++] = char1;
            } else if (char1 < 2048) {
                buffer[offset++] = char1 >> 6 | 192;
                buffer[offset++] = char1 & 63 | 128;
            } else if ((char1 & 0xFC00) === 0xD800 && ((char2 = str.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
                char1 = 0x10000 + ((char1 & 0x03FF) << 10) + (char2 & 0x03FF);
                ++i;
                buffer[offset++] = char1 >> 18 | 240;
                buffer[offset++] = char1 >> 12 & 63 | 128;
                buffer[offset++] = char1 >> 6 & 63 | 128;
                buffer[offset++] = char1 & 63 | 128;
            } else {
                buffer[offset++] = char1 >> 12 | 224;
                buffer[offset++] = char1 >> 6 & 63 | 128;
                buffer[offset++] = char1 & 63 | 128;
            }
        }
        return offset - start;
    }

    public static read(buffer: ArrayBuffer, offset: number, length: number): string {
        var end=length+offset;
        if (length < 1) return "";

        var parts = null,
            chunk = [],
            i = 0, // char offset
            t;     // temporary


        while (offset < end) {
            t = buffer[offset++];
            if (t < 128)
                chunk[i++] = t;
            else if (t > 191 && t < 224)
                chunk[i++] = (t & 31) << 6 | buffer[offset++] & 63;
            else if (t > 239 && t < 365) {
                t = ((t & 7) << 18 | (buffer[offset++] & 63) << 12 | (buffer[offset++] & 63) << 6 | buffer[offset++] & 63) - 0x10000;
                chunk[i++] = 0xD800 + (t >> 10);
                chunk[i++] = 0xDC00 + (t & 1023);
            } else
                chunk[i++] = (t & 15) << 12 | (buffer[offset++] & 63) << 6 | buffer[offset++] & 63;
            if (i > 8191) {
                (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                i = 0;
            }
        }
        if (parts) {
            if (i)
                parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
            return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
    }
}
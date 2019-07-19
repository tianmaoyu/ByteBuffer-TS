export class UInt24 {

    /**
     *16777215
     */
    public static readonly MaxVlaue: number = 0xFFFFFF;

    public static readonly MiniValue: number = 0;

    /**
     * 读一个 int24 
     * @param buffer 
     * @param offset 
     * @param littleEndian 
     */
    public static read(dataView: DataView, offset: number, littleEndian: boolean = false): number {
        let buffer=dataView.buffer
        if (littleEndian) {
            var number= buffer[0 + offset] | (buffer[1 + offset] << 8) | (buffer[2 + offset] << 16)
            return number
        }
        return buffer[2 + offset] | (buffer[1 + offset] << 8) | (buffer[0 + offset] << 16);
    }

    /**
     * 写入 int24 
     * @param buffer buffer
     * @param value 写入的数字
     * @param offset 写入偏移量
     * @param littleEndian 默认大端
     */
    public static write(dataView: DataView, offset: number, value: number, littleEndian: boolean = false) {
        let buffer=dataView.buffer
        if (littleEndian) {
            buffer[0 + offset] = value & 0xff;
            buffer[1 + offset] = (value & 0xff00) >> 8;
            buffer[2 + offset] = (value & 0xff0000) >> 16;
        } else {
            buffer[2 + offset] = value & 0xff;
            buffer[1 + offset] = (value & 0xff00) >> 8;
            buffer[0 + offset] = (value & 0xff0000) >> 16;
        }
    }

}
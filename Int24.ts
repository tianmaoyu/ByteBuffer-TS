
export class Int24 {

    /**
     *8388607
     */
    public static readonly MaxVlaue: number = 0x7FFFFF;
    /**
     * -8388608
     */
    public static readonly MiniValue: number = -0x800000;
  
    /**
     * 读一个 int24 
     *  If false, a big-endian value should be written,
     * otherwise a little-endian value should be written.
     * @param buffer 
     * @param offset 
     * @param littleEndian 
     */
    public static read(dataView: DataView, offset: number, littleEndian: boolean = false): number {
        // let number;
        // if (littleEndian) {
        //     number= dataView.getUint8(0 + offset) | (dataView.getUint8(1 + offset) << 8) | (dataView.getUint8(2 + offset) << 16)
        // }
        // else {
        //     number= dataView.getUint8(2 + offset) | (dataView.getUint8(1 + offset) << 8) | (dataView.getUint8(0 + offset) << 16);
        // }
        // return number & 0x800000 ? number - 0x1000000 : number;

        //另写发，没验证过
        if (littleEndian) {
            return dataView.getUint8(0 + offset) | (dataView.getUint8(1 + offset) << 8) | (dataView.getInt8(2 + offset) << 16)
        }
        else {
            return dataView.getInt8(2 + offset) | (dataView.getUint8(1 + offset) << 8) | (dataView.getUint8(0 + offset) << 16);
        }

        // let number;
        // let buffer=dataView.buffer;
        // if (littleEndian) {
        //     number= buffer[0 + offset] | (buffer[1 + offset] << 8) | (buffer[2 + offset] << 16)
        // }
        // else {
        //     number= buffer[2 + offset] | (buffer[1 + offset] << 8) | (buffer[0 + offset] << 16);
        // }
        // return number & 0x800000 ? number - 0x1000000 : number;
    }


    /**
     * 写入 int24 
     * @param buffer buffer
     * @param value 写入的数字
     * @param offset 写入偏移量
     * @param littleEndian 默认大端
     */
    public static write(dataView: DataView, offset: number,value: number,  littleEndian: boolean = false) {
     
        if (littleEndian) {
            var uint8  = value & 0xff;
            dataView.setUint8(offset, uint8);

            var uint8  =(value & 0xff00) >> 8;
            dataView.setUint8(offset+1, uint8);

            var uint8  =(value & 0xff0000) >> 16;
            dataView.setUint8(offset+2, uint8);
          
        } else {
            var uint8  = value & 0xff;
            dataView.setUint8(offset+2, uint8);

            var uint8  =(value & 0xff00) >> 8;
            dataView.setUint8(offset+1, uint8);

            var uint8  =(value & 0xff0000) >> 16;
            dataView.setUint8(offset, uint8);
        }
       
        // let buffer=dataView.buffer;
        // if (littleEndian) {
        //     buffer[0 + offset] = value & 0xff;
        //     buffer[1 + offset] = (value & 0xff00) >> 8;
        //     buffer[2 + offset] = (value & 0xff0000) >> 16;
        // } else {
        //     buffer[2 + offset] = value & 0xff;
        //     buffer[1 + offset] = (value & 0xff00) >> 8;
        //     buffer[0 + offset] = (value & 0xff0000) >> 16;
        // }
    }

}


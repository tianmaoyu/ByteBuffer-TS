"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Int24 {
    /**
     * 读一个 int24
     *  If false, a big-endian value should be written,
     * otherwise a little-endian value should be written.
     * @param buffer
     * @param offset
     * @param littleEndian
     */
    static read(dataView, offset, littleEndian = false) {
        let number;
        let buffer = dataView.buffer;
        if (littleEndian) {
            number = buffer[0 + offset] | (buffer[1 + offset] << 8) | (buffer[2 + offset] << 16);
        }
        else {
            number = buffer[2 + offset] | (buffer[1 + offset] << 8) | (buffer[0 + offset] << 16);
        }
        return number & 0x800000 ? number - 0x1000000 : number;
    }
    /**
     * 写入 int24
     * @param buffer buffer
     * @param value 写入的数字
     * @param offset 写入偏移量
     * @param littleEndian 默认大端
     */
    static write(dataView, offset, value, littleEndian = false) {
        let buffer = dataView.buffer;
        if (littleEndian) {
            buffer[0 + offset] = value & 0xff;
            buffer[1 + offset] = (value & 0xff00) >> 8;
            buffer[2 + offset] = (value & 0xff0000) >> 16;
        }
        else {
            buffer[2 + offset] = value & 0xff;
            buffer[1 + offset] = (value & 0xff00) >> 8;
            buffer[0 + offset] = (value & 0xff0000) >> 16;
        }
    }
}
/**
 *8388607
 */
Int24.MaxVlaue = 0x7FFFFF;
/**
 * -8388608
 */
Int24.MiniValue = -0x800000;
exports.Int24 = Int24;
//# sourceMappingURL=Int24.js.map
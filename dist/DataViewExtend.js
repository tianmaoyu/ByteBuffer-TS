"use strict";
/**
 * 对 ArrayBuffer 进行扩展
 */
Object.defineProperty(exports, "__esModule", { value: true });
DataView.prototype.setUInt24 = function (offset, value, littleEndian) {
    if (littleEndian) {
        this.buffer[0 + offset] = value & 0xff;
        this.buffer[1 + offset] = (value & 0xff00) >> 8;
        this.buffer[2 + offset] = (value & 0xff0000) >> 16;
    }
    else {
        this.buffer[2 + offset] = value & 0xff;
        this.buffer[1 + offset] = (value & 0xff00) >> 8;
        this.buffer[0 + offset] = (value & 0xff0000) >> 16;
    }
};
DataView.prototype.getUInt24 = function (offset, littleEndian) {
    if (littleEndian) {
        return this.buffer[0 + offset] | (this.buffer[1 + offset] << 8) | (this.buffer[2 + offset] << 16);
    }
    return this.buffer[2 + offset] | (this.buffer[1 + offset] << 8) | (this.buffer[0 + offset] << 16);
};
DataView.prototype.setInt24 = function (offset, value, littleEndian) {
    this.setUInt24(offset, value, littleEndian);
};
DataView.prototype.getInt24 = function (offset, littleEndian) {
    let number = this.getUInt24(offset, littleEndian);
    return number & 0x800000 ? number - 0x1000000 : number;
};
//# sourceMappingURL=DataViewExtend.js.map
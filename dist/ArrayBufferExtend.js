DataView.prototype.setInt24 = function (byteOffset, value, littleEndian) {
    if (littleEndian) {
        this.buffer[0 + byteOffset] = value & 0xff;
        this.buffer[1 + byteOffset] = (value & 0xff00) >> 8;
        this.buffer[2 + byteOffset] = (value & 0xff0000) >> 16;
    }
    else {
        this.buffer[2 + byteOffset] = value & 0xff;
        this.buffer[1 + byteOffset] = (value & 0xff00) >> 8;
        this.buffer[0 + byteOffset] = (value & 0xff0000) >> 16;
    }
};
//# sourceMappingURL=ArrayBufferExtend.js.map
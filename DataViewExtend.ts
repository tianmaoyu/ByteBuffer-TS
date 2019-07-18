/**
 * 对 ArrayBuffer 进行扩展
 */

 export interface DataView {

  /**
   * 存储一个int24 默认大端模式
    * Stores an Int24 value at the specified byte offset from the start of the view.
    * @param offset The place in the buffer at which the value should be set.
    * @param value The value to set.
    * @param littleEndian If false or undefined, a big-endian value should be written,
    * otherwise a little-endian value should be written.
    */
  setInt24(offset: number, value: number, littleEndian?: boolean): void;

  /**
   * Gets the Int24 value at the specified byte offset from the start of the view. There is
   * no alignment constraint; multi-byte values may be fetched from any offset.
   * @param offset The place in the buffer at which the value should be retrieved.
   */
  getInt24(offset: number, littleEndian?: boolean): number;


  /**
    * Stores an UInt24 value at the specified byte offset from the start of the view.
    * @param offset The place in the buffer at which the value should be set.
    * @param value The value to set.
    * @param littleEndian If false or undefined, a big-endian value should be written,
    * otherwise a little-endian value should be written.
    */
  setUInt24(offset: number, value: number, littleEndian?: boolean): void;

  /**
  * Gets the UInt24 value at the specified byte offset from the start of the view. There is
  * no alignment constraint; multi-byte values may be fetched from any offset.
  * @param offset The place in the buffer at which the value should be retrieved.
  */
  getUInt24(offset: number, littleEndian?: boolean): number;
}


 
  DataView.prototype.setUInt24 = function (offset: number, value: number, littleEndian?: boolean): void {
  if (littleEndian) {
    this.buffer[0 + offset] = value & 0xff;
    this.buffer[1 + offset] = (value & 0xff00) >> 8;
    this.buffer[2 + offset] = (value & 0xff0000) >> 16;
  } else {
    this.buffer[2 + offset] = value & 0xff;
    this.buffer[1 + offset] = (value & 0xff00) >> 8;
    this.buffer[0 + offset] = (value & 0xff0000) >> 16;
  }
}


DataView.prototype.getUInt24 = function (offset: number, littleEndian?: boolean): number {
  if (littleEndian) {
    return this.buffer[0 + offset] | (this.buffer[1 + offset] << 8) | (this.buffer[2 + offset] << 16)
  }
  return this.buffer[2 + offset] | (this.buffer[1 + offset] << 8) | (this.buffer[0 + offset] << 16);
}

DataView.prototype.setInt24 = function (offset: number, value: number, littleEndian?: boolean): void {
    this.setUInt24(offset,value,littleEndian);
}

DataView.prototype.getInt24 = function (offset: number, littleEndian?: boolean): number {
  let number=this.getUInt24(offset,littleEndian);
  return number & 0x800000 ? number - 0x1000000 : number;
}



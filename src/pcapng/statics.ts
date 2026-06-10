export const BLOCK_TYPE = {
    SECTION_HEADER_BLOCK: 0x0a0d0d0a,
    INTEFACE_DESCRIPTION_BLOCK: 0x00000001,
    PACKET_BLOCK: 0x00000006,
};

export const MAGIC_VALUE = {
    LITTLE_ENDIAN: 0x4d3c2b1a,
    BIG_ENDIAN: 0x1a2b3c4d,
};

export type Endianness = "little_endian" | "big_endian" | "unknown";

export function isLittleEndian(endianness: Endianness): boolean {
    if (endianness === "little_endian") return true;
    return false;
}

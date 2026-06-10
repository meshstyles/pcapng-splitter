import {
    BLOCK_TYPE,
    isLittleEndian,
    MAGIC_VALUE,
    type Endianness,
} from "./statics";

export async function readPcapng(file: File | null): Promise<string[]> {
    const returner: string[] = [];
    if (file === null) return ["null value"];
    const buffer = await file.arrayBuffer();
    const viewer = new DataView(buffer);
    const dataStream = new Uint8Array(buffer);
    let readPointer = 0;
    const dataLength = dataStream.length;

    const firstBlockType = viewer.getUint32(readPointer);
    readPointer = readPointer + 8;

    if (firstBlockType !== BLOCK_TYPE.SECTION_HEADER_BLOCK) {
        return ["no section header block"];
    }

    const endianness = getEndianessFromMagicValue(
        viewer.getUint32(readPointer),
    );
    if (endianness === "unknown") return ["could not decode pacapng correctly"];
    const isTypelittleEndian = isLittleEndian(endianness);

    readPointer = readPointer - 4;
    const shbLength = viewer.getUint32(readPointer, isTypelittleEndian);
    console.log("shb lenght : ", shbLength.toString(16));

    const shb = dataStream.slice(0, shbLength);

    const hex = Array.from(shb)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" ");
    returner.push(hex);

    const newPointer = shbLength;
    let length = viewer.getInt32(newPointer + 4, isTypelittleEndian);
    let dataBlock = dataStream.slice(shbLength, shbLength + length);
    let block = Array.from(dataBlock)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" ");
    returner.push(block);

    let currentBlockPointer = shbLength + length;
    while (currentBlockPointer < dataLength) {
        length = viewer.getInt32(currentBlockPointer + 4, isTypelittleEndian);
        dataBlock = dataStream.slice(
            currentBlockPointer,
            currentBlockPointer + length,
        );
        block = Array.from(dataBlock)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(" ");
        returner.push(block);
        currentBlockPointer = currentBlockPointer + length;
    }

    return returner;
}

function getEndianessFromMagicValue(magicValue: number): Endianness {
    console.log("magic value: ", magicValue.toString(16));
    if (magicValue === MAGIC_VALUE.BIG_ENDIAN) return "big_endian";
    else if (magicValue === MAGIC_VALUE.LITTLE_ENDIAN) return "little_endian";
    else return "unknown";
}

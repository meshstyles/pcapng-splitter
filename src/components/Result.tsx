import { useEffect, useState } from "react";
import { readPcapng } from "../pcapng/reading";

interface ResultProps {
    pcapFile: File | null;
    selectionType: string;
}

export const Result = (props: ResultProps) => {
    const [data, setData] = useState<string[]>([""]);
    useEffect(() => {
        async function load() {
            const result = await readPcapng(
                props.pcapFile,
                props.selectionType,
            );
            console.log(result);
            setData(result ?? [""]);
        }
        load();
    }, [props.pcapFile, props.selectionType]);
    return (
        <>
            {data.map((d, i) => {
                return (
                    <div key={i}>
                        <p>{d}</p>
                    </div>
                );
            })}
        </>
    );
};

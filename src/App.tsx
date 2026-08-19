import { useState } from "react";
import { Upload } from "./components/Upload";
import { Result } from "./components/Result";
import { Select } from "./components/Select";

export type SelectionType = "hex" | "hexstring" | "java";

function App() {
    const selectionTypeOptions: SelectionType[] = ["hex", "java", "hexstring"];
    const [file, setFile] = useState<File | null>(null);
    const [selectedOption, setOption] = useState<string>("hex");

    return (
        <>
            <h1>PCAPNG SPLITTER</h1>
            <h2>Outputs a PcapNG packet by packet</h2>
            <Upload setFile={setFile}></Upload>
            <Select
                chosenOption={selectedOption}
                options={selectionTypeOptions}
                setOption={setOption}
                key="typeDropdown"
            />
            <Result pcapFile={file} selectionType={selectedOption}></Result>
        </>
    );
}

export default App;

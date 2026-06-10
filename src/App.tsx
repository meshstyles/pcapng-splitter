import { useState } from "react";
import { Upload } from "./components/Upload";
import { Result } from "./components/Result";

function App() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <>
            <h1>TEST pcapng reader</h1>
            <Upload setFile={setFile}></Upload>
            <Result pcapFile={file}></Result>
        </>
    );
}

export default App;

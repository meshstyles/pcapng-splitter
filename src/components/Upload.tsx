interface UploadProps {
    setFile: (file: File) => void;
}

export const Upload = (props: UploadProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files !== null) props.setFile(files[0] ?? null);
        else console.log("error setting upload");
    };

    return (
        <>
            <label>please select file</label>
            <br />
            <input
                type="file"
                accept="*.pcapng"
                onChange={handleChange}
                name="file select"
            ></input>
        </>
    );
};

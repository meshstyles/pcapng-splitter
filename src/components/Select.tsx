interface props {
    options: string[];
    chosenOption: string;
    setOption: (value: string) => void;
}

export function Select(props: props) {
    const { options, chosenOption, setOption } = props;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(event.target.value);
    };

    return (
        <select value={chosenOption} onChange={handleChange}>
            <option value="">Select an option</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

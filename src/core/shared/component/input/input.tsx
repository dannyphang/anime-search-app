import "./input.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const InputBase = (
    prop: {
        placeholder?: string;
        label?: string;
        value?: string | any;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
        onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    } = {}
) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (prop.onChange) {
            prop.onChange(event);
        }
    };

    return (
        <div>
            <Box component="form" sx={{}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label={prop.label} variant="outlined" fullWidth placeholder={prop.placeholder} onChange={handleChange} value={prop.value} />
            </Box>
        </div>
    );
};
export default InputBase;

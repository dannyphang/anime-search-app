import { CSSProperties } from "react";
import { Box, TextField, InputAdornment, TextFieldProps } from "@mui/material";
import "./input.css";

interface InputBaseProps {
  placeholder?: string;
  label?: string;
  value?: string | any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputProps?: TextFieldProps["InputProps"];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const InputBase = (prop: InputBaseProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    prop.onChange?.(event);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label={prop.label}
        variant="outlined"
        fullWidth
        placeholder={prop.placeholder}
        onChange={handleChange}
        onKeyPress={prop.onKeyPress}
        value={prop.value}
        InputProps={{
          ...prop.inputProps,
          startAdornment: prop.startIcon ? (
            <InputAdornment position="start">{prop.startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: prop.endIcon ? (
            <InputAdornment position="end">{prop.endIcon}</InputAdornment>
          ) : undefined,
        }}
      />
    </Box>
  );
};

export default InputBase;

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./button.css";

const ButtonBase = (prop: {
    label?: string;
    variant?: "text" | "outlined" | "contained";
    color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
    size?: "small" | "medium" | "large";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (prop.onClick) {
            prop.onClick(event);
        }
    };

    return (
        <Button
            disabled={prop.disabled ?? false}
            variant={prop.variant ?? "contained"}
            onClick={handleClick}
            color={prop.color ? prop.color : "primary"}
            startIcon={prop.startIcon}
            endIcon={prop.endIcon}
            fullWidth={prop.fullWidth}
            size={prop.size ?? "medium"}
        >
            {prop.label}
        </Button>
    );
};

export default ButtonBase;

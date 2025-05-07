import { Snackbar, Alert, SnackbarCloseReason, SnackbarOrigin } from "@mui/material";
import "./toast.css";

const Toast = (prop: {
    open?: boolean;
    hideClose?: boolean;
    message: string;
    isSticky?: boolean;
    onClose?: (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
    severity?: "success" | "error" | "warning" | "info";
    position?: SnackbarOrigin;
}) => {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return;
        }

        prop.onClose?.(event!, reason); // call parent onClose
    };

    return (
        <Snackbar open={prop.open} autoHideDuration={prop.isSticky ? null : 5000} onClose={handleClose} anchorOrigin={prop.position || { vertical: "top", horizontal: "right" }}>
            <Alert onClose={prop.hideClose ? undefined : handleClose} severity={prop.severity || "success"} sx={{ width: "100%" }}>
                {prop.message}
            </Alert>
        </Snackbar>
    );
};
export default Toast;

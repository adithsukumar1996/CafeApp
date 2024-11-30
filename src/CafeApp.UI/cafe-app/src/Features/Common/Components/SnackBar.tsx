import { Alert, Snackbar } from "@mui/material";
import React from "react";

export interface SnackBarProps {
  snackbarOpen: boolean;
  snackbarSeverity: "error" | "warning" | "info" | "success";
  snackbarMessage: string;
  handleSnackbarClose: () => void;
}

const SnackBar: React.FC<SnackBarProps> = ({
  snackbarOpen,
  snackbarSeverity,
  snackbarMessage,
  handleSnackbarClose,
}) => (
  <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
  >
    <Alert
      onClose={handleSnackbarClose}
      severity={snackbarSeverity}
      className="w-full"
    >
      {snackbarMessage}
    </Alert>
  </Snackbar>
);

export default SnackBar;

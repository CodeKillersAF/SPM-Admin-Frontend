import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarFeddback({open,onClose,message}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

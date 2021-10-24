import React, { useState } from "react";
import PropTypes from 'prop-types';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const ErrorSnackbar = (props) => {
  const { message } = props;
  const [ open, setOpen ] = useState(true);

  return (
    <Snackbar open={open} autoHideDuration={6000} >
      <Alert onClose={() => setOpen(false)} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

ErrorSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorSnackbar;

import { React } from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "@material-ui/core";
import { BACKEND_BASE_URL } from "../constants";

const MyIPButton = (props) => {
  const { setLookupData, onError } = props;
  const fetchWhoAmI = async () => {
    try {
      console.log(`${BACKEND_BASE_URL}/whoami`);
      let response = await fetch(`${BACKEND_BASE_URL}/whoami`);
      response = await response.json();
      setLookupData(response);
    } catch (e) {
      onError();
    }
  };

  return (
    <Button onClick={() => fetchWhoAmI()}>
      <Typography> Lookup My IP </Typography>
    </Button>
  );
};

MyIPButton.propTypes = {
  setLookupData: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default MyIPButton;

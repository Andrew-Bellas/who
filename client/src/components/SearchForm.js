import { React, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MyIPButton from "./MyIPButton";
import ErrorSnackbar from "./ErrorSnackbar";
import { BACKEND_BASE_URL } from "../constants";

const SearchForm = (props) => {
  const { setLookupData } = props;
  const [formInput, setFormInput] = useState();
  const [searchByDomain, setSearchByDomain] = useState("true");
  const [isError, setIsError] = useState(false);

  const fetchWhoIsByDomain = async (domain) => {
    try {
      let response = await fetch(`${BACKEND_BASE_URL}/whois/domain/${domain}`);
      response = await response.json();
      setLookupData(response);
    } catch (e) {
      setIsError(true);
    }
  };

  const fetchWhoIsByIP = async (ip) => {
    try {
      let response = await fetch(`${BACKEND_BASE_URL}/whois/ip/${ip}`);
      response = await response.json();
      setLookupData(response);
    } catch (e) {
      setIsError(true);
    }
  };

  const handleInputChange = (e) => {
    setFormInput(e.target.value);
    isError && setIsError(false);
  };

  return (
    <>
      <Grid
        container
        wrap="nowrap"
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <TextField
            label="Enter an IP Address or Domain"
            color="secondary"
            variant="outlined"
            style={{ width: "400px", maxWidth: "100%", marginBottom: "3%" }}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        wrap="nowrap"
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <RadioGroup
            value={searchByDomain}
            onChange={(e) => setSearchByDomain(e.target.value)}
            row
          >
            <FormControlLabel value="true" label="Domain" control={<Radio />} />
            <FormControlLabel
              value="false"
              label="IP Address"
              control={<Radio />}
            />
          </RadioGroup>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              searchByDomain === "true"
                ? fetchWhoIsByDomain(formInput)
                : fetchWhoIsByIP(formInput);
            }}
            onError={() => setIsError(true)}
            disabled={!formInput}
          >
            <Typography> Search </Typography>
          </Button>
          {isError ? (
            <ErrorSnackbar
              message={`Error performing lookup for ${formInput}`}
            />
          ) : undefined}
        </Grid>
        <Grid>
          <MyIPButton
            onError={() => {
              setIsError(true);
            }}
            setLookupData={(data) => setLookupData(data)}
          />
        </Grid>
      </Grid>
    </>
  );
};

SearchForm.propTypes = {
  setLookupData: PropTypes.func.isRequired,
};

export default SearchForm;

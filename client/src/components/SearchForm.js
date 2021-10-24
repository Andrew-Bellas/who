import { React, useState } from "react";
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ErrorSnackbar from "./ErrorSnackbar";
import { WHOIS_URL } from "../constants";

const SearchForm = (props) => {
  const { setLookupData } = props;
  const [formInput, setFormInput] = useState();
  const [searchByDomain, setSearchByDomain] = useState("true");
  const [isError, setIsError] = useState(false);

  const fetchWhoIsByDomain = async (domain) => {
    try {
      let response = await fetch(`${WHOIS_URL}/domain/${domain}`);
      response = await response.json();
      setLookupData(response);
    } catch (e) {
      setIsError(true);
    }
  };

  const fetchWhoIsByIP = async (ip) => {
    try {
      let response = await fetch(`${WHOIS_URL}/ip/${ip}`);
      response = await response.json();
      setLookupData(response);
    } catch (e) {
      setIsError(true);
    }
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
            onChange={(e) => setFormInput(e.target.value)}
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
          >
            Search
          </Button>
          {isError ? (
            <ErrorSnackbar
              message={`Error performing lookup for ${formInput}`}
            />
          ) : undefined}
        </Grid>
      </Grid>
    </>
  );
};

SearchForm.propTypes = {
  setLookupData: PropTypes.func.isRequired,
};

export default SearchForm;

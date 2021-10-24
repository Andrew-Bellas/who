import { React, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import ResultCard from "./components/ResultCard";
import SearchForm from "./components/SearchForm";
import AppBar from "./components/AppBar";

const App = () => {
  const [lookupData, setLookupData] = useState({});
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#7df9ff",
      },
      secondary: {
        main: "#202020",
      },
      type: "dark",
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Container style={{maxwidth: '100vh'}}>
      <CssBaseline />
      <AppBar />
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-evenly"
        style={{ height: "100vh" }}
      >
        <Grid item> <SearchForm setLookupData={setLookupData}  /> </Grid>
        <Grid item> <ResultCard lookupData={lookupData} /> </Grid>
      </Grid>
      </Container>
    </MuiThemeProvider>
  );
};

export default App;

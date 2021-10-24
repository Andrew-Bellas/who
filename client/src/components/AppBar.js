import React from "react";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Github from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import { SOURCE_CODE_URL } from '../constants'

const AppBar = () => (
    <MuiAppBar>
      <Toolbar>
        <Typography variant="h4" style={{marginRight: 'auto'}}> WHOIS Lookup</Typography>
        <IconButton href={SOURCE_CODE_URL} >
          <Github style={{width: '35px', height: '35px'}} />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );

export default AppBar;

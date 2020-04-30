import React from 'react';
import {AppBar, Button, Link, Toolbar, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  }
}));

export default function NavBar({toggleTheme}) {

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6"
                    className={classes.toolbarTitle}>
          Hacker News (clone)
        </Typography>
        <nav>
          <Link component={RouterLink}
                to="/"
                variant="button"
                color="textPrimary"
                className={classes.link}>
            Top
          </Link>
          <Link component={RouterLink}
                to="/new"
                variant="button"
                color="textPrimary"
                className={classes.link}>
            New
          </Link>
          <Button variant="outlined"
                  color="default"
                  className={classes.link}
                  onClick={() => toggleTheme()}>
            🔦
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

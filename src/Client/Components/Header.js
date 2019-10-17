import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#95C2B7",
    color: "white",
    width: "414px",
    height: "52px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">Quiz Room</Typography>
    </div>
  );
}

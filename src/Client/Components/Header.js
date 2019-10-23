import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  root: {
    background: "#95C2B7",
    color: "white",
    height: "8%",
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

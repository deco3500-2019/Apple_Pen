import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function FilledTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
 
      <TextField
        id="filled-full-width"
        label="Question"
        style={{ margin: 8 }}
        placeholder="Enter your question here."
        fullWidth
        margin="normal"
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="filled-with-placeholder"
        multiline
        rows = "4"
        label="Answer A"
        placeholder="Enter Answer A Here."
        className={classes.textField}
        margin="normal"
        variant="filled"
      />
      <TextField
        id="filled-with-placeholder"
        multiline
        rows = "4"
        label="Answer B"
        placeholder="Enter Answer B Here."
        className={classes.textField}
        margin="normal"
        variant="filled"
      />
      <TextField
        id="filled-with-placeholder"
        multiline
        rows = "4"
        label="Answer C"
        placeholder="Enter Answer C Here."
        className={classes.textField}
        margin="normal"
        variant="filled"
      />
      <TextField
        id="filled-with-placeholder"
        multiline
        rows = "4"
        label="Answer D"
        placeholder="Enter Answer D Here."
        className={classes.textField}
        margin="normal"
        variant="filled"
      />
    </form>
  );
}

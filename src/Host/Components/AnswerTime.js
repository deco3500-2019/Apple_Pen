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
    width: 200,
  },
}));

export default function TimePickers(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="Answer time"
        type="time"
        defaultValue="00:00"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={e => {
          const sec = e.target.value.split(':').reduce((acc, time) => (60 * acc) + +time);
          props.callBack(sec);
        }}
    />
    </form>
  );
}

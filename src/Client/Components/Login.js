import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		width: "414px",
		height: "788px",
		background: "#E1CCBD",
		color: "black",
	},
	button: {
		marginTop: "10px",
		background: "#95C2B7",
		width: "170px",
		height: "40px"
	},
	textField: {
		background: "#F2F2F2",
		border: "1px solid #BBBBBB",
	}
}));

export default ({setUser}) => {
	const classes = useStyles();
	let username = "";
	return (
		<div className= {classes.root} >
			<Grid container alignContent="center" direction="column" >
				<Grid item container sm justify="center" alignContent="flex-end">
					<TextField
						onChange={e => username = e.target.value}
						id="filled-username-input"
						label="Enter Username"
						className={classes.textField}
						type="username"
						name="username"
						autoComplete="username"
						margin="normal"
						variant="filled"
					/>
				</Grid>
				<Grid item container justify="center" sm>
					<Button
						variant="filled"
						className= {classes.button}
						onClick= {() => setUser(username)}
					>
						Join
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}


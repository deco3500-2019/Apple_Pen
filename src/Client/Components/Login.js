import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		width: "414px",
		height: "788px",
		background: "#E1CCBD",
		color: "black",
	},
	margin: {
		margin: theme.spacing(1),
	},
	button: {
		marginTop: "10px",
		background: "#95C2B7",
		width: "170px",
		height: "40px"
	},
}));

export default ({setUser}) => {
	const classes = useStyles();
	let username = "";
	return (
		<div className= {classes.root} >
			<Grid container alignContent="center">
				<Grid item container sm={12} justify="center">
					<FormControl className={classes.margin}>
						<InputLabel htmlFor="input-with-icon-adornment">Enter Username</InputLabel>
						<Input
							id="input-with-icon-adornment"
							startAdornment={
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							}
							onChange= {e => username= e.target.value}
						/>
					</FormControl>
				</Grid>
				<Grid item container justify="center" sm={12}>
					<Button
						variant="filled"
						className= {classes.button}
						onClick= {() => setUser(username)}
					>
						Login
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

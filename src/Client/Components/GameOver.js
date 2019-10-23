import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactApexChart from "react-apexcharts";
import { Header } from '../Components';

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		width: "100%",
		height: "100%",
		color: "black"
	},
	content: {
		fontFamily: "Impact",
		padding: "20px",
		fontSize: "30px",
		display: "flex",
		textalign: "center",
		color: "#FFFFFF"
	},
	title: {
		fontFamily: "Impact",
		padding: "20px",
		fontSize: "24px",
		display: "flex",
		textalign: "center",
		color: "#FFFFFF"
	},
	score: {
		fontFamily: "Impact",
		paddingLeft: "10px",
		fontSize: "24px",
		display: "flex",
		textalign: "center",
		color: "#FFE600"
	}
}));

var colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

const options = {
	chart: {
		toolbar: {
			show: false
		}
	},
	colors: colors,
	plotOptions: {
		bar: {
			columnWidth: '45%',
			distributed: true
		}
	},
	dataLabels: {
		enabled: false,
	},
	xaxis: {
		labels: {
			style: {
				colors: colors,
				fontSize: '14px'
			}
		}
	}
}

export default ({ score, qCount }) => {
	const classes = useStyles();
	console.log(qCount);
	const series = [{ data:
		["Interaction Design", "Computer Sc.", "Software Eng."].map( major => ({
			x: major,
			y: Math.round(Math.random() * qCount * 100)
		}))
	}]


	return (
		<div className={classes.root} >
			<Grid container alignContent="center" direction="column" >
				<Grid item container sm justify="center">
					<div className={classes.title}>
						<p>Your Score Is: </p>
						<div className={classes.score}>
							<p>{score}</p>
						</div>
					</div>
				</Grid>
				<Grid item container justify="center" sm>
					<div className={classes.content}>TOP 3 MAJORS</div>
				</Grid>
				<Grid item container justify="center " sm>
					<ReactApexChart
						options={options}
						series={series}
						type="bar"
						height="400"
						width="320" />
				</Grid>
			</Grid>
		</div>
	)
}
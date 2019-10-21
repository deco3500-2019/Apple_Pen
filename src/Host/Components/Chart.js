import React, { Component, Fragment } from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import api from '../../api'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		display: "flex",
		direction: "column"
	},
	item: {
		margin: "20px 0px",
		padding: "20px 0px"
	},
	button: {
		width: "100px",
		background: theme.palette.primary
	}
}));

export default class extends Component{

	state = {
		result: []
	}

	async componentDidMount() {
		api.fetchTeachersResults().then( data => {
			console.log( data );
			this.setState({result: data})
		})
		.catch( err => {
			//TODO
		})
	}

	render(){
		return(
			<ChartView
				reDirect={this.props.callBack}
				data= {this.state.result}
			/>
		)
	}
}

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

const ChartView = ({ data, reDirect }) => {
	const { root, item, button } = useStyles();

	const series =[{data: data}]

	return (
		<div className={root}>
			<Grid container direction="column" alignContent="center" spacing={6}>
				<Grid item className={item}>
					<ReactApexChart options={options} series={series} type="bar" height="500" width="500"/>
				</Grid>
				<Grid item >
					<Button variant="contained" color="primary" className={button} onClick= {reDirect}>
						Back
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}
import React, { Component, Fragment } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import api from '../../api'

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		display: "flex",
		direction: "column"
	},
	item: {
		margin: "20px 0px",
		padding: "20px 0px"
	}
});

export default class extends Component{

	state = {
		questions: [],
		answers: []
	}

	async componentDidMount() {
		api.fetchAnswers()
			.then(answers => {
				api.fetchQuestions()
					.then( questions => {
						console.log(answers, questions);
						this.setState({ answers: answers, questions: questions })
					})
					.catch( err => {
						//TODO
					})
			})
			.catch(err => {
				//TODO
			})
	}

	render(){
		const { answers, questions } = this.state
		return(
			<ChartView  answers={answers} questions={questions}/>
		)
	}
}

var colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

const options = {
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

const ChartView = ({ answers, questions }) => {
	const { root, item } = useStyles();

	const series =[{data: questions.map( (q, i) =>
		({
			x: i,
			y: answers.reduce( (acc, a) =>
				acc + (a[i] === q.answer ? 1 : 0)
				, 0)
		})
	)}]

	return (
		<div className={root}>
			<Grid container direction="column" alignContent="center" spacing={6}>
				<Grid item className={item}>
					<ReactApexChart options={options} series={series} type="bar" height="500" width="500"/>
				</Grid>
			</Grid>
		</div>
	)
}
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, StepContent, Button, Paper, Typography} from '@material-ui/core';
import {SetQuestion, AnswerTime, RightAnswer} from '../Containers'

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const question = {
	text: "",
	alternatives: ["", "", "", ""],
	timeLimit: 10,
	answer: 0
};

const callBacks = [
	[
		text => question.text = text,
		(alt, text) => question.alternatives[alt] = text
	],
	answer => question.answer = answer,
	time => {
		console.log(time);
		question.timeLimit = time
	}
];

const steps = ['Set Question & Answers', 'Set Right Answer', 'Set Answer Time'];

const Content = props => {
	const {step, callBack } = props;
	switch (step) {
		case 0:
			return <div> <SetQuestion callBack= {callBack}/> </div>;
		case 1:
			return <div> <RightAnswer callBack= {callBack}/> </div>;
		case 2:
			return <div> <AnswerTime callBack= {callBack}/> </div>;
		default:
			return 'Unknown step';
	}
}

export default props => {

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const callBack = callBacks[activeStep];

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		props.postQuestion(question);
		setActiveStep(0);
	};

	return (
	<div className={classes.root}>
		<Stepper activeStep={activeStep} orientation="vertical">
		{steps.map((label, index) => (
			<Step key={label}>
				<StepLabel>{label}</StepLabel>
				<StepContent>
					<Typography>
						<Content step= {activeStep} callBack= {callBack}/>
					</Typography>
					<div className={classes.actionsContainer}>
						<div>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.button}
							>
							Back
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleNext}
								className={classes.button}
							>
							{activeStep === steps.length - 1 ? 'Post' : 'Next'}
							</Button>
						</div>
					</div>
				</StepContent>
			</Step>
			))}
		</Stepper>
		{activeStep === steps.length && (
		<Paper square elevation={0} className={classes.resetContainer}>
			<Typography>Post success! - Students will receive it.</Typography>
			<Button onClick={handleReset} className={classes.button}>
				Set Another Question
			</Button>
		</Paper>
		)}
	</div>
	)
}

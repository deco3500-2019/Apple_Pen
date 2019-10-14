import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, StepContent, Button, Paper, Typography} from '@material-ui/core';
import {SetQuestion, AnswerTime, RightAnswer} from '../Containers'

const styles = theme => ({
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
});

function getSteps() {
  return ['Set Question & Answers', 'Set Right Answer', 'Set Answer Time'];
}

const Content = props => {
  const { step } = props;
  switch (step) {
	case 0:
	  return <div>
		<SetQuestion update= { content =>
		  this.question.text = content
		}/>
	  </div>;
	case 1:
	  return <div>
		<RightAnswer update= {content => {

		}}/>
	  </div>;
	case 2:
	  return <div>
		<AnswerTime/>
	  </div>;
	default:
	  return 'Unknown step';
  }
}

class CustomizedStepper extends Component{
	constructor(props){
		super(props);
		this.activeStep = props.activeStep;
		this.setActiveStep = props.setActiveStep;
		this.steps = getSteps();
	}

	handleNext = () => {
		this.setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	handleBack = () => {
		this.setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	handleReset = () => {
		this.setActiveStep(0);
	};

	render (){
		const { classes } = this.props;
		return (
		<div className={classes.root}>
			<Stepper activeStep={this.activeStep} orientation="vertical">
			{this.steps.map((label, index) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
					<StepContent>
						<Typography>
							<Content step= {this.activeStep}/>
						</Typography>
						<div className={classes.actionsContainer}>
							<div>
								<Button
									disabled={this.activeStep === 0}
									onClick={this.handleBack}
									className={classes.button}
								>
								Back
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={this.handleNext}
									className={classes.button}
								>
								{this.activeStep === this.steps.length - 1 ? 'Post' : 'Next'}
								</Button>
							</div>
						</div>
					</StepContent>
				</Step>
			))}
		  </Stepper>
		  {this.activeStep === this.steps.length && (
			<Paper square elevation={0} className={classes.resetContainer}>
			  <Typography>Post success! - Students will receive it.</Typography>
			  <Button onClick={this.handleReset} className={classes.button}>
				Set Another Question
			  </Button>
			</Paper>
		  )}
		</div>
		)
	}
}

//------------------IGNORE BELOW CODE, BUT DON'T TOUCH!-----------------------------------

Wrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

function Wrapper(props){
	const [activeStep, setActiveStep] = React.useState(0);
	return <CustomizedStepper {...props} activeStep= {activeStep} setActiveStep= {setActiveStep}/>
}

export default withStyles(styles)(Wrapper);
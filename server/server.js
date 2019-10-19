const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')

const app = express()
const port = 4000

const getPath = filename => path.resolve(__dirname, `${filename}.json`)

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use( (err, req, res, next) =>{
	console.log(` request ${req.path} failed - there was en error accessing files on disc: `, err);
	res.status(500).json({ error: err })
})

app.post('/addQuestion', (req, res, next) => {
	const question = req.body;
	console.log("recieved question object: ", question);
	processObjectFromFile("questions", q => {
		q.data.push(question);
		overwriteData("questions", question, next);
	}, next)
})

app.post('/getQuestion', (req, res, next) => {
	const { id } = req.body;
	processObjectFromFile(id, user => {  // First access user file
		processObjectFromFile("questions", qObj => {  // Second access question file
			if (qObj.data.length === user.answers.length) {  // No new question
				res.json({ success: false })
			} else {
				console.log(`user ${id} will be sent new question`)
				res.json({ success: true, question: qObj.data[qObj.data.length - 1] })
			}
		}, next)
	}, next)
});

app.post('/addAnswer', (req, res, next) => {
	const {id, answer} = req.body;
	console.log(`user ${id} would like to save answer: ${answer}`);
	processObjectFromFile(id, user => {
		user.answers.push(answer);
		overwriteData(id, user, next);
	}, next)
})

app.post('/getAnswers' , (req, res, next) => {
	fs.readdir(__dirname, (err, files) => {
		if (err) next(err);
		const answers = [];
		files.filter(f => f != "server.js" && f != "questions.json")
		.map(f => f.slice(0, f.length - 5))
		.forEach( filename => {
			try {
				const user = jsonStringToObject(fs.readFileSync(getPath(filename)));
			} catch (error) {
				next(error)
			}
			console.log(user)
			answers.push(user.answers[user.answers.length - 1])
		});
		console.log("Teacher is being sent answers")
		res.json(answers)
	})
})

app.post('/addUser', (req, res) => {
	const {id} = req.body;
	console.log('trying to create file for user: ', id);
	processObjectFromFile("questions", qObj => {
		overwriteData(username, { answers: Array(qObj.data.length) }, next, () => {
			res.json({ status: "OK" })
		})
	}, next)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//---------------------DATA ACCESS METHODS BELOW-----------------------------------------------------------

const processObjectFromFile = (filename, handleData, errorHandler) => {
	fs.readFile(getPath(filename), 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
			errorHandler(err)
		}
		try {
			const obj = JSON.parse(jsonString);
			handleData(obj)
		} catch (error) {
			console.log("error parsing json file:", error);
			errorHandler(err)
		}
	})
}

const overwriteData = (filename, obj, errorHandler, success) => {
	try {
		const jsonString = JSON.stringify(obj)
	} catch (error) {
		errorHandler(error);
	}
	fs.writeFile(getPath(filename), jsonString, err => {
		if (err) {
			errorHandler(err)
		} else {
			success && success();
			console.log('Successfully overwrote file')
		}
	})
}
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

app.post('/addQuestion', (req, res, next) => {
	const question = req.body;
	console.log("recieved question object: ", question);
	processObjectFromFile("questions", questions => {
		questions.data.push(question);
		overwriteData("questions", questions, next);
	}, next)
})

app.post('/getQuestion', (req, res, next) => {
	const userFile = req.body.id
	processObjectFromFile(userFile, user => {  // First access user file
		processObjectFromFile("questions", qObj => {  // Second access question file
			if (qObj.data.length === user.answers.length) {  // No new question
				res.json({ success: false })
			} else {
				console.log(`user ${userFile} will be sent new question`)
				res.json({ success: true, question: qObj.data[qObj.data.length - 1] })
			}
		}, next)
	}, next)
});

app.post('/addAnswer', (req, res, next) => {
	const userFile = req.body.id;
	const { id, answer } = req.body;
	console.log(`user ${id} would like to save answer: ${answer}`);
	processObjectFromFile(userFile, user => {
		user.answers.push(answer);
		overwriteData(id, user, next);
	}, next)
})

app.post('/getAnswers' , (req, res, next) => {
	processObjectsFromDir(__dirname, users => {
		const answers = users.reduce( (acc, u) => 
			acc.concat(u.answers[u.answers.length - 1])
		, [] );
		res.json({ answers: answers })
	}, next)
})

app.post('/addUser', (req, res, next) => {
	const {userFile} = req.body.id;
	console.log('trying to create file for user: ', id);
	processObjectFromFile("questions", question => {
		overwriteData(userFile, { answers: Array(question.data.length) }, next, () => {
			res.json({ status: "OK" })  // Make sure client can proceed with login
		})
	}, next)
})

// Error handler. Used by performing the callback "next(err)" middleware
app.use((err, req, res, next) => {
	console.log(` request ${req.path} failed - there was en error accessing files on disc: `, err);
	res.status(500).json({ error: err })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//---------------------DATA ACCESS METHODS BELOW-----------------------------------------------------------

const processObjectFromFile = (filename, handleData, errorHandler) => {
	fs.readFile(getPath(filename), 'utf8', (err, jsonString) => {
		if (err) return errorHandler(err)
		try {
			const obj = JSON.parse(jsonString);
			handleData(obj)
		} catch (error) {
			errorHandler(err)
		}
	})
}

const overwriteData = (filename, obj, errorHandler, success) => {
	try {
		const jsonString = JSON.stringify(obj)
		fs.writeFile(getPath(filename), jsonString, err => {
			if (err) {
				return errorHandler(err)
			} else {
				success && success();
				console.log('Successfully overwrote file')
			}
		})
	} catch (error) {
		errorHandler(error);
	}
}

const processObjectsFromDir = (dirname, handleData, handleError) => {
	fs.readdir(dirname, (err, files) => {
		if (err) return handleError(err);
		const objects = files.filter(f => f != "server.js" && f != "questions.json")
			.map(f => f.slice(0, f.length - 5))
			.reduce( (acc, filename) => {
				try {
					const obj = JSON.parse(fs.readFileSync(getPath(filename)));
					return acc.concat(obj)
				} catch (error) {
					handleError(error)
				}
			}, [] );
		handleData(objects)
	})
}
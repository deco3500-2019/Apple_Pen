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

app.post('/addQuestion', (req, res) => {
	console.log("recieved question object: ", req.body)
	addQuestion(req.body)
})

app.post('/getQuestions', (req, res) => {
	const { id } = req.body;
	processObjectFromFile(id, user => {  // First access users file. TODO: error handling
		processObjectFromFile("questions", qObj => {  // Second access question file
			if (qObj.data.length === user.answers.length) {  // No new question
				res.json({ success: false })
			} else {
				console.log(`user ${id} successfully accessed questions`)
				res.json({ success: true, question: qObj.data[qObj.data.length - 1] })
			}
		})
	})
});

app.post('/addAnswer', (req, res) => {
	const {id, answer} = req.body;
	console.log(`user ${id} would like to save answer: ${answer}`);
	addAnswer(id, answer)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//---------------------DATA ACCESS METHODS BELOW-----------------------------------------------------------

const processObjectFromFile = (filename, handleData) => {
	fs.readFile(getPath(filename), 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
			return
		}
		handleData(jsonStringToObject(jsonString))
	})
}

const jsonStringToObject = jsonString => {
	try {
		const object = JSON.parse(jsonString);
		return object;
	} catch (err) {
		console.log('Error parsing JSON string:', err)
	}
}

const overwriteData = (filename, object) => {
	const jsonString = JSON.stringify(object);
	fs.writeFile(getPath(filename), jsonString, err => {
		if (err) {
			console.log('Error writing file', err)
		} else {
			console.log('Successfully overwrote file')
		}
	})
}

const insertUser = username => overwriteData(username, { answers: [] })

const addQuestion = qObj => {
	processObjectFromFile("questions", q => {
		q.data.push(qObj);
		overwriteData("questions", q);
	})
}

const addAnswer = (id, answer) => {
	processObjectFromFile(id, user => {
		user.answers.push(answer);
		overwriteData(id, user);
	})
}
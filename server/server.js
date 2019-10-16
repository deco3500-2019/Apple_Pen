const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')

const app = express()
const port = 4000

const DATA_PATH = path.resolve(__dirname, 'data.json');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/addQuestion',
	(req, res) => {
		console.log("recieved question object: ", req.body)
		addQuestion(req.body)
	}
)

app.post('/getQuestions', (req, res) => {
	const { id } = req.body;
	processDataObject( obj => {
		const user = obj.users.find( u => u.name == id) //find user in data.json
		if (obj.questions.length === user.answers.length) {  // No new question
			res.json({ success: false })
		} else {
			console.log(`user ${id} requested questions`)
			console.log('when fetching questions, in file, found user obj: ', user);
			res.json({ success: true, question: obj.questions[obj.questions.length - 1]})
		}
	})
});

app.post('/addAnswer', (req, res) => {
	const {id, answer} = req.body;
	console.log(`user ${id} would like to save answer: ${answer}`);
	addAnswer(id, answer)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//---------------------DATA ACCESS METHODS BELOW-----------------------------------------------------------

const processDataObject = handleData => {
	fs.readFile(DATA_PATH, 'utf8', (err, jsonString) => {
		if (err) console.log("File read failed:", err);
		handleData(jsonStringToObject(jsonString));
	});
}

const jsonStringToObject = jsonString => {
	try {
		const object = JSON.parse(jsonString);
		return object;
	} catch (err) {
		console.log('Error parsing JSON string:', err)
	}
}

const overwriteData = object => {
	const jsonString = JSON.stringify(object);
	fs.writeFile(DATA_PATH, jsonString, err => {
		if (err) {
			console.log('Error writing file', err)
		} else {
			console.log('Successfully overwrote file')
		}
	})
}

const insertUser = username => {
	processDataObject( obj => {
		obj.users.push({
			name: username,
			answers: []
		});
		overwriteData(obj);
	})
}

const addQuestion = qObj => {
	processDataObject( obj => {
		obj.questions.push(qObj);
		overwriteData(obj);
	})
}

const addAnswer = (id, answer) => {
	processDataObject( obj => {
		const user = obj.users.find(u => u.name == id);
		user.answers.push(answer);
		overwriteData(obj);
	})
}

const deleteData = () => overwriteData({ questions: [], users: [] })
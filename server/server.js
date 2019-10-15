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

app.post('/:userid/getQuestions',
	(req, res) => {
		processDataObject( obj => {
			const user = obj.users.find( u => u.username === userid) //find user in data.json
			if (obj.questions.length === user.answers.length) {  // No new question
				res.send('Up to date')
			} else {
				res.send(obj.questions[-1])
			}
		})
	}
);

app.post('/addQuestion',
	(req, res) => {
		console.log("recieved object: ", req.body)
		addQuestion(req.body)
	}
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//---------------------DATA ACCESS METHODS BELOW-----------------------------------------------------------

const processDataObject = handleData => {
	fs.readFile(DATA_PATH, 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
		}
		console.log('File data read from disc:', jsonString);
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
	console.log("saving object: ", );
	const jsonString = JSON.stringify(object);
	fs.writeFile(DATA_PATH, jsonString, err => {
		if (err) {
			console.log('Error writing file', err)
		} else {
			console.log('Successfully wrote file')
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

const deleteData = () => overwriteData({ questions: [], users: [] })

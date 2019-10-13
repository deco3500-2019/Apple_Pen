const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')

const app = express()
const port = 4000

let response;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/',
	(req, res) => {
		response = req.body.text;
		res.send(`Hello from backend! You sent "${response}"`);
	}
);

app.post('/reply',
	(req, res) => res.send(response)
);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//---------------------DATA ACCESS METHODS BELOW-----------------------------------------------------------

const getDataobject = () => {
	const jsonString = fs.readFile(path.resolve(__dirname, 'data.json'), 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err)
			return
		}
		console.log('File data:', jsonString)
		return jsonStringToObject(jsonString);
	})
}

const jsonStringToObject = jsonString => {
	try {
		const object = JSON.parse(jsonString)
		console.log("Resulting object from string:", object)
		return object
	} catch (err) {
		console.log('Error parsing JSON string:', err)
	}
}

getDataobject();
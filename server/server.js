const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
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
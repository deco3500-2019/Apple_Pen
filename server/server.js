const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express()
const port = 4000

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/', (req, res) => {
	res.send(`Hello from backend! You sent "${req.body.text}"`)
	});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
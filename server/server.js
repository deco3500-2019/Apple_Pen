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

app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', function (req, res) {
	console.log("Browser requested index.html");
	res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/addQuestion', (req, res, next) => {
	const question = req.body;
	console.log("recieved question object: ", question);
	processObjectFromFile("questions", questions => {
		questions.data.push(question);
		overwriteData("questions", questions, next);
	}, next)
})

app.post('/getQuestion', (req, res, next) => {
	const { id: userFile } = req.body;
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
	const { id, id: userFile, answer } = req.body;
	console.log(`user ${id} would like to save answer: ${answer}`);
	processObjectFromFile(userFile, user => {
		user.answers.push(answer);
		overwriteData(userFile, user, next);
	}, next)
})

app.post('/addUser', (req, res, next) => {
	const {id: userFile, id} = req.body
	processObjectFromFile("questions", question => {
		processObjectFromFile(userFile, user => {
			console.log(`gave user ${id} file from disc`)
			res.json({ status: "OK" })
		}, err => {
			overwriteData(userFile, { answers: Array(question.data.length) }, next, () => {
				res.json({ status: "OK" })  // Make sure client can proceed with login
			})
		})
	}, next)
})

// TODO: What if multiple hosts and one of them close their tab?
app.post('/deleteFiles', (req, res, next) => {
	fs.readdir(__dirname, (err, filenames) => {
		if (err) next(err)
		filenames.filter(f => f !== "server.js").forEach( f => {
			fs.unlink(path.resolve(__dirname, f), err => {
				if (err) next(err)
			})
		})
		console.log("deleted files on disc")
	})
})

app.post('/addQuestionFile', (req, res, next) =>{
	processObjectFromFile("questions", questions => {  // check if question file already exists
		res.json({ status: "OK" })
	}, err => {
		overwriteData("questions", { data: [] }, next, () => {  // Otherwise write a new one
			res.json({ status: "OK" });
			console.log("Added new question file")
		})
	})
})

app.post('/getQuestionResults', (req, res, next) => {
	console.log('fetching results for teacher')
	processObjectFromFile("questions", obj => {
		processObjectsFromDir(__dirname, users => {
			const questions = obj.data;
			const answers = users.reduce((acc, u) => {
				acc.push(u.answers);
				return acc
			}, []);
			const data = questions.map((q, i) =>
				({
					x: i,
					y: answers.reduce((acc, a) =>
						acc + (a[i] === q.answer ? 1 : 0)
						, 0)
				})
			)
			res.json({data: data})
		}, next)
	}, next)
})

// Not used atm
app.post('/getStudentScore', (req, res, next) => {
	const {id: userFile} = req.body;
	processObjectFromFile(userFile, user => {
		processObjectFromFile('questions', questions => {
			const score = questions
				.map( (q, i) => q.answer === user.answers[i])  // Answer correct?
				.reduce( (acc, correct) => acc + (correct ? 100 : 0), 0)  // Calculate points
			res.json({ score: score })
		}, next)
	}, next)
})

app.post('/getUserCount', (req, res, next) => {
	processUserFilesInDir(__dirname, users => {
		res.json({ count: users.length })
	}, next)
})

// Error handler. Used by performing the callback "next(err)" middleware
app.use((err, req, res, next) => {
	console.log(` request ${req.path} failed - there was en error accessing files on disc: `, err);
	res.status(500).json({ error: err })
})

app.listen(port, () => console.log(`Web app listening on port ${port}.`))

//---------------------DATA ACCESS METHODS BELOW-----------------------------------------------------------

const processObjectFromFile = (filename, handleData, errorHandler) => {
	fs.readFile(getPath(filename), 'utf8', (err, jsonString) => {
		if (err) return errorHandler(err)
		try {
			const obj = JSON.parse(jsonString);
			handleData && handleData(obj)
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

const processUserFilesInDir = (dirname, handleData, handleError) => {
	fs.readdir(dirname, (err, filenames) => {
		if (err) return handleError(err);
		const trimmed = filenames.filter(f => f != "server.js" && f != "questions.json")
			.map(f => f.slice(0, f.length - 5))
		handleData(trimmed)
	})
}

const processObjectsFromDir = (dirname, handleObjects, handleError) =>{
	processUserFilesInDir(dirname, filenames => {
		const objects = filenames.reduce((acc, filename) => {
			try {
				const obj = JSON.parse(fs.readFileSync(getPath(filename)));
				return acc.concat(obj)
			} catch (error) {
				handleError(error)
			}
		}, []);
		handleObjects(objects)
	}, handleError)
}
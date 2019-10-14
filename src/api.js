import axios from "axios";

const postQuestion = qObj => axios.post('/addQuestion', qObj);

export {
	postQuestion
}
import axios from "axios";

export default {

	async postQuestion(qObj){
		axios.post('/addQuestion', qObj)
	},

	async fetchQuestions(userid) {
		return axios.post(`${userid}/getQuestions`)
			.then(res => res.data)
			.catch(err => console.log(err))
	}
}
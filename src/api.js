import axios from "axios";

export default {

	async postQuestion(qObj){
		axios.post('/addQuestion', qObj)
	},

	async fetchQuestions(userid) {
		return axios.post(`/getQuestions`, {
			id: userid
		})
			.then(res => res.data)
			.catch(err => console.log(err))
	},

	async postAnswer(userid, answer) {
		return axios.post('/addAnswer', { id: userid, answer: answer})
	}
}
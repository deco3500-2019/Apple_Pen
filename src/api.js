import axios from "axios";

export default {

	async postQuestion(qObj){
		axios.post('/addQuestion', qObj)
	},

	fetchQuestion(userid) {
		return axios.post(`/getQuestion`, {
			id: userid
		})
			.then(res => res.data)
	},

	async postAnswer(userid, answer) {
		return axios.post('/addAnswer', { id: userid, answer: answer})
	},

	fetchAnswers(){
		return axios.post('/getAnswers').then(res => res.data)
	},

	async postNewUser(userid) {
		return axios.post('/addUser', {id: userid}).then(res => res.data.status)
	}
}
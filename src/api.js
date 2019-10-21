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

	async postNewUser(userid) {
		return axios.post('/addUser', {id: userid}).then(res => res.data.status)
	},

	initiateGame(){
		return axios.post('/addQuestionFile').then(res => res.data.status)
	},

	async endGame(){
		axios.post('/deleteFiles')
	},

	fetchTeachersResults(){
		return axios.post('/getQuestionResults').then(res => res.data.data)
	},

	async fetchStudentScore(username){
		return axios.post('/getStudentScore', { id: username }).then(res => res.data.score)
	}

}
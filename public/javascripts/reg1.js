
import {validateUsername, validateEmail, validateNumber} from "./validate.js" 

 
let selector = e => document.querySelector(e) 

const userEmail = selector("#email")
const username = selector("#username")
const number  = selector("#number")

userEmail.addEventListener("blur" , event => {
	const emailFeedBack = selector(".email-feedback")
	try {
		const emailValue = validateEmail(userEmail.value.trim())
		if ( emailValue.value != null ) {
			if (emailFeedBack.classList.contains("feedback-error")) {
				emailFeedBack.classList.remove("feedback-error")
				emailFeedBack.textContent = "Okay!"
	        	emailFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "EmailError " , 
				message : "The email you provide is not valid"
			}
		}
	}catch(error) {
		emailFeedBack.textContent = error.message
		emailFeedBack.classList.add("feedback-error")
	}
})

username.addEventListener("blur" , event => {
	const nameFeedBack = selector(".username-feedback")
	try {
		const nameValue = validateUsername(username.value.trim())
		if ( nameValue.value != null ) {
			if (nameFeedBack.classList.contains("feedback-error")) {
				nameFeedBack.classList.remove("feedback-error")
				nameFeedBack.textContent = "Okay!"
	        	nameFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "NameError " , 
				message : "Please, type a valid username"
			}
		}
	}catch(error) {
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("feedback-error")
	}
})

number.addEventListener("blur" , event => {
	const numberFeedBack = selector(".number-feedback")
	try {
		const numberValue = validateNumber(number.value.trim())
		if ( numberValue.value != null ) {
			if (numberFeedBack.classList.contains("feedback-error")) {
				numberFeedBack.classList.remove("feedback-error")
				numberFeedBack.textContent = "Okay!"
	        	numberFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "NameError " , 
				message : "Please, fill in a valid phone number"
			}
		}
	}catch(error) {
		numberFeedBack.textContent = error.message
		numberFeedBack.classList.add("feedback-error")
	}
})


selector("#submit").addEventListener("click" , event => {
	const emailValue    = validateEmail(userEmail.value.trim()).value	
	const usernameValue = validateUsername(username.value.trim()).value 
	const numberValue  = validateNumber(number.value.trim()).value
	const accept = selector("#check")
	try {
		if ( emailValue != null && usernameValue != null && numberValue != null) {
			if ( accept.checked) {
				console.log("Good!")
			}else{
			    throw {
				    name : "TermsAndConditionError" , 
					message : "Kindly accept our terms and condition."
				}
				event.preventDefault()
			}
		}else {
			throw {
				name : "WrongFormValue" , 
				message : "Please, fill all neccessary fields"
			}
			event.preventDefault()
		}
	}catch(error) {
	    const errorArea = selector(".on-submit")
		errorArea.textContent = error.message 
		errorArea.classList.add("feedback-error")
		event.preventDefault()
	}
})
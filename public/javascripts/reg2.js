import {validateName , validatePassword , verifyPassword} from "./validate.js" 

let selector = e => document.querySelector(e)

const firstName  = selector("#firstname")
const lastName  = selector("#lastname")
const userPass  = selector("#password")
const checkPass = selector("#cPassword")
const answer = selector("#answer")

firstName.addEventListener("blur" , event => {
	const nameFeedBack = selector(".firstname-feedback")
	try {
		const nameValue = validateName(firstName.value.trim())
		if ( nameValue.value != null ){
			if (nameFeedBack.classList.contains("feedback-error")) {
				nameFeedBack.classList.remove("feedback-error")
				nameFeedBack.textContent = "Okay!"
	        	nameFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "NameError " , 
				message : "First Name should only contain alphabets."
			}
        }
	}catch(error) {
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("feedback-error")
	}
})

lastName.addEventListener("blur" , event => {
	const nameFeedBack = selector(".lastname-feedback")
	try {
		const nameValue = validateName(lastName.value.trim())
		if ( nameValue.value != null ) {
			if (nameFeedBack.classList.contains("feedback-error")) {
				nameFeedBack.classList.remove("feedback-error")
				nameFeedBack.textContent = "Okay!"
	        	nameFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "NameError " , 
				message : "Last Name should only contain alphabets."
			}
		}
	}catch(error) {
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("feedback-error")
	}
})
userPass.addEventListener("blur" , event => {
	const passwordFeedBack = selector(".password-feedback")
	const passwordValue = validatePassword(userPass.value.trim())
	console.log(passwordValue.value , passwordValue.name)
	try {
		if ( passwordValue.value) {
			if (passwordFeedBack.classList.contains("feedback-error")) {
				passwordFeedBack.classList.remove("feedback-error")
				passwordFeedBack.textContent = "Okay!"
	        	passwordFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "PasswordError " , 
				message : "Password must be at least 5 characters long."
			}
		}
	}catch(error) {
		passwordFeedBack.textContent = error.message
		passwordFeedBack.classList.add("feedback-error")
	}
})

checkPass.addEventListener("blur" , event => {
	const passwordFeedBack = selector(".cPassword-feedback")
	const checkpasswordValue = verifyPassword(userPass , checkPass)
	try {
		if ( checkpasswordValue.value) {
			if (passwordFeedBack.classList.contains("feedback-error")) {
				passwordFeedBack.classList.remove("feedback-error")
				passwordFeedBack.textContent = "Okay!"
	        	passwordFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "PasswordError " , 
				message : "Password doesn't match"
			}
		}
	}catch(error) {
		passwordFeedBack.textContent = error.message
		passwordFeedBack.classList.add("feedback-error")
	}
})

answer.addEventListener("blur" , event => {
	const nameFeedBack = selector(".answer-feedback")
	try {
		if ( answer.value != null ){
			if (nameFeedBack.classList.contains("feedback-error")) {
				nameFeedBack.classList.remove("feedback-error")
				nameFeedBack.textContent = "Okay!"
	        	nameFeedBack.classList.add("feedback-success")
			}	
		}else {
			throw {
				name : "NameError " , 
				message : "Please, provide an answer."
			}
        }
	}catch(error) {
		nameFeedBack.textContent = error.message
		nameFeedBack.classList.add("feedback-error")
	}
})

selector("#submit").addEventListener("click" , event => {	
	const firstnameValue     = validateName(firstName.value.trim()).value
	const lastnameValue     = validateName(lastName.value.trim()).value
	const passValue     = validatePassword(userPass.value.trim()).value
	const checkpassValue = validatePassword(checkPass.value.trim()).value
	const answerValue = answer.value.trim()
    const errorArea = selector(".on-submit")
	try {
		if (firstnameValue != null && lastnameValue != null && passValue != null && checkpassValue != null && answerValue != null) {
			console.log("Good!")  
		}else {
			throw {
				name : "WrongFormValue" , 
				message : "Please, fill all neccessary fields"
			}
			event.preventDefault()
		}
	}catch(error) {
		errorArea.textContent = error.message 
		errorArea.classList.add("feedback-error")
		event.preventDefault()
	}
})

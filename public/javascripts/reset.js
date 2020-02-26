import {validatePassword , verifyPassword} from "./validate.js" 

let selector = e => document.querySelector(e)

const userPass  = selector("#password")
const checkPass = selector("#cPassword")

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

selector("#submit").addEventListener("click" , event => {	
	const passValue     = validatePassword(userPass.value.trim()).value
	const checkpassValue = validatePassword(checkPass.value.trim()).value
    const errorArea = selector(".on-submit")
	try {
		if (passValue != null && checkpassValue != null) {
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

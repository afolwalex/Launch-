let selector = e => document.querySelector(e)

let facebookButton = selector("#facebook")
let googleButton = selector("#google")

facebookButton.addEventListener("click", event => {
    event.preventDefault()
    const facebookMessage = selector(".facebook-message")
    facebookMessage.textContent = "Facebook Signup will be available soon."
})

googleButton.addEventListener("click", event => {
    event.preventDefault()
    const facebookMessage = selector(".google-message")
    facebookMessage.textContent = "Google Signup will be available soon."
})
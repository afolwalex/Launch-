
let selector = e => document.querySelector(e) 
selector("#picture").addEventListener('change' , showImage) 

function showImage() {
	let files = this.files 
	let f = files[0] 
	let span = document.createElement('p') 
	span.textContent = f.name 
	selector("#displayImage").append(span) 
	if ( files.length === 0) {
		selector("#displayImage").textContent = "No file Selected" 
		return 
	} 
	let reader = new FileReader() 
	reader.onload = function(event) {
		let img = new Image() 
		img.onload = function() {
		    selector("#displayImage").append(img)
		}
		img.src = event.target.result 
		img.style.width = '150px'
		img.style.height = '150px'
		img.style.borderRadius = "15px"
	}
	reader.onerror = function(event) {
		selector("#displayImage").textContent = "An error just occured"
	}
	reader.readAsDataURL(files[0]) 
} 


const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const UserSchema = new Schema({
	email : {type : String},
    username : {type : String}, 
    number : {type : String},
	firstName : {type : String } , 
	lastName : {type : String } ,
    password : {type : String},
    secret : {type : String,},
    picture : {type : String},
    country : {type : String},
    state : {type : String},
	createdOn : {type : Date , default : Date.now()}
})

UserSchema.virtual('url').get(function() {
	return `/reset-password/${this.username}`
})

module.exports = mongoose.model('User' , UserSchema)
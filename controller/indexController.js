const Book = require('../model/book')

class App {
    constructor() {
		this.name = "Books Galore - Ready when you are ready"
	}
	description(){
		return {
			name : this.name , 
			developer : this.developer 
		}
	}
	/**
	  * Controls get request to the home page 
	*/
	getIndex = (req , res , next) => {
		res.render('index' , { title  : this.description().name })
	}
	
	bookLists = async (req, res, next) => {
        try{
            const books = await Book.find()
            if(books){
                if(books.length !== 0){
                    res.render('books' , {books : books})
                }else{
                    res.render('books' , {message : "No Books available yet"})
                }  
            }else {
                throw{
                    name: "Server Error",
                    message: "This is an error from the server."
                }
            }
        } catch(error){
            res.json(error.message)
        }
    }

    viewBook = async(req, res, next) => {
        try{
            let book = await Book.findOne({title : req.params.bookie})
            if(book){
                res.render('bookie', {books : book})
            }else {
                res.render('books', {error : "Can't get Book Url"})
            }
        }catch(err){
            res.json(err)
        }
    }
    getRecommendPage = (req , res , next) => {
		res.render('recommendation' , { title  : "Recommend"})
	}
}

const returnApp = new App()

module.exports = returnApp 
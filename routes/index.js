var express = require('express');
var router = express.Router();
const UserController = require('../controller/user_controller')

const multer = require('multer')

let storage = multer.diskStorage({
	destination : function(req , file , cb) {
		cb(null , './public/uploads/profile')
	} , 
	filename : function(req , file , cb) { 
	    let f = req.session.email + file.originalname 
		cb(null , f) 
	}
})

let upload = multer({storage : storage})
router.get('/', UserController.getIndex)
router.get('/login' , UserController.getLogin)
router.post('/login', UserController.postLogin)
router.get('/register/1' , UserController.getFirstDetails)
router.post('/register/1', UserController.postFirstDetails)
router.get('/register/2' , UserController.getSecondDetails)
router.post('/register/2', UserController.postSecondDetails)
router.get('/register/3' , UserController.getThirdDetails)
router.post('/register/3', upload.single('picture'), UserController.postThirdDetails)
router.get('/profile' , UserController.getDashboard)
router.get('/logout', UserController.getLogout)

module.exports = router;

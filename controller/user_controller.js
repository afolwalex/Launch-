const User = require('../model/user')
const {check , validationResult } = require('express-validator') 
const {sanitizeBody }  = require('express-validator')
const {sanitizeParam } = require('express-validator')
const bcrypt           = require('bcryptjs')
const fs               = require('fs')
const path             = require('path')

class App {

    getIndex = (req , res , next) => {
		res.render('index' , { title  : "Launch" })
    }

    getFirstDetails = (req , res , next) => {
		res.render('reg1' , { title  : "Step One" })
    }

    postFirstDetails = [
        check('email').not().isEmpty().isEmail().normalizeEmail().trim()
        .withMessage('Please , provide a valid email ')
        .custom(value => {
            return User.findOne({'email' : value}).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use')	
                }
            })
        }), 
        check('username').not().isEmpty().trim()
        .withMessage('Please, provide your username')
        .custom(value => {
            return User.findOne({'username' : value}).then(user => {
                if (user) {
                    return Promise.reject('Username already in use')	
                }
            })
        }),
        check('number').not().isEmpty().trim()
        .withMessage('Please, provide your phone number')
        .custom(value => {
            return User.findOne({'number' : value}).then(user => {
                if (user) {
                    return Promise.reject('Phone Number already in use')	
                }
            })
        }),         
        sanitizeBody('*').escape(),  
        async (req , res , next) => { 
            const errors = validationResult(req)
            if (!errors.isEmpty()) { 
                res.render('reg1' , {errors : errors.array()}) 
                return
            }else {
                try {	
                    const {email, username, number }  = req.body 
                    let user = new User({
                        email : email,
                        username : username,
                        number : number,
                    })
                    let ret = await user.save()
                    if ( ret ) {
                        req.session.email = user.email 
                        res.redirect(303, '/register/2')
                    }else {
                        throw {
                            name : "Error",
                            message: "Something is wrong somewhere"
                        }
                    }
                }catch(error) {
                    res.json({message : error.message, status : error.status})
                    return
                }
            }
        }
    ] 

    getSecondDetails = (req , res , next) => {
        if(req.session.email){
            res.render('reg2' , { title  : "Step Two" })
        }else{
            res.render("notfound")
        }
    }

    postSecondDetails = async (req, res, next) => {
        if(req.session.email){
            try{
                let user = await User.findOne({email : req.session.email})
                if(user){
                    let userID = user._id
                    let userPass = await bcrypt.hash(req.body.password , 10)
                    User.findByIdAndUpdate(userID, {
                        firstName: req.body.firstname,
                        lastName : req.body.lastname,
                        password : userPass,
                        secret : req.body.answer,
                        country : req.body.country,
                        state : req.body.state
                    }, {new : true, useAndModify : false}, (err , item) => {
                        if(err){
                          res.status(500)
                          return
                        }else {
                            res.redirect(303, '/register/3')
                        }
                        })
                }else{  
                    throw{
                        name : "User Error",
                        message : "User not found"
                    }
                }
            }catch(err){
              res.json({error : error.message})
            }
        }else {
            res.redirect(303 , '/')
            return 
        }
    }


    getThirdDetails = (req , res , next) => {
        if(req.session.email){
            res.render('reg3' , { title  : "Step 3" })
        }else{
            res.render("notfound")
        }	
    }

    postThirdDetails = async(req, res, next) => {
        if(req.session.email){
            try {
                if (req.file) { 
                    let originalName = req.file.originalname 
                    let user = await User.findOne({email : req.session.email}) 
                    let name = req.session.email
                    let update = await User.findByIdAndUpdate(user._id , {
                        picture : name+originalName
                    } , {new : true}) 
                    if ( update ) {
                        res.redirect(303 , '/profile')
                    }else{
                        res.send("Unable to save Image")
                    }
                }else {
                    throw{
                        name : "File Error",
                        message : "File not found."
                    }
                }
            }catch(err){
                res.json({message : err.message})
            }
        }else {
            res.redirect(303, '/')
        }    
    }

    getDashboard = async (req , res , next) => {
        if(req.session.email){
            let user = await User.findOne({email : req.session.email})
            res.render('dashboard' , { title  : "Profile", user: user })
        }else{
            res.render("notfound")
        }
    }

    getLogin = (req , res , next) => {
		res.render('login' , { title  : "Launch" })
    }
    

    postLogin = [
        sanitizeBody('*').escape() , 
        async (req , res , next) => {
            try { 
                let user = await User.findOne({email : req.body.email})
                if(user){
                    let validUser = await bcrypt.compare(req.body.password , user.password)
                    if (validUser) {
                        req.session.email = user.email 
                        res.redirect(303 , '/profile')
                    }else {
                        res.render('login' , { error : 'Invalid Login details'})
                    }
                }else {
                    res.render('login' , { error : 'Invalid Login details'})
                }
            }catch(errors) {
                res.render('login' , {error : errors})
            }
        }
    ]

    updateDetails = async (req, res, next) => {
        if(req.session.email){
            try{
                let user = await User.findOne({email : req.session.email})
                if(user){
                    let userID = user._id
                    User.findByIdAndUpdate(userID, {
                        firstName: req.body.firstname,
                        lastName : req.body.lastname,
                        country : req.body.country,
                        state : req.body.state
                    }, {new : true, useAndModify : false}, (err , item) => {
                        if(err){
                          res.status(500)
                          return
                        }else {
                            res.render('dashboard', {message : "Details has been successfully updated. You can reload your page now.", user: user})
                        }
                        })
                }else{  
                    throw{
                        name : "User Error",
                        message : "User not found"
                    }
                }
            }catch(err){
              res.json({error : error.message})
            }
        }else {
            res.redirect(303 , '/')
            return 
        }
    }

    getLogout = (req , res , next ) => {
        try {
            if (req.session.email) {
                delete req.session.email
                res.redirect(303 , '/login')
            }else {
                throw new Error("Problem signing out. We will handle this shortly")
            }
        }catch(error) {
          res.status(400).json({message : error})

        }
    }

    resetPage = (req , res , next) => {
		res.render('reset' , { title  : "Reset Password" })
    }

    postReset = [
        sanitizeBody('*').escape() , 
        async (req , res , next) => {
            try { 
                let user = await User.findOne({email : req.body.email})
                if(user){
                    if(user.secret === req.body.answer){
                        req.session.email = user.email 
                        res.redirect(303, user.url)
                    }else {
                        res.render('reset' , { error : 'Wrong Secret Answer'})
                    }
                }else{
                    res.render('reset', {error : "Email isn't registered"})
                }
            }catch(errors) {
                res.render('reset' , {error : errors})
            }
        }
    ]

    newPasswordPage = (req , res , next) => {
        if(req.session.email){
            res.render('new-password' , { title  : "Reset Password" })
        }else{
            res.render("notfound")
        }
    }

    setNewPassword = async (req, res, next) => {
        if(req.session.email){
            try{
                let user = await User.findOne({username : req.params.url})
                if(user){
                    let userID = user._id
                    let userPass = await bcrypt.hash(req.body.password , 10)
                    User.findByIdAndUpdate(userID, {
                        password : userPass
                    }, {new : true, useAndModify : false}, (err , item) => {
                        if(err){
                          res.status(500)
                          return
                        }else {
                            delete req.session.email
                            res.redirect(303, '/login')
                        }
                        })
                }else{  
                    throw{
                        name : "User Error",
                        message : "User not found"
                    }
                }
            }catch(err){
              res.json({error : error.message})
            }
        }else {
            res.redirect(303 , '/')
            return 
        }
    }

}

const returnApp = new App()

module.exports = returnApp 
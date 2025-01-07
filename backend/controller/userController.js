var userModel = require('../model/userSchema')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        if (data.name === '' || data.email === '' || data.password === '')
            throw new Error('All fields are required')

        if (!data.email.includes('@gmail.com'))
            throw new Error('Invalid Email')

        let userData = await userModel.findOne({ email: data.email })
        if (userData) throw new Error('User Already Exists')

        if (data.password.length < 8)
            throw new Error('Password must be at least 8 characters long')

        req.body.password = await bcrypt.hash(req.body.password, 10)
        let newUser = await userModel.create(data)

        // Send welcome email
        // await sendWelcomeEmail(data.email, data.name);

        res.status(200).json({
            status: 'Success',
            Message: 'User Created Successfully',
            Data: newUser
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}


exports.getUser = async (req , res) => {

    try {
        let userData = await userModel.find()
        res.status(200).json({
            status : 'Success' , 
            Message : 'User Get Successfully' , 
            Data : userData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}


exports.loginUser = async (req , res) => {

    try {

        if(req.body.email === '' || req.body.password === '')
        throw new Error('All fields are required')

        let loginData = await userModel.findOne({email : req.body.email})
        if(!loginData) throw new Error('User Not Found')
            
        let verifyPassword = await bcrypt.compare(req.body.password , loginData.password)
        if(!verifyPassword) throw new Error('Invalid Password')
          
        let token = jwt.sign({ id : loginData._id , name : loginData.name}, 'ashish')
        
        res.status(200).json({
            status : 'Success' , 
            Message : 'User Login Success', 
            Data : loginData ,
            token
        })
        
    } catch (error) {
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}
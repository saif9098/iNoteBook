const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const FetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'noOneJustMe' 

const router = express.Router();

     //Route-1 create a user using post "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'please put atleast 3 letters').isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'password should uniqe andcontain atleast 5 character ').isLength({ min: 5 })
], async (req, resp) => {
    let success =false;
    //if there are errors,return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }
    //user with this email already exist
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return resp.status(400).json({ success, error: 'please enter unique value' });
        }

        const salt = await bcrypt.genSalt(10);
        const securPass = await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securPass
        })
        const data ={
            user:{id: user.id}//bcz id is unique value for each user ,generated by mongodb
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        //.then(user=>resp.json(user)).catch(err=>{console.log(err)
       // resp.json(user)
       success = true;
    resp.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        resp.status(500).send("some error occured")

    }



});
//Route -2 authenticate a user using post "/api/auth/login"
router.post('/login', [
    body('email', 'enter valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
    
], async (req, resp) => {
    let success = false;
    //if there are errors,return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }

const {email,password}=req.body;
try{
    let user = await User.findOne({email});
    if(!user){
        return resp.status(400).json({error:'please try to login with correct credentials'})
    }
    const passwordCompare = await bcrypt.compare(password,user.password)
   
    if(!passwordCompare){
        success =false
        return resp.status(400).json({success, error:'please try to login with correct credentials'})
    }
    const data ={
        user:{id: user.id}//bcz id is unique value for each user ,generated by mongodb
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    
    success = true;
    resp.json({ success, authtoken })
} catch (error) {
    console.error(error.message);
    resp.status(500).send("internal server error")

}
})

//Route -3 //get loggedin user detail

router.post('/getuser',FetchUser, async (req,resp)=>{

    try {
       const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        resp.send(user)
    } catch (error) {
        console.error(error.message);
    resp.status(500).send("internal server error")

    }

})

module.exports = router;
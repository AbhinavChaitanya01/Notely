const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

var fetchuser = require("../middleware/fetchuser.js")
// We shall be using JSON web token (JWT)
// JWTs or JSON Web Tokens are most commonly used to identify an authenticated user. 
// They are issued by an authentication server and are consumed by the client-server (to secure its APIs).
// It is encoded by three parts namely { algorithms and token type, data, signature }

// const JWTSECRET = "This_Has_Be_en_Gr8metHo_DtOVeriFy_ThEUsE_Rs_b&&&T";


// ROUTE 1: CREATE a user using : POST "/api/auth/createuser" No login required

router.post("/createuser",[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],async(req,res)=>{
    let success= false;
    // console.log(req.body)
    // const user = User(req.body);
    // user.save();

    // if bad request return errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether a user with this email already exists:

    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
//             
            return res.status(400).json({success, error: "account with this email already exists!"});
        }
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email:req.body.email,
            password: secPass,
        });
        const data= {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,process.env.JWTSECRET);
        success= true;
        res.json({success, authToken});
    } catch (error){
//        
        res.status(500).send("Some error occured");
    }
    // .then(user => res.json(user))
    // .catch(err=>{
    // res.json({error: "account with this email already exists!"})});
})

// ROUTE 2: AUTHENTICATE a user using : POST "/api/auth/login"
router.post("/login",[
    body('email').isEmail(),
    body('password').exists()
],async(req,res)=>{
    let success= false;
    // if bad request return errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"incorrect credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error:"incorrect credentials"});
        }

        const data= {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,process.env.JWTSECRET);
        success=true;
        res.json({success,authToken});

    } catch (error) {
        
        res.status(500).send("internal server error");
    }
})

// ROUTE 3: get logged in user details using : POST "/api/auth/getuser", login REQUIRED.
// Creating a middleware to decode a user from a jwt

router.post("/getuser",fetchuser,async (req,res)=>{
    try {
        const userId= req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
       
        res.status(500).send("internal server error");
    }
})


module.exports = router;

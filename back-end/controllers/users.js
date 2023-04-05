const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validation/verify')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//REGISTER
const registerUser = async (req, res) => {
    try {

        const  {error}  = await registerValidation(req.body);
        if (error) return res.json({msg:error.message});

        // emailExists
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.json({ msg: `Email already exist` });

        // password encryption
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            // name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            // mobile: req.body.mobile
        })
        const SaveData = await newUser.save();
        if(SaveData) return res.json({ msg:'Register sucessfully' });

    } catch (error) {
        console.log({ msg: error });
    }

}


//LOGIN

const loginUser = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) return res.json({msg:error.message});


        // email Validation 
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) return res.json({ msg: `Invalid Email` });
    
        // password Validation 
        const isPass = await bcrypt.compare(req.body.password, userExist.password);
        if (!isPass) return res.json({ msg: `Invalid password` });
        
        // JWT Token 
        const token = jwt.sign({
            _id: userExist._id,
            email: userExist.email,
            password: userExist.password
        }, process.env.Token_secret);
        res.header('auth-token', token).json({ msg: `login success` });
    
       if(userExist && isPass){
        return  res.json({ msg: `login successfull` });
       }
    } catch (error) {
   console.log(error);
    }
}

module.exports = { registerUser, loginUser }

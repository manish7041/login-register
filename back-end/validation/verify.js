const joi = require('joi');

const registerValidation = (data)=>{
    const schema=joi.object({
        // name:joi.string().required().min(2).max(8),
        email:joi.string().required().email(),
        password:joi.string().required().min(4).max(10)  ,
        // mobile:joi.number().required().min(1000000000).max(9999999999)
    
    })
    return schema.validate(data)  
}

const loginValidation=(data)=>{
    const schema = joi.object({
        email:joi.string().required().email(),
        password:joi.string().required().min(4).max(10) 
    })
    return schema.validate(data)
}
module.exports={registerValidation,loginValidation} 

import user from "../../DB/models/user.model.js";

const uniqueEmail = async (req,res,next)=>{
    const {email} = req.body;
    const test = await user.findOne({where: {email: email}});
    if(test){
        return res.status(400).json({msg:'Email already exists'});
    }
    
    next();
}

export default uniqueEmail
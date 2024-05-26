import user from "../../DB/models/user.model.js";

const userExist = async (req,res,next)=>{
    let {UserId} = req.body
    let auser = await user.findOne({where : {id : UserId}})
    if(!auser){
        return res.status(400).json({msg: 'user not found'})
    }
    next();
}

export default userExist
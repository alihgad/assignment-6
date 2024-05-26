import user from "../../DB/models/user.model.js";

export default async (req , res , next)=>{
    const {UserId} = req.body;
    const auser = await user.findOne({where: {id : UserId}});
    if(!auser){
        return res.status(404).json({msg: 'user not found'})
    } 
    next();
}
import user from "../../DB/models/user.model.js";

export default async (req , res , next)=>{
    const {id} = req.params;
    const auser = await user.findOne({where: {id}});
    if(!auser){
        return res.status(404).json({msg: 'user not found'})
    } 
    next();
}
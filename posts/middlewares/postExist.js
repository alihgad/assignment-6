import post from "../../DB/models/post.model.js";

export default async (req , res , next)=>{
    const {id} = req.params;
    const auser = await post.findOne({where: {id}});
    if(!auser){
        return res.status(404).json({msg: 'post not found'})
    } 
    next();
}
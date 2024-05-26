import comment from "../../DB/models/comment.model.js";

const commentExist = async (req,res,next)=>{
    let {id} = req.params
    let auser = await comment.findOne({where : {id}})
    if(!auser){
        return res.status(400).json({msg: 'comment not found'})
    }
    next();
}

export default commentExist;
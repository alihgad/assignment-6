import post from "../../DB/models/post.model.js";

const postExist = async (req,res,next)=>{
    let {PostId} = req.body
    let apost = await post.findOne({where : {id : PostId}})
    if(!apost){
        return res.status(400).json({msg: 'post not found'})
    }
    next();
}

export default postExist;
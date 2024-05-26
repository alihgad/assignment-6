import post from "../../DB/models/post.model.js";

export default async (req , res , next)=>{
    const {UserId} = req.body;
    let {id} = req.params;
    let data = await post.findAll();
    let posts =  data.filter(post => post.softDelete == false)
    let userPosts =  posts.filter((post) =>{
        // console.log(post.dataValues.UserId);
       return post.dataValues.UserId == UserId
    });

    
    let isHisPost = userPosts.filter(post => post.id == id)
    console.log(isHisPost);

    if(isHisPost.length == 0){
        return res.status(404).json({msg: 'access denied its not your post !!!'});
    } 
    
    next();
}
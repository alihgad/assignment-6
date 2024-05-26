import comment from "../../DB/models/comment.model.js";

export default async (req, res, next) => {

    const { UserId } = req.body;
    
    let { id } = req.params;
    let comments = await comment.findAll();

    let usercomments = []
    for (let i = 0; i < comments.length; i++) {

        if (comments[i].dataValues.UserId == UserId) {
            usercomments.push(comments[i]);
        }
    }
    console.log(usercomments);
    let isHisComment = usercomments.findIndex(comment => comment.id == id);
    console.log(isHisComment);

    if (isHisComment!= -1) {
        next();
        return
    }


    return res.status(404).json({ msg: 'access denied its not your comment !!!' });

   
}
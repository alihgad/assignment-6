import comment from './../DB/models/comment.model.js'

export const getcomments = async (req, res) => {
    let data = await comment.findAll()
    let comments = data.filter(comment => !comment.softDelete )
    res.json( {comments} )

}




export const addcomment = async (req, res) => {
    let { content, PostId, UserId } = req.body
    let data = await comment.create({ content, PostId, UserId })
    return res.json({ msg: "done", data })

}


export const updatecomment = async (req, res) => {
    let { id } = req.params
    let { content } = req.body


    let data = await comment.update({ content }, { where: { id } })
    return res.json({ msg: "done" })
}





export const deletecomment = async (req, res) => {
    let { id } = req.params
    let data = await comment.update({softDelete	: true} , { where: { id } })
    return res.json({ message: "done" })
}


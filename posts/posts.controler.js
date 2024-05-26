import user from '../DB/models/user.model.js'
import post from './../DB/models/post.model.js'


export const getPost = async (req, res, next) => {
    let data = await post.findAll()
    let posts = data.filter(post => post.softDelete == false)
    res.json({
        posts,
    })
}

export const getPostDetails = async (req, res, next) => {
    let { id } = req.params
    let users = await user.findAll()
    let data = await post.findAll()
    let posts = data.filter(post => post.softDelete == false)
    let apost = posts.filter(post => post.id == id)
    console.log(apost);
    if (apost.length == 0) { return res.status(404).json({ msg: 'No post found' }) }
    let auser

    for (let i = 0; i < users.length; i++) {
        if (users[i].dataValues.id == apost[0].UserId) {

            auser = users[i]
            auser.password = auser.password.toString()
            break
        }

    }



    let thepost = {
        id: apost[0].id,
        title: apost[0].title,
        content: apost[0].content,
        softDelete: apost[0].softDelete,
        createdAt: apost[0].createdAt,
        updatedAt: apost[0].updatedAt,
        author: auser

    }
    res.json({
        thepost,
    })
}

export const addPost = async (req, res, next) => {
    let { title, content, UserId, softDelete } = req.body
    let newPost = await post.create({
        title,
        content,
        UserId,
        softDelete
    })
    res.json({
        msg: 'done',
        newPost
    })
}


export const deletePost = async (req, res, next) => {
    let { id } = req.params
    let result = await post.update({ softDelete: true }, { where: { id: id } })
    res.json({
        msg: 'done',
        result
    })
}

export const updatePost = async (req, res, next) => {
    let msg = ''
    let { id } = req.params
    let { title, content } = req.body

    if (title !== undefined) {
        let result = await post.update({ title: title }, { where: { id: id } })
        msg += ' title updated '
    }

    if (content !== undefined) {
        let result = await post.update({ content: content }, { where: { id: id } })
        msg += ' content updated '
    }

    res.json({
        msg
    })
}





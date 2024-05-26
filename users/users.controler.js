import comment from "../DB/models/comment.model.js";
import post from "../DB/models/post.model.js";
import user from "../DB/models/user.model.js";
import bcrypt from 'bcryptjs'

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    return match;
}




// ------------- get users
export const getUser = async (req, res) => {
    const data = await user.findAll();
    let users = data.filter(user => user.softDelete === false);
    users.map((user) =>{user.password = user.password.toString();});

    res.json({ users })
}



// ------------- get user details

export const getUserDetails = async (req, res) => {
    const { id } = req.params
    const auser = await user.findOne({ where: { id: id } })
    if (!auser){
        return res.status(404).json({ msg: 'user not found' })
    }

    if(auser.softDelete == true){
        return res.status(404).json({ msg: 'user deleted' })
    }
    
    let comments = await comment.findAll()
    let postsData = await post.findAll({ where: {UserID : id}})
    let postComments = []

  
        for (let i = 0; i < postsData.length; i++) {
            let post = {
                id: postsData[i].dataValues.id,
                title: postsData[i].dataValues.title,
                content:postsData[i].dataValues.content,
                createdAt: postsData[i].dataValues.createdAt,
                updatedAt: postsData[i].dataValues.updatedAt,
                UserId: postsData[i].dataValues.UserId,
                comments: [

                ]
            }

           
            postComments.push(post)

        }


  
    

    console.log(postComments);
    for (let i = 0; i < postComments.length; i++){
        comments.map((comment)=>{
            if(comment.PostId == postComments[i].id){
                postComments[i].comments.push(comment)
            }
        })
        
    }

    let result= {
        id: auser.id,
        username: auser.username,
        email: auser.email,
        password:  auser.password.toString(),
        createdAt: auser.createdAt,
        updatedAt: auser.updatedAt,
        posts:postComments
    }
    
    res.json({ result })
}


// -------------- add user

export const addUser = async (req, res) => {




    let { username, email, password } = req.body
    const hashedPassword = await hashPassword(password)
    let result = await user.create({ username, email, password: hashedPassword })
    res.json({ message: "user added", result })

}

// ------------- login  


export const login = async (req, res) => {




    const { email, password } = req.body
    const thatUser = await user.findOne({ where: { email: email } })

    if (!thatUser) {
        return res.status(400).json({ msg: 'user not found' })
    }
    console.log();

    const isMatch = await comparePassword(password, thatUser.password.toString())

    if (!isMatch) {
        return res.status(400).json({ msg: 'incorrect password' })
    } else {
        return res.json({ msg: 'logged in', thatUser })
    }

}

// -------------- update user --------------

export const updateUser = async (req, res) => {
    let id = req.params.id
    let { username, email, password } = req.body


    if (password !== undefined) {
        const hashedPassword = await hashPassword(password)
        let result = await user.update({ password: hashedPassword }, { where: { id } })
    }

    if (username !== undefined) {
        let result = await user.update({ username }, { where: { id } })
    }

    if (email !== undefined) {
        let result = await user.update({ email }, { where: { id } })
    }

    res.json({ message: "user updated" })
}



// -------------- delete user --------------

export const deleteUser = async (req, res) => {
    let {id } = req.params
    let result = await user.update({softDelete : true},{ where: { id } })
    res.json({ message: "user deleted"  })
}
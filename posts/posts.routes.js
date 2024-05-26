import { Router } from "express";
import * as pc from "./posts.controler.js";
import idForPost from "./middlewares/idForPost.js";
import postExist from "./middlewares/postExist.js";
import hisOwnPost from "./middlewares/hisOwnPost.js";


const router = Router()

router.get('/',pc.getPost )
router.get('/:id',pc.getPostDetails )
router.post('/',idForPost,pc.addPost )
router.put('/:id',postExist,hisOwnPost,pc.updatePost )
router.delete('/:id',postExist,hisOwnPost,pc.deletePost )


export default router
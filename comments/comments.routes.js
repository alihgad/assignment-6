import { Router } from "express";
import * as cc from "./comments.controler.js";
import userExist from "./middleware/userExist.js";
import postExist from "./middleware/postExist.js";
import commentExist from "./middleware/commentExist.js";
import hisOwnComment from "./middleware/hisOwnComment.js";


const router = Router()

router.get('/',cc.getcomments )
router.post('/',userExist,postExist,cc.addcomment )
router.put('/:id',commentExist,hisOwnComment,cc.updatecomment )
router.delete('/:id',commentExist,hisOwnComment,cc.deletecomment )


export default router
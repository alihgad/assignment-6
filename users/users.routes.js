import { Router } from "express";
import * as uc from "./users.controler.js";
import uniqueEmail from "./middleWare/uniqueEmail.js";
import idExist from "./middleWare/idExist.js";


const router = Router()

router.get('/',uc.getUser )
router.get('/:id',uc.getUserDetails )
router.post('/resgister',uniqueEmail,uc.addUser )
router.post('/login',uc.login )
router.put('/:id',idExist,uc.updateUser )
router.delete('/:id',idExist,uc.deleteUser )


export default router
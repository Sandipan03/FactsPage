import express from 'express'

import {loginUser,signupUser,updateUser} from '../controllers/usercontroller.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.put('/update/:id', updateUser)
export default router
import express from 'express'
import {getAllFacts,addFact,updateFact} from '../controllers/factcontroller.js'
const router= express.Router()

router.get('/',getAllFacts)
router.post('/', addFact)
router.patch('/:id',updateFact)

export default router